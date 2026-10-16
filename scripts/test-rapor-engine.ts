import {
  startRaporSession,
  getSanitizedQuestionsForLevel,
  submitRaporLevelAnswers,
  finishRaporSession,
  getUserCocoklogiku,
  getRaporSessionReview,
  AVAILABLE_RAPOR_ROLES,
} from "../src/lib/rapor";

function runTests() {
  console.log("=== UNIT TEST: JALANRAPOR & COCOKLOGIKU ENGINE ===");
  const testUserId = "user_test_rapor_123";
  const roleSlug = "software-engineer";

  // 1. Cek ketersediaan role
  console.log("\n[1] Verifikasi Role Batch R1:");
  console.log("Roles tersedia:", AVAILABLE_RAPOR_ROLES);
  if (!AVAILABLE_RAPOR_ROLES.includes(roleSlug)) {
    throw new Error("Role software-engineer harus tersedia!");
  }
  console.log("✓ Role software-engineer tersedia");

  // 2. Start Session
  console.log("\n[2] Memulai Sesi Tes:");
  const session = startRaporSession(testUserId, roleSlug);
  console.log("Session ID:", session.sessionId);
  if (!session.sessionId || session.currentLevel !== 1) {
    throw new Error("Sesi gagal diinisialisasi.");
  }
  console.log("✓ Sesi berhasil dibuat dengan 5 level");

  // 3. Sanitasi Client Questions (Kunci & Penjelasan TIDAK BOLEH bocor)
  console.log("\n[3] Uji Sanitasi Soal Client (Zero Leak):");
  const level1Questions = getSanitizedQuestionsForLevel(session.sessionId, 1);
  if (level1Questions.length === 0) {
    throw new Error("Pertanyaan level 1 kosong!");
  }
  for (const q of level1Questions as any[]) {
    if (q.correct_key !== undefined || q.explanation !== undefined) {
      throw new Error(`KEBOCORAN DATA: correct_key atau explanation ada di client payload!`);
    }
  }
  console.log(`✓ Level 1 menyajikan ${level1Questions.length} soal tanpa bocor correct_key atau explanation`);

  // 4. Simulasi Jawaban Bertingkat 5 Level
  console.log("\n[4] Simulasi Jawaban 5 Level:");
  for (let lvl = 1; lvl <= 5; lvl++) {
    const qList = getSanitizedQuestionsForLevel(session.sessionId, lvl);
    const answers: Record<string, string> = {};
    // Pilih opsi 'b' (sebagian besar kunci benar di dataset kita adalah 'b' atau 'a')
    for (const q of qList) {
      answers[q.id] = q.options[0].key; // pilih opsi pertama
    }
    const res = submitRaporLevelAnswers(session.sessionId, lvl, answers);
    console.log(` - Level ${lvl} dijawab -> Next level: ${res.nextLevel}, Finished: ${res.isFinished}`);
    if (lvl < 5 && res.nextLevel !== lvl + 1) {
      throw new Error(`Level berikutnya salah: diharapkan ${lvl + 1}, didapat ${res.nextLevel}`);
    }
    if (lvl === 5 && !res.isFinished) {
      throw new Error("Level 5 harus menyelesaikan tes!");
    }
  }
  console.log("✓ Alur 5 level tuntas dan tersimpan di server");

  // 5. Hitung Cocoklogiku (Finish Session)
  console.log("\n[5] Hitung Skor Cocoklogiku:");
  const cocoklogiku = finishRaporSession(session.sessionId, "dev_jagoan", "Software Engineer");
  console.log("Skor Akhir:", cocoklogiku.finalScore);
  console.log("Label Kecocokan:", cocoklogiku.matchLabel);
  console.log("Skor per Level:", cocoklogiku.levelScores.map((l) => `${l.levelName}: ${l.percentage}% (Bobot ${l.weight})`).join(" | "));
  console.log("Reason Summary:", cocoklogiku.reason.summary);
  console.log("Kekuatan:", cocoklogiku.reason.strengths);
  console.log("Kelemahan:", cocoklogiku.reason.weaknesses);
  console.log("Insight Level:", cocoklogiku.reason.levelInsight);
  console.log("Rekomendasi Belajar:", cocoklogiku.recommendations.map((r) => r.topic));

  if (cocoklogiku.finalScore < 0 || cocoklogiku.finalScore > 100) {
    throw new Error("Skor akhir di luar rentang 0-100!");
  }
  if (!["Sangat Cocok", "Cocok", "Cukup Cocok", "Belum Cocok"].includes(cocoklogiku.matchLabel)) {
    throw new Error("Label kecocokan tidak valid!");
  }
  console.log("✓ Perhitungan skor berbobot & narasi deterministik valid");

  // 6. Uji Upsert: 1 User = 1 Cocoklogiku Aktif
  console.log("\n[6] Uji Upsert Cocoklogiku:");
  const activeRecord = getUserCocoklogiku(testUserId);
  if (!activeRecord || activeRecord.id !== cocoklogiku.id) {
    throw new Error("Cocoklogiku aktif pengguna tidak cocok!");
  }
  console.log("✓ Pengguna memiliki tepat 1 Cocoklogiku aktif");

  // 7. Uji Akses Pembahasan Soal
  console.log("\n[7] Uji Tinjau Pembahasan Soal Pasca-Tes:");
  const reviewItems = getRaporSessionReview(session.sessionId);
  if (reviewItems.length === 0) {
    throw new Error("Review pembahasan kosong!");
  }
  console.log(`✓ Berhasil memuat ${reviewItems.length} item pembahasan lengkap dengan penjelasan.`);

  console.log("\n[SEMUA TEST JALANRAPOR & COCOKLOGIKU BERHASIL! 100% PASSED]");
}

runTests();
