import questionsData from "@/data/seed/career_questions.json";
import { getRoles, getRoleBySlug, Role } from "./roles";
import { usersStore, saveUser } from "./auth";
import { getOrCreatePersistentStore, PersistentStore } from "./storage";
import { safeSupabaseSync, supabase } from "./supabase";

export interface CareerSession {
  id: string;
  user_id: string;
  status: "in_progress" | "completed";
  current_level: number;
  seed: string;
  answers: Map<string, { value: number | string; duration_ms: number }>;
  created_at: string;
  completed_at?: string;
  result?: CareerResult;
}

export interface CareerResult {
  card_code: string;
  user_id: string;
  username: string;
  top_role: {
    slug: string;
    name: string;
    julukan?: string;
    match_percentage: number;
    tagline: string;
    description: string;
    color: string;
    mascot_key: string;
  };
  secondary_roles: Array<{
    slug: string;
    name: string;
    julukan?: string;
    match_percentage: number;
    color: string;
  }>;
  all_scores: Array<{
    slug: string;
    name: string;
    score: number;
    percentage: number;
  }>;
  is_tie: boolean;
  issued_at: string;
}

/**
 * Sinkronisasi CareerSession ke Supabase
 */
export function syncCareerSessionToSupabase(session: CareerSession): void {
  safeSupabaseSync("syncCareerSession", async (client) => {
    const answersObj = session.answers instanceof Map
      ? Object.fromEntries(session.answers.entries())
      : (session.answers as any);

    const { error } = await client.from("career_sessions").upsert({
      id: session.id,
      user_id: session.user_id,
      status: session.status,
      current_level: session.current_level,
      seed: session.seed,
      answers: answersObj,
      result: session.result ? (session.result as any) : null,
      created_at: session.created_at,
      completed_at: session.completed_at || null,
    });
    if (error) console.warn("[Supabase] Upsert career_sessions error:", error.message);
  });
}

/**
 * Sinkronisasi JalanID ke Supabase
 */
export function syncJalanIdToSupabase(result: CareerResult): void {
  safeSupabaseSync("syncJalanId", async (client) => {
    const { error } = await client.from("jalan_ids").upsert({
      id: result.user_id,
      user_id: result.user_id,
      card_code: result.card_code,
      username: result.username,
      top_role: result.top_role as any,
      secondary_roles: result.secondary_roles as any,
      all_scores: result.all_scores as any,
      is_tie: result.is_tie,
      issued_at: result.issued_at,
    });
    if (error) console.warn("[Supabase] Upsert jalan_ids error:", error.message);
  });
}

// Persistent sessions and jalan_ids storage (one JalanID per user, upsert)
export const careerSessions: PersistentStore<CareerSession> = getOrCreatePersistentStore<CareerSession>(
  "career_sessions",
  "career_sessions.json",
  [],
  {
    serialize: (session: CareerSession) => ({
      ...session,
      answers: session.answers instanceof Map
        ? Object.fromEntries(session.answers.entries())
        : session.answers,
    }),
    deserialize: (raw: any): CareerSession => ({
      ...raw,
      answers: raw.answers
        ? new Map(Object.entries(raw.answers))
        : new Map(),
    }),
    onSet: (_key, session) => {
      syncCareerSessionToSupabase(session);
    },
    onDelete: (key) => {
      safeSupabaseSync("deleteCareerSession", async (client) => {
        await client.from("career_sessions").delete().eq("id", key);
      });
    },
  }
);

export const jalanIdsStore: PersistentStore<CareerResult> = getOrCreatePersistentStore<CareerResult>(
  "jalan_ids",
  "jalan_ids.json",
  [],
  {
    onSet: (_key, result) => {
      syncJalanIdToSupabase(result);
    },
    onDelete: (key) => {
      safeSupabaseSync("deleteJalanId", async (client) => {
        await client.from("jalan_ids").delete().eq("user_id", key);
      });
    },
  }
);

/**
 * Starts a new JalanKarir session for user.
 * If user already has an active JalanID, the old session is replaced.
 */
