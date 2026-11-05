"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppNavbar } from "@/components/ui/AppNavbar";
import { Button } from "@/components/ui/Button";
import { JalanIDCard } from "@/components/features/JalanIDCard";
import { JalanMin } from "@/components/mascot/JalanMin";
import { CareerResult } from "@/lib/karir";

const AVAILABLE_RAPOR_ROLES = [
  "software-engineer",
  "data-analyst",
  "uiux-designer",
  "network-engineer",
  "quality-assurance",
];

export default function KarirHasilPage() {
  const router = useRouter();
  const [result, setResult] = useState<CareerResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadData = React.useCallback(() => {
    setLoading(true);
    setErrorMessage("");
    fetch("/api/me/jalanid")
      .then((res) => {
        if (res.status === 401) {
          router.push("/login?redirect=/karir/hasil");
          return null;
        }
        if (!res.ok) throw new Error("Gagal mengambil data kartu JalanID.");
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        if (data.success && data.data) {
          setResult(data.data);
        } else {
          setErrorMessage("Kamu belum memiliki kartu JalanID aktif.");
        }
      })
      .catch((err) => {
        setErrorMessage(err.message || "Gagal memuat kartu JalanID. Silakan coba lagi.");
      })
      .finally(() => setLoading(false));
  }, [router]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center p-6">
        <div className="bg-surface border-4 border-ink p-8 flex flex-col items-center gap-4 shadow-nb-md">
          <JalanMin state="happy" size={100} />
          <div className="font-mono text-sm font-bold animate-pulse">
            Menyiapkan kartu JalanID milikmu...
          </div>
        </div>
      </div>
    );
  }

  if (!result || errorMessage) {
    return (
      <div className="min-h-screen bg-paper text-ink flex flex-col justify-between">
        <AppNavbar />
        <main className="max-w-xl mx-auto w-full px-4 py-16 text-center space-y-6">
          <div className="bg-surface border-4 border-ink p-8 shadow-nb-md space-y-4">
            <JalanMin state="neutral" size={90} className="mx-auto" />
            <h2 className="font-heading text-2xl text-ink">Belum Ada Kartu JalanID</h2>
            <p className="font-sans text-sm text-ink/80">
              {errorMessage || "Kamu belum menyelesaikan tes rekomendasi karier JalanKarir."}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button
                variant="primary"
                size="md"
                onClick={loadData}
              >
                Coba Lagi ↺
              </Button>
              <Link
                href="/karir"
                className="nb-btn px-5 py-2.5 bg-accent-blue text-surface border-3 border-ink font-display font-bold text-sm shadow-nb-sm hover:bg-[#2b44ea]"
              >
                Mulai Tes JalanKarir Sekarang →
              </Link>
              <Link
                href="/dashboard"
                className="nb-btn px-5 py-2.5 bg-surface text-ink border-3 border-ink font-display font-bold text-sm shadow-nb-sm hover:bg-accent-yellow"
              >
                Kembali ke Dashboard
              </Link>
            </div>
          </div>
        </main>
        <footer className="text-center font-mono text-xs text-ink/60 pb-4">
          © 2026 JalanITku · Platform Orientasi Karier IT
        </footer>
      </div>
    );
  }

  const isRaporAvailableForTopRole = AVAILABLE_RAPOR_ROLES.includes(result.top_role.slug);

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col justify-between">
      <AppNavbar />

      <main className="max-w-4xl mx-auto w-full px-4 md:px-8 py-8 space-y-10 text-center">
        {/* Top Quick Action */}
        <div className="flex items-center justify-between text-left">
          <Link
            href="/dashboard"
            className="nb-btn px-4 py-2 bg-surface text-ink border-3 border-ink shadow-nb-sm font-display font-bold text-sm hover:bg-accent-yellow inline-flex items-center gap-2 transition-all hover:-translate-x-0.5"
          >
            <span>←</span>
            <span>Kembali ke Dashboard</span>
          </Link>
        </div>

        {/* Celebration Banner */}
        <div className="space-y-3">
          <div className="inline-block bg-accent-green text-ink border-3 border-ink px-3 py-1 font-mono text-xs font-bold uppercase shadow-nb-sm">
            Tes JalanKarir Selesai 🎉
          </div>
          <h1 className="font-heading text-3xl md:text-5xl text-ink leading-tight">
            Selamat! Ini Kartu JalanID Milikmu
          </h1>
          <p className="font-sans text-base md:text-lg text-ink/80 max-w-xl mx-auto leading-relaxed">
            Berdasarkan kecenderungan minat dan gaya kerjamu, kamu paling cocok berkarir sebagai{" "}
            <strong>{result.top_role.name}</strong> dengan tingkat kecocokan{" "}
            <strong>{result.top_role.match_percentage}%</strong>.
          </p>
        </div>

        {/* The JalanID Card Component */}
        <JalanIDCard data={result} showActions={true} />

        {/* Next Steps CTA */}
        <div className="bg-accent-yellow border-4 md:border-5 border-ink shadow-nb-lg p-6 md:p-8 max-w-xl mx-auto text-left space-y-4">
          <div className="font-mono text-xs font-bold uppercase tracking-wider bg-ink text-paper px-2 py-0.5 inline-block">
            Langkah Selanjutnya
          </div>

          {isRaporAvailableForTopRole ? (
            <>
              <h3 className="font-heading text-2xl text-ink leading-snug">
                Uji Kecocokanmu di JalanRapor!
              </h3>
              <p className="font-sans text-sm md:text-base text-ink leading-relaxed">
                Sudah tahu rolenya, sekarang saatnya membuktikan pemahaman teknismu di role{" "}
                <strong>{result.top_role.name}</strong> dan dapatkan rapor kelayakan{" "}
                <strong>Cocoklogiku</strong>.
              </p>
              <div className="pt-2">
                <Link
                  href={`/rapor?role=${result.top_role.slug}`}
                  className="nb-btn w-full inline-flex items-center justify-center px-6 py-3 bg-accent-blue text-surface font-display font-bold text-base border-4 border-ink shadow-nb-md hover:bg-[#2b44ea] transition-all"
                >
                  Uji di JalanRapor Sekarang →
                </Link>
              </div>
            </>
          ) : (
            <>
              <h3 className="font-heading text-2xl text-ink leading-snug">
                Bank Soal Teknis {result.top_role.name} Segera Hadir!
              </h3>
              <div className="bg-surface border-3 border-ink p-3 font-mono text-xs space-y-1 text-ink/80">
                <div>📌 <strong>Status Kurasi:</strong> Role {result.top_role.name} sedang dalam penyusunan bank soal teknis komprehensif.</div>
                <div>💡 Kamu dapat menjelajahi dan menguji kemampuanmu di 5 role prioritas yang telah aktif saat ini.</div>
              </div>
              <div className="pt-2">
                <Link
                  href="/rapor"
                  className="nb-btn w-full inline-flex items-center justify-center px-6 py-3 bg-surface text-ink font-display font-bold text-base border-4 border-ink shadow-nb-md hover:bg-paper transition-all"
                >
                  Jelajahi Role JalanRapor yang Aktif →
                </Link>
              </div>
            </>
          )}
        </div>
      </main>

      <footer className="text-center font-mono text-xs text-ink/60 pb-2">
        © 2026 JalanITku · Hasil tersimpan aman di akunmu
      </footer>
    </div>
  );
}
