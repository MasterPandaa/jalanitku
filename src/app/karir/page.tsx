"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, ArrowLeft, X, Trophy } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { AppNavbar } from "@/components/ui/AppNavbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { LikertScale } from "@/components/ui/LikertScale";
import { ChoiceCard } from "@/components/ui/ChoiceCard";
import { Dialog } from "@/components/ui/Dialog";
import { Toast } from "@/components/ui/Toast";
import { JalanMin } from "@/components/mascot/JalanMin";

export default function KarirPage() {
  const router = useRouter();

  // Session state
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [unansweredIds, setUnansweredIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasPreviousResult, setHasPreviousResult] = useState(false);
  const [activeSessionInfo, setActiveSessionInfo] = useState<{
    id: string;
    level: number;
    answers: Record<string, number | string>;
  } | null>(null);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "error" | "info" | "success" } | null>(null);

  const showError = useCallback((msg: string) => {
    setErrorMessage(msg);
    setToast({ message: msg, type: "error" });
  }, []);

  const loadQuestions = useCallback(
    async (sessId: string, level: number, initialAnswers?: Record<string, number | string>) => {
      setLoading(true);
      try {
        const res = await fetch(`/api/karir/sessions/${sessId}/questions?level=${level}`);
        const data = await res.json();
        if (data.success) {
          setQuestions(data.data.questions);
          setCurrentLevel(level);
          setErrorMessage("");
          setUnansweredIds([]);

          // Sinkronisasi jawaban yang telah tersimpan di server
          if (data.data.answers && Object.keys(data.data.answers).length > 0) {
            setAnswers((prev) => ({
              ...data.data.answers,
              ...(initialAnswers || {}),
              ...prev,
            }));
          }
        }
      } catch {
        showError("Gagal memuat pertanyaan.");
      } finally {
        setLoading(false);
      }
    },
    [showError]
  );

  // Check auth and restore active session on mount
  useEffect(() => {
    let isMounted = true;

    async function init() {
      try {
        const meRes = await fetch("/api/me");
        if (!meRes.ok) throw new Error("Unauthenticated");
        const meData = await meRes.json();
        if (!meData.success) throw new Error("Failed");

        if (!meData.data.username) {
          router.push("/onboarding");
          return;
        }

        if (isMounted) {
          setHasPreviousResult(Boolean(meData.data.has_jalan_id));
        }

        // Cek apakah ada sesi aktif yang sedang in_progress
        const sessRes = await fetch("/api/karir/sessions");
        const sessData = await sessRes.json();

        if (sessData.success && sessData.data?.has_active_session && sessData.data.session) {
          const activeSess = sessData.data.session;
          if (isMounted) {
            setActiveSessionInfo({
              id: activeSess.id,
              level: activeSess.current_level,
              answers: activeSess.answers || {},
            });

            // Otomatis lanjutkan sesi aktif (menjaga progres saat reload atau login ulang)
            setSessionId(activeSess.id);
            setCurrentLevel(activeSess.current_level);
            setHasStarted(true);

            // Gabungkan jawaban dari server dan draf lokal di browser
            let mergedAnswers: Record<string, number | string> = { ...(activeSess.answers || {}) };
            try {
              const draftRaw = localStorage.getItem(`jalanitku_karir_draft_${activeSess.id}`);
              if (draftRaw) {
                const parsedDraft = JSON.parse(draftRaw);
                mergedAnswers = { ...mergedAnswers, ...parsedDraft };
              }
            } catch {
              // Abaikan kegagalan baca localStorage
            }
            setAnswers(mergedAnswers);

            await loadQuestions(activeSess.id, activeSess.current_level, mergedAnswers);
          }
        }
      } catch {
        router.push("/login");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    init();

    return () => {
      isMounted = false;
    };
  }, [router, loadQuestions]);

  const startSession = async (reset = false) => {
    setLoading(true);
    setErrorMessage("");
    try {
      const res = await fetch("/api/karir/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reset }),
      });
      const data = await res.json();
      if (data.success) {
        setSessionId(data.data.session_id);
        setCurrentLevel(data.data.level || 1);
        setHasStarted(true);
        setUnansweredIds([]);

        if (reset) {
          try {
            localStorage.removeItem(`jalanitku_karir_draft_${data.data.session_id}`);
          } catch {}
          setAnswers({});
          await loadQuestions(data.data.session_id, 1, {});
        } else {
          const initialAnswers = data.data.answers || {};
          setAnswers(initialAnswers);
          await loadQuestions(data.data.session_id, data.data.level || 1, initialAnswers);
        }
      } else {
        showError(data.error?.message || "Gagal memulai sesi");
      }
    } catch {
      showError("Terjadi kesalahan jaringan.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId: string, value: number | string) => {
    setAnswers((prev) => {
      const next = { ...prev, [questionId]: value };
      if (sessionId) {
        try {
          localStorage.setItem(`jalanitku_karir_draft_${sessionId}`, JSON.stringify(next));
        } catch {
          // Abaikan error localStorage
        }
      }
      return next;
    });

    // Otomatis hilangkan penanda merah setelah user memilih jawaban
    setUnansweredIds((prev) => {
      const next = prev.filter((id) => id !== questionId);
      if (next.length === 0) {
        setErrorMessage("");
      }
      return next;
    });
  };

  const handleNextLevel = async () => {
    if (!sessionId) return;

    // Periksa kelengkapan jawaban di step aktif
    const unanswered = questions.filter((q) => answers[q.id] === undefined);
    if (unanswered.length > 0) {
      const ids = unanswered.map((q) => q.id);
      setUnansweredIds(ids);
      showError(`Harap jawab semua soal pada step ini (${unanswered.length} soal belum terjawab).`);

      // Otomatis arahkan (smooth scroll) ke soal pertama yang belum dijawab
      const firstId = unanswered[0].id;
      const targetElement = document.getElementById(`question-card-${firstId}`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setSubmitting(true);
    try {
      const formattedAnswers = questions.map((q) => ({
        question_id: q.id,
        answer: answers[q.id],
      }));

      const res = await fetch(`/api/karir/sessions/${sessionId}/answers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: formattedAnswers }),
      });

      const data = await res.json();
      if (data.success) {
        setUnansweredIds([]);
        if (currentLevel < 4) {
          await loadQuestions(sessionId, currentLevel + 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          // Selesai seluruh 4 step!
          finishSession();
        }
      }
    } catch {
      showError("Gagal menyimpan jawaban.");
    } finally {
      setSubmitting(false);
    }
  };

  const finishSession = async () => {
    if (!sessionId) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/karir/sessions/${sessionId}/finish`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) {
        try {
          localStorage.removeItem(`jalanitku_karir_draft_${sessionId}`);
        } catch {}
        router.push("/karir/hasil");
      } else {
        showError(data.error?.message || "Gagal menghitung hasil");
      }
    } catch {
      showError("Gagal menyelesaikan sesi.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && !hasStarted) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center p-6">
        <div className="font-mono text-sm font-bold animate-pulse">Menyiapkan JalanKarir…</div>
      </div>
    );
  }

  // Pre-test Intro Screen
  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-paper flex flex-col justify-between">
        <AppNavbar />

        <main className="max-w-2xl mx-auto my-8 px-4 w-full animate-fade-up space-y-4">
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard"
              className="nb-btn px-4 py-2 bg-surface text-ink border-3 border-ink shadow-nb-sm font-display font-bold text-sm hover:bg-accent-yellow inline-flex items-center gap-2 transition-all hover:-translate-x-0.5"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              <span>Kembali ke Dashboard</span>
            </Link>
          </div>

          <Card variant="white" shadow="lg" borderWidth="5" className="p-8 md:p-10 space-y-6 text-left nb-card-hover transition-all">
            <div className="flex items-center gap-4 border-b-4 border-ink pb-6">
              <JalanMin state="happy" size={100} className="flex-none transition-transform duration-200 hover:scale-110" />
              <div>
                <div className="inline-block bg-accent-yellow border-2 border-ink px-2.5 py-0.5 font-mono text-xs font-bold uppercase mb-1">
                  Fitur A · JalanKarir
                </div>
                <h1 className="font-heading text-3xl md:text-4xl text-ink leading-tight">
                  Temukan Role IT Impianmu
                </h1>
              </div>
            </div>

            <p className="font-sans text-base md:text-lg text-ink/80 leading-relaxed">
              JalanKarir membantumu mengenali kecenderungan minat, cara kerja, dan pemikiranmu.
              Tidak ada jawaban salah atau benar. Santai dan jujur pada dirimu sendiri!
            </p>

            <div className="bg-paper border-3 border-ink p-4 space-y-2 font-mono text-xs md:text-sm">
              <div className="font-bold text-ink">Ketentuan Tes:</div>
              <div>• 4 Step bertahap dengan 5 butir pertanyaan per step (total 20 butir soal).</div>
              <div>• Format pertanyaan berupa skala persetujuan (1–5) dan studi kasus skenario (a–e).</div>
              <div>• Seluruh pertanyaan pada step aktif wajib dijawab sebelum lanjut ke step berikutnya.</div>
              <div>• Tidak ada batasan waktu pengerjaan; progres disimpan otomatis di setiap pergantian step.</div>
              <div>• Hasil akhir menghasilkan pemetaan 21 role IT dan kartu digital resmi: <strong>JalanID</strong>.</div>
            </div>

            {activeSessionInfo && (
              <div className="bg-accent-yellow/20 border-3 border-ink p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-nb-sm animate-fade-up">
                <div className="text-left">
                  <span className="font-mono text-xs font-bold uppercase text-ink/70">Sesi Belum Selesai</span>
                  <div className="font-display font-bold text-base text-ink">
                    Kamu memiliki progres tes di Step {activeSessionInfo.level} dari 4
                  </div>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => startSession(false)}
                  className="inline-flex items-center justify-center gap-2"
                >
                  <span>Lanjutkan Step {activeSessionInfo.level}</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Button>
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Button
                variant={activeSessionInfo ? "white" : "primary"}
                size="lg"
                fullWidth
                onClick={() => {
                  if (hasPreviousResult || activeSessionInfo) {
                    setShowWarningModal(true);
                  } else {
                    startSession(false);
                  }
                }}
                className="inline-flex items-center justify-center gap-2"
              >
                <span>{activeSessionInfo ? "Ulangi Tes dari Awal" : "Mulai Tes JalanKarir Sekarang"}</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </Button>
            </div>
          </Card>
        </main>

        <footer className="text-center font-mono text-xs text-ink/60 pb-2">
          © 2026 JalanITku · Engine Rekomendasi Karier Vektor Role
        </footer>

        {/* Warning Modal if overwriting existing JalanID or restarting active session */}
        <Dialog
          isOpen={showWarningModal}
          onClose={() => setShowWarningModal(false)}
          onConfirm={() => {
            setShowWarningModal(false);
            startSession(true);
          }}
          title={activeSessionInfo ? "Mulai Ulang Tes dari Awal?" : "Ulangi Tes JalanKarir?"}
          description={
            activeSessionInfo
              ? "Kamu masih memiliki sesi tes yang belum selesai. Memulai ulang dari awal akan menghapus jawaban di sesi ini. Lanjutkan?"
              : "Kamu sudah memiliki kartu JalanID aktif sebelumnya. Mengikuti tes ini kembali akan menggantikan kartu JalanID lama milikmu secara permanen. Lanjutkan?"
          }
          confirmLabel="Ya, Mulai Tes Baru"
          cancelLabel="Batal"
          variant="danger"
        />

        {/* Toast Notification Container */}
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 animate-fadeIn">
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          </div>
        )}
      </div>
    );
  }

  // Active Test Question Screen
  const themeNames = [
    "Kepo & Kebiasaan Sehari-hari",
    "Gaya Saat Nugas Bareng",
    "Drama Teknologi & Masalah Nyata",
    "Ambisi & Obsesi Masa Depan",
  ];

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col justify-between p-4 md:p-8">
      {/* Top Header */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between border-b-4 border-ink pb-4 animate-fade-up">
        <Logo size="sm" />
        <div className="flex items-center gap-3">
          <Badge variant="yellow" size="sm" className="shadow-[2px_2px_0px_#0A0A0A]">
            Step {currentLevel} dari 4
          </Badge>
          <span className="font-mono text-xs font-bold text-ink/70">
            {themeNames[currentLevel - 1]}
          </span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto w-full my-6 animate-fade-up-1">
        <ProgressBar
          current={currentLevel}
          total={4}
          label={`Progres: Step ${currentLevel} dari 4 (${themeNames[currentLevel - 1]})`}
        />
      </div>

      {/* Questions Container */}
      <main className="max-w-4xl mx-auto w-full space-y-8 flex-1 animate-fade-up-2">
        {/* Inline Error Banner */}
        {errorMessage && (
          <div
            className="bg-accent-danger/10 border-3 border-accent-danger p-4 font-mono font-bold text-xs md:text-sm text-accent-danger shadow-nb-sm flex items-center justify-between gap-3 animate-fade-up sticky top-4 z-40"
            role="alert"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 stroke-[2.5] flex-none" />
              <span>{errorMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setErrorMessage("")}
              className="p-1 hover:bg-accent-danger/20 transition-colors cursor-pointer flex items-center justify-center text-ink"
              aria-label="Tutup pesan peringatan"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        )}

        {loading ? (
          <div className="bg-surface border-4 border-ink p-8 text-center font-mono font-bold animate-pulse">
            Memuat pertanyaan step {currentLevel}…
          </div>
        ) : (
          questions.map((q, idx) => {
            const isUnanswered = unansweredIds.includes(q.id);

            return (
              <div
                key={q.id}
                id={`question-card-${q.id}`}
                className="scroll-mt-24 transition-all duration-300"
              >
                <Card
                  variant="white"
                  shadow={isUnanswered ? "lg" : "md"}
                  borderWidth="4"
                  className={`p-6 md:p-8 space-y-5 text-left nb-card-hover transition-all duration-300 ${
                    isUnanswered
                      ? "!border-accent-danger !border-4 !shadow-[4px_4px_0_#FF3B3B] ring-4 ring-accent-danger/20"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 font-mono text-xs font-bold transition-colors ${
                          isUnanswered ? "bg-accent-danger text-surface" : "bg-ink text-paper"
                        }`}
                      >
                        Soal #{idx + 1}
                      </span>
                      {isUnanswered && (
                        <span className="bg-accent-danger/15 text-accent-danger border border-accent-danger px-2 py-0.5 font-mono text-xs font-bold animate-pulse inline-flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Wajib Dijawab</span>
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-xs text-ink/60 uppercase">
                      {q.type === "likert" ? "Skala 1–5" : "Pilihan Preferensi"}
                    </span>
                  </div>

                  <h2
                    className={`font-display font-bold text-lg md:text-xl leading-snug transition-colors ${
                      isUnanswered ? "text-accent-danger" : "text-ink"
                    }`}
                  >
                    {q.text}
                  </h2>

                  {/* Render Question based on type */}
                  {q.type === "likert" ? (
                    <div className="pt-2">
                      <LikertScale
                        value={answers[q.id] as number}
                        onChange={(val) => handleAnswerChange(q.id, val)}
                      />
                    </div>
                  ) : (
                    <div className="space-y-3 pt-2">
                      {q.options?.map((opt: any) => (
                        <ChoiceCard
                          key={opt.id}
                          id={opt.id}
                          labelKey={opt.key}
                          text={opt.text}
                          selected={answers[q.id] === opt.id}
                          onSelect={(val) => handleAnswerChange(q.id, val)}
                        />
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            );
          })
        )}

        {/* Navigation Button */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 border-t-3 border-ink">
          <Link href="/dashboard" className="nb-btn px-4 py-2.5 border-2 border-ink bg-surface font-mono text-xs font-bold inline-flex items-center justify-center text-center">
            Simpan &amp; Lanjut Nanti
          </Link>

          <Button
            variant="primary"
            size="lg"
            disabled={submitting || loading}
            onClick={handleNextLevel}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2"
          >
            {submitting ? (
              "Menyimpan…"
            ) : currentLevel < 4 ? (
              <>
                <span>Lanjut ke Step {currentLevel + 1}</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </>
            ) : (
              <>
                <span>Selesaikan &amp; Lihat JalanID</span>
                <Trophy className="w-5 h-5 stroke-[2.5]" />
              </>
            )}
          </Button>
        </div>
      </main>

      <footer className="text-center font-mono text-xs text-ink/60 py-4">
        Jawabanmu tersimpan secara otomatis · Tanpa batas waktu
      </footer>

      {/* Floating Toast Notification Container */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fadeIn">
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        </div>
      )}
    </div>
  );
}
