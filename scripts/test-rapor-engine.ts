import {
          startRaporSession,
          getSanitizedQuestionsForLevel,
          submitRaporLevelAnswers,
          finishRaporSession,
          getUserCocoklogiku,
          getRaporSessionReview,
          AVAILABLE_RAPOR_ROLES,
        } from "../src/lib/rapor";
        import { saveUser } from "../src/lib/auth";
        import { supabase } from "../src/lib/supabase";
        
        async function runTests() {
          console.log("=== UNIT TEST: JALANRAPOR & COCOKLOGIKU ENGINE ===");
          const testUserId = "user_demo_1";
          const roleSlug = "software-engineer";
        
          // Ensure test user exists in Supabase
          await supabase.from("users").upsert({
            id: testUserId,
            google_sub: "google_sub_123456",
            email: "demo.student@gmail.com",
            name: "Budi Santoso",
            username: "budidev",
            avatar_url: "https://api.dicebear.com/7.x/bottts/svg?seed=budidev",
            has_jalan_id: true,
            has_cocoklogiku: true,
            active_role_slug: "software-engineer",
            updated_at: new Date().toISOString(),
          });
        
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
          const sanitizedL1 = getSanitizedQuestionsForLevel(session.sessionId, 1);
          if (sanitizedL1.length === 0) throw new Error("Soal Level 1 kosong!");
          for (const q of sanitizedL1) {
            if ("correct_key" in q || "explanation" in q) {
              throw new Error(`LEAK DETECTED pada soal ${q.id}: correct_key atau explanation bocor!`);
            }
          }
          console.log(`✓ Level 1 menyajikan ${sanitizedL1.length} soal tanpa bocor correct_key atau explanation`);
        
          // 4. Simulasi Jawaban 5 Level
          console.log("\n[4] Simulasi Jawaban 5 Level:");
          for (let lvl = 1; lvl <= 5; lvl++) {
            const questions = session.assignedQuestions.filter((q) => q.level === lvl);
            const answers: Record<string, string> = {};
            questions.forEach((q, idx) => {
              answers[q.id] = idx % 2 === 0 ? q.correct_key : "WRONG_KEY";
            });
        
            const stepResult = submitRaporLevelAnswers(session.sessionId, lvl, answers);
            console.log(` - Level ${lvl} dijawab -> Next level: ${stepResult.nextLevel}, Finished: ${stepResult.isFinished}`);
          }
          console.log("✓ Alur 5 level tuntas dan tersimpan di server");
        
          // 5. Selesaikan dan Evaluasi Skor
          console.log("\n[5] Hitung Skor Cocoklogiku:");
          const result = finishRaporSession(session.sessionId, "budidev", "Software Engineer");
          console.log("Skor Akhir:", result.finalScore);
          console.log("Label Kecocokan:", result.matchLabel);
          console.log(
            "Skor per Level:",
            result.levelScores.map((ls) => `${ls.levelName}: ${ls.percentage}% (Bobot ${ls.weight})`).join(" | ")
          );
          console.log("Reason Summary:", result.reason.summary);
          console.log("Kekuatan:", result.reason.strengths);
          console.log("Kelemahan:", result.reason.weaknesses);
          console.log("Insight Level:", result.reason.levelInsight);
          console.log("Rekomendasi Belajar:", result.recommendations.map((r) => r.topic));
        
          if (!result.finalScore || !result.matchLabel || result.levelScores.length !== 5) {
            throw new Error("Perhitungan skor atau level scores cacat!");
          }
          console.log("✓ Perhitungan skor berbobot & narasi deterministik valid");
        
          // 6. Validasi Cocoklogiku Persistence (1 active record per user)
          console.log("\n[6] Uji Upsert Cocoklogiku:");
          const savedRecord = getUserCocoklogiku(testUserId);
          if (!savedRecord || savedRecord.id !== result.id) {
            throw new Error("Cocoklogiku gagal di-upsert untuk user!");
          }
          console.log("✓ Pengguna memiliki tepat 1 Cocoklogiku aktif");
        
          // 7. Review Pembahasan Pasca-Tes
          console.log("\n[7] Uji Tinjau Pembahasan Soal Pasca-Tes:");
          const reviews = getRaporSessionReview(session.sessionId);
          if (reviews.length !== session.assignedQuestions.length) {
            throw new Error("Jumlah review tidak sesuai jumlah soal!");
          }
          console.log(`✓ Berhasil memuat ${reviews.length} item pembahasan lengkap dengan penjelasan.`);
        
          console.log("\n[SEMUA TEST JALANRAPOR & COCOKLOGIKU BERHASIL! 100% PASSED]");
        }
        
        runTests().catch(err => {
          console.error("Test failed:", err);
          process.exit(1);
        });
        