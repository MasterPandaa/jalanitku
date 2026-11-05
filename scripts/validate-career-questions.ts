import questions from "../src/data/seed/career_questions.json";
import roles from "../src/data/seed/roles.json";

function validateQuestions() {
  console.log("=== MEMULAI VALIDASI BANK SOAL JALANKARIR ===");
  const roleSlugs = new Set(roles.map((r) => r.slug));
  console.log(`Jumlah Role terdaftar: ${roleSlugs.size}`);
  console.log(`Total Soal ditemukan: ${questions.length}`);

  let hasError = false;
  const levelCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
  const roleWeightTotals: Record<string, number> = {};
  roles.forEach((r) => (roleWeightTotals[r.slug] = 0));

  questions.forEach((q: any, idx: number) => {
    // 1. Level check
    if (!q.level || q.level < 1 || q.level > 4) {
      console.error(`[Error Soal #${idx + 1}] Level tidak valid: ${q.level}`);
      hasError = true;
    } else {
      levelCounts[q.level] = (levelCounts[q.level] || 0) + 1;
    }

    // 2. Text check
    if (!q.text?.id || q.text.id.trim().length === 0) {
      console.error(`[Error Soal #${idx + 1}] Teks Bahasa Indonesia kosong!`);
      hasError = true;
    }

    // 3. Weight range check
    if (q.type === "likert") {
      if (!q.weights || typeof q.weights !== "object") {
        console.error(`[Error Soal #${idx + 1}] Bobot likert tidak valid.`);
        hasError = true;
      } else {
        Object.entries(q.weights).forEach(([rSlug, w]) => {
          if (!roleSlugs.has(rSlug)) {
            console.error(`[Error Soal #${idx + 1}] Role slug tidak dikenal: ${rSlug}`);
            hasError = true;
          }
          if (typeof w !== "number" || w < -3 || w > 3) {
            console.error(`[Error Soal #${idx + 1}] Bobot role ${rSlug} di luar rentang (-3..+3): ${w}`);
            hasError = true;
          }
          roleWeightTotals[rSlug] = (roleWeightTotals[rSlug] || 0) + (w as number);
        });
      }
    } else if (q.type === "preference") {
      if (!Array.isArray(q.options) || q.options.length < 2) {
        console.error(`[Error Soal #${idx + 1}] Opsi preferensi minimal 2.`);
        hasError = true;
      } else {
        q.options.forEach((opt: any, optIdx: number) => {
          if (!opt.text?.id) {
            console.error(`[Error Soal #${idx + 1} Opsi #${optIdx + 1}] Teks opsi kosong.`);
            hasError = true;
          }
          if (opt.weights) {
            Object.entries(opt.weights).forEach(([rSlug, w]) => {
              if (roleSlugs.has(rSlug)) {
                roleWeightTotals[rSlug] = (roleWeightTotals[rSlug] || 0) + (w as number);
              }
            });
          }
        });
      }
    }
  });

  console.log("\nDistribusi Soal per Level:");
  Object.entries(levelCounts).forEach(([lvl, count]) => {
    console.log(`- Level ${lvl}: ${count} soal`);
  });

  console.log("\nLaporan Distribusi Bobot ke 21 Role:");
  const sortedWeights = Object.entries(roleWeightTotals).sort((a, b) => b[1] - a[1]);
  sortedWeights.forEach(([rSlug, total]) => {
    console.log(`• ${rSlug.padEnd(20)} : ${total} poin`);
  });

  if (hasError) {
    console.error("\n❌ Validasi bank soal GAGAL.");
    process.exit(1);
  } else {
    console.log("\n✅ Semua bank soal valid dan siap diproduksi!");
  }
}

validateQuestions();
