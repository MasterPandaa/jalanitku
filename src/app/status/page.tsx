"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { HTTP_STATUS_CATALOG, HttpStatusDetail } from "@/lib/http-status";
import { HttpStatusViewer } from "@/components/features/HttpStatusViewer";
import { JalanMin } from "@/components/mascot/JalanMin";

export default function HttpStatusHubPage() {
  const [activeSeries, setActiveSeries] = useState<"all" | "3xx" | "4xx" | "5xx">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCode, setSelectedCode] = useState<number>(404);
  const [mobileTab, setMobileTab] = useState<"catalog" | "detail">("catalog");

  // Filter daftar kode status sesuai tab dan pencarian
  const filteredCatalog = useMemo(() => {
    return HTTP_STATUS_CATALOG.filter((item) => {
      const matchSeries = activeSeries === "all" || item.series === activeSeries;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        item.code.toString().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.titleId.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.responsibleRole.name.toLowerCase().includes(q);

      return matchSeries && matchQuery;
    });
  }, [activeSeries, searchQuery]);

  const selectedStatus = useMemo(() => {
    return (
      HTTP_STATUS_CATALOG.find((item) => item.code === selectedCode) ||
      HTTP_STATUS_CATALOG[0]
    );
  }, [selectedCode]);

  const seriesCounts = useMemo(() => {
    return {
      all: HTTP_STATUS_CATALOG.length,
      "3xx": HTTP_STATUS_CATALOG.filter((s) => s.series === "3xx").length,
      "4xx": HTTP_STATUS_CATALOG.filter((s) => s.series === "4xx").length,
      "5xx": HTTP_STATUS_CATALOG.filter((s) => s.series === "5xx").length,
    };
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col justify-between selection:bg-accent-yellow selection:text-ink">
      <Navbar />

      <main id="main-content" className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16 w-full space-y-10">
        {/* Header Hero Hub */}
        <div className="bg-surface border-4 md:border-5 border-ink shadow-nb-lg p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 animate-fade-up">
          <div className="space-y-3 text-left">
            <div className="inline-block bg-accent-yellow border-2 border-ink px-2.5 py-0.5 font-mono text-xs font-bold uppercase shadow-nb-sm">
              Pusat &amp; Simulator Kode HTTP
            </div>
            <h1 className="font-heading text-3xl md:text-5xl text-ink leading-tight [text-wrap:balance]">
              Manajemen Kode Status HTTP (3xx, 4xx, 5xx)
            </h1>
            <p className="font-sans text-base md:text-lg text-ink/80 max-w-2xl leading-relaxed">
              Panduan arsitektur, simulasi endpoint langsung, dan standar respon protokol HTTP untuk
              pengembangan web, integrasi API, dan pengujian kualitas sistem di JalanITku.
            </p>
          </div>

          <div className="flex-none bg-paper border-3 border-ink p-4 shadow-nb-sm flex flex-col items-center gap-2 nb-card-hover transition-all">
            <JalanMin state="encourage" size={120} className="transition-transform duration-200 hover:scale-105" />
            <span className="font-mono text-xs font-bold text-ink/70">Engine: JalanStatus</span>
          </div>
        </div>

        {/* Tab Filter Series & Pencarian */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b-3 border-ink pb-4 animate-fade-up-1">
          {/* Series Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveSeries("all")}
              className={`px-4 py-2 font-display font-bold text-sm md:text-base border-3 border-ink transition-all cursor-pointer ${
                activeSeries === "all"
                  ? "bg-accent-yellow text-ink shadow-nb-sm -translate-y-0.5"
                  : "bg-surface hover:bg-paper"
              }`}
            >
              Semua ({seriesCounts.all})
            </button>
            <button
              type="button"
              onClick={() => setActiveSeries("3xx")}
              className={`px-4 py-2 font-display font-bold text-sm md:text-base border-3 border-ink transition-all cursor-pointer ${
                activeSeries === "3xx"
                  ? "bg-accent-blue text-white shadow-nb-sm -translate-y-0.5"
                  : "bg-surface hover:bg-paper"
              }`}
            >
              3xx Pengalihan ({seriesCounts["3xx"]})
            </button>
            <button
              type="button"
              onClick={() => setActiveSeries("4xx")}
              className={`px-4 py-2 font-display font-bold text-sm md:text-base border-3 border-ink transition-all cursor-pointer ${
                activeSeries === "4xx"
                  ? "bg-accent-orange text-ink shadow-nb-sm -translate-y-0.5"
                  : "bg-surface hover:bg-paper"
              }`}
            >
              4xx Klien Error ({seriesCounts["4xx"]})
            </button>
            <button
              type="button"
              onClick={() => setActiveSeries("5xx")}
              className={`px-4 py-2 font-display font-bold text-sm md:text-base border-3 border-ink transition-all cursor-pointer ${
                activeSeries === "5xx"
                  ? "bg-accent-danger text-ink shadow-nb-sm -translate-y-0.5"
                  : "bg-surface hover:bg-paper"
              }`}
            >
              5xx Server Error ({seriesCounts["5xx"]})
            </button>
          </div>

          {/* Kolom Pencarian */}
          <div className="w-full md:w-72">
            <Input
              placeholder="Cari kode atau nama…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-sm py-2"
            />
          </div>
        </div>

        {/* Mobile View Toggle Switcher (lg:hidden) */}
        <div className="flex lg:hidden items-center border-3 border-ink bg-surface p-1 shadow-nb-sm">
          <button
            type="button"
            onClick={() => setMobileTab("catalog")}
            className={`flex-1 py-2 font-display font-bold text-xs sm:text-sm text-center border-2 transition-all cursor-pointer ${
              mobileTab === "catalog"
                ? "bg-accent-yellow text-ink border-ink shadow-nb-sm"
                : "border-transparent text-ink/70 hover:text-ink"
            }`}
          >
            📋 Daftar Kode ({filteredCatalog.length})
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("detail")}
            className={`flex-1 py-2 font-display font-bold text-xs sm:text-sm text-center border-2 transition-all cursor-pointer ${
              mobileTab === "detail"
                ? "bg-accent-yellow text-ink border-ink shadow-nb-sm"
                : "border-transparent text-ink/70 hover:text-ink"
            }`}
          >
            🔬 Simulator ({selectedCode})
          </button>
        </div>

        {/* Layout Interaktif: Grid Kartu Selector & Viewer Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-up-2">
          {/* Kolom Kiri: Grid Kartu Kode HTTP */}
          <div className={`lg:col-span-5 space-y-3 max-h-[750px] overflow-y-auto pr-1 ${
            mobileTab === "detail" ? "hidden lg:block" : "block"
          }`}>
            <span className="font-mono text-xs font-bold text-ink/70 uppercase tracking-wider block">
              Daftar Kode ({filteredCatalog.length} item):
            </span>

            {filteredCatalog.length === 0 ? (
              <div className="p-8 bg-surface border-3 border-ink text-center space-y-2">
                <p className="font-mono text-sm font-bold text-ink">Tidak ada kode yang cocok.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveSeries("all");
                  }}
                  className="font-mono text-xs text-accent-blue underline font-bold cursor-pointer"
                >
                  Reset filter pencarian
                </button>
              </div>
            ) : (
              filteredCatalog.map((item) => {
                const isSelected = item.code === selectedCode;
                const seriesColor =
                  item.series === "3xx"
                    ? "border-accent-blue"
                    : item.series === "4xx"
                    ? "border-accent-orange"
                    : "border-accent-danger";

                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => {
                      setSelectedCode(item.code);
                      setMobileTab("detail");
                    }}
                    className={`w-full text-left p-4 border-3 border-ink transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? "bg-accent-yellow shadow-nb-md translate-x-1"
                        : "bg-surface hover:bg-paper shadow-nb-sm hover:-translate-y-0.5 hover:shadow-nb-md active:translate-y-0.5"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-heading font-black text-2xl text-ink flex-none w-14">
                        {item.code}
                      </span>
                      <div className="min-w-0">
                        <div className="font-display font-bold text-sm md:text-base text-ink truncate leading-tight">
                          {item.name}
                        </div>
                        <div className="font-sans text-xs text-ink/75 truncate mt-0.5">
                          {item.titleId}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1 flex-none">
                      <Badge
                        variant={
                          item.series === "3xx"
                            ? "blue"
                            : item.series === "4xx"
                            ? "orange"
                            : "pink"
                        }
                        size="sm"
                      >
                        {item.series}
                      </Badge>
                      <span className="font-mono text-[10px] text-ink/60">
                        {item.responsibleRole.name.split(" ")[0]}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Kolom Kanan: Pratinjau Penuh Status & Live API Simulator */}
          <div className={`lg:col-span-7 ${mobileTab === "catalog" ? "hidden lg:block" : "block"}`}>
            <HttpStatusViewer status={selectedStatus} isStandalone={false} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