export function startCareerSession(userId: string): CareerSession {
  // Arsipkan sesi in_progress lama milik user ini jika ada
  for (const [sId, sess] of careerSessions.entries()) {
    if (sess.user_id === userId && sess.status === "in_progress") {
      sess.status = "completed";
      careerSessions.set(sId, sess);
      syncCareerSessionToSupabase(sess);
    }
  }

  const sessionId = `csess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const seed = `${Date.now()}-${userId}`;

  const session: CareerSession = {
    id: sessionId,
    user_id: userId,
    status: "in_progress",
    current_level: 1,
    seed,
    answers: new Map(),
    created_at: new Date().toISOString(),
  };

  careerSessions.set(sessionId, session);
  syncCareerSessionToSupabase(session);
  return session;
}

/**
 * Gets sanitized questions for a given session and level.
 * NOTE: Role weights are strictly stripped on the server and NEVER sent to the client!
 */
export function getQuestionsForLevel(sessionId: string, level: number) {
  const session = careerSessions.get(sessionId);
  if (!session) throw new Error("Sesi tidak ditemukan");

  const levelQuestions = (questionsData as any[]).filter((q) => q.level === level);

  // Return sanitized questions (no weights)
  return levelQuestions.map((q) => {
    if (q.type === "likert") {
      return {
        id: q.id,
        level: q.level,
        theme: q.theme,
        type: q.type,
        text: q.text.id,
        scale_min: 1,
        scale_max: 5,
      };
    } else {
      return {
        id: q.id,
        level: q.level,
        theme: q.theme,
        type: q.type,
        text: q.text.id,
        options: q.options.map((opt: any) => ({
          id: opt.id,
          key: opt.key,
          text: opt.text.id,
        })),
      };
    }
  });
}

/**
 * Records answers submitted for a level
 */
export function recordLevelAnswers(
  sessionId: string,
  answers: Array<{ question_id: string; answer: number | string; duration_ms?: number }>
) {
  const session = careerSessions.get(sessionId);
  if (!session) throw new Error("Sesi tidak ditemukan");

  for (const a of answers) {
    session.answers.set(a.question_id, {
      value: a.answer,
      duration_ms: a.duration_ms || 1000,
    });
  }

  if (session.current_level < 4) {
    session.current_level += 1;
  }

  careerSessions.set(sessionId, session);
  syncCareerSessionToSupabase(session);
}

/**
 * Normalizes a Likert 1-5 answer into [-2, -1, 0, +1, +2]
 */
function normalizeLikert(val: number): number {
  switch (Number(val)) {
    case 1: return -2;
    case 2: return -1;
    case 3: return 0;
    case 4: return 1;
    case 5: return 2;
    default: return 0;
  }
}

/**
 * Calculates career recommendations using the vector weight matrix formula:
 * skor_role(r) = Σ ( nilai_jawaban_i × bobot_i,r )
 * persen_role(r) = skor_role(r) / skor_maks_role(r) × 100
 */
export function calculateCareerResult(sessionId: string): CareerResult {
  const session = careerSessions.get(sessionId);
  if (!session) throw new Error("Sesi tidak ditemukan");

  if (!session.answers || session.answers.size === 0) {
    throw new Error("Tidak dapat memproses hasil tes: belum ada pertanyaan yang dijawab.");
  }

  const roles = getRoles();
  const rawScores: Record<string, number> = {};
  const maxPossibleScores: Record<string, number> = {};

  // Initialize
  roles.forEach((r) => {
    rawScores[r.slug] = 0;
    maxPossibleScores[r.slug] = 0;
  });

  // Calculate scores per answered question
  const questionsMap = new Map((questionsData as any[]).map((q) => [q.id, q]));

  for (const [qid, ansRecord] of session.answers.entries()) {
    const q = questionsMap.get(qid);
    if (!q) continue;

    if (q.type === "likert") {
      const normVal = normalizeLikert(Number(ansRecord.value));
      const weights = q.weights || {};

      for (const [roleSlug, weight] of Object.entries(weights)) {
        if (roleSlug in rawScores) {
          rawScores[roleSlug] += normVal * (weight as number);
          // Theoretical max is when normalized value is +2
          maxPossibleScores[roleSlug] += Math.max(0, 2 * (weight as number));
        }
      }
    } else if (q.type === "preference") {
      const selectedOption = q.options?.find(
        (o: any) => o.id === ansRecord.value || o.key === ansRecord.value
      );
      if (selectedOption?.weights) {
        for (const [roleSlug, weight] of Object.entries(selectedOption.weights)) {
          if (roleSlug in rawScores) {
            rawScores[roleSlug] += weight as number;
          }
        }
      }
      // For preference, max possible is max weight offered in that question
      for (const role of roles) {
        let maxWeightForRole = 0;
        q.options?.forEach((o: any) => {
          if (o.weights?.[role.slug]) {
            maxWeightForRole = Math.max(maxWeightForRole, o.weights[role.slug]);
          }
        });
        maxPossibleScores[role.slug] += maxWeightForRole;
      }
    }
  }

  // Calculate percentages (normalized to 0-100%, with base baseline)
  const ranked = roles.map((role) => {
    const raw = rawScores[role.slug] || 0;
    const max = maxPossibleScores[role.slug] || 0;

    // Jika suatu role sama sekali tidak memiliki bobot penilaian pada soal yang dijawab
    if (max === 0) {
      return {
        slug: role.slug,
        name: role.nama.id,
        julukan: role.julukan,
        score: 0,
        percentage: 0,
        color: role.warna,
        tagline: role.tagline.id,
        description: role.deskripsi.id,
        mascot_key: role.mascot_key,
      };
    }

    // Percentage formula: baseline 50% + ratio of actual score to max score * 45%
    const ratio = Math.max(-1, Math.min(1, raw / max));
    const percentage = Math.round((50 + ratio * 45) * 10) / 10; // e.g. 92.5%

    return {
      slug: role.slug,
      name: role.nama.id,
      julukan: role.julukan,
      score: raw,
      percentage: Math.max(10, Math.min(99, percentage)),
      color: role.warna,
      tagline: role.tagline.id,
      description: role.deskripsi.id,
      mascot_key: role.mascot_key,
    };
  });

  // Sort descending by percentage
  ranked.sort((a, b) => b.percentage - a.percentage);

  const top1 = ranked[0];
  const top2 = ranked[1];
  const top3 = ranked[2];

  // Tie detection: difference <= 3 points
  const is_tie = Math.abs(top1.percentage - top2.percentage) <= 3;

  // Retrieve user
  const user = usersStore.get(session.user_id);
  const username = user?.username || "calon_talenta";

  // Card code generation: JID-XXXXXX
  const card_code = `JID-${Math.floor(100000 + Math.random() * 900000)}`;

  const result: CareerResult = {
    card_code,
    user_id: session.user_id,
    username,
    top_role: {
      slug: top1.slug,
      name: top1.name,
      julukan: top1.julukan,
      match_percentage: top1.percentage,
      tagline: top1.tagline,
      description: top1.description,
      color: top1.color,
      mascot_key: top1.mascot_key,
    },
    secondary_roles: [
      { slug: top2.slug, name: top2.name, julukan: top2.julukan, match_percentage: top2.percentage, color: top2.color },
      { slug: top3.slug, name: top3.name, julukan: top3.julukan, match_percentage: top3.percentage, color: top3.color },
    ],
    all_scores: ranked,
    is_tie,
    issued_at: new Date().toISOString().split("T")[0],
  };

  session.status = "completed";
  session.completed_at = new Date().toISOString();
  session.result = result;

  // UPSERT into JalanID store (one JalanID per user)
  jalanIdsStore.set(session.user_id, result);
  syncCareerSessionToSupabase(session);
  syncJalanIdToSupabase(result);

  // Update user active role status
  if (user) {
    user.has_jalan_id = true;
    user.active_role_slug = top1.slug;
    saveUser(user);
  }

  return result;
}

/**
 * Gets user's active JalanID (synchronous local memory lookup)
 */
export function getUserJalanID(userId: string): CareerResult | undefined {
  return jalanIdsStore.get(userId);
}

/**
 * Gets user's active JalanID with fallback to Supabase if not in local store
 */
export async function getUserJalanIDAsync(userId: string): Promise<CareerResult | null> {
  const local = jalanIdsStore.get(userId);
  if (local) return local;

  try {
    const { data, error } = await supabase
      .from("jalan_ids")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (!error && data) {
      const result: CareerResult = {
        card_code: data.card_code || "",
        user_id: data.user_id || userId,
        username: data.username || "",
        top_role: (data.top_role as any) || { slug: "", name: "", match_percentage: 0, tagline: "", description: "", color: "", mascot_key: "" },
        secondary_roles: (data.secondary_roles as any) || [],
        all_scores: (data.all_scores as any) || [],
        is_tie: Boolean(data.is_tie),
        issued_at: data.issued_at || "",
      };
      jalanIdsStore.set(userId, result);
      return result;
    }
  } catch (err) {
    console.warn("[Supabase] Fetch jalan_id fallback error:", err);
  }

  return null;
}

/**
 * Gets career session with fallback to Supabase if not in local store
 */
export async function getCareerSessionAsync(sessionId: string): Promise<CareerSession | null> {
  const local = careerSessions.get(sessionId);
  if (local) return local;

  try {
    const { data, error } = await supabase
      .from("career_sessions")
      .select("*")
      .eq("id", sessionId)
      .maybeSingle();

    if (!error && data) {
      const answersMap = new Map();
      if (data.answers && typeof data.answers === "object") {
        for (const [k, v] of Object.entries(data.answers)) {
          answersMap.set(k, v);
        }
      }
      const session: CareerSession = {
        id: data.id,
        user_id: data.user_id || "",
        status: (data.status as any) || "in_progress",
        current_level: data.current_level || 1,
        seed: data.seed || "",
        answers: answersMap,
        created_at: data.created_at || "",
        completed_at: data.completed_at || undefined,
        result: (data.result as any) || undefined,
      };
      careerSessions.set(sessionId, session);
      return session;
    }
  } catch (err) {
    console.warn("[Supabase] Fetch career_session fallback error:", err);
  }

  return null;
}

/**
 * Mengambil sesi JalanKarir yang sedang aktif (in_progress) untuk seorang user.
 */
export function getActiveCareerSession(userId: string): CareerSession | undefined {
  const userSessions = Array.from(careerSessions.values())
    .filter((s) => s.user_id === userId && s.status === "in_progress");

  if (userSessions.length === 0) return undefined;
  // Urutkan berdasarkan waktu pembuatan terbaru
  userSessions.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  return userSessions[0];
}

/**
 * Mengambil sesi JalanKarir aktif dengan fallback sinkronisasi dari Supabase.
 */
export async function getActiveCareerSessionAsync(userId: string): Promise<CareerSession | null> {
  const local = getActiveCareerSession(userId);
  if (local) return local;

  try {
    const { data, error } = await supabase
      .from("career_sessions")
      .select("*")
      .eq("user_id", userId)
      .eq("status", "in_progress")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!error && data) {
      const answersMap = new Map();
      if (data.answers && typeof data.answers === "object") {
        for (const [k, v] of Object.entries(data.answers)) {
          answersMap.set(k, v);
        }
      }
      const session: CareerSession = {
        id: data.id,
        user_id: data.user_id || userId,
        status: (data.status as any) || "in_progress",
        current_level: data.current_level || 1,
        seed: data.seed || "",
        answers: answersMap,
        created_at: data.created_at || "",
        completed_at: data.completed_at || undefined,
        result: (data.result as any) || undefined,
      };
      careerSessions.set(session.id, session);
      return session;
    }
  } catch (err) {
    console.warn("[Supabase] Fetch active career_session fallback error:", err);
  }

  return null;
}

