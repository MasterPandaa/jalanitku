"use client";

import React, { useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CareerResult } from "@/lib/karir";

export interface JalanIDCardProps {
  data: CareerResult;
  showActions?: boolean;
}

export function JalanIDCard({ data, showActions = true }: JalanIDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  // SVG download as PNG canvas renderer
  const handleDownloadImage = (ratio: "card" | "square" | "story") => {
    setDownloading(true);
    try {
      // Create canvas representation for instant client-side download without server dependency
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      let width = 800;
      let height = 520;
      if (ratio === "square") {
        width = 800;
        height = 800;
      } else if (ratio === "story") {
        width = 720;
        height = 1280;
      }

      canvas.width = width;
      canvas.height = height;

      if (ctx) {
        // Background
        ctx.fillStyle = "#FFF8E7";
        ctx.fillRect(0, 0, width, height);

        // Border
        ctx.lineWidth = 10;
        ctx.strokeStyle = "#0A0A0A";
        ctx.strokeRect(10, 10, width - 20, height - 20);

        // Header Box
        ctx.fillStyle = data.top_role.color || "#FFD60A";
        ctx.fillRect(30, 30, width - 60, ratio === "story" ? 280 : 160);
        ctx.strokeRect(30, 30, width - 60, ratio === "story" ? 280 : 160);

        // Brand & Username
        ctx.fillStyle = "#0A0A0A";
        ctx.font = "bold 32px sans-serif";
        ctx.fillText("JalanITku · JalanID", 60, 80);

        ctx.font = "bold 20px monospace";
        ctx.fillText(`@${data.username}`, 60, 120);

        // Top Role Name
        ctx.font = "bold 44px sans-serif";
        ctx.fillText(data.top_role.name, 60, ratio === "story" ? 380 : 250);

        // Percentage
        ctx.font = "bold 28px monospace";
        ctx.fillText(`Kecocokan: ${data.top_role.match_percentage}%`, 60, ratio === "story" ? 430 : 290);

        // Secondary roles
        ctx.font = "18px sans-serif";
        ctx.fillText("Role Alternatif:", 60, ratio === "story" ? 520 : 350);
        data.secondary_roles.forEach((r, idx) => {
          ctx.fillText(`• ${r.name}: ${r.match_percentage}%`, 60, (ratio === "story" ? 560 : 380) + idx * 30);
        });

        // Footer info
        ctx.font = "14px monospace";
        ctx.fillText(`Kode Kartu: ${data.card_code} | Diterbitkan: ${data.issued_at}`, 60, height - 50);

        const dataUrl = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = `JalanID-${data.username}-${ratio}.png`;
        a.click();
      }
    } catch {
      alert("Gagal mengunduh gambar.");
    } finally {
      setDownloading(false);
    }
  };

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        // Attempt Web Share
        await navigator.share({
          title: `JalanID: ${data.top_role.name} (@${data.username})`,
          text: `Role IT paling cocok untukku adalah ${data.top_role.name} (${data.top_role.match_percentage}% cocok)! Cari jalanmu di JalanITku.`,
        });
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 3000);
      } catch (err) {
        // User cancelled or unsupported
      }
    } else {
      // Fallback: download card
      handleDownloadImage("card");
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* Neo-brutalism Digital Identity Card */}
      <div
        ref={cardRef}
        style={{ borderColor: "#0A0A0A" }}
        className="w-full max-w-xl bg-surface border-4 md:border-5 border-ink shadow-nb-lg p-6 md:p-8 flex flex-col justify-between gap-6 relative overflow-hidden"
      >
        {/* Top Header Row */}
        <div className="flex items-center justify-between border-b-3 border-ink pb-4">
          <Logo size="sm" />
          <div className="flex items-center gap-2">
            <span
              className="px-2.5 py-0.5 border-2 border-ink font-heading text-xs uppercase shadow-[2px_2px_0_#0A0A0A]"
              style={{ backgroundColor: data.top_role.color }}
            >
              JalanID
            </span>
            <span className="font-mono text-xs font-bold text-ink/70">KARTU RESMI</span>
          </div>
        </div>

        {/* User Identity & Top Role */}
        <div className="flex items-start gap-5">
          {/* Role Color Block Avatar */}
          <div
            className="w-20 h-20 md:w-24 md:h-24 border-4 border-ink shadow-nb-sm flex flex-col items-center justify-center p-2 flex-none"
            style={{ backgroundColor: data.top_role.color }}
          >
            <div className="font-heading text-2xl md:text-3xl text-ink leading-none">
              {data.top_role.match_percentage}%
            </div>
            <span className="font-mono text-[10px] font-bold text-ink mt-1">COCOK</span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="font-mono text-xs md:text-sm font-bold text-ink/75">@{data.username}</div>
            <h2 className="font-heading text-3xl md:text-4xl text-ink leading-tight truncate">
              {data.top_role.name}
            </h2>
            <p className="font-sans text-xs md:text-sm font-medium text-ink/80 mt-1 italic">
              &quot;{data.top_role.tagline}&quot;
            </p>
          </div>
        </div>

        {/* Secondary Roles Breakdown */}
        <div className="space-y-2.5 bg-paper border-3 border-ink p-4 shadow-nb-sm">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-ink/80">
            Peringkat Rekomendasi Teratas:
          </div>

          {/* Top 1 */}
          <div className="space-y-1">
            <div className="flex justify-between font-mono text-xs font-bold text-ink">
              <span>1. {data.top_role.name} (Pilihan Utama)</span>
              <span>{data.top_role.match_percentage}%</span>
            </div>
            <div className="h-4 bg-white border-2 border-ink overflow-hidden">
              <div
                className="h-full bg-accent-green border-r-2 border-ink"
                style={{ width: `${data.top_role.match_percentage}%` }}
              />
            </div>
          </div>

          {/* Top 2 & 3 */}
          {data.secondary_roles.map((sec, idx) => (
            <div key={sec.slug} className="space-y-1">
              <div className="flex justify-between font-mono text-xs font-bold text-ink">
                <span>{idx + 2}. {sec.name}</span>
                <span>{sec.match_percentage}%</span>
              </div>
              <div className="h-3.5 bg-white border-2 border-ink overflow-hidden">
                <div
                  className="h-full bg-accent-yellow border-r-2 border-ink"
                  style={{ width: `${sec.match_percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Card Footer Meta */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t-3 border-ink pt-3 font-mono text-xs text-ink/70">
          <div>Kode Kartu: <strong className="text-ink">{data.card_code}</strong></div>
          <div>Terbit: {data.issued_at}</div>
        </div>
      </div>

      {/* Action Buttons: Download PNG (3 ratios) & PDF & Share */}
      {showActions && (
        <div className="w-full max-w-xl flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="white"
              size="sm"
              disabled={downloading}
              onClick={() => handleDownloadImage("card")}
            >
              Unduh Kartu (PNG)
            </Button>
            <Button
              variant="white"
              size="sm"
              disabled={downloading}
              onClick={() => handleDownloadImage("square")}
            >
              Format 1:1 (Medsos)
            </Button>
            <Button
              variant="white"
              size="sm"
              disabled={downloading}
              onClick={() => handleDownloadImage("story")}
            >
              Format 9:16 (Story)
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="md"
              fullWidth
              onClick={handleWebShare}
              className="flex items-center justify-center gap-2"
            >
              <span>📤</span>
              <span>{shareSuccess ? "Berhasil Dibagikan!" : "Bagikan Gambar Kartu"}</span>
            </Button>
          </div>

          <p className="font-mono text-xs text-ink/60 text-center">
            💡 Kartu disimpan sebagai file gambar di perangkatmu. JalanITku tidak memiliki halaman
            profil publik demi menjaga privasimu.
          </p>
        </div>
      )}
    </div>
  );
}
