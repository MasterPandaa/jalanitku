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
 * Maskot Role: IT Support — "The Doctor" (The System Doctor / Medic)
 * Identitas: Sang Dokter IT / Sistem Medic Penyelamat Operasional
 * Ciri Khas: Cermin kepala medis (head mirror) dokter dengan tali kepala tebal kokoh, jas lab dokter putih
 * kotak proporsional melintang ke samping kanan dan kiri karakter di bawah mulut (y=125 sampai y=144,
 * memberi ruang lega bagi senyum mulut di y=114), nametag identitas rumah sakit IT di saku dada (tanpa teks nama),
 * kotak P3K IT medis di tangan kiri dengan lambang palang merah medis darurat (#FF3B30), tangan kanan
 * memegang suntikan USB siber tanpa kabel, serta partikel tanda palang "+" medis (mint & cyan) melayang
 * naik ke atas berkilauan persis seperti efek HEAL di video game.
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
      aria-label="Maskot IT Support — The Doctor: Papan penunjuk jalan neo-brutalism kuning dengan jas dokter putih kotak proporsional di bawah mulut, cermin dahi tebal, kotak P3K palang merah, suntikan USB tanpa kabel, dan partikel palang plus melayang naik efek heal game"
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
            @keyframes its-heal-float-1 {
              0% { transform: translateY(10px) scale(0.6); opacity: 0; }
              30% { transform: translateY(0px) scale(1.1); opacity: 0.95; }
              70% { transform: translateY(-14px) scale(1); opacity: 0.8; }
              100% { transform: translateY(-28px) scale(0.7); opacity: 0; }
            }
            @keyframes its-heal-float-2 {
              0% { transform: translateY(12px) scale(0.5); opacity: 0; }
              35% { transform: translateY(0px) scale(1.15); opacity: 1; }
              75% { transform: translateY(-16px) scale(0.95); opacity: 0.75; }
              100% { transform: translateY(-32px) scale(0.65); opacity: 0; }
            }
            @keyframes its-heal-float-3 {
              0% { transform: translateY(8px) scale(0.6); opacity: 0; }
              40% { transform: translateY(-2px) scale(1.2); opacity: 1; }
              80% { transform: translateY(-18px) scale(0.9); opacity: 0.7; }
              100% { transform: translateY(-30px) scale(0.6); opacity: 0; }
            }
            @keyframes its-sparkle {
              0%, 100% { transform: scale(1); opacity: 0.8; }
              50% { transform: scale(1.25); opacity: 1; }
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
            .its-heal-cross-1 {
              animation: ${isAnimated ? "its-heal-float-1 2.4s ease-out infinite" : "none"};
              transform-origin: 32px 60px;
            }
            .its-heal-cross-2 {
              animation: ${isAnimated ? "its-heal-float-2 2.7s ease-out 0.6s infinite" : "none"};
              transform-origin: 168px 70px;
            }
            .its-heal-cross-3 {
              animation: ${isAnimated ? "its-heal-float-3 2.2s ease-out 1.1s infinite" : "none"};
              transform-origin: 94px 50px;
            }
            .its-heal-cross-4 {
              animation: ${isAnimated ? "its-heal-float-1 2.5s ease-out 1.5s infinite" : "none"};
              transform-origin: 154px 110px;
            }
            .its-heal-cross-5 {
              animation: ${isAnimated ? "its-heal-float-2 2.3s ease-out 0.9s infinite" : "none"};
              transform-origin: 28px 115px;
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

          {/* Mulut Senyum Hangat Ramah (y=114 - Bersih Tanpa Tertutup Baju) */}
          <path
            d="M 87 114 Q 94 123 102 114"
            stroke="#0A0A0A"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* ============================================================== */}
          {/* LAYER 4: JAS LAB DOKTER PUTIH KOTAK (POSISI PROPORSIONAL y=125)*/}
          {/* ============================================================== */}
          {/* Bodi Jas Lab Putih Kotak Melintang dari Kiri (42) ke Kanan (148) Dimulai di y=125 (Di Bawah Mulut) */}
          <path
            d="M 42 125 L 148 125 L 148 144 L 42 144 Z"
            fill="#FFFFFF"
            stroke="#0A0A0A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Kerah Lapel V-Neck Jas Dokter Putih yang Rapi dan Proporsional */}
          <polygon
            points="68,144 94,144 82,125"
            fill="#F4F4F5"
            stroke="#0A0A0A"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <polygon
            points="120,144 94,144 106,125"
            fill="#F4F4F5"
            stroke="#0A0A0A"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          {/* Garis Tengah Lipatan Jas & Kancing Dokter Cyan */}
          <line x1="94" y1="125" x2="94" y2="144" stroke="#0A0A0A" strokeWidth="2.2" />
          <circle cx="94" cy="131" r="1.6" fill="#00F0FF" stroke="#0A0A0A" strokeWidth="1" />
          <circle cx="94" cy="138" r="1.6" fill="#00F0FF" stroke="#0A0A0A" strokeWidth="1" />

          {/* Saku Samping Kiri Jas Dokter */}
          <rect
            x="46"
            y="129"
            width="17"
            height="12"
            rx="1.5"
            fill="#FFFFFF"
            stroke="#0A0A0A"
            strokeWidth="1.8"
          />
          <line x1="46" y1="129" x2="63" y2="129" stroke="#00F0FF" strokeWidth="1.8" />

          {/* Saku Dada Kanan Jas Dokter & Nametag ID (Tanpa Teks Nama) */}
          <rect
            x="117"
            y="127"
            width="23"
            height="14"
            rx="2"
            fill="#FFFFFF"
            stroke="#0A0A0A"
            strokeWidth="1.8"
          />
          <line x1="117" y1="127" x2="140" y2="127" stroke="#00F0FF" strokeWidth="1.8" />

          {/* Kartu Nametag ID Rumah Sakit IT */}
          <rect x="122.5" y="129.5" width="13" height="8.5" rx="1.2" fill="#0A0A0A" />
          <rect
            x="121.5"
            y="128.5"
            width="13"
            height="8.5"
            rx="1.2"
            fill="#FFFFFF"
            stroke="#0A0A0A"
            strokeWidth="1.2"
          />
          {/* Header Cyan Nametag */}
          <rect x="121.5" y="128.5" width="13" height="2.2" fill="#00F0FF" />
          {/* Avatar Kotak Mini Foto ID */}
          <rect x="123" y="131.7" width="2.8" height="3.5" rx="0.4" fill="#0A0A0A" />
          {/* Garis-Garis Identitas Barcode (Tanpa Teks Nama) */}
          <line x1="127" y1="132.5" x2="132.5" y2="132.5" stroke="#2EE59D" strokeWidth="0.9" />
          <line x1="127" y1="134.5" x2="131.5" y2="134.5" stroke="#0A0A0A" strokeWidth="0.8" />
          {/* Klip Gantungan Nametag Logam Emas */}
          <rect x="125.8" y="127" width="2.8" height="2.2" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="0.8" />

          {/* ============================================================== */}
          {/* LAYER 5: HEAD MIRROR DOKTER (IKAT KEPALA TEBAL KOKOH)          */}
          {/* ============================================================== */}
          {/* Tali Ikat Kepala Elastis Hitam di Dahi — TEBAL & KOKOH */}
          <path
            d="M 42 56 Q 95 50 148 56"
            stroke="#0A0A0A"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          {/* Strip Aksen Cyan Pada Tali Kepala */}
          <path
            d="M 42 56 Q 95 50 148 56"
            stroke="#00F0FF"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />

          {/* Gagang / Engsel Cermin Kepala Baja */}
          <rect x="73" y="42" width="8" height="15" rx="1.5" fill="#0A0A0A" />

          {/* Hard Shadow Cermin Kepala */}
          <circle cx="79" cy="38" r="15" fill="#0A0A0A" />

          {/* Piringan Cermin Kepala Logam Perak (#FFFFFF) */}
          <circle
            cx="76"
            cy="35"
            r="15"
            fill="#FFFFFF"
            stroke="#0A0A0A"
            strokeWidth="3.5"
          />
          {/* Ring Cermin Dalam Cyan Transparan */}
          <circle
            cx="76"
            cy="35"
            r="11"
            fill="#00F0FF"
            fillOpacity="0.25"
            stroke="#0A0A0A"
            strokeWidth="1.8"
          />
          {/* Garis Kilau Refleksi Cermin Putih */}
          <path
            d="M 70 29 Q 76 32 80 41"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Lubang Intip Cermin Tengah Dokter Hitam */}
          <circle cx="76" cy="35" r="4" fill="#0A0A0A" />
          <circle cx="75" cy="34" r="1.2" fill="#FFFFFF" />

          {/* ============================================================== */}
          {/* LAYER 6: TANGAN KIRI & KOTAK P3K IT (PALANG MERAH DARURAT #FF3B30) */}
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

            {/* Lambang Palang Merah Medis Darurat (#FF3B30) First Aid IT */}
            <rect x="18" y="124" width="6" height="12" fill="#FF3B30" />
            <rect x="15" y="127" width="12" height="6" fill="#FF3B30" />
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
          {/* LAYER 7: TANGAN KANAN & SUNTIKAN USB SIBER (TANPA KABEL)        */}
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
                fillOpacity="0.85"
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

          {/* ============================================================== */}
          {/* LAYER 8: SIMBOL PALANG '+' MELAYANG NAIK SEPERTI EFEK HEAL GAME*/}
          {/* ============================================================== */}
          {/* Heal Cross 1: Melayang Naik di Kiri Atas */}
          <g className="its-heal-cross-1">
            <rect x="32" y="60" width="4" height="11" rx="1" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="1.2" />
            <rect x="28.5" y="63.5" width="11" height="4" rx="1" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="1.2" />
          </g>

          {/* Heal Cross 2: Melayang Naik di Kanan Atas */}
          <g className="its-heal-cross-2">
            <rect x="168" y="70" width="4.5" height="12" rx="1.2" fill="#00F0FF" stroke="#0A0A0A" strokeWidth="1.2" />
            <rect x="164.25" y="73.75" width="12" height="4.5" rx="1.2" fill="#00F0FF" stroke="#0A0A0A" strokeWidth="1.2" />
          </g>

          {/* Heal Cross 3: Melayang Naik di Tengah Atas Kepala */}
          <g className="its-heal-cross-3">
            <rect x="94" y="50" width="4" height="11" rx="1" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="1.2" />
            <rect x="90.5" y="53.5" width="11" height="4" rx="1" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="1.2" />
          </g>

          {/* Heal Cross 4: Melayang Naik di Kanan Bawah */}
          <g className="its-heal-cross-4">
            <rect x="154" y="110" width="3.5" height="9.5" rx="0.8" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="1" />
            <rect x="151" y="113" width="9.5" height="3.5" rx="0.8" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="1" />
          </g>

          {/* Heal Cross 5: Melayang Naik di Kiri Bawah */}
          <g className="its-heal-cross-5">
            <rect x="28" y="115" width="3.5" height="9.5" rx="0.8" fill="#00F0FF" stroke="#0A0A0A" strokeWidth="1" />
            <rect x="25" y="118" width="9.5" height="3.5" rx="0.8" fill="#00F0FF" stroke="#0A0A0A" strokeWidth="1" />
          </g>
        </g>
      </svg>
    </div>
  );
}
