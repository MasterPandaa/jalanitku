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
 * Identitas: Sang Penyelamat Operasional & Ahli Perbaikan Lapangan
 * Ciri Khas: Headset operator IT dengan mic melengkung, kotak perkakas P3K IT kuning
 * dengan palang hijau neon, obeng multi-bit elektrik, kabel USB-C melingkar,
 * dan badge 24/7 FIX.
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
      aria-label="Maskot IT Support — The Fixer: Papan rambu putih-cyan bersahabat dengan headset operator, kotak perkakas P3K IT, obeng multi-bit, dan lilitan kabel USB"
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
            @keyframes its-bob {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-4px); }
            }
            @keyframes its-screw {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(15deg); }
            }
            @keyframes its-pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
            .its-animated {
              animation: ${isAnimated ? "its-bob 3.6s ease-in-out infinite" : "none"};
              transform-origin: center bottom;
            }
            .its-tool {
              animation: ${isAnimated ? "its-screw 2s ease-in-out infinite" : "none"};
              transform-origin: 165px 115px;
            }
            .its-box {
              animation: ${isAnimated ? "its-pulse 3s ease-in-out infinite" : "none"};
              transform-origin: 25px 125px;
            }
          `}</style>
        </defs>

        <g className="its-animated transition-transform duration-300 group-hover:scale-105">
          {/* 1. SEPATU KETS SAFETY NEO-BRUTALISM */}
          <rect x="66" y="162" width="22" height="24" fill="#0A0A0A" />
          <rect x="112" y="162" width="22" height="24" fill="#0A0A0A" />
          <rect x="62" y="160" width="22" height="24" fill="#0A0A0A" rx="2" />
          <rect x="108" y="160" width="22" height="24" fill="#0A0A0A" rx="2" />
          <line x1="62" y1="180" x2="84" y2="180" stroke="#00F0FF" strokeWidth="3.5" />
          <line x1="108" y1="180" x2="130" y2="180" stroke="#00F0FF" strokeWidth="3.5" />

          {/* 2. BAYANGAN BADAN KERAS (HARD DROP SHADOW) */}
          <rect x="46" y="48" width="112" height="114" rx="10" fill="#0A0A0A" />

          {/* 3. BADAN UTAMA RAMBU (PUTIH BERSIH #FFFFFF / AKSEN CYAN) */}
          <rect
            x="38"
            y="40"
            width="112"
            height="114"
            rx="10"
            fill="#FFFFFF"
            stroke="#0A0A0A"
            strokeWidth="5"
            strokeLinejoin="round"
          />

          {/* 4. GARIS DEKORATIF DASHED */}
          <line x1="48" y1="142" x2="140" y2="142" stroke="#0A0A0A" strokeWidth="4" strokeDasharray="8 6" />

          {/* 5. BANDANA TEKNISI / KAIN KEPALA KUNING */}
          <path d="M 36,54 L 152,54 L 148,42 L 40,42 Z" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="4" strokeLinejoin="round" />
          <circle cx="150" cy="50" r="4" fill="#FF5C8A" stroke="#0A0A0A" strokeWidth="2" />

          {/* 6. HEADSET OPERATOR IT KOMUNIKASI */}
          {/* Band Headset Melengkung di Kepala */}
          <path d="M 38,70 C 34,24 154,24 150,70" stroke="#0A0A0A" strokeWidth="6" fill="none" strokeLinecap="round" />
          {/* Earpad Kiri */}
          <rect x="30" y="66" width="12" height="20" rx="4" fill="#00F0FF" stroke="#0A0A0A" strokeWidth="3" />
          {/* Earpad Kanan */}
          <rect x="146" y="66" width="12" height="20" rx="4" fill="#00F0FF" stroke="#0A0A0A" strokeWidth="3" />
          {/* Tangkai Mic */}
          <path d="M 148,82 Q 138,110 114,110" stroke="#0A0A0A" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="112" cy="110" r="4" fill="#FF5C8A" stroke="#0A0A0A" strokeWidth="2" />

          {/* 7. MATA RAMAH BERSAHABAT */}
          {/* Mata Kiri */}
          <rect x="56" y="72" width="22" height="26" rx="5" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="4.5" />
          <rect x="62" y="78" width="10" height="12" rx="2" fill="#0A0A0A" />
          <circle cx="65" cy="81" r="2" fill="#FFFFFF" />
          {/* Mata Kanan */}
          <rect x="108" y="72" width="22" height="26" rx="5" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="4.5" />
          <rect x="114" y="78" width="10" height="12" rx="2" fill="#0A0A0A" />
          <circle cx="117" cy="81" r="2" fill="#FFFFFF" />

          {/* 8. ALIS & SENYUM LEBAR SOLUTIF */}
          <line x1="56" y1="64" x2="80" y2="66" stroke="#0A0A0A" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="108" y1="66" x2="132" y2="64" stroke="#0A0A0A" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M82,114 Q94,128 106,114 Z" fill="#0A0A0A" stroke="#0A0A0A" strokeWidth="3" strokeLinejoin="round" />
          <path d="M86,118 Q94,125 102,118" fill="#FFD60A" />
          <rect x="46" y="106" width="10" height="6" rx="2" fill="#FF5C8A" />
          <rect x="132" y="106" width="10" height="6" rx="2" fill="#FF5C8A" />

          {/* 9. TANGAN KIRI MEMEGANG TOOLKIT P3K IT (THE FIRST-AID BOX) */}
          <g className="its-box">
            <line x1="38" y1="110" x2="24" y2="124" stroke="#0A0A0A" strokeWidth="6" strokeLinecap="round" />
            <circle cx="24" cy="124" r="6" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="3.5" />
            {/* Kotak Perkakas Kuning */}
            <g transform="translate(6, 110)">
              <rect x="3" y="3" width="36" height="30" rx="4" fill="#0A0A0A" />
              <rect x="0" y="0" width="36" height="30" rx="4" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="3" />
              {/* Gagang Box */}
              <path d="M 12,0 L 12,-6 L 24,-6 L 24,0" stroke="#0A0A0A" strokeWidth="2.5" fill="none" />
              {/* Lambang Palang Plus P3K IT */}
              <rect x="15" y="7" width="6" height="16" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="1" />
              <rect x="10" y="12" width="16" height="6" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="1" />
            </g>
          </g>

          {/* 10. TANGAN KANAN MEMEGANG OBENG ELEKTRIK DENGAN KABEL USB */}
          <g className="its-tool">
            <line x1="148" y1="110" x2="166" y2="120" stroke="#0A0A0A" strokeWidth="6" strokeLinecap="round" />
            <circle cx="166" cy="120" r="6" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="3.5" />
            {/* Obeng Multi-bit */}
            <g transform="translate(160, 80) rotate(18)">
              <rect x="2" y="2" width="10" height="28" rx="3" fill="#0A0A0A" />
              <rect x="0" y="0" width="10" height="28" rx="3" fill="#00F0FF" stroke="#0A0A0A" strokeWidth="2.5" />
              {/* Batang Besi Obeng */}
              <rect x="3" y="28" width="4" height="22" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="1.5" />
              <polygon points="2,50 8,50 5,56" fill="#0A0A0A" />
            </g>
            {/* Kabel USB Melingkar */}
            <path d="M 166,126 Q 185,145 170,160 Q 155,168 145,155" stroke="#0A0A0A" strokeWidth="3" fill="none" strokeDasharray="5 3" />
            <rect x="140" y="152" width="6" height="8" rx="1" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="1.5" />
          </g>

          {/* 11. BADGE "24/7 FIX" */}
          <g transform="translate(144, 28)">
            <rect x="3" y="3" width="36" height="18" rx="4" fill="#0A0A0A" />
            <rect x="0" y="0" width="36" height="18" rx="4" fill="#00F0FF" stroke="#0A0A0A" strokeWidth="2" />
            <text x="5" y="13" fontFamily="monospace" fontSize="9" fontWeight="900" fill="#0A0A0A">24/7🔧</text>
          </g>
        </g>
      </svg>
    </div>
  );
}
