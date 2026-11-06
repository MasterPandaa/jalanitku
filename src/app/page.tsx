"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, ArrowDown, Plus, Minus } from "lucide-react";
import { JalanMin } from "@/components/mascot/JalanMin";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  CountUp,
  ExampleRadar,
  FeatureJobsIcon,
  FeatureRadarIcon,
  FeatureStepsIcon,
  MiniBars,
  RoleChips,
  ScoreBar,
  ScrollProgress,
} from "@/components/landing/LandingVisuals";
import { getDictionary } from "@/lib/i18n";
import { smoothScrollTo } from "@/lib/smooth-scroll";
import { useInView } from "@/lib/use-in-view";

/* Batas tipografi: ukuran fluid dengan minimum & maksimum agar tidak pecah di layar kecil / ultrawide */
const CONTAINER = "max-w-7xl mx-auto px-4 md:px-8";
const SECTION_Y = "py-14 sm:py-20 md:py-24";
const H1 =
  "font-display font-bold text-[clamp(2.25rem,1.1rem+3.8vw,4.5rem)] leading-[1.08] tracking-tight text-balance";
const H2 =
  "font-display font-bold text-[clamp(1.75rem,1.1rem+2.8vw,3rem)] leading-[1.1] tracking-tight text-balance";
const LEAD = "text-base sm:text-lg md:text-xl leading-relaxed text-pretty";
const KICKER =
  "inline-block bg-ink text-paper px-3 py-1 font-mono font-bold text-[11px] sm:text-xs uppercase tracking-widest";
const FEATURE_TITLE = "font-heading text-[clamp(1.75rem,1.2rem+1.6vw,2.5rem)] leading-none break-words";

const JALANID_SCORES = [
  { label: "1. Data Analyst (Top 1)", value: 92, fill: "bg-accent-green" },
  { label: "2. Business Analyst", value: 85, fill: "bg-accent-yellow" },
  { label: "3. Data Scientist", value: 78, fill: "bg-accent-pink" },
];

