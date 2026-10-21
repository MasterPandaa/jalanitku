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
 * Identitas: Sang Penenun Infrastruktur Jaringan & Pengatur Arus Paket Data
 * Ciri Khas: Antena router kembar di kepala dengan gelombang sinyal Wi-Fi konsentris cyan (#00F0FF),
 * kacamata visor serat optik HUD data stream 10G, tangan kanan memegang kepala kabel LAN RJ45 transparan
 * dengan 8 pin tembaga emas berkilau, dan tangan kiri memegang alat tester kabel LAN dengan 8 LED hijau mini.
 *
 * Base Anatomi: 100% konsisten dengan Base Model Batch 1 (kaki sol putih, tubuh kuning rambu 106x94,
 * marka jalan putus-putus, pipi pink, mata ekspresif, mulut senyum, tangan neo-brutalist).
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
      aria-label="Maskot Network Engineer — The Connector: Papan penunjuk jalan neo-brutalism kuning dengan antena router kembar sinyal Wi-Fi, visor serat optik HUD data stream, kabel LAN RJ45 emas bercahaya, dan tester kabel 8 LED hijau"
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
            @keyframes net-float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-3.5px); }
            }
            @keyframes net-signal-pulse {
              0%, 100% { opacity: 0.35; transform: scale(0.96); }
              50% { opacity: 1; transform: scale(1.04); }
            }
            @keyframes net-sparkle {
              0%, 100% { opacity: 0.8; transform: scale(1) rotate(0deg); }
              50% { opacity: 1; transform: scale(1.25) rotate(10deg); }
            }
            @keyframes net-rj45 {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(4deg) translateY(-2px); }
            }
            @keyframes net-tester {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(-3deg) translateY(-1px); }
            }
            .net-animated-body {
              animation: ${isAnimated ? "net-float 3.5s ease-in-out infinite" : "none"};
              transform-origin: center bottom;
            }
            .net-animated-signal {
              animation: ${isAnimated ? "net-signal-pulse 2s ease-in-out infinite" : "none"};
              transform-origin: 95px 24px;
            }
            .net-animated-rj45 {
              animation: ${isAnimated ? "net-rj45 3s ease-in-out infinite" : "none"};
              transform-origin: 174px 122px;
            }
            .net-animated-tester {
              animation: ${isAnimated ? "net-tester 3.2s ease-in-out infinite" : "none"};
              transform-origin: 18px 122px;
            }
            .net-animated-sparkle {
              animation: ${isAnimated ? "net-sparkle 1.8s ease-in-out infinite" : "none"};
              transform-origin: 179px 85px;
            }
          `}</style>
        </defs>

        {/* CONTAINER UTAMA DENGAN ANIMASI FLOAT */}
        <g className="net-animated-body transition-transform duration-300 group-hover:scale-105">
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
          {/* LAYER 3: MATA & MULUT DASAR (BATCH 1 BASE)                    */}
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
          {/* Kilau Cyan Link Aktif */}
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
          {/* Kilau Cyan Link Aktif */}
          <circle cx="114" cy="88" r="1.2" fill="#00F0FF" />

          {/* Alis Fokus Teknisi Jaringan */}
          <line
            x1="58"
            y1="71"
            x2="78"
            y2="72"
            stroke="#0A0A0A"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <line
            x1="102"
            y1="72"
            x2="122"
            y2="71"
            stroke="#0A0A0A"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Mulut Senyum Percaya Diri */}
          <path
            d="M 87 114 Q 94 123 102 114"
            stroke="#0A0A0A"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* ============================================================== */}
          {/* LAYER 4: KACAMATA VISOR SERAT OPTIK HUD DATA STREAM CYAN       */}
          {/* ============================================================== */}
          {/* Tangkai Frame Kacamata Visor */}
          <line x1="42" y1="84" x2="52" y2="84" stroke="#0A0A0A" strokeWidth="4" />
          <line x1="138" y1="84" x2="148" y2="84" stroke="#0A0A0A" strokeWidth="4" />

          {/* Hard Shadow Visor */}
          <rect x="54" y="72" width="86" height="34" rx="4" fill="#0A0A0A" fillOpacity="0.4" />

          {/* Frame Kaca Visor Cyan Semi-Transparan (#00F0FF) */}
          <rect
            x="50"
            y="69"
            width="88"
            height="34"
            rx="4"
            fill="#00F0FF"
            fillOpacity="0.25"
            stroke="#0A0A0A"
            strokeWidth="3.5"
          />

          {/* Bar Atas Frame Visor Cyan Solid */}
          <rect
            x="50"
            y="69"
            width="88"
            height="7"
            rx="2"
            fill="#00F0FF"
            stroke="#0A0A0A"
            strokeWidth="2"
          />

          {/* Indikator LED Data Traffic & Speed di Bar Visor */}
          <rect x="56" y="71" width="3" height="3" fill="#2EE59D" />
          <rect x="61" y="71" width="5" height="3" fill="#2EE59D" />
          <rect x="68" y="71" width="7" height="3" fill="#2EE59D" />
          <text
            x="126"
            y="75"
            fill="#0A0A0A"
            fontSize="5"
            fontWeight="bold"
            fontFamily="monospace"
          >
            10G
          </text>

          {/* Kilau Reflektif Serat Optik Putih Diagonal pada Visor */}
          <line
            x1="55"
            y1="75"
            x2="65"
            y2="100"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeOpacity="0.8"
          />
          <line
            x1="123"
            y1="75"
            x2="133"
            y2="100"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeOpacity="0.8"
          />

          {/* ============================================================== */}
          {/* LAYER 5: ANTENA ROUTER KEMBAR & GELOMBANG SINYAL WI-FI CYAN    */}
          {/* ============================================================== */}
          {/* Gelombang Radio Sinyal Wi-Fi Konsentris Cyan (#00F0FF) */}
          <g className="net-animated-signal">
            <path
              d="M 84 32 Q 95 24 106 32"
              stroke="#00F0FF"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 78 24 Q 95 12 112 24"
              stroke="#00F0FF"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 72 16 Q 95 0 118 16"
              stroke="#00F0FF"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="3 3"
            />
          </g>

          {/* Antena Kiri Router */}
          <line
            x1="68"
            y1="50"
            x2="62"
            y2="24"
            stroke="#0A0A0A"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="62" cy="22" r="5" fill="#00F0FF" stroke="#0A0A0A" strokeWidth="2.5" />
          <circle cx="62" cy="22" r="1.5" fill="#FFFFFF" />

          {/* Antena Kanan Router */}
          <line
            x1="122"
            y1="50"
            x2="128"
            y2="24"
            stroke="#0A0A0A"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="128" cy="22" r="5" fill="#00F0FF" stroke="#0A0A0A" strokeWidth="2.5" />
          <circle cx="128" cy="22" r="1.5" fill="#FFFFFF" />

          {/* Kerah Kemeja Teknisi Cyan (#00F0FF) */}
          <polygon
            points="78,144 94,144 88,132"
            fill="#00F0FF"
            stroke="#0A0A0A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <polygon
            points="110,144 94,144 100,132"
            fill="#00F0FF"
            stroke="#0A0A0A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Simpul / Pin LED Link Aktif */}
          <rect
            x="91"
            y="132"
            width="7"
            height="6"
            fill="#2EE59D"
            stroke="#0A0A0A"
            strokeWidth="2"
          />

          {/* ============================================================== */}
          {/* LAYER 6: TANGAN KIRI & TESTER KABEL JARINGAN (CABLE TESTER)    */}
          {/* ============================================================== */}
          <g className="net-animated-tester">
            {/* Hard Shadow Cable Tester */}
            <rect x="5" y="94" width="22" height="44" rx="3.5" fill="#0A0A0A" />

            {/* Bodi Alat Tester LAN Hitam */}
            <rect
              x="2"
              y="91"
              width="22"
              height="44"
              rx="3.5"
              fill="#0A0A0A"
              stroke="#0A0A0A"
              strokeWidth="2"
            />

            {/* Panel Depan Oranye (#FF8A3D) */}
            <rect
              x="4"
              y="93"
              width="18"
              height="40"
              rx="2.5"
              fill="#FF8A3D"
            />

            {/* Label LAN */}
            <text
              x="13"
              y="100"
              fill="#0A0A0A"
              fontSize="4.5"
              fontWeight="bold"
              textAnchor="middle"
              fontFamily="monospace"
            >
              LAN
            </text>

            {/* 8 LED Hijau Mini (#2EE59D) Berurutan Menunjukkan Sinyal 1-8 OK */}
            <circle cx="9" cy="104" r="1.5" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="0.8" />
            <circle cx="16" cy="104" r="1.5" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="0.8" />
            <circle cx="9" cy="110" r="1.5" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="0.8" />
            <circle cx="16" cy="110" r="1.5" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="0.8" />
            <circle cx="9" cy="116" r="1.5" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="0.8" />
            <circle cx="16" cy="116" r="1.5" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="0.8" />
            <circle cx="9" cy="122" r="1.5" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="0.8" />
            <circle cx="16" cy="122" r="1.5" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="0.8" />

            {/* Power ON Indicator Cyan */}
            <circle cx="12.5" cy="128" r="1.8" fill="#00F0FF" stroke="#0A0A0A" strokeWidth="0.8" />

            {/* Lengan Kiri Menjulur */}
            <path
              d="M 42 108 Q 28 114 18 122"
              stroke="#0A0A0A"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />

            {/* Kepalan Tangan Kiri Kuning (#FFD60A) */}
            <circle
              cx="18"
              cy="122"
              r="6.5"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="3.5"
            />
          </g>

          {/* ============================================================== */}
          {/* LAYER 7: TANGAN KANAN & KEPALA KABEL LAN RJ45 EMAS BERCAHAYA   */}
          {/* ============================================================== */}
          <g className="net-animated-rj45">
            {/* Kabel LAN Cyan Berkelok dari Samping Tubuh */}
            <path
              d="M 144 136 C 160 136 166 126 174 122"
              stroke="#00F0FF"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 144 136 C 160 136 166 126 174 122"
              stroke="#0A0A0A"
              strokeWidth="1.2"
              fill="none"
              strokeDasharray="4 3"
            />

            {/* Lengan Kanan Menjulur */}
            <path
              d="M 148 108 Q 164 114 174 122"
              stroke="#0A0A0A"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />

            {/* Hard Shadow Kepala RJ45 */}
            <rect x="174" y="96" width="18" height="22" rx="2.5" fill="#0A0A0A" />

            {/* Bodi Transparan RJ45 Connector Putih Translucent */}
            <rect
              x="171"
              y="93"
              width="18"
              height="22"
              rx="2.5"
              fill="#FFFFFF"
              stroke="#0A0A0A"
              strokeWidth="2.5"
            />

            {/* Klip Pengunci Plastik Cyan di Samping */}
            <polygon
              points="189,97 195,103 189,107"
              fill="#00F0FF"
              stroke="#0A0A0A"
              strokeWidth="2"
            />

            {/* 8 Pin Tembaga Emas RJ45 di Ujung Depan Konektor */}
            <line x1="173" y1="95" x2="173" y2="100" stroke="#FFD60A" strokeWidth="1.2" />
            <line x1="175" y1="95" x2="175" y2="100" stroke="#FF8A3D" strokeWidth="1.2" />
            <line x1="177" y1="95" x2="177" y2="100" stroke="#FFD60A" strokeWidth="1.2" />
            <line x1="179" y1="95" x2="179" y2="100" stroke="#FF8A3D" strokeWidth="1.2" />
            <line x1="181" y1="95" x2="181" y2="100" stroke="#FFD60A" strokeWidth="1.2" />
            <line x1="183" y1="95" x2="183" y2="100" stroke="#FF8A3D" strokeWidth="1.2" />
            <line x1="185" y1="95" x2="185" y2="100" stroke="#FFD60A" strokeWidth="1.2" />
            <line x1="187" y1="95" x2="187" y2="100" stroke="#FF8A3D" strokeWidth="1.2" />

            {/* Sparkle Kilau Data Link Aktif Hijau Neon (#2EE59D) */}
            <g className="net-animated-sparkle">
              <polygon
                points="180,85 182,88 186,89 182,90 180,94 178,90 174,89 178,88"
                fill="#2EE59D"
              />
              <circle cx="180" cy="89" r="1.5" fill="#FFFFFF" />
            </g>

            {/* Kepalan Tangan Kanan Kuning (#FFD60A) */}
            <circle
              cx="174"
              cy="122"
              r="6.5"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="3.5"
            />
          </g>

          {/* Partikel Sparkle Paket Data Melayang */}
          <circle cx="34" cy="42" r="2" fill="#00F0FF" />
          <circle cx="168" cy="40" r="2" fill="#FFD60A" />
          <circle cx="158" cy="32" r="1.5" fill="#2EE59D" />
        </g>
      </svg>
    </div>
  );
}
