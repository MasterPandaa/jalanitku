"use client";

import React from "react";

export interface SoftwareEngineerMascotProps {
  size?: number | string;
  className?: string;
  animated?: boolean;
  animate?: boolean;
  state?: "idle" | "hover" | "happy";
}

/**
 * Maskot Role: Software Engineer — "The Architect"
 * Identitas: Sang Arsitek Kode & Fondasi Sistem Digital
 * Ciri Khas: Ekspresi arsitek fokus-intensif — alis menukik ke dalam (V-shape berpikir keras),
 * kerutan dahi halus di antara alis, smirk asimetris percaya diri (angkat sudut kanan),
 * pupil menatap ke bawah-tengah (menelaah blueprint), sorot mata intense cyan analitis.
 * Rompi safety hi-vis, pensil drafting, helm konstruksi, genggaman tangan kiri realistis memegang cetak biru, kubus 3D dinamis berganti warna, dan animasi kedipan mata arsitek.
 */
export function SoftwareEngineerMascot({
  size = 200,
  className = "",
  animated = true,
  animate,
  state = "idle",
}: SoftwareEngineerMascotProps) {
  const isAnimated = animate !== undefined ? animate : animated;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none group ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Maskot Software Engineer — The Architect: Papan penunjuk jalan neo-brutalism dengan ekspresi arsitek fokus intens, alis V-shape berpikir keras, kerutan dahi, smirk percaya diri asimetris, rompi safety hi-vis, pensil drafting, dan kubus modular 3D isometrik"
    >
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>{`
            @keyframes se-float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-3.5px); }
            }
            @keyframes se-blueprint {
              0%, 100% { transform: rotate(-8deg); }
              50% { transform: rotate(-5deg) translateY(-2px); }
            }
            @keyframes se-cube-float-left {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-4px) rotate(3deg); }
            }
            @keyframes se-cube-float-right {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-3.5px) rotate(-3deg); }
            }
            @keyframes se-eye-blink {
              0%, 88%, 94%, 100% { transform: scaleY(1); }
              91% { transform: scaleY(0.08); }
            }
            @keyframes se-cube-color-cycle {
              0% { filter: hue-rotate(0deg) saturate(1.1); }
              50% { filter: hue-rotate(180deg) saturate(1.3); }
              100% { filter: hue-rotate(360deg) saturate(1.1); }
            }
            @keyframes se-cube-color-cycle-alt {
              0% { filter: hue-rotate(120deg) saturate(1.2); }
              50% { filter: hue-rotate(300deg) saturate(1.4); }
              100% { filter: hue-rotate(480deg) saturate(1.2); }
            }
            .se-animated-body {
              animation: ${isAnimated ? "se-float 3.5s ease-in-out infinite" : "none"};
              transform-origin: center bottom;
            }
            .se-animated-blueprint {
              animation: ${isAnimated ? "se-blueprint 3s ease-in-out infinite" : "none"};
              transform-origin: 28px 120px;
            }
            .se-animated-cube {
              animation: ${isAnimated ? "se-cube-float-left 4s ease-in-out infinite" : "none"};
              transform-origin: 28px 42px;
            }
            .se-animated-cube-right {
              animation: ${isAnimated ? "se-cube-float-right 4s ease-in-out 0.8s infinite" : "none"};
              transform-origin: 172px 42px;
            }
            .se-animated-eye-left {
              animation: ${isAnimated ? "se-eye-blink 3.8s ease-in-out infinite" : "none"};
              transform-origin: 69px 88px;
            }
            .se-animated-eye-right {
              animation: ${isAnimated ? "se-eye-blink 3.8s ease-in-out infinite" : "none"};
              transform-origin: 113px 88px;
            }
            .se-cube-color-left {
              animation: ${isAnimated ? "se-cube-color-cycle 5s linear infinite" : "none"};
            }
            .se-cube-color-right {
              animation: ${isAnimated ? "se-cube-color-cycle-alt 5s linear infinite" : "none"};
            }
          `}</style>
        </defs>

        {/* CONTAINER UTAMA DENGAN HOVER EFFECT TERPISAH */}
        <g className="transition-transform duration-300 group-hover:scale-105">
          <g className="se-animated-body">
            {/* ============================================================== */}
            {/* LAYER 0: KUBUS MODULAR 3D ISOMETRIK KANAN ATAS (LAYER BELAKANG) */}
            {/* ============================================================== */}
            <g className="se-animated-cube-right">
              {/* Hard Shadow Kubus Kanan */}
              <polygon
                points="164,52 174,47 174,59 164,64"
                fill="#0A0A0A"
              />
              <g className="se-cube-color-right">
                {/* Kubus 3D Isometrik Sisi Kanan Atas (Warna Berganti Dinamis) */}
                <polygon
                  points="160,36 172,30 184,36 172,42"
                  fill="#2EE59D"
                  stroke="#0A0A0A"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <polygon
                  points="160,36 172,42 172,54 160,48"
                  fill="#00F0FF"
                  stroke="#0A0A0A"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <polygon
                  points="172,42 184,36 184,48 172,54"
                  fill="#FF8A3D"
                  stroke="#0A0A0A"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <circle cx="172" cy="36" r="2" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="1" />
              </g>
            </g>

            {/* ============================================================== */}
            {/* LAYER 1: KAKI & SEPATU HITAM DENGAN SOL PUTIH                  */}
            {/* ============================================================== */}
            <rect x="68" y="154" width="22" height="24" fill="#0A0A0A" />
            <rect x="114" y="154" width="22" height="24" fill="#0A0A0A" />

            {/* Kaki Kiri */}
            <rect
              x="64"
              y="148"
              width="22"
              height="26"
              fill="#0A0A0A"
              rx="2"
              stroke="#0A0A0A"
              strokeWidth="3.5"
            />
            <line
              x1="64"
              y1="170"
              x2="86"
              y2="170"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeLinecap="square"
            />

            {/* Kaki Kanan */}
            <rect
              x="110"
              y="148"
              width="22"
              height="26"
              fill="#0A0A0A"
              rx="2"
              stroke="#0A0A0A"
              strokeWidth="3.5"
            />
            <line
              x1="110"
              y1="170"
              x2="132"
              y2="170"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeLinecap="square"
            />

            {/* ============================================================== */}
            {/* LAYER 2: BADAN UTAMA PAPAN RAMBU (KUNING NEO-BRUTALISM 106x94) */}
            {/* ============================================================== */}
            <rect
              x="48"
              y="56"
              width="106"
              height="94"
              rx="4"
              fill="#0A0A0A"
            />

            <rect
              x="42"
              y="50"
              width="106"
              height="94"
              rx="4"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="4"
            />

            {/* Marka Jalan Putus-Putus Perut */}
            <line
              x1="54"
              y1="134"
              x2="136"
              y2="134"
              stroke="#0A0A0A"
              strokeWidth="3.5"
              strokeDasharray="8 6"
            />

            {/* Pipi Merona Pink (#FF5C8A) */}
            <rect x="52" y="106" width="12" height="7" rx="2" fill="#FF5C8A" />
            <rect x="124" y="106" width="12" height="7" rx="2" fill="#FF5C8A" />

            {/* Kerah Kemeja Putih & Dasi Arsitek Cyan */}
            <polygon
              points="78,144 94,144 88,132"
              fill="#FFFFFF"
              stroke="#0A0A0A"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <polygon
              points="110,144 94,144 100,132"
              fill="#FFFFFF"
              stroke="#0A0A0A"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <rect
              x="91"
              y="132"
              width="7"
              height="5"
              fill="#00F0FF"
              stroke="#0A0A0A"
              strokeWidth="2"
            />
            <polygon
              points="91,137 98,137 100,145 94.5,148 89,145"
              fill="#00F0FF"
              stroke="#0A0A0A"
              strokeWidth="2"
            />

            {/* ============================================================== */}
            {/* ROMPI ARSITEKTUR / SAFETY VEST HI-VIS (ORANYE & KUNING NEON)   */}
            {/* ============================================================== */}
            {/* Panel Rompi Sisi Kiri */}
            <polygon
              points="42,126 84,126 78,144 42,144"
              fill="#FF8A3D"
              stroke="#0A0A0A"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <polygon
              points="54,126 68,126 64,144 50,144"
              fill="#2EE59D"
              stroke="#0A0A0A"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <rect
              x="45"
              y="133"
              width="8"
              height="9"
              rx="1"
              fill="#FF7722"
              stroke="#0A0A0A"
              strokeWidth="1.5"
            />
            <line x1="47" y1="130" x2="47" y2="134" stroke="#00F0FF" strokeWidth="1.5" strokeLinecap="round" />

            {/* Panel Rompi Sisi Kanan */}
            <polygon
              points="106,126 148,126 148,144 112,144"
              fill="#FF8A3D"
              stroke="#0A0A0A"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <polygon
              points="122,126 136,126 140,144 126,144"
              fill="#2EE59D"
              stroke="#0A0A0A"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <rect
              x="137"
              y="131"
              width="8"
              height="11"
              rx="1"
              fill="#FFFFFF"
              stroke="#0A0A0A"
              strokeWidth="1.5"
            />
            <rect x="139" y="133" width="4" height="3" fill="#00F0FF" />
            <line x1="138.5" y1="138" x2="143.5" y2="138" stroke="#0A0A0A" strokeWidth="1" />

            {/* Celah Bukaan Tengah Rompi */}
            <line x1="84" y1="126" x2="78" y2="144" stroke="#0A0A0A" strokeWidth="3" />
            <line x1="106" y1="126" x2="112" y2="144" stroke="#0A0A0A" strokeWidth="3" />

            {/* ============================================================== */}
            {/* LAYER 3: MULUT SMIRK ASIMETRIS ARSITEK — ANGKAT SUDUT KANAN    */}
            {/* ============================================================== */}
            {/* Smirk arsitek percaya diri — senyum satu sisi menukik ke kanan */}
            <path
              d="M 84 116 Q 96 121 108 110"
              stroke="#0A0A0A"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Lekukan naik di ujung kanan — ekspresi seringai arsitek */}
            <path
              d="M 108 110 Q 112 106 110 113"
              stroke="#0A0A0A"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Sudut bibir kiri tegas, sedikit lebih rendah */}
            <line
              x1="82"
              y1="117"
              x2="85"
              y2="116"
              stroke="#0A0A0A"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* ============================================================== */}
            {/* LAYER 4: MATA & ALIS PEMIKIR AKTIF (CONTEMPLATING ARCHITECT)   */}
            {/* ============================================================== */}
            {/* Mata Kiri (Baku JalanMin 22x24 rx=4) — Efek Kedip Natural */}
            <g className="se-animated-eye-left">
              <rect
                x="58"
                y="76"
                width="22"
                height="24"
                rx="4"
                fill="#FFFFFF"
                stroke="#0A0A0A"
                strokeWidth="3.5"
              />
              {/* Pupil Hitam Kiri — melirik ke atas-kanan memikirkan ide/arsitektur */}
              <rect x="67" y="79" width="11" height="13" rx="2" fill="#0A0A0A" />
              <circle cx="70" cy="82" r="1.8" fill="#FFFFFF" />
              <circle cx="74" cy="87" r="1.4" fill="#00F0FF" />
            </g>

            {/* Mata Kanan (Baku JalanMin 22x24 rx=4) — Efek Kedip Natural */}
            <g className="se-animated-eye-right">
              <rect
                x="102"
                y="76"
                width="22"
                height="24"
                rx="4"
                fill="#FFFFFF"
                stroke="#0A0A0A"
                strokeWidth="3.5"
              />
              {/* Pupil Hitam Kanan — melirik ke atas-kanan memikirkan ide/arsitektur */}
              <rect x="111" y="79" width="11" height="13" rx="2" fill="#0A0A0A" />
              <circle cx="114" cy="82" r="1.8" fill="#FFFFFF" />
              <circle cx="118" cy="87" r="1.4" fill="#00F0FF" />
            </g>

            {/* ALIS PEMIKIR AKTIF (Inquisitive Thinking Eyebrows) */}
            {/* Alis Kiri: Agak mendatar terangkat sedikit (sedang menimbang ide) */}
            <path
              d="M 56 68 Q 68 64 78 67"
              stroke="#0A0A0A"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Alis Kanan: Terangkat tinggi melengkung penasaran (Curious / Eureka!) */}
            <path
              d="M 102 67 Q 114 60 128 62"
              stroke="#0A0A0A"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* ============================================================== */}
            {/* LAYER 5: HELM KONSTRUKSI ARSITEK IMPROVED (#FF8A3D)            */}
            {/* ============================================================== */}
            <path
              d="M 44 48 C 44 22 146 22 146 48 Z"
              fill="#0A0A0A"
            />
            <path
              d="M 44 44 C 44 18 144 18 144 44 Z"
              fill="#FF8A3D"
              stroke="#0A0A0A"
              strokeWidth="4"
            />

            {/* Ventilasi Alur Samping */}
            <line x1="56" y1="36" x2="68" y2="36" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="120" y1="36" x2="132" y2="36" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="60" y1="30" x2="70" y2="30" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
            <line x1="118" y1="30" x2="128" y2="30" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />

            {/* Punggung Rusuk Penguat Tengah Helm */}
            <path
              d="M 88 19 C 88 17 100 17 100 19 L 102 44 L 86 44 Z"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="2.5"
            />
            <line x1="91" y1="21" x2="91" y2="41" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />

            {/* Bibir/Brim Pelindung Helm Bawah */}
            <rect
              x="32"
              y="41"
              width="124"
              height="11"
              rx="3"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="4"
            />
            <line x1="36" y1="48" x2="152" y2="48" stroke="#0A0A0A" strokeWidth="1.5" />

            {/* Headlamp Mini / Emblem Arsitek Presisi */}
            <rect
              x="87"
              y="26"
              width="14"
              height="12"
              rx="2.5"
              fill="#00F0FF"
              stroke="#0A0A0A"
              strokeWidth="2.5"
            />
            <circle cx="94" cy="32" r="3" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="1.5" />
            <line x1="94" y1="23" x2="94" y2="26" stroke="#0A0A0A" strokeWidth="2" />

            {/* ============================================================== */}
            {/* LAYER 6: TANGAN KANAN & PENSIL TEKNIKAL DRAFTING               */}
            {/* ============================================================== */}
            <path
              d="M 148 108 Q 164 106 172 100"
              stroke="#0A0A0A"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />

            {/* Pensil Teknikal Arsitek Jumbo (Ujung Runcing Menghadap ke Atas) */}
            <g transform="rotate(15 170 96)">
              <rect x="171" y="55" width="8" height="66" rx="2" fill="#0A0A0A" />
              <polygon
                points="169.5,57 172.5,57 171,52"
                fill="#0A0A0A"
              />
              <polygon
                points="167,66 175,66 171,52"
                fill="#FFE8A3"
                stroke="#0A0A0A"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <rect
                x="167"
                y="66"
                width="8"
                height="38"
                fill="#FF8A3D"
                stroke="#0A0A0A"
                strokeWidth="2.5"
              />
              <line x1="171" y1="66" x2="171" y2="104" stroke="#FFD60A" strokeWidth="2" />
              <rect
                x="166.5"
                y="104"
                width="9"
                height="5"
                rx="1"
                fill="#FFFFFF"
                stroke="#0A0A0A"
                strokeWidth="2"
              />
              <line x1="168" y1="106.5" x2="174" y2="106.5" stroke="#0A0A0A" strokeWidth="1" />
              <rect
                x="167"
                y="109"
                width="8"
                height="9"
                rx="2"
                fill="#FF5C8A"
                stroke="#0A0A0A"
                strokeWidth="2.5"
              />
            </g>

            {/* Kepalan Tangan Kanan Mencengkeram Pensil */}
            <circle
              cx="170"
              cy="100"
              r="7.5"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="3.5"
            />

            {/* ============================================================== */}
            {/* LAYER 7: BLUEPRINT CETAK BIRU DIGITAL & GENGGAMAN TANGAN KIRI  */}
            {/* ============================================================== */}
            <g className="se-animated-blueprint">
              {/* Lengan Kiri Menyambung dari Rompi ke Bawah Kertas */}
              <path
                d="M 42 116 Q 34 128 26 128"
                stroke="#0A0A0A"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 42 116 Q 34 128 26 128"
                stroke="#FF8A3D"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Manset Hijau Reflektif Lengan Kiri */}
              <circle cx="28" cy="128" r="3.5" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="1.5" />

              {/* Hard Shadow Lembar Blueprint */}
              <rect
                x="10"
                y="74"
                width="44"
                height="58"
                rx="2.5"
                fill="#0A0A0A"
                transform="rotate(-5 32 103)"
              />
              {/* Lembar Cetak Biru Cyan (#05B6D4) */}
              <rect
                x="6"
                y="70"
                width="44"
                height="58"
                rx="2.5"
                fill="#05B6D4"
                stroke="#0A0A0A"
                strokeWidth="3.5"
                transform="rotate(-5 28 99)"
              />

              {/* Diagram Arsitektur Microservices & Sirkuit di Atas Blueprint */}
              <g transform="rotate(-5 28 99)">
                <rect x="10" y="74" width="36" height="6" fill="#0369A1" />
                <line x1="12" y1="77" x2="26" y2="77" stroke="#FFFFFF" strokeWidth="1.5" />
                <rect x="20" y="84" width="16" height="8" rx="1" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="1.5" />
                <line x1="28" y1="92" x2="28" y2="98" stroke="#FFFFFF" strokeWidth="2" />
                <line x1="16" y1="98" x2="40" y2="98" stroke="#FFFFFF" strokeWidth="1.5" />
                <line x1="16" y1="98" x2="16" y2="103" stroke="#FFFFFF" strokeWidth="1.5" />
                <line x1="40" y1="98" x2="40" y2="103" stroke="#FFFFFF" strokeWidth="1.5" />
                <rect x="10" y="103" width="12" height="7" rx="1" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="1.5" />
                <rect x="34" y="103" width="12" height="7" rx="1" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="1.5" />
                <line x1="22" y1="110" x2="28" y2="114" stroke="#FFFFFF" strokeWidth="1.5" />
                <line x1="34" y1="110" x2="28" y2="114" stroke="#FFFFFF" strokeWidth="1.5" />
                <rect x="21" y="114" width="14" height="8" rx="2" fill="#FF5C8A" stroke="#0A0A0A" strokeWidth="1.5" />

                {/* Garis Lipatan Kertas di Bawah Tekanan Jempol */}
                <path d="M 18 123 Q 28 126 38 122" stroke="#0369A1" strokeWidth="2" strokeLinecap="round" fill="none" />

                {/* GENGGAMAN TANGAN KIRI REALISTIS: 4 Jari Melingkar dari Belakang Bawah Kertas */}
                <g id="se-fingers-grip">
                  {/* Jari Kelingking */}
                  <rect x="17" y="125" width="5.5" height="8" rx="2.5" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2.5" />
                  {/* Jari Manis */}
                  <rect x="22" y="124" width="6" height="9" rx="2.5" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2.5" />
                  {/* Jari Tengah */}
                  <rect x="27.5" y="124" width="6" height="9" rx="2.5" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2.5" />
                  {/* Jari Telunjuk */}
                  <rect x="33" y="125" width="5.5" height="8" rx="2.5" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2.5" />

                  {/* Ibu Jari (Thumb) Menekan Mantap Permukaan Depan Blueprint */}
                  <ellipse cx="28" cy="118" rx="6.5" ry="4.5" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2.5" />
                  {/* Kerutan Ruas Ibu Jari */}
                  <path d="M 25 116 Q 28 114 31 116" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                </g>
              </g>

              {/* Garis Gulungan Dasar Kertas Blueprint */}
              <path
                d="M 5 125 Q 26 128 47 125"
                stroke="#0369A1"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                transform="rotate(-5 26 125)"
              />
            </g>

            {/* ============================================================== */}
            {/* LAYER 8: KUBUS MODULAR 3D ISOMETRIK (MELAYANG DI SUDUT KIRI)    */}
            {/* ============================================================== */}
            <g className="se-animated-cube">
              <polygon
                points="20,52 30,47 30,59 20,64"
                fill="#0A0A0A"
              />
              <g className="se-cube-color-left">
                {/* Kubus 3D Isometrik Sisi Kiri (Warna Berganti Dinamis) */}
                <polygon
                  points="16,36 28,30 40,36 28,42"
                  fill="#00F0FF"
                  stroke="#0A0A0A"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <polygon
                  points="16,36 28,42 28,54 16,48"
                  fill="#FF8A3D"
                  stroke="#0A0A0A"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <polygon
                  points="28,42 40,36 40,48 28,54"
                  fill="#FF5C8A"
                  stroke="#0A0A0A"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <circle cx="28" cy="36" r="2" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="1" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
