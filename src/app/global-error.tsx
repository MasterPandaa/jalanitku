"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("JalanITku Global Fatal Error:", error);
  }, [error]);

  return (
    <html lang="id">
      <body className="min-h-screen bg-[#FFF8E7] text-[#0A0A0A] font-sans flex items-center justify-center p-6">
        <main className="max-w-md w-full bg-white border-4 border-[#0A0A0A] shadow-[8px_8px_0_#0A0A0A] p-8 text-center space-y-5">
          <div className="inline-block bg-[#FF3B3B] text-white px-3 py-1 font-mono text-xs font-bold uppercase border-2 border-[#0A0A0A]">
            FATAL ERROR • 500
          </div>
          <h1 className="font-heading font-black text-3xl text-[#0A0A0A]">
            Gangguan Sistem Kritis
          </h1>
          <p className="text-sm text-[#0A0A0A]/80 leading-relaxed font-sans">
            Terjadi kendala tak tertangani pada tingkat root layout aplikasi.
          </p>
          <div className="pt-2 flex flex-col gap-3">
            <Button variant="primary" size="md" onClick={() => reset()}>
              Coba Pulihkan Sesi ↺
            </Button>
            <Button href="/status" variant="white" size="md" fullWidth>
              Buka Status Kode HTTP →
            </Button>
          </div>
        </main>
      </body>
    </html>
  );
}
