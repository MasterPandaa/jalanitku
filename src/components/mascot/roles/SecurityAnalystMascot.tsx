"use client";

import React from "react";

export interface SecurityAnalystMascotProps {
  size?: number | string;
  className?: string;
  animated?: boolean;
  animate?: boolean;
  state?: "idle" | "hover" | "happy";
}

/**
 * Maskot Role: Cybersecurity / Security Analyst — "The Warden"
 * Identitas: Sang Penjaga Benteng Data & Tameng Pertahanan Siber
 * Patuh 4 Aturan Baku:
 * 1. Base Body Kuning Rambu (#FFD60A) 106x94 rx=4 di (42,50) dengan hard shadow (48,56)
 *    dan rompi/armor benteng cyber ungu (#7C3AED) terpasang kokoh di atas badan.
 * 2. Zero-Float Batch 3: Tanpa badge melayang AES-256 di angkasa.
 * 3. Mata Baku JalanMin 22x24 rx=4 di x=58 & 102 y=76, pupil 11x13 dengan kilau putih & cyan,
 *    pipi merona pink (#FF5C8A) di y=104, serta tactical HUD visor hijau terminal transparan (opacity ~0.32).
 * 4. Helm tantangan cyber bertanduk, perisai firewall Aegis bergembok emas, dan Cyber Key Blade.
 */
