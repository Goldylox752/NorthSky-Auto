// lib/supabase/client.js

import { createBrowserClient } from "@supabase/ssr";

let supabaseClient = null;

export function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL environment variable."
    );
  }

  if (!supabaseAnonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable."
    );
  }

  supabaseClient = createBrowserClient(
    supabaseUrl,
    supabaseAnonKey
  );

  return supabaseClient;
}

// Export a singleton client for convenience
export const supabase = getSupabaseClient();

export default supabase;
