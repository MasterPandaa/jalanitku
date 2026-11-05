import questions from "../src/data/seed/career_questions.json";
import roles from "../src/data/seed/roles.json";

function testCareerQuestionCalibration() {
  console.log("=== TEST 1: JalanKarir 50 Soal & Kalibrasi 21 Role ===");
  const roleSlugs = new Set(roles.map((r: any) => r.slug));
  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const weights: Record<string, number> = {};
  roles.forEach((r: any) => (weights[r.slug] = 0));

  questions.forEach((q: any) => {
    counts[q.level] = (counts[q.level] || 0) + 1;
    if (q.type === "likert") {
      Object.entries(q.weights || {}).forEach(([slug, w]) => {
        if (roleSlugs.has(slug)) weights[slug] += w as number;
      });
    } else if (q.type === "preference") {
      q.options?.forEach((opt: any) => {
        Object.entries(opt.weights || {}).forEach(([slug, w]) => {
          if (roleSlugs.has(slug)) weights[slug] += w as number;
        });
      });
    }
  });

  console.log("Total soal:", questions.length);
  if (questions.length !== 50) {
    throw new Error(`Total soal harus 50, ditemukan: ${questions.length}`);
  }

  for (let l = 1; l <= 5; l++) {
    if (counts[l] !== 10) {
      throw new Error(`Level ${l} harus tepat 10 soal, ditemukan: ${counts[l]}`);
    }
  }
  console.log("Distribusi Level 1-5: Tepat 10 soal per level [PASS]");

  // Cek bobot SysAdmin dan DBA
  if (weights["system-administrator"] <= 0) {
    throw new Error("Bobot system-administrator tidak boleh 0!");
  }
  if (weights["database-administrator"] <= 0) {
    throw new Error("Bobot database-administrator tidak boleh 0!");
  }
  console.log(`Bobot system-administrator: ${weights["system-administrator"]} poin [PASS]`);
  console.log(`Bobot database-administrator: ${weights["database-administrator"]} poin [PASS]`);

  // Pastikan semua 21 role memiliki bobot positif
  for (const [slug, total] of Object.entries(weights)) {
    if (total <= 0) {
      throw new Error(`Role ${slug} memiliki bobot total <= 0: ${total}`);
    }
  }
  console.log("Seluruh 21 role memiliki bobot positif aktif terkalibrasi [PASS]");
}

testCareerQuestionCalibration();
console.log("\n✅ SEMUA TEST VERIFIKASI FUNGSIONALITAS LOLOS DENGAN SEMPURNA!");
