"use client";

import { useEffect, useRef, useState } from "react";
import {
  SLOT_CRITERIA,
  SLOT_OTHER_RATINGS,
  computeSlotScore,
  slotGradeForScore,
  slotGradeDescription,
  type SlotRatingResult,
} from "@/lib/rating/slot-criteria";

const PROGRESS_STEPS = [
  "Identifying the game and provider...",
  "Checking published RTP and looking for reduced-RTP versions...",
  "Verifying volatility, max win, and stake range...",
  "Checking certification and licensed distribution...",
  "Scanning slot databases and player reviews...",
  "Collecting game screenshots and artwork...",
  "Checking demo availability and casino coverage...",
  "Scoring criteria and writing the verdict...",
];

type Phase = "idle" | "running" | "done" | "error";

function extractJson(text: string): SlotRatingResult {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("No JSON object found in response");
  }
  return JSON.parse(text.slice(start, end + 1)) as SlotRatingResult;
}

function scoreColor(score10: number): string {
  if (score10 >= 8) return "bg-emerald-500";
  if (score10 >= 5) return "bg-amber-500";
  return "bg-red-500";
}

function gradeColors(score: number): { text: string; ring: string; badge: string } {
  if (score >= 80)
    return { text: "text-emerald-700", ring: "border-emerald-500", badge: "bg-emerald-100 text-emerald-800" };
  if (score >= 55)
    return { text: "text-amber-700", ring: "border-amber-500", badge: "bg-amber-100 text-amber-800" };
  return { text: "text-red-700", ring: "border-red-500", badge: "bg-red-100 text-red-800" };
}

const FLAG_STYLES: Record<string, string> = {
  positive: "border-emerald-200 bg-emerald-50 text-emerald-900",
  caution: "border-amber-200 bg-amber-50 text-amber-900",
  red: "border-red-200 bg-red-50 text-red-900",
};

const FLAG_ICONS: Record<string, string> = { positive: "✓", caution: "!", red: "✕" };

