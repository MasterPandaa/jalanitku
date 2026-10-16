"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/Button";
import { JalanMin } from "@/components/mascot/JalanMin";
import { CocoklogikuCard } from "@/components/features/CocoklogikuCard";
import { CocoklogikuRecord } from "@/lib/rapor";
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
        setUser(meData.user);

        // Ambil Cocoklogiku aktif
        const res = await fetch("/api/me/cocoklogiku");
        const data = await res.json();

        if (res.ok && data.cocoklogiku) {
          setRecord(data.cocoklogiku);
        } else {
          setErrorMsg("Kamu belum memiliki hasil Cocoklogiku. Mulai tes evaluasi sekarang!");
        }
      } catch (err: any) {
        setErrorMsg(err.message || "Gagal memuat hasil evaluasi");
      } finally {
        setLoading(false);
      }
    }

    fetchResult();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F4F0EA]">
        <Navbar user={user} />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-4">
            <JalanMin state="idle" size={80} />
            <div className="font-heading font-black text-xl text-[#0A0A0A]">
              Menyiapkan Kartu Cocoklogiku...
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F0EA]">
      <Navbar user={user} />

      <main className="flex-1 py-10 px-4 sm:px-6 max-w-5xl mx-auto w-full">
        {errorMsg || !record ? (
          <div className="bg-white border-4 border-[#0A0A0A] shadow-[8px_8px_0px_#0A0A0A] p-8 text-center max-w-md mx-auto space-y-6">
            <JalanMin state="neutral" size={80} />
            <h2 className="text-2xl font-black font-heading text-[#0A0A0A]">
              Belum Ada Cocoklogiku
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed font-medium">
              {errorMsg || "Kamu belum pernah menyelesaikan uji kompetensi JalanRapor."}
            </p>
            <Link href="/rapor">
              <Button variant="primary" size="lg" className="w-full">
                Mulai Uji Kompetensi ➔
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-600">
                RAPOR EVALUASI RESMI
              </span>
              <h1 className="text-3xl sm:text-4xl font-black font-heading text-[#0A0A0A]">
                Hasil Cocoklogiku Kamu
              </h1>
              <p className="text-xs sm:text-sm text-gray-600">
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
        <div className="min-h-screen flex items-center justify-center bg-[#F4F0EA]">
          <JalanMin state="idle" size={60} />
        </div>
      }
    >
      <HasilContent />
    </Suspense>
  );
}
