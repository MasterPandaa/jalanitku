"use client";

import React from "react";

export interface MascotProps {
  size?: number | string;
  className?: string;
  animate?: boolean;
}

export function GameDeveloperMascot({
  size = 180,
  className = "",
  animate = true,
}: MascotProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Game Developer Mascot - The Pixel Mage"
      className={`overflow-visible ${className}`}
    >
      <style>{`
        @keyframes mage-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes wand-glow {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes spark-twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .mage-animated {
          animation: mage-float 4s ease-in-out infinite;
        }
        .mage-wand {
          animation: wand-glow 2.5s ease-in-out infinite;
          transform-origin: 160px 120px;
        }
        .mage-spark {
          animation: spark-twinkle 1.8s ease-in-out infinite;
          transform-origin: center;
        }
      `}</style>

      <g className={animate ? "mage-animated" : ""}>
        {/* 1. SEPATU BOOT 8-BIT NEO-BRUTALISM */}
        <rect x="64" y="162" width="22" height="24" fill="#0A0A0A" />
        <rect x="114" y="162" width="22" height="24" fill="#0A0A0A" />
        <rect x="60" y="160" width="22" height="24" fill="#A259FF" stroke="#0A0A0A" strokeWidth="4" />
        <rect x="110" y="160" width="22" height="24" fill="#A259FF" stroke="#0A0A0A" strokeWidth="4" />
        {/* Buckle Emas di Sepatu */}
        <rect x="66" y="166" width="10" height="6" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2" />
        <rect x="116" y="166" width="10" height="6" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2" />

        {/* 2. BAYANGAN BADAN KERAS (HARD DROP SHADOW) */}
        <rect x="46" y="52" width="112" height="110" rx="10" fill="#0A0A0A" />

        {/* 3. BADAN UTAMA RAMBU (HIJAU NEON 8-BIT) */}
        <rect
          x="38"
          y="44"
          width="112"
          height="110"
          rx="10"
          fill="#2EE59D"
          stroke="#0A0A0A"
          strokeWidth="5"
          strokeLinejoin="round"
        />

        {/* 4. GARIS DEKORATIF ARCADE */}
        <line x1="48" y1="142" x2="140" y2="142" stroke="#0A0A0A" strokeWidth="4" strokeDasharray="6 6" />

        {/* 5. TOPI PENYIHIR PIXEL MAGE (PIXELATED WIZARD HAT) */}
        <g transform="translate(18, 0)">
          {/* Shadow Topi */}
          <polygon points="12,56 142,56 128,48 106,32 116,14 84,24 64,48" fill="#0A0A0A" />
          {/* Brim Topi Bertingkat Pixel */}
          <path
            d="M 6,50 L 140,50 L 134,44 L 110,44 L 100,32 L 80,32 L 72,16 L 86,10 L 64,16 L 50,32 L 36,44 L 6,50 Z"
            fill="#A259FF"
            stroke="#0A0A0A"
            strokeWidth="4.5"
            strokeLinejoin="miter"
          />
          {/* Pita Topi Emas */}
          <polygon points="34,44 112,44 104,36 42,36" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="3" />
          {/* Bintang Magic Pixelated di Tengah Topi */}
          <g transform="translate(68, 30)">
            <rect x="4" y="0" width="4" height="12" fill="#00F0FF" />
            <rect x="0" y="4" width="12" height="4" fill="#00F0FF" />
            <rect x="2" y="2" width="8" height="8" fill="#FFFFFF" />
          </g>
        </g>

        {/* 6. MATA PETUALANG RPG (MATA BESAR CERIA BERBINTANG) */}
        {/* Mata Kiri */}
        <rect x="56" y="74" width="24" height="28" rx="6" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="4.5" />
        <rect x="62" y="80" width="12" height="16" rx="3" fill="#0A0A0A" />
        {/* Bintang Kilau di Mata */}
        <polygon points="68,82 70,86 74,86 71,89 72,93 68,90 64,93 65,89 62,86 66,86" fill="#FFD60A" />
        <circle cx="65" cy="83" r="1.5" fill="#FFFFFF" />

        {/* Mata Kanan */}
        <rect x="108" y="74" width="24" height="28" rx="6" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="4.5" />
        <rect x="114" y="80" width="12" height="16" rx="3" fill="#0A0A0A" />
        <polygon points="120,82 122,86 126,86 123,89 124,93 120,90 116,93 117,89 114,86 118,86" fill="#FFD60A" />
        <circle cx="117" cy="83" r="1.5" fill="#FFFFFF" />

        {/* 7. ALIS SEMANGAT */}
        <polygon points="56,66 82,70 80,74 54,70" fill="#0A0A0A" />
        <polygon points="132,66 106,70 108,74 134,70" fill="#0A0A0A" />

        {/* 8. SENYUM LEBAR ADVENTURER */}
        <path d="M82,116 Q94,130 106,116 Z" fill="#0A0A0A" stroke="#0A0A0A" strokeWidth="3" strokeLinejoin="round" />
        <path d="M86,120 Q94,128 102,120" fill="#FF5C8A" />

        {/* 9. PIPI PINK */}
        <rect x="46" y="110" width="10" height="6" rx="2" fill="#FF5C8A" />
        <rect x="132" y="110" width="10" height="6" rx="2" fill="#FF5C8A" />

        {/* 10. JUBAH PENYIHIR BERAKSEN TOMBOL ARCADE A / B */}
        <polygon points="80,154 94,154 87,144" fill="#A259FF" stroke="#0A0A0A" strokeWidth="2.5" />
        <polygon points="108,154 94,154 101,144" fill="#A259FF" stroke="#0A0A0A" strokeWidth="2.5" />
        <circle cx="94" cy="149" r="3.5" fill="#FF5C8A" stroke="#0A0A0A" strokeWidth="1.5" />

        {/* 11. TANGAN KANAN MEMEGANG TONGKAT GAMEPAD WAND */}
        <g className={animate ? "mage-wand" : ""}>
          <line x1="146" y1="114" x2="162" y2="128" stroke="#0A0A0A" strokeWidth="6" strokeLinecap="round" />
          <circle cx="162" cy="126" r="6" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="3.5" />

          {/* Batang Tongkat Sihir Retro */}
          <line x1="162" y1="140" x2="168" y2="72" stroke="#0A0A0A" strokeWidth="8" strokeLinecap="round" />
          <line x1="162" y1="138" x2="168" y2="74" stroke="#A259FF" strokeWidth="5" strokeLinecap="round" />

          {/* Ujung Tongkat: Mini Retro Controller D-Pad / Crystal */}
          <g transform="translate(150, 48)">
            {/* Shadow Head */}
            <rect x="4" y="4" width="34" height="24" rx="6" fill="#0A0A0A" />
            {/* Controller Body */}
            <rect x="0" y="0" width="34" height="24" rx="6" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="3" />
            {/* D-Pad */}
            <rect x="5" y="7" width="10" height="10" fill="#0A0A0A" />
            <rect x="8" y="5" width="4" height="14" fill="#0A0A0A" />
            {/* Action Buttons (A/B) */}
            <circle cx="23" cy="14" r="2.5" fill="#FF5C8A" stroke="#0A0A0A" strokeWidth="1" />
            <circle cx="28" cy="10" r="2.5" fill="#00F0FF" stroke="#0A0A0A" strokeWidth="1" />
          </g>

          {/* PARTIKEL MAGIC PIXEL BERCELAP-CELIP */}
          <g className={animate ? "mage-spark" : ""}>
            {/* Bintang Pixel Atas */}
            <g transform="translate(162, 32)">
              <rect x="3" y="0" width="3" height="9" fill="#00F0FF" />
              <rect x="0" y="3" width="9" height="3" fill="#00F0FF" />
              <rect x="2" y="2" width="5" height="5" fill="#FFFFFF" />
            </g>
            {/* Pixel Partikel Hijau */}
            <rect x="186" y="52" width="5" height="5" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="1.5" />
            <rect x="144" y="44" width="4" height="4" fill="#FF5C8A" stroke="#0A0A0A" strokeWidth="1.5" />
          </g>
        </g>

        {/* 12. FLOATING ARCADE PIXEL COIN & HEART DI KIRI */}
        <g transform="translate(10, 84)">
          {/* Pixel Heart 8-bit */}
          <g transform="scale(1.2)">
            <rect x="2" y="0" width="2" height="2" fill="#FF5C8A" />
            <rect x="6" y="0" width="2" height="2" fill="#FF5C8A" />
            <rect x="0" y="2" width="10" height="4" fill="#FF5C8A" />
            <rect x="2" y="6" width="6" height="2" fill="#FF5C8A" />
            <rect x="4" y="8" width="2" height="2" fill="#FF5C8A" />
          </g>
        </g>
        {/* Floating XP Star */}
        <g transform="translate(18, 126)">
          <rect x="2" y="2" width="14" height="14" rx="3" fill="#0A0A0A" />
          <rect x="0" y="0" width="14" height="14" rx="3" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2" />
          <text x="3" y="11" fontFamily="monospace" fontSize="8" fontWeight="900" fill="#0A0A0A">XP</text>
        </g>
      </g>
    </svg>
  );
}
