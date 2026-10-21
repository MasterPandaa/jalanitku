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
 * Ciri Khas: Topi safari hunter oranye dengan lampu senter status hijau "PASS",
 * kaca pembesar scanner bug berlensa cyan, cyber bug kecil tertangkap di jaring,
 * kacamata monokel target crosshair, dan badge centang hijau 100% PASS.
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
      aria-label="Maskot Quality Assurance — The Bug Hunter: Papan rambu oranye berpetualang dengan topi safari hunter, lampu senter status PASS, kaca pembesar scanner bug, dan cyber bug tertangkap di jaring digital"
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
              50% { transform: translateY(-4px); }
            }
            @keyframes qa-net-swing {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(-6deg); }
            }
            @keyframes qa-bug-wiggle {
              0%, 100% { transform: translate(0, 0) rotate(0deg); }
              50% { transform: translate(2px, -2px) rotate(8deg); }
            }
            .qa-animated {
              animation: ${isAnimated ? "qa-float 3.8s ease-in-out infinite" : "none"};
              transform-origin: center bottom;
            }
            .qa-net {
              animation: ${isAnimated ? "qa-net-swing 2.2s ease-in-out infinite" : "none"};
              transform-origin: 34px 115px;
            }
            .qa-bug {
              animation: ${isAnimated ? "qa-bug-wiggle 1.2s ease-in-out infinite" : "none"};
              transform-origin: center;
            }
          `}</style>
        </defs>

        <g className="qa-animated transition-transform duration-300 group-hover:scale-105">
          {/* 1. SEPATU BOOT PEMBURU SAFARI */}
          <rect x="66" y="162" width="22" height="24" fill="#0A0A0A" />
          <rect x="112" y="162" width="22" height="24" fill="#0A0A0A" />
          <rect x="62" y="160" width="22" height="24" fill="#0A0A0A" rx="2" />
          <rect x="108" y="160" width="22" height="24" fill="#0A0A0A" rx="2" />
          <line x1="62" y1="180" x2="84" y2="180" stroke="#FFD60A" strokeWidth="3" />
          <line x1="108" y1="180" x2="130" y2="180" stroke="#FFD60A" strokeWidth="3" />

          {/* 2. BAYANGAN BADAN KERAS (HARD DROP SHADOW) */}
          <rect x="46" y="52" width="112" height="110" rx="10" fill="#0A0A0A" />

          {/* 3. BADAN UTAMA RAMBU (ORANYE QA #FF8A3D) */}
          <rect
            x="38"
            y="44"
            width="112"
            height="110"
            rx="10"
            fill="#FF8A3D"
            stroke="#0A0A0A"
            strokeWidth="5"
            strokeLinejoin="round"
          />

          {/* 4. GARIS DEKORATIF RAMBU */}
          <line x1="48" y1="142" x2="140" y2="142" stroke="#0A0A0A" strokeWidth="4" strokeDasharray="8 6" />

          {/* 5. TOPI PEMBURU SAFARI / HUNTER HAT DENGAN LAMPU SENTER CHECKLIST */}
          <g transform="translate(18, 6)">
            {/* Shadow Topi */}
            <polygon points="12,48 152,48 138,36 114,24 50,24 26,36" fill="#0A0A0A" />
            {/* Brim Topi Safari */}
            <path
              d="M 6,44 L 158,44 L 140,34 L 116,22 L 48,22 L 24,34 Z"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Crown Topi Kubah */}
            <path
              d="M 44,22 C 44,8 120,8 120,22 Z"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Pita Topi Hitam */}
            <rect x="44" y="16" width="76" height="6" fill="#0A0A0A" />
            {/* Lampu Senter Kepala Status PASS Hijau */}
            <g transform="translate(74, 8)">
              <rect x="3" y="3" width="16" height="14" rx="3" fill="#0A0A0A" />
              <rect x="0" y="0" width="16" height="14" rx="3" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="2.5" />
              {/* Centang Pass Checklist */}
              <path d="M 4,7 L 7,10 L 12,4" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </g>
          </g>

          {/* 6. MATA: KIRI NORMAL JELI, KANAN MONOKEL RADAR SCANNER */}
          {/* Mata Kiri */}
          <rect x="56" y="74" width="22" height="26" rx="5" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="4" />
          <rect x="62" y="80" width="10" height="12" rx="2" fill="#0A0A0A" />
          <circle cx="65" cy="83" r="2" fill="#FFFFFF" />

          {/* Mata Kanan dengan Monokel Radar Scanner (Cyan) */}
          <circle cx="120" cy="87" r="18" fill="#0A0A0A" />
          <circle cx="118" cy="85" r="17" fill="#00F0FF" stroke="#0A0A0A" strokeWidth="4" />
          {/* Crosshair Target */}
          <line x1="105" y1="85" x2="131" y2="85" stroke="#0A0A0A" strokeWidth="2" strokeDasharray="3 2" />
          <line x1="118" y1="72" x2="118" y2="98" stroke="#0A0A0A" strokeWidth="2" strokeDasharray="3 2" />
          {/* Pupil Target */}
          <circle cx="118" cy="85" r="5" fill="#0A0A0A" />
          <circle cx="119.5" cy="83.5" r="1.5" fill="#FFFFFF" />
          {/* Tangkai Monokel */}
          <path d="M 134,80 C 142,82 144,95 142,106" stroke="#0A0A0A" strokeWidth="2.5" fill="none" />

          {/* 7. ALIS JELI & SENYUM DETEKSI */}
          <line x1="56" y1="67" x2="80" y2="69" stroke="#0A0A0A" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="106" y1="65" x2="132" y2="63" stroke="#0A0A0A" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M84,116 Q94,124 104,116" stroke="#0A0A0A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <rect x="46" y="110" width="10" height="6" rx="2" fill="#FF5C8A" />
          <rect x="132" y="110" width="10" height="6" rx="2" fill="#FF5C8A" />

          {/* 8. TANGAN KIRI MEMEGANG JARING SIBER PENANGKAP BUG */}
          <g className="qa-net">
            <line x1="38" y1="110" x2="18" y2="124" stroke="#0A0A0A" strokeWidth="6" strokeLinecap="round" />
            <circle cx="20" cy="124" r="6" fill="#FF8A3D" stroke="#0A0A0A" strokeWidth="3.5" />
            {/* Gagang Jaring */}
            <line x1="20" y1="124" x2="12" y2="60" stroke="#0A0A0A" strokeWidth="5" strokeLinecap="round" />
            {/* Ring Jaring */}
            <ellipse cx="12" cy="56" rx="18" ry="12" fill="#00F0FF" stroke="#0A0A0A" strokeWidth="3.5" />
            {/* Kantong Jaring Mesh */}
            <path d="M -6,56 Q 12,86 30,56" stroke="#0A0A0A" strokeWidth="3" fill="#00F0FF" fillOpacity="0.4" />
            <line x1="2" y1="56" x2="14" y2="76" stroke="#0A0A0A" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="22" y1="56" x2="10" y2="76" stroke="#0A0A0A" strokeWidth="1.5" strokeDasharray="3 2" />

            {/* BUG MERAH KECIL TERTANGKAP DI DALAM JARING */}
            <g className="qa-bug" transform="translate(6, 60)">
              <ellipse cx="6" cy="6" rx="6" ry="5" fill="#FF3B30" stroke="#0A0A0A" strokeWidth="1.5" />
              <circle cx="4" cy="5" r="1" fill="#FFFFFF" />
              <circle cx="8" cy="5" r="1" fill="#FFFFFF" />
              <line x1="3" y1="2" x2="1" y2="0" stroke="#0A0A0A" strokeWidth="1.5" />
              <line x1="9" y1="2" x2="11" y2="0" stroke="#0A0A0A" strokeWidth="1.5" />
              <line x1="1" y1="6" x2="-2" y2="6" stroke="#0A0A0A" strokeWidth="1.5" />
              <line x1="11" y1="6" x2="14" y2="6" stroke="#0A0A0A" strokeWidth="1.5" />
            </g>
          </g>

          {/* 9. TANGAN KANAN MEMEGANG KACA PEMBESAR MINI SCANNER */}
          <g transform="translate(150, 102)">
            <line x1="-4" y1="8" x2="12" y2="20" stroke="#0A0A0A" strokeWidth="6" strokeLinecap="round" />
            <circle cx="12" cy="20" r="6" fill="#FF8A3D" stroke="#0A0A0A" strokeWidth="3.5" />
            {/* Lens Rim */}
            <circle cx="26" cy="14" r="14" fill="#0A0A0A" />
            <circle cx="24" cy="12" r="13" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="3" />
            <text x="18" y="16" fontFamily="monospace" fontSize="9" fontWeight="900" fill="#0A0A0A">BUG</text>
            <line x1="33" y1="21" x2="42" y2="30" stroke="#0A0A0A" strokeWidth="4.5" strokeLinecap="round" />
          </g>

          {/* 10. BADGE STATUS TEST: 100% PASS */}
          <g transform="translate(144, 30)">
            <rect x="3" y="3" width="34" height="18" rx="4" fill="#0A0A0A" />
            <rect x="0" y="0" width="34" height="18" rx="4" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="2" />
            <text x="4" y="13" fontFamily="monospace" fontSize="9" fontWeight="900" fill="#0A0A0A">TEST✓</text>
          </g>
        </g>
      </svg>
    </div>
  );
}
