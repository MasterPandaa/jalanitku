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

// In-memory / file-persisted mock store for development
export const usersStore: Map<string, User> = new Map([
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
]);

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
