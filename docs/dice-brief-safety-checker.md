# Dice Brief: the Safety-Checker Product Lane on casinoexpert.ai

**For:** Dice (Mac research agent)
**From:** Claude Code on Andrew's Windows machine (the "LuckyUniverse" committer you spotted - see Attribution)
**Date:** 2026-07-05
**Covers:** all commits from `45ee522` (Jul 2) through `3b8671f` (Jul 5)

---

## 1. Attribution - who pushed what

Everything in the June 30 - July 5 window you flagged was built by **Claude Code
running on Andrew's Windows machine** (hence the `C:/Users/avs_o/...` path in
`.claude/launch.json`), directed live by Andrew. No third machine, no other human.
Two items you flagged that are NOT part of this lane:

- **`campaignid1` tracking on Casino Rewards links (`fe2bfd9`)** predates this
  work - it was already HEAD when the safety-checker build started on Jul 2.
- **The "Fort Hare Solutions" pages (added and removed Jul 4):** Andrew's own
  experiment, deleted on purpose. Disregard entirely; it is unrelated to
  everything below and needs no further investigation.

Your memory of the Supabase project as "still pending" is stale: the platform
now writes to the **shared casinogpt Supabase project** (same instance casinogpt
uses), with all casinoexpert tables prefixed `cex_`. Migrations live in
`supabase/migrations/*_cex_*.sql` and were applied with casinogpt's
`scripts/apply-migration.js`.

---

## 2. /safety-check - live AI casino safety ratings (LIVE, noindexed)

**What it does:** user enters a casino + country (+ province/state for CA/US/AU),
gets a live-researched safety report scored /100 with an A+ to F grade.

**Engine** (`app/api/rating/route.ts`): `claude-opus-4-8` via the AI SDK
(`streamText`) with Anthropic's server-side web search tool
(`webSearch_20260209`, capped at 12 searches). The model is instructed to verify
against primary sources (regulator registers over casino marketing) and returns
a strict JSON report which streams to the client as text.

**Rubric** (`lib/rating/criteria.ts`, single source of truth for prompt AND UI):
11 weighted criteria summing to 100 - licensed-for-jurisdiction 25, operator
track record 12, regulator tier 10, brand age 10, complaints 10, payout
reliability 10, regulatory actions 8, T&C fairness 5, game fairness 5, RG 3,
security 2. Plus 5 secondary ratings (payments, games, bonuses, support,
localization) that never blend into the safety score.

**Score math is deterministic in code, not model-judged:** weighted sum of the
model's per-criterion 0-10 scores. Hard rule: a casino serving a market that HAS
a licensing regime without holding that license caps at 49 (D/F). The
three-way licensing status is `yes | no | no_local_regime` - markets with no
local regime (e.g. Canada outside Ontario) score on best available offshore
license instead of being capped.

**Validated runs:** Betway/UK scored 84/A and 83/A across runs (UKGC #39372
verified in the Commission's register, 2020 GBP 11.6m AML settlement surfaced as
a caution flag) - matches your round-1 licensing research. Golden Lion/UK scored
25/F via the hard cap (Curacao-only, UK on its own restricted-country list).

## 3. The 6-month report cache (cex_ratings)

Every completed check is archived in `cex_ratings` (result JSONB + `checked_at`
+ token `usage`). Lookups of the same brand+market within 6 months are served
from records instantly with the ORIGINAL date stamp shown ("Report date May 20,
2026 - from our records"). Key = `casino_key` (normalized input: lowercase,
domains/TLDs stripped) + `country` + `region`. **Region is part of the key on
purpose** - Ontario and BC genuinely differ. Rows are never updated in place;
re-checks after expiry insert new rows, so we keep rating history per brand.
This table IS the long-term ratings database asset.

## 4. Cost controls (the checks burn real API credits)

Real cost per live check is roughly $1.50-3 on Opus (the server-side search loop
re-reads accumulated context every round). Controls, in request order:

1. Free gibberish heuristics (no vowels, digits-only, repeats) reject mashing
   instantly - zero API calls (`lib/rating/preflight.ts:looksLikeGibberish`)
2. Rejected inputs remembered in Redis 24h (`cex:notfound:*`) - repeats cost 0
3. New names pass a ~1 cent existence check first: Haiku + max 2 searches
   (`verifyCasinoExists`; note Haiku uses `webSearch_20250305`, it does not
   support the `_20260209` variant). Returns the canonical brand name, which
   dedupes cache keys ("jackpot city casino online" -> "Jackpot City") and can
   hit a cached report the raw key missed
4. The main engine itself aborts with `{"notFound": true}` within 2 searches if
   it cannot identify the casino (backstop)
5. Search cap 12 (was 16)
6. Every completed check logs exact input/output tokens + estimated USD to
   Vercel logs (tag `rating-usage`) and stores usage on the cex_ratings row
7. Free checks and daily quota are consumed only when a report is DELIVERED -
   typos cost visitors nothing

## 5. Registration system (the database-building gate)

Replicates casinogpt's custom passwordless auth (NOT Supabase Auth) with two
deliberate changes: **first_name is collected**, and **email verification is
mandatory before any session is issued** (doubles as bot protection).

- Tables: `cex_users` (email, alias, first_name, email_verified_at,
  marketing_consent + CASL consent fields, signup_ip_hash, is_admin),
  `cex_magic_links` (purpose `verify` 24h / `login` 15min, single-use atomic)
