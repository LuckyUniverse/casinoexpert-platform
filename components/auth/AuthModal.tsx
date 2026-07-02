"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Registration / sign-in modal for the safety-check gate. Mirrors
 * casinogpt's RegisterModal flow (alias with live availability check,
 * email, marketing consent) plus casinoexpert's extra First Name field.
 *
 * No password: registering sends a verification email; signing in sends a
 * magic link. Bot defenses in the form: honeypot field, minimum fill time,
 * and Cloudflare Turnstile when NEXT_PUBLIC_TURNSTILE_SITE_KEY is set.
 */

type Mode = "register" | "login";

interface TurnstileApi {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  remove: (id: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

export function AuthModal({
  open,
  initialMode,
  notice,
  onClose,
  onAuthChanged,
}: {
  open: boolean;
  initialMode: Mode;
  notice?: string;
  onClose: () => void;
  onAuthChanged: () => void;
}) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [firstName, setFirstName] = useState("");
  const [alias, setAlias] = useState("");
  const [email, setEmail] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot - humans never see it
  const [aliasAvailable, setAliasAvailable] = useState<boolean | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const startedAtRef = useRef(Date.now());
  const turnstileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setMode(initialMode);
      setError(null);
      setSentTo(null);
      startedAtRef.current = Date.now();
    }
  }, [open, initialMode]);

  // Live alias availability (debounced), register mode only.
  useEffect(() => {
    if (mode !== "register" || alias.length < 3) {
      setAliasAvailable(null);
      return;
    }
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/auth/check-alias?alias=${encodeURIComponent(alias)}`);
        const data = await res.json();
        setAliasAvailable(Boolean(data.available));
      } catch {
        setAliasAvailable(null);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [alias, mode]);

  // Optional Turnstile widget (no-op without a site key).
  useEffect(() => {
    if (!open || !TURNSTILE_SITE_KEY || !turnstileRef.current) return;
    let widgetId: string | null = null;
    const render = () => {
      if (window.turnstile && turnstileRef.current) {
        widgetId = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (token: string) => setTurnstileToken(token),
          "expired-callback": () => setTurnstileToken(""),
          theme: "light",
          size: "compact",
        });
      }
    };
    if (window.turnstile) {
      render();
    } else {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.onload = render;
      document.head.appendChild(script);
    }
    return () => {
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, [open, mode]);

  if (!open) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const endpoint = mode === "register" ? "/api/auth/register" : "/api/auth/login";
      const payload =
        mode === "register"
          ? { firstName, alias, email, subscribe, website, startedAt: startedAtRef.current, turnstileToken }
          : { email, website, turnstileToken };
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSentTo(email.trim());
      onAuthChanged();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputCls =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {sentTo ? (
          <div className="text-center">
            <p className="text-3xl">📬</p>
            <h2 className="mt-2 text-xl font-bold text-gray-900">Check your inbox</h2>
            <p className="mt-2 text-sm text-gray-600">
              We sent {mode === "register" ? "a verification link" : "a sign-in link"} to{" "}
              <span className="font-medium text-gray-900">{sentTo}</span>. Click it to
              {mode === "register" ? " activate your account and " : " "}keep running safety checks.
            </p>
            <button
              onClick={onClose}
              className="mt-5 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Got it
            </button>
          </div>
        ) : (
          <>
            <div className="mb-1 flex items-start justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {mode === "register" ? "Create your free account" : "Sign in"}
              </h2>
              <button onClick={onClose} aria-label="Close" className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>
            {notice && <p className="mb-3 rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-800">{notice}</p>}
            <form onSubmit={submit} className="space-y-3">
              {mode === "register" && (
                <>
                  <label className="block">
                    <span className="mb-1 block text-sm font-medium text-gray-700">First name</span>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      maxLength={50}
                      autoComplete="given-name"
                      className={inputCls}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-sm font-medium text-gray-700">Username</span>
                    <div className="relative">
                      <input
                        type="text"
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
                        required
                        minLength={3}
                        maxLength={30}
                        autoComplete="username"
                        className={inputCls}
                      />
                      {aliasAvailable !== null && (
                        <span
                          className={`absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold ${aliasAvailable ? "text-emerald-600" : "text-red-500"}`}
                        >
                          {aliasAvailable ? "✓" : "✗"}
                        </span>
                      )}
                    </div>
                    {aliasAvailable === false && (
                      <span className="mt-1 block text-xs text-red-600">That username is taken</span>
                    )}
                  </label>
                </>
              )}
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-gray-700">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className={inputCls}
                />
              </label>
              {/* Honeypot - hidden from humans, bots fill it */}
              <div className="absolute -left-[9999px] top-auto" aria-hidden="true">
                <label>
                  Website
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </div>
              {mode === "register" && (
                <label className="flex items-start gap-2 text-xs text-gray-600">
                  <input
                    type="checkbox"
                    checked={subscribe}
                    onChange={(e) => setSubscribe(e.target.checked)}
                    className="mt-0.5"
                  />
                  <span>
                    Email me CasinoExpert updates and casino safety alerts. You can unsubscribe
                    any time.
                  </span>
                </label>
              )}
              {TURNSTILE_SITE_KEY && <div ref={turnstileRef} />}
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={submitting || (mode === "register" && aliasAvailable === false)}
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting
                  ? "Sending..."
                  : mode === "register"
                    ? "Create account"
                    : "Email me a sign-in link"}
              </button>
            </form>
            <p className="mt-3 text-center text-xs text-gray-500">
              {mode === "register" ? (
                <>
                  Already registered?{" "}
                  <button onClick={() => setMode("login")} className="font-medium text-blue-600 hover:underline">
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  No account yet?{" "}
                  <button onClick={() => setMode("register")} className="font-medium text-blue-600 hover:underline">
                    Create one free
                  </button>
                </>
              )}
            </p>
            <p className="mt-2 text-center text-[11px] text-gray-400">
              No password needed - we email you a secure link. 19+/18+ only.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
