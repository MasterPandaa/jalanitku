"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SoftwareEngineerMascot } from "@/components/mascot/roles/SoftwareEngineerMascot";
import { MobileDeveloperMascot } from "@/components/mascot/roles/MobileDeveloperMascot";
import { GameDeveloperMascot } from "@/components/mascot/roles/GameDeveloperMascot";
import { QualityAssuranceMascot } from "@/components/mascot/roles/QualityAssuranceMascot";
import { ITSupportMascot } from "@/components/mascot/roles/ITSupportMascot";
import { NetworkEngineerMascot } from "@/components/mascot/roles/NetworkEngineerMascot";
import { CloudEngineerMascot } from "@/components/mascot/roles/CloudEngineerMascot";
import { DevOpsEngineerMascot } from "@/components/mascot/roles/DevOpsEngineerMascot";
import { SecurityAnalystMascot } from "@/components/mascot/roles/SecurityAnalystMascot";
import { RoleMascot } from "@/components/mascot/RoleMascot";
import { getRoles } from "@/lib/roles";

const BATCH_1_ROLES = [
  {
    slug: "software-engineer",
    name: "Software Engineer",
    julukan: "The Architect",
    batch: 1,
    color: "#FFD60A",
    accentColor: "#00F0FF",
    desc: "Sang perancang fondasi sistem digital dan pembangun arsitektur scalable dunia nyata.",
    mascotComponent: SoftwareEngineerMascot,
    svgPath: "/assets/mascot/roles/software-engineer.svg",
    anatomy: [
      { name: "Blueprint Cetak Biru", desc: "Cetak biru digital cyan (#00F0FF) memuat skema microservices & node database" },
      { name: "Kacamata Arsitek", desc: "Frame persegi teknikal tebal 3.5px dengan lensa reflektif cyan bergaris kilau" },
      { name: "Penggaris T & Stylus", desc: "Penggaris siku T di tangan kanan sebagai perlambang presisi rekayasa kode" },
      { name: "Kubus Modular 3D", desc: "Fondasi 3D isometrik melayang melambangkan arsitektur sistem modular berlapis" },
    ],
  },
  {
    slug: "mobile-developer",
    name: "Mobile Developer",
    julukan: "The Screen Tapper",
    batch: 1,
    color: "#FF5C8A",
    accentColor: "#00F0FF",
    desc: "Sang penguasa layar sentuh yang menghadirkan kecanggihan aplikasi ke dalam genggaman saku pengguna.",
    mascotComponent: MobileDeveloperMascot,
    svgPath: "/assets/mascot/roles/mobile-developer.svg",
    anatomy: [
      { name: "Smartphone Raksasa", desc: "Gawai berbingkai putih dengan antarmuka dinamis, card banner pink, dan grid ikon aplikasi" },
      { name: "Topi Snapback Miring", desc: "Topi kasual urban warna pink magenta dengan visor datar cyan elektrik" },
      { name: "Gestur Tapping Presisi", desc: "Jari telunjuk siap mengetuk dan mengoperasikan aplikasi di layar" },
      { name: "Ripple Sentuh Konsentris", desc: "Cincin gelombang ripple cyan dan mint memancar dari titik sentuhan layar" },
    ],
  },
  {
    slug: "game-developer",
    name: "Game Developer",
    julukan: "The Pixel Mage",
    batch: 1,
    color: "#2EE59D",
    accentColor: "#FF5C8A",
    desc: "Sang penyihir pixel arcade yang meracik logika dan fisika gameplay menjadi keajaiban dunia virtual.",
    mascotComponent: GameDeveloperMascot,
    svgPath: "/assets/mascot/roles/game-developer.svg",
    anatomy: [
      { name: "Topi Pixel Mage", desc: "Topi kerucut bertingkat pixelated mint (#2EE59D) dengan pita pink & gesper pixel emas" },
      { name: "Tongkat Retro Gamepad", desc: "Tongkat sihir berkepala konsol arcade retro lengkap dengan D-Pad dan tombol aksi A/B" },
      { name: "Magic Orb Bercahaya", desc: "Bola kristal cyan elektrik dengan denyut aura sihir yang memancarkan partikel gameplay" },
      { name: "Mata RPG & Pixel Stars", desc: "Mata berbinar bintang 4-point khas game RPG dengan kubus pixel 8-bit bertebaran" },
    ],
  },
];

