import { createClient } from "@supabase/supabase-js";
import { Database } from "../src/types/database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://flpknqwjnlinjjqgpjoo.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZscGtucXdqbmxpbmpqcWdwam9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI1MTMyNjIsImV4cCI6MjEwODA4OTI2Mn0.lrtWV2Zf_mk0di_KW7hPSpcHiNh1xxn4IjeaItOwl-M";

const client = createClient<Database>(supabaseUrl, supabaseAnonKey);

async function runVerification() {
  console.log("==================================================");
  console.log("🚀 KOKUO SUPABASE PERSISTENCE & DUAL-LAYER TEST");
  console.log("==================================================");

  const testId = `test_${Date.now()}`;
  const userId = `user_kokuo_${testId}`;
  const careerSessionId = `csess_kokuo_${testId}`;
  const raporSessionId = `rsess_kokuo_${testId}`;

  try {
    // 1. Test Users Table
    console.log("\n[1] Testing 'users' table upsert...");
    const { data: userData, error: userError } = await client
      .from("users")
      .upsert({
        id: userId,
        google_sub: `sub_${testId}`,
        email: `kokuo.${testId}@jalanitku.id`,
        name: "Kokuo Systems Engineer",
        username: `kokuo_${testId.slice(-6)}`,
        avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${userId}`,
        has_jalan_id: true,
        has_cocoklogiku: true,
        active_role_slug: "software-engineer",
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (userError) throw new Error(`Users upsert failed: ${userError.message}`);
    console.log("✅ User upserted successfully:", userData.id, userData.username);

    // 2. Test Career Sessions Table
    console.log("\n[2] Testing 'career_sessions' table upsert...");
    const { data: careerData, error: careerError } = await client
      .from("career_sessions")
      .upsert({
        id: careerSessionId,
        user_id: userId,
        status: "completed",
        current_level: 5,
        seed: `seed_${testId}`,
        answers: {
          q1: { value: 5, duration_ms: 1200 },
          q2: { value: 4, duration_ms: 950 },
        },
        result: {
          card_code: `JID-${testId.slice(-6)}`,
          top_role: { slug: "software-engineer", name: "Software Engineer" },
        },
        created_at: new Date().toISOString(),
        completed_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (careerError) throw new Error(`Career session upsert failed: ${careerError.message}`);
    console.log("✅ Career session upserted successfully:", careerData.id, careerData.status);

    // 3. Test Jalan IDs Table
    console.log("\n[3] Testing 'jalan_ids' table upsert...");
    const { data: jalanIdData, error: jalanIdError } = await client
      .from("jalan_ids")
      .upsert({
        id: userId,
        user_id: userId,
        card_code: `JID-${testId.slice(-6)}`,
        username: `kokuo_${testId.slice(-6)}`,
        top_role: {
          slug: "software-engineer",
          name: "Software Engineer",
          match_percentage: 95.5,
          color: "#3B82F6",
        },
        secondary_roles: [
          { slug: "devops-engineer", name: "DevOps Engineer", match_percentage: 88.0, color: "#10B981" },
        ],
        all_scores: [],
        is_tie: false,
        issued_at: new Date().toISOString().split("T")[0],
      })
      .select()
      .single();

    if (jalanIdError) throw new Error(`JalanID upsert failed: ${jalanIdError.message}`);
    console.log("✅ JalanID upserted successfully:", jalanIdData.card_code, jalanIdData.username);

    // 4. Test Rapor Sessions Table
    console.log("\n[4] Testing 'rapor_sessions' table upsert...");
    const { data: raporData, error: raporError } = await client
      .from("rapor_sessions")
      .upsert({
        id: raporSessionId,
        user_id: userId,
        role_slug: "software-engineer",
        current_level: 5,
        total_levels: 5,
        is_finished: true,
        answers: {
          "1": { "q_se_01": "A", "q_se_02": "B" },
          "2": { "q_se_03": "C" },
        },
        assigned_questions: [
          { id: "q_se_01", level: 1, correct_key: "A" },
        ],
        started_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (raporError) throw new Error(`Rapor session upsert failed: ${raporError.message}`);
    console.log("✅ Rapor session upserted successfully:", raporData.id, raporData.role_slug);

    // 5. Test Cocoklogikus Table
    console.log("\n[5] Testing 'cocoklogikus' table upsert...");
    const { data: cocokData, error: cocokError } = await client
      .from("cocoklogikus")
      .upsert({
        id: userId,
        user_id: userId,
        username: `kokuo_${testId.slice(-6)}`,
        role_slug: "software-engineer",
        role_name: "Software Engineer",
        final_score: 92,
        match_label: "Sangat Cocok",
        level_scores: [
          { level: 1, percentage: 100 },
          { level: 2, percentage: 90 },
        ],
        competency_scores: [
          { competencyName: "Algoritma & Struktur Data", percentage: 95 },
        ],
        reason: {
          summary: "Pemahaman algoritma dan arsitektur sistem tingkat tinggi.",
          strengths: "Algoritma & Struktur Data",
          weaknesses: "Tidak ada",
          levelInsight: "Sangat stabil di level 5.",
        },
        recommendations: [
          { topic: "System Design", action: "Pelajari distributed cache" },
        ],
        alternative_roles: [
          { roleSlug: "devops-engineer", roleName: "DevOps Engineer", reason: "Sangat cocok untuk scale" },
        ],
        completed_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (cocokError) throw new Error(`Cocoklogiku upsert failed: ${cocokError.message}`);
    console.log("✅ Cocoklogiku upserted successfully:", cocokData.match_label, `Score: ${cocokData.final_score}`);

    // 6. Test Query & Retrieval
    console.log("\n[6] Verifying Data Retrieval across all 5 tables...");
    const [qUser, qCareer, qJalanId, qRapor, qCocok] = await Promise.all([
      client.from("users").select("*").eq("id", userId).single(),
      client.from("career_sessions").select("*").eq("id", careerSessionId).single(),
      client.from("jalan_ids").select("*").eq("user_id", userId).single(),
      client.from("rapor_sessions").select("*").eq("id", raporSessionId).single(),
      client.from("cocoklogikus").select("*").eq("user_id", userId).single(),
    ]);

    if (!qUser.data || !qCareer.data || !qJalanId.data || !qRapor.data || !qCocok.data) {
      throw new Error("One or more tables failed to retrieve verification data!");
    }

    console.log("✅ All 5 tables verified intact and queryable!");

    // 7. Cleanup
    console.log("\n[7] Cleaning up test records...");
    await Promise.all([
      client.from("cocoklogikus").delete().eq("user_id", userId),
      client.from("rapor_sessions").delete().eq("id", raporSessionId),
      client.from("jalan_ids").delete().eq("user_id", userId),
      client.from("career_sessions").delete().eq("id", careerSessionId),
    ]);
    await client.from("users").delete().eq("id", userId);
    console.log("✅ Cleanup completed cleanly!");

    console.log("\n==================================================");
    console.log("🎉 ALL SUPABASE PERSISTENCE TESTS PASSED (5/5)!");
    console.log("==================================================");
    process.exit(0);
  } catch (err: any) {
    console.error("\n❌ Verification Failed:", err.message);
    process.exit(1);
  }
}

runVerification();
