-- casinoexpert.ai user system.
-- Lives in the shared Lucky Universe Supabase project alongside casinogpt's
-- tables; everything here is prefixed cex_ and fully self-contained so the
-- two brands' data never mixes. Mirrors casinogpt's users/magic_links design
-- (custom passwordless auth, NOT Supabase Auth) with two deliberate changes:
--   1. first_name is collected at registration (casinoexpert requirement)
--   2. email verification is REQUIRED before a session is issued -
--      email_verified_at gates the safety-check tool, and doubles as bot
--      protection (no working inbox = no account).

CREATE TABLE IF NOT EXISTS public.cex_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  alias TEXT NOT NULL,
  first_name TEXT NOT NULL,
  email_verified_at TIMESTAMPTZ,
  -- CASL consent tracking, same fields casinogpt keeps on subscribers
  marketing_consent BOOLEAN NOT NULL DEFAULT false,
  consent_date TIMESTAMPTZ,
  consent_source TEXT,
  -- abuse forensics (sha256 of ip, never the raw address)
  signup_ip_hash TEXT,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS cex_users_email_unique ON public.cex_users (LOWER(email));
CREATE UNIQUE INDEX IF NOT EXISTS cex_users_alias_unique ON public.cex_users (LOWER(alias));

-- Service-role access only: RLS on, no policies. (casinogpt allows public
-- read on its users table; we don't need that - alias checks run server-side.)
ALTER TABLE public.cex_users ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.cex_magic_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.cex_users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  -- 'verify' = post-registration email verification (24h expiry)
  -- 'login'  = returning-user magic link (15min expiry)
  purpose TEXT NOT NULL DEFAULT 'login' CHECK (purpose IN ('verify', 'login')),
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_cex_magic_links_token ON public.cex_magic_links (token);
ALTER TABLE public.cex_magic_links ENABLE ROW LEVEL SECURITY;
