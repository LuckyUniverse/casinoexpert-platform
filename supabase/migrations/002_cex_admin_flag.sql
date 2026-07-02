-- Admin flag for cex_users: admins are exempt from the daily safety-check
-- limit (and any future quotas). Grant with:
--   UPDATE cex_users SET is_admin = true WHERE email = '...';
-- The ADMIN_EMAILS env var (comma-separated) also grants admin at runtime,
-- so known team addresses are admin from the moment they register.
ALTER TABLE public.cex_users
  ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT false;
