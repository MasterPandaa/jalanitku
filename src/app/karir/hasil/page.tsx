"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { JalanIDCard } from "@/components/features/JalanIDCard";
import { JalanMin } from "@/components/mascot/JalanMin";
import { CareerResult } from "@/lib/karir";

export default function KarirHasilPage() {
  const router = useRouter();
  const [result, setResult] = useState<CareerResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/me/jalanid")
      .then((res) => {
        if (!res.ok) throw new Error("Unauthenticated");
        return res.json();
      })
      .then((data) => {
        if (data.success && data.data) {
          setResult(data.data);
        } else {
          // If no result, redirect to test
          router.push("/karir");
        }
      })
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router]);

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

  if (!result) return null;

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col justify-between p-4 md:p-8">
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between border-b-4 border-ink pb-4">
        <Logo size="md" />
        <Link
          href="/dashboard"
          className="nb-btn px-4 py-2 bg-surface text-ink border-3 border-ink shadow-nb-sm font-display font-bold text-sm"
        >
          ← Dashboard
        </Link>
      </header>

      <main className="max-w-4xl mx-auto w-full my-10 space-y-10 text-center">
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
          <h3 className="font-heading text-2xl text-ink leading-snug">
            Uji Kecocokanmu di JalanRapor!
          </h3>
          <p className="font-sans text-sm md:text-base text-ink leading-relaxed">
            Sudah tahu rolenya, sekarang saatnya membuktikan pemahaman teknismu dan mendapatkan rapor{" "}
            <strong>Cocoklogiku</strong>.
          </p>
          <div className="pt-2">
            <Link href="/rapor">
              <Button variant="primary" size="md" fullWidth>
                Uji di JalanRapor Sekarang →
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="text-center font-mono text-xs text-ink/60 pb-2">
        © 2026 JalanITku · Hasil tersimpan aman di akunmu
      </footer>
    </div>
  );
}
