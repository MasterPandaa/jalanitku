"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  RotateCcw, 
  ArrowRight, 
  Clock, 
  BarChart3, 
  Briefcase, 
  Compass, 
  GraduationCap,
  BadgeCheck,
  ClipboardCheck
} from "lucide-react";
import { AppNavbar } from "@/components/ui/AppNavbar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { JalanMin } from "@/components/mascot/JalanMin";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadUser = React.useCallback(() => {
    setLoading(true);
    setLoadError(null);
    fetch("/api/me")
      .then((res) => {
        if (res.status === 401) {
          router.push("/login");
          return null;
        }
        if (!res.ok) {
          throw new Error("Gagal mengambil data akun. Silakan coba lagi.");
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        if (data.success && data.data) {
          if (!data.data.username) {
            router.push("/onboarding");
          } else {
            setUser(data.data);
          }
        }
      })
      .catch((err) => {
        setLoadError(err.message || "Terjadi gangguan saat memuat dashboard.");
      })
      .finally(() => setLoading(false));
  }, [router]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center p-6">
        <div className="bg-surface border-4 border-ink shadow-nb-md p-8 flex flex-col items-center gap-4">
          <JalanMin state="idle" size={100} />
          <div className="font-mono text-sm font-bold animate-pulse">Memuat dashboard...</div>
        </div>
      </div>
    );
  }

  if (loadError && !user) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center p-6">
        <div className="bg-surface border-4 border-ink shadow-nb-lg p-8 max-w-md w-full flex flex-col items-center gap-4 text-center animate-fade-in">
          <JalanMin state="neutral" size={100} />
          <h2 className="font-heading font-black text-2xl text-ink">Gagal Memuat Dashboard</h2>
          <p className="font-sans text-sm text-ink/80 leading-relaxed">{loadError}</p>
          <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full">
            <Button variant="primary" size="md" fullWidth onClick={loadUser} className="inline-flex items-center justify-center gap-2">
              <span>Coba Lagi</span>
              <RotateCcw className="w-4 h-4 stroke-[2.5]" />
            </Button>
            <Button variant="white" size="md" fullWidth href="/login">
              Ke Halaman Masuk
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col justify-between">
      {/* Top Navbar */}
      <AppNavbar user={user} onLogout={handleLogout} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16 w-full space-y-12">
        {/* Welcome Header */}
        <div className="animate-fade-up bg-surface border-4 md:border-5 border-ink shadow-nb-lg p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-left">
            <div className="inline-block bg-accent-yellow border-2 border-ink px-2.5 py-0.5 font-mono text-xs font-bold uppercase shadow-nb-sm">
              Dashboard Pengguna
            </div>
            <h1 className="font-heading text-3xl md:text-5xl text-ink leading-tight">
              Halo, @{user?.username}!
            </h1>
            <p className="font-sans text-base md:text-lg text-ink/80 max-w-xl leading-relaxed">
              Selamat datang di pusat kendali karier IT-mu. Pilih langkah berikutnya untuk mengeksplorasi
              atau menguji potensimu.
            </p>
          </div>

          <div className="flex-none bg-paper border-3 border-ink p-4 shadow-nb-sm flex flex-col items-center gap-2 rotate-2 transition-transform duration-200 hover:rotate-0 hover:scale-105">
            <JalanMin state="happy" size={130} />
            <span className="font-mono text-xs font-bold text-ink/70">Pemandu: JalanMin</span>
          </div>
        </div>

        {/* Status Ringkasan */}
        <div className="animate-fade-up-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card Status JalanID */}
          <Card variant="white" shadow="md" borderWidth="4" className="group nb-card-hover flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border-2 border-ink bg-accent-yellow shadow-[2px_2px_0_#0A0A0A] flex items-center justify-center text-ink flex-none transition-transform duration-150 group-hover:-rotate-3">
                    <BadgeCheck className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <span className="font-display font-bold text-lg">Status JalanID</span>
                </div>
                <Badge variant={user?.has_jalan_id ? "green" : "ink"}>
                  {user?.has_jalan_id ? "Aktif" : "Belum Ada"}
                </Badge>
              </div>
              <p className="font-sans text-sm text-ink/75">
                {user?.has_jalan_id
                  ? "Kamu telah menyelesaikan tes JalanKarir dan memiliki kartu JalanID aktif."
                  : "Kamu belum mengikuti tes JalanKarir. Cari tahu role IT yang cocok untukmu sekarang!"}
              </p>
            </div>
            {user?.has_jalan_id ? (
              <Button href="/karir/hasil" variant="secondary" size="sm" fullWidth className="inline-flex items-center justify-center gap-2">
                <span>Lihat &amp; Unduh JalanID</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Button>
            ) : (
              <Button href="/karir" variant="primary" size="sm" fullWidth className="inline-flex items-center justify-center gap-2">
                <span>Mulai Tes JalanKarir</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Button>
            )}
          </Card>

          {/* Card Status Cocoklogiku */}
          <Card variant="white" shadow="md" borderWidth="4" className="group nb-card-hover flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border-2 border-ink bg-accent-pink shadow-[2px_2px_0_#0A0A0A] flex items-center justify-center text-ink flex-none transition-transform duration-150 group-hover:-rotate-3">
                    <ClipboardCheck className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <span className="font-display font-bold text-lg">Status Cocoklogiku</span>
                </div>
                <Badge variant={user?.has_cocoklogiku ? "green" : "ink"}>
                  {user?.has_cocoklogiku ? "Aktif" : "Belum Ada"}
                </Badge>
              </div>
              <p className="font-sans text-sm text-ink/75">
                {user?.has_cocoklogiku
                  ? `Rapor Cocoklogiku aktif untuk role ${user?.active_role_slug || "IT"}.`
                  : "Uji pemahaman teknismu dan dapatkan rapor kecocokan di JalanRapor."}
              </p>
            </div>
            {user?.has_cocoklogiku ? (
              <Button href="/rapor/hasil" variant="secondary" size="sm" fullWidth className="inline-flex items-center justify-center gap-2">
                <span>Lihat Rapor Cocoklogiku</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Button>
            ) : (
              <Button href="/rapor" variant="primary" size="sm" fullWidth className="inline-flex items-center justify-center gap-2">
                <span>Mulai Tes JalanRapor</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Button>
            )}
          </Card>
        </div>

        {/* 3 Fitur Utama Dashboard */}
        <div className="animate-fade-up-2 space-y-6">
          <h2 className="font-display font-bold text-2xl md:text-3xl border-b-4 border-ink pb-3">
            Pilihan Fitur Utama
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Fitur A */}
            <div className="group nb-card-hover bg-accent-yellow border-4 md:border-5 border-ink shadow-nb-lg p-6 md:p-8 flex flex-col justify-between items-start gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 border-2 border-ink bg-ink text-accent-yellow shadow-[2px_2px_0_#0A0A0A] flex items-center justify-center flex-none">
                    <Compass className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div className="inline-block bg-ink text-paper px-2.5 py-0.5 font-mono font-bold text-xs transition-transform duration-200 group-hover:-rotate-3">
                    FITUR A
                  </div>
                </div>
                <h3 className="font-heading text-3xl leading-none">JalanKarir</h3>
                <p className="font-sans text-base leading-snug">
                  Cari tahu role IT yang paling cocok dengan minat, cara kerja, dan preferensimu.
                </p>
                <div className="font-mono text-xs text-ink/80 pt-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 stroke-[2.5] flex-none" />
                  <span>5 Level · Tanpa batas waktu</span>
                </div>
              </div>

              <Button href="/karir" variant="white" size="md" fullWidth className="inline-flex items-center justify-center gap-2">
                <span>{user?.has_jalan_id ? "Ulangi Tes JalanKarir" : "Mulai JalanKarir"}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Button>
            </div>

            {/* Fitur B */}
            <div className="group nb-card-hover bg-accent-pink text-ink border-4 md:border-5 border-ink shadow-nb-lg p-6 md:p-8 flex flex-col justify-between items-start gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 border-2 border-ink bg-ink text-accent-pink shadow-[2px_2px_0_#0A0A0A] flex items-center justify-center flex-none">
                    <GraduationCap className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div className="inline-block bg-ink text-paper px-2.5 py-0.5 font-mono font-bold text-xs transition-transform duration-200 group-hover:-rotate-3">
                    FITUR B
                  </div>
                </div>
                <h3 className="font-heading text-3xl leading-none">JalanRapor</h3>
                <p className="font-sans text-base leading-snug">
                  Uji kecocokanmu dengan role pilihan lewat soal teknis bertingkat.
                </p>
                <div className="font-mono text-xs text-ink/80 pt-1 flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 stroke-[2.5] flex-none" />
                  <span>5 Level kesulitan · 50 Soal teknis</span>
                </div>
              </div>

              <Button href="/rapor" variant="white" size="md" fullWidth className="inline-flex items-center justify-center gap-2">
                <span>{user?.has_cocoklogiku ? "Ulangi / Ganti Role" : "Mulai JalanRapor"}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Button>
            </div>

            {/* Fitur C */}
            <div className="group bg-accent-green text-ink border-4 md:border-5 border-ink shadow-nb-lg p-6 md:p-8 flex flex-col justify-between items-start gap-6 opacity-90 transition-opacity hover:opacity-100">
              <div className="space-y-3">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 border-2 border-ink bg-ink text-accent-green shadow-[2px_2px_0_#0A0A0A] flex items-center justify-center flex-none">
                      <Briefcase className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div className="inline-block bg-ink text-paper px-2.5 py-0.5 font-mono font-bold text-xs">
                      FITUR C
                    </div>
                  </div>
                  <Badge variant="orange" size="sm">
                    Segera Hadir
                  </Badge>
                </div>
                <h3 className="font-heading text-3xl leading-none">JalanLoker</h3>
                <p className="font-sans text-base leading-snug">
                  Cari lowongan kerja IT yang relevan dengan role dan kompetensi rapormu.
                </p>
                <div className="font-mono text-xs text-ink/80 pt-1 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 stroke-[2.5] flex-none" />
                  <span>Tahap perencanaan lanjutan</span>
                </div>
              </div>

              <Button variant="white" size="md" fullWidth disabled>
                Belum Tersedia
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t-4 border-ink py-6 mt-16 text-center font-mono text-xs text-ink/75">
        © 2026 JalanITku · Dashboard Pengguna Terautentikasi
      </footer>
    </div>
  );
}
