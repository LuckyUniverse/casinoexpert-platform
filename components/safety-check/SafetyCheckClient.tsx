"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import {
  SAFETY_CRITERIA,
  OTHER_RATINGS,
  computeSafetyScore,
  gradeForScore,
  gradeDescription,
  type RatingResult,
} from "@/lib/rating/criteria";

const POPULAR_COUNTRIES = [
  "United Kingdom",
  "Canada",
  "United States",
  "Australia",
  "New Zealand",
  "Ireland",
  "Germany",
  "Netherlands",
  "Sweden",
  "Norway",
  "Finland",
  "Denmark",
  "Spain",
  "Italy",
  "France",
  "Brazil",
  "India",
  "Japan",
  "South Africa",
];

const ALL_COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas",
  "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
  "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei",
  "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
  "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia",
  "Comoros", "Congo (DRC)", "Congo (Republic)", "Costa Rica", "Croatia", "Cuba",
  "Cyprus", "Czechia", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia",
  "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia",
  "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
  "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India",
  "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast",
  "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo",
  "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia",
  "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi",
  "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania",
  "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
  "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal",
  "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea",
  "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine",
  "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland",
  "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
  "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino",
  "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
  "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
  "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka",
  "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
  "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago",
  "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine",
  "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
  "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen",
  "Zambia", "Zimbabwe",
];

// Everything not already pinned in the popular group.
const OTHER_COUNTRIES = ALL_COUNTRIES.filter(
  (c) => !POPULAR_COUNTRIES.includes(c)
);

const REGIONS: Record<string, string[]> = {
  Canada: [
    "Ontario",
    "British Columbia",
    "Alberta",
    "Quebec",
    "Manitoba",
    "Saskatchewan",
    "Nova Scotia",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Prince Edward Island",
  ],
  "United States": [
    "New Jersey",
    "Michigan",
    "Pennsylvania",
    "West Virginia",
    "Connecticut",
    "Delaware",
    "Rhode Island",
    "Nevada",
    "New York",
    "California",
    "Texas",
    "Florida",
    "Other state",
  ],
  Australia: [
    "New South Wales",
    "Victoria",
    "Queensland",
    "Western Australia",
    "South Australia",
    "Tasmania",
    "Australian Capital Territory",
    "Northern Territory",
  ],
};

// Rotating status lines shown while the stream runs. Cosmetic pacing -
// the real work is the model's live web searches on the server.
const PROGRESS_STEPS = [
  "Resolving the casino site for your market...",
  "Checking regulator registers for a valid license...",
  "Looking up the operator and holding company...",
  "Checking regulator warning lists and past sanctions...",
  "Scanning complaint portals and review platforms...",
  "Checking payout reports and withdrawal limits...",
  "Reviewing terms for predatory clauses...",
  "Verifying game certification and providers...",
  "Checking responsible gambling tooling...",
  "Scoring criteria and writing the verdict...",
];

type Phase = "idle" | "running" | "done" | "error";

interface AuthUser {
  id: string;
  alias: string;
  firstName: string;
  email: string;
  verified: boolean;
}

function extractJson(text: string): RatingResult {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("No JSON object found in response");
  }
  return JSON.parse(text.slice(start, end + 1)) as RatingResult;
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

const FLAG_ICONS: Record<string, string> = {
  positive: "✓",
  caution: "!",
  red: "✕",
};

