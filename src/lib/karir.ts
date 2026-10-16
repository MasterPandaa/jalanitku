import questionsData from "@/data/seed/career_questions.json";
import { getRoles, getRoleBySlug, Role } from "./roles";
import { usersStore } from "./auth";

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
    match_percentage: number;
    tagline: string;
    description: string;
    color: string;
    mascot_key: string;
  };
  secondary_roles: Array<{
    slug: string;
    name: string;
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

// In-memory sessions and jalan_ids storage (one JalanID per user, upsert)
export const careerSessions: Map<string, CareerSession> = new Map();
export const jalanIdsStore: Map<string, CareerResult> = new Map();

/**
 * Starts a new JalanKarir session for user.
 * If user already has an active JalanID, the old session is replaced.
 */
export function startCareerSession(userId: string): CareerSession {
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

  if (session.current_level < 5) {
    session.current_level += 1;
  }
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
    const max = maxPossibleScores[role.slug] || 1;
    // Percentage formula: baseline 50% + ratio of actual score to max score * 50%
    const ratio = Math.max(-1, Math.min(1, raw / max));
    const percentage = Math.round((50 + ratio * 45) * 10) / 10; // e.g. 92.5%

    return {
      slug: role.slug,
      name: role.nama.id,
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
      match_percentage: top1.percentage,
      tagline: top1.tagline,
      description: top1.description,
      color: top1.color,
      mascot_key: top1.mascot_key,
    },
    secondary_roles: [
      { slug: top2.slug, name: top2.name, match_percentage: top2.percentage, color: top2.color },
      { slug: top3.slug, name: top3.name, match_percentage: top3.percentage, color: top3.color },
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

  // Update user active role status
  if (user) {
    user.has_jalan_id = true;
    user.active_role_slug = top1.slug;
    usersStore.set(user.id, user);
  }

  return result;
}

/**
 * Gets user's active JalanID
 */
export function getUserJalanID(userId: string): CareerResult | undefined {
  return jalanIdsStore.get(userId);
}
