"use client";

import React from "react";

export interface SoftwareEngineerMascotProps {
  size?: number;
  className?: string;
  animated?: boolean;
  state?: "idle" | "hover" | "happy";
}

/**
 * Maskot Role: Software Engineer — "The Architect"
 * Identitas: Sang Arsitek Kode & Fondasi Sistem Digital
 * Ciri Khas: Kacamata arsitek persegi cyan, blueprint digital dengan skema server node,
 * penggaris T teknikal, kubus fondasi modular 3D isometrik, dan helm konstruksi arsitek.
 */
export function SoftwareEngineerMascot({
  size = 200,
  className = "",
  animated = true,
  state = "idle",
}: SoftwareEngineerMascotProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none group ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Maskot Software Engineer — The Architect: Papan penunjuk jalan neo-brutalism dengan kacamata arsitek teknikal, cetak biru sistem, dan penggaris T"
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
            @keyframes se-float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-3px); }
            }
            @keyframes se-blueprint {
              0%, 100% { transform: rotate(-8deg); }
              50% { transform: rotate(-5deg) translateY(-2px); }
            }
            @keyframes se-cube {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-4px) rotate(3deg); }
            }
            @keyframes se-glint {
              0%, 100% { opacity: 0.8; }
              50% { opacity: 1; transform: scale(1.05); }
            }
            .se-animated-body {
              animation: ${animated ? "se-float 3.5s ease-in-out infinite" : "none"};
              transform-origin: center bottom;
            }
            .se-animated-blueprint {
              animation: ${animated ? "se-blueprint 3s ease-in-out infinite" : "none"};
              transform-origin: 36px 116px;
            }
            .se-animated-cube {
              animation: ${animated ? "se-cube 4s ease-in-out infinite" : "none"};
              transform-origin: 24px 62px;
            }
          `}</style>
        </defs>

        {/* CONTAINER UTAMA DENGAN ANIMASI FLOAT */}
        <g className="se-animated-body transition-transform duration-300 group-hover:scale-105">
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

          {/* Marka Jalan Putus-Putus (DNA Rambu Jalan) */}
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

          {/* Kerah Mantel & Dasi Arsitek */}
          <polygon
            points="78,144 94,144 88,132"
            fill="#FFFFFF"
            stroke="#0A0A0A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <polygon
            points="110,144 94,144 100,132"
            fill="#FFFFFF"
            stroke="#0A0A0A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Simpul Dasi Cyan */}
          <rect
            x="91"
            y="132"
            width="7"
            height="5"
            fill="#00F0FF"
            stroke="#0A0A0A"
            strokeWidth="2"
          />
          {/* Badan Dasi */}
          <polygon
            points="91,137 98,137 100,145 94.5,148 89,145"
            fill="#00F0FF"
            stroke="#0A0A0A"
            strokeWidth="2"
          />

          {/* Mulut Senyum Bangga */}
          <path
            d="M 88 114 Q 94.5 122 101 114"
            stroke="#0A0A0A"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* ============================================================== */}
          {/* LAYER 3: KACAMATA ARSITEK PERSEGI TEKNIKAL CYAN (#00F0FF)      */}
          {/* ============================================================== */}
          {/* Tangkai Kacamata Kiri & Kanan */}
          <line x1="42" y1="84" x2="54" y2="84" stroke="#0A0A0A" strokeWidth="4" />
          <line x1="134" y1="84" x2="148" y2="84" stroke="#0A0A0A" strokeWidth="4" />
          {/* Jembatan Hidung Frame */}
          <line x1="84" y1="84" x2="98" y2="84" stroke="#0A0A0A" strokeWidth="4" />

          {/* Frame Kacamata Kiri */}
          <rect
            x="54"
            y="72"
            width="30"
            height="26"
            rx="3"
            fill="#00F0FF"
            stroke="#0A0A0A"
            strokeWidth="3.5"
          />
          {/* Mata Kiri (Sklera Putih di dalam lensa) */}
          <rect
            x="61"
            y="77"
            width="16"
            height="16"
            rx="2"
            fill="#FFFFFF"
            stroke="#0A0A0A"
            strokeWidth="2.5"
          />
          {/* Pupil Hitam */}
          <rect x="66" y="81" width="7" height="9" rx="1.5" fill="#0A0A0A" />
          {/* Kilau Sinar Pupil */}
          <circle cx="68.5" cy="83.5" r="1.5" fill="#FFFFFF" />

          {/* Frame Kacamata Kanan */}
          <rect
            x="98"
            y="72"
            width="30"
            height="26"
            rx="3"
            fill="#00F0FF"
            stroke="#0A0A0A"
            strokeWidth="3.5"
          />
          {/* Mata Kanan (Sklera Putih di dalam lensa) */}
          <rect
            x="105"
            y="77"
            width="16"
            height="16"
            rx="2"
            fill="#FFFFFF"
            stroke="#0A0A0A"
            strokeWidth="2.5"
          />
          {/* Pupil Hitam */}
          <rect x="110" y="81" width="7" height="9" rx="1.5" fill="#0A0A0A" />
          {/* Kilau Sinar Pupil */}
          <circle cx="112.5" cy="83.5" r="1.5" fill="#FFFFFF" />

          {/* Kilau Reflektif Lensa Arsitek (Garis Putih Diagonal) */}
          <line
            x1="57"
            y1="75"
            x2="65"
            y2="92"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="101"
            y1="75"
            x2="109"
            y2="92"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* ============================================================== */}
          {/* LAYER 4: HELM KONSTRUKSI / HARD HAT ARSITEK                    */}
          {/* ============================================================== */}
          {/* Hard Shadow Helm */}
          <path
            d="M 44 48 C 44 24 146 24 146 48 Z"
            fill="#0A0A0A"
          />
          {/* Kubah Helm Oranye (#FF8A3D) */}
          <path
            d="M 44 44 C 44 20 144 20 144 44 Z"
            fill="#FF8A3D"
            stroke="#0A0A0A"
            strokeWidth="4"
          />
          {/* Tonjolan Garis Tengah Helm */}
          <path
            d="M 90 21 C 90 19 99 19 99 21 L 100 44 L 89 44 Z"
            fill="#FFD60A"
            stroke="#0A0A0A"
            strokeWidth="2.5"
          />
          {/* Visor / Pelindung Datar Helm */}
          <rect
            x="34"
            y="42"
            width="120"
            height="10"
            rx="3"
            fill="#FFD60A"
            stroke="#0A0A0A"
            strokeWidth="4"
          />
          {/* Emblem Server Node di Helm */}
          <rect
            x="89"
            y="27"
            width="10"
            height="10"
            rx="2"
            fill="#00F0FF"
            stroke="#0A0A0A"
            strokeWidth="2"
          />

          {/* ============================================================== */}
          {/* LAYER 5: TANGAN KANAN DENGAN PENGGARIS T / STYLUS TEKNIKAL     */}
          {/* ============================================================== */}
          {/* Lengan Kanan Menjulur */}
          <path
            d="M 148 108 Q 164 106 172 100"
            stroke="#0A0A0A"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />

          {/* Penggaris T Vertikal di Belakang Tangan */}
          {/* Batang Penggaris Pink Magenta (#FF5C8A) */}
          <rect
            x="172"
            y="62"
            width="6"
            height="58"
            rx="1"
            fill="#FF5C8A"
            stroke="#0A0A0A"
            strokeWidth="3"
          />
          {/* Kepala Siku T Horizontal Kuning */}
          <rect
            x="162"
            y="58"
            width="26"
            height="6"
            rx="1.5"
            fill="#FFD60A"
            stroke="#0A0A0A"
            strokeWidth="3"
          />
          {/* Skala Garis Ukur pada Penggaris */}
          <line x1="174" y1="74" x2="177" y2="74" stroke="#0A0A0A" strokeWidth="1.5" />
          <line x1="174" y1="82" x2="177" y2="82" stroke="#0A0A0A" strokeWidth="1.5" />
          <line x1="174" y1="90" x2="177" y2="90" stroke="#0A0A0A" strokeWidth="1.5" />
          <line x1="174" y1="108" x2="177" y2="108" stroke="#0A0A0A" strokeWidth="1.5" />

          {/* Kepalan Tangan Kanan Mencengkeram Penggaris T */}
          <circle
            cx="170"
            cy="100"
            r="7.5"
            fill="#FFD60A"
            stroke="#0A0A0A"
            strokeWidth="3.5"
          />

          {/* ============================================================== */}
          {/* LAYER 6: BLUEPRINT CETAK BIRU DIGITAL (TANGAN KIRI)            */}
          {/* ============================================================== */}
          <g className="se-animated-blueprint">
            {/* Lengan Kiri */}
            <path
              d="M 42 110 Q 28 114 36 122"
              stroke="#0A0A0A"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />

            {/* Hard Shadow Blueprint */}
            <rect
              x="12"
              y="74"
              width="44"
              height="58"
              rx="2.5"
              fill="#0A0A0A"
              transform="rotate(-8 34 103)"
            />
            {/* Kertas Blueprint Cyan Pekat (#05B6D4 / #00C4EE) */}
            <rect
              x="8"
              y="70"
              width="44"
              height="58"
              rx="2.5"
              fill="#05B6D4"
              stroke="#0A0A0A"
              strokeWidth="3.5"
              transform="rotate(-8 30 99)"
            />

            {/* Diagram Arsitektur di dalam Blueprint */}
            <g transform="rotate(-8 30 99)">
              {/* Header Tab Blueprint */}
              <rect x="12" y="74" width="36" height="6" fill="#0369A1" />
              <line x1="14" y1="77" x2="28" y2="77" stroke="#FFFFFF" strokeWidth="1.5" />

              {/* Node Server 1 (Atas - Microservice Gateway) */}
              <rect x="22" y="84" width="16" height="8" rx="1" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="1.5" />
              {/* Garis Bus Koneksi */}
              <line x1="30" y1="92" x2="30" y2="98" stroke="#FFFFFF" strokeWidth="2" />
              <line x1="18" y1="98" x2="42" y2="98" stroke="#FFFFFF" strokeWidth="1.5" />
              <line x1="18" y1="98" x2="18" y2="103" stroke="#FFFFFF" strokeWidth="1.5" />
              <line x1="42" y1="98" x2="42" y2="103" stroke="#FFFFFF" strokeWidth="1.5" />

              {/* Node Service A & B */}
              <rect x="12" y="103" width="12" height="7" rx="1" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="1.5" />
              <rect x="36" y="103" width="12" height="7" rx="1" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="1.5" />

              {/* Database Node (Silinder Bawah) */}
              <line x1="24" y1="110" x2="30" y2="114" stroke="#FFFFFF" strokeWidth="1.5" />
              <line x1="36" y1="110" x2="30" y2="114" stroke="#FFFFFF" strokeWidth="1.5" />
              <rect x="23" y="114" width="14" height="8" rx="2" fill="#FF5C8A" stroke="#0A0A0A" strokeWidth="1.5" />
            </g>

            {/* Kepalan Tangan Kiri Menjepit Lembar Blueprint */}
            <circle
              cx="38"
              cy="116"
              r="7.5"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="3.5"
            />
          </g>

          {/* ============================================================== */}
          {/* LAYER 7: KUBUS MODULAR 3D ISOMETRIK (MELAYANG DI SUDUT KIRI)    */}
          {/* ============================================================== */}
          <g className="se-animated-cube">
            {/* Hard Shadow Kubus */}
            <polygon
              points="20,52 30,47 30,59 20,64"
              fill="#0A0A0A"
            />
            {/* Kubus 3D Isometrik Layered Foundation */}
            {/* Sisi Atas Kubus (Top Face - Cyan) */}
            <polygon
              points="16,36 28,30 40,36 28,42"
              fill="#00F0FF"
              stroke="#0A0A0A"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Sisi Kiri Kubus (Left Face - Oranye) */}
            <polygon
              points="16,36 28,42 28,54 16,48"
              fill="#FF8A3D"
              stroke="#0A0A0A"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Sisi Kanan Kubus (Right Face - Pink) */}
            <polygon
              points="28,42 40,36 40,48 28,54"
              fill="#FF5C8A"
              stroke="#0A0A0A"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Titik Koneksi Simbol Fondasi Modular */}
            <circle cx="28" cy="36" r="2" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="1" />
          </g>

          {/* Simbol Arsitektur Tambahan: Grid Titik Koordinat Melayang */}
          <circle cx="156" cy="36" r="2" fill="#0A0A0A" />
          <circle cx="166" cy="36" r="2" fill="#0A0A0A" />
          <circle cx="156" cy="46" r="2" fill="#0A0A0A" />
          <circle cx="166" cy="46" r="2" fill="#0A0A0A" />
        </g>
      </svg>
    </div>
  );
}
