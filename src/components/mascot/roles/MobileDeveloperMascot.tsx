"use client";

import React from "react";

export interface MobileDeveloperMascotProps {
  size?: number;
  className?: string;
  animated?: boolean;
  state?: "idle" | "hover" | "happy";
}

/**
 * Maskot Role: Mobile Developer — "The Screen Tapper"
 * Identitas: Sang Pengetuk Layar & Penguasa Genggaman Gawai
 * Ciri Khas: Topi snapback miring pink-cyan, smartphone raksasa dengan antarmuka aplikasi hidup,
 * tangan tapping dengan ripple sentuhan konsentris, dan ikon gawai responsif.
 */
export function MobileDeveloperMascot({
  size = 200,
  className = "",
  animated = true,
  state = "idle",
}: MobileDeveloperMascotProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none group ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Maskot Mobile Developer — The Screen Tapper: Papan penunjuk jalan neo-brutalism dengan topi snapback keren, smartphone berlayar aplikasi, dan gestur tapping dengan ripple sentuh"
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
            @keyframes mob-float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-3.5px); }
            }
            @keyframes mob-tap {
              0%, 100% { transform: translateX(0px) translateY(0px) rotate(0deg); }
              35% { transform: translateX(4px) translateY(-1px) rotate(2deg); }
              45% { transform: translateX(6px) translateY(1px) rotate(-1deg); }
              60% { transform: translateX(1px) translateY(0px) rotate(0deg); }
            }
            @keyframes mob-ripple {
              0% { r: 4px; opacity: 1; stroke-width: 2.5px; }
              50% { r: 14px; opacity: 0.8; stroke-width: 2px; }
              100% { r: 24px; opacity: 0; stroke-width: 1px; }
            }
            @keyframes mob-phone {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(-1.5deg) translateY(-1px); }
            }
            .mob-animated-body {
              animation: ${animated ? "mob-float 3.2s ease-in-out infinite" : "none"};
              transform-origin: center bottom;
            }
            .mob-animated-tapper {
              animation: ${animated ? "mob-tap 2.4s ease-in-out infinite" : "none"};
              transform-origin: 70px 110px;
            }
            .mob-animated-ripple1 {
              animation: ${animated ? "mob-ripple 2.4s ease-out infinite" : "none"};
              transform-origin: 132px 100px;
            }
            .mob-animated-ripple2 {
              animation: ${animated ? "mob-ripple 2.4s ease-out infinite 0.4s" : "none"};
              transform-origin: 132px 100px;
            }
            .mob-animated-phone {
              animation: ${animated ? "mob-phone 3.2s ease-in-out infinite" : "none"};
              transform-origin: 154px 110px;
            }
          `}</style>
        </defs>

        {/* CONTAINER UTAMA DENGAN ANIMASI FLOAT */}
        <g className="mob-animated-body transition-transform duration-300 group-hover:scale-105">
          {/* ============================================================== */}
          {/* LAYER 1: KAKI & SEPATU SNEAKERS HITAM SOL PUTIH                */}
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
          {/* Sol Sneakers Kiri */}
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
          {/* Sol Sneakers Kanan */}
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
          {/* LAYER 2: BADAN UTAMA PAPAN RAMBU (KUNING NEO-BRUTALISM)       */}
          {/* ============================================================== */}
          {/* Hard Shadow Badan */}
          <rect
            x="48"
            y="56"
            width="106"
            height="94"
            rx="4"
            fill="#0A0A0A"
          />

          {/* Badan Papan Rambu Kuning */}
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

          {/* Marka Jalan Putus-Putus */}
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
          <rect x="122" y="106" width="12" height="7" rx="2" fill="#FF5C8A" />

          {/* Mata Kiri (Fokus Menatap Layar) */}
          <rect
            x="58"
            y="76"
            width="20"
            height="24"
            rx="4"
            fill="#FFFFFF"
            stroke="#0A0A0A"
            strokeWidth="3.5"
          />
          {/* Pupil Kiri Melirik ke Kanan (Arah Smartphone) */}
          <rect x="66" y="82" width="9" height="12" rx="2" fill="#0A0A0A" />
          <circle cx="68.5" cy="84.5" r="1.5" fill="#FFFFFF" />
          <circle cx="72" cy="89.5" r="1.2" fill="#00F0FF" />

          {/* Mata Kanan (Melirik Antusias ke Gawai) */}
          <rect
            x="96"
            y="76"
            width="20"
            height="24"
            rx="4"
            fill="#FFFFFF"
            stroke="#0A0A0A"
            strokeWidth="3.5"
          />
          {/* Pupil Kanan Melirik Lebih Dekat ke Gawai */}
          <rect x="105" y="82" width="9" height="12" rx="2" fill="#0A0A0A" />
          <circle cx="107.5" cy="84.5" r="1.5" fill="#FFFFFF" />
          <circle cx="111" cy="89.5" r="1.2" fill="#00F0FF" />

          {/* Alis Energik Keren */}
          <path
            d="M 56 70 L 78 72"
            stroke="#0A0A0A"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M 98 72 L 118 69"
            stroke="#0A0A0A"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Mulut Senyum Terbuka Antusias */}
          <path
            d="M 82 112 Q 90 122 98 112 Z"
            fill="#FF5C8A"
            stroke="#0A0A0A"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Gigi Putih Neo-Brutalist */}
          <rect x="85" y="112" width="10" height="3" fill="#FFFFFF" />

          {/* ============================================================== */}
          {/* LAYER 3: TOPI SNAPBACK MIRING PINK & CYAN                      */}
          {/* ============================================================== */}
          {/* Hard Shadow Topi */}
          <path
            d="M 44 46 C 44 22 136 22 136 46 Z"
            fill="#0A0A0A"
          />
          {/* Kubah Topi Pink Magenta (#FF5C8A) */}
          <path
            d="M 44 42 C 44 18 134 18 134 42 Z"
            fill="#FF5C8A"
            stroke="#0A0A0A"
            strokeWidth="4"
          />
          {/* Visor Datar Snapback Miring ke Kiri (Cyan #00F0FF) */}
          <polygon
            points="24,38 92,38 88,46 20,46"
            fill="#00F0FF"
            stroke="#0A0A0A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Kancing Atas Topi */}
          <circle
            cx="89"
            cy="18"
            r="4.5"
            fill="#FFD60A"
            stroke="#0A0A0A"
            strokeWidth="2.5"
          />
          {/* Emblem Mobile Phone di Depan Topi */}
          <rect
            x="84"
            y="26"
            width="10"
            height="13"
            rx="2"
            fill="#FFFFFF"
            stroke="#0A0A0A"
            strokeWidth="2"
          />
          <circle cx="89" cy="35" r="1" fill="#0A0A0A" />

          {/* ============================================================== */}
          {/* LAYER 4: SMARTPHONE RAKSASA MODERN (SISI KANAN)               */}
          {/* ============================================================== */}
          <g className="mob-animated-phone">
            {/* Lengan Kiri Menyangga Smartphone */}
            <path
              d="M 124 122 Q 138 132 144 120"
              stroke="#0A0A0A"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />

            {/* Hard Shadow Smartphone */}
            <rect
              x="132"
              y="58"
              width="54"
              height="96"
              rx="8"
              fill="#0A0A0A"
            />
            {/* Bodi Smartphone Putih Tegas */}
            <rect
              x="126"
              y="52"
              width="54"
              height="96"
              rx="8"
              fill="#FFFFFF"
              stroke="#0A0A0A"
              strokeWidth="4"
            />

            {/* Layar OLED Gelap Smartphone */}
            <rect
              x="130"
              y="56"
              width="46"
              height="88"
              rx="5"
              fill="#18181B"
              stroke="#0A0A0A"
              strokeWidth="2"
            />

            {/* Dynamic Island / Notch Speaker */}
            <rect
              x="145"
              y="60"
              width="16"
              height="4.5"
              rx="2.2"
              fill="#0A0A0A"
            />

            {/* UI Card di Layar Smartphone */}
            {/* App Header Banner Pink */}
            <rect
              x="134"
              y="69"
              width="38"
              height="16"
              rx="3"
              fill="#FF5C8A"
              stroke="#0A0A0A"
              strokeWidth="1.5"
            />
            {/* Teks Mini App Header */}
            <line x1="138" y1="74" x2="154" y2="74" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            <line x1="138" y1="79" x2="162" y2="79" stroke="#FFD60A" strokeWidth="1.5" strokeLinecap="round" />

            {/* Grid 4 App Icons Warna-Warni */}
            {/* Icon 1: Hijau Mint */}
            <rect x="135" y="90" width="10" height="10" rx="2.5" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="1.5" />
            {/* Icon 2: Cyan */}
            <rect x="149" y="90" width="10" height="10" rx="2.5" fill="#00F0FF" stroke="#0A0A0A" strokeWidth="1.5" />
            {/* Icon 3: Oranye */}
            <rect x="163" y="90" width="8" height="10" rx="2.5" fill="#FF8A3D" stroke="#0A0A0A" strokeWidth="1.5" />

            {/* Main Interactive Button Card (Target Tapping) */}
            <rect
              x="135"
              y="106"
              width="36"
              height="18"
              rx="3"
              fill="#00F0FF"
              stroke="#0A0A0A"
              strokeWidth="1.5"
            />
            <rect x="138" y="110" width="16" height="4" rx="1" fill="#0A0A0A" />
            <circle cx="162" cy="115" r="3.5" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="1" />

            {/* Home Indicator Bar Putih */}
            <line
              x1="145"
              y1="138"
              x2="161"
              y2="138"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Tangan Kiri Menyangga Smartphone */}
            <circle
              cx="140"
              cy="124"
              r="7"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="3.5"
            />
          </g>

          {/* ============================================================== */}
          {/* LAYER 5: TOUCH RIPPLE EFES SENTUHAN KONSENTRIS                 */}
          {/* ============================================================== */}
          {/* Gelombang Ripple 1 (Cyan) */}
          <circle
            cx="132"
            cy="104"
            r="8"
            fill="none"
            stroke="#00F0FF"
            strokeWidth="2.5"
            className="mob-animated-ripple1"
          />
          {/* Gelombang Ripple 2 (Hijau Mint Putus-Putus) */}
          <circle
            cx="132"
            cy="104"
            r="16"
            fill="none"
            stroke="#2EE59D"
            strokeWidth="2"
            strokeDasharray="4 3"
            className="mob-animated-ripple2"
          />

          {/* Sparkle Sentuhan Tapping (4-Point Star) */}
          <polygon
            points="132,98 134,103 139,104 134,105 132,110 130,105 125,104 130,103"
            fill="#FFD60A"
            stroke="#0A0A0A"
            strokeWidth="1.5"
          />

          {/* ============================================================== */}
          {/* LAYER 6: TANGAN KANAN DENGAN GESTUR TAPPING (JARI TELUNJUK)    */}
          {/* ============================================================== */}
          <g className="mob-animated-tapper">
            {/* Lengan Kanan Menjulur dari Badan ke Layar */}
            <path
              d="M 44 116 Q 80 114 116 106"
              stroke="#0A0A0A"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />

            {/* Kepalan Tangan Kuning */}
            <circle
              cx="114"
              cy="106"
              r="8"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="3.5"
            />

            {/* Jari Telunjuk Mengetuk Layar Smartphone */}
            <path
              d="M 118 102 L 132 103 L 130 108 L 118 107 Z"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="3"
              strokeLinejoin="round"
            />

            {/* Jempol Siap Tapping */}
            <path
              d="M 112 100 Q 116 94 122 96"
              stroke="#0A0A0A"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* ============================================================== */}
          {/* LAYER 7: AKSEN SIMBOL WIRELESS / 5G SIGNAL MELAYANG            */}
          {/* ============================================================== */}
          {/* Sinyal Wi-Fi di Kiri Atas */}
          <g transform="translate(18, 54)">
            {/* Gelombang 1 */}
            <path d="M 4 14 A 12 12 0 0 1 20 14" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Gelombang 2 */}
            <path d="M 8 18 A 6 6 0 0 1 16 18" stroke="#00F0FF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Titik Pemancar */}
            <circle cx="12" cy="22" r="2" fill="#FF5C8A" stroke="#0A0A0A" strokeWidth="1.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}
