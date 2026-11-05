import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/Button";
import { getHttpStatusByCode } from "@/lib/http-status";
import { HttpStatusViewer } from "@/components/features/HttpStatusViewer";
import { JalanMin } from "@/components/mascot/JalanMin";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  const status = getHttpStatusByCode(code);

  if (!status) {
    return {
      title: `Status HTTP ${code} — JalanITku`,
      description: `Halaman informasi kode status HTTP ${code} di JalanITku.`,
    };
  }

  return {
    title: `${status.code} ${status.name} (${status.titleId}) — JalanITku`,
    description: status.description,
  };
}

export default async function DynamicHttpStatusPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const status = getHttpStatusByCode(code);

  if (!status) {
    return (
      <div className="min-h-screen bg-paper text-ink flex flex-col justify-between selection:bg-accent-yellow selection:text-ink">
        <Navbar />

        <main id="main-content" className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
          <div className="p-8 bg-surface border-4 border-ink shadow-nb-lg flex flex-col items-center gap-4">
            <JalanMin state="neutral" size={100} />
            <h1 className="font-heading font-black text-3xl md:text-4xl text-ink">
              Kode HTTP {code} Tidak Dikenali
            </h1>
            <p className="font-sans text-sm md:text-base text-ink/80 leading-relaxed max-w-md">
              Kode status HTTP yang kamu tuju belum terdaftar di katalog standar 3xx, 4xx, atau 5xx JalanITku.
            </p>
            <div className="pt-2 flex flex-wrap gap-3 justify-center">
              <Button href="/status" variant="primary" size="md">
                Buka Katalog Kode HTTP →
              </Button>
              <Button href="/" variant="white" size="md">
                Kembali ke Beranda
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col justify-between selection:bg-accent-yellow selection:text-ink">
      <Navbar />

      <main id="main-content" className="max-w-4xl mx-auto px-4 md:px-8 py-10 md:py-16 w-full space-y-6">
        <div className="flex items-center justify-between pb-2">
          <Link href="/status" className="font-mono text-xs font-bold text-accent-blue hover:underline">
            ← Kembali ke Pusat Kode HTTP
          </Link>
          <span className="font-mono text-xs font-bold text-ink/60 uppercase">
            Standar Protokol IETF RFC
          </span>
        </div>

        <HttpStatusViewer status={status} isStandalone={true} />
      </main>

      <Footer />
    </div>
  );
}
