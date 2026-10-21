"use client";

import React from "react";

export interface GameDeveloperMascotProps {
  size?: number;
  className?: string;
  animated?: boolean;
  state?: "idle" | "hover" | "happy";
}

/**
 * Maskot Role: Game Developer — "The Pixel Mage"
 * Identitas: Sang Penyihir Pixel & Pencipta Dunia Virtual
 * Ciri Khas: Topi penyihir Pixel Mage bertingkat hijau mint, tongkat sihir berkepala
 * retro gamepad arcade dengan magic orb bersinar, partikel pixel sihir 8-bit,
 * dan mata kilau RPG.
 */
export function GameDeveloperMascot({
  size = 200,
  className = "",
  animated = true,
  state = "idle",
}: GameDeveloperMascotProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none group ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Maskot Game Developer — The Pixel Mage: Papan penunjuk jalan neo-brutalism dengan topi penyihir arcade pixel, tongkat sihir retro gamepad, bola kristal bercahaya, dan partikel pixel 8-bit"
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
            @keyframes gm-float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-4px); }
            }
            @keyframes gm-orb-glow {
              0%, 100% { transform: scale(1); filter: drop-shadow(0 0 4px #00F0FF); }
              50% { transform: scale(1.12); filter: drop-shadow(0 0 10px #00F0FF); }
            }
            @keyframes gm-pixel-spin {
              0% { transform: rotate(0deg) translateY(0px); }
              50% { transform: rotate(180deg) translateY(-3px); }
              100% { transform: rotate(360deg) translateY(0px); }
            }
            @keyframes gm-star-blink {
              0%, 100% { opacity: 0.4; transform: scale(0.85); }
              50% { opacity: 1; transform: scale(1.25); }
            }
            .gm-animated-body {
              animation: ${animated ? "gm-float 3s ease-in-out infinite" : "none"};
              transform-origin: center bottom;
            }
            .gm-animated-orb {
              animation: ${animated ? "gm-orb-glow 2.2s ease-in-out infinite" : "none"};
              transform-origin: 172px 28px;
            }
            .gm-animated-pixel1 {
              animation: ${animated ? "gm-pixel-spin 4s linear infinite" : "none"};
              transform-origin: 184px 18px;
            }
            .gm-animated-pixel2 {
              animation: ${animated ? "gm-star-blink 2s ease-in-out infinite" : "none"};
              transform-origin: 24px 74px;
            }
            .gm-animated-pixel3 {
              animation: ${animated ? "gm-star-blink 2.6s ease-in-out infinite 0.6s" : "none"};
              transform-origin: 188px 74px;
            }
          `}</style>
        </defs>

        {/* CONTAINER UTAMA DENGAN ANIMASI FLOAT */}
        <g className="gm-animated-body transition-transform duration-300 group-hover:scale-105">
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
          {/* Sol Sepatu Kiri */}
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
          {/* Sol Sepatu Kanan */}
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
          <rect x="124" y="106" width="12" height="7" rx="2" fill="#FF5C8A" />

          {/* ============================================================== */}
          {/* LAYER 3: MATA EKSPRESIF ALA RPG (KILAU BINTANG PIXEL)          */}
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
          {/* Bintang Kilau Pixel RPG 4-Titik (Cyan #00F0FF) */}
          <polygon
            points="70,83 71.5,86 74.5,87.5 71.5,89 70,92 68.5,89 65.5,87.5 68.5,86"
            fill="#00F0FF"
          />
          {/* Kilau Putih Kecil */}
          <circle cx="67" cy="84" r="1.5" fill="#FFFFFF" />

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
          {/* Bintang Kilau Pixel RPG 4-Titik (Kuning #FFD60A) */}
          <polygon
            points="114,83 115.5,86 118.5,87.5 115.5,89 114,92 112.5,89 109.5,87.5 112.5,86"
            fill="#FFD60A"
          />
          {/* Kilau Putih Kecil */}
          <circle cx="111" cy="84" r="1.5" fill="#FFFFFF" />

          {/* Alis Penasaran & Cerdik */}
          <path
            d="M 58 70 Q 69 66 79 69"
            stroke="#0A0A0A"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 103 69 Q 113 65 124 70"
            stroke="#0A0A0A"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Mulut Senyum Petualang */}
          <path
            d="M 87 114 Q 94 123 102 114"
            stroke="#0A0A0A"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Kerah Jubah Penyihir (Ungu/Mint dengan Pin Play Button ▶) */}
          <polygon
            points="76,144 94,144 86,132"
            fill="#2EE59D"
            stroke="#0A0A0A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <polygon
            points="112,144 94,144 102,132"
            fill="#2EE59D"
            stroke="#0A0A0A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Pin Tombol Arcade Play (Segitiga Kuning) */}
          <polygon
            points="92,135 98,139 92,143"
            fill="#FFD60A"
            stroke="#0A0A0A"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          {/* ============================================================== */}
          {/* LAYER 4: TOPI PENYIHIR PIXEL ARCADE (PIXEL MAGE HAT)           */}
          {/* ============================================================== */}
          {/* Hard Shadow Topi */}
          <path
            d="M 28 54 C 28 54 44 48 94 48 C 144 48 160 54 160 54 L 140 28 L 126 12 L 102 6 L 80 14 L 62 30 Z"
            fill="#0A0A0A"
          />

          {/* Brim / Lingkar Bawah Topi yang Lebar */}
          <ellipse
            cx="94"
            cy="48"
            rx="66"
            ry="11"
            fill="#2EE59D"
            stroke="#0A0A0A"
            strokeWidth="4"
          />

          {/* Pita Topi Pink (#FF5C8A) */}
          <polygon
            points="54,46 134,46 128,36 60,36"
            fill="#FF5C8A"
            stroke="#0A0A0A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Kerucut Topi Undakan Pixel Tingkat 1 (Bawah) */}
          <polygon
            points="60,36 128,36 120,24 68,24"
            fill="#2EE59D"
            stroke="#0A0A0A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Kerucut Topi Undakan Pixel Tingkat 2 (Tengah) */}
          <polygon
            points="68,24 120,24 110,14 78,14"
            fill="#2EE59D"
            stroke="#0A0A0A"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Pucuk Topi Pixel yang Melengkung Jenaka ke Kiri */}
          <polygon
            points="78,14 110,14 104,7 82,7 66,10 68,16 80,14"
            fill="#2EE59D"
            stroke="#0A0A0A"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Gesper Pixel Emas pada Pita Topi */}
          <rect
            x="88"
            y="35"
            width="12"
            height="12"
            rx="2"
            fill="#FFD60A"
            stroke="#0A0A0A"
            strokeWidth="2.5"
          />
          <rect x="92" y="39" width="4" height="4" fill="#0A0A0A" />

          {/* ============================================================== */}
          {/* LAYER 5: TANGAN KIRI MELAMBAI SIHIR (GESTUR CASTER)            */}
          {/* ============================================================== */}
          <path
            d="M 42 110 Q 24 108 20 96"
            stroke="#0A0A0A"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          {/* Tangan Kiri Caster Terbuka */}
          <circle
            cx="18"
            cy="94"
            r="7.5"
            fill="#FFD60A"
            stroke="#0A0A0A"
            strokeWidth="3.5"
          />
          {/* Jari-Jari Caster */}
          <circle cx="13" cy="88" r="2.5" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="1.5" />
          <circle cx="18" cy="85" r="2.5" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="1.5" />
          <circle cx="24" cy="86" r="2.5" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="1.5" />

          {/* ============================================================== */}
          {/* LAYER 6: TONGKAT SIHIR RETRO GAMEPAD & ORB KRISTAL (KANAN)     */}
          {/* ============================================================== */}
          {/* Lengan Kanan Menjulur Memegang Tongkat */}
          <path
            d="M 148 114 Q 160 116 168 112"
            stroke="#0A0A0A"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />

          {/* Batang Tongkat Sihir Kayu Berbalut Strip */}
          {/* Hard Shadow Tongkat */}
          <line
            x1="174"
            y1="146"
            x2="174"
            y2="46"
            stroke="#0A0A0A"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Batang Tongkat Ungu / Hitam Tegas */}
          <line
            x1="170"
            y1="144"
            x2="170"
            y2="44"
            stroke="#0A0A0A"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Aksen Spiral Emas di Tongkat */}
          <line x1="168" y1="80" x2="172" y2="76" stroke="#FFD60A" strokeWidth="2.5" />
          <line x1="168" y1="94" x2="172" y2="90" stroke="#FFD60A" strokeWidth="2.5" />
          <line x1="168" y1="126" x2="172" y2="122" stroke="#FFD60A" strokeWidth="2.5" />

          {/* Kepala Tongkat: Retro Gamepad Console */}
          {/* Hard Shadow Gamepad */}
          <rect
            x="152"
            y="42"
            width="38"
            height="22"
            rx="5"
            fill="#0A0A0A"
          />
          {/* Bodi Gamepad Hitam Arcade */}
          <rect
            x="148"
            y="38"
            width="38"
            height="22"
            rx="5"
            fill="#18181B"
            stroke="#0A0A0A"
            strokeWidth="3.5"
          />
          {/* D-Pad Cross Retro (Kiri Gamepad) */}
          <path
            d="M 154 48 H 157 V 45 H 159 V 48 H 162 V 50 H 159 V 53 H 157 V 50 H 154 Z"
            fill="#FFFFFF"
          />
          {/* Tombol Arcade A & B (Kanan Gamepad) */}
          <circle cx="174" cy="51" r="2.8" fill="#FF5C8A" stroke="#0A0A0A" strokeWidth="1" />
          <circle cx="180" cy="46" r="2.8" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="1" />

          {/* Kepalan Tangan Kanan Mencengkeram Batang Tongkat */}
          <circle
            cx="170"
            cy="110"
            r="7.5"
            fill="#FFD60A"
            stroke="#0A0A0A"
            strokeWidth="3.5"
          />

          {/* Bola Kristal Magic Orb (Melayang di Pucuk Gamepad) */}
          <g className="gm-animated-orb">
            {/* Cincin Aura Sihir Luar Putus-Putus */}
            <circle
              cx="167"
              cy="22"
              r="14"
              fill="none"
              stroke="#00F0FF"
              strokeWidth="1.8"
              strokeDasharray="4 3"
              opacity="0.8"
            />
            {/* Hard Shadow Orb */}
            <circle cx="170" cy="24" r="10" fill="#0A0A0A" />
            {/* Bola Kristal Cyan Elektrik (#00F0FF) */}
            <circle
              cx="167"
              cy="22"
              r="10"
              fill="#00F0FF"
              stroke="#0A0A0A"
              strokeWidth="3"
            />
            {/* Pantulan Kilau Kristal Putih */}
            <circle cx="164" cy="19" r="3.2" fill="#FFFFFF" />
            <circle cx="169" cy="24" r="1.5" fill="#FFFFFF" />
          </g>

          {/* ============================================================== */}
          {/* LAYER 7: PARTIKEL PIXEL MAGIC & BINTANG 8-BIT MELAYANG         */}
          {/* ============================================================== */}
          {/* Pixel Cube 1 (Hijau Mint Melayang di Atas Kanan) */}
          <g className="gm-animated-pixel1">
            <rect
              x="184"
              y="16"
              width="7"
              height="7"
              fill="#2EE59D"
              stroke="#0A0A0A"
              strokeWidth="2"
            />
          </g>

          {/* Pixel Cube 2 (Pink Magenta Melayang di Dekat Tongkat) */}
          <rect
            x="186"
            y="68"
            width="6"
            height="6"
            fill="#FF5C8A"
            stroke="#0A0A0A"
            strokeWidth="2"
            className="gm-animated-pixel3"
          />

          {/* Pixel Cube 3 (Kuning Emas di Atas Kiri) */}
          <rect
            x="38"
            y="32"
            width="6"
            height="6"
            fill="#FFD60A"
            stroke="#0A0A0A"
            strokeWidth="2"
          />

          {/* Bintang Arcade 8-Bit di Sisi Kiri (Dekat Tangan Caster) */}
          <g className="gm-animated-pixel2">
            <polygon
              points="24,68 26,73 31,75 26,77 24,82 22,77 17,75 22,73"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="1.8"
            />
          </g>

          {/* Simbol Hati Nyawa Retro Arcade (8-bit Heart Mini di Kiri Bawah) */}
          <path
            d="M 22 124 L 20 122 A 2.5 2.5 0 0 1 24 119 A 2.5 2.5 0 0 1 28 122 L 26 124 L 24 126 Z"
            fill="#FF5C8A"
            stroke="#0A0A0A"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}
