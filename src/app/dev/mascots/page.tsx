"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { RoleMascot } from "@/components/mascot/RoleMascot";
import { getRoles } from "@/lib/roles";

export default function MascotsDevPage() {
  const [animate, setAnimate] = useState(true);
  const [activeSize, setActiveSize] = useState<number>(180);

  const roles = getRoles();
  const batch1Roles = roles.slice(0, 3); // 1. Software Engineer, 2. Mobile Developer, 3. Game Developer
  const upcomingRoles = roles.slice(3);

  return (
    <div className="min-h-screen bg-paper text-ink p-6 md:p-12 space-y-12">
      {/* Header */}
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b-5 border-ink pb-8">
        <div>
          <div className="inline-block bg-accent-yellow border-3 border-ink px-3 py-1 font-mono font-bold text-xs uppercase mb-3 shadow-nb-sm">
            Showcase · Karakter Maskot Role IT (Batch 1)
          </div>
          <h1 className="font-heading text-4xl md:text-5xl tracking-tight text-ink">
            Galeri Maskot Role JalanITku
          </h1>
          <p className="font-sans text-base md:text-lg text-ink/80 mt-2 max-w-2xl leading-relaxed">
            Menghidupkan kepribadian dan julukan 21 Role IT ke dalam karakter Neo-brutalism
            khas JalanITku secara bertahap.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/dev/roles"
            className="nb-btn px-4 py-2 bg-surface border-3 border-ink font-display font-bold text-sm shadow-nb-sm hover:translate-x-[-2px] hover:translate-y-[-2px]"
          >
            ← Katalog Role
          </Link>
          <Logo size="md" />
        </div>
      </header>

      {/* Control Bar */}
      <div className="max-w-6xl mx-auto bg-surface border-4 border-ink shadow-nb-md p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold uppercase text-ink/70">Ukuran Pratinjau:</span>
          {[120, 180, 240].map((s) => (
            <button
              key={s}
              onClick={() => setActiveSize(s)}
              className={`px-3 py-1 border-2 border-ink font-mono text-xs font-bold ${
                activeSize === s
                  ? "bg-accent-yellow text-ink shadow-[2px_2px_0_#0A0A0A]"
                  : "bg-paper text-ink/70 hover:bg-paper/80"
              }`}
            >
              {s}px
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold uppercase text-ink/70">Animasi:</span>
          <button
            onClick={() => setAnimate(!animate)}
            className={`px-3 py-1 border-2 border-ink font-mono text-xs font-bold shadow-[2px_2px_0_#0A0A0A] ${
              animate ? "bg-accent-green text-ink" : "bg-paper text-ink/60"
            }`}
          >
            {animate ? "ON (Aktif) ✨" : "OFF (Statis)"}
          </button>
        </div>
      </div>

      {/* BATCH 1 HERO SHOWCASE (3 ROLE PERTAMA) */}
      <section className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b-3 border-ink pb-3">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-accent-pink text-paper font-heading text-sm uppercase border-2 border-ink shadow-nb-sm">
              Batch 1
            </span>
            <h2 className="font-heading text-2xl md:text-3xl text-ink">
              Core Application &amp; Game Builders
            </h2>
          </div>
          <span className="font-mono text-xs font-bold text-accent-green bg-ink px-2.5 py-1">
            Status: Rilis 100%
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {batch1Roles.map((role) => (
            <Card
              key={role.slug}
              variant="white"
              shadow="lg"
              borderWidth="5"
              className="flex flex-col items-center justify-between p-6 gap-6 relative group"
            >
              {/* Header Badges */}
              <div className="w-full flex items-center justify-between">
                <span
                  className="px-2.5 py-0.5 border-2 border-ink font-mono text-xs font-black uppercase shadow-[2px_2px_0_#0A0A0A]"
                  style={{ backgroundColor: role.warna }}
                >
                  Role #{role.urutan}
                </span>
                <span className="bg-ink text-paper font-heading text-xs font-bold px-2 py-0.5 border-2 border-ink shadow-[2px_2px_0_#FFD60A]">
                  &quot;{role.julukan}&quot;
                </span>
              </div>

              {/* Center Mascot Art */}
              <div
                className="w-full h-64 border-4 border-ink shadow-nb-sm flex items-center justify-center p-4 relative overflow-hidden rounded-2xl transition-transform group-hover:scale-[1.02]"
                style={{ backgroundColor: `${role.warna}25` }}
              >
                <RoleMascot
                  roleSlug={role.slug}
                  size={activeSize}
                  animate={animate}
                />
              </div>

              {/* Content Description */}
              <div className="w-full space-y-2 text-center">
                <h3 className="font-heading text-2xl text-ink">
                  {role.nama.id}
                </h3>
                <p className="font-sans text-xs text-ink/75 italic">
                  &quot;{role.tagline.id}&quot;
                </p>
                <p className="font-sans text-xs text-ink/80 leading-relaxed pt-2">
                  {role.deskripsi.id}
                </p>
              </div>

              {/* Download Standalone SVG */}
              <div className="w-full pt-2 border-t-2 border-ink">
                <a
                  href={`/assets/mascot/roles/${role.slug}.svg`}
                  download={`${role.slug}-mascot.svg`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-surface border-2 border-ink font-mono text-xs font-bold text-ink shadow-[2px_2px_0_#0A0A0A] hover:bg-accent-yellow transition-all"
                >
                  Unduh SVG Vektor ↓
                </a>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ROADMAP 21 ROLE TABEL PROGRESS */}
      <section className="max-w-6xl mx-auto space-y-6 pt-8 border-t-4 border-ink">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-heading text-2xl text-ink">
              Rencana 21 Role &amp; Julukan Resmi
            </h3>
            <p className="font-sans text-sm text-ink/75">
              Role berikutnya (Batch 2 s/d Batch 7) akan dirilis secara berkesinambungan.
            </p>
          </div>
          <Link
            href="/docs/MASCOT_ROLES_ROADMAP.md"
            className="font-mono text-xs font-bold underline hover:text-accent-pink"
            target="_blank"
          >
            Buka Dokumen Spesifikasi ↗
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {roles.map((r, idx) => {
            const isBatch1 = idx < 3;
            return (
              <div
                key={r.slug}
                className={`p-4 border-3 border-ink shadow-nb-sm flex flex-col justify-between gap-3 ${
                  isBatch1 ? "bg-accent-yellow/20" : "bg-surface"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-ink/60">#{r.urutan}</span>
                  <span
                    className={`font-mono text-[10px] font-bold px-2 py-0.5 border border-ink ${
                      isBatch1 ? "bg-accent-green text-ink" : "bg-paper text-ink/60"
                    }`}
                  >
                    {isBatch1 ? "BATCH 1 (AKTIF)" : "UPCOMING"}
                  </span>
                </div>
                <div>
                  <h4 className="font-heading text-base text-ink">{r.nama.id}</h4>
                  <div className="font-mono text-xs font-bold text-accent-pink mt-0.5">
                    &quot;{r.julukan || "The Specialist"}&quot;
                  </div>
                </div>
                <div className="pt-2 border-t border-ink/20 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-ink/60">{r.slug}</span>
                  <div
                    className="w-4 h-4 border border-ink rounded-full"
                    style={{ backgroundColor: r.warna }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
