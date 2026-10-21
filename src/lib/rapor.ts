import fs from "fs";
import path from "path";
import { getCompetenciesByRoleSlug } from "./roles";
import { getOrCreatePersistentStore, PersistentStore } from "./storage";
import { safeSupabaseSync, supabase } from "./supabase";

export interface RaporQuestion {
  id: string;
  role_slug: string;
  level: number;
  level_name: string;
  competency_id: string;
  competency_name: string;
  text: { id: string };
  options: { key: string; text: { id: string } }[];
  correct_key: string;
  explanation: { id: string };
}

export interface ClientRaporQuestion {
  id: string;
  level: number;
  level_name: string;
  competency_name: string;
  text: string;
  options: { key: string; text: string }[];
}

export interface RaporSessionState {
  sessionId: string;
  userId: string;
  roleSlug: string;
  currentLevel: number;
  totalLevels: number;
  isFinished: boolean;
  // level -> questionId -> chosenKey
  answers: Record<number, Record<string, string>>;
  startedAt: string;
  // Daftar soal yang dialokasikan untuk sesi ini (dengan kunci tersimpan di server)
  assignedQuestions: RaporQuestion[];
}

export interface CompetencyScore {
  competencyId: string;
  competencyName: string;
  totalQuestions: number;
  correctQuestions: number;
  percentage: number;
}

export interface LevelScore {
  level: number;
  levelName: string;
  weight: number;
  totalQuestions: number;
  correctQuestions: number;
  percentage: number;
}

export interface CocoklogikuRecord {
  id: string;
  userId: string;
  username: string;
  roleSlug: string;
  roleName: string;
  finalScore: number;
  matchLabel: "Sangat Cocok" | "Cocok" | "Cukup Cocok" | "Belum Cocok";
  levelScores: LevelScore[];
  competencyScores: CompetencyScore[];
  reason: {
    summary: string;
    strengths: string;
    weaknesses: string;
    levelInsight: string;
  };
  recommendations: {
    topic: string;
    action: string;
  }[];
  alternativeRoles: {
    roleSlug: string;
    roleName: string;
    reason: string;
  }[];
  completedAt: string;
}

export interface QuestionReviewItem {
  id: string;
  level: number;
  levelName: string;
  competencyName: string;
  questionText: string;
  options: { key: string; text: string }[];
  userChosenKey: string;
  correctKey: string;
  isCorrect: boolean;
  explanation: string;
}

/**
 * Sinkronisasi RaporSession ke Supabase
 */
export function syncRaporSessionToSupabase(session: RaporSessionState): void {
  safeSupabaseSync("syncRaporSession", async (client) => {
    const { error } = await client.from("rapor_sessions").upsert({
      id: session.sessionId,
      user_id: session.userId,
      role_slug: session.roleSlug,
      current_level: session.currentLevel,
      total_levels: session.totalLevels,
      is_finished: session.isFinished,
      answers: session.answers as any,
      assigned_questions: session.assignedQuestions as any,
      started_at: session.startedAt,
    });
    if (error) console.warn("[Supabase] Upsert rapor_sessions error:", error.message);
  });
}

/**
 * Sinkronisasi Cocoklogiku ke Supabase
 */
export function syncCocoklogikuToSupabase(record: CocoklogikuRecord): void {
  safeSupabaseSync("syncCocoklogiku", async (client) => {
    const { error } = await client.from("cocoklogikus").upsert({
      id: record.userId,
      user_id: record.userId,
      username: record.username,
      role_slug: record.roleSlug,
      role_name: record.roleName,
      final_score: record.finalScore,
      match_label: record.matchLabel,
      level_scores: record.levelScores as any,
      competency_scores: record.competencyScores as any,
      reason: record.reason as any,
      recommendations: record.recommendations as any,
      alternative_roles: record.alternativeRoles as any,
      completed_at: record.completedAt,
    });
    if (error) console.warn("[Supabase] Upsert cocoklogikus error:", error.message);
  });
}

// Persistent store untuk sesi tes dan hasil Cocoklogiku aktif pengguna
export const raporSessions: PersistentStore<RaporSessionState> = getOrCreatePersistentStore<RaporSessionState>(
  "rapor_sessions",
  "rapor_sessions.json",
  [],
  {
    onSet: (_key, session) => {
      syncRaporSessionToSupabase(session);
    },
    onDelete: (key) => {
      safeSupabaseSync("deleteRaporSession", async (client) => {
        await client.from("rapor_sessions").delete().eq("id", key);
      });
    },
  }
);

