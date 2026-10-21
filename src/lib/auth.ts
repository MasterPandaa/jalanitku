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
        
        // Persistent store tahan restart & HMR
        export const usersStore: PersistentStore<User> = getOrCreatePersistentStore<User>(
          "users",
          "users.json",
          defaultUsers,
          {
            onSet: (_key, user) => {
              syncUserToSupabase(user);
            },
            onDelete: (userId) => {
              safeSupabaseSync("deleteUser", async (client) => {
                await client.from("users").delete().eq("id", userId);
              });
            },
          }
        );
        
        /**
         * Menyimpan user ke local store dan mensinkronkannya ke Supabase
         */
        export function saveUser(user: User): void {
          usersStore.set(user.id, user);
          syncUserToSupabase(user);
        }
        
        /**
         * Menghapus user dari local store dan Supabase
         */
        export function deleteUser(userId: string): boolean {
          safeSupabaseSync("deleteUserFull", async (client) => {
            await client.from("cocoklogikus").delete().eq("user_id", userId);
            await client.from("rapor_sessions").delete().eq("user_id", userId);
            await client.from("jalan_ids").delete().eq("user_id", userId);
            await client.from("career_sessions").delete().eq("user_id", userId);
            await client.from("users").delete().eq("id", userId);
          });
          return usersStore.delete(userId);
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
         * Checks if username is already taken by another user (synchronous memory check)
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
         * Checks if username is available across both local memory store and Supabase
         */
        export async function checkUsernameAvailability(
          username: string,
          currentUserId?: string
        ): Promise<boolean> {
          const clean = username.trim().toLowerCase();
        
          // 1. Cek local store
          if (!isUsernameAvailable(clean, currentUserId)) {
            return false;
          }
        
          // 2. Cek database Supabase
          try {
            const { data, error } = await supabase
              .from("users")
              .select("id")
              .ilike("username", clean);
        
            if (!error && data && data.length > 0) {
              const takenByOther = data.some((r) => r.id !== currentUserId);
              if (takenByOther) return false;
            }
          } catch (err) {
            console.warn("[checkUsernameAvailability] Supabase fallback error:", err);
          }
        
          return true;
        }
        
        // Alias for flexibility
        export const isUsernameAvailableAsync = checkUsernameAvailability;
        
        /**
         * Mengambil data user berdasarkan ID dengan fallback Supabase
         */
        export async function getUserById(id: string): Promise<User | null> {
          const local = usersStore.get(id);
          if (local) return local;
        
          try {
            const { data, error } = await supabase
              .from("users")
              .select("*")
              .eq("id", id)
              .maybeSingle();
        
            if (!error && data) {
              const user: User = {
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
              usersStore.set(id, user);
              return user;
            }
          } catch (err) {
            console.warn("[getUserById] Supabase fetch fallback error:", err);
          }
        
          return null;
        }
        
        /**
         * Cari user berdasarkan google_sub atau email dengan fallback Supabase
         */
        export async function findUserByGoogleSubOrEmail(
          sub: string,
          email?: string
        ): Promise<User | null> {
          // Cek local store terlebih dahulu
          for (const u of usersStore.values()) {
            if (u.google_sub === sub || (email && u.email?.toLowerCase() === email.toLowerCase())) {
              return u;
            }
          }
        
          // Fallback ke Supabase
          try {
            let query = supabase.from("users").select("*");
            if (sub && email) {
              query = query.or(`google_sub.eq.${sub},email.eq.${email.toLowerCase()}`);
            } else if (sub) {
              query = query.eq("google_sub", sub);
            } else if (email) {
              query = query.eq("email", email.toLowerCase());
            }
        
            const { data, error } = await query.limit(1).maybeSingle();
            if (!error && data) {
              const user: User = {
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
              usersStore.set(user.id, user);
              return user;
            }
          } catch (err) {
            console.warn("[findUserByGoogleSubOrEmail] Supabase fallback error:", err);
          }
        
          return null;
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
        
          return getUserById(sessionId);
        }
        