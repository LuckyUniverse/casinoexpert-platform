-- Safety-check report cache / archive.
-- Every completed live check is stored; lookups within 6 months are served
-- from here instead of re-running the API (cost control + consistent scores
-- + this table IS the long-term ratings database asset). Rows are never
-- updated in place - a re-check after expiry inserts a new row, so we keep
-- rating history per brand/market over time.

CREATE TABLE IF NOT EXISTS public.cex_ratings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  -- normalized lookup key, e.g. "betway" (lowercased, domain suffixes stripped)
  casino_key TEXT NOT NULL,
  country TEXT NOT NULL,
  region TEXT NOT NULL DEFAULT '',
  -- what the user actually typed, for auditing key normalization
  casino_input TEXT NOT NULL,
  -- resolved display name from the report, e.g. "Betway"
  brand_name TEXT,
  -- the full RatingResult JSON served to the client
  result JSONB NOT NULL,
  checked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_cex_ratings_lookup
  ON public.cex_ratings (casino_key, country, region, checked_at DESC);

ALTER TABLE public.cex_ratings ENABLE ROW LEVEL SECURITY;
