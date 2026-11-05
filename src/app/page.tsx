"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { JalanMin } from "@/components/mascot/JalanMin";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getDictionary } from "@/lib/i18n";
import { smoothScrollTo } from "@/lib/smooth-scroll";

export default function LandingPage() {
  const dict = getDictionary();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [user, setUser] = useState<{ username: string; avatar_url?: string } | null>(null);

  // Cek apakah user sudah login untuk menyesuaikan CTA dan Navbar
  useEffect(() => {
    let isMounted = true;
    fetch("/api/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data?.success && data?.data) {
          setUser({
            username: data.data.username,
            avatar_url: data.data.avatar_url,
          });
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  // Smooth scroll otomatis jika landing page dibuka dengan target hash (misal navigasi dari rute lain)
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hashId = window.location.hash.replace("#", "");
      const timer = setTimeout(() => {
        smoothScrollTo(hashId, 85, 750);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, []);

  const roles = [
    { name: "Software Engineer", bg: "bg-[#FFD60A]" },
    { name: "Mobile Developer", bg: "bg-[#FF5C8A]" },
    { name: "Game Developer", bg: "bg-[#2EE59D]" },
    { name: "Quality Assurance", bg: "bg-[#FF8A3D]" },
    { name: "IT Support", bg: "bg-[#FFFFFF]" },
    { name: "Network Engineer", bg: "bg-[#FFD60A]" },
    { name: "Cloud Engineer", bg: "bg-[#FF5C8A]" },
    { name: "DevOps Engineer", bg: "bg-[#2EE59D]" },
    { name: "Data Analyst", bg: "bg-[#FF8A3D]" },
    { name: "Data Scientist", bg: "bg-[#FFFFFF]" },
    { name: "Data Engineer", bg: "bg-[#FFD60A]" },
    { name: "AI/ML Engineer", bg: "bg-[#FF5C8A]" },
    { name: "Security Analyst", bg: "bg-[#2EE59D]" },
    { name: "UI/UX Designer", bg: "bg-[#FF8A3D]" },
    { name: "Digital Forensics", bg: "bg-[#FFFFFF]" },
    { name: "Project Manager", bg: "bg-[#FFD60A]" },
    { name: "Business Analyst", bg: "bg-[#FF5C8A]" },
    { name: "Data Entry", bg: "bg-[#2EE59D]" },
    { name: "IT Consultant", bg: "bg-[#FF8A3D]" },
    { name: "System Administrator", bg: "bg-[#FFFFFF]" },
    { name: "Database Administrator", bg: "bg-[#FFD60A]" },
  ];

  return (
    <div className="min-h-screen bg-paper text-ink font-sans selection:bg-accent-yellow selection:text-ink">
      <Navbar user={user} />

      <main id="main-content">
        {/* Hero Section */}
        <section id="atas" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <ScrollReveal direction="up" className="flex-1 flex flex-col items-start text-left">
            <div className="inline-block bg-surface border-3 border-ink px-3 py-1 font-mono font-bold text-xs tracking-wider uppercase shadow-nb-sm">
              {dict.hero.badge}
            </div>
            <h1 className="mt-6 font-display font-bold text-4xl sm:text-5xl md:text-7xl leading-[1.08] tracking-tight text-ink [text-wrap:balance]">
              {dict.hero.titlePrefix}{" "}
              <span className="inline-block bg-accent-yellow border-4 md:border-5 border-ink shadow-nb-md px-3 md:px-4 py-0.5 -rotate-2 hover:rotate-0 transition-transform duration-200">
                {dict.hero.titleHighlight}
              </span>
              {dict.hero.titleSuffix}
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-ink max-w-xl leading-relaxed">
              {dict.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href={user ? "/dashboard" : "/login"} variant="primary" size="lg">
                {user ? "Buka Dashboard ➔" : dict.hero.ctaStart}
              </Button>
              <Button
                variant="white"
                size="lg"
                onClick={() => {
                  window.history.pushState(null, "", "#cara");
                  smoothScrollTo("cara", 85, 750);
                }}
              >
                {dict.hero.ctaHow}
              </Button>
            </div>
            <div className="mt-5 font-mono text-xs md:text-sm text-ink/75 font-semibold">
              {dict.hero.metaNote}
            </div>
          </ScrollReveal>

          {/* Hero Visual Mascot Box */}
          <ScrollReveal direction="up" delay={120} className="w-full lg:w-auto flex-1 max-w-md relative pt-6 pb-2">
            {/* Background geometric accents */}
            <div className="absolute -left-3 top-2 w-16 h-16 bg-accent-blue border-4 border-ink shadow-nb-sm rotate-12 -z-0" />
            <div className="absolute -right-3 bottom-10 w-24 h-24 rounded-full bg-accent-pink border-4 border-ink -z-0" />

            <div className="relative bg-surface border-4 md:border-5 border-ink shadow-nb-lg p-6 flex flex-col items-center z-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-nb-hover">
              <div className="absolute -right-2 -top-5 bg-accent-pink text-ink border-3 md:border-4 border-ink px-3 py-1 font-display font-bold text-sm md:text-base rotate-3 shadow-nb-sm transition-transform duration-200 hover:scale-105">
                {dict.hero.mascotBubble}
              </div>
              <JalanMin state="idle" size={240} />
            </div>

            {/* Example JalanID floating badge */}
            <div className="relative -mt-10 ml-6 bg-surface border-4 border-ink shadow-nb-md p-4 flex flex-col gap-2 -rotate-3 z-20 transition-all duration-300 hover:rotate-0 hover:scale-[1.02] hover:shadow-nb-lg">
              <div className="flex items-center justify-between gap-4">
                <span className="bg-accent-yellow border-2 border-ink px-2 py-0.5 font-heading text-xs">
                  JalanID
                </span>
                <span className="font-mono text-[11px] font-bold tracking-widest text-ink/60">
                  CONTOH
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent-yellow border-2 border-ink flex items-end justify-center gap-1 pb-1.5 flex-none">
                  <div className="w-2 h-3.5 bg-ink" />
                  <div className="w-2 h-6 bg-ink" />
                  <div className="w-2 h-4.5 bg-ink" />
                </div>
                <div>
                  <div className="font-display font-bold text-lg md:text-xl leading-none">
                    Data Analyst
                  </div>
                  <div className="font-mono text-xs text-ink/70 mt-1">@usernamekamu</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-accent-yellow border-y-4 md:border-y-5 border-ink py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ScrollReveal direction="up">
            <h2 className="max-w-3xl font-display font-bold text-3xl md:text-5xl leading-tight tracking-tight">
              {dict.problem.title}
            </h2>
            <p className="mt-4 max-w-2xl text-lg md:text-xl text-ink leading-relaxed">
              {dict.problem.subtitle}
            </p>
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {dict.problem.points.map((pt, idx) => (
              <ScrollReveal key={pt.num} delay={idx * 80} direction="up">
                <div
                  className="group bg-surface border-4 border-ink shadow-nb-md p-6 md:p-8 flex flex-col items-start gap-3 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-nb-lg h-full"
                >
                  <div className="inline-block bg-accent-pink border-3 border-ink px-3 py-1 font-heading text-2xl md:text-3xl transition-transform duration-200 group-hover:-rotate-3 group-hover:scale-105">
                    {pt.num}
                  </div>
                  <h3 className="font-display font-bold text-xl md:text-2xl mt-2 leading-snug">
                    {pt.title}
                  </h3>
                  <p className="font-sans text-base text-ink/80 leading-relaxed">{pt.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Main Features Section */}
      <section id="fitur" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ScrollReveal direction="up">
            <div className="inline-block bg-ink text-paper px-3 py-1 font-mono font-bold text-xs uppercase tracking-widest">
              {dict.features.badge}
            </div>
            <h2 className="mt-4 max-w-3xl font-display font-bold text-3xl md:text-5xl leading-tight tracking-tight">
              {dict.features.title}
            </h2>
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Fitur A — JalanKarir */}
            <ScrollReveal delay={0} direction="up">
              <div className="group bg-accent-yellow border-4 md:border-5 border-ink shadow-nb-lg p-6 md:p-8 flex flex-col justify-between items-start gap-6 transition-all duration-200 hover:-translate-y-2 hover:shadow-nb-hover h-full">
                <div className="space-y-3">
                  <div className="inline-block bg-ink text-paper px-2.5 py-0.5 font-mono font-bold text-xs transition-transform duration-200 group-hover:-rotate-3">
                    FITUR A
                  </div>
                  <h3 className="font-heading text-3xl md:text-4xl leading-none">JalanKarir</h3>
                  <p className="font-sans font-medium text-lg leading-snug">
                    {dict.features.karir.title}
                  </p>
                  <ul className="space-y-2 text-sm md:text-base font-sans pt-2">
                    <li className="flex items-start gap-2">
                      <span className="w-2.5 h-2.5 bg-ink mt-1.5 flex-none" />
                      <span>5 level pertanyaan, tanpa ada jawaban benar atau salah</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2.5 h-2.5 bg-ink mt-1.5 flex-none" />
                      <span>Bank soal acak di setiap sesi</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2.5 h-2.5 bg-ink mt-1.5 flex-none" />
                      <span>Hasil kartu digital JalanID yang bisa dibagikan</span>
                    </li>
                  </ul>
                </div>

                <div className="w-full flex items-center justify-between pt-4 border-t-2 border-ink/20">
                  <Link href="/login" className="nb-btn inline-block bg-surface border-3 border-ink shadow-nb-sm px-4 py-2 font-display font-bold text-base hover:bg-white">
                    → JalanID
                  </Link>
                  {/* 3 steps illustration */}
                  <svg width="80" height="70" viewBox="0 0 200 170" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-200 group-hover:scale-105">
                    <rect x="4" y="104" width="56" height="62" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="6" />
                    <rect x="72" y="64" width="56" height="102" fill="#FF5C8A" stroke="#0A0A0A" strokeWidth="6" />
                    <rect x="140" y="24" width="56" height="142" fill="#3D5AFE" stroke="#0A0A0A" strokeWidth="6" />
                  </svg>
                </div>
              </div>
            </ScrollReveal>

            {/* Fitur B — JalanRapor */}
            <ScrollReveal delay={100} direction="up">
              <div className="group bg-accent-pink text-ink border-4 md:border-5 border-ink shadow-nb-lg p-6 md:p-8 flex flex-col justify-between items-start gap-6 transition-all duration-200 hover:-translate-y-2 hover:shadow-nb-hover h-full">
                <div className="space-y-3">
                  <div className="inline-block bg-ink text-paper px-2.5 py-0.5 font-mono font-bold text-xs transition-transform duration-200 group-hover:-rotate-3">
                    FITUR B
                  </div>
                  <h3 className="font-heading text-3xl md:text-4xl leading-none">JalanRapor</h3>
                  <p className="font-sans font-medium text-lg leading-snug">
                    {dict.features.rapor.title}
                  </p>
                  <ul className="space-y-2 text-sm md:text-base font-sans pt-2">
                    <li className="flex items-start gap-2">
                      <span className="w-2.5 h-2.5 bg-ink mt-1.5 flex-none" />
                      <span>Soal teknis 5 level kesulitan, 10 soal acak per level</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2.5 h-2.5 bg-ink mt-1.5 flex-none" />
                      <span>Tanpa batas waktu, kerjakan santai dan tenang</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2.5 h-2.5 bg-ink mt-1.5 flex-none" />
                      <span>Rapor nilai, radar chart kompetensi & alasan di Cocoklogiku</span>
                    </li>
                  </ul>
                </div>

                <div className="w-full flex items-center justify-between pt-4 border-t-2 border-ink/20">
                  <Link href="/login" className="nb-btn inline-block bg-surface border-3 border-ink shadow-nb-sm px-4 py-2 font-display font-bold text-base hover:bg-white">
                    → Cocoklogiku
                  </Link>
                  {/* Radar chart icon */}
                  <svg width="75" height="75" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-200 group-hover:scale-105">
                    <polygon points="100,10 185.6,72.2 153,172.8 47,172.8 14.4,72.2" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="6" strokeLinejoin="round" />
                    <polygon points="100,28 147.1,84.7 147.6,165.5 73.5,136.4 40.1,80.5" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="5" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </ScrollReveal>

            {/* Fitur C — JalanLoker */}
            <ScrollReveal delay={200} direction="up">
              <div className="group bg-accent-green text-ink border-4 md:border-5 border-ink shadow-nb-lg p-6 md:p-8 flex flex-col justify-between items-start gap-6 transition-all duration-200 hover:-translate-y-2 hover:shadow-nb-hover h-full">
                <div className="space-y-3">
                  <div className="inline-block bg-ink text-paper px-2.5 py-0.5 font-mono font-bold text-xs transition-transform duration-200 group-hover:-rotate-3">
                    FITUR C
                  </div>
                  <h3 className="font-heading text-3xl md:text-4xl leading-none">JalanLoker</h3>
                  <p className="font-sans font-medium text-lg leading-snug">
                    {dict.features.loker.title}
                  </p>
                  <ul className="space-y-2 text-sm md:text-base font-sans pt-2">
                    <li className="flex items-start gap-2">
                      <span className="w-2.5 h-2.5 bg-ink mt-1.5 flex-none" />
                      <span>Kurasi lowongan kerja IT sesuai role dan hasil tesmu</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2.5 h-2.5 bg-ink mt-1.5 flex-none" />
                      <span>Tombol Apply langsung ke situs karier perusahaan</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2.5 h-2.5 bg-ink mt-1.5 flex-none" />
                      <span>Fitur sedang dalam tahap perencanaan</span>
                    </li>
                  </ul>
                </div>

                <div className="w-full flex items-center justify-between pt-4 border-t-2 border-ink/20">
                  <Badge variant="orange" size="md">
                    Segera Hadir
                  </Badge>
                  {/* Job cards icon */}
                  <svg width="75" height="75" viewBox="0 0 200 190" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-200 group-hover:scale-105">
                    <rect x="6" y="6" width="176" height="50" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="6" />
                    <rect x="18" y="18" width="26" height="26" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="4" />
                    <line x1="58" y1="24" x2="164" y2="24" stroke="#0A0A0A" strokeWidth="6" />
                    <rect x="16" y="68" width="176" height="50" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="6" />
                    <rect x="28" y="80" width="26" height="26" fill="#FF5C8A" stroke="#0A0A0A" strokeWidth="4" />
                    <line x1="68" y1="86" x2="174" y2="86" stroke="#0A0A0A" strokeWidth="6" />
                  </svg>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="cara" className="bg-surface border-y-4 md:border-y-5 border-ink py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ScrollReveal direction="up">
            <div className="inline-block bg-ink text-paper px-3 py-1 font-mono font-bold text-xs uppercase tracking-widest">
              {dict.steps.badge}
            </div>
            <h2 className="mt-4 max-w-3xl font-display font-bold text-3xl md:text-5xl leading-tight tracking-tight">
              {dict.steps.title}
            </h2>
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dict.steps.list.map((st, idx) => {
              const bgColors = ["bg-[#FFD60A]", "bg-[#FF5C8A]", "bg-[#2EE59D]", "bg-[#FF8A3D]"];
              return (
                <ScrollReveal key={st.step} delay={idx * 75} direction="up">
                  <div
                    className="group bg-paper border-4 border-ink shadow-nb-md p-6 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-nb-lg h-full"
                  >
                    <div
                      className={`w-14 h-14 ${bgColors[idx % 4]} border-3 border-ink flex items-center justify-center font-heading text-3xl text-ink shadow-nb-sm transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-3`}
                    >
                      {st.step}
                    </div>
                    <h3 className="font-display font-bold text-xl leading-snug">{st.title}</h3>
                    <p className="font-sans text-sm md:text-base text-ink/80 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mascot & 21 Roles Gallery */}
      <section id="maskot" className="bg-ink text-paper py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <ScrollReveal direction="up" delay={0} className="w-full lg:w-auto flex-1 max-w-md relative pt-6">
            <div className="absolute left-0 top-0 bg-accent-yellow text-ink border-3 border-paper px-3 py-1 font-display font-bold text-sm md:text-base -rotate-3 z-10 transition-transform duration-200 hover:rotate-0 hover:scale-105">
              Yuk, cari jalanmu!
            </div>
            <div className="bg-paper border-4 border-paper shadow-[8px_8px_0_#FF5C8A] p-6 flex justify-center transition-all duration-300 hover:shadow-[12px_12px_0_#FF5C8A] hover:-translate-y-1">
              <JalanMin state="hover" size={260} />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={120} className="flex-1 space-y-4">
            <div className="inline-block bg-accent-yellow text-ink px-3 py-1 font-mono font-bold text-xs uppercase tracking-widest">
              MASKOT &amp; 21 ROLE IT
            </div>
            <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight text-paper">
              Kenalan dengan JalanMin &amp; 21 Role IT
            </h2>
            <p className="font-sans text-lg text-paper/80 max-w-xl leading-relaxed">
              JalanMin menemanimu dari awal. Setelah tahu role yang cocok, kamu akan menemukan
              karakteristik khas untuk setiap role IT berikut:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-4">
              {roles.map((r) => (
                <div
                  key={r.name}
                  className={`${r.bg} text-ink border-2 md:border-3 border-paper p-3 font-display font-bold text-xs md:text-sm leading-tight transition-all duration-150 hover:-translate-y-1 hover:rotate-1 hover:shadow-nb-sm active:scale-95 cursor-default select-none`}
                >
                  {r.name}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Example JalanID & Cocoklogiku */}
      <section id="contoh" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ScrollReveal direction="up">
            <div className="inline-block bg-ink text-paper px-3 py-1 font-mono font-bold text-xs uppercase tracking-widest">
              CONTOH HASIL
            </div>
            <h2 className="mt-4 max-w-3xl font-display font-bold text-3xl md:text-5xl leading-tight tracking-tight">
              Hasil yang bisa kamu simpan dan banggakan
            </h2>
            <p className="mt-4 max-w-2xl text-lg md:text-xl text-ink leading-relaxed">
              Unduh JalanID dan Cocoklogiku sebagai gambar PNG atau PDF, lalu bagikan ke media sosial
              atau jadikan acuan belajar.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Example JalanID */}
            <ScrollReveal delay={0} direction="up">
              <div className="group bg-surface border-4 md:border-5 border-ink shadow-nb-lg p-6 md:p-8 flex flex-col justify-between gap-6 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-nb-hover h-full">
                <div className="flex items-center justify-between">
                  <span className="bg-accent-yellow border-3 border-ink px-3 py-1 font-heading text-base transition-transform duration-200 group-hover:-rotate-2">
                    JalanID
                  </span>
                  <span className="font-mono text-xs font-bold tracking-widest text-ink/60">
                    CONTOH KARTU
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-accent-yellow border-3 border-ink flex items-end justify-center gap-1.5 pb-2 flex-none shadow-nb-sm transition-transform duration-200 group-hover:scale-105">
                    <div className="w-3 h-5 bg-ink" />
                    <div className="w-3 h-10 bg-ink" />
                    <div className="w-3 h-7 bg-ink" />
                  </div>
                  <div>
                    <div className="font-heading text-2xl md:text-3xl text-ink leading-none">
                      Data Analyst
                    </div>
                    <div className="font-mono text-sm text-ink/70 mt-1">@calontalenta</div>
                  </div>
                </div>

                <div className="space-y-3 font-mono text-xs md:text-sm">
                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span>1. Data Analyst (Top 1)</span>
                      <span>92%</span>
                    </div>
                    <div className="h-5 border-2 border-ink bg-white overflow-hidden">
                      <div className="h-full bg-accent-green border-r-2 border-ink w-[92%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span>2. Business Analyst</span>
                      <span>85%</span>
                    </div>
                    <div className="h-5 border-2 border-ink bg-white overflow-hidden">
                      <div className="h-full bg-accent-yellow border-r-2 border-ink w-[85%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span>3. Data Scientist</span>
                      <span>78%</span>
                    </div>
                    <div className="h-5 border-2 border-ink bg-white overflow-hidden">
                      <div className="h-full bg-accent-pink border-r-2 border-ink w-[78%]" />
                    </div>
                  </div>
                </div>

                <div className="border-t-2 border-ink/20 pt-4 font-mono text-xs text-ink/60 flex justify-between">
                  <span>Diterbitkan oleh JalanITku</span>
                  <span>Kode: JID-892401</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Example Cocoklogiku */}
            <ScrollReveal delay={120} direction="up">
              <div className="group bg-surface border-4 md:border-5 border-ink shadow-nb-lg p-6 md:p-8 flex flex-col justify-between gap-6 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-nb-hover h-full">
                <div className="flex items-center justify-between">
                  <span className="bg-accent-pink text-ink border-3 border-ink px-3 py-1 font-heading text-base transition-transform duration-200 group-hover:-rotate-2">
                    Cocoklogiku
                  </span>
                  <span className="font-mono text-xs font-bold tracking-widest text-ink/60">
                    CONTOH RAPOR
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  {/* SVG Radar graphic */}
                  <svg
                    width="130"
                    height="130"
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-none transition-transform duration-200 group-hover:scale-105"
                  >
                    <polygon
                      points="100,10 185.6,72.2 153,172.8 47,172.8 14.4,72.2"
                      fill="#FFFFFF"
                      stroke="#0A0A0A"
                      strokeWidth="5"
                      strokeLinejoin="round"
                    />
                    <line x1="100" y1="100" x2="100" y2="10" stroke="#0A0A0A" strokeWidth="2" />
                    <line x1="100" y1="100" x2="185.6" y2="72.2" stroke="#0A0A0A" strokeWidth="2" />
                    <line x1="100" y1="100" x2="153" y2="172.8" stroke="#0A0A0A" strokeWidth="2" />
                    <line x1="100" y1="100" x2="47" y2="172.8" stroke="#0A0A0A" strokeWidth="2" />
                    <line x1="100" y1="100" x2="14.4" y2="72.2" stroke="#0A0A0A" strokeWidth="2" />
                    <polygon
                      points="100,28 147.1,84.7 147.6,165.5 73.5,136.4 40.1,80.5"
                      fill="#FFD60A"
                      stroke="#0A0A0A"
                      strokeWidth="4"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <div className="flex flex-col gap-1">
                    <span className="font-display font-bold text-xl">Data Analyst</span>
                    <div className="font-heading text-5xl md:text-6xl text-ink leading-none">
                      78<span className="text-2xl text-ink/60">/100</span>
                    </div>
                    <Badge variant="green" size="sm" className="mt-1 self-start">
                      Cocok
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="font-display font-bold text-base text-ink">Alasan Evaluasi:</div>
                  <p className="font-sans text-ink/80 leading-snug">
                    Kuat di SQL dan visualisasi data bisnis. Pemahaman statistik inferensial masih
                    dapat ditingkatkan untuk role level menengah ke atas.
                  </p>
                </div>

                <div className="border-t-2 border-ink/20 pt-4 space-y-1 font-mono text-xs text-ink/75">
                  <div className="font-bold text-ink">Rekomendasi Belajar:</div>
                  <div>Statistik dasar, A/B Testing, dan Dashboard visualisasi bisnis.</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-surface border-y-4 md:border-y-5 border-ink py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <ScrollReveal direction="up">
            <div className="inline-block bg-ink text-paper px-3 py-1 font-mono font-bold text-xs uppercase tracking-widest">
              {dict.faq.badge}
            </div>
            <h2 className="mt-4 font-display font-bold text-3xl md:text-5xl leading-tight tracking-tight">
              {dict.faq.title}
            </h2>
          </ScrollReveal>

          <div className="mt-12 space-y-4">
            {dict.faq.items.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <ScrollReveal key={item.q} delay={idx * 60} direction="up">
                  <div
                    className="bg-paper border-3 md:border-4 border-ink shadow-nb-sm transition-all duration-200 hover:shadow-nb-md"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-5 md:p-6 flex items-center justify-between gap-4 text-left font-display font-bold text-lg md:text-xl text-ink cursor-pointer hover:bg-accent-yellow/15 transition-colors duration-150"
                      aria-expanded={isOpen}
                    >
                      <span>{item.q}</span>
                      <span
                        className={`font-heading text-2xl transition-transform duration-200 ease-out flex-none ${
                          isOpen ? "rotate-45 text-accent-pink" : "rotate-0"
                        }`}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 md:px-6 pb-6 pt-2 font-sans text-base text-ink/85 border-t-2 border-ink/15 leading-relaxed">
                          {item.a}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section id="mulai" className="bg-accent-pink border-b-4 md:border-b-5 border-ink py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
          <ScrollReveal direction="up" className="flex-1 space-y-4 text-left">
            <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ink leading-tight tracking-tight">
              {user ? `Siap lanjut, @${user.username}?` : "Siap cari jalanmu?"}
            </h2>
            <p className="font-sans text-xl md:text-2xl text-ink max-w-lg leading-relaxed">
              {user
                ? "Dashboard karier dan evaluasi teknismu sudah siap. Akses riwayat tes dan kartu JalanID milikmu sekarang."
                : "Masuk dengan Google, tentukan username unikmu, dan mulai JalanKarir sekarang juga. Gratis."}
            </p>
            <div className="pt-4">
              <Button href={user ? "/dashboard" : "/login"} variant="white" size="lg" className="text-xl shadow-nb-md hover:shadow-nb-lg transition-transform duration-150 hover:-translate-y-1 active:translate-y-0">
                {user ? "Buka Dashboard Sekarang →" : "Masuk dengan Google →"}
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={120} className="w-full md:w-auto flex justify-center transition-transform duration-300 hover:scale-105">
            <JalanMin state="happy" size={240} />
          </ScrollReveal>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}
