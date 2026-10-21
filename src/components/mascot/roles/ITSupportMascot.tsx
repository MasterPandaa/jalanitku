"use client";

import React from "react";

export interface ITSupportMascotProps {
  size?: number | string;
  className?: string;
  animated?: boolean;
  animate?: boolean;
  state?: "idle" | "hover" | "happy";
}

/**
 * Maskot Role: IT Support — "The Fixer"
 * Identitas: Sang Penyelamat Operasional Harian & Pemecah Masalah Sistem
 * Ciri Khas: Headset operator melengkung dengan bantalan telinga cyan (#00F0FF) & mic ke mulut,
 * kerah polo teknisi putih-cyan dengan badge "24/7 FIX", tangan kiri memegang kotak perkakas P3K IT
 * berpalang hijau neon (#2EE59D), dan tangan kanan memegang obeng elektrik multi-bit dengan kabel spiral.
 *
 * Base Anatomi: 100% konsisten dengan Base Model Batch 1 (kaki sol putih, tubuh kuning rambu 106x94,
 * marka jalan putus-putus, pipi pink, mata ekspresif, mulut senyum, tangan neo-brutalist).
 */
export function ITSupportMascot({
  size = 200,
  className = "",
  animated = true,
  animate,
  state = "idle",
}: ITSupportMascotProps) {
  const isAnimated = animate !== undefined ? animate : animated;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none group ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Maskot IT Support — The Fixer: Papan penunjuk jalan neo-brutalism kuning dengan headset operator cyan, kotak perkakas P3K IT palang hijau, obeng elektrik multi-bit, dan senyum ramah solutif 24/7"
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
            @keyframes its-float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-3.5px); }
            }
            @keyframes its-toolbox {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(-4deg) translateY(-1px); }
            }
            @keyframes its-screwdriver {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(5deg) translateY(-2px); }
            }
            @keyframes its-sparkle {
              0%, 100% { transform: scale(1); opacity: 0.8; }
              50% { transform: scale(1.2); opacity: 1; }
            }
            .its-animated-body {
              animation: ${isAnimated ? "its-float 3.5s ease-in-out infinite" : "none"};
              transform-origin: center bottom;
            }
            .its-animated-toolbox {
              animation: ${isAnimated ? "its-toolbox 3s ease-in-out infinite" : "none"};
              transform-origin: 20px 124px;
            }
            .its-animated-screwdriver {
              animation: ${isAnimated ? "its-screwdriver 2.8s ease-in-out infinite" : "none"};
              transform-origin: 172px 120px;
            }
            .its-animated-sparkle {
              animation: ${isAnimated ? "its-sparkle 1.8s ease-in-out infinite" : "none"};
              transform-origin: 156px 60px;
            }
          `}</style>
        </defs>

        {/* CONTAINER UTAMA DENGAN ANIMASI FLOAT */}
        <g className="its-animated-body transition-transform duration-300 group-hover:scale-105">
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
          {/* LAYER 2: BADAN UTAMA PAPAN RAMBU (KUNING NEO-BRUTALISM BATCH 1)*/}
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

          {/* Badan Papan Rambu Kuning (#FFD60A) */}
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

          {/* Marka Jalan Putus-Putus Perut (DNA Rambu Jalan) */}
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
          {/* LAYER 3: MATA & EKSPRESI RAMAH BERSAHABAT (BATCH 1 BASE)      */}
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
          {/* Kilau Cyan Bersahabat */}
          <circle cx="70" cy="88" r="1.2" fill="#00F0FF" />

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
          {/* Kilau Cyan Bersahabat */}
          <circle cx="114" cy="88" r="1.2" fill="#00F0FF" />

          {/* Alis Ramah Ceria Solutif */}
          <path
            d="M 58 70 Q 69 66 79 70"
            stroke="#0A0A0A"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 103 70 Q 113 66 124 70"
            stroke="#0A0A0A"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Mulut Senyum Hangat Ramah */}
          <path
            d="M 87 114 Q 94 123 102 114"
            stroke="#0A0A0A"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* ============================================================== */}
          {/* LAYER 4: KERAH POLO TEKNISI PUTIH & BADGE "24/7 FIX"          */}
          {/* ============================================================== */}
          <polygon
            points="76,144 94,144 86,132"
            fill="#FFFFFF"
            stroke="#0A0A0A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <polygon
            points="112,144 94,144 102,132"
            fill="#FFFFFF"
            stroke="#0A0A0A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Kancing Kerah Polo Cyan */}
          <rect
            x="91"
            y="132"
            width="7"
            height="6"
            fill="#00F0FF"
            stroke="#0A0A0A"
            strokeWidth="2"
          />

          {/* Badge "24/7 FIX" di Dada Kanan */}
          <rect
            x="112"
            y="126"
            width="26"
            height="13"
            rx="2.5"
            fill="#00F0FF"
            stroke="#0A0A0A"
            strokeWidth="2"
          />
          <text
            x="125"
            y="135"
            fill="#0A0A0A"
            fontSize="6.5"
            fontWeight="900"
            textAnchor="middle"
            fontFamily="monospace"
          >
            24/7
          </text>

          {/* Selempang Tali Kabel USB-C Melingkar di Dada */}
          <path
            d="M 46 66 Q 74 96 98 138"
            stroke="#0A0A0A"
            strokeWidth="4"
            fill="none"
          />
          <path
            d="M 46 66 Q 74 96 98 138"
            stroke="#00F0FF"
            strokeWidth="2"
            fill="none"
            strokeDasharray="4 3"
          />

          {/* ============================================================== */}
          {/* LAYER 5: HEADSET OPERATOR IT MELENGKUNG DI KEPALA              */}
          {/* ============================================================== */}
          {/* Bando Headset Atas Melengkung Kuat */}
          <path
            d="M 38 72 C 34 22 156 22 152 72"
            stroke="#0A0A0A"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 38 72 C 34 24 156 24 152 72"
            stroke="#FFFFFF"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />

          {/* Earpad Kiri Cyan (#00F0FF) */}
          <rect x="29" y="66" width="13" height="22" rx="4" fill="#0A0A0A" />
          <rect
            x="26"
            y="63"
            width="13"
            height="22"
            rx="4"
            fill="#00F0FF"
            stroke="#0A0A0A"
            strokeWidth="3"
          />
          <rect x="28" y="67" width="4" height="14" rx="2" fill="#FFFFFF" />

          {/* Earpad Kanan Cyan (#00F0FF) */}
          <rect x="151" y="66" width="13" height="22" rx="4" fill="#0A0A0A" />
          <rect
            x="148"
            y="63"
            width="13"
            height="22"
            rx="4"
            fill="#00F0FF"
            stroke="#0A0A0A"
            strokeWidth="3"
          />
          <rect x="155" y="67" width="4" height="14" rx="2" fill="#FFFFFF" />

          {/* Tangkai Mikrofon Fleksibel Melengkung ke Mulut */}
          <path
            d="M 150 82 Q 138 114 112 114"
            stroke="#0A0A0A"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Spons Kepala Mic Pink (#FF5C8A) */}
          <circle cx="110" cy="114" r="4.5" fill="#FF5C8A" stroke="#0A0A0A" strokeWidth="2" />
          <circle cx="111.5" cy="112.5" r="1.5" fill="#FFFFFF" />

          {/* ============================================================== */}
          {/* LAYER 6: TANGAN KIRI & KOTAK PERKAKAS DARURAT P3K IT (TOOLBOX) */}
          {/* ============================================================== */}
          <g className="its-animated-toolbox">
            {/* Handle Toolbox Koper Logam */}
            <path
              d="M 14 116 C 14 109 26 109 26 116"
              stroke="#0A0A0A"
              strokeWidth="3"
              fill="none"
            />

            {/* Hard Shadow Kotak Perkakas */}
            <rect x="8" y="119" width="32" height="26" rx="3.5" fill="#0A0A0A" />

            {/* Bodi Kotak Perkakas Putih Bersih (#FFFFFF) */}
            <rect
              x="5"
              y="116"
              width="32"
              height="26"
              rx="3.5"
              fill="#FFFFFF"
              stroke="#0A0A0A"
              strokeWidth="3"
            />

            {/* List Aksen Tutup Koper Cyan */}
            <rect x="5" y="116" width="32" height="6" fill="#00F0FF" stroke="#0A0A0A" strokeWidth="1" />

            {/* Lambang Palang Hijau Neon (#2EE59D) First Aid IT */}
            <rect x="18" y="124" width="6" height="12" fill="#2EE59D" />
            <rect x="15" y="127" width="12" height="6" fill="#2EE59D" />
            <rect x="18" y="124" width="6" height="12" stroke="#0A0A0A" strokeWidth="1" fill="none" />
            <rect x="15" y="127" width="12" height="6" stroke="#0A0A0A" strokeWidth="1" fill="none" />

            {/* Kancing Kait Koper Perak */}
            <rect x="10" y="122" width="3" height="4" fill="#0A0A0A" />
            <rect x="29" y="122" width="3" height="4" fill="#0A0A0A" />

            {/* Lengan Kiri Menjulur ke Handle Kotak */}
            <path
              d="M 42 110 Q 28 116 20 122"
              stroke="#0A0A0A"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />

            {/* Kepalan Tangan Kiri Kuning (#FFD60A) */}
            <circle
              cx="20"
              cy="120"
              r="6.5"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="3.5"
            />
          </g>

          {/* ============================================================== */}
          {/* LAYER 7: TANGAN KANAN & OBENG ELEKTRIK MULTI-BIT DENGAN KABEL   */}
          {/* ============================================================== */}
          <g className="its-animated-screwdriver">
            {/* Lengan Kanan Menjulur */}
            <path
              d="M 148 110 Q 164 114 172 120"
              stroke="#0A0A0A"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />

            {/* Kabel Spiral USB Melingkar dari Pangkal Obeng */}
            <path
              d="M 182 124 Q 192 130 186 138 Q 180 146 188 152"
              stroke="#0A0A0A"
              strokeWidth="2.5"
              fill="none"
            />
            <path
              d="M 182 124 Q 192 130 186 138 Q 180 146 188 152"
              stroke="#00F0FF"
              strokeWidth="1.2"
              fill="none"
            />
            <rect x="186" y="150" width="7" height="5" rx="1" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="1" />

            {/* Hard Shadow Obeng Elektrik */}
            <g transform="rotate(22 172 96)">
              <rect x="171" y="82" width="11" height="34" rx="2.5" fill="#0A0A0A" />
            </g>

            {/* Handle Obeng Elektrik Cyan (#00F0FF) */}
            <g transform="rotate(22 172 96)">
              <rect
                x="168"
                y="80"
                width="11"
                height="34"
                rx="2.5"
                fill="#00F0FF"
                stroke="#0A0A0A"
                strokeWidth="2.5"
              />
              {/* Grip Karet Hitam Ergonomis */}
              <line x1="168" y1="90" x2="179" y2="90" stroke="#0A0A0A" strokeWidth="2" />
              <line x1="168" y1="96" x2="179" y2="96" stroke="#0A0A0A" strokeWidth="2" />
              <line x1="168" y1="102" x2="179" y2="102" stroke="#0A0A0A" strokeWidth="2" />

              {/* Collet / Chuck Kepala Logam Kuning */}
              <polygon
                points="168,80 179,80 177,73 170,73"
                fill="#FFD60A"
                stroke="#0A0A0A"
                strokeWidth="2"
              />
              {/* Mata Bit Obeng Baja Perak */}
              <rect
                x="171.5"
                y="59"
                width="4"
                height="14"
                fill="#FFFFFF"
                stroke="#0A0A0A"
                strokeWidth="1.5"
              />
              {/* Ujung Bit Obeng Philips Cross (+) */}
              <polygon points="171.5,59 175.5,59 173.5,55" fill="#0A0A0A" />
            </g>

            {/* Sparkle Kilau Servis di Ujung Obeng */}
            <g className="its-animated-sparkle">
              <polygon
                points="156,54 158,58 162,59 158,61 156,65 154,61 150,59 154,58"
                fill="#00F0FF"
              />
              <circle cx="156" cy="59" r="1.5" fill="#FFFFFF" />
            </g>

            {/* Kepalan Tangan Kanan Kuning (#FFD60A) */}
            <circle
              cx="172"
              cy="118"
              r="6.5"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="3.5"
            />
          </g>

          {/* Partikel Sparkle Pemulihan Sistem (Cyan & Mint) */}
          <circle cx="36" cy="40" r="2" fill="#00F0FF" />
          <circle cx="168" cy="44" r="2" fill="#2EE59D" />
          <circle cx="160" cy="36" r="1.5" fill="#FFD60A" />
        </g>
      </svg>
    </div>
  );
}