export default function LandingPage() {
  const dict = getDictionary();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [user, setUser] = useState<{ username: string; avatar_url?: string } | null>(null);
  const jalanIdView = useInView<HTMLDivElement>({ threshold: 0.35 });
  const raporView = useInView<HTMLDivElement>({ threshold: 0.35 });

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
    { name: "Software Engineer", bg: "bg-accent-yellow" },
    { name: "Mobile Developer", bg: "bg-accent-pink" },
    { name: "Game Developer", bg: "bg-accent-green" },
    { name: "Quality Assurance", bg: "bg-accent-orange" },
    { name: "IT Support", bg: "bg-surface" },
    { name: "Network Engineer", bg: "bg-accent-yellow" },
    { name: "Cloud Engineer", bg: "bg-accent-pink" },
    { name: "DevOps Engineer", bg: "bg-accent-green" },
    { name: "Data Analyst", bg: "bg-accent-orange" },
    { name: "Data Scientist", bg: "bg-surface" },
    { name: "Data Engineer", bg: "bg-accent-yellow" },
    { name: "AI/ML Engineer", bg: "bg-accent-pink" },
    { name: "Security Analyst", bg: "bg-accent-green" },
    { name: "UI/UX Designer", bg: "bg-accent-orange" },
    { name: "Digital Forensics", bg: "bg-surface" },
    { name: "Project Manager", bg: "bg-accent-yellow" },
    { name: "Business Analyst", bg: "bg-accent-pink" },
    { name: "Data Entry", bg: "bg-accent-green" },
    { name: "IT Consultant", bg: "bg-accent-orange" },
    { name: "System Administrator", bg: "bg-surface" },
    { name: "Database Administrator", bg: "bg-accent-yellow" },
  ];

  const stepColors = ["bg-accent-yellow", "bg-accent-pink", "bg-accent-green", "bg-accent-orange"];

  const inlineLinkClass =
    "nb-btn inline-flex items-center gap-1.5 bg-surface border-3 border-ink shadow-nb-sm px-3.5 py-2 font-display font-bold text-sm sm:text-base hover:bg-white";

  const features = [
    {
      key: "karir",
      tag: "FITUR A",
      name: "JalanKarir",
      bg: "bg-accent-yellow",
      title: dict.features.karir.title,
      bullets: [
        "5 level pertanyaan, tanpa ada jawaban benar atau salah",
        "Bank soal acak di setiap sesi",
        "Hasil kartu digital JalanID yang bisa dibagikan",
      ],
      action: (
        <Link href="/login" className={inlineLinkClass}>
          <span>JalanID</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </Link>
      ),
      icon: <FeatureStepsIcon />,
      span: "",
    },
    {
      key: "rapor",
      tag: "FITUR B",
      name: "JalanRapor",
      bg: "bg-accent-pink",
      title: dict.features.rapor.title,
      bullets: [
        "Soal teknis 5 level kesulitan, 10 soal acak per level",
        "Tanpa batas waktu, kerjakan santai dan tenang",
        "Rapor nilai, radar chart kompetensi & alasan di Cocoklogiku",
      ],
      action: (
        <Link href="/login" className={inlineLinkClass}>
          <span>Cocoklogiku</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </Link>
      ),
      icon: <FeatureRadarIcon />,
      span: "",
    },
    {
      key: "loker",
      tag: "FITUR C",
      name: "JalanLoker",
      bg: "bg-accent-green",
      title: dict.features.loker.title,
      bullets: [
        "Kurasi lowongan kerja IT sesuai role dan hasil tesmu",
        "Tombol Apply langsung ke situs karier perusahaan",
        "Fitur sedang dalam tahap perencanaan",
      ],
      action: (
        <Badge variant="orange" size="md">
          Segera Hadir
        </Badge>
      ),
      icon: <FeatureJobsIcon />,
      span: "md:col-span-2 lg:col-span-1",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-clip bg-paper text-ink font-sans selection:bg-accent-yellow selection:text-ink">
      <ScrollProgress />
      <Navbar user={user} />

      <main id="main-content">
        {/* Hero Section */}
        <section id="atas" className="py-10 sm:py-16 md:py-24">
          <div className={`${CONTAINER} flex flex-col lg:flex-row items-center gap-10 sm:gap-12 lg:gap-16`}>
            <ScrollReveal direction="up" className="w-full lg:flex-1 min-w-0 flex flex-col items-start text-left">
              <div className="inline-block max-w-full bg-surface border-3 border-ink px-3 py-1 font-mono font-bold text-[11px] sm:text-xs leading-snug tracking-wider uppercase shadow-nb-sm">
                {dict.hero.badge}
              </div>
              <h1 className={`mt-5 sm:mt-6 ${H1}`}>
                {dict.hero.titlePrefix}{" "}
                <span className="inline-block whitespace-nowrap bg-accent-yellow border-4 md:border-5 border-ink shadow-nb-md px-3 md:px-4 py-0.5 -rotate-2 hover:rotate-0 transition-transform duration-200">
                  {dict.hero.titleHighlight}
                </span>
                {dict.hero.titleSuffix}
              </h1>
              <p className={`mt-5 sm:mt-6 max-w-[36rem] text-lg sm:text-xl md:text-2xl leading-relaxed text-pretty`}>
                {dict.hero.subtitle}
              </p>
              <div className="mt-7 sm:mt-8 w-full sm:w-auto flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4">
                <Button
                  href={user ? "/dashboard" : "/login"}
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <span>{user ? "Buka Dashboard" : dict.hero.ctaStart}</span>
                  <ArrowRight className="w-5 h-5 stroke-[2.5] flex-none" />
                </Button>
                <Button
                  variant="white"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    window.history.pushState(null, "", "#cara");
                    smoothScrollTo("cara", 85, 750);
                  }}
                >
                  <span>{dict.hero.ctaHow}</span>
                  <ArrowDown className="w-5 h-5 stroke-[2.5] flex-none" />
                </Button>
              </div>
              <div className="mt-5 font-mono text-xs md:text-sm text-ink/75 font-semibold leading-relaxed text-pretty">
                {dict.hero.metaNote}
              </div>
            </ScrollReveal>

            {/* Hero Visual Mascot Box */}
            <ScrollReveal
              direction="up"
              delay={120}
              className="w-full max-w-[22rem] sm:max-w-md lg:max-w-none lg:w-[26rem] xl:w-[28rem] lg:flex-none relative pt-6 pb-2 mx-auto lg:mx-0"
            >
              {/* Background geometric accents */}
              <div className="absolute left-0 sm:-left-3 top-2 w-12 h-12 sm:w-16 sm:h-16 bg-accent-blue border-4 border-ink shadow-nb-sm rotate-12 -z-0" />
              <div className="absolute right-0 sm:-right-3 bottom-10 w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-accent-pink border-4 border-ink -z-0" />

              <div className="relative bg-surface border-4 md:border-5 border-ink shadow-nb-lg p-4 sm:p-6 flex flex-col items-center z-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[12px_12px_0_#0A0A0A]">
                <div className="absolute right-0 sm:-right-2 -top-5 bg-accent-pink text-ink border-3 md:border-4 border-ink px-3 py-1 font-display font-bold text-xs sm:text-sm md:text-base rotate-3 shadow-nb-sm transition-transform duration-200 hover:scale-105 z-10">
                  {dict.hero.mascotBubble}
                </div>
                <JalanMin
                  state="idle"
                  size={240}
                  className="!w-full !h-auto aspect-square max-w-[15rem]"
                />
              </div>

              {/* Example JalanID floating badge */}
              <div className="relative -mt-6 sm:-mt-10 ml-2 sm:ml-6 mr-2 sm:mr-0 bg-surface border-4 border-ink shadow-nb-md p-3 sm:p-4 flex flex-col gap-2 -rotate-2 sm:-rotate-3 z-20 transition-all duration-300 hover:rotate-0 hover:scale-[1.02] hover:shadow-nb-lg">
                <div className="flex items-center justify-between gap-4">
                  <span className="bg-accent-yellow border-2 border-ink px-2 py-0.5 font-heading text-xs">
                    JalanID
                  </span>
                  <span className="font-mono text-[11px] font-bold tracking-widest text-ink/60">
                    CONTOH
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MiniBars className="w-12 h-12 flex-none bg-accent-yellow border-2 border-ink gap-1 px-1.5 pt-2 pb-1.5" />
                  <div className="min-w-0">
                    <div className="font-display font-bold text-lg md:text-xl leading-none truncate">
                      Data Analyst
                    </div>
                    <div className="font-mono text-xs text-ink/70 mt-1 truncate">@usernamekamu</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Problem Section */}
        <section className={`bg-accent-yellow border-y-4 md:border-y-5 border-ink ${SECTION_Y}`}>
          <div className={CONTAINER}>
            <ScrollReveal direction="up">
              <h2 className={`max-w-3xl ${H2}`}>{dict.problem.title}</h2>
              <p className={`mt-4 max-w-2xl ${LEAD}`}>{dict.problem.subtitle}</p>
            </ScrollReveal>

            <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
              {dict.problem.points.map((pt, idx) => (
                <ScrollReveal key={pt.num} delay={idx * 80} direction="up" className="h-full">
                  <div className="group bg-surface border-4 border-ink shadow-nb-md p-5 sm:p-6 lg:p-8 flex flex-col items-start gap-3 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-nb-lg h-full">
                    <div className="inline-block bg-accent-pink border-3 border-ink px-3 py-1 font-heading text-2xl md:text-3xl transition-transform duration-200 group-hover:-rotate-3 group-hover:scale-105">
                      {pt.num}
                    </div>
                    <h3 className="font-display font-bold text-xl lg:text-2xl mt-1 leading-snug text-balance">
                      {pt.title}
                    </h3>
                    <p className="font-sans text-base text-ink/80 leading-relaxed text-pretty">{pt.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 3 Main Features Section */}
        <section id="fitur" className={SECTION_Y}>
          <div className={CONTAINER}>
            <ScrollReveal direction="up">
              <div className={KICKER}>{dict.features.badge}</div>
              <h2 className={`mt-4 max-w-3xl ${H2}`}>{dict.features.title}</h2>
            </ScrollReveal>

            <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {features.map((f, idx) => (
                <ScrollReveal key={f.key} delay={idx * 100} direction="up" className={`h-full ${f.span}`}>
                  <div
                    className={`group ${f.bg} text-ink border-4 md:border-5 border-ink shadow-nb-lg p-5 sm:p-6 lg:p-8 flex flex-col justify-between items-start gap-6 transition-all duration-200 hover:-translate-y-2 hover:shadow-[12px_12px_0_#0A0A0A] h-full`}
                  >
                    <div className="space-y-3 w-full">
                      <div className="inline-block bg-ink text-paper px-2.5 py-0.5 font-mono font-bold text-xs transition-transform duration-200 group-hover:-rotate-3">
                        {f.tag}
                      </div>
                      <h3 className={FEATURE_TITLE}>{f.name}</h3>
                      <p className="font-sans font-medium text-base sm:text-lg leading-snug text-pretty">{f.title}</p>
                      <ul className="space-y-2 text-sm md:text-base font-sans pt-2">
                        {f.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2.5">
                            <span className="w-2.5 h-2.5 bg-ink mt-[0.45rem] flex-none" />
                            <span className="min-w-0 text-pretty">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="w-full flex flex-wrap items-center justify-between gap-3 pt-4 border-t-3 border-dashed border-ink">
                      {f.action}
                      {f.icon}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="cara" className={`bg-surface border-y-4 md:border-y-5 border-ink ${SECTION_Y}`}>
          <div className={CONTAINER}>
            <ScrollReveal direction="up">
              <div className={KICKER}>{dict.steps.badge}</div>
              <h2 className={`mt-4 max-w-3xl ${H2}`}>{dict.steps.title}</h2>
            </ScrollReveal>

            <ol className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {dict.steps.list.map((st, idx) => (
                <li key={st.step} className="h-full">
                  <ScrollReveal delay={idx * 75} direction="up" className="h-full">
                    <div className="group bg-paper border-4 border-ink shadow-nb-md p-5 sm:p-6 flex flex-row sm:flex-col gap-4 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-nb-lg h-full">
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 flex-none ${stepColors[idx % 4]} border-3 border-ink flex items-center justify-center font-heading text-2xl sm:text-3xl text-ink shadow-nb-sm transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-3`}
                      >
                        {st.step}
                      </div>
                      <div className="min-w-0 flex flex-col gap-2 sm:gap-4">
                        <h3 className="font-display font-bold text-lg sm:text-xl leading-snug text-balance">
                          {st.title}
                        </h3>
                        <p className="font-sans text-sm md:text-base text-ink/80 leading-relaxed text-pretty">
                          {st.desc}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Mascot & 21 Roles Gallery */}
        <section id="maskot" className={`bg-ink text-paper ${SECTION_Y}`}>
          <div className={`${CONTAINER} flex flex-col lg:flex-row items-center gap-10 lg:gap-16`}>
            <ScrollReveal
              direction="up"
              delay={0}
              className="w-full max-w-[22rem] sm:max-w-md lg:flex-none lg:w-[26rem] relative pt-6"
            >
              <div className="absolute left-0 top-0 bg-accent-yellow text-ink border-3 border-paper px-3 py-1 font-display font-bold text-sm md:text-base -rotate-3 z-10 transition-transform duration-200 hover:rotate-0 hover:scale-105">
                Yuk, cari jalanmu!
              </div>
              <div className="bg-paper border-4 border-ink shadow-[6px_6px_0_#FF5C8A] sm:shadow-[8px_8px_0_#FF5C8A] p-4 sm:p-6 flex justify-center transition-all duration-300 hover:shadow-[12px_12px_0_#FF5C8A] hover:-translate-y-1">
                <JalanMin
                  state="happy"
                  size={260}
                  className="!w-full !h-auto aspect-square max-w-[16rem]"
                />
              </div>
            </ScrollReveal>

            <div className="w-full lg:flex-1 min-w-0 space-y-4">
              <ScrollReveal direction="up" delay={80} className="space-y-4">
                <div className="inline-block bg-accent-yellow text-ink px-3 py-1 font-mono font-bold text-[11px] sm:text-xs uppercase tracking-widest">
                  MASKOT &amp; 21 ROLE IT
                </div>
                <h2 className={`${H2} text-paper`}>Kenalan dengan JalanMin &amp; 21 Role IT</h2>
                <p className="font-sans text-base sm:text-lg text-paper/80 max-w-xl leading-relaxed text-pretty">
                  JalanMin menemanimu dari awal. Setelah tahu role yang cocok, kamu akan menemukan
                  karakteristik khas untuk setiap role IT berikut:
                </p>
              </ScrollReveal>

              <RoleChips roles={roles} />
            </div>
          </div>
        </section>

        {/* Example JalanID & Cocoklogiku */}
        <section id="contoh" className={SECTION_Y}>
          <div className={CONTAINER}>
            <ScrollReveal direction="up">
              <div className={KICKER}>CONTOH HASIL</div>
              <h2 className={`mt-4 max-w-3xl ${H2}`}>Hasil yang bisa kamu simpan dan banggakan</h2>
              <p className={`mt-4 max-w-2xl ${LEAD}`}>
                Unduh JalanID dan Cocoklogiku sebagai gambar PNG atau PDF, lalu bagikan ke media sosial
                atau jadikan acuan belajar.
              </p>
            </ScrollReveal>

            <div className="mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch max-w-2xl lg:max-w-none mx-auto">
              {/* Example JalanID */}
              <ScrollReveal delay={0} direction="up" className="h-full">
                <div
                  ref={jalanIdView.ref}
                  className="group bg-surface border-4 md:border-5 border-ink shadow-nb-lg p-5 sm:p-6 lg:p-8 flex flex-col justify-between gap-6 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[12px_12px_0_#0A0A0A] h-full"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="bg-accent-yellow border-3 border-ink px-3 py-1 font-heading text-base transition-transform duration-200 group-hover:-rotate-2">
                      JalanID
                    </span>
                    <span className="font-mono text-[11px] sm:text-xs font-bold tracking-widest text-ink/60">
                      CONTOH KARTU
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <MiniBars className="w-16 h-16 sm:w-20 sm:h-20 flex-none bg-accent-yellow border-3 border-ink gap-1.5 px-2 pt-3 pb-2 shadow-nb-sm transition-transform duration-200 group-hover:scale-105" />
                    <div className="min-w-0">
                      <div className="font-heading text-[clamp(1.5rem,1.1rem+1.4vw,1.875rem)] text-ink leading-none truncate">
                        Data Analyst
                      </div>
                      <div className="font-mono text-sm text-ink/70 mt-1 truncate">@calontalenta</div>
                    </div>
                  </div>

                  <div className="space-y-3 font-mono text-xs md:text-sm">
                    {JALANID_SCORES.map((s, i) => (
                      <ScoreBar
                        key={s.label}
                        label={s.label}
                        value={s.value}
                        fillClassName={s.fill}
                        active={jalanIdView.inView}
                        delay={250 + i * 180}
                      />
                    ))}
                  </div>

                  <div className="border-t-3 border-dashed border-ink pt-4 font-mono text-xs text-ink/70 flex flex-wrap justify-between gap-x-4 gap-y-1">
                    <span>Diterbitkan oleh JalanITku</span>
                    <span>Kode: JID-892401</span>
                  </div>
                </div>
              </ScrollReveal>

              {/* Example Cocoklogiku */}
              <ScrollReveal delay={120} direction="up" className="h-full">
                <div
                  ref={raporView.ref}
                  className="group bg-surface border-4 md:border-5 border-ink shadow-nb-lg p-5 sm:p-6 lg:p-8 flex flex-col justify-between gap-6 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[12px_12px_0_#0A0A0A] h-full"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="bg-accent-pink text-ink border-3 border-ink px-3 py-1 font-heading text-base transition-transform duration-200 group-hover:-rotate-2">
                      Cocoklogiku
                    </span>
                    <span className="font-mono text-[11px] sm:text-xs font-bold tracking-widest text-ink/60">
                      CONTOH RAPOR
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
                      <div className="flex flex-col gap-1">
                        <span className="font-display font-bold text-lg sm:text-xl">Data Analyst</span>
                        <Badge
                          variant="green"
                          size="sm"
                          className={`self-start ${raporView.inView ? "lv-chip-pop" : "opacity-0"}`}
                          style={raporView.inView ? { animationDelay: "1100ms" } : undefined}
                        >
                          Cocok
                        </Badge>
                      </div>
                      <div className="font-heading text-[clamp(3rem,2.2rem+3vw,4.5rem)] text-ink leading-none tabular-nums">
                        <CountUp to={78} active={raporView.inView} delay={200} duration={1200} />
                        <span className="text-xl sm:text-2xl text-ink/60">/100</span>
                      </div>
                    </div>

                    <ExampleRadar />
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="font-display font-bold text-base text-ink">Alasan Evaluasi:</div>
                    <p className="font-sans text-ink/80 leading-snug text-pretty">
                      Kuat di SQL dan visualisasi data bisnis. Pemahaman statistik inferensial masih
                      dapat ditingkatkan untuk role level menengah ke atas.
                    </p>
                  </div>

                  <div className="border-t-3 border-dashed border-ink pt-4 space-y-1 font-mono text-xs text-ink/75">
                    <div className="font-bold text-ink">Rekomendasi Belajar:</div>
                    <div className="text-pretty">Statistik dasar, A/B Testing, dan Dashboard visualisasi bisnis.</div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className={`bg-surface border-y-4 md:border-y-5 border-ink ${SECTION_Y}`}>
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <ScrollReveal direction="up">
              <div className={KICKER}>{dict.faq.badge}</div>
              <h2 className={`mt-4 ${H2}`}>{dict.faq.title}</h2>
            </ScrollReveal>

            <div className="mt-10 md:mt-12 space-y-4">
              {dict.faq.items.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <ScrollReveal key={item.q} delay={idx * 60} direction="up">
                    <div className="bg-paper border-3 md:border-4 border-ink shadow-nb-sm transition-all duration-200 hover:shadow-nb-md">
                      <button
                        type="button"
                        id={`faq-q-${idx}`}
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full p-4 sm:p-5 md:p-6 flex items-center justify-between gap-4 text-left font-display font-bold text-base sm:text-lg md:text-xl text-ink cursor-pointer hover:bg-accent-yellow/15 transition-colors duration-150"
                        aria-expanded={isOpen}
                        aria-controls={`faq-a-${idx}`}
                      >
                        <span className="min-w-0 text-balance">{item.q}</span>
                        <span
                          className={`w-9 h-9 border-3 border-ink shadow-[2px_2px_0_#0A0A0A] flex items-center justify-center flex-none transition-all duration-200 ease-out ${
                            isOpen ? "rotate-90 bg-accent-pink" : "rotate-0 bg-accent-yellow"
                          }`}
                          aria-hidden="true"
                        >
                          {isOpen ? (
                            <Minus className="w-5 h-5 stroke-[3]" />
                          ) : (
                            <Plus className="w-5 h-5 stroke-[3]" />
                          )}
                        </span>
                      </button>
                      <div
                        id={`faq-a-${idx}`}
                        role="region"
                        aria-labelledby={`faq-q-${idx}`}
                        className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
                          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="px-4 sm:px-5 md:px-6 pb-5 sm:pb-6 pt-3 font-sans text-base text-ink/85 border-t-3 border-dashed border-ink leading-relaxed text-pretty max-w-[65ch]">
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
        <section id="mulai" className={`bg-accent-pink border-b-4 md:border-b-5 border-ink ${SECTION_Y}`}>
          <div className={`${CONTAINER} flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12`}>
            <ScrollReveal direction="up" className="w-full md:flex-1 min-w-0 space-y-4 text-left">
              <h2 className="font-display font-bold text-[clamp(2rem,1.2rem+3.4vw,3.75rem)] text-ink leading-[1.08] tracking-tight text-balance">
                {user ? `Siap lanjut, @${user.username}?` : "Siap cari jalanmu?"}
              </h2>
              <p className="font-sans text-lg sm:text-xl md:text-2xl text-ink max-w-lg leading-relaxed text-pretty">
                {user
                  ? "Dashboard karier dan evaluasi teknismu sudah siap. Akses riwayat tes dan kartu JalanID milikmu sekarang."
                  : "Masuk dengan Google, tentukan username unikmu, dan mulai JalanKarir sekarang juga. Gratis."}
              </p>
              <div className="pt-4">
                <Button
                  href={user ? "/dashboard" : "/login"}
                  variant="white"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <span>{user ? "Buka Dashboard Sekarang" : "Masuk dengan Google"}</span>
                  <ArrowRight className="w-5 h-5 stroke-[2.5] flex-none" />
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal
              direction="up"
              delay={120}
              className="w-full md:w-[420px] lg:w-[490px] xl:w-[540px] flex-shrink-0 select-none"
            >
              {/* Panggung Detektif Melacak Jejak: Karakter di Kiri, Jejak Zigzag di Kanan Bergerak ke Kiri */}
              <div className="relative w-full h-[220px] sm:h-[250px] md:h-[275px] lg:h-[295px] flex items-end overflow-hidden pointer-events-none">
                {/* Karakter JalanMin di sisi Kiri (menghadap & berlari ke arah kanan) */}
                <div className="relative z-10 flex-shrink-0 w-[170px] sm:w-[200px] md:w-[230px] lg:w-[250px] aspect-square flex items-end justify-center">
                  <JalanMin
                    state="tracking"
                    size={250}
                    className="w-full h-auto drop-shadow-sm block"
                  />
                </div>

                {/* Jejak Kaki Zigzag di Sebelah Kanan Karakter (Bergerak ke Kiri & Hilang Saat Dilewati) */}
                <div
                  className="footprints-conveyor-track relative z-0 flex-1 h-[60px] sm:h-[68px] md:h-[76px] mb-3 sm:mb-4 md:mb-5 -ml-6 md:-ml-8"
                  aria-hidden="true"
                >
                  <div className="footprints-conveyor-stream">
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((unitIdx) => (
                      <div key={unitIdx} className="zigzag-step-pair">
                        {/* Kaki Kiri (agak ke atas) */}
                        <svg className="w-8 sm:w-9 md:w-10 h-4 sm:h-4.5 md:h-5 fill-ink shoe-step-up" viewBox="0 0 42 22">
                          <path d="M 2,6 C 2,3 4,1.5 8,1.5 C 12,1.5 13,3 13,6 L 13,15 C 13,18 12,19.5 8,19.5 C 4,19.5 2,18 2,15 Z" />
                          <path d="M 16,5 C 18,2.5 26,1.5 34,4 C 40,6 42,9 42,10.5 C 42,12 40,15 34,17 C 26,19.5 18,18.5 16,16 C 15,13.5 15,7.5 16,5 Z" />
                        </svg>

                        {/* Kaki Kanan (agak ke bawah) */}
                        <svg className="w-8 sm:w-9 md:w-10 h-4 sm:h-4.5 md:h-5 fill-ink shoe-step-down" viewBox="0 0 42 22">
                          <path d="M 2,6 C 2,3 4,1.5 8,1.5 C 12,1.5 13,3 13,6 L 13,15 C 13,18 12,19.5 8,19.5 C 4,19.5 2,18 2,15 Z" />
                          <path d="M 16,5 C 18,2.5 26,1.5 34,4 C 40,6 42,9 42,10.5 C 42,12 40,15 34,17 C 26,19.5 18,18.5 16,16 C 15,13.5 15,7.5 16,5 Z" />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
