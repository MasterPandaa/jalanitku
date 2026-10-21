"use client";

import React from "react";

export interface QualityAssuranceMascotProps {
  size?: number | string;
  className?: string;
  animated?: boolean;
  animate?: boolean;
  state?: "idle" | "hover" | "happy";
}

/**
 * Maskot Role: Quality Assurance — "The Bug Hunter"
 * Identitas: Sang Pemburu Cacat Kode & Penjaga Standar Keandalan
 * Ciri Khas: Topi safari hunter oranye dengan lampu senter status PASS hijau neon,
 * kerah safari oranye dengan pin badge "TEST✓", tangan kiri memegang jaring serangga digital hunter,
 * dan tangan kanan memegang toples kaca spesimen transparan (specimen jar neo-brutalism) dengan tutup
 * ulir logam berisikan robot kepik siber tertangkap yang terkurung di dalamnya.
 *
 * Base Anatomi: 100% konsisten dengan Base Model Batch 1 (kaki sol putih y=170, tubuh kuning rambu 106x94,
 * marka jalan putus-putus perut, pipi pink, mata ekspresif, mulut senyum, kepalan tangan kuning #FFD60A).
 */
export function QualityAssuranceMascot({
  size = 200,
  className = "",
  animated = true,
  animate,
  state = "idle",
}: QualityAssuranceMascotProps) {
  const isAnimated = animate !== undefined ? animate : animated;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none group ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Maskot Quality Assurance — The Bug Hunter: Papan penunjuk jalan neo-brutalism kuning dengan topi safari oranye, senter status PASS, jaring serangga digital, dan toples kaca spesimen berisi robot bug tertangkap"
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
            @keyframes qa-float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-3.5px); }
            }
            @keyframes qa-net-swing {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(-5deg) translateY(-1px); }
            }
            @keyframes qa-jar-sway {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(4deg) translateY(-2px); }
            }
            @keyframes qa-bug-trap-flutter {
              0%, 100% { transform: translate(0, 0) rotate(0deg); }
              25% { transform: translate(1px, -2px) rotate(6deg); }
              50% { transform: translate(-1px, 1px) rotate(-5deg); }
              75% { transform: translate(1.5px, 0.5px) rotate(4deg); }
            }
            @keyframes qa-beam-pulse {
              0%, 100% { opacity: 0.25; }
              50% { opacity: 0.45; }
            }
            .qa-animated-body {
              animation: ${isAnimated ? "qa-float 3.5s ease-in-out infinite" : "none"};
              transform-origin: center bottom;
            }
            .qa-animated-net {
              animation: ${isAnimated ? "qa-net-swing 2.8s ease-in-out infinite" : "none"};
              transform-origin: 18px 126px;
            }
            .qa-animated-jar {
              animation: ${isAnimated ? "qa-jar-sway 3.2s ease-in-out infinite" : "none"};
              transform-origin: 174px 116px;
            }
            .qa-animated-trapped-bug {
              animation: ${isAnimated ? "qa-bug-trap-flutter 1.1s ease-in-out infinite" : "none"};
              transform-origin: 182px 90px;
            }
            .qa-animated-beam {
              animation: ${isAnimated ? "qa-beam-pulse 2s ease-in-out infinite" : "none"};
            }
          `}</style>
        </defs>

        {/* CONTAINER UTAMA DENGAN ANIMASI FLOAT */}
        <g className="qa-animated-body transition-transform duration-300 group-hover:scale-105">
          {/* ============================================================== */}
          {/* LAYER 1: KAKI & SEPATU HITAM DENGAN SOL PUTIH (IDENTIK BATCH 1)*/}
          {/* ============================================================== */}
          {/* Hard Shadow Kaki */}
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
          {/* Sol Sepatu Putih Kiri */}
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
          {/* Sol Sepatu Putih Kanan */}
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
          {/* LAYER 2: BADAN PAPAN RAMBU KUNING NEO-BRUTALISM (IDENTIK BATCH 1)*/}
          {/* ============================================================== */}
          {/* Hard Shadow Badan Kotak Hitam Pekat */}
          <rect x="48" y="56" width="106" height="94" rx="4" fill="#0A0A0A" />

          {/* Badan Rambu Utama Kuning #FFD60A */}
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

          {/* ============================================================== */}
          {/* LAYER 3: MATA & EKSPRESI HUNTER TELITI (IDENTIK BATCH 1)       */}
          {/* ============================================================== */}
          {/* Mata Kiri */}
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
          {/* Pupil Hitam Kiri */}
          <rect x="64" y="81" width="11" height="13" rx="2" fill="#0A0A0A" />
          {/* Kilau Putih Sinar Mata */}
          <circle cx="67" cy="84" r="1.5" fill="#FFFFFF" />
          {/* Kilau Hijau Neon PASS */}
          <circle cx="70" cy="88" r="1.2" fill="#2EE59D" />

          {/* Mata Kanan */}
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
          {/* Pupil Hitam Kanan */}
          <rect x="108" y="81" width="11" height="13" rx="2" fill="#0A0A0A" />
          {/* Kilau Putih Sinar Mata */}
          <circle cx="111" cy="84" r="1.5" fill="#FFFFFF" />
          {/* Kilau Hijau Neon PASS */}
          <circle cx="114" cy="88" r="1.2" fill="#2EE59D" />

          {/* Alis Bertekad Tajam (Hunter Mode) */}
          <path
            d="M 58 71 L 78 73"
            stroke="#0A0A0A"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 102 73 L 122 71"
            stroke="#0A0A0A"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Mulut Senyum Percaya Diri (Bug Ditemukan!) */}
          <path
            d="M 87 114 Q 94 123 102 114"
            stroke="#0A0A0A"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* ============================================================== */}
          {/* LAYER 4: KERAH SAFARI ORANYE & BADGE "TEST✓"                   */}
          {/* ============================================================== */}
          <polygon
            points="78,144 94,144 88,132"
            fill="#FF8A3D"
            stroke="#0A0A0A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <polygon
            points="110,144 94,144 100,132"
            fill="#FF8A3D"
            stroke="#0A0A0A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Badge Hijau Checklist TEST PASS */}
          <rect
            x="90"
            y="131"
            width="10"
            height="10"
            rx="2"
            fill="#2EE59D"
            stroke="#0A0A0A"
            strokeWidth="2"
          />
          <path
            d="M 92 136 L 94.5 138.5 L 98 134"
            stroke="#0A0A0A"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* ============================================================== */}
          {/* LAYER 5: TOPI SAFARI HUNTER ORANYE DENGAN SENTER PASS          */}
          {/* ============================================================== */}
          {/* Hard Shadow Topi Safari */}
          <path
            d="M 38 48 C 38 24 152 24 152 48 Z"
            fill="#0A0A0A"
          />
          {/* Mahkota Kubah Topi Oranye (#FF8A3D) */}
          <path
            d="M 50 42 C 50 18 140 18 140 42 Z"
            fill="#FF8A3D"
            stroke="#0A0A0A"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Brim / Daun Topi Safari Melengkung */}
          <path
            d="M 30 48 L 160 48 L 148 40 L 42 40 Z"
            fill="#FF8A3D"
            stroke="#0A0A0A"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Pita Topi Cokelat Safari (#8B4513) */}
          <rect
            x="50"
            y="34"
            width="90"
            height="7"
            fill="#8B4513"
            stroke="#0A0A0A"
            strokeWidth="2"
          />
          {/* Gesper Logam Emas pada Pita Topi */}
          <rect
            x="64"
            y="33"
            width="8"
            height="9"
            rx="1.5"
            fill="#FFD60A"
            stroke="#0A0A0A"
            strokeWidth="1.5"
          />

          {/* Lampu Senter Kepala Status PASS Hijau Neon (#2EE59D) */}
          {/* Hard Shadow Lampu */}
          <rect x="88" y="16" width="16" height="15" rx="3" fill="#0A0A0A" />
          {/* Bodi Lampu Senter Mint Neon */}
          <rect
            x="86"
            y="14"
            width="16"
            height="15"
            rx="3"
            fill="#2EE59D"
            stroke="#0A0A0A"
            strokeWidth="2.5"
          />
          {/* Lensa Lampu */}
          <circle cx="94" cy="21.5" r="4.5" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="1.5" />
          {/* Tanda Centang Hijau PASS di Senter */}
          <path
            d="M 91.5 21.5 L 93.5 23.5 L 97 19.5"
            stroke="#0A0A0A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Pancaran Beam Sinar Neon Halus */}
          <polygon
            className="qa-animated-beam"
            points="86,29 64,54 124,54 102,29"
            fill="#2EE59D"
            fillOpacity="0.25"
          />

          {/* ============================================================== */}
          {/* LAYER 6: TANGAN KIRI & JARING SERANGGA DIGITAL (THE BUG NET)    */}
          {/* ============================================================== */}
          <g className="qa-animated-net">
            {/* Gagang Kayu Jaring Menjulur Miring dari Tangan */}
            <line
              x1="18"
              y1="126"
              x2="10"
              y2="46"
              stroke="#8B4513"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <line
              x1="18"
              y1="126"
              x2="10"
              y2="46"
              stroke="#0A0A0A"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="4 8"
            />

            {/* Kantung Jaring Kawat Digital Cyan (#00F0FF) */}
            <path
              d="M 4 48 C -6 76 12 86 24 76 C 30 64 26 44 22 42"
              fill="#00F0FF"
              fillOpacity="0.2"
              stroke="#0A0A0A"
              strokeWidth="2.5"
            />
            {/* Garis-Garis Anyaman Jaring */}
            <line x1="4" y1="56" x2="22" y2="54" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="2 2" />
            <line x1="4" y1="64" x2="22" y2="62" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="2 2" />
            <line x1="8" y1="72" x2="18" y2="70" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="2 2" />
            <line x1="8" y1="46" x2="10" y2="76" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="2 2" />
            <line x1="16" y1="44" x2="18" y2="72" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="2 2" />

            {/* Ring Frame Jaring Besi */}
            <ellipse
              cx="13"
              cy="45"
              rx="13"
              ry="17"
              fill="none"
              stroke="#0A0A0A"
              strokeWidth="3.5"
              transform="rotate(-15 13 45)"
            />

            {/* Lengan Kiri Neo-Brutalist */}
            <path
              d="M 42 110 Q 28 116 18 126"
              stroke="#0A0A0A"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            {/* Kepalan Tangan Kiri Kuning (#FFD60A) */}
            <circle
              cx="18"
              cy="126"
              r="6.5"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="3.5"
            />
          </g>

          {/* ============================================================== */}
          {/* LAYER 7: TANGAN KANAN & TOPLES SPESIMEN KACA DENGAN ROBOT BUG  */}
          {/* ============================================================== */}
          <g className="qa-animated-jar">
            {/* Lengan Kanan Menjulur */}
            <path
              d="M 148 108 Q 164 114 174 116"
              stroke="#0A0A0A"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />

            {/* Hard Shadow Toples Kaca Spesimen */}
            <rect x="171" y="68" width="24" height="42" rx="4" fill="#0A0A0A" />

            {/* Badan Toples Kaca Transparan Neo-Brutalism */}
            <rect
              x="168"
              y="65"
              width="24"
              height="42"
              rx="4"
              fill="#00F0FF"
              fillOpacity="0.22"
              stroke="#0A0A0A"
              strokeWidth="3"
            />

            {/* Leher Toples Kaca */}
            <rect
              x="171"
              y="60"
              width="18"
              height="6"
              rx="1.5"
              fill="#00F0FF"
              fillOpacity="0.3"
              stroke="#0A0A0A"
              strokeWidth="2"
            />

            {/* Tutup Toples Berulir Logam Oranye (#FF8A3D) */}
            <rect
              x="169"
              y="54"
              width="22"
              height="8"
              rx="2"
              fill="#FF8A3D"
              stroke="#0A0A0A"
              strokeWidth="2.5"
            />
            {/* Ulir Karet Tutup Toples */}
            <line x1="171" y1="57" x2="189" y2="57" stroke="#0A0A0A" strokeWidth="1.2" />
            <line x1="171" y1="60" x2="189" y2="60" stroke="#0A0A0A" strokeWidth="1.2" />

            {/* Garis Kilau Kaca Reflektif Putih */}
            <line
              x1="172"
              y1="69"
              x2="172"
              y2="101"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeOpacity="0.8"
            />
            <line
              x1="175"
              y1="71"
              x2="175"
              y2="83"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeOpacity="0.6"
            />

            {/* Label Neo-Brutalist "BUG" di Badan Toples */}
            <rect
              x="172"
              y="74"
              width="16"
              height="7"
              rx="1"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="1"
            />
            <text
              x="180"
              y="79.5"
              fill="#0A0A0A"
              fontSize="4.5"
              fontWeight="900"
              textAnchor="middle"
              fontFamily="monospace"
            >
              BUG#1
            </text>

            {/* ROBOT BUG KEPIK MERAH TERKURUNG DI DALAM TOPLES KACA */}
            <g className="qa-animated-trapped-bug">
              {/* Hard Shadow Kepik */}
              <ellipse cx="181" cy="91" rx="5.5" ry="4.5" fill="#0A0A0A" />
              {/* Bodi Punggung Kepik Pink-Merah (#FF5C8A) */}
              <ellipse
                cx="179.5"
                cy="89.5"
                rx="5"
                ry="4"
                fill="#FF5C8A"
                stroke="#0A0A0A"
                strokeWidth="1.5"
              />
              {/* Garis Belah Sayap Kepik */}
              <line x1="175" y1="89.5" x2="184" y2="89.5" stroke="#0A0A0A" strokeWidth="1.2" />
              {/* Titik Kepik Digital */}
              <circle cx="178" cy="88" r="0.9" fill="#0A0A0A" />
              <circle cx="181" cy="88" r="0.9" fill="#0A0A0A" />
              <circle cx="178" cy="91" r="0.9" fill="#0A0A0A" />
              <circle cx="181" cy="91" r="0.9" fill="#0A0A0A" />
              {/* Kepala Kepik Hitam */}
              <circle cx="175" cy="89.5" r="2.2" fill="#0A0A0A" />
              {/* Antena Kepik */}
              <path d="M 173.5 88 Q 172 86 170.5 86.5" stroke="#0A0A0A" strokeWidth="1" fill="none" />
              <path d="M 173.5 91 Q 172 93 170.5 92.5" stroke="#0A0A0A" strokeWidth="1" fill="none" />
              {/* Kaki Kepik Terkurung di Kaca */}
              <line x1="177" y1="85.5" x2="175.5" y2="84" stroke="#0A0A0A" strokeWidth="1" />
              <line x1="180" y1="85.5" x2="180" y2="83.5" stroke="#0A0A0A" strokeWidth="1" />
              <line x1="183" y1="85.5" x2="184.5" y2="84" stroke="#0A0A0A" strokeWidth="1" />
              <line x1="177" y1="93.5" x2="175.5" y2="95" stroke="#0A0A0A" strokeWidth="1" />
              <line x1="180" y1="93.5" x2="180" y2="95.5" stroke="#0A0A0A" strokeWidth="1" />
              <line x1="183" y1="93.5" x2="184.5" y2="95" stroke="#0A0A0A" strokeWidth="1" />
              {/* Mata Pusing "X" Digital Kepik */}
              <path d="M 174 88.5 L 175.5 90 M 175.5 88.5 L 174 90" stroke="#FFFFFF" strokeWidth="0.8" />
            </g>

            {/* Cairan Pengawet / Gelembung Mikro Spesimen */}
            <circle cx="174" cy="96" r="1" fill="#00F0FF" />
            <circle cx="186" cy="98" r="1.2" fill="#00F0FF" />
            <circle cx="184" cy="71" r="0.8" fill="#FFFFFF" />

            {/* Kepalan Tangan Kanan Kuning (#FFD60A) Memegang Erat Samping Toples */}
            <circle
              cx="174"
              cy="116"
              r="6.5"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="3.5"
            />
          </g>

          {/* Partikel Sparkle Status PASS Melayang */}
          <circle cx="34" cy="38" r="2" fill="#2EE59D" />
          <circle cx="170" cy="46" r="2" fill="#FFD60A" />
          <circle cx="162" cy="38" r="1.5" fill="#00F0FF" />
        </g>
      </svg>
    </div>
  );
}
