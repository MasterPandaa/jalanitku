import fs from "fs";
import path from "path";

interface RaporQuestion {
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

interface RoleSeed {
  slug: string;
  nama: { id: string };
}

interface CompetencySeed {
  id: string;
  role_slug: string;
  nama: { id: string };
}

function main() {
  const root = process.cwd();
  const questionsPath = path.join(root, "src/data/seed/rapor_questions.json");
  const rolesPath = path.join(root, "src/data/seed/roles.json");
  const competenciesPath = path.join(root, "src/data/seed/competencies.json");

  console.log("=== VALIDASI BANK SOAL JALANRAPOR ===");

  if (!fs.existsSync(questionsPath)) {
    console.error("FAIL: File rapor_questions.json tidak ditemukan!");
    process.exit(1);
  }

  const questions: RaporQuestion[] = JSON.parse(fs.readFileSync(questionsPath, "utf-8"));
  const roles: RoleSeed[] = JSON.parse(fs.readFileSync(rolesPath, "utf-8"));
  const competencies: CompetencySeed[] = JSON.parse(fs.readFileSync(competenciesPath, "utf-8"));

  const roleSlugs = new Set(roles.map((r) => r.slug));
  const compIds = new Set(competencies.map((c) => c.id));
  const questionIds = new Set<string>();

  let errors = 0;
  const questionsPerRole: Record<string, { [level: number]: number }> = {};

  for (const q of questions) {
    // Unique ID
    if (questionIds.has(q.id)) {
      console.error(`[DUPLIKAT ID] Soal ID duplikat: ${q.id}`);
      errors++;
    }
    questionIds.add(q.id);

    // Role valid
    if (!roleSlugs.has(q.role_slug)) {
      console.error(`[ROLE INVALID] Role slug '${q.role_slug}' tidak terdaftar di roles.json`);
      errors++;
    }

    // Competency valid
    if (!compIds.has(q.competency_id)) {
      console.error(`[KOMPETENSI INVALID] Competency ID '${q.competency_id}' tidak terdaftar`);
      errors++;
    }

    // Level range (1-5)
    if (q.level < 1 || q.level > 5) {
      console.error(`[LEVEL INVALID] Level ${q.level} di luar batas 1-5 pada soal ${q.id}`);
      errors++;
    }

    // Options (a, b, c, d)
    if (!q.options || q.options.length < 4) {
      console.error(`[OPSI KURANG] Soal ${q.id} memiliki kurang dari 4 opsi`);
      errors++;
    }

    const keys = q.options.map((o) => o.key);
    if (!keys.includes(q.correct_key)) {
      console.error(`[KUNCI SALAH] correct_key '${q.correct_key}' tidak ditemukan dalam opsi soal ${q.id}`);
      errors++;
    }

    // Teks & Explanation
    if (!q.text?.id || q.text.id.trim() === "") {
      console.error(`[TEKS KOSONG] Soal ${q.id} tidak memiliki teks`);
      errors++;
    }
    if (!q.explanation?.id || q.explanation.id.trim() === "") {
      console.error(`[EXPLANATION KOSONG] Soal ${q.id} tidak memiliki penjelasan`);
      errors++;
    }

    // Count
    if (!questionsPerRole[q.role_slug]) {
      questionsPerRole[q.role_slug] = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    }
    questionsPerRole[q.role_slug][q.level] = (questionsPerRole[q.role_slug][q.level] || 0) + 1;
  }

  console.log(`\nTotal Soal: ${questions.length}`);
  console.log("Distribusi Role & Level:");
  for (const [slug, levels] of Object.entries(questionsPerRole)) {
    const total = Object.values(levels).reduce((a, b) => a + b, 0);
    console.log(` - ${slug}: Total ${total} soal (L1:${levels[1]}, L2:${levels[2]}, L3:${levels[3]}, L4:${levels[4]}, L5:${levels[5]})`);
  }

  if (errors > 0) {
    console.error(`\nValidasi GAGAL dengan ${errors} error.`);
    process.exit(1);
  } else {
    console.log("\n[SUKSES] Semua soal JalanRapor valid secara skema, relasi, dan logika!");
  }
}

main();