export const cocoklogikuByUser: PersistentStore<CocoklogikuRecord> = getOrCreatePersistentStore<CocoklogikuRecord>(
  "cocoklogiku",
  "cocoklogiku.json",
  [],
  {
    onSet: (_key, record) => {
      syncCocoklogikuToSupabase(record);
    },
    onDelete: (key) => {
      safeSupabaseSync("deleteCocoklogiku", async (client) => {
        await client.from("cocoklogikus").delete().eq("user_id", key);
      });
    },
  }
);

const LEVEL_WEIGHTS: Record<number, number> = {
  1: 1.0,
  2: 1.5,
  3: 2.0,
  4: 2.5,
  5: 3.0,
};

const LEVEL_NAMES: Record<number, string> = {
  1: "Dasar",
  2: "Pemula",
  3: "Menengah",
  4: "Lanjut",
  5: "Ahli",
};

// Roles yang tersedia di Batch R1
export const AVAILABLE_RAPOR_ROLES = [
  "software-engineer",
  "data-analyst",
  "uiux-designer",
  "network-engineer",
  "quality-assurance",
];

// Load Bank Soal dari JSON
let cachedQuestions: RaporQuestion[] | null = null;
export function getAllRaporQuestions(): RaporQuestion[] {
  if (cachedQuestions) return cachedQuestions;
  const filePath = path.join(process.cwd(), "src/data/seed/rapor_questions.json");
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, "utf-8");
    cachedQuestions = JSON.parse(raw);
    return cachedQuestions!;
  }
  return [];
}

/**
 * Acak array secara deterministik acak (Fisher-Yates)
 */
function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Memulai sesi tes JalanRapor baru
 */