- Routes: `app/api/auth/{register,login,verify,me,logout,check-alias}`
- Sessions: HMAC-signed token in httpOnly cookie `cex_session`, 30 days
  (`lib/auth/session.ts`, secret `USER_SESSION_SECRET`)
- Email: Resend from `accounts@casinoexpert.ai` - the domain was registered in
  Resend on Jul 2 and verified (DKIM/SPF added via `vercel dns add`)
- Bot defenses: honeypot field ("website"), 3-second minimum fill time, 5
  registrations/hr/IP, 3 magic links/hr/email, Turnstile fully wired but OFF
  until `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` exist
- Gating: anonymous visitors get 1 free check (httpOnly cookie + per-IP Redis
  record, cookie-clearing does not reset), then registration+verification
  required; verified users get 5 live checks per 24h; admins exempt
  (`is_admin` flag or `ADMIN_EMAILS` env: contact@ and andrew@myluckyuniverse.com)
- Andrew's real account: alias `slotexpert`, andrew@myluckyuniverse.com,
  is_admin=true, but email_verified_at was still NULL as of Jul 5 - he needs to
  click his verification email

## 6. /slot-check - AI slot reviews (penny-slot-machines.com demo, DARK)

Same engine pattern, slot rubric (`lib/rating/slot-criteria.ts`): RTP is the
heavyweight at 20% and the engine hunts for reduced-RTP versions (validated on
Book of Dead: caught all five licensed variants, 96.21% down to 84.18%);
counterfeit-copy risk caps at 49; stake range is scored for penny-play fit.
Client touches: their logo at `public/partners/penny-slot-machines.png`
(fetch `/logo/320x160.png`; the bare `/logo.png` 404s), the engine links their
own review page when one exists (their catalog: 241 games at
`/games/<slug>.html`, classic Vegas focus, no online-first titles - demo
default is Cleopatra/IGT which IS on their site), and game imagery renders via
`/api/game-image` - a relay that extracts page galleries and streams image
bytes server-side because slot sites hotlink-block (https-only, SSRF-guarded).

**Currently dark:** page + both APIs 404 unless `SLOT_CHECK_ENABLED=1` (set in
local .env.local only, NOT in Vercel prod). Re-enable = one env var + redeploy.

## 7. Affiliates + transparency

Canadian lookups resolving to one of the 13 partner brands (matched in
`lib/rating/affiliates.ts` against `lib/casino-data/*` affiliateUrl) show a
"Visit {brand}" button (rel=sponsored) with a labelled disclosure. Other
countries: same report, no link. Public policy page at `/safety-check/guide`:
6-month cache and date stamps, checks cost money, affiliate links fund them,
scores never influenced, Canada-only scope.

## 8. Current state and blockers (as of Jul 5)

- **API credits exhausted (second time)** - Manu topped up Friday, drained
  within days. Usage logging now measures true burn; balance and purchase
  history are only visible in console.anthropic.com (not via API key)
- Pending live validation once topped up: Haiku preflight, notFound backstop,
  Cleopatra slot-demo run, Sonnet 4.6 A/B (40% cheaper per token)
- A claimed "free Fable until tomorrow" promo could NOT be confirmed on our
  key (billing gate blocks everything at zero balance)
- Alberta is about to regulate (Ontario-style). Plan: do NOT deep-cache Alberta
  reports now; when the regulator goes live, delete Alberta rows from
  cex_ratings so fresh checks run under the new reality

## 9. Where you (Dice) fit - agreed division of labor

- **You:** geo/VPN empirical verification - which site version a player in a
  given province is actually served, geo-acceptance, cashier payment methods
  (Interac presence), RG tooling as-rendered. Your evidence beats web search
  for the market-resolution criterion, especially Ontario and (soon) Alberta.
- **Me:** public-record research (registers, corporate records, fines,
  complaints, T&Cs), report schema, scoring, DB insertion, cache management.
- **Immediate ask:** your Ontario round-1 research on the 13 brands is wanted
  as primary-source material for Ontario cache rows. Tell Andrew (or leave a
  note in this repo's docs/) where those files live and I will convert them
  into date-stamped cex_ratings rows, filling gaps with register/complaint
  checks.

## 10. Key file map

| Path | What |
|---|---|
| `app/safety-check/page.tsx` + `guide/page.tsx` | tool page (noindex) + transparency guide |
| `components/safety-check/SafetyCheckClient.tsx` | form, progress, scorecard, auth modal wiring |
| `app/api/rating/route.ts` | gate -> cache -> preflight -> quota -> live engine |
| `lib/rating/criteria.ts` | casino rubric + deterministic score math |
| `lib/rating/cache.ts` | cex_ratings read/write, key normalization |
| `lib/rating/preflight.ts` | gibberish heuristics + Haiku existence check |
| `lib/rating/affiliates.ts` | CA partner-brand matching |
| `app/api/auth/*` + `lib/auth/*` | registration/verification/session system |
| `components/auth/AuthModal.tsx` | register/sign-in modal |
| `app/slot-check/*`, `lib/rating/slot-criteria.ts`, `app/api/slot-rating`, `app/api/game-image` | slot demo lane (dark) |
| `supabase/migrations/00{1,2,3,4}_cex_*.sql` | users, admin flag, ratings cache, usage column |

Env vars in Vercel prod: `ANTHROPIC_SECRET`, `NEXT_PUBLIC_SUPABASE_URL`,
`SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `USER_SESSION_SECRET`,
`ADMIN_EMAILS`, KV_* (Upstash). Not set in prod: `SLOT_CHECK_ENABLED`,
Turnstile keys.
