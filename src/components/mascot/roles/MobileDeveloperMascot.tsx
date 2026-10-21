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
 * 1. Topi Snapback Miring Pink & Cyan dengan emblem smartphone (desain lama favorit).
 * 2. Jaket Jeans Keren (Denim Trucker Jacket) dengan kerah berlipat, saku dada berkancing perak, dan kaos putih di dalam.
 * 3. Tangan Kanan Menggenggam Mantap sisi kanan HP (kanan POV user).
 * 4. Tangan Kiri Mengklik Layar Ponsel (Tapping Screen Gesture) dengan jari telunjuk presisi di atas layar.
 * 5. Efek Tap Layar (Touch Ripple Konsentris) aktif di ujung jari telunjuk tangan kiri (tanpa bintang 4 sisi).
 * 6. Push Notification Card bersih melayang di sisi kiri menggantikan wifi.
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
      aria-label="Maskot Mobile Developer — The Artisan: Papan penunjuk jalan neo-brutalism dengan topi snapback miring pink-cyan, jaket jeans denim, tangan kanan menggenggam sisi kanan HP, dan tangan kiri mengklik layar ponsel dengan efek touch ripple"
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
              50% { transform: rotate(2deg) translateY(-1px); }
            }
            @keyframes mob-notify-pop {
              0%, 100% { transform: translateY(0px) scale(1); }
              50% { transform: translateY(-4px) scale(1.05); }
            }
            @keyframes mob-left-click {
              0%, 100% { transform: translateY(0px) scale(1); }
              50% { transform: translateY(2px) scale(0.98); }
            }
            @keyframes mob-ripple-1 {
              0% { r: 4px; opacity: 1; stroke-width: 3px; }
              100% { r: 20px; opacity: 0; stroke-width: 0.5px; }
            }
            @keyframes mob-ripple-2 {
              0% { r: 4px; opacity: 0; stroke-width: 2.5px; }
              30% { opacity: 0.8; stroke-width: 2px; }
              100% { r: 28px; opacity: 0; stroke-width: 0.5px; }
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
            .mob-animated-click {
              animation: ${isAnimated ? "mob-left-click 1.6s ease-in-out infinite" : "none"};
              transform-origin: 130px 115px;
            }
            .mob-animated-ripple1 {
              animation: ${isAnimated ? "mob-ripple-1 1.6s cubic-bezier(0.1, 0.8, 0.3, 1) infinite" : "none"};
              transform-origin: 154px 110px;
            }
            .mob-animated-ripple2 {
              animation: ${isAnimated ? "mob-ripple-2 1.6s cubic-bezier(0.1, 0.8, 0.3, 1) 0.35s infinite" : "none"};
              transform-origin: 154px 110px;
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

          {/* Mata Kiri (Fokus Antusias Menatap Titik Tap di Layar) */}
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
          {/* LAYER 4: TOPI SNAPBACK MIRING PINK & CYAN (DESAIN LAMA FAVORIT)*/}
          {/* ============================================================== */}
          {/* Hard Shadow Topi */}
          <path
            d="M 44 46 C 44 22 136 22 136 46 Z"
            fill="#0A0A0A"
          />
          {/* Kubah Topi Pink Magenta (#FF5C8A) */}
          <path
            d="M 44 42 C 44 18 134 18 134 42 Z"
            fill="#FF5C8A"
            stroke="#0A0A0A"
            strokeWidth="4"
          />
          {/* Visor Datar Snapback Miring ke Kiri (Cyan #00F0FF) */}
          <polygon
            points="24,38 92,38 88,46 20,46"
            fill="#00F0FF"
            stroke="#0A0A0A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Kancing Atas Topi Kuning Emas */}
          <circle
            cx="89"
            cy="18"
            r="4.5"
            fill="#FFD60A"
            stroke="#0A0A0A"
            strokeWidth="2.5"
          />
          {/* Emblem Mobile Phone di Depan Topi */}
          <rect
            x="84"
            y="26"
            width="10"
            height="13"
            rx="2"
            fill="#FFFFFF"
            stroke="#0A0A0A"
            strokeWidth="2"
          />
          <circle cx="89" cy="35" r="1" fill="#0A0A0A" />

          {/* ============================================================== */}
          {/* LAYER 5: SMARTPHONE MODERN DI SISI KANAN                        */}
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

            {/* Feed Card Interaktif Tempat Tap Terjadi */}
            <rect
              x="136"
              y="104"
              width="36"
              height="18"
              rx="3"
              fill="#00F0FF"
              stroke="#0A0A0A"
              strokeWidth="1.5"
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

            {/* EFEK TAP LAYAR: TOUCH RIPPLE DI TITIK KLIK JARI TELUNJUK TANGAN KIRI (x=154, y=110) */}
            <circle
              cx="154"
              cy="110"
              r="8"
              fill="none"
              stroke="#00F0FF"
              strokeWidth="2.5"
              className="mob-animated-ripple1"
            />
            <circle
              cx="154"
              cy="110"
              r="16"
              fill="none"
              stroke="#2EE59D"
              strokeWidth="2"
              strokeDasharray="4 3"
              className="mob-animated-ripple2"
            />

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
            <g transform="translate(177, 98)">
              {/* Jari Telunjuk */}
              <rect x="0" y="2" width="7" height="6" rx="2.5" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2.5" />
              {/* Jari Tengah */}
              <rect x="0" y="9" width="7" height="6" rx="2.5" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2.5" />
              {/* Jari Manis */}
              <rect x="0" y="16" width="7" height="6" rx="2.5" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2.5" />
              {/* Jari Kelingking */}
              <rect x="0" y="23" width="6.5" height="5.5" rx="2.5" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2.5" />

              {/* Ibu Jari Menahan Sisi Depan Bezel HP */}
              <ellipse cx="-1" cy="15" rx="3.5" ry="5.5" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2" />
            </g>

            {/* ============================================================== */}
            {/* TANGAN KIRI MENGKLIK LAYAR PONSEL (TAPPING GESTURE)            */}
            {/* ============================================================== */}
            <g className="mob-animated-click">
              {/* Lengan Jaket Jeans Kiri Menjulur ke Depan Layar Ponsel */}
              <path
                d="M 66 128 Q 106 136 134 118"
                stroke="#0A0A0A"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 66 128 Q 106 136 134 118"
                stroke="#3A6B9B"
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Manset Jaket Jeans Kiri */}
              <rect
                x="128"
                y="112"
                width="6"
                height="11"
                rx="1.5"
                fill="#244265"
                stroke="#0A0A0A"
                strokeWidth="2"
                transform="rotate(-15 128 112)"
              />
              {/* Kancing Manset Perak Kiri */}
              <circle cx="131" cy="117" r="1.2" fill="#E2E8F0" />

              {/* Kepalan Tangan Kiri Kuning di Depan Layar */}
              <circle
                cx="138"
                cy="114"
                r="7"
                fill="#FFD60A"
                stroke="#0A0A0A"
                strokeWidth="3"
              />

              {/* Jari Telunjuk Kiri Mengklik Permukaan Layar Ponsel */}
              <path
                d="M 142 112 L 154 110 L 152 115 L 141 117 Z"
                fill="#FFD60A"
                stroke="#0A0A0A"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              {/* Jempol Kiri Melengkung Santai di Atas Kepalan */}
              <path
                d="M 134 108 Q 138 103 144 106"
                stroke="#0A0A0A"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          </g>

          {/* ============================================================== */}
          {/* LAYER 6: PUSH NOTIFICATION CARD (BERSIH, TANPA BINTANG 4 SISI) */}
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
        </g>
      </svg>
    </div>
  );
}