const BATCH_2_ROLES = [
  {
    slug: "quality-assurance",
    name: "Quality Assurance",
    julukan: "The Bug Hunter",
    batch: 2,
    color: "#FF8A3D",
    accentColor: "#2EE59D",
    desc: "Sang pemburu cacat kode teliti yang menyisir setiap celah untuk memastikan standar kualitas dan rilis bebas kegagalan.",
    mascotComponent: QualityAssuranceMascot,
    svgPath: "/assets/mascot/roles/quality-assurance.svg",
    anatomy: [
      { name: "Topi Safari & Senter PASS", desc: "Topi petualang safari oranye dengan senter kepala berstatus hijau checklist PASS" },
      { name: "Toples Kaca Digenggam Erat", desc: "Toples kaca bening berulir digenggam tangan kanan dengan robot kepik merah siber terkurung di dalamnya" },
      { name: "Lalat Bug Berterbangan", desc: "Lalat-lalat siber kecil berterbangan kesana kemari di sekeliling maskot" },
      { name: "Jaring Hunter & Badge TEST✓", desc: "Jaring kawat digital pemburu bug dan pin badge checklist verifikasi sistem" },
    ],
  },
  {
    slug: "it-support",
    name: "IT Support",
    julukan: "The Fixer",
    batch: 2,
    color: "#00F0FF",
    accentColor: "#2EE59D",
    desc: "Sang dokter sistem dan penyelamat operasional harian yang selalu sigap mendiagnosis dan memulihkan kendala perangkat.",
    mascotComponent: ITSupportMascot,
    svgPath: "/assets/mascot/roles/it-support.svg",
    anatomy: [
      { name: "Jas Dokter & Nametag", desc: "Jas lab dokter putih bersih dengan saku dada dan nametag ID medis (tanpa nama teks)" },
      { name: "Cermin Kepala Tebal (Head Mirror)", desc: "Cermin bulat dokter reflektif dengan tali kepala tebal kokoh pemantau titik kendala" },
      { name: "Suntikan USB Tanpa Kabel", desc: "Suntikan USB siber tanpa kabel berdosis serum pemulihan sistem mint neon" },
      { name: "Kotak P3K & Plus Medis", desc: "Toolbox First Aid Kit putih palang hijau dan partikel simbol '+' kesehatan kedap-kedip" },
    ],
  },
  {
    slug: "network-engineer",
    name: "Network Engineer",
    julukan: "The Connector",
    batch: 2,
    color: "#FFD60A",
    accentColor: "#00F0FF",
    desc: "Sang penenun infrastruktur kabel dan penyambung serat data yang merekatkan kembali jalur konektivitas yang terputus.",
    mascotComponent: NetworkEngineerMascot,
    svgPath: "/assets/mascot/roles/network-engineer.svg",
    anatomy: [
      { name: "Antena Router Kembar", desc: "Sepasang antena router di kepala sebagai pemancar sinyal perangkat jaringan" },
      { name: "Penyambungan Kabel Terputus", desc: "Kedua tangan memegang dua ujung kabel terputus dengan serat tembaga mencuat yang didekatkan" },
      { name: "Shockwave Impuls Splicing", desc: "Gelombang kejut (shockwave) berdenyut konsentris memancar saat tangan ingin menyatukan kabel" },
      { name: "Visor Serat Optik HUD 10G", desc: "Kacamata visor cyan pemantau bandwidth traffic 10G dan status data stream" },
    ],
  },
];

