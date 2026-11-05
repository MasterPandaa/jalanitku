"use client";

import React from "react";

export interface QualityAssuranceMascotProps {
  size?: number | string;
  className?: string;
  animated?: boolean;
  animate?: boolean;
  state?: "idle" | "hover" | "happy";
}

/**
 * Maskot Role: Quality Assurance — "The Bug Hunter"
 * Identitas: Sang Pemburu Cacat Kode & Penjaga Standar Keandalan
 * Karakter: Penasaran, detail, perfeksionis, fokus tajam.
 * Ciri Khas: 
 * - Ekspresi simetris tajam perfeksionis: sepasang mata kotak jernih tanpa kacamata di kiri dan kanan,
 *   alis simetris menukik tajam fokus pemburu bug, serta senyum smirk percaya diri di atas baju.
 * - Kantong tas samping lapangan ganda (field pouches) dari kulit cokelat di kiri dan kanan pinggul di belakang karakter (Layer 0).
 * - Baju Safari Bug Hunter oranye (#FF8A3D) bersih berkerah lapel rendah, saku dada ganda, sabuk utility, dan tanpa tali selempang depan.
 * - Topi safari hunter oranye dengan lampu senter status PASS hijau neon.
 * - Tangan kiri memegang jaring serangga digital, tangan kanan menggenggam toples kaca berisi kepik siber.
 */
