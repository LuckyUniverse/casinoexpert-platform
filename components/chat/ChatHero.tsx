"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import { getSuggestedQuestions } from "@/lib/chat/suggested-questions";

/**
 * The Ontario page uses a separate AGCO-compliant system prompt server-side.
 * We pass `mode: "ontario"` in the request body so the API picks the strict
 * prompt; every other surface uses the default.
 */
export function ChatHero({
  mode = "default",
  openingMessage,
}: {
  mode?: "default" | "ontario";
  /** Optional pre-rendered assistant reply shown as the first message in the
   *  thread, so a topic page can "open already answered" inside one chat card. */
  openingMessage?: string;
}) {
  const pathname = usePathname();
  const suggestedQuestions = getSuggestedQuestions(pathname);

  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat", body: { mode } }),
    [mode]
  );
  const [input, setInput] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const userScrolledUp = useRef(false);

  const { messages, sendMessage, status, error } = useChat({ transport });

  const isLoading = status === "streaming" || status === "submitted";
  const hasMessages = messages.length > 0;

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el && !userScrolledUp.current) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (status === "submitted") {
      userScrolledUp.current = false;
    }
  }, [status]);

  function handleScroll() {
    const el = scrollContainerRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
    userScrolledUp.current = !atBottom;
  }

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!input.trim() || isLoading) return;
      const text = input.trim();
      setInput("");
      sendMessage({ text });
    },
    [input, isLoading, sendMessage]
  );

  function handleSuggestedQuestion(question: string) {
    setInput("");
    sendMessage({ text: question });
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden mb-6">
        {(openingMessage || hasMessages) && (
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="max-h-[400px] overflow-y-auto border-b border-gray-100"
          >
            <div className="p-5 space-y-4">
              {openingMessage && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed bg-gray-50 text-gray-800 border border-gray-100">
                    <div
                      className="chat-prose"
                      dangerouslySetInnerHTML={{ __html: formatMarkdown(openingMessage) }}
                    />
                  </div>
                </div>
              )}
              {messages.map((message) => {
                const text = message.parts
                  .filter((p): p is { type: "text"; text: string } => p.type === "text")
                  .map((p) => p.text)
                  .join("");
                if (!text) return null;
                return (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        message.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-50 text-gray-800 border border-gray-100"
                      }`}
                    >
                      {message.role === "assistant" ? (
                        <div
                          className="chat-prose"
                          dangerouslySetInnerHTML={{ __html: formatMarkdown(text) }}
                        />
                      ) : (
                        <p>{text}</p>
                      )}
                    </div>
                  </div>
                );
              })}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
                  Something went wrong. Please try again.
                </div>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="Ask anything about Canadian online casinos..."
            className="w-full text-base text-gray-900 py-4 px-6 bg-transparent focus:outline-none placeholder:text-gray-400 resize-none min-h-[56px] max-h-[200px]"
            disabled={isLoading}
            maxLength={500}
            rows={hasMessages ? 1 : 2}
          />
          <div className="flex items-center justify-between px-4 pb-3">
            <p className="text-xs text-gray-400">{hasMessages ? "" : "Press Enter to send"}</p>
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-full w-10 h-10 flex items-center justify-center transition flex-shrink-0"
            >
              {isLoading ? (
                <div className="flex items-center gap-0.5">
                  <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {suggestedQuestions.map((q) => (
          <button
            key={q}
            onClick={() => handleSuggestedQuestion(q)}
            disabled={isLoading}
            className="text-sm bg-white/15 hover:bg-white/25 disabled:opacity-50 backdrop-blur-sm border border-white/20 text-white rounded-full px-4 py-2 transition"
          >
            {q}
          </button>
        ))}
      </div>

      <p className="text-xs text-blue-200/70 text-center mt-3">
        AI-powered answers · Not financial advice · 19+ only
      </p>
    </div>
  );
}

function formatMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\((\/[^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br/>")
    .replace(/^(.+)$/, "<p>$1</p>");
}
