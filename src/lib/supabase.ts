import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

// Global singleton to prevent recreating clients across HMR
const globalForSupabase = globalThis as unknown as {
  __supabaseClient?: SupabaseClient<Database>;
};

export const supabase: SupabaseClient<Database> =
  globalForSupabase.__supabaseClient ??
  (isSupabaseConfigured()
    ? createClient<Database>(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      })
    : (null as unknown as SupabaseClient<Database>));

if (process.env.NODE_ENV !== "production" && isSupabaseConfigured()) {
  globalForSupabase.__supabaseClient = supabase;
}

/**
 * Dual-layer background sync helper
 * Runs the Supabase operation without blocking the caller and catches any network error
 */
export async function safeSupabaseSync<T>(
  operationName: string,
  fn: (client: SupabaseClient<Database>) => Promise<T>
): Promise<T | null> {
  if (!isSupabaseConfigured() || !supabase) return null;
  try {
    return await fn(supabase);
  } catch (err) {
    console.warn(`[SupabaseSync] Non-blocking sync error in ${operationName}:`, err);
    return null;
  }
}
