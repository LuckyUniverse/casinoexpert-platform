-- Token usage per stored report, so per-check cost is measurable fact
-- instead of estimate. Written by the rating route's onFinish.
ALTER TABLE public.cex_ratings
  ADD COLUMN IF NOT EXISTS usage JSONB;
