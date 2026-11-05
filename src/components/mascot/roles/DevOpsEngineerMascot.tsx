"use client";

import React from "react";

export interface DevOpsEngineerMascotProps {
  size?: number | string;
  className?: string;
  animated?: boolean;
  animate?: boolean;
  state?: "idle" | "hover" | "happy";
}

/**
 * Maskot Role: DevOps Engineer — "The System-Pilot"
 * Identitas: Sang Penerbang Handal & Orkestrator Pipeline CI/CD Berkelanjutan
 * Metafora: Mengemudikan armada rilis sistem dari landasan pacu commit
 * hingga tujuan rilis produksi tanpa jeda (Continuous Flight).
 * 
 * Standar 4 Aturan Baku:
 * 1. Base Anatomi Konsisten: Wahana baling-baling vintage menopang pilot papan kuning JalanMin (#FFD60A).
 * 2. Zero-Float Batch 3: Pin badge melayang CI/CD dihapus agar fokus pada armada dan pilot.
 * 3. Mata Baku JalanMin: Sklera putih rounded 22x24 rx=4 di x=70 & 110, pupil hitam dengan kilau putih & cyan,
 *    dan pipi merona pink #FF5C8A.
 * 4. Karakterisasi Bebas: Helm kulit aviator vintage coklat dengan strap gesper, goggle retro di dahi,
 *    syal sutra putih berkibar, sayap pesawat berlampu navigasi port/starboard, dan moncong baling-baling 4 bilah.
 */
