import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://flpknqwjnlinjjqgpjoo.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZscGtucXdqbmxpbmpqcWdwam9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI1MTMyNjIsImV4cCI6MjEwODA4OTI2Mn0.lrtWV2Zf_mk0di_KW7hPSpcHiNh1xxn4IjeaItOwl-M";

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

// Global singleton to prevent recreating clients across HMR
const globalForSupabase = globalThis as unknown as {
  __supabaseClient?: SupabaseClient<Database>;
};

export const supabase: SupabaseClient<Database> =
  globalForSupabase.__supabaseClient ??
  createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

if (process.env.NODE_ENV !== "production") {
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
  if (!isSupabaseConfigured()) return null;
  try {
    return await fn(supabase);
  } catch (err) {
    console.warn(`[SupabaseSync] Non-blocking sync error in ${operationName}:`, err);
    return null;
  }
}
