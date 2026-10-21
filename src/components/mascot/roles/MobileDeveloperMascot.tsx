"use client";

import React from "react";

export interface MobileDeveloperMascotProps {
  size?: number | string;
  className?: string;
  animated?: boolean;
  animate?: boolean;
  state?: "idle" | "hover" | "happy";
}

/**
 * Maskot Role: Mobile Developer — "The Artisan"
 * Identitas: Sang Perajin Aplikasi Saku & Pengalaman Sentuhan Presisi
 * Ciri Khas: Topi snapback miring pink-cyan dengan emblem smartphone,
 * smartphone raksasa modern dipegang erat oleh tangan kiri di samping tubuh (y=128, di bawah mulut sehingga senyum terlihat bersih),
 * tangan kanan melakukan gestur tapping di atas permukaan layar (tampak depan/over-the-screen tanpa menembus bodi ponsel),
 * serta efek touch ripple interaktif konsentris.
 */
export function MobileDeveloperMascot({
  size = 200,
  className = "",
  animated = true,
  animate,
  state = "idle",
}: MobileDeveloperMascotProps) {
  const isAnimated = animate !== undefined ? animate : animated;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none group ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Maskot Mobile Developer — The Artisan: Papan penunjuk jalan neo-brutalism dengan topi snapback miring, smartphone modern dipegang erat di samping, gestur tangan mengetuk layar di atas permukaan, dan gelombang touch ripple"
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
            @keyframes mob-phone-sway {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(3deg) translateY(-1px); }
            }
            @keyframes mob-tap {
              0%, 100% { transform: translateY(0px) scale(1); }
              50% { transform: translateY(3px) scale(0.97); }
            }
            @keyframes mob-ripple-1 {
              0% { r: 4px; opacity: 1; stroke-width: 3px; }
              100% { r: 20px; opacity: 0; stroke-width: 0.5px; }
            }
            @keyframes mob-ripple-2 {
              0% { r: 4px; opacity: 0; stroke-width: 2.5px; }
              30% { opacity: 0.8; stroke-width: 2px; }
              100% { r: 28px; opacity: 0; stroke-width: 0.5px; }
            }
            .mob-animated-body {
              animation: ${isAnimated ? "mob-float 3.5s ease-in-out infinite" : "none"};
              transform-origin: center bottom;
            }
            .mob-animated-phone {
              animation: ${isAnimated ? "mob-phone-sway 3s ease-in-out infinite" : "none"};
              transform-origin: 154px 138px;
            }
            .mob-animated-tapper {
              animation: ${isAnimated ? "mob-tap 1.6s ease-in-out infinite" : "none"};
              transform-origin: 44px 116px;
            }
            .mob-animated-ripple1 {
              animation: ${isAnimated ? "mob-ripple-1 1.6s cubic-bezier(0.1, 0.8, 0.3, 1) infinite" : "none"};
              transform-origin: 148px 106px;
            }
            .mob-animated-ripple2 {
              animation: ${isAnimated ? "mob-ripple-2 1.6s cubic-bezier(0.1, 0.8, 0.3, 1) 0.35s infinite" : "none"};
              transform-origin: 148px 106px;
            }
          `}</style>
        </defs>

        {/* CONTAINER UTAMA DENGAN ANIMASI FLOAT */}
        <g className="mob-animated-body transition-transform duration-300 group-hover:scale-105">
          {/* ============================================================== */}
          {/* LAYER 1: KAKI & SEPATU HITAM DENGAN SOL PUTIH                  */}
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
          {/* LAYER 2: BADAN PAPAN RAMBU KUNING NEO-BRUTALISM                */}
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

          {/* Mulut Senyum Terbuka Antusias (Bersih & Terlihat Jelas) */}
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
          {/* LAYER 4: SMARTPHONE MODERN DI SISI KANAN & TANGAN KIRI MENYANGGA*/}
          {/* ============================================================== */}
          <g className="mob-animated-phone">
            {/* Lengan Kiri Berada di Bawah Mulut (y=124 ke 132), Menjulur ke Samping Tubuh */}
            <path
              d="M 126 126 Q 138 134 148 130"
              stroke="#0A0A0A"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />

            {/* Hard Shadow Smartphone */}
            <rect
              x="134"
              y="58"
              width="52"
              height="94"
              rx="8"
              fill="#0A0A0A"
            />
            {/* Bodi Smartphone Putih Tegas */}
            <rect
              x="128"
              y="52"
              width="52"
              height="94"
              rx="8"
              fill="#FFFFFF"
              stroke="#0A0A0A"
              strokeWidth="4"
            />

            {/* Layar OLED Gelap Smartphone */}
            <rect
              x="132"
              y="56"
              width="44"
              height="86"
              rx="5"
              fill="#18181B"
              stroke="#0A0A0A"
              strokeWidth="2"
            />

            {/* Dynamic Island / Notch Speaker */}
            <rect
              x="146"
              y="60"
              width="16"
              height="4.5"
              rx="2.2"
              fill="#0A0A0A"
            />

            {/* UI Card di Layar Smartphone */}
            {/* App Header Banner Pink */}
            <rect
              x="135"
              y="68"
              width="38"
              height="16"
              rx="3"
              fill="#FF5C8A"
              stroke="#0A0A0A"
              strokeWidth="1.5"
            />
            {/* Teks Mini App Header */}
            <line x1="139" y1="73" x2="155" y2="73" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            <line x1="139" y1="78" x2="163" y2="78" stroke="#FFD60A" strokeWidth="1.5" strokeLinecap="round" />

            {/* Grid App Icons Warna-Warni */}
            <rect x="136" y="89" width="10" height="10" rx="2.5" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="1.5" />
            <rect x="150" y="89" width="10" height="10" rx="2.5" fill="#00F0FF" stroke="#0A0A0A" strokeWidth="1.5" />
            <rect x="164" y="89" width="8" height="10" rx="2.5" fill="#FF8A3D" stroke="#0A0A0A" strokeWidth="1.5" />

            {/* Target Interactive Card (Target Tapping di Layar) */}
            <rect
              x="136"
              y="104"
              width="36"
              height="18"
              rx="3"
              fill="#00F0FF"
              stroke="#0A0A0A"
              strokeWidth="1.5"
            />
            <rect x="139" y="108" width="16" height="4" rx="1" fill="#0A0A0A" />
            <circle cx="163" cy="113" r="3.5" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="1" />

            {/* Home Indicator Bar Putih */}
            <line
              x1="146"
              y1="136"
              x2="162"
              y2="136"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Tangan Kiri Menyangga Smartphone dari Bawah/Samping (y=130 - Tidak Menutupi Mulut) */}
            <circle
              cx="146"
              cy="130"
              r="7"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="3.5"
            />
          </g>

          {/* ============================================================== */}
          {/* LAYER 5: TOUCH RIPPLE EFES SENTUHAN KONSENTRIS                 */}
          {/* ============================================================== */}
          <g>
            {/* Gelombang Ripple 1 (Cyan) */}
            <circle
              cx="148"
              cy="106"
              r="8"
              fill="none"
              stroke="#00F0FF"
              strokeWidth="2.5"
              className="mob-animated-ripple1"
            />
            {/* Gelombang Ripple 2 (Hijau Mint Putus-Putus) */}
            <circle
              cx="148"
              cy="106"
              r="16"
              fill="none"
              stroke="#2EE59D"
              strokeWidth="2"
              strokeDasharray="4 3"
              className="mob-animated-ripple2"
            />

            {/* Sparkle Sentuhan Tapping (4-Point Star) */}
            <polygon
              points="148,100 150,105 155,106 150,107 148,112 146,107 141,106 146,105"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="1.5"
            />
          </g>

          {/* ============================================================== */}
          {/* LAYER 6: TANGAN KANAN MENGETUK LAYAR (DI ATAS PERMUKAAN TANPA MENEMBUS) */}
          {/* ============================================================== */}
          <g className="mob-animated-tapper">
            {/* Lengan Kanan Menjulur dari Sisi Kiri Tubuh Melintasi Dada Menuju Depan Layar */}
            <path
              d="M 44 116 Q 88 126 128 112"
              stroke="#0A0A0A"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />

            {/* Kepalan Tangan Kanan Kuning di Depan Layar */}
            <circle
              cx="132"
              cy="110"
              r="7.5"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="3.5"
            />

            {/* Jari Telunjuk Mengetuk Permukaan Layar (Berada di Lapisan Teratas) */}
            <path
              d="M 136 108 L 148 106 L 146 111 L 135 113 Z"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Jempol Siap Tapping Melengkung */}
            <path
              d="M 130 104 Q 134 98 140 100"
              stroke="#0A0A0A"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* ============================================================== */}
          {/* LAYER 7: AKSEN SIMBOL WIRELESS / 5G SIGNAL MELAYANG            */}
          {/* ============================================================== */}
          <g transform="translate(18, 54)">
            <path d="M 4 14 A 12 12 0 0 1 20 14" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 8 18 A 6 6 0 0 1 16 18" stroke="#00F0FF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="12" cy="22" r="2" fill="#FF5C8A" stroke="#0A0A0A" strokeWidth="1.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}
