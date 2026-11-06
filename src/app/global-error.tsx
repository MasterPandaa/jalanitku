"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, ArrowRight } from "lucide-react";
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
      <body className="min-h-screen bg-paper text-ink font-sans flex items-center justify-center p-6">
        <main className="max-w-md w-full bg-surface border-4 border-ink shadow-nb-lg p-8 text-center space-y-5">
          <div className="inline-block bg-accent-danger text-surface px-3 py-1 font-mono text-xs font-bold uppercase border-2 border-ink">
            FATAL ERROR • 500
          </div>
          <h1 className="font-heading font-black text-3xl text-ink">
            Gangguan Sistem Kritis
          </h1>
          <p className="text-sm text-ink/80 leading-relaxed font-sans">
            Terjadi kendala tak tertangani pada tingkat root layout aplikasi.
          </p>
          <div className="pt-2 flex flex-col gap-3">
            <Button variant="primary" size="md" onClick={() => reset()} className="inline-flex items-center justify-center gap-2">
              <span>Coba Pulihkan Sesi</span>
              <RotateCcw className="w-4 h-4 stroke-[2.5]" />
            </Button>
            <Button href="/status" variant="white" size="md" fullWidth className="inline-flex items-center justify-center gap-2">
              <span>Buka Status Kode HTTP</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Button>
          </div>
        </main>
      </body>
    </html>
  );
}
