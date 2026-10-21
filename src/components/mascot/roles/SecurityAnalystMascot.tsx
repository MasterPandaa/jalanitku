"use client";

import React from "react";

export interface SecurityAnalystMascotProps {
  size?: number | string;
  className?: string;
  animated?: boolean;
  animate?: boolean;
  state?: "idle" | "hover" | "happy";
}

/**
 * Maskot Role: Cybersecurity / Security Analyst — "The Warden"
 * Identitas: Sang Penjaga Benteng Data & Tameng Pertahanan Siber
 * Ciri Khas: Helm baja cyber warden ungu bertanduk, visor pemindai ancaman hijau terminal,
 * perisai firewall berlapis baja dengan gembok enkripsi AES berpijar,
 * pedang kunci siber (Cyber Key Blade), dan badge status SECURED.
 */
export function SecurityAnalystMascot({
  size = 200,
  className = "",
  animated = true,
  animate,
  state = "idle",
}: SecurityAnalystMascotProps) {
  const isAnimated = animate !== undefined ? animate : animated;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none group ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Maskot Cybersecurity — The Warden: Papan rambu ungu siber dengan helm baja bertanduk, visor radar hijau terminal, perisai firewall berlogo gembok enkripsi, dan pedang kunci siber"
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
            @keyframes sec-bob {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-4px); }
            }
            @keyframes sec-shield-guard {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(-5deg) translate(-2px, 0); }
            }
            @keyframes sec-lock-glow {
              0%, 100% { filter: drop-shadow(0 0 3px #10B981); opacity: 0.95; }
              50% { filter: drop-shadow(0 0 10px #10B981); opacity: 1; }
            }
            @keyframes sec-blade-shimmer {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(8deg); }
            }
            .sec-animated {
              animation: ${isAnimated ? "sec-bob 3.6s ease-in-out infinite" : "none"};
              transform-origin: center bottom;
            }
            .sec-shield {
              animation: ${isAnimated ? "sec-shield-guard 2.8s ease-in-out infinite" : "none"};
              transform-origin: 22px 110px;
            }
            .sec-lock {
              animation: ${isAnimated ? "sec-lock-glow 2s ease-in-out infinite" : "none"};
            }
            .sec-blade {
              animation: ${isAnimated ? "sec-blade-shimmer 2.4s ease-in-out infinite" : "none"};
              transform-origin: 168px 115px;
            }
          `}</style>
        </defs>

        <g className="sec-animated transition-transform duration-300 group-hover:scale-105">
          {/* 1. SEPATU BAJA BENTENG NEO-BRUTALISM */}
          <rect x="66" y="162" width="22" height="24" fill="#0A0A0A" />
          <rect x="112" y="162" width="22" height="24" fill="#0A0A0A" />
          <rect x="62" y="160" width="22" height="24" fill="#0A0A0A" rx="2" />
          <rect x="108" y="160" width="22" height="24" fill="#0A0A0A" rx="2" />
          {/* Pelat Baja Sol Sepatu Ungu */}
          <line x1="62" y1="180" x2="84" y2="180" stroke="#7C3AED" strokeWidth="3.5" />
          <line x1="108" y1="180" x2="130" y2="180" stroke="#7C3AED" strokeWidth="3.5" />

          {/* 2. BAYANGAN BADAN KERAS (HARD DROP SHADOW) */}
          <rect x="46" y="52" width="112" height="110" rx="10" fill="#0A0A0A" />

          {/* 3. BADAN UTAMA RAMBU (UNGU CYBER #7C3AED) */}
          <rect
            x="38"
            y="44"
            width="112"
            height="110"
            rx="10"
            fill="#7C3AED"
            stroke="#0A0A0A"
            strokeWidth="5"
            strokeLinejoin="round"
          />

          {/* 4. GARIS DEKORATIF DINDING BENTENG CYBER */}
          <line x1="48" y1="142" x2="140" y2="142" stroke="#0A0A0A" strokeWidth="4" strokeDasharray="8 6" />

          {/* 5. HELM TANTANGAN CYBER WARDEN BERTANDUK BAJA */}
          <g transform="translate(24, 6)">
            {/* Hard Shadow Helm */}
            <path
              d="M 12,46 L 24,14 L 38,26 L 102,26 L 116,14 L 128,46 Z"
              fill="#0A0A0A"
            />
            {/* Kubah Helm Baja Ungu Gelap */}
            <path
              d="M 10,42 L 22,12 L 36,24 L 100,24 L 114,12 L 126,42 Z"
              fill="#7C3AED"
              stroke="#0A0A0A"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Tanduk Baja Kiri & Kanan */}
            <polygon points="12,24 22,12 20,28" fill="#10B981" stroke="#0A0A0A" strokeWidth="2.5" />
            <polygon points="124,24 114,12 116,28" fill="#10B981" stroke="#0A0A0A" strokeWidth="2.5" />
            {/* Pelat Dahi Baja Abu-abu Perak */}
            <polygon points="46,24 90,24 82,34 54,34" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="2.5" />
          </g>

          {/* 6. VISOR PEMINDAI ANCAMAN HIJAU TERMINAL (#10B981) */}
          <rect x="52" y="66" width="86" height="26" rx="6" fill="#0A0A0A" />
          <rect x="50" y="64" width="86" height="26" rx="6" fill="#10B981" stroke="#0A0A0A" strokeWidth="4" />
          {/* Garis Scanline Terminal & Radar Grid */}
          <line x1="56" y1="72" x2="130" y2="72" stroke="#0A0A0A" strokeWidth="1.5" strokeDasharray="4 2" />
          <line x1="56" y1="82" x2="130" y2="82" stroke="#0A0A0A" strokeWidth="1.5" strokeDasharray="4 2" />
          {/* Teks Mini HUD Radar: "0 THREAT" */}
          <text x="56" y="80" fontFamily="monospace" fontSize="8" fontWeight="900" fill="#0A0A0A">0_THREAT</text>

          {/* Pupil Target Visor */}
          <circle cx="118" cy="77" r="4.5" fill="#0A0A0A" />
          <circle cx="119.5" cy="75.5" r="1.5" fill="#FFFFFF" />

          {/* 7. ALIS BAJA TEGAS & SENYUM WASPADA */}
          <line x1="56" y1="56" x2="80" y2="58" stroke="#0A0A0A" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="108" y1="58" x2="132" y2="56" stroke="#0A0A0A" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M84,114 Q94,122 104,114" stroke="#0A0A0A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <rect x="46" y="106" width="10" height="6" rx="2" fill="#FF5C8A" />
          <rect x="132" y="106" width="10" height="6" rx="2" fill="#FF5C8A" />

          {/* 8. TANGAN KIRI MEMEGANG PERISAI FIREWALL (THE AEGIS SHIELD) */}
          <g className="sec-shield" transform="translate(6, 78)">
            <line x1="32" y1="38" x2="18" y2="44" stroke="#0A0A0A" strokeWidth="6" strokeLinecap="round" />
            <circle cx="18" cy="44" r="6" fill="#7C3AED" stroke="#0A0A0A" strokeWidth="3.5" />
            {/* Perisai Heksagonal Kokoh Baja */}
            <g transform="translate(-10, 10)">
              {/* Shadow Perisai */}
              <polygon points="18,0 44,0 52,28 31,58 10,28" fill="#0A0A0A" />
              {/* Badan Perisai Heksagonal Abu-Putih */}
              <polygon
                points="15,-3 41,-3 49,25 28,55 7,25"
                fill="#FFFFFF"
                stroke="#0A0A0A"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              {/* Lapisan Pelat Dalam Ungu Cyber */}
              <polygon
                points="19,4 37,4 43,24 28,46 13,24"
                fill="#7C3AED"
                stroke="#0A0A0A"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              {/* Lambang Gembok Enkripsi Emas Berpijar Hijau */}
              <g className="sec-lock" transform="translate(21, 14)">
                {/* Tangkai Gembok Melengkung */}
                <path d="M 4,4 C 4,-2 10,-2 10,4" stroke="#0A0A0A" strokeWidth="2.5" fill="none" />
                {/* Bodi Gembok Emas */}
                <rect x="1" y="4" width="12" height="10" rx="2" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2" />
                {/* Lubang Kunci Hijau Neon */}
                <circle cx="7" cy="8" r="1.5" fill="#10B981" />
                <line x1="7" y1="9" x2="7" y2="12" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
              </g>
            </g>
          </g>

          {/* 9. TANGAN KANAN MEMEGANG PEDANG KUNCI ENKRIPSI (CYBER KEY BLADE) */}
          <g className="sec-blade" transform="translate(148, 92)">
            <line x1="-2" y1="28" x2="16" y2="34" stroke="#0A0A0A" strokeWidth="6" strokeLinecap="round" />
            <circle cx="16" cy="34" r="6" fill="#7C3AED" stroke="#0A0A0A" strokeWidth="3.5" />
            {/* Bilah Pedang Kunci Hijau Terminal */}
            <g transform="translate(18, 22) rotate(24)">
              {/* Shadow Blade */}
              <polygon points="0,0 6,-38 12,0 8,14 4,14" fill="#0A0A0A" />
              {/* Gagang Pedang Kunci */}
              <rect x="3" y="2" width="6" height="14" rx="2" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2" />
              {/* Crossguard Pedang */}
              <rect x="-4" y="0" width="20" height="5" rx="1.5" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="2" />
              {/* Bilah Pedang Bercahaya Hijau Terminal */}
              <polygon
                points="-1,-2 6,-40 13,-2 10,0 2,0"
                fill="#10B981"
                stroke="#0A0A0A"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              {/* Gerigi Kunci Digital di Sisi Bilah */}
              <rect x="10" y="-24" width="5" height="3" fill="#10B981" stroke="#0A0A0A" strokeWidth="1.5" />
              <rect x="10" y="-14" width="4" height="3" fill="#10B981" stroke="#0A0A0A" strokeWidth="1.5" />
              {/* Alur Garis Sirkuit Putih */}
              <line x1="6" y1="-2" x2="6" y2="-32" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          </g>

          {/* 10. BADGE "AES-256 🔒" DI KANAN ATAS */}
          <g transform="translate(138, 28)">
            <rect x="3" y="3" width="48" height="18" rx="4" fill="#0A0A0A" />
            <rect x="0" y="0" width="48" height="18" rx="4" fill="#10B981" stroke="#0A0A0A" strokeWidth="2" />
            <text x="4" y="13" fontFamily="monospace" fontSize="8" fontWeight="900" fill="#0A0A0A">AES-256🔒</text>
          </g>
        </g>
      </svg>
    </div>
  );
}