export function QualityAssuranceMascot({
  size = 200,
  className = "",
  animated = true,
  animate,
  state = "idle",
}: QualityAssuranceMascotProps) {
  const isAnimated = animate !== undefined ? animate : animated;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none group ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Maskot Quality Assurance — The Bug Hunter: Papan penunjuk jalan neo-brutalism kuning dengan sepasang kantong tas lapangan kulit di belakang pinggul kiri dan kanan, mata dan alis simetris tajam perfeksionis tanpa kaca mata, baju safari saku kargo ganda, topi safari senter PASS, jaring serangga digital, toples kaca bug, dan lalat siber"
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
            @keyframes qa-float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-3.5px); }
            }
            @keyframes qa-net-swing {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(-5deg) translateY(-1px); }
            }
            @keyframes qa-jar-sway {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(3deg) translateY(-1.5px); }
            }
            @keyframes qa-bug-trap-flutter {
              0%, 100% { transform: translate(0, 0) rotate(0deg); }
              25% { transform: translate(1px, -2px) rotate(6deg); }
              50% { transform: translate(-1px, 1px) rotate(-5deg); }
              75% { transform: translate(1.5px, 0.5px) rotate(4deg); }
            }
            @keyframes qa-fly-1 {
              0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
              20% { transform: translate(-4px, -6px) rotate(-15deg); }
              40% { transform: translate(6px, -10px) rotate(20deg); }
              60% { transform: translate(-2px, -4px) rotate(-8deg); }
              75% { transform: translate(4px, 2px) rotate(12deg); }
            }
            @keyframes qa-fly-2 {
              0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
              25% { transform: translate(7px, -4px) rotate(18deg); }
              50% { transform: translate(2px, -9px) rotate(-12deg); }
              75% { transform: translate(-5px, -3px) rotate(10deg); }
            }
            @keyframes qa-fly-3 {
              0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
              30% { transform: translate(-6px, 5px) rotate(-22deg); }
              60% { transform: translate(5px, -7px) rotate(16deg); }
              90% { transform: translate(-3px, -2px) rotate(-10deg); }
            }
            @keyframes qa-beam-pulse {
              0%, 100% { opacity: 0.25; }
              50% { opacity: 0.45; }
            }
            .qa-animated-body {
              animation: ${isAnimated ? "qa-float 3.5s ease-in-out infinite" : "none"};
              transform-origin: center bottom;
            }
            .qa-animated-net {
              animation: ${isAnimated ? "qa-net-swing 2.8s ease-in-out infinite" : "none"};
              transform-origin: 18px 126px;
            }
            .qa-animated-jar {
              animation: ${isAnimated ? "qa-jar-sway 3.2s ease-in-out infinite" : "none"};
              transform-origin: 168px 116px;
            }
            .qa-animated-trapped-bug {
              animation: ${isAnimated ? "qa-bug-trap-flutter 1.1s ease-in-out infinite" : "none"};
              transform-origin: 173px 92px;
            }
            .qa-fly-1-anim {
              animation: ${isAnimated ? "qa-fly-1 2.2s ease-in-out infinite" : "none"};
              transform-origin: 32px 42px;
            }
            .qa-fly-2-anim {
              animation: ${isAnimated ? "qa-fly-2 2.6s ease-in-out infinite" : "none"};
              transform-origin: 172px 40px;
            }
            .qa-fly-3-anim {
              animation: ${isAnimated ? "qa-fly-3 1.9s ease-in-out infinite" : "none"};
              transform-origin: 182px 138px;
            }
            .qa-animated-beam {
              animation: ${isAnimated ? "qa-beam-pulse 2s ease-in-out infinite" : "none"};
            }
          `}</style>
        </defs>

        {/* CONTAINER UTAMA DENGAN ANIMASI FLOAT */}
        <g className="qa-animated-body transition-transform duration-300 group-hover:scale-105">
          {/* ============================================================== */}
          {/* LAYER 0: SEPASANG KANTONG TAS LAPANGAN DI KIRI & KANAN         */}
          {/*          (DIPOSISIKAN DI BELAKANG KARAKTER / PINGGUL)          */}
          {/* ============================================================== */}
          <g id="qa-field-pouches-bg">
            {/* Kantong Tas Samping Kiri (POV User Kiri, Mengintip di Pinggul Kiri x=24..46, y=130..153) */}
            <g id="qa-pouch-left">
              <rect x="27" y="133" width="22" height="23" rx="3.5" fill="#0A0A0A" />
              <rect
                x="24"
                y="130"
                width="22"
                height="23"
                rx="3.5"
                fill="#8B4513"
                stroke="#0A0A0A"
                strokeWidth="3"
              />
              <line
                x1="26"
                y1="133"
                x2="42"
                y2="133"
                stroke="#5C2605"
                strokeWidth="0.8"
                strokeDasharray="1.5 1"
              />
              <line
                x1="26"
                y1="150"
                x2="42"
                y2="150"
                stroke="#5C2605"
                strokeWidth="0.8"
                strokeDasharray="1.5 1"
              />
              <path
                d="M 24 130 L 45 130 L 44 140 L 35 143 L 25 140 Z"
                fill="#A0522D"
                stroke="#0A0A0A"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <rect
                x="32"
                y="136"
                width="3"
                height="14"
                fill="#78350F"
                stroke="#0A0A0A"
                strokeWidth="1"
              />
              <rect
                x="30.7"
                y="139.5"
                width="5.6"
                height="5.6"
                rx="1.2"
                fill="#FFD60A"
                stroke="#0A0A0A"
                strokeWidth="1.3"
              />
              <rect x="32" y="141" width="3" height="2.6" fill="#78350F" />
              <line
                x1="33.5"
                y1="139.5"
                x2="33.5"
                y2="145"
                stroke="#0A0A0A"
                strokeWidth="1.2"
              />
              <path
                d="M 24 136 L 21 137 L 21 146 L 24 147 Z"
                fill="#78350F"
                stroke="#0A0A0A"
                strokeWidth="1.5"
              />
              <rect
                x="21.5"
                y="134"
                width="1.8"
                height="3"
                rx="0.5"
                fill="#00F0FF"
                stroke="#0A0A0A"
                strokeWidth="0.8"
              />
            </g>

            {/* Kantong Tas Samping Kanan (POV User Kanan, Mengintip di Pinggul Kanan x=144..166, y=130..153) */}
            <g id="qa-pouch-right">
              <rect x="147" y="133" width="22" height="23" rx="3.5" fill="#0A0A0A" />
              <rect
                x="144"
                y="130"
                width="22"
                height="23"
                rx="3.5"
                fill="#8B4513"
                stroke="#0A0A0A"
                strokeWidth="3"
              />
              <line
                x1="146"
                y1="133"
                x2="164"
                y2="133"
                stroke="#5C2605"
                strokeWidth="0.8"
                strokeDasharray="1.5 1"
              />
              <line
                x1="146"
                y1="150"
                x2="164"
                y2="150"
                stroke="#5C2605"
                strokeWidth="0.8"
                strokeDasharray="1.5 1"
              />
              <path
                d="M 145 130 L 166 130 L 165 140 L 155 143 L 146 140 Z"
                fill="#A0522D"
                stroke="#0A0A0A"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <rect
                x="153.5"
                y="136"
                width="3"
                height="14"
                fill="#78350F"
                stroke="#0A0A0A"
                strokeWidth="1"
              />
              <rect
                x="152.2"
                y="139.5"
                width="5.6"
                height="5.6"
                rx="1.2"
                fill="#FFD60A"
                stroke="#0A0A0A"
                strokeWidth="1.3"
              />
              <rect x="153.5" y="141" width="3" height="2.6" fill="#78350F" />
              <line
                x1="155"
                y1="139.5"
                x2="155"
                y2="145"
                stroke="#0A0A0A"
                strokeWidth="1.2"
              />
              <path
                d="M 166 136 L 169 137 L 169 146 L 166 147 Z"
                fill="#78350F"
                stroke="#0A0A0A"
                strokeWidth="1.5"
              />
              <rect
                x="167"
                y="134"
                width="1.8"
                height="3"
                rx="0.5"
                fill="#2EE59D"
                stroke="#0A0A0A"
                strokeWidth="0.8"
              />
            </g>
          </g>

          {/* ============================================================== */}
          {/* LAYER 1: KAKI & SEPATU HITAM DENGAN SOL PUTIH                  */}
          {/* ============================================================== */}
          <rect x="68" y="154" width="22" height="24" fill="#0A0A0A" />
          <rect x="114" y="154" width="22" height="24" fill="#0A0A0A" />

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
          <line
            x1="64"
            y1="170"
            x2="86"
            y2="170"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="square"
          />

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
          <rect x="52" y="103" width="12" height="6" rx="2" fill="#FF5C8A" />
          <rect x="124" y="103" width="12" height="6" rx="2" fill="#FF5C8A" />

          {/* ============================================================== */}
          {/* LAYER 3: MATA & EKSPRESI PENASARAN, KRITIS, PERFEKSIONIS       */}
          {/*          (SIMETRIS & TANPA KACA MATA)                          */}
          {/* ============================================================== */}
          {/* Mata Kiri: Simetris Tajam, Fokus Kritis (Tanpa Kaca) */}
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
          <rect x="64" y="81" width="11" height="13" rx="2" fill="#0A0A0A" />
          <circle cx="67" cy="84" r="1.5" fill="#FFFFFF" />
          <circle cx="70" cy="88" r="1.2" fill="#2EE59D" />

          {/* Mata Kanan: Simetris Tajam dengan Kiri (Tanpa Kaca) */}
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
          <rect x="108" y="81" width="11" height="13" rx="2" fill="#0A0A0A" />
          <circle cx="111" cy="84" r="1.5" fill="#FFFFFF" />
          <circle cx="114" cy="88" r="1.2" fill="#2EE59D" />

          {/* Alis Kiri: Menukik Tajam Fokus Bug Hunter */}
          <path
            d="M 58 71 L 78 73"
            stroke="#0A0A0A"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Alis Kanan: Menukik Tajam Simetris Fokus Bug Hunter */}
          <path
            d="M 102 73 L 122 71"
            stroke="#0A0A0A"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Mulut: Seringai Smirk Percaya Diri di y=107-115 */}
          <g>
            <path
              d="M 86 112 Q 94 114 105 107"
              stroke="#0A0A0A"
              strokeWidth="3.8"
              strokeLinecap="round"
              fill="none"
            />
            <path d="M 103 105 L 107 109" stroke="#0A0A0A" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M 91 113 Q 95 117 99 113" stroke="#0A0A0A" strokeWidth="2" fill="#FF5C8A" />
          </g>

          {/* ============================================================== */}
          {/* LAYER 4: BAJU SAFARI BUG HUNTER, SAKU DADA GANDA & SABUK       */}
          {/* ============================================================== */}
          <path
            d="M 42 125 L 89 125 L 89 140 L 42 140 Z"
            fill="#FF8A3D"
            stroke="#0A0A0A"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M 99 125 L 148 125 L 148 140 L 99 140 Z"
            fill="#FF8A3D"
            stroke="#0A0A0A"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Resleting Tengah */}
          <rect x="89" y="125" width="10" height="15" fill="#EA580C" stroke="#0A0A0A" strokeWidth="1.8" />
          <line
            x1="94"
            y1="125"
            x2="94"
            y2="140"
            stroke="#FFD60A"
            strokeWidth="1.5"
            strokeDasharray="2 1.5"
          />

          {/* Kerah Lapel Rendah (Mulai dari y=124, tidak menutupi mulut di y=107-115) */}
          <polygon
            points="72,129 90,129 82,122 68,125"
            fill="#C2410C"
            stroke="#0A0A0A"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <polygon
            points="116,129 98,129 106,122 120,125"
            fill="#C2410C"
            stroke="#0A0A0A"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          {/* Pangkat Pundak */}
          <polygon points="42,123 54,123 52,127 42,127" fill="#C2410C" stroke="#0A0A0A" strokeWidth="1.5" />
          <circle cx="45" cy="125" r="1.1" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="0.8" />
          <polygon points="136,123 148,123 148,127 138,127" fill="#C2410C" stroke="#0A0A0A" strokeWidth="1.5" />
          <circle cx="145" cy="125" r="1.1" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="0.8" />

          {/* Saku Dada Kiri */}
          <rect
            x="47"
            y="128"
            width="17"
            height="9"
            rx="1.5"
            fill="#EA580C"
            stroke="#0A0A0A"
            strokeWidth="1.8"
          />
          <polygon
            points="46,128 65,128 63,130.5 55.5,131.5 48,130.5"
            fill="#C2410C"
            stroke="#0A0A0A"
            strokeWidth="1.2"
          />
          <circle cx="55.5" cy="130" r="1" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="0.7" />

          {/* Saku Dada Kanan */}
          <rect
            x="124"
            y="128"
            width="17"
            height="9"
            rx="1.5"
            fill="#EA580C"
            stroke="#0A0A0A"
            strokeWidth="1.8"
          />
          <polygon
            points="123,128 142,128 140,130.5 132.5,131.5 125,130.5"
            fill="#C2410C"
            stroke="#0A0A0A"
            strokeWidth="1.2"
          />
          <circle cx="132.5" cy="130" r="1" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="0.7" />

          {/* Sabuk Utility Lapangan di Pinggang */}
          <rect
            x="42"
            y="139"
            width="106"
            height="7"
            fill="#78350F"
            stroke="#0A0A0A"
            strokeWidth="2.5"
          />
          <line x1="42" y1="140.5" x2="148" y2="140.5" stroke="#9A3412" strokeWidth="0.8" />
          <line x1="42" y1="144.5" x2="148" y2="144.5" stroke="#9A3412" strokeWidth="0.8" />

          {/* Gesper Logam Emas Utility Belt di Tengah */}
          <rect
            x="87"
            y="137.5"
            width="14"
            height="10"
            rx="2"
            fill="#FFD60A"
            stroke="#0A0A0A"
            strokeWidth="2"
          />
          <rect
            x="90.5"
            y="140"
            width="7"
            height="5"
            rx="1"
            fill="#78350F"
            stroke="#0A0A0A"
            strokeWidth="1.2"
          />
          <line x1="94" y1="139.5" x2="94" y2="145.5" stroke="#FFD60A" strokeWidth="1.5" />

          {/* ============================================================== */}
          {/* LAYER 5: TOPI SAFARI HUNTER ORANYE DENGAN SENTER PASS          */}
          {/* ============================================================== */}
          <path d="M 38 48 C 38 24 152 24 152 48 Z" fill="#0A0A0A" />
          <path
            d="M 50 42 C 50 18 140 18 140 42 Z"
            fill="#FF8A3D"
            stroke="#0A0A0A"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M 30 48 L 160 48 L 148 40 L 42 40 Z"
            fill="#FF8A3D"
            stroke="#0A0A0A"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <rect x="50" y="34" width="90" height="7" fill="#8B4513" stroke="#0A0A0A" strokeWidth="2" />
          <rect
            x="64"
            y="33"
            width="8"
            height="9"
            rx="1.5"
            fill="#FFD60A"
            stroke="#0A0A0A"
            strokeWidth="1.5"
          />

          <rect x="88" y="16" width="16" height="15" rx="3" fill="#0A0A0A" />
          <rect
            x="86"
            y="14"
            width="16"
            height="15"
            rx="3"
            fill="#2EE59D"
            stroke="#0A0A0A"
            strokeWidth="2.5"
          />
          <circle cx="94" cy="21.5" r="4.5" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="1.5" />
          <path
            d="M 91.5 21.5 L 93.5 23.5 L 97 19.5"
            stroke="#0A0A0A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <polygon
            className="qa-animated-beam"
            points="86,29 64,54 124,54 102,29"
            fill="#2EE59D"
            fillOpacity="0.25"
          />

          {/* ============================================================== */}
          {/* LAYER 6: TANGAN KIRI & JARING SERANGGA DIGITAL (BUG NET)       */}
          {/* ============================================================== */}
          <g className="qa-animated-net">
            <line
              x1="18"
              y1="126"
              x2="10"
              y2="46"
              stroke="#8B4513"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <line
              x1="18"
              y1="126"
              x2="10"
              y2="46"
              stroke="#0A0A0A"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="4 8"
            />

            <path
              d="M 4 48 C -6 76 12 86 24 76 C 30 64 26 44 22 42"
              fill="#00F0FF"
              fillOpacity="0.2"
              stroke="#0A0A0A"
              strokeWidth="2.5"
            />
            <line x1="4" y1="56" x2="22" y2="54" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="2 2" />
            <line x1="4" y1="64" x2="22" y2="62" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="2 2" />
            <line x1="8" y1="72" x2="18" y2="70" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="2 2" />
            <line x1="8" y1="46" x2="10" y2="76" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="2 2" />
            <line x1="16" y1="44" x2="18" y2="72" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="2 2" />

            <ellipse
              cx="13"
              cy="45"
              rx="13"
              ry="17"
              fill="none"
              stroke="#0A0A0A"
              strokeWidth="3.5"
              transform="rotate(-15 13 45)"
            />

            <path
              d="M 42 110 Q 28 116 18 126"
              stroke="#0A0A0A"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            <circle
              cx="18"
              cy="126"
              r="6.5"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="3.5"
            />
          </g>

          {/* ============================================================== */}
          {/* LAYER 7: TANGAN KANAN MENGGENGGAM TOPLES KACA SPESIMEN BUG     */}
          {/* ============================================================== */}
          <g className="qa-animated-jar">
            <path
              d="M 148 108 Q 160 114 168 114"
              stroke="#0A0A0A"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />

            {/* Hard Shadow Toples */}
            <rect x="163" y="70" width="23" height="38" rx="3.5" fill="#0A0A0A" />

            {/* Badan Toples Kaca Transparan */}
            <rect
              x="160"
              y="67"
              width="23"
              height="38"
              rx="3.5"
              fill="#00F0FF"
              fillOpacity="0.22"
              stroke="#0A0A0A"
              strokeWidth="2.8"
            />

            {/* Leher Toples */}
            <rect
              x="163"
              y="62"
              width="17"
              height="6"
              rx="1"
              fill="#00F0FF"
              fillOpacity="0.3"
              stroke="#0A0A0A"
              strokeWidth="1.8"
            />

            {/* Tutup Toples Berulir Logam Oranye */}
            <rect
              x="161"
              y="56"
              width="21"
              height="8"
              rx="2"
              fill="#FF8A3D"
              stroke="#0A0A0A"
              strokeWidth="2.2"
            />
            <line x1="163" y1="59" x2="180" y2="59" stroke="#0A0A0A" strokeWidth="1.2" />
            <line x1="163" y1="62" x2="180" y2="62" stroke="#0A0A0A" strokeWidth="1.2" />

            {/* Garis Kilau Reflektif Kaca Putih */}
            <line
              x1="163"
              y1="71"
              x2="163"
              y2="99"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeOpacity="0.8"
            />
            <line
              x1="166"
              y1="73"
              x2="166"
              y2="83"
              stroke="#FFFFFF"
              strokeWidth="1"
              strokeLinecap="round"
              strokeOpacity="0.6"
            />

            {/* Label Neo-Brutalist "BUG#1" */}
            <rect
              x="164"
              y="74"
              width="15"
              height="6.5"
              rx="1"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="1"
            />
            <text
              x="171.5"
              y="79"
              fill="#0A0A0A"
              fontSize="4"
              fontWeight="900"
              textAnchor="middle"
              fontFamily="monospace"
            >
              BUG#1
            </text>

            {/* ROBOT BUG KEPIK MERAH TERKURUNG DI DALAM TOPLES KACA */}
            <g className="qa-animated-trapped-bug">
              <ellipse cx="173" cy="92" rx="5" ry="4" fill="#0A0A0A" />
              <ellipse
                cx="171.5"
                cy="90.5"
                rx="4.8"
                ry="3.8"
                fill="#FF5C8A"
                stroke="#0A0A0A"
                strokeWidth="1.5"
              />
              <line x1="167" y1="90.5" x2="176" y2="90.5" stroke="#0A0A0A" strokeWidth="1.2" />
              <circle cx="170" cy="89" r="0.8" fill="#0A0A0A" />
              <circle cx="173" cy="89" r="0.8" fill="#0A0A0A" />
              <circle cx="170" cy="92" r="0.8" fill="#0A0A0A" />
              <circle cx="173" cy="92" r="0.8" fill="#0A0A0A" />
              <circle cx="167" cy="90.5" r="2" fill="#0A0A0A" />
              <path d="M 165.5 89 Q 164 87 163 87.5" stroke="#0A0A0A" strokeWidth="0.9" fill="none" />
              <path d="M 165.5 92 Q 164 94 163 93.5" stroke="#0A0A0A" strokeWidth="0.9" fill="none" />
              <line x1="169" y1="87" x2="167.5" y2="85.5" stroke="#0A0A0A" strokeWidth="0.9" />
              <line x1="172" y1="87" x2="172" y2="85" stroke="#0A0A0A" strokeWidth="0.9" />
              <line x1="174" y1="87" x2="175.5" y2="85.5" stroke="#0A0A0A" strokeWidth="0.9" />
              <line x1="169" y1="94" x2="167.5" y2="95.5" stroke="#0A0A0A" strokeWidth="0.9" />
              <line x1="172" y1="94" x2="172" y2="96" stroke="#0A0A0A" strokeWidth="0.9" />
              <line x1="174" y1="94" x2="175.5" y2="95.5" stroke="#0A0A0A" strokeWidth="0.9" />
              <path d="M 166 89.5 L 167.5 91 M 167.5 89.5 L 166 91" stroke="#FFFFFF" strokeWidth="0.8" />
            </g>

            {/* Gelembung Mikro */}
            <circle cx="165" cy="95" r="0.9" fill="#00F0FF" />
            <circle cx="178" cy="97" r="1" fill="#00F0FF" />

            {/* TANGAN KANAN MENGGENGGAM TOPLES */}
            <circle
              cx="164"
              cy="104"
              r="7"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="3.5"
            />
            <rect
              x="167"
              y="97"
              width="10"
              height="4.5"
              rx="2.2"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="2"
            />
            <rect
              x="167"
              y="102"
              width="11"
              height="4.5"
              rx="2.2"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="2"
            />
            <rect
              x="166"
              y="107"
              width="10"
              height="4.5"
              rx="2.2"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="2"
            />
            <ellipse
              cx="162"
              cy="100"
              rx="3.5"
              ry="4.5"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="2"
              transform="rotate(-15 162 100)"
            />
          </g>

          {/* ============================================================== */}
          {/* LAYER 8: LALAT / CYBER BUGS BERTERBANGAN                       */}
          {/* ============================================================== */}
          <g className="qa-fly-1-anim">
            <ellipse cx="30" cy="40" rx="3.5" ry="1.8" fill="#00F0FF" fillOpacity="0.7" stroke="#0A0A0A" strokeWidth="0.8" transform="rotate(-35 30 40)" />
            <ellipse cx="34" cy="40" rx="3.5" ry="1.8" fill="#00F0FF" fillOpacity="0.7" stroke="#0A0A0A" strokeWidth="0.8" transform="rotate(35 34 40)" />
            <ellipse cx="32" cy="42" rx="2.2" ry="1.6" fill="#0A0A0A" />
            <circle cx="31" cy="41.5" r="0.6" fill="#FF5C8A" />
            <circle cx="33" cy="41.5" r="0.6" fill="#FF5C8A" />
            <path d="M 24 47 Q 28 45 32 42" stroke="#0A0A0A" strokeWidth="0.8" strokeDasharray="1.5 1.5" fill="none" opacity="0.6" />
          </g>

          <g className="qa-fly-2-anim">
            <ellipse cx="170" cy="38" rx="3.8" ry="1.8" fill="#2EE59D" fillOpacity="0.7" stroke="#0A0A0A" strokeWidth="0.8" transform="rotate(-25 170 38)" />
            <ellipse cx="175" cy="38" rx="3.8" ry="1.8" fill="#2EE59D" fillOpacity="0.7" stroke="#0A0A0A" strokeWidth="0.8" transform="rotate(25 175 38)" />
            <ellipse cx="172.5" cy="40" rx="2.4" ry="1.7" fill="#0A0A0A" />
            <circle cx="171.5" cy="39.5" r="0.6" fill="#FFD60A" />
            <circle cx="173.5" cy="39.5" r="0.6" fill="#FFD60A" />
            <path d="M 164 45 Q 168 41 172.5 40" stroke="#0A0A0A" strokeWidth="0.8" strokeDasharray="1.5 1.5" fill="none" opacity="0.6" />
          </g>

          <g className="qa-fly-3-anim">
            <ellipse cx="180" cy="136" rx="3.2" ry="1.6" fill="#00F0FF" fillOpacity="0.7" stroke="#0A0A0A" strokeWidth="0.8" transform="rotate(-40 180 136)" />
            <ellipse cx="184" cy="136" rx="3.2" ry="1.6" fill="#00F0FF" fillOpacity="0.7" stroke="#0A0A0A" strokeWidth="0.8" transform="rotate(40 184 136)" />
            <ellipse cx="182" cy="138" rx="2" ry="1.5" fill="#0A0A0A" />
            <circle cx="181.2" cy="137.5" r="0.5" fill="#FF5C8A" />
            <circle cx="182.8" cy="137.5" r="0.5" fill="#FF5C8A" />
            <path d="M 174 142 Q 178 141 182 138" stroke="#0A0A0A" strokeWidth="0.8" strokeDasharray="1.5 1.5" fill="none" opacity="0.6" />
          </g>
        </g>
      </svg>
    </div>
  );
}
