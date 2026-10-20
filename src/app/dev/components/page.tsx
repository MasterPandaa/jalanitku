"use client";

import React, { useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { ChoiceCard } from "@/components/ui/ChoiceCard";
import { LikertScale } from "@/components/ui/LikertScale";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { Dialog } from "@/components/ui/Dialog";
import { Toast } from "@/components/ui/Toast";
import { Tabs } from "@/components/ui/Tabs";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { JalanMin, MascotState } from "@/components/mascot/JalanMin";

export default function ComponentsGalleryPage() {
  const [selectedChoice, setSelectedChoice] = useState("b");
  const [likertVal, setLikertVal] = useState(4);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("semua");
  const [mascotState, setMascotState] = useState<MascotState>("idle");

  return (
    <div className="min-h-screen bg-paper text-ink p-6 md:p-12 space-y-16">
      {/* Header */}
      <div className="max-w-6xl mx-auto border-b-5 border-ink pb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-block bg-accent-yellow border-3 border-ink px-3 py-1 font-mono font-bold text-xs uppercase mb-3 shadow-nb-sm">
            Tahap 1 · Design System & UI Components
          </div>
          <h1 className="font-heading text-4xl md:text-5xl tracking-tight text-ink">
            Galeri Komponen Neo-Brutalism
          </h1>
          <p className="font-sans text-lg text-ink/80 mt-2 max-w-xl">
            Koleksi komponen UI baku JalanITku yang mematuhi token visual, hard shadow, dan border tegas.
          </p>
        </div>
        <Logo size="lg" />
      </div>

      <div className="max-w-6xl mx-auto space-y-16">
        {/* 1. Logo */}
        <section className="space-y-4">
          <h2 className="font-display font-bold text-2xl border-b-3 border-ink pb-2">1. Logo (Semua Ukuran)</h2>
          <div className="bg-surface border-4 border-ink shadow-nb-md p-6 flex flex-wrap items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <span className="font-mono text-xs font-bold text-ink/60">size=&quot;sm&quot;</span>
              <Logo size="sm" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="font-mono text-xs font-bold text-ink/60">size=&quot;md&quot;</span>
              <Logo size="md" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="font-mono text-xs font-bold text-ink/60">size=&quot;lg&quot;</span>
              <Logo size="lg" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="font-mono text-xs font-bold text-ink/60">size=&quot;xl&quot;</span>
              <Logo size="xl" />
            </div>
          </div>
        </section>

        {/* 2. Button */}
        <section className="space-y-4">
          <h2 className="font-display font-bold text-2xl border-b-3 border-ink pb-2">2. Tombol (Varian & State)</h2>
          <div className="bg-surface border-4 border-ink shadow-nb-md p-6 space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary">Primary (Blue)</Button>
              <Button variant="secondary">Secondary (Yellow)</Button>
              <Button variant="danger">Danger (Red)</Button>
              <Button variant="white">White</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="primary" disabled>
                Disabled
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t-2 border-ink/20">
              <span className="font-mono text-xs font-bold w-full text-ink/60">Ukuran:</span>
              <Button variant="primary" size="sm">
                Small (sm)
              </Button>
              <Button variant="primary" size="md">
                Medium (md)
              </Button>
              <Button variant="primary" size="lg">
                Large (lg)
              </Button>
            </div>
          </div>
        </section>

        {/* 3. Card */}
        <section className="space-y-4">
          <h2 className="font-display font-bold text-2xl border-b-3 border-ink pb-2">3. Kartu (Card Containers)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="white" shadow="md">
              <Badge variant="yellow" className="mb-2">White Card</Badge>
              <h3 className="font-display font-bold text-xl mb-1">Standard Surface</h3>
              <p className="font-sans text-sm text-ink/80">Latar putih kontras tinggi dengan border 4px dan shadow offset 6px.</p>
            </Card>
            <Card variant="yellow" shadow="md">
              <Badge variant="ink" className="mb-2">Yellow Card</Badge>
              <h3 className="font-display font-bold text-xl mb-1">Aksen Fitur</h3>
              <p className="font-sans text-sm text-ink/80">Dipakai untuk menyorot JalanKarir dan informasi penting.</p>
            </Card>
            <Card variant="pink" shadow="md">
              <Badge variant="white" className="mb-2">Pink Card</Badge>
              <h3 className="font-display font-bold text-xl text-surface mb-1">Aksen Sekunder</h3>
              <p className="font-sans text-sm text-surface/90">Warna cerah untuk badge, kategori, dan highlight visual.</p>
            </Card>
          </div>
        </section>

        {/* 4. Form Inputs */}
        <section className="space-y-4">
          <h2 className="font-display font-bold text-2xl border-b-3 border-ink pb-2">4. Input & Select</h2>
          <div className="bg-surface border-4 border-ink shadow-nb-md p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Username Pengguna"
              placeholder="Contoh: calon_dev"
              helperText="3-20 karakter, huruf, angka, underscore, atau titik."
              required
            />
            <Input
              label="Username dengan Error"
              value="user@invalid!"
              error="Karakter '@' dan '!' tidak diizinkan."
              readOnly
            />
            <Select
              label="Pilih Role Peminatan"
              options={[
                { value: "se", label: "Software Engineer" },
                { value: "da", label: "Data Analyst" },
                { value: "uiux", label: "UI/UX Designer" },
                { value: "qa", label: "Quality Assurance" },
              ]}
            />
            <Input label="Field Disabled" value="Akun Terkunci" disabled />
          </div>
        </section>

        {/* 5. ChoiceCard & LikertScale */}
        <section className="space-y-4">
          <h2 className="font-display font-bold text-2xl border-b-3 border-ink pb-2">
            5. Komponen Pertanyaan (JalanKarir & JalanRapor)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Choice Cards (a-e) */}
            <div className="bg-surface border-4 border-ink shadow-nb-md p-6 space-y-4">
              <h3 className="font-display font-bold text-lg">Pilihan Ganda / Skenario (a–e)</h3>
              <ChoiceCard
                id="a"
                labelKey="A"
                text="Menganalisis performa query dan kecepatan indeks database."
                selected={selectedChoice === "a"}
                onSelect={setSelectedChoice}
              />
              <ChoiceCard
                id="b"
                labelKey="B"
                text="Membuat desain antarmuka interaktif yang memanjakan mata pengguna."
                selected={selectedChoice === "b"}
                onSelect={setSelectedChoice}
              />
              <ChoiceCard
                id="c"
                labelKey="C"
                text="Mengaudit celah keamanan dan mencegah serangan siber."
                selected={selectedChoice === "c"}
                onSelect={setSelectedChoice}
              />
            </div>

            {/* Likert Scale (1-5) */}
            <div className="bg-surface border-4 border-ink shadow-nb-md p-6 space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-lg mb-2">Skala Likert (1–5)</h3>
                <p className="font-sans text-sm text-ink/75 mb-4">
                  Pertanyaan: &quot;Saya lebih senang bekerja mandiri memecahkan kode rumit dibanding meeting panjang.&quot;
                </p>
                <LikertScale value={likertVal} onChange={setLikertVal} />
              </div>
              <ProgressBar current={3} total={5} label="Level 3: Skenario Praktis" />
            </div>
          </div>
        </section>

        {/* 6. Badges & Progress Bar */}
        <section className="space-y-4">
          <h2 className="font-display font-bold text-2xl border-b-3 border-ink pb-2">6. Badge & Status</h2>
          <div className="bg-surface border-4 border-ink shadow-nb-md p-6 flex flex-wrap items-center gap-3">
            <Badge variant="yellow">Aksen Kuning</Badge>
            <Badge variant="pink">Aksen Pink</Badge>
            <Badge variant="blue">Aksen Biru</Badge>
            <Badge variant="green">Sangat Cocok (Hijau)</Badge>
            <Badge variant="orange">Segera Hadir (Oranye)</Badge>
            <Badge variant="ink">Mode Gelap (Ink)</Badge>
            <Badge variant="white">White</Badge>
          </div>
        </section>

        {/* 7. Dialog & Toast */}
        <section className="space-y-4">
          <h2 className="font-display font-bold text-2xl border-b-3 border-ink pb-2">7. Dialog & Feedback</h2>
          <div className="bg-surface border-4 border-ink shadow-nb-md p-6 space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="danger" onClick={() => setIsDialogOpen(true)}>
                Buka Dialog Peringatan (Tes Ulang)
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 pt-4 border-t-2 border-ink/20">
              <Toast type="success" message="Jawaban sesi berhasil disimpan secara otomatis." />
              <Toast type="error" message="Sesi terputus! Mohon periksa koneksi internetmu." />
              <Toast type="info" message="Satu pengguna hanya memiliki 1 JalanID aktif." />
            </div>
          </div>
        </section>

        {/* 8. Tabs, Skeleton & EmptyState */}
        <section className="space-y-4">
          <h2 className="font-display font-bold text-2xl border-b-3 border-ink pb-2">8. Tabs, Skeleton & Empty State</h2>
          <div className="space-y-6">
            <Tabs
              items={[
                { id: "semua", label: "Semua Role (19)" },
                { id: "engineering", label: "Engineering" },
                { id: "data", label: "Data & AI" },
                { id: "design", label: "Design" },
              ]}
              activeId={activeTab}
              onChange={setActiveTab}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface border-4 border-ink shadow-nb-md p-6 space-y-3">
                <span className="font-mono text-xs font-bold text-ink/60">Skeleton Loading:</span>
                <Skeleton height="h-8" width="w-3/4" />
                <Skeleton height="h-4" width="w-full" />
                <Skeleton height="h-4" width="w-5/6" />
                <Skeleton height="h-12" width="w-1/2" />
              </div>
              <EmptyState
                title="Belum Ada Hasil Rapor"
                description="Kamu belum pernah mengikuti tes JalanRapor. Pilih role incaranmu untuk mulai menguji kecocokan."
                actionLabel="Mulai Tes JalanRapor"
                onAction={() => alert("Menuju JalanRapor")}
              />
            </div>
          </div>
        </section>

        {/* 9. JalanMin Mascot */}
        <section className="space-y-4">
          <h2 className="font-display font-bold text-2xl border-b-3 border-ink pb-2">
            9. Maskot Baru: Detektif JalanMin (5 State & Mouse Tracking)
          </h2>
          <div className="bg-surface border-4 border-ink shadow-nb-md p-6 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              {(["idle", "hover", "happy", "neutral", "encourage"] as MascotState[]).map((st) => (
                <button
                  key={st}
                  onClick={() => setMascotState(st)}
                  className={`nb-btn px-4 py-1.5 font-mono text-sm uppercase font-bold border-2 border-ink ${
                    mascotState === st ? "bg-accent-yellow shadow-nb-sm" : "bg-paper hover:bg-white"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-around gap-8 p-6 bg-paper border-3 border-ink">
              <div className="flex flex-col items-center gap-2">
                <JalanMin state={mascotState} size={220} />
                <Badge variant="ink">State Aktif: {mascotState}</Badge>
              </div>

              <div className="max-w-md font-sans text-sm space-y-2">
                <div className="font-display font-bold text-lg text-ink">Spesifikasi Maskot JalanMin:</div>
                <ul className="list-disc list-inside space-y-1 text-ink/80 font-mono text-xs">
                  <li>SVG geometris neo-brutalism dengan border hitam 5px</li>
                  <li>Animasi CSS teroptimasi (bobbing, blink, waving, jump)</li>
                  <li>Topi tanda panah pink khas JalanITku</li>
                  <li>Mendukung <code>prefers-reduced-motion</code> otomatis</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Confirmation Dialog */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={() => alert("Konfirmasi diterima!")}
        title="Ulangi Tes JalanKarir?"
        description="Hasil JalanID milikmu sebelumnya akan digantikan secara permanen oleh hasil tes baru ini. Setiap pengguna hanya memiliki 1 JalanID aktif."
        confirmLabel="Ya, Ganti Hasil"
        cancelLabel="Batal"
        variant="danger"
      />
    </div>
  );
}