export function startRaporSession(userId: string, roleSlug: string): RaporSessionState {
  if (!AVAILABLE_RAPOR_ROLES.includes(roleSlug)) {
    throw new Error(`Bank soal untuk role '${roleSlug}' belum tersedia.`);
  }

  const allQuestions = getAllRaporQuestions().filter((q) => q.role_slug === roleSlug);
  if (allQuestions.length === 0) {
    throw new Error(`Tidak ada soal ditemukan untuk role ${roleSlug}`);
  }

  // Pilih soal per level (level 1 sampai 5)
  const assignedQuestions: RaporQuestion[] = [];
  for (let level = 1; level <= 5; level++) {
    const levelPool = allQuestions.filter((q) => q.level === level);
    // Acak urutan soal di dalam level
    const shuffledPool = shuffle(levelPool);
    // Ambil semua atau subset yang tersedia (misal max 5 atau semua jika <= 5)
    assignedQuestions.push(...shuffledPool);
  }

  const sessionId = `rsess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  const session: RaporSessionState = {
    sessionId,
    userId,
    roleSlug,
    currentLevel: 1,
    totalLevels: 5,
    isFinished: false,
    answers: {},
    startedAt: new Date().toISOString(),
    assignedQuestions,
  };

  raporSessions.set(sessionId, session);
  syncRaporSessionToSupabase(session);
  return session;
}

/**
 * Mendapatkan pertanyaan level tertentu yang sudah disanitasi (tanpa correct_key & explanation)
 */
export function getSanitizedQuestionsForLevel(sessionId: string, level: number): ClientRaporQuestion[] {
  const session = raporSessions.get(sessionId);
  if (!session) throw new Error("Sesi tes tidak valid atau kedaluwarsa.");

  const levelQuestions = session.assignedQuestions.filter((q) => q.level === level);

  return levelQuestions.map((q) => {
    // Acak opsi untuk setiap peserta tapi pertahankan key aslinya
    const shuffledOptions = shuffle(q.options).map((opt) => ({
      key: opt.key,
      text: opt.text.id,
    }));

    return {
      id: q.id,
      level: q.level,
      level_name: q.level_name,
      competency_name: q.competency_name,
      text: q.text.id,
      options: shuffledOptions,
    };
  });
}

export function getRaporSession(sessionId: string): RaporSessionState | null {
  return raporSessions.get(sessionId) || null;
}

/**
 * Simpan jawaban untuk level tertentu dan majukan currentLevel jika belum selesai
 */
export function submitRaporLevelAnswers(
  sessionId: string,
  level: number,
  answers: Record<string, string>
): { nextLevel: number | null; isFinished: boolean } {
  const session = raporSessions.get(sessionId);
  if (!session) throw new Error("Sesi tidak ditemukan.");
  if (session.isFinished) throw new Error("Sesi sudah selesai.");

  session.answers[level] = {
    ...(session.answers[level] || {}),
    ...answers,
  };

  let nextLevel: number | null = null;
  if (level < 5) {
    session.currentLevel = level + 1;
    nextLevel = session.currentLevel;
  } else {
    session.isFinished = true;
  }

  raporSessions.set(sessionId, session);
  syncRaporSessionToSupabase(session);

  return { nextLevel, isFinished: session.isFinished };
}

/**
 * Selesaikan sesi dan hitung skor Cocoklogiku berbobot
 */
export function finishRaporSession(sessionId: string, username: string, roleName: string): CocoklogikuRecord {
  const session = raporSessions.get(sessionId);
  if (!session) throw new Error("Sesi tidak ditemukan.");

  // Hitung skor per level
  const levelScores: LevelScore[] = [];
  let totalWeightedScore = 0;
  let totalWeight = 0;

  for (let lvl = 1; lvl <= 5; lvl++) {
    const levelQuestions = session.assignedQuestions.filter((q) => q.level === lvl);
    const userLevelAnswers = session.answers[lvl] || {};
    let correctCount = 0;

    for (const q of levelQuestions) {
      if (userLevelAnswers[q.id] === q.correct_key) {
        correctCount++;
      }
    }

    const totalQ = levelQuestions.length;
    const percentage = totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;
    const weight = LEVEL_WEIGHTS[lvl] || 1;

    levelScores.push({
      level: lvl,
      levelName: LEVEL_NAMES[lvl],
      weight,
      totalQuestions: totalQ,
      correctQuestions: correctCount,
      percentage,
    });

    totalWeightedScore += percentage * weight;
    totalWeight += weight;
  }

  const finalScore = totalWeight > 0 ? Math.round(totalWeightedScore / totalWeight) : 0;

  // Hitung skor per kompetensi
  const competencies = getCompetenciesByRoleSlug(session.roleSlug);
  const competencyScoreMap: Record<
    string,
    { name: string; total: number; correct: number }
  > = {};

  for (const c of competencies) {
    competencyScoreMap[c.id] = { name: c.nama.id, total: 0, correct: 0 };
  }

  for (const q of session.assignedQuestions) {
    const userAns = session.answers[q.level]?.[q.id];
    if (!competencyScoreMap[q.competency_id]) {
      competencyScoreMap[q.competency_id] = { name: q.competency_name, total: 0, correct: 0 };
    }
    competencyScoreMap[q.competency_id].total++;
    if (userAns === q.correct_key) {
      competencyScoreMap[q.competency_id].correct++;
    }
  }

  const competencyScores: CompetencyScore[] = Object.entries(competencyScoreMap).map(
    ([id, data]) => ({
      competencyId: id,
      competencyName: data.name,
      totalQuestions: data.total,
      correctQuestions: data.correct,
      percentage: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
    })
  );

  // Urutkan kompetensi dari nilai tertinggi ke terendah
  competencyScores.sort((a, b) => b.percentage - a.percentage);

  // Tentukan Label Kecocokan
  let matchLabel: "Sangat Cocok" | "Cocok" | "Cukup Cocok" | "Belum Cocok";
  if (finalScore >= 80) {
    matchLabel = "Sangat Cocok";
  } else if (finalScore >= 60) {
    matchLabel = "Cocok";
  } else if (finalScore >= 40) {
    matchLabel = "Cukup Cocok";
  } else {
    matchLabel = "Belum Cocok";
  }

  // Buat Narasi Deterministik "Reason"
  const highestComp = competencyScores[0];
  const lowestComp = competencyScores[competencyScores.length - 1];

  // Cari drop-off level
  let dropOffLevelName = "";
  for (let i = 0; i < levelScores.length - 1; i++) {
    if (levelScores[i].percentage >= 60 && levelScores[i + 1].percentage < 50) {
      dropOffLevelName = levelScores[i + 1].levelName;
      break;
    }
  }

  const summary = `Berdasarkan pengujian teknis 5 level, kamu memperoleh skor akhir ${finalScore}/100 dengan predikat ${matchLabel} untuk role ${roleName}.`;
  const strengths = highestComp
    ? `Kekuatan terbesarmu berada pada pilar '${highestComp.competencyName}' dengan akurasi penguasaan mencapai ${highestComp.percentage}%. Kamu menguasai fondasi konseptual bidang ini dengan sangat solid.`
    : "Kamu menunjukkan pemahaman awal yang baik pada aspek dasar.";

  const weaknesses = lowestComp && lowestComp.percentage < 70
    ? `Area yang paling membutuhkan akselerasi belajar adalah '${lowestComp.competencyName}' (akurasi ${lowestComp.percentage}%). Mengasah aspek ini akan menjadi pengungkit terbesar peningkatan karirmu.`
    : "Secara umum tidak ada gap kompetensi yang kritis, hanya perlu terus memoles studi kasus kompleks.";

  const levelInsight = dropOffLevelName
    ? `Performa jawabanmu mulai mengalami hambatan di Level ${dropOffLevelName}. Ini adalah sinyal jelas batas zona nyamanmu saat ini.`
    : levelScores[4]?.percentage >= 70
    ? "Kamu mampu mempertahankan ketajaman analisis bahkan pada skenario tingkat Ahli (Level 5)!"
    : "Performa relatif stabil di setiap tahapan uji.";

  // Rekomendasi Belajar
  const recommendations: { topic: string; action: string }[] = [];
  if (lowestComp) {
    recommendations.push({
      topic: `Penguatan ${lowestComp.competencyName}`,
      action: `Pelajari konsep fundamental dan kerjakan 3 proyek hands-on kecil yang secara spesifik menantang pemahaman ${lowestComp.competencyName}.`,
    });
  }

  const secondLowest = competencyScores.length > 1 ? competencyScores[competencyScores.length - 2] : null;
  if (secondLowest && secondLowest.percentage < 80) {
    recommendations.push({
      topic: `Pendalaman ${secondLowest.competencyName}`,
      action: `Bedah best practices industri dan arsitektur studi kasus nyata terkait ${secondLowest.competencyName}.`,
    });
  }

  recommendations.push({
    topic: "Uji Skenario Kasus Nyata (Case Study)",
    action: "Praktikkan penyelesaian masalah dengan batasan trade-off riil, bukan sekadar teori ideal.",
  });

  // Saran Alternatif Role jika skor di bawah 60 atau sebagai opsi silang
  const alternativeRoles: { roleSlug: string; roleName: string; reason: string }[] = [];
  if (session.roleSlug === "software-engineer" && finalScore < 60) {
    alternativeRoles.push({
      roleSlug: "quality-assurance",
      roleName: "Quality Assurance",
      reason: "Ketelitianmu dalam mengidentifikasi error logika dapat menjadi modal kuat dalam otomatisasi uji dan verifikasi kualitas.",
    });
  } else if (session.roleSlug === "data-analyst" && finalScore < 60) {
    alternativeRoles.push({
      roleSlug: "business-analyst",
      roleName: "Business Analyst",
      reason: "Kamu memiliki ketertarikan kuat pada pemahaman alur data bisnis yang sangat cocok dipadukan dengan pemetaan requirement produk.",
    });
  } else if (session.roleSlug === "uiux-designer" && finalScore < 60) {
    alternativeRoles.push({
      roleSlug: "frontend-developer",
      roleName: "Frontend Developer",
      reason: "Ketajaman visualmu bisa diperkuat dengan kemampuan implementasi kode komponen antarmuka.",
    });
  } else {
    // Alternatif untuk perluasan karir (skor tinggi)
    if (session.roleSlug === "software-engineer") {
      alternativeRoles.push({
        roleSlug: "devops-engineer",
        roleName: "DevOps Engineer",
        reason: "Pemahaman arsitektur kodingmu yang kokoh adalah fondasi ideal untuk orkestrasi cloud dan otomasi CI/CD.",
      });
    } else if (session.roleSlug === "data-analyst") {
      alternativeRoles.push({
        roleSlug: "data-scientist",
        roleName: "Data Scientist",
        reason: "Fondasi SQL dan statistika yang sudah kamu kuasai memudahkan lompatan ke pemodelan Machine Learning.",
      });
    } else if (session.roleSlug === "network-engineer") {
      alternativeRoles.push({
        roleSlug: "cloud-engineer",
        roleName: "Cloud Engineer",
        reason: "Penguasaan subnetting dan protokol transport memudahkanmu merancang arsitektur VPC multi-region di cloud.",
      });
    } else if (session.roleSlug === "quality-assurance") {
      alternativeRoles.push({
        roleSlug: "security-analyst",
        roleName: "Security Analyst",
        reason: "Insting tajam menemukan celah sistem adalah modal berharga untuk pengujian penetrasi dan audit keamanan.",
      });
    }
  }

  const record: CocoklogikuRecord = {
    id: `cocok_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
    userId: session.userId,
    username,
    roleSlug: session.roleSlug,
    roleName,
    finalScore,
    matchLabel,
    levelScores,
    competencyScores,
    reason: {
      summary,
      strengths,
      weaknesses,
      levelInsight,
    },
    recommendations,
    alternativeRoles,
    completedAt: new Date().toISOString(),
  };

  // Upsert: Satu user = Tepat 1 Cocoklogiku aktif (menimpa yang lama)
  cocoklogikuByUser.set(session.userId, record);
  session.isFinished = true;
  raporSessions.set(sessionId, session);

  syncRaporSessionToSupabase(session);
  syncCocoklogikuToSupabase(record);

  return record;
}

