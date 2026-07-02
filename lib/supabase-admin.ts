import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client - full DB access, bypasses RLS.
 * Server-side only; never import from client components.
 *
 * casinoexpert shares the Lucky Universe Supabase project with casinogpt;
 * all casinoexpert tables are prefixed cex_ (see supabase/migrations/).
 */
export function getSupabaseAdmin(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error("Supabase admin requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
