"use client";

import React from "react";

export interface CloudEngineerMascotProps {
  size?: number | string;
  className?: string;
  animated?: boolean;
  animate?: boolean;
  state?: "idle" | "hover" | "happy";
}

/**
 * Maskot Role: Cloud Engineer — "The Ascender"
 * Identitas: Sang Penakluk Angkasa Digital & Arsitek Infrastruktur Awan
 * Ciri Khas: Menaiki awan komputasi neo-brutalism terapung (Cloud Carpet),
 * kacamata aviator emas penerbang angkasa, kunci arsitektur awan emas di tangan kanan,
 * kubus kontener Kubernetes pod terapung di tangan kiri, dan badge 99.99% Uptime.
 */
export function CloudEngineerMascot({
  size = 200,
  className = "",
  animated = true,
  animate,
  state = "idle",
}: CloudEngineerMascotProps) {
  const isAnimated = animate !== undefined ? animate : animated;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none group ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Maskot Cloud Engineer — The Ascender: Papan rambu biru awan menaiki karpet awan terapung dengan kacamata aviator emas, kunci server awan, dan mini kontener kubus Kubernetes"
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
            @keyframes cloud-float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-7px); }
            }
            @keyframes cloud-carpet {
              0%, 100% { transform: scale(1) translateX(0px); }
              50% { transform: scale(1.03) translateX(2px); }
            }
            @keyframes node-spin {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-5px) rotate(10deg); }
            }
            .cloud-animated {
              animation: ${isAnimated ? "cloud-float 4.2s ease-in-out infinite" : "none"};
              transform-origin: center bottom;
            }
            .cloud-base {
              animation: ${isAnimated ? "cloud-carpet 3s ease-in-out infinite" : "none"};
            }
            .cloud-node {
              animation: ${isAnimated ? "node-spin 2.5s ease-in-out infinite" : "none"};
              transform-origin: 24px 70px;
            }
          `}</style>
        </defs>

        <g className="cloud-animated transition-transform duration-300 group-hover:scale-105">
          {/* 1. KARPET AWAN KOMPUTASI NEO-BRUTALISM (THE CLOUD CARPET) */}
          <g className="cloud-base" transform="translate(14, 142)">
            {/* Shadow Awan */}
            <path
              d="M 28,24 C 14,24 8,36 18,48 C 12,56 20,66 32,64 L 140,64 C 152,66 160,56 154,48 C 164,36 158,24 144,24 C 136,12 118,10 106,18 C 96,8 76,8 66,18 C 54,10 36,12 28,24 Z"
              fill="#0A0A0A"
            />
            {/* Badan Awan Putih Bersih */}
            <path
              d="M 24,18 C 10,18 4,30 14,42 C 8,50 16,60 28,58 L 136,58 C 148,60 156,50 150,42 C 160,30 154,18 140,18 C 132,6 114,4 102,12 C 92,2 72,2 62,12 C 50,4 32,6 24,18 Z"
              fill="#FFFFFF"
              stroke="#0A0A0A"
              strokeWidth="4.5"
              strokeLinejoin="round"
            />
            {/* Aksen Biru Langit di Lekukan Awan */}
            <path d="M 44,26 C 54,18 70,18 80,24" stroke="#38BDF8" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 94,22 C 106,16 122,16 130,24" stroke="#38BDF8" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>

          {/* 2. BAYANGAN BADAN KERAS (HARD DROP SHADOW) */}
          <rect x="46" y="44" width="112" height="106" rx="10" fill="#0A0A0A" />

          {/* 3. BADAN UTAMA RAMBU (BIRU AWAN CERAH #38BDF8) */}
          <rect
            x="38"
            y="36"
            width="112"
            height="106"
            rx="10"
            fill="#38BDF8"
            stroke="#0A0A0A"
            strokeWidth="5"
            strokeLinejoin="round"
          />

          {/* 4. GARIS DEKORATIF DASHED */}
          <line x1="48" y1="130" x2="140" y2="130" stroke="#0A0A0A" strokeWidth="4" strokeDasharray="8 6" />

          {/* 5. KACAMATA AVIATOR PENERBANG ANGKASA EMAS */}
          {/* Frame Aviator Hitam Shadow */}
          <ellipse cx="72" cy="74" rx="20" ry="16" fill="#0A0A0A" />
          <ellipse cx="116" cy="74" rx="20" ry="16" fill="#0A0A0A" />
          <line x1="90" y1="68" x2="98" y2="68" stroke="#0A0A0A" strokeWidth="6" />

          {/* Lensa Aviator Kiri (Kuning Emas) */}
          <ellipse cx="70" cy="72" rx="19" ry="15" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="4" />
          <circle cx="74" cy="72" r="5" fill="#0A0A0A" />
          <circle cx="75.5" cy="70.5" r="1.5" fill="#FFFFFF" />
          <line x1="58" y1="66" x2="68" y2="78" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />

          {/* Lensa Aviator Kanan (Kuning Emas) */}
          <ellipse cx="114" cy="72" rx="19" ry="15" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="4" />
          <circle cx="118" cy="72" r="5" fill="#0A0A0A" />
          <circle cx="119.5" cy="70.5" r="1.5" fill="#FFFFFF" />
          <line x1="102" y1="66" x2="112" y2="78" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />

          {/* 6. ALIS TEGAS & SENYUM OPTIMIS ANGKASA */}
          <line x1="52" y1="52" x2="84" y2="55" stroke="#0A0A0A" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="104" y1="55" x2="136" y2="52" stroke="#0A0A0A" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M84,106 Q94,116 104,106" stroke="#0A0A0A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <rect x="46" y="98" width="10" height="6" rx="2" fill="#FF5C8A" />
          <rect x="132" y="98" width="10" height="6" rx="2" fill="#FF5C8A" />

          {/* 7. TANGAN KANAN MENGACUNGKAN KUNCI ARSITEKTUR CLOUD */}
          <g transform="translate(148, 70) rotate(-15)">
            <line x1="-2" y1="36" x2="18" y2="28" stroke="#0A0A0A" strokeWidth="6" strokeLinecap="round" />
            <circle cx="18" cy="28" r="6" fill="#38BDF8" stroke="#0A0A0A" strokeWidth="3.5" />
            {/* Batang Kunci Server Emas */}
            <line x1="18" y1="28" x2="28" y2="-8" stroke="#0A0A0A" strokeWidth="8" strokeLinecap="round" />
            <line x1="18" y1="28" x2="28" y2="-8" stroke="#FFD60A" strokeWidth="5" strokeLinecap="round" />
            {/* Kepala Kunci Berbentuk Awan Cloud */}
            <g transform="translate(24, -20)">
              <ellipse cx="6" cy="4" rx="10" ry="7" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2.5" />
              <circle cx="6" cy="4" r="3" fill="#0A0A0A" />
              <line x1="14" y1="8" x2="18" y2="8" stroke="#0A0A0A" strokeWidth="2.5" />
              <line x1="14" y1="14" x2="20" y2="14" stroke="#0A0A0A" strokeWidth="2.5" />
            </g>
          </g>

          {/* 8. TANGAN KIRI MEMEGANG SERVER POD KUBUS KONTENER CLOUD */}
          <g className="cloud-node" transform="translate(8, 72)">
            <line x1="30" y1="32" x2="14" y2="26" stroke="#0A0A0A" strokeWidth="6" strokeLinecap="round" />
            <circle cx="14" cy="26" r="6" fill="#38BDF8" stroke="#0A0A0A" strokeWidth="3.5" />
            {/* Kubus Kontener Kubernetes Pod Terapung */}
            <g transform="translate(-4, 0)">
              <rect x="3" y="3" width="24" height="24" rx="4" fill="#0A0A0A" />
              <rect x="0" y="0" width="24" height="24" rx="4" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="2.5" />
              <polygon points="12,4 20,8 12,12 4,8" fill="#38BDF8" stroke="#0A0A0A" strokeWidth="1" />
              <line x1="12" y1="12" x2="12" y2="20" stroke="#0A0A0A" strokeWidth="1.5" />
              <line x1="4" y1="8" x2="4" y2="16" stroke="#0A0A0A" strokeWidth="1.5" />
              <line x1="20" y1="8" x2="20" y2="16" stroke="#0A0A0A" strokeWidth="1.5" />
            </g>
          </g>

          {/* 9. BADGE UPTIME 99.99% CLOUD */}
          <g transform="translate(140, 20)">
            <rect x="3" y="3" width="46" height="18" rx="4" fill="#0A0A0A" />
            <rect x="0" y="0" width="46" height="18" rx="4" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="2" />
            <text x="4" y="13" fontFamily="monospace" fontSize="8" fontWeight="900" fill="#0A0A0A">99.99%☁</text>
          </g>
        </g>
      </svg>
    </div>
  );
}
