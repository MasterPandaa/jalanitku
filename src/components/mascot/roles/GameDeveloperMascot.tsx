"use client";

import React from "react";

export interface GameDeveloperMascotProps {
  size?: number | string;
  className?: string;
  animated?: boolean;
  animate?: boolean;
  state?: "idle" | "hover" | "happy";
}

/**
 * Maskot Role: Game Developer — "The Pixel Mage"
 * Identitas: Sang Penyihir Pixel & Pencipta Dunia Virtual
 * 
 * Standar 4 Aturan Baku & Dispensasi Khusus User:
 * 1. Base Anatomi Konsisten: Papan Kuning Base JalanMin (#FFD60A) ukuran baku 106x94 rx=4
 *    di (42,50) dengan hard drop shadow hitam murni di (48,56).
 * 2. Dispensasi Batch 1 Khusus User: Magic Orb kristal cyan dan partikel bintang piksel melayang
 *    tetap dipertahankan dengan anggun.
 * 3. Base Facial Anchor: Sklera putih 22x24 rx=4 di x=58 & 102 y=76, pupil RPG berbinar,
 *    dan pipi merona pink (#FF5C8A) di y=106.
 * 4. Animasi Aktif & Halus: CSS animation transform-box fill-box terpisah dari group-hover transition,
 *    levitasi tubuh, denyut bayangan tanah, kibaran jubah, kilau Magic Orb, dan putaran piksel.
 */