export function DevOpsEngineerMascot({
  size = 200,
  className = "",
  animated = true,
  animate,
  state = "idle",
}: DevOpsEngineerMascotProps) {
  const isAnimated = animate !== undefined ? animate : animated;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none group ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Maskot DevOps Engineer — The System-Pilot: Pilot vintage penerbang pesawat baling-baling depan dengan mata baku JalanMin, helm kulit, goggle retro, syal putih berkibar, sayap lampu navigasi, dan livery rilis CI/CD"
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
            @keyframes pilot-flight-bob {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              25% { transform: translateY(-4px) rotate(-1.2deg); }
              75% { transform: translateY(3px) rotate(1deg); }
            }
            @keyframes pilot-prop-spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes pilot-blur-spin {
              0% { transform: rotate(360deg); }
              100% { transform: rotate(0deg); }
            }
            @keyframes pilot-scarf-flutter {
              0%, 100% { transform: scaleX(1) rotate(0deg) skewY(0deg); }
              50% { transform: scaleX(1.08) rotate(-5deg) skewY(-3deg); }
            }
            @keyframes pilot-nav-blink {
              0%, 100% { opacity: 1; filter: drop-shadow(0 0 3px currentColor); }
              50% { opacity: 0.55; filter: drop-shadow(0 0 1px currentColor); }
            }
            @keyframes pilot-cloud-drift-l {
              0%, 100% { transform: translateX(0px); }
              50% { transform: translateX(-5px); }
            }
            @keyframes pilot-cloud-drift-r {
              0%, 100% { transform: translateX(0px); }
              50% { transform: translateX(5px); }
            }

            .pilot-animated {
              animation: ${isAnimated ? "pilot-flight-bob 3.2s ease-in-out infinite" : "none"};
              transform-origin: 100px 140px;
            }
            .pilot-prop {
              animation: ${isAnimated ? "pilot-prop-spin 0.22s linear infinite" : "none"};
              transform-origin: 100px 148px;
            }
            .pilot-blur {
              animation: ${isAnimated ? "pilot-blur-spin 0.35s linear infinite" : "none"};
              transform-origin: 100px 148px;
            }
            .pilot-scarf {
              animation: ${isAnimated ? "pilot-scarf-flutter 0.38s ease-in-out infinite" : "none"};
              transform-origin: 102px 108px;
            }
            .pilot-nav-l {
              animation: ${isAnimated ? "pilot-nav-blink 1.2s ease-in-out infinite" : "none"};
            }
            .pilot-nav-r {
              animation: ${isAnimated ? "pilot-nav-blink 1.2s ease-in-out infinite 0.6s" : "none"};
            }
            .pilot-cloud-l {
              animation: ${isAnimated ? "pilot-cloud-drift-l 4.2s ease-in-out infinite" : "none"};
            }
            .pilot-cloud-r {
              animation: ${isAnimated ? "pilot-cloud-drift-r 4.2s ease-in-out infinite" : "none"};
            }

            @media (prefers-reduced-motion: reduce) {
              .pilot-animated, .pilot-prop, .pilot-blur, .pilot-scarf, .pilot-nav-l, .pilot-nav-r, .pilot-cloud-l, .pilot-cloud-r {
                animation: none !important;
              }
            }
          `}</style>
        </defs>

        {/* 1. GUMPALAN AWAN RENDAH DI BAWAH SAYAP (AERIAL CLOUDS) */}
        <g id="clouds">
          {/* Cloud Left */}
          <g className="pilot-cloud-l">
            <path d="M 10,182 C 10,174 20,166 32,168 C 44,164 56,172 56,182 C 56,192 10,192 10,182 Z" fill="#0A0A0A" />
            <path d="M 6,178 C 6,170 16,162 28,164 C 40,160 52,168 52,178 C 52,188 6,188 6,178 Z" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="3" strokeLinejoin="round" />
            <path d="M 12,183 C 24,185 38,185 46,181" stroke="#E0F2FE" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </g>

          {/* Cloud Right */}
          <g className="pilot-cloud-r">
            <path d="M 148,182 C 148,172 160,164 172,168 C 184,166 194,174 194,184 C 194,192 148,192 148,182 Z" fill="#0A0A0A" />
            <path d="M 144,178 C 144,168 156,160 168,164 C 180,162 190,170 190,180 C 190,188 144,188 144,178 Z" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="3" strokeLinejoin="round" />
            <path d="M 150,183 C 162,185 176,185 184,181" stroke="#E0F2FE" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </g>
        </g>

        {/* 2. GRUP UTAMA PESAWAT & PILOT BERANIMASI TURBULENSI TERBANG */}
        <g className="pilot-animated transition-transform duration-300 group-hover:scale-105">
          {/* SAYAP PESAWAT MEMBENTANG KIRI & KANAN (FRONT WINGS) */}
          <g id="aircraft-wings">
            {/* Left Wing */}
            <rect x="12" y="118" width="56" height="15" rx="3" fill="#0A0A0A" />
            <rect x="8" y="114" width="56" height="15" rx="3" fill="#F43F5E" stroke="#0A0A0A" strokeWidth="3.5" strokeLinejoin="round" />
            <line x1="24" y1="114" x2="24" y2="129" stroke="#0A0A0A" strokeWidth="2.5" />
            <line x1="42" y1="114" x2="42" y2="129" stroke="#0A0A0A" strokeWidth="2.5" />
            {/* Navigation Light Left (Port - Red Light) */}
            <g className="pilot-nav-l" style={{ color: "#EF4444" }}>
              <circle cx="14" cy="121.5" r="4.5" fill="#EF4444" stroke="#0A0A0A" strokeWidth="2" />
              <circle cx="15.5" cy="120" r="1.5" fill="#FFFFFF" />
            </g>
            {/* Wing Strut Left */}
            <line x1="34" y1="129" x2="52" y2="152" stroke="#0A0A0A" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="34" y1="129" x2="52" y2="152" stroke="#FFD60A" strokeWidth="1.5" strokeLinecap="round" />

            {/* Right Wing */}
            <rect x="140" y="118" width="56" height="15" rx="3" fill="#0A0A0A" />
            <rect x="136" y="114" width="56" height="15" rx="3" fill="#F43F5E" stroke="#0A0A0A" strokeWidth="3.5" strokeLinejoin="round" />
            <line x1="158" y1="114" x2="158" y2="129" stroke="#0A0A0A" strokeWidth="2.5" />
            <line x1="176" y1="114" x2="176" y2="129" stroke="#0A0A0A" strokeWidth="2.5" />
            {/* Navigation Light Right (Starboard - Neon Green Build Passing) */}
            <g className="pilot-nav-r" style={{ color: "#2EE59D" }}>
              <circle cx="186" cy="121.5" r="4.5" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="2" />
              <circle cx="187.5" cy="120" r="1.5" fill="#FFFFFF" />
            </g>
            {/* Wing Strut Right */}
            <line x1="166" y1="129" x2="148" y2="152" stroke="#0A0A0A" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="166" y1="129" x2="148" y2="152" stroke="#FFD60A" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* BADAN UTAMA PILOT & HELM KULIT VINTAGE */}
          <g id="pilot">
            {/* Badan Papan Kuning Base JalanMin */}
            <rect x="66" y="52" width="76" height="74" rx="12" fill="#0A0A0A" />
            <rect x="62" y="48" width="76" height="74" rx="12" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="4" strokeLinejoin="round" />

            {/* Helm Kulit Penerbang Vintage (Leather Aviator Cap) */}
            <path d="M 56,60 C 56,24 150,24 150,60 L 150,88 L 136,88 L 136,66 C 136,40 70,40 70,66 L 70,88 L 56,88 Z" fill="#0A0A0A" />
            <path d="M 52,56 C 52,20 146,20 146,56 L 146,86 L 132,86 L 132,62 C 132,36 66,36 66,62 L 66,86 L 52,86 Z" fill="#78350F" stroke="#0A0A0A" strokeWidth="3.5" strokeLinejoin="round" />
            {/* Jahitan Benang Kulit Aviator Cap */}
            <path d="M 96,20 C 96,20 96,36 96,40" stroke="#B45309" strokeWidth="2" strokeDasharray="3 2" fill="none" />
            <path d="M 104,20 C 104,20 104,36 104,40" stroke="#B45309" strokeWidth="2" strokeDasharray="3 2" fill="none" />

            {/* Earflaps & Gesper Logam */}
            {/* Left Strap & Buckle */}
            <rect x="54" y="86" width="9" height="5" rx="1" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="1.5" />
            <line x1="58.5" y1="86" x2="58.5" y2="91" stroke="#0A0A0A" strokeWidth="1.5" />
            <line x1="58" y1="64" x2="58" y2="84" stroke="#B45309" strokeWidth="2" strokeDasharray="3 2" />
            {/* Right Strap & Buckle */}
            <rect x="135" y="86" width="9" height="5" rx="1" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="1.5" />
            <line x1="139.5" y1="86" x2="139.5" y2="91" stroke="#0A0A0A" strokeWidth="1.5" />
            <line x1="140" y1="64" x2="140" y2="84" stroke="#B45309" strokeWidth="2" strokeDasharray="3 2" />

            {/* Kacamata Goggles Retro di Dahi */}
            {/* Tali Strap Kulit Kacamata */}
            <rect x="51" y="40" width="98" height="8" rx="2" fill="#451A03" stroke="#0A0A0A" strokeWidth="2" />
            {/* Left Goggle */}
            <circle cx="83" cy="44" r="13" fill="#0A0A0A" />
            <circle cx="80" cy="42" r="13" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="3" />
            <circle cx="80" cy="42" r="9.5" fill="#B45309" stroke="#0A0A0A" strokeWidth="1.5" />
            <circle cx="80" cy="42" r="8" fill="#00F0FF" />
            <line x1="75" y1="37" x2="81" y2="45" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="83" cy="45" r="1" fill="#FFFFFF" />
            {/* Right Goggle */}
            <circle cx="123" cy="44" r="13" fill="#0A0A0A" />
            <circle cx="120" cy="42" r="13" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="3" />
            <circle cx="120" cy="42" r="9.5" fill="#B45309" stroke="#0A0A0A" strokeWidth="1.5" />
            <circle cx="120" cy="42" r="8" fill="#00F0FF" />
            <line x1="115" y1="37" x2="121" y2="45" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="123" cy="45" r="1" fill="#FFFFFF" />
            {/* Bridge Kacamata Logam Emas */}
            <rect x="91" y="40" width="18" height="5" rx="1.5" fill="#F59E0B" stroke="#0A0A0A" strokeWidth="2" />
            <circle cx="100" cy="42.5" r="1.5" fill="#0A0A0A" />

            {/* Wajah: Alis Berani & Mata Baku Berbinar JalanMin */}
            <line x1="68" y1="61" x2="92" y2="60" stroke="#0A0A0A" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="108" y1="60" x2="132" y2="61" stroke="#0A0A0A" strokeWidth="4.5" strokeLinecap="round" />

            {/* Mata Kiri Baku JalanMin (22x24 rx=4 di x=70 y=68) */}
            <rect x="70" y="68" width="22" height="24" rx="4" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="3.5" />
            <rect x="75" y="73" width="11" height="13" rx="2" fill="#0A0A0A" />
            <circle cx="78" cy="76" r="1.5" fill="#FFFFFF" />
            <circle cx="81" cy="80" r="1.2" fill="#00F0FF" />

            {/* Mata Kanan Baku JalanMin (22x24 rx=4 di x=110 y=68) */}
            <rect x="110" y="68" width="22" height="24" rx="4" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="3.5" />
            <rect x="116" y="73" width="11" height="13" rx="2" fill="#0A0A0A" />
            <circle cx="119" cy="76" r="1.5" fill="#FFFFFF" />
            <circle cx="122" cy="80" r="1.2" fill="#00F0FF" />

            {/* Pipi Pink Merona Baku (#FF5C8A) */}
            <rect x="64" y="93" width="12" height="7" rx="2" fill="#FF5C8A" />
            <rect x="124" y="93" width="12" height="7" rx="2" fill="#FF5C8A" />

            {/* Senyum Penerbang Gagah & Percaya Diri */}
            <path d="M 88,95 Q 100,105 112,94" stroke="#0A0A0A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <line x1="111" y1="92" x2="115" y2="96" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* SYAL SUTRA PUTIH BERKIBAR TERTIUP ANGIN KENCANG */}
          <g id="scarf">
            {/* Ekor Syal Melambai ke Kanan (Fluttering Scarf Tail) */}
            <g className="pilot-scarf">
              <path d="M 106,108 Q 130,98 152,106 Q 168,112 174,104 L 172,118 Q 150,124 128,116 Q 110,118 104,114 Z" fill="#0A0A0A" />
              <path d="M 102,104 Q 126,94 148,102 Q 164,108 170,100 L 168,114 Q 146,120 124,112 Q 106,114 100,110 Z" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="3" strokeLinejoin="round" />
              <path d="M 110,107 Q 132,101 152,107" stroke="#E2E8F0" strokeWidth="2" fill="none" />
              <line x1="162" y1="104" x2="166" y2="112" stroke="#0A0A0A" strokeWidth="2" />
            </g>
            {/* Ikatan Simpul Leher Putih */}
            <path d="M 82,104 C 82,101 114,101 114,104 L 116,113 C 110,116 86,116 80,113 Z" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="2.5" strokeLinejoin="round" />
            <circle cx="98" cy="109" r="4.5" fill="#F8FAFC" stroke="#0A0A0A" strokeWidth="2" />
          </g>

          {/* KOKPIT & BADAN MESIN PESAWAT (FUSELAGE FRONT-VIEW) */}
          <g id="fuselage">
            {/* Kaca Depan Kokpit Bening Aerodinamis (Windscreen) */}
            <path d="M 70,118 C 70,98 130,98 130,118 Z" fill="#E0F2FE" fillOpacity="0.6" stroke="#0A0A0A" strokeWidth="3.5" strokeLinejoin="round" />
            <path d="M 78,116 C 78,104 100,102 102,116" stroke="#FFFFFF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 114,116 C 114,108 122,106 124,116" stroke="#FFFFFF" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <rect x="68" y="118" width="64" height="4" rx="1" fill="#0A0A0A" />

            {/* Sarung Tangan Kulit Pilot di Bibir Kokpit */}
            <ellipse cx="68" cy="119" rx="6.5" ry="5.5" fill="#78350F" stroke="#0A0A0A" strokeWidth="2.5" />
            <ellipse cx="132" cy="119" rx="6.5" ry="5.5" fill="#78350F" stroke="#0A0A0A" strokeWidth="2.5" />

            {/* Badan Depan Pesawat / Engine Cowling Merah Karmin */}
            <path d="M 58,124 L 150,124 L 146,166 C 146,180 62,180 62,166 Z" fill="#0A0A0A" />
            <path d="M 54,120 L 146,120 L 142,162 C 142,176 58,176 58,162 Z" fill="#F43F5E" stroke="#0A0A0A" strokeWidth="4" strokeLinejoin="round" />

            {/* Striping Livery Balap CI/CD Neon Green & Putih */}
            <rect x="92" y="120" width="16" height="54" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="2.5" />
            <line x1="90" y1="120" x2="90" y2="173" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="110" y1="120" x2="110" y2="173" stroke="#FFFFFF" strokeWidth="1.5" />

            {/* Kisi Ventilasi Mesin (Cooling Louvers) */}
            <line x1="66" y1="136" x2="80" y2="136" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="68" y1="144" x2="80" y2="144" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="70" y1="152" x2="80" y2="152" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="120" y1="136" x2="134" y2="136" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="120" y1="144" x2="132" y2="144" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="120" y1="152" x2="130" y2="152" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />

            {/* Pipa Knalpot Mesin (Exhaust Pipes) */}
            <rect x="48" y="133" width="7" height="5" rx="1.5" fill="#475569" stroke="#0A0A0A" strokeWidth="2" />
            <rect x="48" y="142" width="7" height="5" rx="1.5" fill="#475569" stroke="#0A0A0A" strokeWidth="2" />
            <rect x="49" y="151" width="7" height="5" rx="1.5" fill="#475569" stroke="#0A0A0A" strokeWidth="2" />
            <rect x="145" y="133" width="7" height="5" rx="1.5" fill="#475569" stroke="#0A0A0A" strokeWidth="2" />
            <rect x="145" y="142" width="7" height="5" rx="1.5" fill="#475569" stroke="#0A0A0A" strokeWidth="2" />
            <rect x="144" y="151" width="7" height="5" rx="1.5" fill="#475569" stroke="#0A0A0A" strokeWidth="2" />
          </g>

          {/* SISTEM BALING-BALING DEPAN (FRONT PROPELLER & BLUR TRAILS) */}
          <g id="propeller-system">
            {/* Busur Angin Putaran Cepat (Propeller Blur Disk) */}
            <g className="pilot-blur">
              <circle cx="100" cy="148" r="44" stroke="#00F0FF" strokeWidth="2" strokeDasharray="14 10" fill="none" opacity="0.6" />
              <circle cx="100" cy="148" r="34" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="8 8" fill="none" opacity="0.5" />
              <circle cx="100" cy="148" r="46" stroke="#2EE59D" strokeWidth="1.2" strokeDasharray="5 15" fill="none" opacity="0.4" />
            </g>

            {/* 4 Bilah Baling-Baling Kayu Berputar dengan Tip Kuning Safety */}
            <g className="pilot-prop" id="propeller-blades">
              {/* Horizontal Blades */}
              <path d="M 100,143 C 78,139 58,141 52,148 C 58,155 78,157 100,153 Z" fill="#92400E" stroke="#0A0A0A" strokeWidth="2.5" />
              <path d="M 64,141.5 C 58,143 54,145 52,148 C 54,151 58,153 64,154.5 Z" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="1.8" />

              <path d="M 100,143 C 122,139 142,141 148,148 C 142,155 122,157 100,153 Z" fill="#92400E" stroke="#0A0A0A" strokeWidth="2.5" />
              <path d="M 136,141.5 C 142,143 146,145 148,148 C 146,151 142,153 136,154.5 Z" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="1.8" />

              {/* Vertical Blades */}
              <path d="M 95,148 C 91,126 93,106 100,100 C 107,106 109,126 105,148 Z" fill="#92400E" stroke="#0A0A0A" strokeWidth="2.5" />
              <path d="M 93.5,112 C 95,106 97,102 100,100 C 103,102 105,106 106.5,112 Z" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="1.8" />

              <path d="M 95,148 C 91,170 93,190 100,196 C 107,190 109,170 105,148 Z" fill="#92400E" stroke="#0A0A0A" strokeWidth="2.5" />
              <path d="M 93.5,184 C 95,190 97,194 100,196 C 103,194 105,190 106.5,184 Z" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="1.8" />
            </g>

            {/* Kerucut Hidung Tengah Logam Emas (Propeller Spinner Hub) */}
            <circle cx="102" cy="150" r="13" fill="#0A0A0A" />
            <circle cx="100" cy="148" r="13" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="3" />
            <circle cx="100" cy="148" r="8" fill="#F59E0B" stroke="#0A0A0A" strokeWidth="1.5" />
            <circle cx="96" cy="144" r="3" fill="#FFFFFF" />
          </g>
        </g>
      </svg>
    </div>
  );
}
