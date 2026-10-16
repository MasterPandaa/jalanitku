"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { LikertScale } from "@/components/ui/LikertScale";
import { ChoiceCard } from "@/components/ui/ChoiceCard";
import { Dialog } from "@/components/ui/Dialog";
import { JalanMin } from "@/components/mascot/JalanMin";

export default function KarirPage() {
  const router = useRouter();

  // Session state
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasPreviousResult, setHasPreviousResult] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);

  // Check auth and previous results on mount
  useEffect(() => {
    fetch("/api/me")
      .then((res) => {
        if (!res.ok) throw new Error("Unauthenticated");
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          if (!data.data.username) {
            router.push("/onboarding");
          } else {
            setHasPreviousResult(Boolean(data.data.has_jalan_id));
          }
        }
      })
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  const startSession = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/karir/sessions", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setSessionId(data.data.session_id);
        setHasStarted(true);
        loadQuestions(data.data.session_id, 1);
      } else {
        alert(data.error?.message || "Gagal memulai sesi");
      }
    } catch {
      alert("Terjadi kesalahan jaringan.");
    } finally {
      setLoading(false);
    }
  };

  const loadQuestions = async (sessId: string, level: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/karir/sessions/${sessId}/questions?level=${level}`);
      const data = await res.json();
      if (data.success) {
        setQuestions(data.data.questions);
        setCurrentLevel(level);
      }
    } catch {
      alert("Gagal memuat pertanyaan.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId: string, value: number | string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNextLevel = async () => {
    if (!sessionId) return;

    // Check that all current questions have answers
    const unanswered = questions.find((q) => answers[q.id] === undefined);
    if (unanswered) {
      alert("Harap jawab semua pertanyaan di level ini sebelum melanjutkan.");
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
        if (currentLevel < 5) {
          loadQuestions(sessionId, currentLevel + 1);
        } else {
          // Finished all 5 levels!
          finishSession();
        }
      }
    } catch {
      alert("Gagal menyimpan jawaban.");
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
        router.push("/karir/hasil");
      } else {
        alert(data.error?.message || "Gagal menghitung hasil");
      }
    } catch {
      alert("Gagal menyelesaikan sesi.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && !hasStarted) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center p-6">
        <div className="font-mono text-sm font-bold animate-pulse">Menyiapkan JalanKarir...</div>
      </div>
    );
  }

  // Pre-test Intro Screen
  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-paper flex flex-col justify-between p-4 md:p-8">
        <header className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <Logo size="md" />
          <Link
            href="/dashboard"
            className="nb-btn px-4 py-2 bg-surface text-ink border-3 border-ink shadow-nb-sm font-display font-bold text-sm"
          >
            ← Kembali ke Dashboard
          </Link>
        </header>

        <main className="max-w-2xl mx-auto my-12 w-full">
          <Card variant="white" shadow="lg" borderWidth="5" className="p-8 md:p-10 space-y-6 text-left">
            <div className="flex items-center gap-4 border-b-4 border-ink pb-6">
              <JalanMin state="happy" size={100} className="flex-none" />
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
              <div>• 5 Level bertahap (Minat, Gaya Kerja, Skenario, Teknis, Prioritas).</div>
              <div>• Pertanyaan skala (1–5) dan skenario pilihan ganda (a–e).</div>
              <div>• Tanpa batasan waktu — kerjakan dengan tenang.</div>
              <div>• Hasil berupa kartu identitas digital resmi: <strong>JalanID</strong>.</div>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => {
                  if (hasPreviousResult) {
                    setShowWarningModal(true);
                  } else {
                    startSession();
                  }
                }}
              >
                Mulai Tes JalanKarir Sekarang →
              </Button>
            </div>
          </Card>
        </main>

        <footer className="text-center font-mono text-xs text-ink/60 pb-2">
          © 2026 JalanITku · Engine Rekomendasi Karier Vektor Role
        </footer>

        {/* Warning Modal if overwriting existing JalanID */}
        <Dialog
          isOpen={showWarningModal}
          onClose={() => setShowWarningModal(false)}
          onConfirm={() => {
            setShowWarningModal(false);
            startSession();
          }}
          title="Ulangi Tes JalanKarir?"
          description="Kamu sudah memiliki kartu JalanID aktif sebelumnya. Mengikuti tes ini kembali akan menggantikan kartu JalanID lama milikmu secara permanen. Lanjutkan?"
          confirmLabel="Ya, Mulai Tes Baru"
          cancelLabel="Batal"
          variant="danger"
        />
      </div>
    );
  }

  // Active Test Question Screen
  const themeNames = [
    "Minat & Ketertarikan Umum",
    "Gaya Kerja & Kolaborasi",
    "Skenario Kasus Lapangan",
    "Ketertarikan Teknis Spesifik",
    "Prioritas Jalur Karier",
  ];

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col justify-between p-4 md:p-8">
      {/* Top Header */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between border-b-4 border-ink pb-4">
        <Logo size="sm" />
        <div className="flex items-center gap-3">
          <Badge variant="yellow" size="sm">
            Level {currentLevel} dari 5
          </Badge>
          <span className="font-mono text-xs font-bold text-ink/70">
            {themeNames[currentLevel - 1]}
          </span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto w-full my-6">
        <ProgressBar
          current={currentLevel}
          total={5}
          label={`Progres: Level ${currentLevel} (${themeNames[currentLevel - 1]})`}
        />
      </div>

      {/* Questions Container */}
      <main className="max-w-4xl mx-auto w-full space-y-8 flex-1">
        {loading ? (
          <div className="bg-surface border-4 border-ink p-8 text-center font-mono font-bold">
            Memuat pertanyaan level {currentLevel}...
          </div>
        ) : (
          questions.map((q, idx) => (
            <Card
              key={q.id}
              variant="white"
              shadow="md"
              borderWidth="4"
              className="p-6 md:p-8 space-y-5 text-left"
            >
              <div className="flex items-center justify-between">
                <span className="bg-ink text-paper px-2.5 py-0.5 font-mono text-xs font-bold">
                  Soal #{idx + 1}
                </span>
                <span className="font-mono text-xs text-ink/60 uppercase">
                  {q.type === "likert" ? "Skala 1–5" : "Pilihan Preferensi"}
                </span>
              </div>

              <h2 className="font-display font-bold text-lg md:text-xl text-ink leading-snug">
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
          ))
        )}

        {/* Navigation Button */}
        <div className="flex items-center justify-between pt-6 border-t-3 border-ink">
          <Link href="/dashboard" className="nb-btn px-4 py-2 border-2 border-ink bg-surface font-mono text-xs font-bold">
            Simpan &amp; Lanjut Nanti
          </Link>

          <Button
            variant="primary"
            size="lg"
            disabled={submitting || loading}
            onClick={handleNextLevel}
          >
            {submitting
              ? "Menyimpan..."
              : currentLevel < 5
              ? `Lanjut ke Level ${currentLevel + 1} →`
              : "Selesaikan & Lihat JalanID 🎉"}
          </Button>
        </div>
      </main>

      <footer className="text-center font-mono text-xs text-ink/60 py-4">
        Jawabanmu tersimpan secara otomatis · Tanpa batas waktu
      </footer>
    </div>
  );
}
