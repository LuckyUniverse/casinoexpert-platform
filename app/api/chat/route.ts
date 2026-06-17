import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText, convertToModelMessages } from "ai";
import { SYSTEM_PROMPT } from "@/lib/chat/system-prompt";
import { SYSTEM_PROMPT_ONTARIO } from "@/lib/chat/system-prompt-ontario";
import { KNOWLEDGE_BASE } from "@/lib/chat/knowledge-base";
import { logQuestion } from "@/lib/chat/question-log";

/** Extract the latest user message's text from UIMessage `parts`. */
function lastUserText(messages: unknown[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i] as { role?: string; parts?: { type?: string; text?: string }[]; content?: string };
    if (m?.role !== "user") continue;
    if (Array.isArray(m.parts)) {
      const t = m.parts.filter((p) => p?.type === "text").map((p) => p.text ?? "").join(" ").trim();
      if (t) return t;
    }
    if (typeof m.content === "string") return m.content;
  }
  return "";
}

export const maxDuration = 30;

/**
 * Simple per-IP rate limiting (in-memory; resets on deploy).
 * 20 messages per 1-hour window per IP. Good enough for a stateless chat
 * with no auth - we'll move to a durable store if abuse becomes a problem.
 */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW = 60 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

function getApiKey(): string | undefined {
  return (
    process.env.ANTHROPIC_SECRET ||
    process.env.AI_KEY ||
    process.env.ANTHROPIC_API_KEY ||
    undefined
  );
}

export async function POST(req: Request) {
  const apiKey = getApiKey();
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Chat is not configured yet." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for") ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return new Response(
      JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  const { messages, mode } = await req.json();

  // Record the question for popularity stats (best-effort; no-op without KV).
  // Not awaited — the function stays alive during streaming, so it completes.
  const asked = lastUserText(messages);
  if (asked) void logQuestion(asked);

  // Cap conversation length to control token costs.
  const recentMessages = messages.slice(-10);

  // The frontend's useChat/DefaultChatTransport sends UIMessage `parts`;
  // streamText needs ModelMessage `content`. Convert.
  const modelMessages = await convertToModelMessages(recentMessages);

  const anthropic = createAnthropic({ apiKey });

  // Switch system prompt based on the surface the chat is being asked from.
  // The Ontario surface (/casinos/ontario) is AGCO-bound and uses a strict
  // no-promotional-language prompt. Everything else uses the default prompt
  // that's free to discuss welcome offers, wagering, loyalty etc.
  const isOntario = mode === "ontario";
  const system = isOntario
    ? `${SYSTEM_PROMPT_ONTARIO}\n\n## Reference Data\n${KNOWLEDGE_BASE}`
    : `${SYSTEM_PROMPT}\n\n## Reference Data\n${KNOWLEDGE_BASE}`;

  const result = streamText({
    model: anthropic("claude-haiku-4-5-20251001"),
    system,
    messages: modelMessages,
    maxOutputTokens: 350,
  });

  return result.toUIMessageStreamResponse();
}