const BATCH_3_ROLES = [
  {
    slug: "cloud-engineer",
    name: "Cloud Engineer",
    julukan: "The Ascender",
    batch: 3,
    color: "#38BDF8",
    accentColor: "#FFD60A",
    desc: "Sang penakluk angkasa digital yang mendirikan dan mengelola arsitektur klaster server terapung di atas awan.",
    mascotComponent: CloudEngineerMascot,
    svgPath: "/assets/mascot/roles/cloud-engineer.svg",
    anatomy: [
      { name: "Karpet Awan Komputasi", desc: "Awan putih neo-brutalism terapung tempat maskot melayang dengan efek float stabil" },
      { name: "Kacamata Aviator Angkasa", desc: "Frame kacamata penerbang pilot emas berefleksi cakrawala data" },
      { name: "Kunci Arsitektur Server", desc: "Kunci emas berkepala awan simbol hak akses superuser infrastruktur" },
      { name: "Kubus Pod Kubernetes", desc: "Mini kontener kontainerisasi terapung di tangan kiri dengan lampu pod running" },
    ],
  },
  {
    slug: "devops-engineer",
    name: "DevOps Engineer",
    julukan: "The Cyclist",
    batch: 3,
    color: "#F43F5E",
    accentColor: "#2EE59D",
    desc: "Sang pembalap rilis berkecepatan tinggi yang menyatukan alur continuous integration & continuous delivery tanpa henti.",
    mascotComponent: DevOpsEngineerMascot,
    svgPath: "/assets/mascot/roles/devops-engineer.svg",
    anatomy: [
      { name: "Pita Infinity Loop CI/CD", desc: "Simbol pita mobius ∞ berputar dinamis memuat simpul build, test, dan deploy" },
      { name: "Helm Balap Sepeda Aero", desc: "Helm aerodinamis merah karmin bergaris ventilasi neon green kecepatan tinggi" },
      { name: "Roda Gir Otomasi Rilis", desc: "Roda gir bergerigi emas perak lambang otomasi pipeline tanpa intervensi manual" },
      { name: "Kunci Pas Hotfix Kilat", desc: "Kunci mekanik di tangan kiri siap melakukan perbaikan zero-downtime" },
    ],
  },
  {
    slug: "security-analyst",
    name: "Security Analyst",
    julukan: "The Warden",
    batch: 3,
    color: "#7C3AED",
    accentColor: "#10B981",
    desc: "Sang benteng pertahanan terakhir yang menjaga aset dan integritas data dari serangan exploit, peretasan, dan malware.",
    mascotComponent: SecurityAnalystMascot,
    svgPath: "/assets/mascot/roles/security-analyst.svg",
    anatomy: [
      { name: "Perisai Firewall Aegis", desc: "Perisai heksagonal baja berlapis pelat ungu dengan gembok enkripsi AES berpijar" },
      { name: "Visor Terminal Ancaman", desc: "HUD pemindai hijau terminal dengan radar status deteksi intrusi 0 THREAT" },
      { name: "Pedang Kunci Enkripsi", desc: "Bilah pedang hijau bercahaya berulir kunci digital pemotong malware" },
      { name: "Helm Cyber Warden Bertanduk", desc: "Pelindung kepala taktis baja beraksen tanduk hijau terminal tahan benturan" },
    ],
  },
];

const ROADMAP_BATCHES = [
  { batch: 1, title: "Batch 1: Core Engineering & Creators", roles: "Software Engineer, Mobile Developer, Game Developer", status: "Active Release 🚀" },
  { batch: 2, title: "Batch 2: Reliability, Support & Connectivity", roles: "Quality Assurance, IT Support, Network Engineer", status: "Active Release 🚀" },
  { batch: 3, title: "Batch 3: Cloud, Platform, CI/CD & Security", roles: "Cloud Engineer, DevOps Engineer, Security Analyst", status: "Active Release 🚀" },
  { batch: 4, title: "Batch 4: Data & Machine Intelligence", roles: "Data Analyst, Data Scientist, AI/ML Engineer", status: "Planned 📋" },
  { batch: 5, title: "Batch 5: Data Foundation & Ops", roles: "Data Engineer, Database Administrator, System Administrator", status: "Planned 📋" },
  { batch: 6, title: "Batch 6: Product, Design & Delivery", roles: "UI/UX Designer, Project Manager, Business Analyst", status: "Planned 📋" },
  { batch: 7, title: "Batch 7: Enterprise, Strategy & Forensics", roles: "IT Consultant, Digital Forensics, Enterprise Architect", status: "Planned 📋" },
];

