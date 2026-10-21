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
 * Identitas: Sang Penenun Jaringan & Penyambung Serat Kabel (Network Splicer)
 * Ciri Khas: Antena router kembar di kepala dengan gelombang sinyal Wi-Fi konsentris cyan (#00F0FF),
 * kacamata visor serat optik HUD data stream 10G, tangan kiri dan tangan kanan memegang dua ujung kabel
 * yang terputus dengan serat tembaga mencuat dan percikan data spark kuning-cyan yang saling didekatkan
 * untuk disambung kembali (reconnect / network splicing).
 *
 * Base Anatomi: 100% konsisten dengan Base Model Batch 1 (kaki sol putih y=170, tubuh kuning rambu 106x94,
 * marka jalan putus-putus perut, pipi pink, mata ekspresif, mulut senyum, kepalan tangan kuning #FFD60A).
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
      aria-label="Maskot Network Engineer — The Connector: Papan penunjuk jalan neo-brutalism kuning dengan antena router sinyal Wi-Fi, visor serat optik HUD, dan kedua tangan memegang dua ujung kabel terputus yang sedang disambung kembali dengan percikan data spark"
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
            @keyframes net-cable-left {
              0%, 100% { transform: translateX(0px) rotate(0deg); }
              50% { transform: translateX(2.5px) rotate(2deg); }
            }
            @keyframes net-cable-right {
              0%, 100% { transform: translateX(0px) rotate(0deg); }
              50% { transform: translateX(-2.5px) rotate(-2deg); }
            }
            @keyframes net-spark-burst {
              0%, 100% { opacity: 0.85; transform: scale(0.9) rotate(0deg); }
              50% { opacity: 1; transform: scale(1.3) rotate(15deg); }
            }
            .net-animated-body {
              animation: ${isAnimated ? "net-float 3.5s ease-in-out infinite" : "none"};
              transform-origin: center bottom;
            }
            .net-animated-signal {
              animation: ${isAnimated ? "net-signal-pulse 2s ease-in-out infinite" : "none"};
              transform-origin: 95px 24px;
            }
            .net-animated-cable-left {
              animation: ${isAnimated ? "net-cable-left 2.4s ease-in-out infinite" : "none"};
              transform-origin: 42px 110px;
            }
            .net-animated-cable-right {
              animation: ${isAnimated ? "net-cable-right 2.4s ease-in-out infinite" : "none"};
              transform-origin: 148px 110px;
            }
            .net-animated-spark {
              animation: ${isAnimated ? "net-spark-burst 1.2s ease-in-out infinite" : "none"};
              transform-origin: 96px 124px;
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
          {/* LAYER 2: BADAN PAPAN RAMBU KUNING NEO-BRUTALISM (IDENTIK BATCH 1)*/}
          {/* ============================================================== */}
          {/* Hard Shadow Badan Kotak Hitam Pekat */}
          <rect x="48" y="56" width="106" height="94" rx="4" fill="#0A0A0A" />

          {/* Badan Rambu Utama Kuning #FFD60A */}
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

          {/* Marka Jalan Putus-Putus Perut */}
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
          {/* LAYER 3: MATA & EKSPRESI FOKUS PENYAMBUNG KABEL (IDENTIK BATCH 1)*/}
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
          {/* Kilau Cyan Jaringan */}
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
          {/* Kilau Cyan Jaringan */}
          <circle cx="114" cy="88" r="1.2" fill="#00F0FF" />

          {/* Alis Fokus Presisi */}
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

          {/* Mulut Senyum Percaya Diri (Reconnect Sukses!) */}
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
          {/* Tangkai Visor Samping */}
          <line x1="42" y1="84" x2="52" y2="84" stroke="#0A0A0A" strokeWidth="4" />
          <line x1="138" y1="84" x2="148" y2="84" stroke="#0A0A0A" strokeWidth="4" />

          {/* Hard Shadow Visor */}
          <rect
            x="54"
            y="72"
            width="86"
            height="34"
            rx="4"
            fill="#0A0A0A"
            fillOpacity="0.4"
          />
          {/* Kaca Lensa Visor Cyan Semi-Transparan */}
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
          {/* Frame Atas Visor Cyan Solid */}
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

          {/* Indikator Status HUD Visor */}
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

          {/* Garis Kilau Reflektif HUD Visor */}
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
          {/* Gelombang Sinyal Wi-Fi Konsentris Cyan */}
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
          {/* LAYER 6: TANGAN KIRI & KABEL TERPUTUS SISI A (SPLICING LEFT)   */}
          {/* ============================================================== */}
          <g className="net-animated-cable-left">
            {/* Kabel Melengkung dari Tubuh Kiri ke Tangan Kiri */}
            <path
              d="M 44 136 C 30 136 28 126 62 122"
              stroke="#0A0A0A"
              strokeWidth="7"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 44 136 C 30 136 28 126 62 122"
              stroke="#00F0FF"
              strokeWidth="4.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* Ujung Selongsong Kabel Kiri (Jacket) */}
            <path
              d="M 62 122 L 80 123"
              stroke="#0A0A0A"
              strokeWidth="6"
              fill="none"
            />
            <path
              d="M 62 122 L 80 123"
              stroke="#00F0FF"
              strokeWidth="3.5"
              fill="none"
            />

            {/* Serat Kawat Tembaga / Serat Optik Mencar di Ujung Putus Kiri */}
            {/* Kawat Tembaga 1 (Emas/Kuning) */}
            <line x1="80" y1="121" x2="88" y2="119" stroke="#FFD60A" strokeWidth="1.8" strokeLinecap="round" />
            {/* Kawat Tembaga 2 (Oranye) */}
            <line x1="80" y1="123" x2="90" y2="123" stroke="#FF8A3D" strokeWidth="2" strokeLinecap="round" />
            {/* Kawat Tembaga 3 (Cyan Data) */}
            <line x1="80" y1="125" x2="87" y2="127" stroke="#00F0FF" strokeWidth="1.8" strokeLinecap="round" />

            {/* Lengan Kiri Menjulur ke Tengah Memegang Kabel */}
            <path
              d="M 42 110 Q 52 116 68 122"
              stroke="#0A0A0A"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />

            {/* Kepalan Tangan Kiri Kuning (#FFD60A) */}
            <circle
              cx="68"
              cy="122"
              r="6.5"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="3.5"
            />
          </g>

          {/* ============================================================== */}
          {/* LAYER 7: TANGAN KANAN & KABEL TERPUTUS SISI B (SPLICING RIGHT)  */}
          {/* ============================================================== */}
          <g className="net-animated-cable-right">
            {/* Kabel Melengkung dari Tubuh Kanan ke Tangan Kanan */}
            <path
              d="M 144 136 C 158 136 160 126 126 122"
              stroke="#0A0A0A"
              strokeWidth="7"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 144 136 C 158 136 160 126 126 122"
              stroke="#00F0FF"
              strokeWidth="4.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* Ujung Selongsong Kabel Kanan (Jacket) */}
            <path
              d="M 126 122 L 108 123"
              stroke="#0A0A0A"
              strokeWidth="6"
              fill="none"
            />
            <path
              d="M 126 122 L 108 123"
              stroke="#00F0FF"
              strokeWidth="3.5"
              fill="none"
            />

            {/* Serat Kawat Tembaga / Serat Optik Mencar di Ujung Putus Kanan */}
            {/* Kawat Tembaga 1 (Emas/Kuning) */}
            <line x1="108" y1="121" x2="100" y2="119" stroke="#FFD60A" strokeWidth="1.8" strokeLinecap="round" />
            {/* Kawat Tembaga 2 (Oranye) */}
            <line x1="108" y1="123" x2="98" y2="123" stroke="#FF8A3D" strokeWidth="2" strokeLinecap="round" />
            {/* Kawat Tembaga 3 (Cyan Data) */}
            <line x1="108" y1="125" x2="101" y2="127" stroke="#00F0FF" strokeWidth="1.8" strokeLinecap="round" />

            {/* Lengan Kanan Menjulur ke Tengah Memegang Kabel */}
            <path
              d="M 148 110 Q 138 116 122 122"
              stroke="#0A0A0A"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />

            {/* Kepalan Tangan Kanan Kuning (#FFD60A) */}
            <circle
              cx="122"
              cy="122"
              r="6.5"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="3.5"
            />
          </g>

          {/* ============================================================== */}
          {/* LAYER 8: PERCIKAN SPARK LISTRIK / DATA LINK DI CELAH KABEL     */}
          {/* ============================================================== */}
          <g className="net-animated-spark">
            {/* Percikan Listrik Bintang Utama Kuning & Mint (#FFD60A / #2EE59D) */}
            <polygon
              points="94,116 96,122 102,123 96,125 94,131 92,125 86,123 92,122"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="1.2"
            />
            {/* Kilau Inti Putih */}
            <circle cx="94" cy="123.5" r="2" fill="#FFFFFF" />

            {/* Spark Mini Cyan (#00F0FF) */}
            <polygon
              points="99,117 100,119 103,119.5 100,120.5 99,122.5 98,120.5 96,119.5 98,119"
              fill="#00F0FF"
            />
            {/* Spark Mini Oranye (#FF8A3D) */}
            <polygon
              points="89,126 90,128 92,128.5 90,129.5 89,131.5 88,129.5 86,128.5 88,128"
              fill="#FF8A3D"
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