export function GameDeveloperMascot({
  size = 200,
  className = "",
  animated = true,
  animate,
  state = "idle",
}: GameDeveloperMascotProps) {
  const isAnimated = animate !== undefined ? animate : animated;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none group ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Maskot Game Developer — The Pixel Mage: Papan penunjuk jalan kuning base JalanMin dengan jubah besar penyihir hijau mint berujung lancip tajam, melayang di atas bayangan tanah, tangan kiri merapal mantra gamebot retro, tangan kanan memegang tongkat kayu mistis bercabang dengan Magic Orb kristal cyan, dan ekspresi tertawa gembira"
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
            @keyframes gm-float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-6px) rotate(-0.5deg); }
            }
            @keyframes gm-shadow-pulse {
              0%, 100% { transform: scale(1); opacity: 0.85; }
              50% { transform: scale(0.82, 0.82); opacity: 0.45; }
            }
            @keyframes gm-eye-blink {
              0%, 88%, 94%, 100% { transform: scaleY(1); }
              91% { transform: scaleY(0.08); }
            }
            @keyframes gm-pupil-star-spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes gm-orb-sparkle {
              0%, 100% { filter: drop-shadow(0 0 3px #00F0FF) drop-shadow(0 0 5px #2EE59D); transform: scale(1); }
              50% { filter: drop-shadow(0 0 8px #00F0FF) drop-shadow(0 0 12px #FFD60A); transform: scale(1.06); }
            }
            @keyframes gm-ring-spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes gm-star-twinkle {
              0%, 100% { opacity: 0.6; transform: scale(0.85); }
              50% { opacity: 1; transform: scale(1.2); }
            }
            @keyframes gm-pixel-fade-float-1 {
              0% { opacity: 0; transform: translateY(6px) scale(0.6); }
              50% { opacity: 1; transform: translateY(-3px) scale(1.15); }
              100% { opacity: 0; transform: translateY(-9px) scale(0.6); }
            }
            @keyframes gm-pixel-fade-float-2 {
              0% { opacity: 0; transform: translateY(5px) rotate(0deg) scale(0.7); }
              50% { opacity: 0.95; transform: translateY(-4px) rotate(45deg) scale(1.2); }
              100% { opacity: 0; transform: translateY(-9px) rotate(90deg) scale(0.6); }
            }
            @keyframes gm-pixel-fade-float-3 {
              0% { opacity: 0; transform: translateY(7px) scale(0.65); }
              50% { opacity: 1; transform: translateY(-2px) scale(1.1); }
              100% { opacity: 0; transform: translateY(-8px) scale(0.65); }
            }
            @keyframes gm-gb-pixel-rise {
              0% { opacity: 0; transform: translateY(6px) scale(0.6); }
              35% { opacity: 1; transform: translateY(0px) scale(1.1); }
              70% { opacity: 0.85; transform: translateY(-5px) scale(0.9); }
              100% { opacity: 0; transform: translateY(-11px) scale(0.5); }
            }
            @keyframes gm-gamebot-float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-3px) rotate(-1.5deg); }
            }
            @keyframes gm-robe-sway {
              0%, 100% { transform: scaleX(1); }
              50% { transform: scaleX(1.02); }
            }
            .gm-animated-shadow {
              animation: ${isAnimated ? "gm-shadow-pulse 3.5s ease-in-out infinite" : "none"};
              transform-origin: 100px 185px;
            }
            .gm-animated-body {
              animation: ${isAnimated ? "gm-float 3.5s ease-in-out infinite" : "none"};
              transform-origin: center bottom;
            }
            .gm-animated-eye-left {
              animation: ${isAnimated ? "gm-eye-blink 4.2s ease-in-out infinite" : "none"};
              transform-origin: 69px 88px;
            }
            .gm-animated-eye-right {
              animation: ${isAnimated ? "gm-eye-blink 4.2s ease-in-out infinite" : "none"};
              transform-origin: 113px 88px;
            }
            .gm-animated-star-left {
              animation: ${isAnimated ? "gm-pupil-star-spin 6s linear infinite" : "none"};
              transform-origin: 71px 88px;
            }
            .gm-animated-star-right {
              animation: ${isAnimated ? "gm-pupil-star-spin 6s linear infinite" : "none"};
              transform-origin: 115px 88px;
            }
            .gm-animated-orb {
              animation: ${isAnimated ? "gm-orb-sparkle 2.4s ease-in-out infinite" : "none"};
              transform-origin: 167px 22px;
            }
            .gm-animated-ring {
              animation: ${isAnimated ? "gm-ring-spin 6s linear infinite" : "none"};
              transform-origin: 167px 22px;
            }
            .gm-animated-twinkle {
              animation: ${isAnimated ? "gm-star-twinkle 1.8s ease-in-out infinite" : "none"};
              transform-origin: 167px 22px;
            }
            .gm-animated-pixel1 {
              animation: ${isAnimated ? "gm-pixel-fade-float-1 3.2s ease-in-out infinite" : "none"};
              transform-origin: 188px 13px;
            }
            .gm-animated-pixel2 {
              animation: ${isAnimated ? "gm-pixel-fade-float-2 3.8s ease-in-out -1.2s infinite" : "none"};
              transform-origin: 26px 69px;
            }
            .gm-animated-pixel3 {
              animation: ${isAnimated ? "gm-pixel-fade-float-3 2.8s ease-in-out -0.7s infinite" : "none"};
              transform-origin: 189px 69px;
            }
            .gm-animated-pixel4 {
              animation: ${isAnimated ? "gm-pixel-fade-float-1 3.4s ease-in-out -1.9s infinite" : "none"};
              transform-origin: 39px 31px;
            }
            .gm-animated-pixel5 {
              animation: ${isAnimated ? "gm-pixel-fade-float-2 4s ease-in-out -2.5s infinite" : "none"};
              transform-origin: 150px 12px;
            }
            .gm-gb-pixel-1 {
              animation: ${isAnimated ? "gm-gb-pixel-rise 2.6s ease-in-out infinite" : "none"};
              transform-origin: 16px 68px;
            }
            .gm-gb-pixel-2 {
              animation: ${isAnimated ? "gm-gb-pixel-rise 2.8s ease-in-out -0.6s infinite" : "none"};
              transform-origin: 24px 64px;
            }
            .gm-gb-pixel-3 {
              animation: ${isAnimated ? "gm-gb-pixel-rise 3.2s ease-in-out -1.2s infinite" : "none"};
              transform-origin: 20px 57px;
            }
            .gm-gb-pixel-4 {
              animation: ${isAnimated ? "gm-gb-pixel-rise 2.4s ease-in-out -1.7s infinite" : "none"};
              transform-origin: 28px 60px;
            }
            .gm-gb-pixel-5 {
              animation: ${isAnimated ? "gm-gb-pixel-rise 3s ease-in-out -2.2s infinite" : "none"};
              transform-origin: 13px 61px;
            }
            .gm-gb-pixel-6 {
              animation: ${isAnimated ? "gm-gb-pixel-rise 2.5s ease-in-out -0.9s infinite" : "none"};
              transform-origin: 26px 70px;
            }
            .gm-animated-gamebot {
              animation: ${isAnimated ? "gm-gamebot-float 2.8s ease-in-out infinite" : "none"};
              transform-origin: 22px 90px;
            }
            .gm-animated-robe {
              animation: ${isAnimated ? "gm-robe-sway 3.5s ease-in-out infinite" : "none"};
              transform-origin: 95px 120px;
            }
          `}</style>
        </defs>

        {/* ============================================================== */}
        {/* LAYER 0: GROUND SHADOW (BAYANGAN DI TANAH DENGAN PULSA SINKRON) */}
        {/* ============================================================== */}
        <g className="gm-animated-shadow">
          <ellipse cx="102" cy="186" rx="46" ry="6.5" fill="#0A0A0A" />
          <ellipse cx="98" cy="184" rx="46" ry="6.5" fill="#0A0A0A" opacity="0.85" />
          <line x1="44" y1="185" x2="48" y2="185" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="148" y1="185" x2="154" y2="185" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* ============================================================== */}
        {/* CONTAINER KARAKTER DENGAN HOVER SEPARATED DARI CSS ANIMATION   */}
        {/* ============================================================== */}
        <g className="transition-transform duration-300 group-hover:scale-105">
          <g className="gm-animated-body">
            {/* ============================================================== */}
            {/* LAYER 1: JUBAH BELAKANG & LINING (BACK ROBE JAGGED LAYER)      */}
            {/* ============================================================== */}
            <path
              d="M 34 124 L 42 160 L 52 146 L 64 176 L 78 154 L 95 174 L 114 154 L 128 176 L 140 146 L 150 160 L 158 124 Z"
              fill="#0A0A0A"
            />
            <path
              d="M 30 120 L 38 156 L 48 142 L 60 172 L 74 150 L 95 170 L 110 150 L 124 172 L 136 142 L 146 156 L 154 120 Z"
              fill="#047857"
              stroke="#0A0A0A"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <line x1="60" y1="142" x2="60" y2="168" stroke="#065F46" strokeWidth="2" strokeLinecap="round" />
            <line x1="95" y1="138" x2="95" y2="166" stroke="#065F46" strokeWidth="2" strokeLinecap="round" />
            <line x1="124" y1="142" x2="124" y2="168" stroke="#065F46" strokeWidth="2" strokeLinecap="round" />

            {/* ============================================================== */}
            {/* LAYER 2: KAKI & SEPATU MELAYANG DI UDARA (FLOATING FEET)       */}
            {/* ============================================================== */}
            <rect x="68" y="146" width="22" height="24" rx="3" fill="#0A0A0A" />
            <rect
              x="64"
              y="142"
              width="22"
              height="24"
              rx="3"
              fill="#0A0A0A"
              stroke="#0A0A0A"
              strokeWidth="3.5"
            />
            <line
              x1="64"
              y1="160"
              x2="86"
              y2="160"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            <rect x="114" y="146" width="22" height="24" rx="3" fill="#0A0A0A" />
            <rect
              x="110"
              y="142"
              width="22"
              height="24"
              rx="3"
              fill="#0A0A0A"
              stroke="#0A0A0A"
              strokeWidth="3.5"
            />
            <line
              x1="110"
              y1="160"
              x2="132"
              y2="160"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* ============================================================== */}
            {/* LAYER 3: BADAN UTAMA KUNING RAMBU BASE JALANMIN (106x94 rx=4)  */}
            {/* ============================================================== */}
            <rect x="48" y="56" width="106" height="94" rx="4" fill="#0A0A0A" />
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
            <line
              x1="54"
              y1="134"
              x2="136"
              y2="134"
              stroke="#0A0A0A"
              strokeWidth="3.5"
              strokeDasharray="8 6"
            />
            <rect x="52" y="106" width="12" height="7" rx="2" fill="#FF5C8A" />
            <rect x="124" y="106" width="12" height="7" rx="2" fill="#FF5C8A" />

            {/* ============================================================== */}
            {/* LAYER 4: JUBAH BESAR PENYIHIR HIJAU MINT BERKIBAR LANCIP       */}
            {/* ============================================================== */}
            <g className="gm-animated-robe">
              <path
                d="M 42 120 L 24 146 L 36 150 L 32 176 L 48 158 L 60 174 L 74 150 L 95 144 L 118 150 L 132 174 L 144 158 L 160 176 L 156 150 L 168 146 L 150 120 Z"
                fill="#0A0A0A"
              />
              <path
                d="M 38 116 L 20 142 L 32 146 L 28 172 L 44 154 L 56 170 L 70 146 L 95 140 L 114 146 L 128 170 L 140 154 L 156 172 L 152 146 L 164 142 L 146 116 Z"
                fill="#2EE59D"
                stroke="#0A0A0A"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path
                d="M 44 118 L 34 144 L 44 154"
                stroke="#10B981"
                strokeWidth="3"
                fill="none"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                d="M 56 126 L 56 166"
                stroke="#10B981"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 144 118 L 154 144 L 144 154"
                stroke="#10B981"
                strokeWidth="3"
                fill="none"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                d="M 128 126 L 128 166"
                stroke="#10B981"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 83 132 L 95 140 L 107 132"
                stroke="#0A0A0A"
                strokeWidth="3"
                fill="none"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                d="M 22 143 L 32 146 L 28 170 L 43 155 L 55 169"
                stroke="#FFD60A"
                strokeWidth="2.5"
                fill="none"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                d="M 129 169 L 141 155 L 156 170 L 152 146 L 162 143"
                stroke="#FFD60A"
                strokeWidth="2.5"
                fill="none"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </g>

            {/* Kerah / Mantel Bahu Jubah Siluet Lancip */}
            <polygon points="95,142 72,146 60,126 78,130 95,132" fill="#0A0A0A" />
            <polygon
              points="93,140 70,144 58,124 76,128 93,130"
              fill="#2EE59D"
              stroke="#0A0A0A"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <polygon points="60,125 66,127 64,131" fill="#FFD60A" />

            <polygon points="95,142 118,146 130,126 112,130 95,132" fill="#0A0A0A" />
            <polygon
              points="93,140 116,144 128,124 110,128 93,130"
              fill="#2EE59D"
              stroke="#0A0A0A"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <polygon points="126,125 120,127 122,131" fill="#FFD60A" />

            {/* Bros Pin Play Button Arcade Emas (▶) */}
            <polygon
              points="89,129 99,134 89,139"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />

            {/* ============================================================== */}
            {/* LAYER 5: EKSPRESI CERIA MERAPAL MANTRA (MATA RPG & MULUT RIA)  */}
            {/* ============================================================== */}
            {/* Mata Kiri RPG Cyan Elektrik (Efek Kedip & Bintang Berputar) */}
            <g className="gm-animated-eye-left">
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
              <rect x="63" y="81" width="12" height="14" rx="2" fill="#0A0A0A" />
              <polygon
                points="71,83 72.5,86 76,88 72.5,90 71,93 69.5,90 66,88 69.5,86"
                fill="#00F0FF"
                className="gm-animated-star-left"
              />
              <circle cx="68" cy="84" r="1.5" fill="#FFFFFF" />
            </g>

            {/* Mata Kanan RPG Kuning Emas (Efek Kedip & Bintang Berputar) */}
            <g className="gm-animated-eye-right">
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
              <rect x="107" y="81" width="12" height="14" rx="2" fill="#0A0A0A" />
              <polygon
                points="115,83 116.5,86 120,88 116.5,90 115,93 113.5,90 110,88 113.5,86"
                fill="#FFD60A"
                className="gm-animated-star-right"
              />
              <circle cx="112" cy="84" r="1.5" fill="#FFFFFF" />
            </g>

            {/* Alis Ceria & Antusias */}
            <path
              d="M 58 70 Q 69 65 79 69"
              stroke="#0A0A0A"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 103 69 Q 113 65 124 70"
              stroke="#0A0A0A"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />

            {/* Mulut Terbuka Ceria Merapal Mantra Sambil Tertawa Senang */}
            <path
              d="M 86 108 Q 94 105 102 108 C 105 123 94 125 86 108 Z"
              fill="#0A0A0A"
              stroke="#0A0A0A"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path d="M 88 108 H 100 V 111 H 88 Z" fill="#FFFFFF" />
            <ellipse cx="94" cy="118" rx="4.5" ry="2.5" fill="#FF5C8A" />
            <path
              d="M 83 107 C 83 110 85 112 86 112"
              stroke="#0A0A0A"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 102 112 C 103 112 105 110 105 107"
              stroke="#0A0A0A"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />

            {/* ============================================================== */}
            {/* LAYER 6: LENGAN JUBAH LANCIP MIRING (POINTED WIZARD CUFFS)     */}
            {/* ============================================================== */}
            {/* Lengan Jubah Kiri */}
            <polygon points="47,85 19,99 15,129 27,119 49,113" fill="#0A0A0A" />
            <polygon
              points="44,82 16,96 12,126 24,116 46,110"
              fill="#2EE59D"
              stroke="#0A0A0A"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <polyline
              points="42,86 26,104 20,122"
              stroke="#10B981"
              strokeWidth="2.5"
              fill="none"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <polygon
              points="16,96 22,98 25,114 12,126"
              fill="#047857"
              stroke="#0A0A0A"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <polyline
              points="18,110 12,126 20,120"
              stroke="#FFD60A"
              strokeWidth="2"
              fill="none"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Lengan Jubah Kanan */}
            <polygon points="141,85 173,99 177,129 165,119 143,113" fill="#0A0A0A" />
            <polygon
              points="142,82 170,96 174,126 162,116 140,110"
              fill="#2EE59D"
              stroke="#0A0A0A"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <polyline
              points="144,86 160,104 166,122"
              stroke="#10B981"
              strokeWidth="2.5"
              fill="none"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <polygon
              points="170,96 164,98 161,114 174,126"
              fill="#047857"
              stroke="#0A0A0A"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <polyline
              points="168,110 174,126 166,120"
              stroke="#FFD60A"
              strokeWidth="2"
              fill="none"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* ============================================================== */}
            {/* LAYER 7: TOPI PENYIHIR PIXEL ARCADE (PIXEL MAGE HAT)           */}
            {/* ============================================================== */}
            <path
              d="M 29 52 C 29 52 45 46 95 46 C 145 46 161 52 161 52 L 141 28 L 127 12 L 103 6 L 81 14 L 63 30 Z"
              fill="#0A0A0A"
            />
            <ellipse
              cx="95"
              cy="48"
              rx="66"
              ry="11"
              fill="#2EE59D"
              stroke="#0A0A0A"
              strokeWidth="4"
            />
            <polygon
              points="55,46 135,46 129,36 61,36"
              fill="#FF5C8A"
              stroke="#0A0A0A"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <polygon
              points="61,36 129,36 121,24 69,24"
              fill="#2EE59D"
              stroke="#0A0A0A"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <polygon
              points="69,24 121,24 111,14 79,14"
              fill="#2EE59D"
              stroke="#0A0A0A"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <polygon
              points="79,14 111,14 105,7 83,7 67,10 69,16 81,14"
              fill="#2EE59D"
              stroke="#0A0A0A"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <rect
              x="89"
              y="35"
              width="12"
              height="12"
              rx="2"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="2.5"
            />
            <rect x="93" y="39" width="4" height="4" fill="#0A0A0A" />

            {/* ============================================================== */}
            {/* LAYER 8: TANGAN KIRI & GAMEBOT SIHIR MERAPAL MANTRA            */}
            {/* ============================================================== */}
            <g className="gm-animated-gamebot">
              <circle cx="26" cy="116" r="6.5" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="3" />
              <circle cx="21" cy="113" r="2.2" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="1.5" />
              <circle cx="26" cy="110" r="2.2" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="1.5" />

              <rect x="12" y="78" width="28" height="38" rx="4" fill="#0A0A0A" />
              <rect
                x="8"
                y="74"
                width="28"
                height="38"
                rx="4"
                fill="#18181B"
                stroke="#0A0A0A"
                strokeWidth="3.5"
              />
              <rect
                x="11"
                y="77"
                width="22"
                height="17"
                rx="2"
                fill="#09090B"
                stroke="#0A0A0A"
                strokeWidth="1.8"
              />
              <rect x="13" y="79" width="18" height="13" rx="1.5" fill="#00F0FF" />
              <polygon
                points="22,81 24,84 27,85.5 24,87 22,90 20,87 17,85.5 20,84"
                fill="#FFFFFF"
              />
              <rect x="21" y="84.5" width="2" height="2" fill="#FFD60A" />

              <path
                d="M 14 98 H 16 V 96 H 18 V 98 H 20 V 100 H 18 V 102 H 16 V 100 H 14 Z"
                fill="#FFFFFF"
              />
              <circle cx="28" cy="98" r="2" fill="#FF5C8A" stroke="#0A0A0A" strokeWidth="0.8" />
              <circle cx="32" cy="95" r="2" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="0.8" />
              <line x1="20" y1="106" x2="22" y2="105" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
              <line x1="24" y1="106" x2="26" y2="105" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />

              {/* KUMPULAN PIXEL FLOAT RETRO DI ATAS GAMEBOT (MENGGANTIKAN GARIS PUTUS-PUTUS & BINTANG) */}
              <g id="gm-gamebot-pixel-particles">
                <rect
                  x="14"
                  y="66"
                  width="4.5"
                  height="4.5"
                  rx="0.8"
                  fill="#00F0FF"
                  stroke="#0A0A0A"
                  strokeWidth="1.2"
                  className="gm-gb-pixel-1"
                />
                <rect
                  x="22"
                  y="61"
                  width="4"
                  height="4"
                  rx="0.8"
                  fill="#2EE59D"
                  stroke="#0A0A0A"
                  strokeWidth="1.2"
                  className="gm-gb-pixel-2"
                />
                <rect
                  x="17"
                  y="54"
                  width="4.5"
                  height="4.5"
                  rx="0.8"
                  fill="#FFD60A"
                  stroke="#0A0A0A"
                  strokeWidth="1.2"
                  className="gm-gb-pixel-3"
                />
                <rect
                  x="26"
                  y="57"
                  width="3.5"
                  height="3.5"
                  rx="0.6"
                  fill="#FF5C8A"
                  stroke="#0A0A0A"
                  strokeWidth="1"
                  className="gm-gb-pixel-4"
                />
                <rect
                  x="10.5"
                  y="58"
                  width="3.5"
                  height="3.5"
                  rx="0.6"
                  fill="#FFFFFF"
                  stroke="#0A0A0A"
                  strokeWidth="1"
                  className="gm-gb-pixel-5"
                />
                <rect
                  x="24"
                  y="68"
                  width="3"
                  height="3"
                  rx="0.5"
                  fill="#00F0FF"
                  stroke="#0A0A0A"
                  strokeWidth="0.8"
                  className="gm-gb-pixel-6"
                />
              </g>
            </g>

            {/* ============================================================== */}
            {/* LAYER 9: TANGAN KANAN & TONGKAT SIHIR MISTIS BERCABANG         */}
            {/* ============================================================== */}
            <line
              x1="171"
              y1="152"
              x2="171"
              y2="38"
              stroke="#0A0A0A"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <line
              x1="167"
              y1="150"
              x2="167"
              y2="36"
              stroke="#451A03"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <line x1="165" y1="74" x2="169" y2="70" stroke="#FFD60A" strokeWidth="2.5" />
            <line x1="165" y1="88" x2="169" y2="84" stroke="#FFD60A" strokeWidth="2.5" />
            <line x1="165" y1="126" x2="169" y2="122" stroke="#FFD60A" strokeWidth="2.5" />

            {/* GENGGAMAN TANGAN KANAN REALISTIS MEMELUK TONGKAT KAYU MISTIS */}
            <g id="gm-hand-staff-grip">
              {/* Telapak Tangan / Kepalan Dasar dari Lengan Jubah */}
              <ellipse cx="165" cy="106" rx="6.5" ry="8" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="3.5" />

              {/* 4 Jari Melingkari Batang Tongkat dari Depan */}
              {/* Jari Telunjuk */}
              <rect x="162" y="99" width="11" height="4.5" rx="2" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2.2" />
              {/* Jari Tengah */}
              <rect x="161.5" y="103.5" width="11.5" height="4.5" rx="2" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2.2" />
              {/* Jari Manis */}
              <rect x="162" y="108" width="11" height="4.5" rx="2" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2.2" />
              {/* Jari Kelingking */}
              <rect x="163" y="112.5" width="9.5" height="4" rx="1.8" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2.2" />

              {/* Ibu Jari (Thumb) Menjepit Mantap di Sisi Depan Tongkat */}
              <ellipse cx="162" cy="103" rx="4" ry="5.5" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2.2" transform="rotate(-15 162 103)" />
              <line x1="160" y1="102" x2="163" y2="104" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" />
            </g>
            <rect x="162" y="36" width="10" height="5" rx="1.5" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2" />

            {/* Cabang Kayu Mistis Kiri Menopang Magic Orb */}
            <path d="M 166 38 C 158 36 148 26 153 14 C 155 12 157 15 156 19 C 154 26 161 32 166 34 Z" fill="#0A0A0A" />
            <path
              d="M 164 36 C 156 34 146 24 151 12 C 153 10 155 13 154 17 C 152 24 159 30 164 32 Z"
              fill="#451A03"
              stroke="#0A0A0A"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <polygon points="151,12 153,10 154,15 150,15" fill="#FFD60A" />

            {/* Cabang Kayu Mistis Kanan Menopang Magic Orb */}
            <path d="M 168 38 C 176 36 186 26 181 14 C 179 12 177 15 178 19 C 180 26 173 32 168 34 Z" fill="#0A0A0A" />
            <path
              d="M 166 36 C 174 34 184 24 179 12 C 177 10 175 13 176 17 C 178 24 171 30 166 32 Z"
              fill="#451A03"
              stroke="#0A0A0A"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <polygon points="179,12 177,10 176,15 180,15" fill="#FFD60A" />

            <polygon points="167,34 163,26 167,18 171,26" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2" strokeLinejoin="round" />

            {/* Magic Orb Kristal Cyan Elektrik di Pucuk Tongkat Mistis (#00F0FF) — Berkilauan */}
            <g className="gm-animated-orb">
              {/* Cincin Sihir Berputar */}
              <circle
                cx="167"
                cy="22"
                r="14"
                fill="none"
                stroke="#00F0FF"
                strokeWidth="1.8"
                strokeDasharray="4 3"
                opacity="0.85"
                className="gm-animated-ring"
              />
              <circle cx="170" cy="24" r="10" fill="#0A0A0A" />
              <circle
                cx="167"
                cy="22"
                r="10"
                fill="#00F0FF"
                stroke="#0A0A0A"
                strokeWidth="3"
              />
              {/* Bintang Kristal Berkilau di Dalam Orb */}
              <polygon
                points="167,15 169,19.5 174,22 169,24.5 167,29 165,24.5 160,22 165,19.5"
                fill="#FFFFFF"
                className="gm-animated-twinkle"
              />
              <circle cx="164" cy="19" r="2" fill="#FFFFFF" />
              <circle cx="169" cy="24" r="1.2" fill="#FFFFFF" />

              <polygon points="164,30 167,25 170,30 167,34" fill="#451A03" stroke="#0A0A0A" strokeWidth="1.8" strokeLinejoin="round" />
              <polygon points="166,28 167,25 168,28" fill="#FFD60A" />
            </g>

            {/* ============================================================== */}
            {/* LAYER 10: PARTIKEL SIHIR PIXEL & BINTANG 8-BIT MELAYANG FADING  */}
            {/* ============================================================== */}
            <g className="gm-animated-pixel1">
              <rect
                x="185"
                y="10"
                width="7"
                height="7"
                fill="#2EE59D"
                stroke="#0A0A0A"
                strokeWidth="2"
              />
            </g>

            <g className="gm-animated-pixel5">
              <polygon points="150,8 152,12 150,16 148,12" fill="#00F0FF" stroke="#0A0A0A" strokeWidth="1.2" />
            </g>

            <g className="gm-animated-pixel3">
              <rect
                x="186"
                y="66"
                width="6"
                height="6"
                fill="#FF5C8A"
                stroke="#0A0A0A"
                strokeWidth="2"
              />
            </g>

            <g className="gm-animated-pixel4">
              <rect
                x="36"
                y="28"
                width="6"
                height="6"
                fill="#FFD60A"
                stroke="#0A0A0A"
                strokeWidth="2"
              />
            </g>

            <g className="gm-animated-pixel2">
              <polygon
                points="26,62 28,67 33,69 28,71 26,76 24,71 19,69 24,67"
                fill="#FFD60A"
                stroke="#0A0A0A"
                strokeWidth="1.8"
              />
            </g>

            <path
              d="M 22 130 L 20 128 A 2.5 2.5 0 0 1 24 125 A 2.5 2.5 0 0 1 28 128 L 26 130 L 24 132 Z"
              fill="#FF5C8A"
              stroke="#0A0A0A"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
