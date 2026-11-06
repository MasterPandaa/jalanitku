"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppNavbar } from "@/components/ui/AppNavbar";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/Button";
import { JalanMin } from "@/components/mascot/JalanMin";
import { CocoklogikuCard } from "@/components/features/CocoklogikuCard";
import { CocoklogikuRecord } from "@/lib/rapor";
import { Target, ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import Link from "next/link";

function HasilContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id") || undefined;

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ id: string; username: string } | null>(null);
  const [record, setRecord] = useState<CocoklogikuRecord | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function fetchResult() {
      try {
        setLoading(true);
        // Cek autentikasi
        const meRes = await fetch("/api/me");
        if (!meRes.ok) {
          router.push("/login?redirect=/rapor/hasil");
          return;
        }
        const meData = await meRes.json();
        setUser(meData.data);

        // Ambil Cocoklogiku aktif
        const res = await fetch("/api/me/cocoklogiku");
        const data = await res.json();

        if (res.ok && data.cocoklogiku) {
          setRecord(data.cocoklogiku);
        } else if (res.status === 404 || !data.cocoklogiku) {
          setRecord(null);
        } else {
          setErrorMsg(data.error?.message || "Gagal memuat hasil evaluasi.");
        }
      } catch (err: any) {
        setErrorMsg(err.message || "Gagal memuat hasil evaluasi.");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-paper">
        <AppNavbar user={user} />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="bg-surface border-4 border-ink shadow-nb-md p-8 text-center space-y-4">
            <JalanMin state="idle" size={80} />
            <div className="font-heading font-black text-xl text-ink">
              Menyiapkan Kartu Cocoklogiku…
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
        {/* Top Quick Actions / Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <Link
            href="/dashboard"
            className="nb-btn px-4 py-2 bg-surface text-ink border-3 border-ink shadow-nb-sm font-display font-bold text-sm hover:bg-accent-yellow inline-flex items-center gap-2 transition-all hover:-translate-x-0.5"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            <span>Kembali ke Dashboard</span>
          </Link>
          <Link
            href="/rapor"
            className="nb-btn px-4 py-2 bg-paper text-ink border-3 border-ink shadow-nb-sm font-display font-bold text-sm hover:bg-accent-yellow inline-flex items-center gap-2 transition-all hover:translate-x-0.5"
          >
            <Target className="w-4 h-4 stroke-[2.5] text-accent-blue" />
            <span>Uji Role Lain di JalanRapor</span>
          </Link>
        </div>

        {errorMsg ? (
          /* ERROR STATE */
          <div className="bg-surface border-4 border-accent-danger shadow-nb-lg p-8 text-center max-w-md mx-auto space-y-6 animate-fade-in">
            <JalanMin state="neutral" size={80} />
            <h2 className="text-2xl font-black font-heading text-ink">
              Gagal Memuat Hasil Evaluasi
            </h2>
            <p className="text-sm text-ink/80 leading-relaxed font-medium">
              {errorMsg}
            </p>
            <div className="flex flex-col gap-3">
              <Button
                variant="primary"
                size="lg"
                className="w-full inline-flex items-center justify-center gap-2"
                onClick={() => {
                  setErrorMsg("");
                  setLoading(true);
                  fetch("/api/me/cocoklogiku")
                    .then((r) => r.json())
                    .then((d) => {
                      if (d.cocoklogiku) setRecord(d.cocoklogiku);
                      else setErrorMsg("Belum ada data.");
                    })
                    .catch((e) => setErrorMsg(e.message))
                    .finally(() => setLoading(false));
                }}
              >
                <span>Coba Muat Ulang</span>
                <RotateCcw className="w-4 h-4 stroke-[2.5]" />
              </Button>
              <Button href="/rapor" variant="white" size="md" className="w-full">
                Kembali ke Menu JalanRapor
              </Button>
            </div>
          </div>
        ) : !record ? (
          /* EMPTY STATE */
          <div className="bg-surface border-4 border-ink shadow-nb-lg p-8 text-center max-w-md mx-auto space-y-6 animate-fade-in">
            <JalanMin state="neutral" size={80} />
            <h2 className="text-2xl font-black font-heading text-ink">
              Belum Ada Cocoklogiku
            </h2>
            <p className="text-sm text-ink/80 leading-relaxed font-medium">
              Kamu belum memiliki hasil uji kompetensi teknis JalanRapor. Uji kemampuanmu dan raih kartu Cocoklogiku resmi!
            </p>
            <Button href="/rapor" variant="primary" size="lg" className="w-full inline-flex items-center justify-center gap-2">
              <span>Mulai Uji Kompetensi</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </Button>
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-ink/70">
                RAPOR EVALUASI RESMI
              </span>
              <h1 className="text-3xl sm:text-4xl font-black font-heading text-ink">
                Hasil Cocoklogiku Kamu
              </h1>
              <p className="text-xs sm:text-sm text-ink/75">
                Data kompetensi teknis terverifikasi untuk <strong>{record.roleName}</strong>.
              </p>
            </div>

            {/* Kartu Komponen Cocoklogiku */}
            <CocoklogikuCard
              record={record}
              sessionId={sessionId}
              onRetest={() => router.push("/rapor")}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function JalanRaporHasilPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-paper">
          <JalanMin state="idle" size={60} />
        </div>
      }
    >
      <HasilContent />
    </Suspense>
  );
}