export function SafetyCheckClient() {
  const [casino, setCasino] = useState("Betway.com");
  const [country, setCountry] = useState("United Kingdom");
  const [region, setRegion] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState<string | null>(null);
  const [errorIsLimit, setErrorIsLimit] = useState(false);
  const [result, setResult] = useState<RatingResult | null>(null);
  const [checkedAt, setCheckedAt] = useState<Date | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  // Auth state for the one-free-check gate
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"register" | "login">("register");
  const [authNotice, setAuthNotice] = useState<string | undefined>(undefined);
  const [toast, setToast] = useState<string | null>(null);

  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      setUser(data.user ?? null);
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    refreshUser();
    // Landing from a verification / sign-in email
    const params = new URLSearchParams(window.location.search);
    if (params.get("verified") === "1") {
      setToast("Email verified - you're signed in. Run as many checks as you like.");
      window.history.replaceState({}, "", window.location.pathname);
    } else if (params.get("verify_error") === "1") {
      setToast("That link is invalid or expired. Sign in to get a fresh one.");
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [refreshUser]);

  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  }

  const regionOptions = REGIONS[country] ?? null;

  // Drive the progress display while a check is running.
  useEffect(() => {
    if (phase !== "running") return;
    const startedAt = Date.now();
    const timer = setInterval(() => {
      const seconds = Math.floor((Date.now() - startedAt) / 1000);
      setElapsed(seconds);
      setStepIndex(Math.min(Math.floor(seconds / 12), PROGRESS_STEPS.length - 1));
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
    setErrorIsLimit(false);
    setResult(null);
    setElapsed(0);
    setStepIndex(0);

    try {
      const res = await fetch("/api/rating", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          casino,
          country,
          region: regionOptions ? region : "",
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        if (body?.code === "registration_required") {
          setPhase("idle");
          setAuthMode("register");
          setAuthNotice("Your free check is used. Create a free account for unlimited checks - just an email, no password.");
          setAuthOpen(true);
          return;
        }
        if (body?.code === "daily_limit") {
          setPhase("error");
          setError(body.error);
          setErrorIsLimit(true);
          return;
        }
        if (body?.code === "verify_email") {
          setPhase("idle");
          setAuthMode("login");
          setAuthNotice("Almost there - click the link we emailed you. Enter your email below and we'll send a fresh one.");
          setAuthOpen(true);
          return;
        }
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

  const score = result ? computeSafetyScore(result) : 0;
  const grade = gradeForScore(score);
  const colors = gradeColors(score);
  const criteriaByKey = new Map(result?.criteria.map((c) => [c.key, c]) ?? []);
  const otherByKey = new Map(result?.otherRatings?.map((r) => [r.key, r]) ?? []);

  return (
    <div>
      {/* Toast (post-verification landing etc.) */}
      {toast && (
        <div className="mb-4 flex items-start justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <span>{toast}</span>
          <button onClick={() => setToast(null)} aria-label="Dismiss" className="ml-3 text-emerald-700 hover:text-emerald-900">
            ✕
          </button>
        </div>
      )}

      {/* Account strip */}
      <div className="mb-3 flex items-center justify-between text-sm">
        {user ? (
          <>
            <span className="text-gray-600">
              Signed in as <span className="font-medium text-gray-900">{user.firstName}</span>
              {!user.verified && (
                <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                  email not verified
                </span>
              )}
            </span>
            <button onClick={signOut} className="text-gray-400 hover:text-gray-600">
              Sign out
            </button>
          </>
        ) : (
          <>
            <span className="text-gray-500">
              Your first check is free. Unlimited checks with a free account.
            </span>
            <button
              onClick={() => {
                setAuthMode("login");
                setAuthNotice(undefined);
                setAuthOpen(true);
              }}
              className="font-medium text-blue-600 hover:underline"
            >
              Sign in
            </button>
          </>
        )}
      </div>

      {/* Input form */}
      <form
        onSubmit={runCheck}
        className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">
              Casino name or site
            </span>
            <input
              type="text"
              value={casino}
              onChange={(e) => setCasino(e.target.value)}
              placeholder="e.g. Betway.com"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">
              Country
            </span>
            <select
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                setRegion("");
              }}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <optgroup label="Popular markets">
                {POPULAR_COUNTRIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </optgroup>
              <optgroup label="All countries">
                {OTHER_COUNTRIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </optgroup>
            </select>
          </label>
          {regionOptions ? (
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">
                Province / State
              </span>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select...
                </option>
                {regionOptions.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </label>
          ) : (
            <div className="hidden sm:block" />
          )}
        </div>
        <div className="mt-4 flex items-center gap-4">
          <button
            type="submit"
            disabled={phase === "running"}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {phase === "running" ? "Checking..." : "Run live safety check"}
          </button>
          <p className="text-xs text-gray-500">
            Runs live web checks - typically takes 1-3 minutes.
          </p>
        </div>
      </form>

      {/* Progress */}
      {phase === "running" && (
        <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <div className="flex items-center gap-3">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
            <p className="text-sm font-medium text-blue-900">
              {PROGRESS_STEPS[stepIndex]}
            </p>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-blue-100">
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-1000"
              style={{
                width: `${Math.min(8 + (stepIndex / (PROGRESS_STEPS.length - 1)) * 84, 92)}%`,
              }}
            />
          </div>
          <p className="mt-2 text-xs text-blue-700">
            {elapsed}s elapsed - checking {casino} for {region ? `${region}, ` : ""}
            {country}
          </p>
        </div>
      )}

      {/* Error */}
      {phase === "error" && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5">
          <p className="text-sm font-medium text-red-900">
            {errorIsLimit ? error : `The check could not be completed: ${error}`}
          </p>
          {!errorIsLimit && (
            <p className="mt-1 text-xs text-red-700">
              Try again - live checks occasionally time out.
            </p>
          )}
        </div>
      )}

      {/* Result */}
      {phase === "done" && result && (
        <div className="mt-8 space-y-6">
          {/* Score header */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <div
                className={`flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-full border-4 ${colors.ring}`}
              >
                <span className={`text-4xl font-bold ${colors.text}`}>{score}</span>
                <span className="text-xs font-medium text-gray-500">/ 100</span>
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {result.resolved.brandName}
                  </h2>
                  <span
                    className={`rounded-full px-3 py-0.5 text-sm font-bold ${colors.badge}`}
                  >
                    Safety grade {grade}
                  </span>
                </div>
                <p className={`mt-0.5 text-sm font-medium ${colors.text}`}>
                  {gradeDescription(grade)}
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  <span className="font-medium text-gray-900">{result.resolved.siteUrl}</span>
                  {" · "}Operated by {result.resolved.operator}
                  {result.resolved.holdingCompany &&
                  result.resolved.holdingCompany !== result.resolved.operator
                    ? ` (${result.resolved.holdingCompany})`
                    : ""}
                </p>
                {result.resolved.licenses?.length > 0 && (
                  <p className="mt-1 text-sm text-gray-600">
                    Licenses: {result.resolved.licenses.join(" · ")}
                  </p>
                )}
              </div>
            </div>
            <p className="mt-5 border-t border-gray-100 pt-4 text-gray-800">
              {result.verdict}
            </p>
            {result.resolved.marketNote && (
              <p className="mt-2 text-sm text-gray-500">{result.resolved.marketNote}</p>
            )}
          </div>

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
              Safety criteria breakdown
            </h3>
            <ul className="divide-y divide-gray-100">
              {SAFETY_CRITERIA.map((criterion) => {
                const r = criteriaByKey.get(criterion.key);
                if (!r) return null;
                return (
                  <li key={criterion.key} className="px-5 py-4">
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-medium text-gray-900">
                        {criterion.label}
                        <span className="ml-2 text-xs font-normal text-gray-400">
                          weight {criterion.weight}%
                        </span>
                      </p>
                      <span className="shrink-0 text-sm font-semibold text-gray-700">
                        {r.score}/10
                      </span>
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
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Other ratings</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
              {OTHER_RATINGS.map((def) => {
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
            using regulator registers, complaint portals, and company records.
            The safety score weights licensing and operator track record most
            heavily. This is an automated assessment for information only, not
            legal or financial advice. 19+/18+ - please gamble responsibly.
          </p>
        </div>
      )}

      <AuthModal
        open={authOpen}
        initialMode={authMode}
        notice={authNotice}
        onClose={() => setAuthOpen(false)}
        onAuthChanged={refreshUser}
      />
    </div>
  );
}
