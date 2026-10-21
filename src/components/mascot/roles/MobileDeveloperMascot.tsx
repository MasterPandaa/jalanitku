"use client";

import React from "react";

export interface MobileDeveloperMascotProps {
  size?: number | string;
  className?: string;
  animated?: boolean;
  animate?: boolean;
  state?: "idle" | "hover" | "happy";
}

/**
 * Maskot Role: Mobile Developer — "The Artisan"
 * Identitas: Sang Perajin Aplikasi Saku & Pengalaman Sentuhan Presisi
 * Ciri Khas:
 * 1. Jaket Jeans Keren (Denim Trucker Jacket) dengan kerah berlipat, saku dada berkancing perak, dan kaos putih di dalam.
 * 2. Pose memegang smartphone kokoh: tangan kanan menggenggam sisi kanan HP (kanan POV user) dan tangan kiri menopang sisi kiri.
 * 3. Topi Denim Streetwear Cap keren dengan woven patch coding `</>` dan pin bintang pink enamel.
 * 4. Efek Push Notification Card & Sparkle melayang menggantikan simbol wifi.
 */
export function MobileDeveloperMascot({
  size = 200,
  className = "",
  animated = true,
  animate,
  state = "idle",
}: MobileDeveloperMascotProps) {
  const isAnimated = animate !== undefined ? animate : animated;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none group ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Maskot Mobile Developer — The Artisan: Papan penunjuk jalan neo-brutalism berjaket jeans denim keren, topi streetwear patch coding, menggenggam smartphone di kedua sisi dengan notifikasi aplikasi melayang"
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
            @keyframes mob-float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-3.5px); }
            }
            @keyframes mob-phone-sway {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(2.5deg) translateY(-1px); }
            }
            @keyframes mob-notify-pop {
              0%, 100% { transform: translateY(0px) scale(1); }
              50% { transform: translateY(-4px) scale(1.05); }
            }
            @keyframes mob-sparkle-blink {
              0%, 100% { opacity: 0.3; transform: scale(0.8); }
              50% { opacity: 1; transform: scale(1.2); }
            }
            @keyframes mob-screen-glow {
              0%, 100% { filter: drop-shadow(0 0 2px #00F0FF); }
              50% { filter: drop-shadow(0 0 7px #00F0FF); }
            }
            .mob-animated-body {
              animation: ${isAnimated ? "mob-float 3.5s ease-in-out infinite" : "none"};
              transform-origin: center bottom;
            }
            .mob-animated-phone {
              animation: ${isAnimated ? "mob-phone-sway 3.2s ease-in-out infinite" : "none"};
              transform-origin: 154px 138px;
            }
            .mob-animated-notify {
              animation: ${isAnimated ? "mob-notify-pop 2.8s ease-in-out infinite" : "none"};
              transform-origin: 28px 60px;
            }
            .mob-animated-sparkle {
              animation: ${isAnimated ? "mob-sparkle-blink 2s ease-in-out infinite" : "none"};
              transform-origin: 18px 46px;
            }
            .mob-screen-pulse {
              animation: ${isAnimated ? "mob-screen-glow 3s ease-in-out infinite" : "none"};
            }
          `}</style>
        </defs>

        {/* CONTAINER UTAMA DENGAN ANIMASI FLOAT */}
        <g className="mob-animated-body transition-transform duration-300 group-hover:scale-105">
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
          {/* LAYER 2: BADAN PAPAN RAMBU KUNING NEO-BRUTALISM                */}
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

          {/* Pipi Merona Pink (#FF5C8A) */}
          <rect x="50" y="102" width="12" height="7" rx="2" fill="#FF5C8A" />
          <rect x="122" y="102" width="12" height="7" rx="2" fill="#FF5C8A" />

          {/* Mata Kiri (Fokus Antusias Menatap Smartphone) */}
          <rect
            x="58"
            y="74"
            width="20"
            height="24"
            rx="4"
            fill="#FFFFFF"
            stroke="#0A0A0A"
            strokeWidth="3.5"
          />
          {/* Pupil Kiri Melirik ke Kanan (Arah Layar HP) */}
          <rect x="66" y="80" width="9" height="12" rx="2" fill="#0A0A0A" />
          <circle cx="68.5" cy="82.5" r="1.5" fill="#FFFFFF" />
          <circle cx="72" cy="87.5" r="1.2" fill="#00F0FF" />

          {/* Mata Kanan (Melirik Semangat ke Smartphone) */}
          <rect
            x="96"
            y="74"
            width="20"
            height="24"
            rx="4"
            fill="#FFFFFF"
            stroke="#0A0A0A"
            strokeWidth="3.5"
          />
          {/* Pupil Kanan Melirik Lebih Dekat ke Layar */}
          <rect x="105" y="80" width="9" height="12" rx="2" fill="#0A0A0A" />
          <circle cx="107.5" cy="82.5" r="1.5" fill="#FFFFFF" />
          <circle cx="111" cy="87.5" r="1.2" fill="#00F0FF" />

          {/* Alis Energik Keren */}
          <path
            d="M 56 68 L 78 70"
            stroke="#0A0A0A"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M 98 70 L 118 67"
            stroke="#0A0A0A"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Mulut Senyum Bahagia Terbuka (Jelas & Bebas Halangan) */}
          <path
            d="M 82 108 Q 90 118 98 108 Z"
            fill="#FF5C8A"
            stroke="#0A0A0A"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Gigi Putih Bersih */}
          <rect x="85" y="108" width="10" height="3" fill="#FFFFFF" />

          {/* ============================================================== */}
          {/* LAYER 3: JAKET JEANS KEREN (DENIM TRUCKER JACKET)              */}
          {/* ============================================================== */}
          {/* Kaos Putih di Balik Jaket Jeans (Inner Crewneck Tee) */}
          <polygon
            points="84,118 104,118 101,144 87,144"
            fill="#FFFFFF"
            stroke="#0A0A0A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Garis Lipatan Kaos Putih */}
          <line x1="94" y1="124" x2="94" y2="140" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />

          {/* Badan Jaket Jeans Sisi Kiri (Denim Blue #3A6B9B) */}
          <path
            d="M 42 118 L 84 120 L 87 144 L 42 144 Z"
            fill="#3A6B9B"
            stroke="#0A0A0A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Badan Jaket Jeans Sisi Kanan (Denim Blue #3A6B9B) */}
          <path
            d="M 104 120 L 148 118 L 148 144 L 101 144 Z"
            fill="#3A6B9B"
            stroke="#0A0A0A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Kerah Jaket Jeans Kiri (Denim Collar) */}
          <polygon
            points="68,114 88,118 84,129 66,124"
            fill="#4B7EAE"
            stroke="#0A0A0A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Kerah Jaket Jeans Kanan */}
          <polygon
            points="120,114 100,118 104,129 122,124"
            fill="#4B7EAE"
            stroke="#0A0A0A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Saku Dada Jaket Jeans Kiri (Trucker Flap Pocket) */}
          <polygon
            points="50,126 68,127 67,133 59,136 49,132"
            fill="#2D547C"
            stroke="#0A0A0A"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Kancing Perak Saku Kiri */}
          <circle cx="58" cy="131" r="1.6" fill="#E2E8F0" stroke="#0A0A0A" strokeWidth="1" />

          {/* Saku Dada Jaket Jeans Kanan */}
          <polygon
            points="122,127 140,126 141,132 131,136 123,133"
            fill="#2D547C"
            stroke="#0A0A0A"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Kancing Perak Saku Kanan */}
          <circle cx="132" cy="131" r="1.6" fill="#E2E8F0" stroke="#0A0A0A" strokeWidth="1" />

          {/* Jahitan Vertikal Khas Jaket Jeans (Denim Seam Stitching Emas) */}
          <line x1="58" y1="136" x2="58" y2="144" stroke="#FFD60A" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="132" y1="136" x2="132" y2="144" stroke="#FFD60A" strokeWidth="1.5" strokeDasharray="3 2" />

          {/* Kancing Logam Perak Jaket Jeans di Bukaan Depan */}
          <circle cx="86" cy="126" r="2.2" fill="#E2E8F0" stroke="#0A0A0A" strokeWidth="1.2" />
          <circle cx="87.5" cy="136" r="2.2" fill="#E2E8F0" stroke="#0A0A0A" strokeWidth="1.2" />

          {/* Garis Sabuk/Keliman Bawah Jaket Jeans */}
          <rect x="42" y="140" width="106" height="4" fill="#2D547C" stroke="#0A0A0A" strokeWidth="1.5" />

          {/* ============================================================== */}
          {/* LAYER 4: IMPROVISASI TOPI STREETWEAR CAP (DENIM & CYAN)         */}
          {/* ============================================================== */}
          {/* Hard Shadow Topi */}
          <path
            d="M 40 48 C 40 20 140 20 140 48 Z"
            fill="#0A0A0A"
          />
          {/* Kubah Topi Denim Biru Navy Berstruktur (#244265) */}
          <path
            d="M 42 44 C 42 16 138 16 138 44 Z"
            fill="#244265"
            stroke="#0A0A0A"
            strokeWidth="4"
          />

          {/* Visor / Brim Melengkung Keren (Aksen Cyan Elektrik #00F0FF) */}
          <path
            d="M 28 44 C 44 40 120 40 152 44 C 146 50 34 50 28 44 Z"
            fill="#00F0FF"
            stroke="#0A0A0A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Jahitan Garis Panel Topi Denim (Emas Halus) */}
          <path d="M 90 16 Q 89 30 89 44" stroke="#FFD60A" strokeWidth="1.5" strokeDasharray="3 2" />

          {/* Kancing Logam Atas Topi (Eyelet Button) */}
          <circle
            cx="89"
            cy="16"
            r="4.5"
            fill="#FFD60A"
            stroke="#0A0A0A"
            strokeWidth="2.5"
          />

          {/* Woven Patch Persegi Coding `</>` di Depan Topi */}
          <g transform="translate(76, 24)">
            {/* Shadow Patch */}
            <rect x="1.5" y="1.5" width="26" height="15" rx="2" fill="#0A0A0A" />
            {/* Bodi Patch Putih Bersih */}
            <rect
              x="0"
              y="0"
              width="26"
              height="15"
              rx="2"
              fill="#FFFFFF"
              stroke="#0A0A0A"
              strokeWidth="2.2"
            />
            {/* Simbol Kode `</>` */}
            <text
              x="3"
              y="11.5"
              fontFamily="monospace"
              fontSize="10"
              fontWeight="900"
              fill="#244265"
              letterSpacing="0.5"
            >
              &lt;/&gt;
            </text>
          </g>

          {/* Pin Enamel Bintang Pink di Sisi Kanan Topi (Streetwear Detail) */}
          <polygon
            points="120,28 122,32 126,32 123,34 124,38 120,35 116,38 117,34 114,32 118,32"
            fill="#FF5C8A"
            stroke="#0A0A0A"
            strokeWidth="1.2"
          />

          {/* ============================================================== */}
          {/* LAYER 5: SMARTPHONE MODERN DI SISI KANAN & DUAL-HAND GRIP       */}
          {/* ============================================================== */}
          <g className="mob-animated-phone">
            {/* Hard Shadow Smartphone */}
            <rect
              x="134"
              y="58"
              width="52"
              height="94"
              rx="8"
              fill="#0A0A0A"
            />

            {/* Bodi Smartphone Putih Tegas */}
            <rect
              x="128"
              y="52"
              width="52"
              height="94"
              rx="8"
              fill="#FFFFFF"
              stroke="#0A0A0A"
              strokeWidth="4"
            />

            {/* Layar OLED Gelap Smartphone */}
            <rect
              x="132"
              y="56"
              width="44"
              height="86"
              rx="5"
              fill="#18181B"
              stroke="#0A0A0A"
              strokeWidth="2"
            />

            {/* Dynamic Island / Notch Sensor */}
            <rect
              x="146"
              y="60"
              width="16"
              height="4.5"
              rx="2.2"
              fill="#0A0A0A"
            />

            {/* UI Card di Layar Smartphone (Aplikasi Modern) */}
            {/* App Header Banner Pink */}
            <rect
              x="135"
              y="68"
              width="38"
              height="16"
              rx="3"
              fill="#FF5C8A"
              stroke="#0A0A0A"
              strokeWidth="1.5"
            />
            {/* Teks Mini App Header */}
            <line x1="139" y1="73" x2="155" y2="73" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            <line x1="139" y1="78" x2="163" y2="78" stroke="#FFD60A" strokeWidth="1.5" strokeLinecap="round" />

            {/* Grid App Icons Warna-Warni */}
            <rect x="136" y="89" width="10" height="10" rx="2.5" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="1.5" />
            <rect x="150" y="89" width="10" height="10" rx="2.5" fill="#00F0FF" stroke="#0A0A0A" strokeWidth="1.5" />
            <rect x="164" y="89" width="8" height="10" rx="2.5" fill="#FF8A3D" stroke="#0A0A0A" strokeWidth="1.5" />

            {/* Feed Card Interaktif dengan Tombol Aksi */}
            <rect
              x="136"
              y="104"
              width="36"
              height="18"
              rx="3"
              fill="#00F0FF"
              stroke="#0A0A0A"
              strokeWidth="1.5"
              className="mob-screen-pulse"
            />
            <rect x="139" y="108" width="16" height="4" rx="1" fill="#0A0A0A" />
            <circle cx="163" cy="113" r="3.5" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="1" />

            {/* Home Indicator Bar Putih */}
            <line
              x1="146"
              y1="136"
              x2="162"
              y2="136"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* ============================================================== */}
            {/* TANGAN KIRI MASKOT MENOPANG SISI KIRI SMARTPHONE (x=124..132)  */}
            {/* ============================================================== */}
            {/* Lengan Jaket Jeans Kiri */}
            <path
              d="M 112 128 Q 120 134 126 126"
              stroke="#0A0A0A"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 112 128 Q 120 134 126 126"
              stroke="#3A6B9B"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Manset Jaket Jeans Kiri */}
            <rect x="123" y="121" width="5" height="10" rx="1.5" fill="#244265" stroke="#0A0A0A" strokeWidth="1.5" />
            {/* Jemari Tangan Kiri Menggenggam Bezel Kiri HP */}
            <ellipse cx="128" cy="116" rx="4" ry="7" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2.5" />
            <ellipse cx="129" cy="126" rx="4" ry="6" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2.5" />

            {/* ============================================================== */}
            {/* TANGAN KANAN MENGGENGGAM SISI KANAN HP (KANAN POV USER)        */}
            {/* ============================================================== */}
            {/* Lengan Jaket Jeans Kanan Menjulur dari Bawah Tubuh ke Kanan HP */}
            <path
              d="M 136 142 Q 166 150 182 134"
              stroke="#0A0A0A"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 136 142 Q 166 150 182 134"
              stroke="#3A6B9B"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Manset Jaket Jeans Kanan */}
            <rect
              x="176"
              y="126"
              width="6"
              height="11"
              rx="1.5"
              fill="#244265"
              stroke="#0A0A0A"
              strokeWidth="2"
              transform="rotate(-15 176 126)"
            />
            {/* Kancing Manset Perak */}
            <circle cx="180" cy="130" r="1.2" fill="#E2E8F0" />

            {/* Kepalan Tangan Kanan Menggenggam Sisi Kanan HP (Kanan POV User x=180..184) */}
            {/* Jari-Jari Menggenggam Tepi Bezel Kanan HP */}
            <g transform="translate(177, 98)">
              {/* Jari Telunjuk */}
              <rect x="0" y="2" width="7" height="6" rx="2.5" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2.5" />
              {/* Jari Tengah */}
              <rect x="0" y="9" width="7" height="6" rx="2.5" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2.5" />
              {/* Jari Manis */}
              <rect x="0" y="16" width="7" height="6" rx="2.5" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2.5" />
              {/* Jari Kelingking */}
              <rect x="0" y="23" width="6.5" height="5.5" rx="2.5" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2.5" />

              {/* Ujung Jempol di Depan Layar HP (Interactive Thumb Grip) */}
              <ellipse cx="-2" cy="15" rx="3.5" ry="5" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2" />
            </g>
          </g>

          {/* ============================================================== */}
          {/* LAYER 6: PUSH NOTIFICATION CARD & SPARKLE (PENGGANTI WIFI)     */}
          {/* ============================================================== */}
          <g className="mob-animated-notify" transform="translate(14, 52)">
            {/* Hard Shadow Pop-up Card */}
            <rect x="3" y="3" width="34" height="24" rx="4" fill="#0A0A0A" />
            {/* Kotak Pop-up Notifikasi Putih Neo-Brutalism */}
            <rect
              x="0"
              y="0"
              width="34"
              height="24"
              rx="4"
              fill="#FFFFFF"
              stroke="#0A0A0A"
              strokeWidth="2.5"
            />
            {/* Header Mini Notifikasi Pink */}
            <rect x="4" y="4" width="12" height="4" rx="1.5" fill="#FF5C8A" />
            {/* Ikon Balon Obrolan / Notifikasi Mini dengan Simbol Hati */}
            <path
              d="M 6 13 Q 6 10 10 10 Q 14 10 14 13 Q 14 15 12 16 L 13 18 L 10 16 Q 6 16 6 13 Z"
              fill="#2EE59D"
              stroke="#0A0A0A"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            {/* Badge Notifikasi Merah/Pink "+1" Bulat */}
            <circle cx="25" cy="12" r="5.5" fill="#F43F5E" stroke="#0A0A0A" strokeWidth="1.5" />
            <text
              x="22"
              y="14.5"
              fontFamily="monospace"
              fontSize="6.5"
              fontWeight="900"
              fill="#FFFFFF"
            >
              1
            </text>
            {/* Tanda Ekor Balon Pop-up Card */}
            <polygon points="14,24 20,24 16,28" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="1.5" />
          </g>

          {/* Partikel Sparkle Bintang 4-Point Melayang */}
          <g className="mob-animated-sparkle" transform="translate(12, 34)">
            <polygon
              points="10,0 12,7 19,10 12,13 10,20 8,13 1,10 8,7"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="1.5"
            />
          </g>
          <g transform="translate(42, 40)">
            <polygon
              points="4,0 5,3 8,4 5,5 4,8 3,5 0,4 3,3"
              fill="#00F0FF"
              stroke="#0A0A0A"
              strokeWidth="1"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