/**
 * Mendapatkan Cocoklogiku aktif pengguna (synchronous local memory lookup)
 */
export function getUserCocoklogiku(userId: string): CocoklogikuRecord | null {
  return cocoklogikuByUser.get(userId) || null;
}

/**
 * Mendapatkan Cocoklogiku aktif pengguna dengan fallback ke Supabase
 */
export async function getUserCocoklogikuAsync(userId: string): Promise<CocoklogikuRecord | null> {
  const local = cocoklogikuByUser.get(userId);
  if (local) return local;

  try {
    const { data, error } = await supabase
      .from("cocoklogikus")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (!error && data) {
      const record: CocoklogikuRecord = {
        id: data.id,
        userId: data.user_id || userId,
        username: data.username || "",
        roleSlug: data.role_slug || "",
        roleName: data.role_name || "",
        finalScore: data.final_score || 0,
        matchLabel: (data.match_label as any) || "Cukup Cocok",
        levelScores: (data.level_scores as any) || [],
        competencyScores: (data.competency_scores as any) || [],
        reason: (data.reason as any) || { summary: "", strengths: "", weaknesses: "", levelInsight: "" },
        recommendations: (data.recommendations as any) || [],
        alternativeRoles: (data.alternative_roles as any) || [],
        completedAt: data.completed_at || "",
      };
      cocoklogikuByUser.set(userId, record);
      return record;
    }
  } catch (err) {
    console.warn("[Supabase] Fetch cocoklogikus fallback error:", err);
  }

  return null;
}

