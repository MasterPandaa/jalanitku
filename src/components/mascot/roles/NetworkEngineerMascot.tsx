"use client";

import React from "react";

export interface NetworkEngineerMascotProps {
  size?: number | string;
  className?: string;
  animated?: boolean;
  animate?: boolean;
  state?: "idle" | "hover" | "happy";
}

/**
 * Maskot Role: Network Engineer — "The Connector"
 * Identitas: Sang Penenun Kabel & Pengendali Arus Transmisi Data
 * Ciri Khas: Antena router kembar dengan gelombang sinyal Wi-Fi konsentris cyan,
 * kacamata visor serat optik HUD data, kepala kabel RJ45 emas transparan,
 * sabuk port switch 4-LED, dan tester kabel portabel.
 */
export function NetworkEngineerMascot({
  size = 200,
  className = "",
  animated = true,
  animate,
  state = "idle",
}: NetworkEngineerMascotProps) {
  const isAnimated = animate !== undefined ? animate : animated;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none group ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Maskot Network Engineer — The Connector: Papan rambu kuning dengan antena router ganda, gelombang Wi-Fi, kabel LAN RJ45 tembaga emas, dan visor serat optik HUD"
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
            @keyframes net-bob {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-4px); }
            }
            @keyframes net-wave {
              0% { opacity: 0; transform: scale(0.7); }
              50% { opacity: 1; transform: scale(1.1); }
              100% { opacity: 0; transform: scale(1.4); }
            }
            @keyframes net-cable {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(-8deg); }
            }
            .net-animated {
              animation: ${isAnimated ? "net-bob 4s ease-in-out infinite" : "none"};
              transform-origin: center bottom;
            }
            .net-signal {
              animation: ${isAnimated ? "net-wave 2s ease-out infinite" : "none"};
              transform-origin: 94px 22px;
            }
            .net-rj45 {
              animation: ${isAnimated ? "net-cable 2.4s ease-in-out infinite" : "none"};
              transform-origin: 164px 115px;
            }
          `}</style>
        </defs>

        <g className="net-animated transition-transform duration-300 group-hover:scale-105">
          {/* 1. SEPATU SAFETY KABEL */}
          <rect x="66" y="162" width="22" height="24" fill="#0A0A0A" />
          <rect x="112" y="162" width="22" height="24" fill="#0A0A0A" />
          <rect x="62" y="160" width="22" height="24" fill="#0A0A0A" rx="2" />
          <rect x="108" y="160" width="22" height="24" fill="#0A0A0A" rx="2" />
          <line x1="62" y1="180" x2="84" y2="180" stroke="#00F0FF" strokeWidth="3" />
          <line x1="108" y1="180" x2="130" y2="180" stroke="#00F0FF" strokeWidth="3" />

          {/* 2. BAYANGAN BADAN KERAS (HARD DROP SHADOW) */}
          <rect x="46" y="52" width="112" height="110" rx="10" fill="#0A0A0A" />

          {/* 3. BADAN UTAMA RAMBU (KUNING KABEL #FFD60A) */}
          <rect
            x="38"
            y="44"
            width="112"
            height="110"
            rx="10"
            fill="#FFD60A"
            stroke="#0A0A0A"
            strokeWidth="5"
            strokeLinejoin="round"
          />

          {/* 4. GARIS DEKORATIF BUS JARINGAN */}
          <line x1="48" y1="142" x2="140" y2="142" stroke="#0A0A0A" strokeWidth="4" strokeDasharray="8 6" />

          {/* 5. ANTENA ROUTER KEMBAR DI KEPALA */}
          {/* Antena Kiri */}
          <line x1="66" y1="44" x2="62" y2="14" stroke="#0A0A0A" strokeWidth="6" strokeLinecap="round" />
          <circle cx="62" cy="12" r="6" fill="#00F0FF" stroke="#0A0A0A" strokeWidth="3" />
          {/* Antena Kanan */}
          <line x1="126" y1="44" x2="130" y2="14" stroke="#0A0A0A" strokeWidth="6" strokeLinecap="round" />
          <circle cx="130" cy="12" r="6" fill="#00F0FF" stroke="#0A0A0A" strokeWidth="3" />

          {/* GELOMBANG SINYAL WIFI RADIO MEMANCAR */}
          <g className="net-signal" transform="translate(0, -6)">
            <path d="M 80,18 Q 96,6 112,18" stroke="#00F0FF" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 72,12 Q 96,-2 120,12" stroke="#00F0FF" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>

          {/* 6. VISOR KACAMATA SERAT OPTIK TEKNOLOGI CYAN */}
          <rect x="50" y="66" width="90" height="28" rx="6" fill="#0A0A0A" />
          <rect x="48" y="64" width="90" height="28" rx="6" fill="#00F0FF" stroke="#0A0A0A" strokeWidth="4" />
          {/* Display HUD Data Bar di Visor */}
          <line x1="56" y1="74" x2="80" y2="74" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="56" y1="80" x2="72" y2="80" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="94" cy="78" r="4" fill="#0A0A0A" />
          <circle cx="95.5" cy="76.5" r="1.5" fill="#FFFFFF" />
          <circle cx="120" cy="78" r="4" fill="#0A0A0A" />
          <circle cx="121.5" cy="76.5" r="1.5" fill="#FFFFFF" />

          {/* 7. SENYUM TEGAS & PIPI PINK */}
          <path d="M84,116 Q94,124 104,116" stroke="#0A0A0A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <rect x="46" y="106" width="10" height="6" rx="2" fill="#FF5C8A" />
          <rect x="132" y="106" width="10" height="6" rx="2" fill="#FF5C8A" />

          {/* 8. SABUK CRIMPING TOOL & PORT SWITCH ETHERNET DI PINGGANG */}
          <rect x="48" y="132" width="92" height="10" fill="#0A0A0A" />
          {/* 4 Port RJ45 di Sabuk */}
          <rect x="56" y="134" width="8" height="6" fill="#2EE59D" />
          <rect x="70" y="134" width="8" height="6" fill="#2EE59D" />
          <rect x="84" y="134" width="8" height="6" fill="#2EE59D" />
          <rect x="98" y="134" width="8" height="6" fill="#00F0FF" />

          {/* 9. TANGAN KANAN MEMEGANG KABEL LAN RJ45 EMAS (THE CONNECTOR) */}
          <g className="net-rj45">
            <line x1="146" y1="110" x2="164" y2="124" stroke="#0A0A0A" strokeWidth="6" strokeLinecap="round" />
            <circle cx="164" cy="122" r="6" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="3.5" />
            {/* Kepala Konektor RJ45 Transparan dengan Pin Kuningan */}
            <g transform="translate(156, 78) rotate(15)">
              <rect x="3" y="3" width="22" height="34" rx="4" fill="#0A0A0A" />
              <rect x="0" y="0" width="22" height="34" rx="4" fill="#00F0FF" stroke="#0A0A0A" strokeWidth="3" />
              {/* Klip Pengunci Plastik RJ45 */}
              <path d="M 7,0 L 11,-8 L 15,0" stroke="#0A0A0A" strokeWidth="2.5" fill="#FFFFFF" />
              {/* 8 Pin Tembaga Emas */}
              <line x1="4" y1="28" x2="4" y2="34" stroke="#FFD60A" strokeWidth="2" />
              <line x1="8" y1="28" x2="8" y2="34" stroke="#FFD60A" strokeWidth="2" />
              <line x1="12" y1="28" x2="12" y2="34" stroke="#FFD60A" strokeWidth="2" />
              <line x1="16" y1="28" x2="16" y2="34" stroke="#FFD60A" strokeWidth="2" />
            </g>
            {/* Kabel Biru Melingkar ke Belakang */}
            <path d="M 166,112 Q 190,135 180,155 Q 165,170 148,154" stroke="#00F0FF" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M 166,112 Q 190,135 180,155 Q 165,170 148,154" stroke="#0A0A0A" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
          </g>

          {/* 10. TANGAN KIRI MEMEGANG CABLE TESTER LED */}
          <g transform="translate(12, 94)">
            <line x1="28" y1="18" x2="14" y2="28" stroke="#0A0A0A" strokeWidth="6" strokeLinecap="round" />
            <circle cx="16" cy="28" r="6" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="3.5" />
            {/* Tester Body */}
            <rect x="2" y="2" width="22" height="42" rx="4" fill="#0A0A0A" />
            <rect x="0" y="0" width="22" height="42" rx="4" fill="#FF5C8A" stroke="#0A0A0A" strokeWidth="2.5" />
            {/* Lampu Indikator 1-8 */}
            <circle cx="6" cy="10" r="2" fill="#2EE59D" />
            <circle cx="11" cy="10" r="2" fill="#2EE59D" />
            <circle cx="16" cy="10" r="2" fill="#2EE59D" />
            <circle cx="6" cy="18" r="2" fill="#2EE59D" />
            <circle cx="11" cy="18" r="2" fill="#2EE59D" />
            <circle cx="16" cy="18" r="2" fill="#2EE59D" />
            <circle cx="6" cy="26" r="2" fill="#2EE59D" />
            <circle cx="11" cy="26" r="2" fill="#2EE59D" />
            <rect x="4" y="32" width="14" height="4" fill="#0A0A0A" />
          </g>

          {/* 11. BADGE "1 Gbps LINK" */}
          <g transform="translate(144, 28)">
            <rect x="3" y="3" width="38" height="18" rx="4" fill="#0A0A0A" />
            <rect x="0" y="0" width="38" height="18" rx="4" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="2" />
            <text x="4" y="13" fontFamily="monospace" fontSize="8" fontWeight="900" fill="#0A0A0A">1Gbps⚡</text>
          </g>
        </g>
      </svg>
    </div>
  );
}
