"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { JalanMin } from "@/components/mascot/JalanMin";
import { CompetencyRadarChart } from "./CompetencyRadarChart";
import { LevelBarChart } from "./LevelBarChart";
import { CocoklogikuRecord, QuestionReviewItem } from "@/lib/rapor";

interface CocoklogikuCardProps {
  record: CocoklogikuRecord;
  sessionId?: string;
  onRetest?: () => void;
}

export const CocoklogikuCard: React.FC<CocoklogikuCardProps> = ({
  record,
  sessionId,
  onRetest,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [reviews, setReviews] = useState<QuestionReviewItem[] | null>(null);
  const [loadingReview, setLoadingReview] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [ratio, setRatio] = useState<"card" | "square" | "story">("card");

  const cardRef = useRef<HTMLDivElement>(null);

  // Status Badge Color
  const getBadgeVariant = (label: string): "green" | "blue" | "yellow" | "pink" => {
    switch (label) {
      case "Sangat Cocok":
        return "green";
      case "Cocok":
        return "blue";
      case "Cukup Cocok":
        return "yellow";
      case "Belum Cocok":
      default:
        return "pink";
    }
  };

  const getMascotState = (label: string) => {
    switch (label) {
      case "Sangat Cocok":
        return "happy";
      case "Cocok":
        return "encourage";
      case "Cukup Cocok":
        return "neutral";
      case "Belum Cocok":
      default:
        return "idle";
    }
  };

  // Muat Pembahasan Soal
  const handleToggleReview = async () => {
    if (showReview) {
      setShowReview(false);
      return;
    }

    if (!reviews && sessionId) {
      setLoadingReview(true);
      try {
        const res = await fetch(`/api/rapor/sessions/${sessionId}/review`);
        const data = await res.json();
        if (data.reviews) {
          setReviews(data.reviews);
        }
      } catch (err) {
        console.error("Gagal mengambil review:", err);
      } finally {
        setLoadingReview(false);
      }
    }
    setShowReview(true);
  };

  // Render Canvas ke PNG
  const renderCanvas = async (exportRatio: "card" | "square" | "story"): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(null);

      let width = 1200;
      let height = 630;
      if (exportRatio === "square") {
        width = 1080;
        height = 1080;
      } else if (exportRatio === "story") {
        width = 1080;
        height = 1920;
      }

      canvas.width = width;
      canvas.height = height;

      // 1. Background Cream Neo-brutalism
      ctx.fillStyle = "#F4F0EA";
      ctx.fillRect(0, 0, width, height);

      // 2. Outer Border & Shadow
      ctx.lineWidth = 10;
      ctx.strokeStyle = "#0A0A0A";
      ctx.strokeRect(20, 20, width - 40, height - 40);

      // 3. Header Banner
      ctx.fillStyle = "#FFE600";
      ctx.fillRect(40, 40, width - 80, 110);
      ctx.lineWidth = 6;
      ctx.strokeStyle = "#0A0A0A";
      ctx.strokeRect(40, 40, width - 80, 110);

      // Title Text
      ctx.fillStyle = "#0A0A0A";
      ctx.font = "900 42px sans-serif";
      ctx.fillText("JALANITKU • COCOKLOGIKU", 70, 110);

      ctx.font = "bold 24px monospace";
      ctx.fillText(`@${record.username}`, width - 340, 105);

      // 4. Role Box
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(40, 180, width - 80, 180);
      ctx.strokeRect(40, 180, width - 80, 180);

      ctx.fillStyle = "#0A0A0A";
      ctx.font = "bold 22px sans-serif";
      ctx.fillText("HASIL EVALUASI KOMPETENSI TEKNIS:", 70, 230);

      ctx.font = "900 52px sans-serif";
      ctx.fillText(record.roleName.toUpperCase(), 70, 295);

      // Skor Box (Kanan)
      const scoreBoxX = width - 360;
      ctx.fillStyle = record.finalScore >= 80 ? "#00F0FF" : record.finalScore >= 60 ? "#FFE600" : "#FF8800";
      ctx.fillRect(scoreBoxX, 200, 290, 140);
      ctx.strokeRect(scoreBoxX, 200, 290, 140);

      ctx.fillStyle = "#0A0A0A";
      ctx.font = "bold 20px monospace";
      ctx.fillText("SKOR KECOCOKAN", scoreBoxX + 45, 235);

      ctx.font = "900 54px monospace";
      ctx.fillText(`${record.finalScore}/100`, scoreBoxX + 45, 295);

      ctx.font = "bold 22px sans-serif";
      ctx.fillText(`[ ${record.matchLabel.toUpperCase()} ]`, scoreBoxX + 45, 325);

      // 5. Reasoning Summary Box
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(40, 390, width - 80, exportRatio === "card" ? 170 : 340);
      ctx.strokeRect(40, 390, width - 80, exportRatio === "card" ? 170 : 340);

      ctx.fillStyle = "#0A0A0A";
      ctx.font = "900 24px sans-serif";
      ctx.fillText("ANALISIS HASIL & KEKUATAN UTAMA:", 70, 435);

      ctx.font = "normal 22px sans-serif";
      // Text wrap sederhana
      const words = record.reason.summary.split(" ");
      let line = "";
      let currentY = 480;
      for (const w of words) {
        const testLine = line + w + " ";
        if (ctx.measureText(testLine).width > width - 160) {
          ctx.fillText(line, 70, currentY);
          line = w + " ";
          currentY += 34;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 70, currentY);

      if (exportRatio !== "card") {
        currentY += 45;
        ctx.font = "bold 20px sans-serif";
        ctx.fillText("KEKUATAN TERBESAR:", 70, currentY);
        currentY += 30;
        ctx.font = "normal 18px sans-serif";
        ctx.fillText(record.reason.strengths.substring(0, 95) + "...", 70, currentY);
      }

      // Footer
      ctx.fillStyle = "#0A0A0A";
      ctx.font = "bold 18px monospace";
      ctx.fillText("Diterbitkan resmi oleh JalanITku • Uji Kompetensi Berjenjang 5 Level", 50, height - 35);

      canvas.toBlob((blob) => resolve(blob), "image/png");
    });
  };

  // Unduh File Gambar
  const handleDownload = async () => {
    setDownloading(true);
    try {
      const blob = await renderCanvas(ratio);
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Cocoklogiku_${record.username}_${record.roleSlug}_${ratio}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Gagal mengunduh gambar:", err);
    } finally {
      setDownloading(false);
    }
  };

  // Web Share API (File Sharing Tanpa Link Publik)
  const handleShare = async () => {
    setSharing(true);
    try {
      const blob = await renderCanvas(ratio);
      if (!blob) return;

      const file = new File(
        [blob],
        `Cocoklogiku_${record.username}_${record.roleSlug}.png`,
        { type: "image/png" }
      );

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `Hasil Cocoklogiku ${record.roleName} - JalanITku`,
          text: `Cek kecocokan kompetensi teknisku untuk role ${record.roleName} di JalanITku! Nilai akhir: ${record.finalScore}/100 (${record.matchLabel}).`,
        });
        setShareSuccess(true);
      } else {
        // Fallback: langsung trigger download file
        handleDownload();
      }
    } catch (err: any) {
      if (err.name !== "AbortError") {
        console.error("Gagal berbagi:", err);
      }
    } finally {
      setSharing(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Kartu Utama Cocoklogiku */}
      <div
        ref={cardRef}
        className="bg-white border-4 border-[#0A0A0A] shadow-[8px_8px_0px_#0A0A0A] p-6 sm:p-8 relative overflow-hidden"
      >
        {/* Header Kartu */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-6 border-b-4 border-[#0A0A0A] gap-4">
          <div className="flex items-center gap-4">
            <JalanMin state={getMascotState(record.matchLabel)} size={64} />
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#FFE600] px-2.5 py-0.5 border-2 border-[#0A0A0A] font-black text-xs uppercase tracking-wider">
                  COCOKLOGIKU
                </span>
                <span className="text-xs font-mono font-bold text-gray-600">
                  {new Date(record.completedAt).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-[#0A0A0A] tracking-tight mt-1">
                {record.roleName}
              </h2>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs font-mono font-bold text-gray-500 block">
              PENGUJI / AKUN
            </span>
            <span className="text-lg font-black font-mono text-[#0A0A0A]">
              @{record.username}
            </span>
          </div>
        </div>

        {/* Skor & Status Match */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#F4F0EA] border-3 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] p-6 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-mono font-bold text-gray-700 uppercase tracking-widest mb-1">
              SKOR KECOCOKAN
            </span>
            <div className="text-5xl sm:text-6xl font-black font-mono text-[#0A0A0A]">
              {record.finalScore}
              <span className="text-2xl text-gray-500 font-bold">/100</span>
            </div>
            <div className="mt-3">
              <Badge variant={getBadgeVariant(record.matchLabel)} className="text-sm px-3 py-1">
                {record.matchLabel}
              </Badge>
            </div>
          </div>

          <div className="md:col-span-2 bg-[#F4F0EA] border-3 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] p-6 flex flex-col justify-center">
            <h3 className="font-heading font-black text-base text-[#0A0A0A] mb-2 flex items-center gap-2">
              <span className="w-3 h-3 bg-[#00F0FF] border border-[#0A0A0A]" />
              Ringkasan Evaluasi
            </h3>
            <p className="text-sm font-medium text-gray-800 leading-relaxed">
              {record.reason.summary}
            </p>
            <div className="mt-3 text-xs font-mono font-bold text-[#FF4B4B]">
              💡 {record.reason.levelInsight}
            </div>
          </div>
        </div>

        {/* Visualisasi: Radar Chart & Level Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 pb-8 border-b-4 border-[#0A0A0A]">
          {/* Radar Chart */}
          <div className="bg-[#FFFFFF] border-3 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] p-5 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-2">
              <h4 className="font-heading font-black text-sm text-[#0A0A0A]">
                PETA RADAR KOMPETENSI
              </h4>
              <span className="text-[10px] font-mono font-bold text-gray-500">
                Akurasi Jawaban
              </span>
            </div>
            <CompetencyRadarChart scores={record.competencyScores} size={320} />
          </div>

          {/* Level Bar Chart */}
          <div className="bg-[#FFFFFF] border-3 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] p-5 flex flex-col justify-center">
            <div className="w-full flex items-center justify-between mb-4">
              <h4 className="font-heading font-black text-sm text-[#0A0A0A]">
                PENCAPAIAN PER LEVEL (1 - 5)
              </h4>
              <span className="text-[10px] font-mono font-bold text-gray-500">
                Bobot Terakumulasi
              </span>
            </div>
            <LevelBarChart levels={record.levelScores} />
          </div>
        </div>

        {/* Reason: Kekuatan & Area Pertumbuhan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="border-3 border-[#0A0A0A] bg-[#00F0FF]/15 p-5 shadow-[4px_4px_0px_#0A0A0A]">
            <h4 className="font-heading font-black text-sm text-[#0A0A0A] mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-green-500 border border-black" />
              Kekuatan Utamamu
            </h4>
            <p className="text-xs sm:text-sm text-gray-800 leading-relaxed">
              {record.reason.strengths}
            </p>
          </div>

          <div className="border-3 border-[#0A0A0A] bg-[#FF8800]/15 p-5 shadow-[4px_4px_0px_#0A0A0A]">
            <h4 className="font-heading font-black text-sm text-[#0A0A0A] mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-orange-500 border border-black" />
              Ruang Akselerasi Belajar
            </h4>
            <p className="text-xs sm:text-sm text-gray-800 leading-relaxed">
              {record.reason.weaknesses}
            </p>
          </div>
        </div>

        {/* Rekomendasi Belajar Prioritas */}
        <div className="bg-[#FFE600]/20 border-3 border-[#0A0A0A] p-6 shadow-[4px_4px_0px_#0A0A0A] mb-8">
          <h4 className="font-heading font-black text-base text-[#0A0A0A] mb-3 flex items-center gap-2">
            <span>🎯</span> Rekomendasi Aksi Belajar Prioritas
          </h4>
          <div className="space-y-3">
            {record.recommendations.map((rec, i) => (
              <div
                key={`rec-${i}`}
                className="bg-white border-2 border-[#0A0A0A] p-3 shadow-[2px_2px_0px_#0A0A0A]"
              >
                <div className="font-bold text-xs font-mono text-[#FF4B4B] uppercase">
                  {rec.topic}
                </div>
                <div className="text-xs text-gray-800 mt-0.5">{rec.action}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Alternatif Role Karir jika ada */}
        {record.alternativeRoles && record.alternativeRoles.length > 0 && (
          <div className="bg-[#F4F0EA] border-3 border-[#0A0A0A] p-6 shadow-[4px_4px_0px_#0A0A0A]">
            <h4 className="font-heading font-black text-sm text-[#0A0A0A] mb-2">
              🧭 Alternatif Jalur Karir yang Berpotensi Relevan:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              {record.alternativeRoles.map((alt, i) => (
                <div
                  key={`alt-${i}`}
                  className="bg-white border-2 border-[#0A0A0A] p-3 shadow-[2px_2px_0px_#0A0A0A]"
                >
                  <div className="font-heading font-bold text-sm text-[#0A0A0A]">
                    {alt.roleName}
                  </div>
                  <div className="text-xs text-gray-600 mt-1 leading-snug">
                    {alt.reason}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bagian Aksi & Unduh Neo-brutalism */}
      <Card className="p-6 bg-[#F4F0EA]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-heading font-black text-lg text-[#0A0A0A]">
              Simpan & Bagikan Hasil Cocoklogiku
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              Bagikan langsung berupa file gambar PNG (privasi terjaga, tanpa link profil publik).
            </p>
          </div>

          {/* Rasio Selector */}
          <div className="flex items-center gap-1.5 border-2 border-[#0A0A0A] bg-white p-1">
            <button
              onClick={() => setRatio("card")}
              className={`px-2.5 py-1 text-xs font-mono font-bold transition-colors ${
                ratio === "card"
                  ? "bg-[#0A0A0A] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Card (16:9)
            </button>
            <button
              onClick={() => setRatio("square")}
              className={`px-2.5 py-1 text-xs font-mono font-bold transition-colors ${
                ratio === "square"
                  ? "bg-[#0A0A0A] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Square (1:1)
            </button>
            <button
              onClick={() => setRatio("story")}
              className={`px-2.5 py-1 text-xs font-mono font-bold transition-colors ${
                ratio === "story"
                  ? "bg-[#0A0A0A] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Story (9:16)
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t-2 border-[#0A0A0A]">
          <Button
            variant="primary"
            onClick={handleDownload}
            disabled={downloading}
            className="flex-1 min-w-[160px]"
          >
            {downloading ? "Membuat Gambar..." : "📥 Unduh File PNG"}
          </Button>

          <Button
            variant="secondary"
            onClick={handleShare}
            disabled={sharing}
            className="flex-1 min-w-[160px]"
          >
            {sharing ? "Menyiapkan File..." : "📤 Bagikan File (Web Share)"}
          </Button>

          {sessionId && (
            <Button
              variant="white"
              onClick={handleToggleReview}
              disabled={loadingReview}
              className="flex-1 min-w-[180px]"
            >
              {showReview
                ? "Tutup Pembahasan"
                : loadingReview
                ? "Memuat Pembahasan..."
                : "📝 Tinjau Pembahasan Soal"}
            </Button>
          )}

          {onRetest && (
            <Button
              variant="ghost"
              onClick={onRetest}
              className="text-[#FF4B4B] hover:bg-red-50"
            >
              🔄 Tes Ulang / Ganti Role
            </Button>
          )}
        </div>

        {shareSuccess && (
          <div className="mt-3 text-xs font-mono font-bold text-green-700">
            ✓ Berhasil dibagikan melalui Web Share API!
          </div>
        )}
      </Card>

      {/* Accordion Pembahasan Soal */}
      {showReview && reviews && (
        <Card className="p-6 bg-white border-4 border-[#0A0A0A] shadow-[8px_8px_0px_#0A0A0A] space-y-6 animate-fade-in">
          <div className="flex items-center justify-between pb-4 border-b-3 border-[#0A0A0A]">
            <div>
              <h3 className="font-heading font-black text-xl text-[#0A0A0A]">
                Pembahasan Soal Tes JalanRapor
              </h3>
              <p className="text-xs text-gray-600 mt-0.5">
                Evaluasi jawabanmu untuk mempertajam wawasan teknis.
              </p>
            </div>
            <Badge variant="ink" className="font-mono">
              {reviews.length} Soal
            </Badge>
          </div>

          <div className="space-y-4">
            {reviews.map((item, idx) => (
              <div
                key={`rev-${item.id}`}
                className={`border-3 border-[#0A0A0A] p-4 shadow-[3px_3px_0px_#0A0A0A] ${
                  item.isCorrect ? "bg-green-50/60" : "bg-red-50/60"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 bg-[#0A0A0A] text-white">
                    Soal #{idx + 1} • Level {item.level} ({item.levelName})
                  </span>
                  <Badge variant={item.isCorrect ? "green" : "pink"}>
                    {item.isCorrect ? "Jawaban Benar" : "Kurang Tepat"}
                  </Badge>
                </div>

                <div className="font-bold text-sm text-[#0A0A0A] mb-3">
                  {item.questionText}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                  {item.options.map((opt) => {
                    const isSelected = item.userChosenKey === opt.key;
                    const isTheCorrectOne = item.correctKey === opt.key;

                    let optBg = "bg-white";
                    let optBorder = "border-[#0A0A0A]";
                    if (isTheCorrectOne) {
                      optBg = "bg-[#00F0FF]/30 font-bold";
                    } else if (isSelected && !item.isCorrect) {
                      optBg = "bg-[#FF4B4B]/20 line-through text-red-700";
                    }

                    return (
                      <div
                        key={opt.key}
                        className={`p-2 border-2 ${optBorder} ${optBg} flex items-center gap-2`}
                      >
                        <span className="font-mono font-bold uppercase w-5 h-5 flex items-center justify-center bg-gray-200 border border-[#0A0A0A] text-[10px]">
                          {opt.key}
                        </span>
                        <span className="flex-1">{opt.text}</span>
                        {isTheCorrectOne && <span className="text-green-700 font-bold">✓ Kunci</span>}
                        {isSelected && !isTheCorrectOne && <span className="text-red-600 font-bold">✗ Pilihanmu</span>}
                      </div>
                    );
                  })}
                </div>

                <div className="bg-white border-2 border-[#0A0A0A] p-3 text-xs text-gray-800">
                  <span className="font-mono font-bold text-[#0A0A0A] block mb-1">
                    📖 Penjelasan Teknis:
                  </span>
                  {item.explanation}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
