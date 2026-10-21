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
 * Ciri Khas: Cermin kepala medis (head mirror) dokter dengan tali kepala kokoh/tebal, jas dokter putih
 * bersih berkerah lebar dengan saku dada dan nametag identitas rumah sakit IT (tanpa nama teks),
 * tangan kiri memegang kotak pertolongan pertama P3K IT (Medical Kit), tangan kanan memegang suntikan USB
 * siber tanpa kabel berdosis serum mint neon, serta partikel tanda palang "+" khas medis kesehatan yang
 * berterbangan dan berkedap-kedip lembut.
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
      aria-label="Maskot IT Support — The Fixer: Papan penunjuk jalan neo-brutalism kuning bertema Dokter IT dengan cermin kepala dokter tebal, jas lab dokter putih bersih dengan nametag, kotak P3K IT medis, suntikan USB siber tanpa kabel, dan tanda tambah plus medis kedap-kedip"
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
            @keyframes its-cross-blink-1 {
              0%, 100% { opacity: 0.3; transform: scale(0.85); }
              50% { opacity: 1; transform: scale(1.15); }
            }
            @keyframes its-cross-blink-2 {
              0%, 100% { opacity: 1; transform: scale(1.15); }
              50% { opacity: 0.25; transform: scale(0.8); }
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
            .its-cross-1 {
              animation: ${isAnimated ? "its-cross-blink-1 1.6s ease-in-out infinite" : "none"};
              transform-origin: 34px 42px;
            }
            .its-cross-2 {
              animation: ${isAnimated ? "its-cross-blink-2 2s ease-in-out infinite" : "none"};
              transform-origin: 168px 44px;
            }
            .its-cross-3 {
              animation: ${isAnimated ? "its-cross-blink-1 2.2s ease-in-out infinite" : "none"};
              transform-origin: 162px 146px;
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
          {/* LAYER 4: JAS LAB DOKTER PUTIH DENGAN NAMETAG (TANPA STETOSKOP) */}
          {/* ============================================================== */}
          {/* Jas Lab Lapel Kiri Putih Bersih */}
          <polygon
            points="68,144 94,144 82,126"
            fill="#FFFFFF"
            stroke="#0A0A0A"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Jas Lab Lapel Kanan Putih Bersih */}
          <polygon
            points="120,144 94,144 106,126"
            fill="#FFFFFF"
            stroke="#0A0A0A"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Garis Lipatan Jas Tengah & Kancing Dokter */}
          <line x1="94" y1="126" x2="94" y2="144" stroke="#0A0A0A" strokeWidth="2.5" />
          <circle cx="94" cy="133" r="1.8" fill="#00F0FF" stroke="#0A0A0A" strokeWidth="1" />
          <circle cx="94" cy="140" r="1.8" fill="#00F0FF" stroke="#0A0A0A" strokeWidth="1" />

          {/* Saku Dada Kanan Jas Dokter */}
          <rect
            x="114"
            y="124"
            width="22"
            height="18"
            rx="2.5"
            fill="#FFFFFF"
            stroke="#0A0A0A"
            strokeWidth="2.5"
          />
          {/* Garis Aksen Bibir Saku Cyan */}
          <line x1="114" y1="124" x2="136" y2="124" stroke="#00F0FF" strokeWidth="2.5" />

          {/* Nametag Rumah Sakit / Medic IT di Saku Dada (Tanpa Teks Nama) */}
          {/* Hard Shadow Nametag */}
          <rect x="119" y="129" width="14" height="10" rx="1.5" fill="#0A0A0A" />
          {/* Bodi Kartu Nametag Putih Bersih */}
          <rect
            x="118"
            y="128"
            width="14"
            height="10"
            rx="1.5"
            fill="#FFFFFF"
            stroke="#0A0A0A"
            strokeWidth="1.5"
          />
          {/* Header Bar Nametag Cyan (#00F0FF) */}
          <rect x="118" y="128" width="14" height="3" fill="#00F0FF" />
          {/* Avatar Kotak Mini Foto ID */}
          <rect x="119.5" y="132" width="3.5" height="4.5" rx="0.5" fill="#0A0A0A" />
          {/* Garis-Garis Identitas Barcode / Info (Tanpa Teks) */}
          <line x1="124.5" y1="133" x2="130" y2="133" stroke="#2EE59D" strokeWidth="1" />
          <line x1="124.5" y1="135" x2="129" y2="135" stroke="#0A0A0A" strokeWidth="0.8" />

          {/* Klip Jepitan Nametag Logam di Atas Saku */}
          <rect x="123.5" y="126" width="3" height="3" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="0.8" />

          {/* ============================================================== */}
          {/* LAYER 5: HEAD MIRROR DOKTER (IKAT KEPALA DIPERTEBAL KOKOH)     */}
          {/* ============================================================== */}
          {/* Tali Ikat Kepala Elastis Hitam di Dahi — DIPERTEBAL LEBIH KOKOH */}
          <path
            d="M 42 56 Q 95 50 148 56"
            stroke="#0A0A0A"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          {/* Strip Tengah Aksen Cyan Pada Ikat Kepala */}
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

            {/* Hard Shadow Suntikan USB Siber (Tanpa Kabel Spiral) */}
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
          {/* LAYER 8: SIMBOL PALANG '+' KHAS KESEHATAN KEDAP-KEDIP BERTERBANGAN */}
          {/* ============================================================== */}
          {/* Simbol Plus Medis 1: Kiri Atas */}
          <g className="its-cross-1">
            <rect x="32" y="38" width="4" height="10" rx="1" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="1" />
            <rect x="29" y="41" width="10" height="4" rx="1" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="1" />
          </g>

          {/* Simbol Plus Medis 2: Kanan Atas */}
          <g className="its-cross-2">
            <rect x="166" y="40" width="4.5" height="11" rx="1" fill="#00F0FF" stroke="#0A0A0A" strokeWidth="1" />
            <rect x="162.7" y="43.2" width="11" height="4.5" rx="1" fill="#00F0FF" stroke="#0A0A0A" strokeWidth="1" />
          </g>

          {/* Simbol Plus Medis 3: Kanan Bawah Dekat Tangan */}
          <g className="its-cross-3">
            <rect x="160.5" y="142" width="3.5" height="9" rx="0.8" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="0.8" />
            <rect x="157.7" y="144.7" width="9" height="3.5" rx="0.8" fill="#2EE59D" stroke="#0A0A0A" strokeWidth="0.8" />
          </g>

          {/* Simbol Plus Medis 4: Kiri Tengah Mini */}
          <g className="its-cross-2">
            <rect x="24" y="98" width="3" height="7.5" rx="0.8" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="0.8" />
            <rect x="21.7" y="100.2" width="7.5" height="3" rx="0.8" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="0.8" />
          </g>
        </g>
      </svg>
    </div>
  );
}
