import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getRoles, getCompetenciesByRoleSlug } from "@/lib/roles";

export default function RolesGalleryPage() {
  const roles = getRoles();

  return (
    <div className="min-h-screen bg-paper text-ink p-6 md:p-12 space-y-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b-5 border-ink pb-8">
        <div>
          <div className="inline-block bg-accent-yellow border-3 border-ink px-3 py-1 font-mono font-bold text-xs uppercase mb-3 shadow-nb-sm">
            Tahap 4 · Data Layer &amp; Seed Role
          </div>
          <h1 className="font-heading text-4xl md:text-5xl tracking-tight text-ink">
            Katalog 21 Role IT JalanITku
          </h1>
          <p className="font-sans text-base md:text-lg text-ink/80 mt-2 max-w-2xl leading-relaxed">
            Daftar lengkap 21 role IT beserta deskripsi tugas harian, julukan resmi, dan kompetensi teknis yang
            menjadi sumbu radar chart Cocoklogiku.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/dev/mascots"
            className="nb-btn px-4 py-2 bg-accent-yellow border-3 border-ink font-display font-bold text-sm shadow-nb-sm hover:translate-x-[-2px] hover:translate-y-[-2px]"
          >
            🎭 Galeri Maskot (Batch 1) →
          </Link>
          <Link
            href="/dev/components"
            className="nb-btn px-4 py-2 bg-surface border-3 border-ink font-display font-bold text-sm shadow-nb-sm"
          >
            ← Galeri Komponen
          </Link>
          <Logo size="md" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {roles.map((role) => {
          const comps = getCompetenciesByRoleSlug(role.slug);
          return (
            <Card
              key={role.id}
              variant="white"
              shadow="md"
              borderWidth="4"
              className="flex flex-col justify-between gap-6 p-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className="border-2 border-ink px-2.5 py-0.5 font-mono text-xs font-bold uppercase shadow-[2px_2px_0_#0A0A0A]"
                    style={{ backgroundColor: role.warna }}
                  >
                    Role #{role.urutan}
                  </span>
                  <Badge variant="ink" size="sm">
                    {role.slug}
                  </Badge>
                </div>

                <div>
                  <h2 className="font-heading text-2xl text-ink leading-tight">
                    {role.nama.id}
                  </h2>
                  {role.julukan && (
                    <div className="font-mono text-xs font-black text-accent-pink uppercase mt-0.5">
                      &quot;{role.julukan}&quot;
                    </div>
                  )}
                  <p className="font-display font-bold text-xs text-ink/70 mt-1 leading-snug">
                    &quot;{role.tagline.id}&quot;
                  </p>
                </div>

                <p className="font-sans text-sm text-ink/85 leading-relaxed">
                  {role.deskripsi.id}
                </p>
              </div>

              <div className="border-t-3 border-ink pt-4 space-y-2">
                <div className="font-display font-bold text-xs uppercase tracking-wider text-ink/75">
                  Kompetensi Radar ({comps.length} Sumbu):
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {comps.map((c) => (
                    <span
                      key={c.id}
                      className="bg-paper border border-ink px-2 py-0.5 font-mono text-[11px] text-ink font-semibold"
                    >
                      • {c.nama.id}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto border-t-4 border-ink pt-6 text-center font-mono text-xs text-ink/60">
        © 2026 JalanITku · Seluruh 19 Role IT Terverifikasi &amp; Ter-seed
      </div>
    </div>
  );
}
