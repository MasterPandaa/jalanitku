"use client";

import React from "react";

export interface DevOpsEngineerMascotProps {
  size?: number | string;
  className?: string;
  animated?: boolean;
  animate?: boolean;
  state?: "idle" | "hover" | "happy";
}

/**
 * Maskot Role: DevOps Engineer — "The Cyclist"
 * Identitas: Sang Pengendali Siklus Rilis & Orkestrator Pipeline Otomasi
 * Ciri Khas: Helm sepeda balap aero merah karmin bergaris neon green,
 * pita tak hingga Infinity Loop CI/CD berputar dinamis (Build-Test-Deploy),
 * roda gir otomasi pipeline, kunci pas pit-stop kilat, dan badge status CI/CD.
 */
export function DevOpsEngineerMascot({
  size = 200,
  className = "",
  animated = true,
  animate,
  state = "idle",
}: DevOpsEngineerMascotProps) {
  const isAnimated = animate !== undefined ? animate : animated;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none group ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Maskot DevOps Engineer — The Cyclist: Papan rambu neo-brutalism merah karmin & neon green dengan helm balap aero, pita mobius infinity loop CI/CD, roda gir otomasi, dan kunci pas teknisi"
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
            @keyframes devops-bob {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-4px); }
            }
            @keyframes devops-gear-spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes devops-loop-pulse {
              0%, 100% { transform: scale(1); filter: drop-shadow(0 0 2px #2EE59D); }
              50% { transform: scale(1.05); filter: drop-shadow(0 0 8px #2EE59D); }
            }
            @keyframes devops-wrench {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(-12deg); }
            }
            .devops-animated {
              animation: ${isAnimated ? "devops-bob 3.4s ease-in-out infinite" : "none"};
              transform-origin: center bottom;
            }
            .devops-gear {
              animation: ${isAnimated ? "devops-gear-spin 6s linear infinite" : "none"};
              transform-origin: 168px 126px;
            }
            .devops-loop {
              animation: ${isAnimated ? "devops-loop-pulse 2.6s ease-in-out infinite" : "none"};
              transform-origin: 94px 132px;
            }
            .devops-wrench-arm {
              animation: ${isAnimated ? "devops-wrench 2.2s ease-in-out infinite" : "none"};
              transform-origin: 22px 116px;
            }
          `}</style>
        </defs>

        <g className="devops-animated transition-transform duration-300 group-hover:scale-105">
          {/* 1. SEPATU BALAP SEPEDA NEO-BRUTALISM DENGAN SOL NEON GREEN */}
          <rect x="66" y="162" width="22" height="24" fill="#0A0A0A" />
          <rect x="112" y="162" width="22" height="24" fill="#0A0A0A" />
          <rect x="62" y="160" width="22" height="24" fill="#0A0A0A" rx="2" />
          <rect x="108" y="160" width="22" height="24" fill="#0A0A0A" rx="2" />
          <line x1="62" y1="180" x2="84" y2="180" stroke="#2EE59D" strokeWidth="3.5" />
          <line x1="108" y1="180" x2="130" y2="180" stroke="#2EE59D" strokeWidth="3.5" />

          {/* 2. BAYANGAN BADAN KERAS (HARD DROP SHADOW) */}
          <rect x="46" y="52" width="112" height="110" rx="10" fill="#0A0A0A" />

          {/* 3. BADAN UTAMA RAMBU (MERAH KARMIN CI/CD #F43F5E) */}
          <rect
            x="38"
            y="44"
            width="112"
            height="110"
            rx="10"
            fill="#F43F5E"
            stroke="#0A0A0A"
            strokeWidth="5"
            strokeLinejoin="round"
          />

          {/* 4. GARIS DEKORATIF RAMBU JALAN */}
          <line x1="48" y1="142" x2="140" y2="142" stroke="#0A0A0A" strokeWidth="4" strokeDasharray="8 6" />

          {/* 5. HELM SEPEDA PEMBALAP AERO (HIGH SPEED RELEASE HELMET) */}
          <g transform="translate(24, 6)">
            {/* Hard Shadow Helm */}
            <path
              d="M 16,42 C 16,14 130,10 144,38 L 152,48 L 10,48 Z"
              fill="#0A0A0A"
            />
            {/* Batok Helm Balap Merah Karmin */}
            <path
              d="M 14,38 C 14,10 126,8 140,34 L 146,44 L 8,44 Z"
              fill="#F43F5E"
              stroke="#0A0A0A"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Garis Ventilasi Aerodinamis Neon Green & Hitam */}
            <path d="M 32,24 C 60,18 100,18 124,28" stroke="#2EE59D" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 44,14 C 70,10 94,10 112,18" stroke="#0A0A0A" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Ekor Helm Aero Meruncing ke Belakang Kiri */}
            <polygon points="12,38 2,42 12,44" fill="#0A0A0A" />
            <polygon points="10,36 0,40 10,42" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="2" strokeLinejoin="round" />
          </g>

          {/* 6. KACAMATA VISOR BALAP NEON GREEN (#2EE59D) */}
          <rect x="52" y="66" width="86" height="26" rx="6" fill="#0A0A0A" />
          <rect x="50" y="64" width="86" height="26" rx="6" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="4" />
          {/* Sinar Kilau Putih Visor */}
          <line x1="58" y1="68" x2="72" y2="86" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="98" y1="68" x2="112" y2="86" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />

          {/* Pupil Mata di Balik Visor */}
          <circle cx="76" cy="77" r="4.5" fill="#0A0A0A" />
          <circle cx="77.5" cy="75.5" r="1.5" fill="#FFFFFF" />
          <circle cx="112" cy="77" r="4.5" fill="#0A0A0A" />
          <circle cx="113.5" cy="75.5" r="1.5" fill="#FFFFFF" />

          {/* 7. ALIS TEGAS & SENYUM ENERJIK */}
          <line x1="56" y1="56" x2="80" y2="58" stroke="#0A0A0A" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="108" y1="58" x2="132" y2="56" stroke="#0A0A0A" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M84,110 Q94,120 104,110" stroke="#0A0A0A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <rect x="46" y="104" width="10" height="6" rx="2" fill="#FFD60A" />
          <rect x="132" y="104" width="10" height="6" rx="2" fill="#FFD60A" />

          {/* 8. PITA MOBIUS INFINITY LOOP CI/CD DI DADA */}
          <g className="devops-loop">
            {/* Hard Shadow Infinity */}
            <path
              d="M 68,134 C 68,124 80,122 94,132 C 108,142 120,140 120,130 C 120,120 108,118 94,128 C 80,138 68,136 68,126"
              stroke="#0A0A0A"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
            />
            {/* Garis Utama Infinity Loop Neon Green */}
            <path
              d="M 66,132 C 66,122 78,120 92,130 C 106,140 118,138 118,128 C 118,118 106,116 92,126 C 78,136 66,134 66,124"
              stroke="#2EE59D"
              strokeWidth="6.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Node-node Pipeline (Build, Test, Deploy) */}
            <circle cx="66" cy="128" r="4" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="2" />
            <circle cx="92" cy="128" r="4.5" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2" />
            <circle cx="118" cy="128" r="4" fill="#00F0FF" stroke="#0A0A0A" strokeWidth="2" />
          </g>

          {/* 9. TANGAN KANAN MEMEGANG RODA GIR OTOMASI PIPELINE */}
          <g transform="translate(148, 108)">
            <line x1="-2" y1="12" x2="16" y2="20" stroke="#0A0A0A" strokeWidth="6" strokeLinecap="round" />
            <circle cx="16" cy="20" r="6" fill="#F43F5E" stroke="#0A0A0A" strokeWidth="3.5" />
            {/* Roda Gir Otomasi Bergerigi */}
            <g className="devops-gear" transform="translate(18, 16)">
              {/* Shadow Gir */}
              <circle cx="2" cy="2" r="16" fill="#0A0A0A" />
              {/* Badan Gir Kuning Emas */}
              <circle cx="0" cy="0" r="16" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="3" />
              {/* Gigi-gigi Gir */}
              <rect x="-18" y="-3" width="36" height="6" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2" rx="1" />
              <rect x="-3" y="-18" width="6" height="36" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2" rx="1" />
              <rect x="-13" y="-13" width="26" height="6" transform="rotate(45)" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2" rx="1" />
              <rect x="-13" y="-13" width="26" height="6" transform="rotate(-45)" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2" rx="1" />
              {/* Lubang Poros Tengah Gir */}
              <circle cx="0" cy="0" r="6" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="2.5" />
            </g>
          </g>

          {/* 10. TANGAN KIRI MEMEGANG KUNCI PAS PIT-STOP MEKANIK KILAT */}
          <g className="devops-wrench-arm" transform="translate(8, 98)">
            <line x1="30" y1="22" x2="14" y2="28" stroke="#0A0A0A" strokeWidth="6" strokeLinecap="round" />
            <circle cx="14" cy="28" r="6" fill="#F43F5E" stroke="#0A0A0A" strokeWidth="3.5" />
            {/* Kunci Pas Logam Perak */}
            <g transform="translate(10, 10) rotate(-35)">
              <rect x="2" y="2" width="7" height="32" rx="2" fill="#0A0A0A" />
              <rect x="0" y="0" width="7" height="32" rx="2" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="2" />
              {/* Kepala Kunci Pas C-Jaw */}
              <path
                d="M -3,-2 C -3,-8 10,-8 10,-2 L 5,3 L 2,3 Z"
                fill="#FFFFFF"
                stroke="#0A0A0A"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </g>
          </g>

          {/* 11. BADGE "CI/CD 🚀" DI KANAN ATAS */}
          <g transform="translate(142, 28)">
            <rect x="3" y="3" width="42" height="18" rx="4" fill="#0A0A0A" />
            <rect x="0" y="0" width="42" height="18" rx="4" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="2" />
            <text x="4" y="13" fontFamily="monospace" fontSize="8" fontWeight="900" fill="#0A0A0A">CI/CD🚀</text>
          </g>
        </g>
      </svg>
    </div>
  );
}
