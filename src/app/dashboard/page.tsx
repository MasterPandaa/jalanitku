"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { JalanMin } from "@/components/mascot/JalanMin";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
            setUser(data.data);
          }
        }
      })
      .catch(() => {
        router.push("/login");
      })
      .finally(() => setLoading(false));
  }, [router]);

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

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="bg-surface border-b-4 border-ink sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between gap-4">
          <Logo size="md" />

          <div className="flex items-center gap-3">
            <Link
              href="/profil"
              className="nb-btn px-3 py-1.5 bg-paper text-ink border-3 border-ink shadow-nb-sm font-display font-bold text-sm hover:bg-accent-yellow"
            >
              @{user?.username} (Profil)
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Keluar
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16 w-full space-y-12">
        {/* Welcome Header */}
        <div className="bg-surface border-4 md:border-5 border-ink shadow-nb-lg p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-left">
            <div className="inline-block bg-accent-yellow border-2 border-ink px-2.5 py-0.5 font-mono text-xs font-bold uppercase shadow-nb-sm">
              Dashboard Pengguna
            </div>
            <h1 className="font-heading text-3xl md:text-5xl text-ink leading-tight">
              Halo, @{user?.username}! 👋
            </h1>
            <p className="font-sans text-base md:text-lg text-ink/80 max-w-xl leading-relaxed">
              Selamat datang di pusat kendali karier IT-mu. Pilih langkah berikutnya untuk mengeksplorasi
              atau menguji potensimu.
            </p>
          </div>

          <div className="flex-none bg-paper border-3 border-ink p-4 shadow-nb-sm flex flex-col items-center gap-2">
            <JalanMin state="happy" size={130} />
            <span className="font-mono text-xs font-bold text-ink/70">Pemandu: JalanMin</span>
          </div>
        </div>

        {/* Status Ringkasan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card Status JalanID */}
          <Card variant="white" shadow="md" borderWidth="4" className="flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-lg">Status JalanID</span>
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
              <Link href="/karir/hasil">
                <Button variant="secondary" size="sm" fullWidth>
                  Lihat &amp; Unduh JalanID →
                </Button>
              </Link>
            ) : (
              <Link href="/karir">
                <Button variant="primary" size="sm" fullWidth>
                  Mulai Tes JalanKarir →
                </Button>
              </Link>
            )}
          </Card>

          {/* Card Status Cocoklogiku */}
          <Card variant="white" shadow="md" borderWidth="4" className="flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-lg">Status Cocoklogiku</span>
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
              <Link href="/rapor/hasil">
                <Button variant="secondary" size="sm" fullWidth>
                  Lihat Rapor Cocoklogiku →
                </Button>
              </Link>
            ) : (
              <Link href="/rapor">
                <Button variant="primary" size="sm" fullWidth>
                  Mulai Tes JalanRapor →
                </Button>
              </Link>
            )}
          </Card>
        </div>

        {/* 3 Fitur Utama Dashboard */}
        <div className="space-y-6">
          <h2 className="font-display font-bold text-2xl md:text-3xl border-b-4 border-ink pb-3">
            Pilihan Fitur Utama
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Fitur A */}
            <div className="bg-accent-yellow border-4 md:border-5 border-ink shadow-nb-lg p-6 md:p-8 flex flex-col justify-between items-start gap-6">
              <div className="space-y-3">
                <div className="inline-block bg-ink text-paper px-2.5 py-0.5 font-mono font-bold text-xs">
                  FITUR A
                </div>
                <h3 className="font-heading text-3xl leading-none">JalanKarir</h3>
                <p className="font-sans text-base leading-snug">
                  Cari tahu role IT yang paling cocok dengan minat, cara kerja, dan preferensimu.
                </p>
                <div className="font-mono text-xs text-ink/80 pt-1">
                  ⏱️ 5 Level · Tanpa batas waktu
                </div>
              </div>

              <Link href="/karir" className="w-full">
                <Button variant="white" size="md" fullWidth>
                  {user?.has_jalan_id ? "Ulangi Tes JalanKarir" : "Mulai JalanKarir →"}
                </Button>
              </Link>
            </div>

            {/* Fitur B */}
            <div className="bg-accent-pink text-ink border-4 md:border-5 border-ink shadow-nb-lg p-6 md:p-8 flex flex-col justify-between items-start gap-6">
              <div className="space-y-3">
                <div className="inline-block bg-ink text-paper px-2.5 py-0.5 font-mono font-bold text-xs">
                  FITUR B
                </div>
                <h3 className="font-heading text-3xl leading-none">JalanRapor</h3>
                <p className="font-sans text-base leading-snug">
                  Uji kecocokanmu dengan role pilihan lewat soal teknis bertingkat.
                </p>
                <div className="font-mono text-xs text-ink/80 pt-1">
                  📊 5 Level kesulitan · 50 Soal teknis
                </div>
              </div>

              <Link href="/rapor" className="w-full">
                <Button variant="white" size="md" fullWidth>
                  {user?.has_cocoklogiku ? "Ulangi / Ganti Role" : "Mulai JalanRapor →"}
                </Button>
              </Link>
            </div>

            {/* Fitur C */}
            <div className="bg-accent-green text-ink border-4 md:border-5 border-ink shadow-nb-lg p-6 md:p-8 flex flex-col justify-between items-start gap-6 opacity-85">
              <div className="space-y-3">
                <div className="flex items-center justify-between w-full">
                  <div className="inline-block bg-ink text-paper px-2.5 py-0.5 font-mono font-bold text-xs">
                    FITUR C
                  </div>
                  <Badge variant="orange" size="sm">
                    Segera Hadir
                  </Badge>
                </div>
                <h3 className="font-heading text-3xl leading-none">JalanLoker</h3>
                <p className="font-sans text-base leading-snug">
                  Cari lowongan kerja IT yang relevan dengan role dan kompetensi rapormu.
                </p>
                <div className="font-mono text-xs text-ink/80 pt-1">
                  💼 Tahap perencanaan lanjutan
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