/**
 * Mendapatkan sesi tes rapor dengan fallback ke Supabase
 */
export async function getRaporSessionAsync(sessionId: string): Promise<RaporSessionState | null> {
  const local = raporSessions.get(sessionId);
  if (local) return local;

  try {
    const { data, error } = await supabase
      .from("rapor_sessions")
      .select("*")
      .eq("id", sessionId)
      .maybeSingle();

    if (!error && data) {
      const session: RaporSessionState = {
        sessionId: data.id,
        userId: data.user_id || "",
        roleSlug: data.role_slug || "",
        currentLevel: data.current_level || 1,
        totalLevels: data.total_levels || 5,
        isFinished: Boolean(data.is_finished),
        answers: (data.answers as any) || {},
        startedAt: data.started_at || "",
        assignedQuestions: (data.assigned_questions as any) || [],
      };
      raporSessions.set(sessionId, session);
      return session;
    }
  } catch (err) {
    console.warn("[Supabase] Fetch rapor_session fallback error:", err);
  }

  return null;
}

/**
 * Hapus Cocoklogiku pengguna (misal saat akun dihapus)
 */
export function deleteUserCocoklogiku(userId: string): boolean {
  safeSupabaseSync("deleteUserCocoklogiku", async (client) => {
    await client.from("cocoklogikus").delete().eq("user_id", userId);
  });
  return cocoklogikuByUser.delete(userId);
}

/**
 * Mengambil review pembahasan soal sesi terakhir
 */
export function getRaporSessionReview(sessionId: string): QuestionReviewItem[] {
  const session = raporSessions.get(sessionId);
  if (!session) throw new Error("Sesi tes tidak ditemukan.");
  if (!session.isFinished) throw new Error("Pembahasan hanya dapat diakses setelah tes selesai.");

  return session.assignedQuestions.map((q) => {
    const userChosen = session.answers[q.level]?.[q.id] || "";
    const isCorrect = userChosen === q.correct_key;

    return {
      id: q.id,
      level: q.level,
      levelName: q.level_name,
      competencyName: q.competency_name,
      questionText: q.text.id,
      options: q.options.map((opt) => ({ key: opt.key, text: opt.text.id })),
      userChosenKey: userChosen,
      correctKey: q.correct_key,
      isCorrect,
      explanation: q.explanation.id,
    };
  });
}
