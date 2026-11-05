"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppNavbar } from "@/components/ui/AppNavbar";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ChoiceCard } from "@/components/ui/ChoiceCard";
import { Dialog } from "@/components/ui/Dialog";
import { JalanMin } from "@/components/mascot/JalanMin";
import { ClientRaporQuestion, CocoklogikuRecord } from "@/lib/rapor";
import Link from "next/link";

interface RoleOption {
  slug: string;
  nama: string;
  kategori: string;
  isAvailable: boolean;
  deskripsi: string;
}

export default function JalanRaporPage() {
  const router = useRouter();

  // State User & Data
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ id: string; username: string } | null>(null);
  const [existingCocoklogiku, setExistingCocoklogiku] = useState<CocoklogikuRecord | null>(null);
  const [jalanIdRoleSlug, setJalanIdRoleSlug] = useState<string | null>(null);

  // State Roles List
  const [roles, setRoles] = useState<RoleOption[]>([]);
  const [roleFilter, setRoleFilter] = useState<"all" | "available" | "upcoming">("all");
  const [selectedRoleToTest, setSelectedRoleToTest] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // State Active Test Session
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [activeRoleName, setActiveRoleName] = useState("");
  const [currentLevel, setCurrentLevel] = useState(1);
  const [totalLevels, setTotalLevels] = useState(5);
  const [levelQuestions, setLevelQuestions] = useState<ClientRaporQuestion[]>([]);
  const [currentAnswers, setCurrentAnswers] = useState<Record<string, string>>({});
  const [submittingLevel, setSubmittingLevel] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [initError, setInitError] = useState<string | null>(null);

  // 1. Inisialisasi: Load User, Existing Cocoklogiku, JalanID recommendation, dan Roles
  const initData = React.useCallback(async () => {
    try {
      setLoading(true);
      setInitError(null);
      // Cek login
      const meRes = await fetch("/api/me");
      if (!meRes.ok) {
        router.push("/login?redirect=/rapor");
        return;
      }
      const meData = await meRes.json();
      setUser(meData.data);

      // Cek Cocoklogiku aktif
      const cocokRes = await fetch("/api/me/cocoklogiku");
      if (cocokRes.ok) {
        const cocokData = await cocokRes.json();
        if (cocokData.cocoklogiku) {
          setExistingCocoklogiku(cocokData.cocoklogiku);
        }
      }

      // Cek JalanID jika ada
      const jalanIdRes = await fetch("/api/me/jalanid");
      if (jalanIdRes.ok) {
        const jData = await jalanIdRes.json();
        if (jData.jalanId?.primaryRoleSlug) {
          setJalanIdRoleSlug(jData.jalanId.primaryRoleSlug);
        }
      }

      // Ambil daftar roles
      const rolesRes = await fetch("/api/roles");
      if (!rolesRes.ok) {
        throw new Error("Gagal mengambil katalog peran IT.");
      }
      const rData = await rolesRes.json();
      const availableSlugs = [
        "software-engineer",
        "data-analyst",
        "uiux-designer",
        "network-engineer",
        "quality-assurance",
      ];

      const rawList: any[] = Array.isArray(rData.data)
        ? rData.data
        : Array.isArray(rData.roles)
        ? rData.roles
        : Array.isArray(rData)
        ? rData
        : [];

      const formattedRoles: RoleOption[] = rawList.map((r: any) => ({
        slug: r.slug,
        nama: typeof r.nama === "object" ? r.nama?.id || r.slug : r.nama || r.slug,
        kategori: r.julukan || r.kategori || "IT Role",
        isAvailable: availableSlugs.includes(r.slug) || Boolean(r.has_rapor_bank),
        deskripsi:
          typeof r.deskripsi === "object"
            ? r.deskripsi?.id || ""
            : typeof r.deskripsi_singkat === "object"
            ? r.deskripsi_singkat?.id || ""
            : typeof r.tagline === "object"
            ? r.tagline?.id || ""
            : r.deskripsi || r.tagline || "",
      }));

      setRoles(formattedRoles);
    } catch (err: any) {
      console.error("Gagal inisialisasi:", err);
      setInitError(err?.message || "Terjadi gangguan saat memuat data peran.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    initData();
  }, [initData]);

  // Mulai Sesi Baru
  const handleSelectRole = (slug: string) => {
    setSelectedRoleToTest(slug);
    if (existingCocoklogiku) {
      setShowConfirmModal(true);
    } else {
      executeStartSession(slug);
    }
  };

  const executeStartSession = async (roleSlug: string) => {
    setShowConfirmModal(false);
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/rapor/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role_slug: roleSlug }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Gagal memulai tes");
        setLoading(false);
        return;
      }

      setSessionId(data.session_id);
      setActiveRoleName(data.role_name);
      setCurrentLevel(data.current_level);
      setTotalLevels(data.total_levels);

      // Load Soal Level 1
      await loadLevelQuestions(data.session_id, data.current_level);
    } catch (err: any) {
      setErrorMsg(err.message || "Terjadi kesalahan jaringan.");
    } finally {
      setLoading(false);
    }
  };

  // Ambil Pertanyaan Level
  const loadLevelQuestions = async (sId: string, level: number) => {
    try {
      const res = await fetch(`/api/rapor/sessions/${sId}/level?level=${level}`);
      const data = await res.json();
      if (res.ok) {
        setLevelQuestions(data.questions);
        setCurrentAnswers({});
      } else {
        setErrorMsg(data.error || "Gagal memuat pertanyaan");
      }
    } catch (err: any) {
      setErrorMsg("Gagal memuat soal level.");
    }
  };

  // Pilih Jawaban Soal
  const handleAnswerChange = (questionId: string, optionKey: string) => {
    setCurrentAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey,
    }));
  };

  // Submit Level
  const handleSubmitLevel = async () => {
    if (!sessionId) return;

    // Pastikan semua soal di level ini sudah dijawab
    const unanswered = levelQuestions.filter((q) => !currentAnswers[q.id]);
    if (unanswered.length > 0) {
      setErrorMsg(`Harap jawab semua soal di level ini (${unanswered.length} soal belum diisi).`);
      return;
    }

    setSubmittingLevel(true);
    setErrorMsg("");

    try {
      const res = await fetch(`/api/rapor/sessions/${sessionId}/answers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          level: currentLevel,
          answers: currentAnswers,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Gagal menyimpan jawaban.");
        setSubmittingLevel(false);
        return;
      }

      if (data.is_finished) {
        // Level 5 selesai -> Hitung skor dan redirect
        const finishRes = await fetch(`/api/rapor/sessions/${sessionId}/finish`, {
          method: "POST",
        });
        const finishData = await finishRes.json();
        if (finishRes.ok) {
          router.push(`/rapor/hasil?session_id=${sessionId}`);
        } else {
          setErrorMsg(finishData.error || "Gagal menyelesaikan kalkulasi rapor.");
          setSubmittingLevel(false);
        }
      } else {
        // Maju ke level berikutnya
        const nextLvl = data.next_level;
        setCurrentLevel(nextLvl);
        await loadLevelQuestions(sessionId, nextLvl);
        window.scrollTo({ top: 0, behavior: "smooth" });
        setSubmittingLevel(false);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Gagal mengirim jawaban level.");
      setSubmittingLevel(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-paper">
        <AppNavbar user={user} />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-4">
            <JalanMin state="idle" size={80} />
            <div className="font-heading font-black text-xl text-ink">
              Menyiapkan Ruang Uji JalanRapor…
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (initError && roles.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-paper">
        <AppNavbar user={user} />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="bg-surface border-4 border-accent-danger shadow-nb-lg p-8 max-w-md w-full text-center space-y-4 animate-fade-in">
            <JalanMin state="neutral" size={80} />
            <h2 className="font-heading font-black text-2xl text-ink">Gagal Memuat JalanRapor</h2>
            <p className="font-sans text-sm text-ink/80 leading-relaxed font-medium">{initError}</p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button variant="primary" size="md" fullWidth onClick={initData}>
                Coba Lagi ↺
              </Button>
              <Button href="/dashboard" variant="white" size="md" fullWidth>
                Ke Dashboard
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <AppNavbar user={user} />

      <main className="flex-1 py-8 px-4 sm:px-6 max-w-5xl mx-auto w-full">
        {/* TAMPILAN 1: BELUM MULAI SESI TES (PEMILIHAN ROLE) */}
        {!sessionId ? (
          <div className="space-y-8 animate-fade-in">
            {/* Quick Back to Dashboard */}
            <div className="flex items-center justify-between mb-4">
              <Link
                href="/dashboard"
                className="nb-btn px-4 py-2 bg-surface text-ink border-3 border-ink shadow-nb-sm font-display font-bold text-sm hover:bg-accent-yellow inline-flex items-center gap-2 transition-all hover:-translate-x-0.5"
              >
                <span>←</span>
                <span>Kembali ke Dashboard</span>
              </Link>
            </div>

            {/* Header JalanRapor */}
            <div className="text-center max-w-2xl mx-auto space-y-3 animate-fade-up">
              <Badge variant="yellow" className="text-xs uppercase tracking-widest px-3 py-1">
                JALANRAPOR • UJI KOMPETENSI TEKNIS
              </Badge>
              <h1 className="text-3xl sm:text-5xl font-black font-heading text-ink tracking-tight">
                Uji Keselarasan Skill Nyata
              </h1>
              <p className="text-sm sm:text-base text-ink/75 leading-relaxed font-medium">
                Pilih peran IT yang ingin kamu evaluasi. Jalani 5 level bertingkat tanpa batas waktu untuk mencetak kartu <strong>Cocoklogiku</strong>.
              </p>
            </div>

            {/* Banner Status Hasil Aktif jika sudah punya Cocoklogiku */}
            {existingCocoklogiku && (
              <Card className="p-6 bg-accent-yellow/20 border-4 border-ink shadow-nb-md flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-up-1 nb-card-hover">
                <div className="flex items-center gap-4">
                  <JalanMin state="happy" size={56} className="transition-transform duration-200 hover:scale-110" />
                  <div>
                    <span className="text-[10px] font-mono font-bold text-ink/70 uppercase tracking-widest block">
                      HASIL COCOKLOGIKU AKTIF
                    </span>
                    <h3 className="font-heading font-black text-xl text-ink">
                      {existingCocoklogiku.roleName}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-mono font-bold text-sm text-ink">
                        Skor: {existingCocoklogiku.finalScore}/100
                      </span>
                      <Badge variant="green" className="text-xs">
                        {existingCocoklogiku.matchLabel}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Button href="/rapor/hasil" variant="primary" className="w-full flex-1 sm:flex-initial">
                    Lihat Kartu Hasil ➔
                  </Button>
                </div>
              </Card>
            )}

            {/* Grid Pemilihan Role */}
            <div className="space-y-4 animate-fade-up-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-3 border-ink pb-3">
                <div>
                  <h2 className="font-heading font-black text-xl text-ink">
                    Pilih Role Pengujian:
                  </h2>
                  <span className="text-xs font-mono font-bold text-gray-600">
                    21 Role Profesi IT (Hick&apos;s Law Filter)
                  </span>
                </div>

                {/* Filter Tabs Hick's Law */}
                <div className="flex items-center gap-1.5 bg-paper p-1 border-2 border-ink shadow-nb-sm">
                  <button
                    type="button"
                    onClick={() => setRoleFilter("all")}
                    className={`px-3 py-1 font-mono text-xs font-bold border-2 transition-all ${
                      roleFilter === "all"
                        ? "bg-accent-yellow text-ink border-ink shadow-nb-sm"
                        : "bg-transparent text-ink/70 border-transparent hover:text-ink"
                    }`}
                  >
                    Semua ({roles.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setRoleFilter("available")}
                    className={`px-3 py-1 font-mono text-xs font-bold border-2 transition-all ${
                      roleFilter === "available"
                        ? "bg-accent-green text-ink border-ink shadow-nb-sm"
                        : "bg-transparent text-ink/70 border-transparent hover:text-ink"
                    }`}
                  >
                    Siap Uji ({roles.filter((r) => r.isAvailable).length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setRoleFilter("upcoming")}
                    className={`px-3 py-1 font-mono text-xs font-bold border-2 transition-all ${
                      roleFilter === "upcoming"
                        ? "bg-white text-ink border-ink shadow-nb-sm"
                        : "bg-transparent text-ink/70 border-transparent hover:text-ink"
                    }`}
                  >
                    Segera Hadir ({roles.filter((r) => !r.isAvailable).length})
                  </button>
                </div>
              </div>

              {roles.filter((role) => {
                if (roleFilter === "available") return role.isAvailable;
                if (roleFilter === "upcoming") return !role.isAvailable;
                return true;
              }).length === 0 ? (
                <div className="bg-surface border-3 border-ink shadow-nb-sm p-8 text-center space-y-3">
                  <p className="font-mono text-sm font-bold text-ink">Tidak ada role pada filter ini.</p>
                  <button
                    type="button"
                    onClick={() => setRoleFilter("all")}
                    className="font-mono text-xs text-accent-blue underline font-bold cursor-pointer"
                  >
                    Kembali ke Semua Role
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {roles
                    .filter((role) => {
                      if (roleFilter === "available") return role.isAvailable;
                      if (roleFilter === "upcoming") return !role.isAvailable;
                      return true;
                    })
                    .map((role) => {
                    const isRecommendedByKarir = jalanIdRoleSlug === role.slug;

                    return (
                      <button
                        key={role.slug}
                        type="button"
                        disabled={!role.isAvailable}
                        className={`relative border-3 border-ink p-5 transition-all text-left w-full flex flex-col justify-between ${
                          role.isAvailable
                            ? "bg-white shadow-nb-md hover:-translate-x-0.5 hover:-translate-y-1 hover:shadow-nb-lg active:translate-x-0.5 active:translate-y-0.5 active:shadow-nb-sm cursor-pointer focus-visible:outline-4 focus-visible:outline-accent-blue"
                            : "bg-gray-100 opacity-60 cursor-not-allowed shadow-nb-sm"
                        }`}
                        onClick={() => {
                          if (role.isAvailable) handleSelectRole(role.slug);
                        }}
                      >
                        <div>
                          {/* Badge Rekomendasi JalanKarir */}
                          {isRecommendedByKarir && (
                            <div className="absolute -top-3 -right-2 bg-accent-cyan text-ink border-2 border-ink px-2 py-0.5 text-[10px] font-black font-mono shadow-nb-sm">
                              ★ SARAN JALANKARIR
                            </div>
                          )}

                          <div className="flex items-start justify-between mb-2">
                            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 bg-gray-100 border border-ink">
                              {role.kategori}
                            </span>
                            <Badge variant={role.isAvailable ? "green" : "white"} className="text-[10px]">
                              {role.isAvailable ? "Tersedia" : "Segera Hadir"}
                            </Badge>
                          </div>

                          <h3 className="font-heading font-black text-lg text-ink mt-2 mb-1">
                            {role.nama}
                          </h3>
                          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
                            {role.deskripsi}
                          </p>
                        </div>

                        {/* Visual CTA Indicator */}
                        <div
                          className={`w-full py-2 px-3 border-2 border-ink text-xs font-display font-bold text-center shadow-nb-sm ${
                            role.isAvailable
                              ? "bg-accent-yellow text-ink"
                              : "bg-white text-gray-400 border-gray-400"
                          }`}
                        >
                          {role.isAvailable ? "Mulai Uji Kompetensi ➔" : "Segera Hadir"}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* TAMPILAN 2: SESI TES AKTIF (5 LEVEL) */
          <div className="space-y-8 animate-fade-up">
            {/* Header Uji Aktif */}
            <div className="bg-white border-4 border-ink shadow-nb-md p-6 animate-fade-up-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b-3 border-ink gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-accent-yellow px-2 py-0.5 border border-ink text-[10px] font-black uppercase">
                      JALANRAPOR
                    </span>
                    <span className="text-xs font-mono font-bold text-gray-600">
                      Evaluasi Role:
                    </span>
                  </div>
                  <h2 className="text-2xl font-black font-heading text-ink mt-0.5">
                    {activeRoleName}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="yellow" className="text-sm px-3 py-1 font-mono shadow-nb-sm">
                    LEVEL {currentLevel} DARI {totalLevels}
                  </Badge>
                </div>
              </div>

              {/* Progress Bar Level */}
              <div className="space-y-1.5">
                <ProgressBar
                  current={currentLevel - 1}
                  total={totalLevels}
                  label={`Level ${currentLevel} dari ${totalLevels}`}
                />
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="bg-red-50 border-3 border-red-500 p-4 font-mono font-bold text-xs text-red-700 shadow-nb-sm animate-fade-up">
                ⚠️ {errorMsg}
              </div>
            )}

            {/* Daftar Pertanyaan di Level Aktif */}
            <div className="space-y-6 animate-fade-up-2">
              {levelQuestions.map((question, qIdx) => {
                const selectedKey = currentAnswers[question.id] || "";

                return (
                  <Card
                    key={question.id}
                    className="p-6 bg-white border-3 border-ink shadow-nb-md space-y-4 nb-card-hover transition-all"
                  >
                    <div className="flex items-center justify-between pb-2 border-b-2 border-gray-100">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 bg-ink text-white">
                        Soal #{qIdx + 1}
                      </span>
                      <span className="text-xs font-mono font-bold text-gray-500">
                        Pilar: {question.competency_name}
                      </span>
                    </div>

                    <h3 className="font-heading font-black text-base sm:text-lg text-ink leading-snug">
                      {question.text}
                    </h3>

                    {/* Opsi Jawaban (ChoiceCard) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {question.options.map((opt) => (
                        <ChoiceCard
                          key={opt.key}
                          id={opt.key}
                          labelKey={opt.key.toUpperCase()}
                          text={opt.text}
                          selected={selectedKey === opt.key}
                          onSelect={() => handleAnswerChange(question.id, opt.key)}
                        />
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Tombol Kirim Level */}
            <div className="flex items-center justify-between pt-4">
              <span className="text-xs font-mono text-gray-500">
                {Object.keys(currentAnswers).length} dari {levelQuestions.length} soal terjawab
              </span>

              <Button
                variant="primary"
                size="lg"
                onClick={handleSubmitLevel}
                disabled={submittingLevel}
                className="min-w-[200px]"
              >
                {submittingLevel
                  ? "Menilai..."
                  : currentLevel === totalLevels
                  ? "Selesaikan & Lihat Cocoklogiku ➔"
                  : `Lanjut ke Level ${currentLevel + 1} ➔`}
              </Button>
            </div>
          </div>
        )}

        {/* Modal Konfirmasi Peringatan Timpa Hasil Lama */}
        <Dialog
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={() => {
            if (selectedRoleToTest) executeStartSession(selectedRoleToTest);
          }}
          title="⚠️ PERINGATAN: HASIL LAMA AKAN TIMPA"
          description={`Sesuai aturan sistem JalanITku, setiap akun hanya memiliki 1 Cocoklogiku aktif. Memulai tes baru ini akan menghapus dan menimpa skor Cocoklogiku ${existingCocoklogiku?.roleName || ""} yang sudah ada!`}
          confirmLabel="Ya, Mulai Tes Baru"
          cancelLabel="Batal"
          variant="danger"
        />
      </main>

      <Footer />
    </div>
  );
}