export default function MascotsDevPage() {
  const [mascotSize, setMascotSize] = useState<number>(200);
  const [isAnimated, setIsAnimated] = useState<boolean>(true);
  const [selectedRoleSlug, setSelectedRoleSlug] = useState<string>("software-engineer");
  const allRoles = getRoles();

  const releasedRoles = [...BATCH_1_ROLES, ...BATCH_2_ROLES, ...BATCH_3_ROLES];

  const renderRoleCards = (roles: typeof BATCH_1_ROLES) => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {roles.map((role) => {
        const Mascot = role.mascotComponent;
        return (
          <div
            key={role.slug}
            className="bg-surface border-4 border-ink shadow-nb-lg flex flex-col justify-between overflow-hidden transition-transform hover:-translate-y-1"
          >
            {/* Card Header */}
            <div
              className="p-4 border-b-4 border-ink flex items-center justify-between"
              style={{ backgroundColor: role.color }}
            >
              <div>
                <div className="font-heading text-lg text-ink leading-tight">
                  {role.name}
                </div>
                <div className="font-mono text-xs font-bold text-ink/80">
                  &quot;{role.julukan}&quot;
                </div>
              </div>
              <span className="px-2 py-0.5 bg-surface border-2 border-ink font-heading text-[10px] uppercase shadow-[2px_2px_0_#0A0A0A]">
                Batch {role.batch}
              </span>
            </div>

            {/* Maskot Stage Visual */}
            <div className="p-6 bg-paper/50 border-b-3 border-ink flex items-center justify-center min-h-[260px] relative overflow-hidden group">
              {/* Background Grid Pattern */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(#0A0A0A 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />

              {/* Maskot Render */}
              <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                <Mascot size={mascotSize} animated={isAnimated} />
              </div>

              {/* Hover Hint */}
              <div className="absolute bottom-2 right-2 font-mono text-[10px] text-ink/40 pointer-events-none">
                Hover to zoom
              </div>
            </div>

            {/* Description & Anatomy Specs */}
            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <p className="font-sans text-xs md:text-sm text-ink/80 leading-relaxed mb-4">
                  {role.desc}
                </p>

                <div className="space-y-2 border-t-2 border-ink pt-3">
                  <div className="font-mono text-[11px] font-bold uppercase text-ink/70">
                    Anatomi Visual Karakter:
                  </div>
                  {role.anatomy.map((item, idx) => (
                    <div key={idx} className="text-xs">
                      <strong className="text-ink font-heading">{item.name}</strong>:{" "}
                      <span className="text-ink/80 font-sans">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t-2 border-ink flex items-center justify-between gap-2">
                <a
                  href={role.svgPath}
                  download={`${role.slug}.svg`}
                  className="px-3 py-1.5 bg-surface border-2 border-ink font-heading text-xs uppercase shadow-[2px_2px_0_#0A0A0A] hover:bg-accent-yellow transition-all"
                >
                  Unduh SVG
                </a>
                <a
                  href={role.svgPath}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs font-bold text-accent-pink hover:underline"
                >
                  Buka Standalone ↗
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-paper py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b-4 border-ink pb-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-3 py-1 bg-surface border-3 border-ink font-heading text-xs uppercase shadow-nb-sm hover:translate-x-0.5 hover:translate-y-0.5"
            >
              ← Beranda
            </Link>
            <span className="font-mono text-sm font-bold text-ink/70">/dev/mascots</span>
          </div>
          <span className="px-3 py-1 bg-accent-green border-3 border-ink font-heading text-xs uppercase shadow-nb-sm">
            9 OF 21 ROLES COMPLETED 🚀
          </span>
        </div>

        {/* Header Hero */}
        <div className="bg-surface border-4 border-ink p-6 md:p-8 shadow-nb-lg relative overflow-hidden">
          <div className="max-w-3xl space-y-3">
            <div className="inline-block px-3 py-1 bg-accent-yellow border-2 border-ink font-heading text-xs uppercase shadow-[2px_2px_0_#0A0A0A]">
              Sistem Desain Karakter Neo-Brutalism
            </div>
            <h1 className="font-heading text-4xl md:text-5xl text-ink leading-tight">
              Galeri Maskot Role IT JalanITku
            </h1>
            <p className="font-sans text-sm md:text-base text-ink/80 leading-relaxed">
              Koleksi maskot karakter presisi geometris berbasis SVG untuk 21 role IT.
              Mengadopsi DNA rambu pintar JalanMin dengan atribut profesi autentik,
              garis batas tebal 3.5px #0A0A0A, hard drop shadow, dan mikro-interaksi responsif.
            </p>
          </div>

          {/* Interactive Controls Bar */}
          <div className="mt-6 pt-6 border-t-3 border-ink flex flex-wrap items-center justify-between gap-4 bg-paper/60 p-4 border-2">
            <div className="flex items-center gap-3">
              <span className="font-heading text-xs uppercase text-ink">Ukuran Maskot:</span>
              {[120, 160, 200, 240].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setMascotSize(sz)}
                  className={`px-3 py-1 border-2 border-ink font-mono text-xs font-bold transition-all ${
                    mascotSize === sz
                      ? "bg-ink text-white shadow-[2px_2px_0_#FFD60A]"
                      : "bg-surface text-ink shadow-[2px_2px_0_#0A0A0A] hover:bg-accent-yellow"
                  }`}
                >
                  {sz}px
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="font-heading text-xs uppercase text-ink">Animasi CSS:</span>
              <button
                onClick={() => setIsAnimated(!isAnimated)}
                className={`px-4 py-1 border-2 border-ink font-heading text-xs uppercase transition-all shadow-[2px_2px_0_#0A0A0A] ${
                  isAnimated ? "bg-accent-green text-ink" : "bg-surface text-ink/60"
                }`}
              >
                {isAnimated ? "● Aktif (Running)" : "○ Nonaktif (Paused)"}
              </button>
            </div>
          </div>
        </div>

        {/* SECTION BATCH 1 */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b-3 border-ink pb-2">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-ink">
                Batch 1: Core Engineering & Creators
              </h2>
              <p className="font-mono text-xs text-ink/70">
                The Architect (Software Engineer) · The Screen Tapper (Mobile Dev) · The Pixel Mage (Game Dev)
              </p>
            </div>
            <span className="hidden md:inline-block font-mono text-xs font-bold text-accent-pink bg-surface border-2 border-ink px-3 py-1 shadow-nb-sm">
              Batch 1 · 3 Roles Released
            </span>
          </div>
          {renderRoleCards(BATCH_1_ROLES)}
        </section>

        {/* SECTION BATCH 2 */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b-3 border-ink pb-2">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-ink">
                Batch 2: Reliability, Support & Connectivity
              </h2>
              <p className="font-mono text-xs text-ink/70">
                The Bug Hunter (Quality Assurance) · The Fixer (IT Support) · The Connector (Network Engineer)
              </p>
            </div>
            <span className="hidden md:inline-block font-mono text-xs font-bold text-accent-green bg-surface border-2 border-ink px-3 py-1 shadow-nb-sm">
              Batch 2 · 3 Roles Released
            </span>
          </div>
          {renderRoleCards(BATCH_2_ROLES)}
        </section>

        {/* SECTION BATCH 3 */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b-3 border-ink pb-2">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-ink">
                Batch 3: Cloud, Platform, CI/CD & Security
              </h2>
              <p className="font-mono text-xs text-ink/70">
                The Ascender (Cloud Engineer) · The Cyclist (DevOps Engineer) · The Warden (Security Analyst)
              </p>
            </div>
            <span className="hidden md:inline-block font-mono text-xs font-bold text-accent-cyan bg-surface border-2 border-ink px-3 py-1 shadow-nb-sm">
              Batch 3 · 3 Roles Released
            </span>
          </div>
          {renderRoleCards(BATCH_3_ROLES)}
        </section>

        {/* Universal RoleMascot Dispatcher Tester */}
        <div className="bg-surface border-4 border-ink p-6 md:p-8 shadow-nb-lg space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-3 border-ink pb-4">
            <div>
              <div className="inline-block px-2 py-0.5 bg-accent-cyan border-2 border-ink font-heading text-xs uppercase shadow-[2px_2px_0_#0A0A0A] mb-1">
                Uji Coba Komponen Universal
              </div>
              <h2 className="font-heading text-2xl md:text-3xl text-ink">
                Tester &lt;RoleMascot /&gt; Universal
              </h2>
            </div>

            {/* Role Selector Dropdown */}
            <div className="flex items-center gap-3">
              <label htmlFor="role-select" className="font-heading text-xs uppercase text-ink">
                Pilih Role IT:
              </label>
              <select
                id="role-select"
                value={selectedRoleSlug}
                onChange={(e) => setSelectedRoleSlug(e.target.value)}
                className="px-3 py-1.5 bg-white border-3 border-ink font-heading text-xs uppercase shadow-nb-sm focus:outline-none focus:bg-accent-yellow"
              >
                {allRoles.map((r) => (
                  <option key={r.slug} value={r.slug}>
                    {r.nama.id} — &quot;{r.julukan}&quot;
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Test Render Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Mascot Preview Box */}
            <div className="bg-paper border-3 border-ink p-6 shadow-nb-sm flex flex-col items-center justify-center min-h-[300px] relative">
              <RoleMascot
                roleSlug={selectedRoleSlug}
                size={mascotSize}
                showTitle={true}
                showBadge={true}
                animated={isAnimated}
              />
            </div>

            {/* Code Snippet & Integration Details */}
            <div className="space-y-4">
              <div className="font-mono text-xs font-bold uppercase text-ink/70">
                Snippet Pemanggilan React:
              </div>
              <pre className="bg-ink text-white p-4 border-3 border-ink shadow-nb-sm font-mono text-xs overflow-x-auto leading-relaxed">
{`// Contoh pemanggilan komponen RoleMascot
import { RoleMascot } from "@/components/mascot/RoleMascot";

<RoleMascot
  roleSlug="${selectedRoleSlug}"
  size={${mascotSize}}
  showTitle={true}
  showBadge={true}
  animated={${isAnimated}}
/>`}
              </pre>

              <div className="bg-surface border-2 border-ink p-3 text-xs space-y-1 font-mono">
                <div className="font-bold text-ink">
                  Status Handler:{" "}
                  {releasedRoles.some((r) => r.slug === selectedRoleSlug) ? (
                    <span className="text-accent-green font-black">
                      KOMPONEN ASLI PRODUKSI (AKTIF 🚀)
                    </span>
                  ) : (
                    <span className="text-accent-pink font-black">
                      ADAPTIVE FALLBACK ROADMAP (BATCH BERIKUTNYA)
                    </span>
                  )}
                </div>
                <div className="text-ink/75">
                  Universal wrapper otomatis mengarahkan ke SVG kustom bila sudah ada di batch rilis (9 role aktif saat ini),
                  dan menampilkan placeholder adaptif neo-brutalist bila sedang dalam antrean batch.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 21 Roles Mascot Roadmap Status Board */}
        <div className="bg-surface border-4 border-ink p-6 md:p-8 shadow-nb-lg space-y-6">
          <div className="border-b-3 border-ink pb-4">
            <h2 className="font-heading text-2xl md:text-3xl text-ink">
              Roadmap Produksi Maskot 21 Role IT JalanITku
            </h2>
            <p className="font-mono text-xs text-ink/70">
              Dokumentasi lengkap perencanaan 7 batch maskot sesuai dokumen docs/MASCOT_ROLES_ROADMAP.md
            </p>
          </div>

          <div className="space-y-3">
            {ROADMAP_BATCHES.map((b) => {
              const isCompleted = b.batch <= 3;
              return (
                <div
                  key={b.batch}
                  className={`p-4 border-3 border-ink flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-nb-sm transition-all ${
                    isCompleted ? "bg-accent-yellow/20 border-ink" : "bg-paper/70"
                  }`}
                >
                  <div>
                    <div className="font-heading text-sm md:text-base text-ink">
                      {b.title}
                    </div>
                    <div className="font-mono text-xs text-ink/75 mt-0.5">
                      {b.roles}
                    </div>
                  </div>
                  <div className="flex-none">
                    <span
                      className={`inline-block px-3 py-1 border-2 border-ink font-heading text-xs uppercase shadow-[2px_2px_0_#0A0A0A] ${
                        isCompleted ? "bg-accent-green text-ink" : "bg-surface text-ink/70"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex justify-between items-center text-xs font-mono text-ink/70">
            <span>Standar Desain: SVG Ortogonal 200x200 · Stroke 3.5-5px #0A0A0A · Neo-Brutalism</span>
            <Link href="/dev/roles" className="text-accent-pink font-bold hover:underline">
              Lihat Katalog 21 Role IT ↗
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
