"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { JalanMin } from "@/components/mascot/JalanMin";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error secara aman
    const errorDetails =
      error instanceof Error
        ? { message: error.message, stack: error.stack }
        : typeof error === "object" && error !== null
        ? JSON.stringify(error, Object.getOwnPropertyNames(error))
        : String(error);
    console.error("JalanITku App Error Boundary Caught:", errorDetails);
  }, [error]);

  const displayMessage =
    error?.message ||
    (typeof error === "object" && error !== null
      ? (error as any).type
        ? `Event error: ${(error as any).type}`
        : JSON.stringify(error)
      : String(error));

  return (
    <main
      id="main-content"
      className="min-h-screen flex items-center justify-center p-6 bg-paper selection:bg-accent-yellow selection:text-ink"
    >
      <div className="max-w-lg w-full bg-surface border-4 md:border-5 border-ink shadow-nb-lg p-6 md:p-8 space-y-6 text-center">
        {/* Header Badge */}
        <div className="flex items-center justify-center gap-3">
          <span className="font-heading font-black text-4xl md:text-5xl text-ink leading-none">
            500
          </span>
          <div className="text-left">
            <Badge variant="pink" size="sm">
              5xx • SERVER ERROR
            </Badge>
            <div className="font-mono text-xs font-bold text-ink/70 uppercase mt-0.5">
              Internal Error
            </div>
          </div>
        </div>

        {/* Maskot JalanMin */}
        <div className="p-4 bg-paper border-3 border-ink shadow-nb-sm inline-block mx-auto">
          <JalanMin state="neutral" size={110} />
        </div>

        <div className="space-y-2">
          <h1 className="font-heading font-black text-2xl md:text-3xl text-ink">
            Terjadi Gangguan Internal Sistem
          </h1>
          <p className="text-sm font-sans text-ink/80 leading-relaxed max-w-md mx-auto">
            Sistem mendeteksi kendala runtime yang tak terduga saat memproses tampilan ini.
          </p>
        </div>

        <div className="text-left p-3 bg-accent-danger/10 border-2 border-accent-danger font-mono text-xs text-accent-danger break-words max-h-32 overflow-y-auto">
          <span className="font-bold block mb-0.5">Detail Kendala:</span>
          {displayMessage === "[object Event]"
            ? "Event browser tidak terduga terdeteksi. Silakan muat ulang halaman."
            : displayMessage}
        </div>

        <div className="pt-2 flex flex-wrap gap-3 justify-center">
          <Button variant="primary" size="md" onClick={() => reset()} className="inline-flex items-center justify-center gap-1.5">
            <span>Coba Lagi</span>
            <RotateCcw className="w-4 h-4 stroke-[2.5]" />
          </Button>
          <Button variant="white" size="md" onClick={() => window.location.reload()}>
            Muat Ulang Halaman
          </Button>
          <Button href="/status/500" variant="ghost" size="md" className="inline-flex items-center justify-center gap-1.5">
            <span>Wawasan Error 500</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </Button>
        </div>
      </div>
    </main>
  );
}