export function SlotCheckClient() {
  const [game, setGame] = useState("Cleopatra");
  const [provider, setProvider] = useState("IGT");
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SlotRatingResult | null>(null);
  const [checkedAt, setCheckedAt] = useState<Date | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [brokenImages, setBrokenImages] = useState<Set<string>>(new Set());
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (phase !== "running") return;
    const startedAt = Date.now();
    const timer = setInterval(() => {
      const seconds = Math.floor((Date.now() - startedAt) / 1000);
      setElapsed(seconds);
      setStepIndex(Math.min(Math.floor(seconds / 14), PROGRESS_STEPS.length - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  async function runCheck(e: React.FormEvent) {
    e.preventDefault();
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setPhase("running");
    setError(null);
    setResult(null);
    setBrokenImages(new Set());
    setElapsed(0);
    setStepIndex(0);

    try {
      const res = await fetch("/api/slot-rating", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ game, provider }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? `Check failed (${res.status})`);
      }
      if (!res.body) throw new Error("No response stream");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
      }
      text += decoder.decode();

      const parsed = extractJson(text);
      if (!Array.isArray(parsed.criteria) || !parsed.resolved || !parsed.verdict) {
        throw new Error("The check returned an incomplete result");
      }
      setResult(parsed);
      setCheckedAt(new Date());
      setPhase("done");
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setError((err as Error).message || "Something went wrong");
      setPhase("error");
    }
  }

  const score = result ? computeSlotScore(result) : 0;
  const grade = slotGradeForScore(score);
  const colors = gradeColors(score);
  const criteriaByKey = new Map(result?.criteria.map((c) => [c.key, c]) ?? []);
  const otherByKey = new Map(result?.otherRatings?.map((r) => [r.key, r]) ?? []);

  // All game imagery is served through /api/game-image (slot sites hotlink-
  // block direct embeds). Model-found image URLs first, then og:images of
  // the client's review page and the provider's official page as fallbacks.
  const imageCandidates: { url: string; caption: string }[] = [];
  if (result) {
    for (const img of result.images ?? []) {
      imageCandidates.push({
        url: `/api/game-image?src=${encodeURIComponent(img.url)}`,
        caption: img.caption || result.resolved.gameName,
      });
    }
    if (result.resolved.clientReviewUrl) {
      imageCandidates.push({
        url: `/api/game-image?page=${encodeURIComponent(result.resolved.clientReviewUrl)}`,
        caption: `${result.resolved.gameName} on Penny Slot Machines`,
      });
    }
    if (result.resolved.officialUrl) {
      imageCandidates.push({
        url: `/api/game-image?page=${encodeURIComponent(result.resolved.officialUrl)}`,
        caption: `${result.resolved.gameName} - official page`,
      });
    }
  }
  const visibleImages = imageCandidates.filter((img) => !brokenImages.has(img.url)).slice(0, 4);

  const statChips: { label: string; value: string }[] = result
    ? [
        { label: "RTP", value: result.resolved.rtp },
        { label: "Volatility", value: result.resolved.volatility },
        { label: "Max win", value: result.resolved.maxWin },
        { label: "Min stake", value: result.resolved.minStake },
        { label: "Released", value: result.resolved.releaseYear },
      ].filter((s) => s.value && s.value !== "")
    : [];

  return (
    <div>
      {/* Input form */}
      <form onSubmit={runCheck} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-sm font-medium text-gray-700">Slot game name</span>
            <input
              type="text"
              value={game}
              onChange={(e) => setGame(e.target.value)}
              placeholder="e.g. Book of Dead"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">
              Provider <span className="font-normal text-gray-400">(optional)</span>
            </span>
            <input
              type="text"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              placeholder="e.g. Play'n GO"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </label>
        </div>
        <div className="mt-4 flex items-center gap-4">
          <button
            type="submit"
            disabled={phase === "running"}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {phase === "running" ? "Checking..." : "Run live slot review"}
          </button>
          <p className="text-xs text-gray-500">Runs live web checks - typically takes 1-3 minutes.</p>
        </div>
      </form>

      {/* Progress */}
      {phase === "running" && (
        <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <div className="flex items-center gap-3">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
            <p className="text-sm font-medium text-blue-900">{PROGRESS_STEPS[stepIndex]}</p>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-blue-100">
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-1000"
              style={{ width: `${Math.min(8 + (stepIndex / (PROGRESS_STEPS.length - 1)) * 84, 92)}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-blue-700">
            {elapsed}s elapsed - reviewing {game}
          </p>
        </div>
      )}

      {/* Error */}
      {phase === "error" && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5">
          <p className="text-sm font-medium text-red-900">The review could not be completed: {error}</p>
          <p className="mt-1 text-xs text-red-700">Try again - live checks occasionally time out.</p>
        </div>
      )}

      {/* Result */}
      {phase === "done" && result && (
        <div className="mt-8 space-y-6">
          {/* Score header */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <div className={`flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-full border-4 ${colors.ring}`}>
                <span className={`text-4xl font-bold ${colors.text}`}>{score}</span>
                <span className="text-xs font-medium text-gray-500">/ 100</span>
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-bold text-gray-900">{result.resolved.gameName}</h2>
                  <span className={`rounded-full px-3 py-0.5 text-sm font-bold ${colors.badge}`}>
                    Slot grade {grade}
                  </span>
                </div>
                <p className={`mt-0.5 text-sm font-medium ${colors.text}`}>{slotGradeDescription(grade)}</p>
                <p className="mt-2 text-sm text-gray-600">
                  by <span className="font-medium text-gray-900">{result.resolved.provider}</span>
                </p>
              </div>
            </div>

            {/* Key stats */}
            {statChips.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {statChips.map((s) => (
                  <span key={s.label} className="rounded-lg bg-gray-50 px-3 py-1.5 text-sm">
                    <span className="text-xs font-medium uppercase tracking-wide text-gray-400">{s.label}</span>{" "}
                    <span className="font-semibold text-gray-800">{s.value}</span>
                  </span>
                ))}
              </div>
            )}

            <p className="mt-5 border-t border-gray-100 pt-4 text-gray-800">{result.verdict}</p>

            {result.resolved.clientReviewUrl && (
              <a
                href={result.resolved.clientReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100"
              >
                Read the full Penny Slot Machines review →
              </a>
            )}
          </div>

          {/* Game imagery */}
          {visibleImages.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {visibleImages.map((img) => (
                // Research-sourced remote images with unknown hosts; plain img
                // + onError removal beats next/image domain allowlisting here.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={img.url}
                  src={img.url}
                  alt={img.caption || result.resolved.gameName}
                  title={img.caption}
                  loading="lazy"
                  className="h-32 w-full rounded-lg border border-gray-200 object-cover"
                  onError={() =>
                    setBrokenImages((prev) => new Set(prev).add(img.url))
                  }
                />
              ))}
            </div>
          )}

          {/* Flags */}
          {result.flags?.length > 0 && (
            <div className="grid gap-2 sm:grid-cols-2">
              {result.flags.map((flag, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2 rounded-lg border px-3 py-2 text-sm ${FLAG_STYLES[flag.type] ?? FLAG_STYLES.caution}`}
                >
                  <span className="mt-0.5 font-bold">{FLAG_ICONS[flag.type] ?? "!"}</span>
                  <span>{flag.text}</span>
                </div>
              ))}
            </div>
          )}

          {/* Criteria breakdown */}
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <h3 className="border-b border-gray-100 px-5 py-4 text-lg font-semibold text-gray-900">
              Review criteria breakdown
            </h3>
            <ul className="divide-y divide-gray-100">
              {SLOT_CRITERIA.map((criterion) => {
                const r = criteriaByKey.get(criterion.key);
                if (!r) return null;
                return (
                  <li key={criterion.key} className="px-5 py-4">
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-medium text-gray-900">
                        {criterion.label}
                        <span className="ml-2 text-xs font-normal text-gray-400">weight {criterion.weight}%</span>
                      </p>
                      <span className="shrink-0 text-sm font-semibold text-gray-700">{r.score}/10</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={`h-full rounded-full ${scoreColor(r.score)}`}
                        style={{ width: `${Math.max(r.score * 10, 4)}%` }}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{r.finding}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                      <span
                        className={
                          r.confidence === "high"
                            ? "text-emerald-600"
                            : r.confidence === "medium"
                              ? "text-amber-600"
                              : "text-gray-400"
                        }
                      >
                        {r.confidence} confidence
                      </span>
                      {r.sources?.slice(0, 3).map((src) => {
                        let host = src;
                        try {
                          host = new URL(src).hostname.replace(/^www\./, "");
                        } catch {}
                        return (
                          <a
                            key={src}
                            href={src}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="text-blue-600 underline hover:text-blue-800"
                          >
                            {host}
                          </a>
                        );
                      })}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Other ratings */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Experience ratings</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
              {SLOT_OTHER_RATINGS.map((def) => {
                const r = otherByKey.get(def.key);
                if (!r) return null;
                return (
                  <div key={def.key} className="text-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {r.score}
                      <span className="text-sm font-normal text-gray-400">/10</span>
                    </p>
                    <p className="text-sm font-medium text-gray-700">{def.label}</p>
                    <p className="mt-1 text-xs text-gray-500">{r.note}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer note */}
          <p className="text-xs text-gray-400">
            Checked live{" "}
            {checkedAt
              ? `on ${checkedAt.toLocaleDateString("en-CA")} at ${checkedAt.toLocaleTimeString()}`
              : "just now"}{" "}
            using provider data, slot databases, and player reviews. The score
            weights RTP and provider trust most heavily. Game imagery is
            sourced from public pages during research. This is an automated
            assessment for information only. 19+/18+ - please gamble
            responsibly.
          </p>
        </div>
      )}
    </div>
  );
}