export function SecurityAnalystMascot({
  size = 200,
  className = "",
  animated = true,
  animate,
  state = "idle",
}: SecurityAnalystMascotProps) {
  const isAnimated = animate !== undefined ? animate : animated;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none group ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Maskot Cybersecurity — The Warden: Papan rambu kuning base JalanMin dengan rompi armor benteng ungu cyber, helm baja bertanduk, kacamata taktis HUD hijau terminal transparan, mata binar baku, perisai firewall Aegis, dan pedang kunci siber"
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
            @keyframes sec-bob {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-4px); }
            }
            @keyframes sec-shield-guard {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(-5deg) translate(-2px, 0); }
            }
            @keyframes sec-lock-glow {
              0%, 100% { filter: drop-shadow(0 0 3px #10B981); opacity: 0.95; }
              50% { filter: drop-shadow(0 0 10px #10B981); opacity: 1; }
            }
            @keyframes sec-blade-shimmer {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(8deg); }
            }
            .sec-animated {
              animation: ${isAnimated ? "sec-bob 3.6s ease-in-out infinite" : "none"};
              transform-origin: center bottom;
            }
            .sec-shield {
              animation: ${isAnimated ? "sec-shield-guard 2.8s ease-in-out infinite" : "none"};
              transform-origin: 22px 110px;
            }
            .sec-lock {
              animation: ${isAnimated ? "sec-lock-glow 2s ease-in-out infinite" : "none"};
            }
            .sec-blade {
              animation: ${isAnimated ? "sec-blade-shimmer 2.4s ease-in-out infinite" : "none"};
              transform-origin: 168px 115px;
            }
            @media (prefers-reduced-motion: reduce) {
              .sec-animated, .sec-shield, .sec-lock, .sec-blade {
                animation: none !important;
              }
            }
          `}</style>
        </defs>

        <g className="sec-animated transition-transform duration-300 group-hover:scale-105">
          {/* ============================================================== */}
          {/* LAYER 1: SEPATU BAJA BENTENG NEO-BRUTALISM DENGAN SOL UNGU     */}
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
          <line x1="64" y1="170" x2="86" y2="170" stroke="#7C3AED" strokeWidth="3.5" strokeLinecap="square" />

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
          <line x1="110" y1="170" x2="132" y2="170" stroke="#7C3AED" strokeWidth="3.5" strokeLinecap="square" />

          {/* ============================================================== */}
          {/* LAYER 2: BADAN UTAMA KUNING RAMBU BASE JALANMIN (106x94 rx=4)  */}
          {/* ============================================================== */}
          {/* Hard Drop Shadow Badan Rambu */}
          <rect x="48" y="56" width="106" height="94" rx="4" fill="#0A0A0A" />

          {/* Badan Utama Kuning Rambu Standar (#FFD60A) */}
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
          <rect x="52" y="104" width="12" height="7" rx="2" fill="#FF5C8A" />
          <rect x="124" y="104" width="12" height="7" rx="2" fill="#FF5C8A" />

          {/* ============================================================== */}
          {/* LAYER 3: ROMPI / ARMOR BENTENG CYBER UNGU (#7C3AED)             */}
          {/* ============================================================== */}
          {/* Flap Armor Dada Kiri Ungu Cyber */}
          <polygon
            points="42,122 84,124 78,144 42,144"
            fill="#7C3AED"
            stroke="#0A0A0A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Flap Armor Dada Kanan Ungu Cyber */}
          <polygon
            points="106,124 148,122 148,144 112,144"
            fill="#7C3AED"
            stroke="#0A0A0A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Panel Inti Pelindung Sentral */}
          <polygon
            points="84,124 106,124 102,144 88,144"
            fill="#5B21B6"
            stroke="#0A0A0A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Alur Sirkuit Neon Hijau Terminal di Armor */}
          <line x1="48" y1="133" x2="72" y2="133" stroke="#10B981" strokeWidth="2" strokeDasharray="4 2" />
          <line x1="118" y1="133" x2="142" y2="133" stroke="#10B981" strokeWidth="2" strokeDasharray="4 2" />
          {/* Indikator Status Firewall Hijau Neon */}
          <circle cx="95" cy="134" r="2.5" fill="#10B981" stroke="#0A0A0A" strokeWidth="1" />

          {/* ============================================================== */}
          {/* LAYER 4: MATA BAKU JALANMIN (22x24 rx=4) & ALIS WASPADA        */}
          {/* ============================================================== */}
          {/* Sklera Putih Mata Kiri */}
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
          {/* Kilau Putih Utama */}
          <circle cx="67" cy="84" r="1.5" fill="#FFFFFF" />
          {/* Kilau Cyan Sekunder */}
          <circle cx="70" cy="88" r="1.2" fill="#00F0FF" />

          {/* Sklera Putih Mata Kanan */}
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
          {/* Kilau Putih Utama */}
          <circle cx="111" cy="84" r="1.5" fill="#FFFFFF" />
          {/* Kilau Cyan Sekunder */}
          <circle cx="114" cy="88" r="1.2" fill="#00F0FF" />

          {/* Alis Tegas Waspada Penjaga Benteng */}
          <line x1="56" y1="67" x2="80" y2="70" stroke="#0A0A0A" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="102" y1="70" x2="126" y2="67" stroke="#0A0A0A" strokeWidth="4.5" strokeLinecap="round" />

          {/* Mulut Senyum Waspada & Tegap */}
          <path
            d="M 85,114 Q 95,122 105,114"
            stroke="#0A0A0A"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* ============================================================== */}
          {/* LAYER 5: KACAMATA TAKTIS HUD VISOR HIJAU TERMINAL TRANSPARAN   */}
          {/* ============================================================== */}
          <g id="tactical-hud-glasses">
            {/* Lensa Transparan Hijau Terminal (Mata di baliknya tetap terlihat jelas) */}
            <rect
              x="52"
              y="72"
              width="84"
              height="28"
              rx="4"
              fill="#10B981"
              fillOpacity="0.32"
            />
            {/* Bingkai Luar Kacamata Taktis */}
            <rect
              x="50"
              y="70"
              width="88"
              height="32"
              rx="5"
              fill="none"
              stroke="#0A0A0A"
              strokeWidth="3.5"
            />
            {/* Bridge Kacamata Taktis di Hidung */}
            <rect x="88" y="74" width="12" height="6" rx="1.5" fill="#0A0A0A" />
            <circle cx="94" cy="77" r="1.5" fill="#10B981" />

            {/* Scanline & Grid Terminal Digital */}
            <line x1="54" y1="78" x2="134" y2="78" stroke="#10B981" strokeWidth="1" strokeDasharray="3 2" opacity="0.8" />
            <line x1="54" y1="92" x2="134" y2="92" stroke="#10B981" strokeWidth="1" strokeDasharray="3 2" opacity="0.8" />

            {/* Teks Mini HUD Radar: "0_THREAT" */}
            <text x="56" y="86" fontFamily="monospace" fontSize="6.5" fontWeight="900" fill="#10B981" opacity="0.95">0_THREAT</text>

            {/* Reticle Pemindai Radar di Lensa Kanan */}
            <circle cx="124" cy="86" r="4.5" fill="none" stroke="#10B981" strokeWidth="1" strokeDasharray="2 2" opacity="0.85" />
            <circle cx="124" cy="86" r="1.5" fill="#10B981" opacity="0.95" />
          </g>

          {/* ============================================================== */}
          {/* LAYER 6: HELM TANTANGAN CYBER WARDEN BERTANDUK BAJA            */}
          {/* ============================================================== */}
          <g transform="translate(25, 8)">
            {/* Hard Shadow Helm */}
            <path
              d="M 12,46 L 24,14 L 38,26 L 102,26 L 116,14 L 128,46 Z"
              fill="#0A0A0A"
            />
            {/* Kubah Helm Baja Ungu Gelap */}
            <path
              d="M 10,42 L 22,12 L 36,24 L 100,24 L 114,12 L 126,42 Z"
              fill="#7C3AED"
              stroke="#0A0A0A"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Tanduk Baja Kiri & Kanan */}
            <polygon points="12,24 22,12 20,28" fill="#10B981" stroke="#0A0A0A" strokeWidth="2.5" />
            <polygon points="124,24 114,12 116,28" fill="#10B981" stroke="#0A0A0A" strokeWidth="2.5" />
            {/* Pelat Dahi Baja Perak */}
            <polygon points="46,24 90,24 82,34 54,34" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="2.5" />
          </g>

          {/* ============================================================== */}
          {/* LAYER 7: TANGAN KIRI MEMEGANG PERISAI FIREWALL (AEGIS SHIELD)   */}
          {/* ============================================================== */}
          <g className="sec-shield" transform="translate(6, 78)">
            <line x1="32" y1="38" x2="18" y2="44" stroke="#0A0A0A" strokeWidth="6" strokeLinecap="round" />
            <circle cx="18" cy="44" r="6" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="3.5" />
            {/* Perisai Heksagonal Kokoh Baja */}
            <g transform="translate(-10, 10)">
              {/* Shadow Perisai */}
              <polygon points="18,0 44,0 52,28 31,58 10,28" fill="#0A0A0A" />
              {/* Badan Perisai Heksagonal Abu-Putih */}
              <polygon
                points="15,-3 41,-3 49,25 28,55 7,25"
                fill="#FFFFFF"
                stroke="#0A0A0A"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              {/* Lapisan Pelat Dalam Ungu Cyber */}
              <polygon
                points="19,4 37,4 43,24 28,46 13,24"
                fill="#7C3AED"
                stroke="#0A0A0A"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              {/* Lambang Gembok Enkripsi Emas Berpijar Hijau */}
              <g className="sec-lock" transform="translate(21, 14)">
                {/* Tangkai Gembok Melengkung */}
                <path d="M 4,4 C 4,-2 10,-2 10,4" stroke="#0A0A0A" strokeWidth="2.5" fill="none" />
                {/* Bodi Gembok Emas */}
                <rect x="1" y="4" width="12" height="10" rx="2" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2" />
                {/* Lubang Kunci Hijau Neon */}
                <circle cx="7" cy="8" r="1.5" fill="#10B981" />
                <line x1="7" y1="9" x2="7" y2="12" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
              </g>
            </g>
          </g>

          {/* ============================================================== */}
          {/* LAYER 8: TANGAN KANAN MEMEGANG CYBER KEY BLADE                 */}
          {/* ============================================================== */}
          <g className="sec-blade" transform="translate(148, 92)">
            <line x1="-2" y1="28" x2="16" y2="34" stroke="#0A0A0A" strokeWidth="6" strokeLinecap="round" />
            <circle cx="16" cy="34" r="6" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="3.5" />
            {/* Bilah Pedang Kunci Hijau Terminal */}
            <g transform="translate(18, 22) rotate(24)">
              {/* Shadow Blade */}
              <polygon points="0,0 6,-38 12,0 8,14 4,14" fill="#0A0A0A" />
              {/* Gagang Pedang Kunci */}
              <rect x="3" y="2" width="6" height="14" rx="2" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2" />
              {/* Crossguard Pedang */}
              <rect x="-4" y="0" width="20" height="5" rx="1.5" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="2" />
              {/* Bilah Pedang Bercahaya Hijau Terminal */}
              <polygon
                points="-1,-2 6,-40 13,-2 10,0 2,0"
                fill="#10B981"
                stroke="#0A0A0A"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              {/* Gerigi Kunci Digital di Sisi Bilah */}
              <rect x="10" y="-24" width="5" height="3" fill="#10B981" stroke="#0A0A0A" strokeWidth="1.5" />
              <rect x="10" y="-14" width="4" height="3" fill="#10B981" stroke="#0A0A0A" strokeWidth="1.5" />
              {/* Alur Garis Sirkuit Putih */}
              <line x1="6" y1="-2" x2="6" y2="-32" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
