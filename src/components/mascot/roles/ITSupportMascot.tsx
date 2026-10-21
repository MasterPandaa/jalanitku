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
 * Identitas: Sang Dokter IT / Sistem Medic Penyelamat Operasional
 * Ciri Khas: Head mirror dokter bulat dengan tali kepala hitam, stetoskop dokter IT melingkar di leher
 * dengan tabung cyan dan chest piece logam menempel di dada, jas lab dokter putih berpin palang hijau
 * P3K IT, tangan kiri memegang kotak pertolongan pertama P3K IT (Medical Kit), dan tangan kanan
 * memegang suntikan USB siber / termometer diagnostik digital berindikator status hijau OK.
 *
 * Base Anatomi: 100% konsisten dengan Base Model Batch 1 (kaki sol putih y=170, tubuh kuning rambu 106x94,
 * marka jalan putus-putus perut, pipi pink, mata ekspresif, mulut senyum, kepalan tangan kuning #FFD60A).
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
      aria-label="Maskot IT Support — The Fixer: Papan penunjuk jalan neo-brutalism kuning bertema Dokter IT dengan cermin kepala dokter, stetoskop cyan, jas lab palang hijau, kotak P3K IT medis, dan suntikan USB diagnostik"
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
            @keyframes its-float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-3.5px); }
            }
            @keyframes its-toolbox {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(-4deg) translateY(-1px); }
            }
            @keyframes its-syringe {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(5deg) translateY(-2px); }
            }
            @keyframes its-stetho-pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.08); }
            }
            @keyframes its-sparkle {
              0%, 100% { transform: scale(1); opacity: 0.8; }
              50% { transform: scale(1.2); opacity: 1; }
            }
            .its-animated-body {
              animation: ${isAnimated ? "its-float 3.5s ease-in-out infinite" : "none"};
              transform-origin: center bottom;
            }
            .its-animated-toolbox {
              animation: ${isAnimated ? "its-toolbox 3s ease-in-out infinite" : "none"};
              transform-origin: 20px 124px;
            }
            .its-animated-syringe {
              animation: ${isAnimated ? "its-syringe 2.8s ease-in-out infinite" : "none"};
              transform-origin: 172px 120px;
            }
            .its-animated-stetho {
              animation: ${isAnimated ? "its-stetho-pulse 2s ease-in-out infinite" : "none"};
              transform-origin: 94px 134px;
            }
            .its-animated-sparkle {
              animation: ${isAnimated ? "its-sparkle 1.8s ease-in-out infinite" : "none"};
              transform-origin: 156px 60px;
            }
          `}</style>
        </defs>

        {/* CONTAINER UTAMA DENGAN ANIMASI FLOAT */}
        <g className="its-animated-body transition-transform duration-300 group-hover:scale-105">
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
          {/* LAYER 3: MATA & EKSPRESI RAMAH DOKTER IT (IDENTIK BATCH 1)     */}
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
          {/* Kilau Cyan Bersahabat */}
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
          {/* Kilau Cyan Bersahabat */}
          <circle cx="114" cy="88" r="1.2" fill="#00F0FF" />

          {/* Alis Ramah Ceria Solutif */}
          <path
            d="M 58 70 Q 69 66 79 70"
            stroke="#0A0A0A"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 103 70 Q 113 66 124 70"
            stroke="#0A0A0A"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Mulut Senyum Hangat Ramah */}
          <path
            d="M 87 114 Q 94 123 102 114"
            stroke="#0A0A0A"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* ============================================================== */}
          {/* LAYER 4: JAS LAB DOKTER PUTIH & STETOSKOP MELINGKAR DI DADA     */}
          {/* ============================================================== */}
          {/* Lapel Kerah Jas Lab Dokter Putih */}
          <polygon
            points="74,144 94,144 84,130"
            fill="#FFFFFF"
            stroke="#0A0A0A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <polygon
            points="114,144 94,144 104,130"
            fill="#FFFFFF"
            stroke="#0A0A0A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Pin Saku Jas Dokter: Palang Hijau P3K IT */}
          <rect
            x="116"
            y="126"
            width="18"
            height="14"
            rx="2"
            fill="#FFFFFF"
            stroke="#0A0A0A"
            strokeWidth="1.8"
          />
          {/* Palang Hijau Neon (#2EE59D) di Saku Dokter */}
          <rect x="123" y="128" width="4" height="10" fill="#2EE59D" />
          <rect x="120" y="131" width="10" height="4" fill="#2EE59D" />

          {/* Tabung Stetoskop Melingkar dari Leher ke Dada */}
          {/* Bayangan Tabung */}
          <path
            d="M 64 64 C 44 98 72 136 94 134 C 116 136 144 98 126 64"
            stroke="#0A0A0A"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Tabung Cyan (#00F0FF) Stetoskop */}
          <path
            d="M 64 64 C 44 98 72 136 94 134 C 116 136 144 98 126 64"
            stroke="#00F0FF"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />

          {/* Chest Piece / Bell Stetoskop Menempel di Dada (Animated Pulse) */}
          <g className="its-animated-stetho">
            {/* Hard Shadow Bell Stetoskop */}
            <circle cx="95" cy="135" r="7" fill="#0A0A0A" />
            {/* Bell Logam Perak / Putih */}
            <circle
              cx="94"
              cy="134"
              r="7"
              fill="#FFFFFF"
              stroke="#0A0A0A"
              strokeWidth="2.5"
            />
            {/* Ring Dalam Cyan */}
            <circle cx="94" cy="134" r="4" fill="#00F0FF" stroke="#0A0A0A" strokeWidth="1.2" />
            <circle cx="94" cy="134" r="1.5" fill="#FFFFFF" />
          </g>

          {/* ============================================================== */}
          {/* LAYER 5: HEAD MIRROR DOKTER (CERMIN BULAT DOKTER DI DAHI)       */}
          {/* ============================================================== */}
          {/* Tali Ikat Kepala Elastis Hitam di Dahi */}
          <path
            d="M 42 56 Q 95 50 148 56"
            stroke="#0A0A0A"
            strokeWidth="4.5"
            fill="none"
          />
          <path
            d="M 42 56 Q 95 50 148 56"
            stroke="#00F0FF"
            strokeWidth="1.5"
            fill="none"
          />

          {/* Gagang / Engsel Cermin Kepala */}
          <rect x="74" y="44" width="6" height="12" rx="1" fill="#0A0A0A" />

          {/* Hard Shadow Cermin Kepala */}
          <circle cx="78" cy="38" r="14" fill="#0A0A0A" />

          {/* Piringan Cermin Kepala Logam Perak (#FFFFFF) */}
          <circle
            cx="76"
            cy="36"
            r="14"
            fill="#FFFFFF"
            stroke="#0A0A0A"
            strokeWidth="3"
          />
          {/* Ring Cermin Dalam Cyan Transparan */}
          <circle
            cx="76"
            cy="36"
            r="10.5"
            fill="#00F0FF"
            fillOpacity="0.25"
            stroke="#0A0A0A"
            strokeWidth="1.5"
          />
          {/* Garis Kilau Refleksi Cermin Putih */}
          <path
            d="M 70 30 Q 76 33 80 42"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Lubang Intip Cermin Tengah Dokter Hitam */}
          <circle cx="76" cy="36" r="3.5" fill="#0A0A0A" />
          <circle cx="75" cy="35" r="1" fill="#FFFFFF" />

          {/* ============================================================== */}
          {/* LAYER 6: TANGAN KIRI & KOTAK PERKAKAS DARURAT P3K IT (MEDIC KIT)*/}
          {/* ============================================================== */}
          <g className="its-animated-toolbox">
            {/* Handle Toolbox Koper Logam */}
            <path
              d="M 14 116 C 14 109 26 109 26 116"
              stroke="#0A0A0A"
              strokeWidth="3"
              fill="none"
            />

            {/* Hard Shadow Kotak Perkakas */}
            <rect x="8" y="119" width="32" height="26" rx="3.5" fill="#0A0A0A" />

            {/* Bodi Kotak Perkakas Putih Bersih (#FFFFFF) */}
            <rect
              x="5"
              y="116"
              width="32"
              height="26"
              rx="3.5"
              fill="#FFFFFF"
              stroke="#0A0A0A"
              strokeWidth="3"
            />

            {/* List Aksen Tutup Koper Cyan */}
            <rect x="5" y="116" width="32" height="6" fill="#00F0FF" stroke="#0A0A0A" strokeWidth="1" />

            {/* Lambang Palang Hijau Neon (#2EE59D) First Aid IT */}
            <rect x="18" y="124" width="6" height="12" fill="#2EE59D" />
            <rect x="15" y="127" width="12" height="6" fill="#2EE59D" />
            <rect x="18" y="124" width="6" height="12" stroke="#0A0A0A" strokeWidth="1" fill="none" />
            <rect x="15" y="127" width="12" height="6" stroke="#0A0A0A" strokeWidth="1" fill="none" />

            {/* Kancing Kait Koper Perak */}
            <rect x="10" y="122" width="3" height="4" fill="#0A0A0A" />
            <rect x="29" y="122" width="3" height="4" fill="#0A0A0A" />

            {/* Lengan Kiri Menjulur ke Handle Kotak */}
            <path
              d="M 42 110 Q 28 116 20 122"
              stroke="#0A0A0A"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />

            {/* Kepalan Tangan Kiri Kuning (#FFD60A) */}
            <circle
              cx="20"
              cy="120"
              r="6.5"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="3.5"
            />
          </g>

          {/* ============================================================== */}
          {/* LAYER 7: TANGAN KANAN & SUNTIKAN USB SIBER / TERMOMETER DOKTER IT*/}
          {/* ============================================================== */}
          <g className="its-animated-syringe">
            {/* Lengan Kanan Menjulur */}
            <path
              d="M 148 110 Q 164 114 172 120"
              stroke="#0A0A0A"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />

            {/* Kabel Spiral USB Cyan Melingkar dari Pangkal Suntikan */}
            <path
              d="M 182 126 Q 192 132 186 140 Q 180 148 188 154"
              stroke="#0A0A0A"
              strokeWidth="2.5"
              fill="none"
            />
            <path
              d="M 182 126 Q 192 132 186 140 Q 180 148 188 154"
              stroke="#00F0FF"
              strokeWidth="1.2"
              fill="none"
            />
            <rect x="186" y="152" width="7" height="5" rx="1" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="1" />

            {/* Hard Shadow Suntikan USB Siber */}
            <g transform="rotate(22 172 96)">
              <rect x="170" y="78" width="12" height="36" rx="2.5" fill="#0A0A0A" />
            </g>

            {/* Bodi Silinder Kaca Suntikan USB Siber Transparan */}
            <g transform="rotate(22 172 96)">
              {/* Tabung Silinder Kaca Transparan */}
              <rect
                x="167"
                y="76"
                width="12"
                height="36"
                rx="2.5"
                fill="#FFFFFF"
                fillOpacity="0.8"
                stroke="#0A0A0A"
                strokeWidth="2.5"
              />

              {/* Cairan Serum Pemulihan Sistem Cyber Mint (#2EE59D) di Tabung */}
              <rect
                x="169"
                y="85"
                width="8"
                height="22"
                rx="1"
                fill="#2EE59D"
                fillOpacity="0.75"
              />

              {/* Garis Skala Dosis / Indikator mL Digital */}
              <line x1="167" y1="88" x2="171" y2="88" stroke="#0A0A0A" strokeWidth="1.2" />
              <line x1="167" y1="94" x2="173" y2="94" stroke="#0A0A0A" strokeWidth="1.5" />
              <line x1="167" y1="100" x2="171" y2="100" stroke="#0A0A0A" strokeWidth="1.2" />

              {/* Plunger / Pendorong Suntikan Atas Oranye (#FF8A3D) */}
              <rect
                x="170.5"
                y="112"
                width="5"
                height="8"
                fill="#FF8A3D"
                stroke="#0A0A0A"
                strokeWidth="1.5"
              />
              <rect
                x="166"
                y="120"
                width="14"
                height="4"
                rx="1"
                fill="#FF8A3D"
                stroke="#0A0A0A"
                strokeWidth="1.5"
              />

              {/* Konektor Jarum USB / Probe Diagnostik Perak */}
              <rect
                x="170.5"
                y="63"
                width="5"
                height="13"
                fill="#FFFFFF"
                stroke="#0A0A0A"
                strokeWidth="1.5"
              />
              {/* Ujung Jarum Probe Tirus / Pin Emas */}
              <polygon points="170.5,63 175.5,63 173,56" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="1" />
            </g>

            {/* Sparkle Kilau Penyembuhan di Ujung Probe Jarum */}
            <g className="its-animated-sparkle">
              <polygon
                points="156,54 158,58 162,59 158,61 156,65 154,61 150,59 154,58"
                fill="#2EE59D"
              />
              <circle cx="156" cy="59" r="1.5" fill="#FFFFFF" />
            </g>

            {/* Kepalan Tangan Kanan Kuning (#FFD60A) */}
            <circle
              cx="172"
              cy="118"
              r="6.5"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="3.5"
            />
          </g>

          {/* Partikel Sparkle Pemulihan Sistem (Cyan & Mint) */}
          <circle cx="36" cy="40" r="2" fill="#00F0FF" />
          <circle cx="168" cy="44" r="2" fill="#2EE59D" />
          <circle cx="160" cy="36" r="1.5" fill="#FFD60A" />
        </g>
      </svg>
    </div>
  );
}
