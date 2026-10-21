"use client";

import React from "react";

export interface SoftwareEngineerMascotProps {
  size?: number;
  className?: string;
  animated?: boolean;
  state?: "idle" | "hover" | "happy";
}

/**
 * Maskot Role: Software Engineer — "The Architect"
 * Identitas: Sang Arsitek Kode & Fondasi Sistem Digital
 * Ciri Khas: Kacamata arsitek persegi cyan, blueprint digital dengan skema server node,
 * pensil arsitek drafting, kubus fondasi modular 3D isometrik di sudut kiri, kubus modular 3D isometrik di sudut kanan atas,
 * dan helm konstruksi arsitek berstruktur ventilasi, visor brim ganda & emblem spotlight.
 */
export function SoftwareEngineerMascot({
  size = 200,
  className = "",
  animated = true,
  state = "idle",
}: SoftwareEngineerMascotProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none group ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Maskot Software Engineer — The Architect: Papan penunjuk jalan neo-brutalism dengan kacamata arsitek teknikal, cetak biru sistem, pensil drafting arsitek, dan sepasang kubus modular 3D isometrik"
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
            @keyframes se-float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-3px); }
            }
            @keyframes se-blueprint {
              0%, 100% { transform: rotate(-8deg); }
              50% { transform: rotate(-5deg) translateY(-2px); }
            }
            @keyframes se-cube {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-4px) rotate(3deg); }
            }
            @keyframes se-cube-right {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-3.5px) rotate(-3deg); }
            }
            @keyframes se-glint {
              0%, 100% { opacity: 0.8; }
              50% { opacity: 1; transform: scale(1.05); }
            }
            .se-animated-body {
              animation: ${animated ? "se-float 3.5s ease-in-out infinite" : "none"};
              transform-origin: center bottom;
            }
            .se-animated-blueprint {
              animation: ${animated ? "se-blueprint 3s ease-in-out infinite" : "none"};
              transform-origin: 36px 116px;
            }
            .se-animated-cube {
              animation: ${animated ? "se-cube 4s ease-in-out infinite" : "none"};
              transform-origin: 28px 42px;
            }
            .se-animated-cube-right {
              animation: ${animated ? "se-cube-right 4s ease-in-out 0.8s infinite" : "none"};
              transform-origin: 172px 42px;
            }
          `}</style>
        </defs>

        {/* CONTAINER UTAMA DENGAN ANIMASI FLOAT */}
        <g className="se-animated-body transition-transform duration-300 group-hover:scale-105">
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
          {/* Sol Sepatu Kiri */}
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
          {/* Sol Sepatu Kanan */}
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
          {/* LAYER 2: BADAN UTAMA PAPAN RAMBU (KUNING NEO-BRUTALISM)       */}
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

          {/* Badan Papan Rambu Kuning */}
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

          {/* Kerah Kemeja Putih & Dasi Arsitek Cyan */}
          <polygon
            points="78,144 94,144 88,132"
            fill="#FFFFFF"
            stroke="#0A0A0A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <polygon
            points="110,144 94,144 100,132"
            fill="#FFFFFF"
            stroke="#0A0A0A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Simpul Dasi */}
          <rect
            x="91"
            y="132"
            width="7"
            height="5"
            fill="#00F0FF"
            stroke="#0A0A0A"
            strokeWidth="2"
          />
          {/* Ujung Dasi Persegi Runcing */}
          <polygon
            points="91,137 98,137 100,145 94.5,148 89,145"
            fill="#00F0FF"
            stroke="#0A0A0A"
            strokeWidth="2"
          />

          {/* Mulut Senyum Bangga Arsitek */}
          <path
            d="M 88 114 Q 94.5 122 101 114"
            stroke="#0A0A0A"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* ============================================================== */}
          {/* LAYER 3: KACAMATA ARSITEK PERSEGI CYAN (#00F0FF)               */}
          {/* ============================================================== */}
          {/* Tangkai Frame Kacamata */}
          <line x1="42" y1="84" x2="54" y2="84" stroke="#0A0A0A" strokeWidth="4" />
          <line x1="134" y1="84" x2="148" y2="84" stroke="#0A0A0A" strokeWidth="4" />
          <line x1="84" y1="84" x2="98" y2="84" stroke="#0A0A0A" strokeWidth="4" />

          {/* Frame Lensa Kiri Persegi Tebal */}
          <rect
            x="54"
            y="72"
            width="30"
            height="26"
            rx="3"
            fill="#00F0FF"
            stroke="#0A0A0A"
            strokeWidth="3.5"
          />
          {/* Kaca Lensa Putih Kiri */}
          <rect
            x="61"
            y="77"
            width="16"
            height="16"
            rx="2"
            fill="#FFFFFF"
            stroke="#0A0A0A"
            strokeWidth="2.5"
          />
          {/* Pupil Hitam Kiri */}
          <rect x="66" y="81" width="7" height="9" rx="1.5" fill="#0A0A0A" />
          {/* Kilau Cahaya Pupil */}
          <circle cx="68.5" cy="83.5" r="1.5" fill="#FFFFFF" />
          {/* Garis Kilau Refleksi Kacamata Putih */}
          <line
            x1="57"
            y1="75"
            x2="65"
            y2="92"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Frame Lensa Kanan Persegi Tebal */}
          <rect
            x="98"
            y="72"
            width="30"
            height="26"
            rx="3"
            fill="#00F0FF"
            stroke="#0A0A0A"
            strokeWidth="3.5"
          />
          {/* Kaca Lensa Putih Kanan */}
          <rect
            x="105"
            y="77"
            width="16"
            height="16"
            rx="2"
            fill="#FFFFFF"
            stroke="#0A0A0A"
            strokeWidth="2.5"
          />
          {/* Pupil Hitam Kanan */}
          <rect x="110" y="81" width="7" height="9" rx="1.5" fill="#0A0A0A" />
          {/* Kilau Cahaya Pupil */}
          <circle cx="112.5" cy="83.5" r="1.5" fill="#FFFFFF" />
          {/* Garis Kilau Refleksi Kacamata Putih */}
          <line
            x1="101"
            y1="75"
            x2="109"
            y2="92"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* ============================================================== */}
          {/* LAYER 4: HELM KONSTRUKSI ARSITEK IMPROVED (#FF8A3D)            */}
          {/* ============================================================== */}
          {/* Hard Shadow Helm */}
          <path
            d="M 44 48 C 44 22 146 22 146 48 Z"
            fill="#0A0A0A"
          />
          {/* Kubah Helm Utama Oranye (#FF8A3D) */}
          <path
            d="M 44 44 C 44 18 144 18 144 44 Z"
            fill="#FF8A3D"
            stroke="#0A0A0A"
            strokeWidth="4"
          />

          {/* Ventilasi Alur Samping Kiri & Kanan (Detail Arsitektur Industri) */}
          <line x1="56" y1="36" x2="68" y2="36" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="120" y1="36" x2="132" y2="36" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="60" y1="30" x2="70" y2="30" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
          <line x1="118" y1="30" x2="128" y2="30" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />

          {/* Punggung Rusuk Penguat Tengah Helm (Double Ridge Berjenjang) */}
          <path
            d="M 88 19 C 88 17 100 17 100 19 L 102 44 L 86 44 Z"
            fill="#FFD60A"
            stroke="#0A0A0A"
            strokeWidth="2.5"
          />
          {/* Garis Kilau Refleksi Rusuk */}
          <line x1="91" y1="21" x2="91" y2="41" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />

          {/* Bibir/Brim Pelindung Helm Bawah Tebal Kokoh */}
          <rect
            x="32"
            y="41"
            width="124"
            height="11"
            rx="3"
            fill="#FFD60A"
            stroke="#0A0A0A"
            strokeWidth="4"
          />
          {/* Garis Aksen Bawah Visor Brim */}
          <line x1="36" y1="48" x2="152" y2="48" stroke="#0A0A0A" strokeWidth="1.5" />

          {/* Headlamp Mini / Emblem Arsitek Presisi */}
          <rect
            x="87"
            y="26"
            width="14"
            height="12"
            rx="2.5"
            fill="#00F0FF"
            stroke="#0A0A0A"
            strokeWidth="2.5"
          />
          {/* Lensa Spotlight Senter Helm */}
          <circle cx="94" cy="32" r="3" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="1.5" />
          <line x1="94" y1="23" x2="94" y2="26" stroke="#0A0A0A" strokeWidth="2" />

          {/* ============================================================== */}
          {/* LAYER 5: TANGAN KANAN & PENSIL TEKNIKAL DRAFTING               */}
          {/* ============================================================== */}
          {/* Lengan Kanan Menjulur */}
          <path
            d="M 148 108 Q 164 106 172 100"
            stroke="#0A0A0A"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />

          {/* Pensil Teknikal Arsitek Jumbo (Neo-Brutalism Drafting Pencil) */}
          <g transform="rotate(-15 172 96)">
            {/* Hard Shadow Pensil */}
            <rect x="171" y="55" width="8" height="66" rx="2" fill="#0A0A0A" />

            {/* Penghapus Pink di Pangkal Pensil */}
            <rect
              x="167"
              y="52"
              width="8"
              height="10"
              rx="2"
              fill="#FF5C8A"
              stroke="#0A0A0A"
              strokeWidth="2.5"
            />
            {/* Cincin Logam Ferrule Penjepit Penghapus */}
            <rect
              x="166.5"
              y="61"
              width="9"
              height="5"
              rx="1"
              fill="#FFFFFF"
              stroke="#0A0A0A"
              strokeWidth="2"
            />
            <line x1="168" y1="63.5" x2="174" y2="63.5" stroke="#0A0A0A" strokeWidth="1" />

            {/* Batang Kayu Pensil Hexagonal Oranye Arsitek (#FF8A3D) */}
            <rect
              x="167"
              y="66"
              width="8"
              height="38"
              fill="#FF8A3D"
              stroke="#0A0A0A"
              strokeWidth="2.5"
            />
            {/* Garis Alur Belah Hexagonal Pensil */}
            <line x1="171" y1="66" x2="171" y2="104" stroke="#FFD60A" strokeWidth="2" />

            {/* Bagian Rautan Kayu Kerucut (#FFE8A3) */}
            <polygon
              points="167,104 175,104 171,118"
              fill="#FFE8A3"
              stroke="#0A0A0A"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Ujung Mata Timbal / Grafit Pensil Hitam Arsitek */}
            <polygon
              points="169.5,113 172.5,113 171,118"
              fill="#0A0A0A"
            />
          </g>

          {/* Kepalan Tangan Kanan Mencengkeram Batang Pensil */}
          <circle
            cx="170"
            cy="100"
            r="7.5"
            fill="#FFD60A"
            stroke="#0A0A0A"
            strokeWidth="3.5"
          />

          {/* ============================================================== */}
          {/* LAYER 6: BLUEPRINT CETAK BIRU DIGITAL (TANGAN KIRI)            */}
          {/* ============================================================== */}
          <g className="se-animated-blueprint">
            {/* Lengan Kiri */}
            <path
              d="M 42 110 Q 28 114 36 122"
              stroke="#0A0A0A"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />

            {/* Hard Shadow Blueprint */}
            <rect
              x="12"
              y="74"
              width="44"
              height="58"
              rx="2.5"
              fill="#0A0A0A"
              transform="rotate(-8 34 103)"
            />
            {/* Kertas Blueprint Cyan Pekat (#05B6D4 / #00C4EE) */}
            <rect
              x="8"
              y="70"
              width="44"
              height="58"
              rx="2.5"
              fill="#05B6D4"
              stroke="#0A0A0A"
              strokeWidth="3.5"
              transform="rotate(-8 30 99)"
            />

            {/* Diagram Arsitektur di dalam Blueprint */}
            <g transform="rotate(-8 30 99)">
              {/* Header Tab Blueprint */}
              <rect x="12" y="74" width="36" height="6" fill="#0369A1" />
              <line x1="14" y1="77" x2="28" y2="77" stroke="#FFFFFF" strokeWidth="1.5" />

              {/* Node Server 1 (Atas - Microservice Gateway) */}
              <rect x="22" y="84" width="16" height="8" rx="1" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="1.5" />
              {/* Garis Bus Koneksi */}
              <line x1="30" y1="92" x2="30" y2="98" stroke="#FFFFFF" strokeWidth="2" />
              <line x1="18" y1="98" x2="42" y2="98" stroke="#FFFFFF" strokeWidth="1.5" />
              <line x1="18" y1="98" x2="18" y2="103" stroke="#FFFFFF" strokeWidth="1.5" />
              <line x1="42" y1="98" x2="42" y2="103" stroke="#FFFFFF" strokeWidth="1.5" />

              {/* Node Services 2 & 3 (Bawah) */}
              <rect x="12" y="103" width="12" height="7" rx="1" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="1.5" />
              <rect x="36" y="103" width="12" height="7" rx="1" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="1.5" />

              {/* Database Node (Silinder Bawah) */}
              <line x1="24" y1="110" x2="30" y2="114" stroke="#FFFFFF" strokeWidth="1.5" />
              <line x1="36" y1="110" x2="30" y2="114" stroke="#FFFFFF" strokeWidth="1.5" />
              <rect x="23" y="114" width="14" height="8" rx="2" fill="#FF5C8A" stroke="#0A0A0A" strokeWidth="1.5" />
            </g>

            {/* Kepalan Tangan Kiri Menjepit Lembar Blueprint */}
            <circle
              cx="38"
              cy="116"
              r="7.5"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="3.5"
            />
          </g>

          {/* ============================================================== */}
          {/* LAYER 7: KUBUS MODULAR 3D ISOMETRIK (MELAYANG DI SUDUT KIRI)    */}
          {/* ============================================================== */}
          <g className="se-animated-cube">
            {/* Hard Shadow Kubus */}
            <polygon
              points="20,52 30,47 30,59 20,64"
              fill="#0A0A0A"
            />
            {/* Kubus 3D Isometrik Layered Foundation */}
            {/* Sisi Atas Kubus (Top Face - Cyan) */}
            <polygon
              points="16,36 28,30 40,36 28,42"
              fill="#00F0FF"
              stroke="#0A0A0A"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Sisi Kiri Kubus (Left Face - Oranye) */}
            <polygon
              points="16,36 28,42 28,54 16,48"
              fill="#FF8A3D"
              stroke="#0A0A0A"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Sisi Kanan Kubus (Right Face - Pink) */}
            <polygon
              points="28,42 40,36 40,48 28,54"
              fill="#FF5C8A"
              stroke="#0A0A0A"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Titik Koneksi Simbol Fondasi Modular */}
            <circle cx="28" cy="36" r="2" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="1" />
          </g>

          {/* ============================================================== */}
          {/* LAYER 8: KUBUS MODULAR 3D ISOMETRIK (MELAYANG DI SUDUT KANAN)   */}
          {/* ============================================================== */}
          <g className="se-animated-cube-right">
            {/* Hard Shadow Kubus Kanan */}
            <polygon
              points="164,52 174,47 174,59 164,64"
              fill="#0A0A0A"
            />
            {/* Kubus 3D Isometrik Sisi Kanan Atas */}
            {/* Sisi Atas Kubus (Top Face - Mint Neon) */}
            <polygon
              points="160,36 172,30 184,36 172,42"
              fill="#2EE59D"
              stroke="#0A0A0A"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Sisi Kiri Kubus (Left Face - Cyan) */}
            <polygon
              points="160,36 172,42 172,54 160,48"
              fill="#00F0FF"
              stroke="#0A0A0A"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Sisi Kanan Kubus (Right Face - Oranye) */}
            <polygon
              points="172,42 184,36 184,48 172,54"
              fill="#FF8A3D"
              stroke="#0A0A0A"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Titik Koneksi Fondasi Modular */}
            <circle cx="172" cy="36" r="2" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="1" />
          </g>
        </g>
      </svg>
    </div>
  );
}
