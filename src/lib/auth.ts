import { getOrCreatePersistentStore, PersistentStore } from "./storage";
import { supabase, safeSupabaseSync } from "./supabase";

export interface User {
  id: string;
  google_sub: string;
  email: string;
  name: string;
  username: string | null;
  avatar_url: string;
  has_jalan_id?: boolean;
  has_cocoklogiku?: boolean;
  active_role_slug?: string;
}

const defaultUsers: [string, User][] = [
  [
    "user_demo_1",
    {
      id: "user_demo_1",
      google_sub: "google_sub_123456",
      email: "demo.student@gmail.com",
      name: "Budi Santoso",
      username: "budidev",
      avatar_url: "https://api.dicebear.com/7.x/bottts/svg?seed=budidev",
      has_jalan_id: true,
      has_cocoklogiku: true,
      active_role_slug: "software-engineer",
    },
  ],
];

// Persistent store tahan restart & HMR
export const usersStore: PersistentStore<User> = getOrCreatePersistentStore<User>(
  "users",
  "users.json",
  defaultUsers
);

/**
 * Sinkronisasi data user ke Supabase secara background / non-blocking
 */
export function syncUserToSupabase(user: User): void {
  safeSupabaseSync("syncUserToSupabase", async (client) => {
    const { error } = await client.from("users").upsert({
      id: user.id,
      google_sub: user.google_sub,
      email: user.email,
      name: user.name,
      username: user.username,
      avatar_url: user.avatar_url,
      has_jalan_id: user.has_jalan_id ?? false,
      has_cocoklogiku: user.has_cocoklogiku ?? false,
      active_role_slug: user.active_role_slug ?? null,
      updated_at: new Date().toISOString(),
    });
    if (error) {
      console.warn("[Supabase] Upsert user error:", error.message);
    }
  });
}

/**
 * Menyimpan user ke local store dan mensinkronkannya ke Supabase
 */
export function saveUser(user: User): void {
  usersStore.set(user.id, user);
  syncUserToSupabase(user);
}

// Inisialisasi awal sinkronisasi default users ke Supabase
if (typeof window === "undefined") {
  for (const user of usersStore.values()) {
    syncUserToSupabase(user);
  }
}

// Reserved and inappropriate words filter
export const forbiddenUsernames = new Set([
  "admin",
  "root",
  "system",
  "moderator",
  "official",
  "support",
  "jalanitku",
  "jalanmin",
  "bot",
  "null",
  "undefined",
]);

/**
 * Validates a username according to project rules:
 * - 3 to 20 characters
 * - Letters, digits, underscores, and dots only
 * - Not in forbidden list
 */
export function validateUsername(username: string): { valid: boolean; error?: string } {
  const clean = username.trim().toLowerCase();

  if (clean.length < 3 || clean.length > 20) {
    return { valid: false, error: "Username harus 3–20 karakter." };
  }

  const regex = /^[a-zA-Z0-9_.]+$/;
  if (!regex.test(clean)) {
    return {
      valid: false,
      error: "Hanya huruf, angka, garis bawah (_), dan titik (.) yang diperbolehkan.",
    };
  }

  if (forbiddenUsernames.has(clean)) {
    return { valid: false, error: "Username ini tidak dapat digunakan (nama sistem/terlarang)." };
  }

  return { valid: true };
}

/**
 * Checks if username is already taken by another user
 */
export function isUsernameAvailable(username: string, currentUserId?: string): boolean {
  const clean = username.trim().toLowerCase();
  for (const user of usersStore.values()) {
    if (user.username?.toLowerCase() === clean && user.id !== currentUserId) {
      return false;
    }
  }
  return true;
}

/**
 * Mendapatkan user yang sedang aktif dari session cookie
 * Membaca dari in-memory cache/disk, dengan fallback ke Supabase jika belum ter-cache
 */
export async function getSessionUser(): Promise<User | null> {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("jalanitku_session")?.value;
  if (!sessionId) return null;

  let user = usersStore.get(sessionId) || null;
  if (!user) {
    // Coba ambil dari Supabase jika local cache kosong
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", sessionId)
        .maybeSingle();

      if (!error && data) {
        user = {
          id: data.id,
          google_sub: data.google_sub || "",
          email: data.email || "",
          name: data.name || "",
          username: data.username,
          avatar_url: data.avatar_url || "",
          has_jalan_id: Boolean(data.has_jalan_id),
          has_cocoklogiku: Boolean(data.has_cocoklogiku),
          active_role_slug: data.active_role_slug || undefined,
        };
        usersStore.set(sessionId, user);
      }
    } catch (e) {
      console.warn("[getSessionUser] Supabase fetch fallback error:", e);
    }
  }

  return user;
}
