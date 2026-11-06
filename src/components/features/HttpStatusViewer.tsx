"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HttpStatusDetail } from "@/lib/http-status";
import { JalanMin } from "@/components/mascot/JalanMin";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BookOpen, Zap, FlaskConical, ArrowRight, ArrowLeft, ExternalLink } from "lucide-react";

export interface HttpStatusViewerProps {
  status: HttpStatusDetail;
  isStandalone?: boolean;
}

export function HttpStatusViewer({ status, isStandalone = false }: HttpStatusViewerProps) {
  const [activeTab, setActiveTab] = useState<"penjelasan" | "headers" | "simulator">("penjelasan");
  const [simulating, setSimulating] = useState(false);
  const [simResult, setSimResult] = useState<{
    status: number;
    statusText: string;
    durationMs: number;
    headers: Record<string, string>;
    body: any;
  } | null>(null);

  const seriesBadgeVariants: Record<string, "blue" | "orange" | "pink"> = {
    "3xx": "blue",
    "4xx": "orange",
    "5xx": "pink",
  };

  const seriesNames: Record<string, string> = {
    "3xx": "Redirection (Pengalihan)",
    "4xx": "Client Error (Kesalahan Klien)",
    "5xx": "Server Error (Gangguan Server)",
  };

  const handleTestLiveEndpoint = async () => {
    setSimulating(true);
    const startTime = performance.now();
    try {
      // Panggil API status generator asli
      const res = await fetch(`/api/status/${status.code}`);
      const durationMs = Math.round(performance.now() - startTime);

      const headersObj: Record<string, string> = {};
      res.headers.forEach((value, key) => {
        headersObj[key] = value;
      });

      let parsedBody: any = null;
      try {
        parsedBody = await res.json();
      } catch {
        parsedBody = await res.text();
      }

      setSimResult({
        status: res.status,
        statusText: res.statusText || status.name,
        durationMs,
        headers: headersObj,
        body: parsedBody,
      });
      setActiveTab("simulator");
    } catch (err: any) {
      setSimResult({
        status: 0,
        statusText: "Jaringan Terputus",
        durationMs: Math.round(performance.now() - startTime),
        headers: {},
        body: { error: err.message || "Gagal menghubungi endpoint simulasi." },
      });
      setActiveTab("simulator");
    } finally {
      setSimulating(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 text-left">
      {/* Kartu Utama Status Visual */}
      <Card
        variant="white"
        shadow="lg"
        borderWidth="5"
        className="p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden"
      >
        {/* Header Kode & Series */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-3 border-ink pb-4">
          <div className="flex items-center gap-3">
            <span className="font-heading font-black text-3xl md:text-5xl text-ink tracking-tight leading-none">
              {status.code}
            </span>
            <div>
              <Badge variant={seriesBadgeVariants[status.series]} size="sm">
                {status.series} • {seriesNames[status.series]}
              </Badge>
              <h2 className="font-display font-bold text-lg md:text-xl text-ink leading-tight mt-1">
                {status.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {status.isIdempotent && (
              <span className="px-2 py-0.5 border-2 border-ink bg-paper font-mono text-[11px] font-bold text-ink shadow-[2px_2px_0_#0A0A0A]">
                Idempotent
              </span>
            )}
            {status.isCacheable && (
              <span className="px-2 py-0.5 border-2 border-ink bg-accent-green font-mono text-[11px] font-bold text-ink shadow-[2px_2px_0_#0A0A0A]">
                Cacheable
              </span>
            )}
          </div>
        </div>

        {/* Maskot JalanMin & Penjelasan Bahasa Indonesia */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 py-2">
          <div className="flex-none p-3 bg-paper border-3 border-ink shadow-nb-sm flex flex-col items-center gap-2">
            <JalanMin state={status.mascotState} size={110} />
            <span className="font-mono text-[11px] font-bold text-ink/70 uppercase">
              Respon: {status.mascotState}
            </span>
          </div>

          <div className="flex-1 space-y-3 text-center md:text-left">
            <h3 className="font-heading font-black text-2xl md:text-3xl text-ink leading-tight">
              {status.titleId}
            </h3>
            <p className="font-sans text-base md:text-lg text-ink/90 leading-relaxed">
              {status.description}
            </p>
            <div className="bg-paper border-2 border-ink p-3 space-y-1 font-mono text-xs">
              <span className="font-bold text-ink block">Rekomendasi Tindakan:</span>
              <span className="text-ink/80">{status.recommendedAction}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigasi Detail Teknis */}
        <div className="pt-2">
          <div className="flex flex-wrap items-center gap-2 border-b-3 border-ink pb-2">
            <button
              type="button"
              onClick={() => setActiveTab("penjelasan")}
              className={`px-3 py-1.5 font-display font-bold text-xs md:text-sm border-2 border-ink cursor-pointer transition-all inline-flex items-center gap-1.5 ${
                activeTab === "penjelasan"
                  ? "bg-accent-yellow text-ink shadow-[2px_2px_0_#0A0A0A] -translate-y-0.5"
                  : "bg-surface hover:bg-paper"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Wawasan Arsitektur IT</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("headers")}
              className={`px-3 py-1.5 font-display font-bold text-xs md:text-sm border-2 border-ink cursor-pointer transition-all inline-flex items-center gap-1.5 ${
                activeTab === "headers"
                  ? "bg-accent-yellow text-ink shadow-[2px_2px_0_#0A0A0A] -translate-y-0.5"
                  : "bg-surface hover:bg-paper"
              }`}
            >
              <Zap className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Header &amp; Payload</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("simulator")}
              className={`px-3 py-1.5 font-display font-bold text-xs md:text-sm border-2 border-ink cursor-pointer transition-all inline-flex items-center gap-1.5 ${
                activeTab === "simulator"
                  ? "bg-accent-yellow text-ink shadow-[2px_2px_0_#0A0A0A] -translate-y-0.5"
                  : "bg-surface hover:bg-paper"
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Uji Live Endpoint {simResult && `(${simResult.status})`}</span>
            </button>
          </div>

          {/* Konten Tab 1: Penjelasan Teknis & Role Terkait */}
          {activeTab === "penjelasan" && (
            <div className="mt-4 space-y-4 animate-fadeIn">
              <div className="p-4 bg-paper border-2 border-ink shadow-nb-sm space-y-2">
                <span className="font-mono text-xs font-bold text-ink uppercase tracking-wider block">
                  Konteks Rekayasa Perangkat Lunak:
                </span>
                <p className="font-sans text-sm text-ink/85 leading-relaxed">
                  {status.technicalContext}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-surface border-2 border-ink">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-ink">Role IT Penanggung Jawab:</span>
                  <span className="bg-accent-yellow text-ink border-2 border-ink px-2 py-0.5 font-display font-bold text-xs shadow-[2px_2px_0_#0A0A0A]">
                    {status.responsibleRole.name}
                  </span>
                </div>
                <Link
                  href="/karir"
                  className="font-mono text-xs font-bold text-accent-blue hover:underline inline-flex items-center gap-1"
                >
                  <span>Uji kecocokanmu untuk role ini</span>
                  <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                </Link>
              </div>
            </div>
          )}

          {/* Konten Tab 2: Header & Format Respon Baku */}
          {activeTab === "headers" && (
            <div className="mt-4 space-y-4 animate-fadeIn">
              <div>
                <span className="font-mono text-xs font-bold text-ink uppercase block mb-1.5">
                  Header HTTP Umum:
                </span>
                <div className="bg-ink text-paper p-3 font-mono text-xs border-2 border-ink overflow-x-auto space-y-1">
                  {Object.entries(status.sampleHeaders).map(([k, v]) => (
                    <div key={k}>
                      <span className="text-accent-yellow font-bold">{k}:</span> {v}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-mono text-xs font-bold text-ink uppercase block mb-1.5">
                  Contoh Respon Body JSON:
                </span>
                <pre className="bg-ink text-paper p-3 font-mono text-xs border-2 border-ink overflow-x-auto">
                  {JSON.stringify(status.sampleResponse, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Konten Tab 3: Simulator Interaktif Live */}
          {activeTab === "simulator" && (
            <div className="mt-4 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs text-ink/80 font-bold">
                  Simulasi pemanggilan endpoint nyata <code>/api/status/{status.code}</code>:
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleTestLiveEndpoint}
                  disabled={simulating}
                  className="text-xs"
                >
                  {simulating ? "Mengirim Permintaan…" : "Kirim Permintaan HTTP"}
                </Button>
              </div>

              {simResult ? (
                <div className="p-4 bg-paper border-2 border-ink shadow-nb-sm space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between border-b-2 border-ink pb-2">
                    <span className="font-bold">
                      Status:{" "}
                      <span
                        className={`px-2 py-0.5 border ${
                          simResult.status < 400
                            ? "bg-accent-green text-ink"
                            : simResult.status < 500
                            ? "bg-accent-yellow text-ink"
                            : "bg-accent-danger text-surface"
                        }`}
                      >
                        {simResult.status} {simResult.statusText}
                      </span>
                    </span>
                    <span className="text-ink/70">Latensi: {simResult.durationMs} ms</span>
                  </div>

                  <div>
                    <span className="font-bold block mb-1">Header Respon Diterima:</span>
                    <div className="bg-white p-2 border border-ink space-y-0.5">
                      {Object.entries(simResult.headers).map(([k, v]) => (
                        <div key={k}>
                          <span className="font-bold text-ink">{k}:</span> {v}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold block mb-1">Body Respon:</span>
                    <pre className="bg-white p-2 border border-ink overflow-x-auto">
                      {JSON.stringify(simResult.body, null, 2)}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-paper border-2 border-ink text-center space-y-2">
                  <p className="font-mono text-xs text-ink/75">
                    Klik tombol di atas untuk mengirimkan permintaan HTTP asli ke server lokal dan
                    menguji bagaimana sistem merespons kode status {status.code}.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Tombol Aksi */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t-3 border-ink">
          <div className="flex items-center gap-2">
            {!isStandalone && (
              <Button href={`/status/${status.code}`} variant="white" size="sm">
                <span>Lihat Halaman Penuh</span>
                <ExternalLink className="w-4 h-4 stroke-[2.5]" />
              </Button>
            )}
            <Button
              variant="secondary"
              size="sm"
              onClick={handleTestLiveEndpoint}
              disabled={simulating}
            >
              {simulating ? "Menguji…" : "Uji Live Status"}
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button href="/" variant="ghost" size="sm" className="inline-flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Ke Beranda</span>
            </Button>
            {isStandalone && (
              <Button href="/status" variant="primary" size="sm" className="inline-flex items-center gap-1.5">
                <span>Buka Katalog 3xx/4xx/5xx</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
