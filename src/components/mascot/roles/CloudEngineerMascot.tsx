"use client";

import React from "react";

export interface CloudEngineerMascotProps {
  size?: number | string;
  className?: string;
  animated?: boolean;
  animate?: boolean;
  state?: "idle" | "hover" | "happy";
}

/**
 * Maskot Role: Cloud Engineer — "The Cloud-Rider"
 * Identitas: Sang Penunggang Awan Komputasi & Pendekar Multi-Cloud (Inspirasi: Sun Wukong / Kera Sakti)
 * 
 * Standar 4 Aturan Baku & Karakteristik Petualang:
 * 1. Base Anatomi Konsisten: Geometri badan presisi 106x94 rx=4 di (42,50) dengan hard shadow di (48,56).
 *    Warna badan Kuning Rambu Base (#FFD60A).
 * 2. Zero-Float Batch 3: Awan Kinto-un berfungsi sebagai pijakan wahana terbang di bawah kaki.
 * 3. Ekspresi Petualang Kera Sakti Hidup & Berani:
 *    - Senyum seringai lebar terbuka dengan taring kecil kera sakti di sudut mulut.
 *    - Alis heroik lentur menantang dengan kerut dahi petualang nakal & percaya diri.
 *    - Sorot mata Fiery Golden Eyes (Huo Yan Jin Jing) dengan cincin iris emas berkobar dan kilau data cyan.
 * 4. Animasi Halus: Surfing awan Kinto-un, kibaran jubah merah, dan jejak hembusan angin.
 */
export function CloudEngineerMascot({
  size = 200,
  className = "",
  animated = true,
  animate,
  state = "idle",
}: CloudEngineerMascotProps) {
  const isAnimated = animate !== undefined ? animate : animated;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none group ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Maskot Cloud Engineer — The Cloud-Rider: Pendekar kera sakti berbadan kuning base JalanMin dengan ekspresi seringai petualang hidup, mata Fiery Golden Eyes berkobar, menunggangi awan terbang Kinto-un, mahkota emas Jin'gu Bang, jubah merah berkibar, dan tongkat sakti Ruyi Jingu Bang"
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
            @keyframes cloud-surf {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-7px) rotate(-1.5deg); }
            }
            @keyframes cape-flutter {
              0%, 100% { transform: scale(1) rotate(0deg); }
              50% { transform: scale(1.03, 0.98) rotate(3deg); }
            }
            @keyframes cloud-float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-3px); }
            }
            @keyframes wind-trail {
              0% { stroke-dashoffset: 0; opacity: 0.9; }
              50% { stroke-dashoffset: 8; opacity: 0.4; }
              100% { stroke-dashoffset: 16; opacity: 0.9; }
            }
            .rider-animated {
              animation: ${isAnimated ? "cloud-surf 4s ease-in-out infinite" : "none"};
              transform-box: fill-box;
              transform-origin: center bottom;
            }
            .cape-flutter {
              animation: ${isAnimated ? "cape-flutter 2.8s ease-in-out infinite" : "none"};
              transform-box: fill-box;
              transform-origin: 44px 72px;
            }
            .cloud-wave {
              animation: ${isAnimated ? "cloud-float 3.2s ease-in-out infinite" : "none"};
              transform-box: fill-box;
              transform-origin: center bottom;
            }
            .wind-swoosh {
              stroke-dasharray: 6 4;
              animation: ${isAnimated ? "wind-trail 1.8s linear infinite" : "none"};
            }
            @media (prefers-reduced-motion: reduce) {
              .rider-animated, .cape-flutter, .cloud-wave, .wind-swoosh {
                animation: none !important;
              }
            }
          `}</style>
        </defs>

        {/* CONTAINER UTAMA DENGAN HOVER SEPARATED DARI CSS ANIMATION */}
        <g className="transition-transform duration-300 group-hover:scale-105">
          <g className="rider-animated">
            {/* ============================================================== */}
            {/* LAYER 1: JUBAH MERAH BERKIBAR DI BELAKANG (CAPE)               */}
            {/* ============================================================== */}
            <g className="cape-flutter">
              <path
                d="M 44,74 C 26,60 10,50 2,60 C -6,76 4,96 10,110 C 18,124 30,132 44,136 L 46,128 C 34,116 26,104 22,90 C 18,78 30,72 46,74 Z"
                fill="#0A0A0A"
              />
              <path
                d="M 42,70 C 24,56 8,46 0,56 C -8,72 2,92 8,106 C 16,120 28,128 42,132 C 32,114 24,100 20,86 C 16,74 28,68 42,70 Z"
                fill="#EF4444"
                stroke="#0A0A0A"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path
                d="M 20,86 C 24,100 32,114 42,132 C 36,124 30,112 26,96 C 22,84 24,76 28,68 C 16,74 20,86 20,86 Z"
                fill="#B91C1C"
                stroke="#0A0A0A"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path
                d="M 36,60 C 22,44 10,40 2,46 C -2,54 6,64 16,70"
                fill="#DC2626"
                stroke="#0A0A0A"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
            </g>

            {/* ============================================================== */}
            {/* LAYER 2: KAKI & SEPATU PENDEKAR DI ATAS AWAN                  */}
            {/* ============================================================== */}
            <rect x="64" y="142" width="22" height="24" rx="3" fill="#0A0A0A" />
            <line x1="64" y1="162" x2="86" y2="162" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="square" />
            <rect x="64" y="144" width="22" height="4" fill="#FFD60A" />

            <rect x="110" y="142" width="22" height="24" rx="3" fill="#0A0A0A" />
            <line x1="110" y1="162" x2="132" y2="162" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="square" />
            <rect x="110" y="144" width="22" height="4" fill="#FFD60A" />

            {/* ============================================================== */}
            {/* LAYER 3: BADAN UTAMA RAMBU BASE JALANMIN (106x94 rx=4 di 42,50)*/}
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
              strokeLinejoin="round"
            />

            {/* Pipi Merona Pink (#FF5C8A) */}
            <rect x="52" y="106" width="12" height="7" rx="2" fill="#FF5C8A" />
            <rect x="124" y="106" width="12" height="7" rx="2" fill="#FF5C8A" />

            {/* ============================================================== */}
            {/* LAYER 4: BUSANA PENDEKAR KERA (TUNIC MERAH & SABUK AWAN)       */}
            {/* ============================================================== */}
            <polygon
              points="42,126 148,126 148,144 42,144"
              fill="#EA580C"
              stroke="#0A0A0A"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <polygon
              points="78,126 95,136 112,126 105,126 95,131 85,126"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <rect x="42" y="134" width="106" height="10" fill="#991B1B" stroke="#0A0A0A" strokeWidth="3" />

            {/* Gesper Sabuk Motif Awan Emas-Putih */}
            <g transform="translate(95, 139)">
              <ellipse cx="1" cy="2" rx="14" ry="8" fill="#0A0A0A" />
              <path
                d="M -12,2 C -14,-4 -4,-6 0,-3 C 4,-6 14,-4 12,2 C 14,7 4,9 0,7 C -4,9 -14,7 -12,2 Z"
                fill="#FFFFFF"
                stroke="#0A0A0A"
                strokeWidth="2.5"
              />
              <circle cx="0" cy="2" r="3.5" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="1.5" />
            </g>

            {/* Pelindung Bahu Emas (Pauldrons) */}
            <path
              d="M 36,72 C 30,80 32,90 42,94 L 44,78 Z"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <circle cx="40" cy="82" r="1.5" fill="#0A0A0A" />

            <path
              d="M 154,72 C 160,80 158,90 148,94 L 146,78 Z"
              fill="#FFD60A"
              stroke="#0A0A0A"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <circle cx="150" cy="82" r="1.5" fill="#0A0A0A" />

            {/* ============================================================== */}
            {/* LAYER 5: WAJAH, FIERY GOLDEN EYES & SERINGAI PETUALANG HIDUP   */}
            {/* ============================================================== */}
            {/* Mata Kiri: Fiery Golden Eyes (Huo Yan Jin Jing) */}
            <rect x="58" y="76" width="22" height="24" rx="4" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="3.5" />
            {/* Iris Cincin Emas Kera Sakti */}
            <rect x="64" y="80" width="13" height="15" rx="3" fill="#F59E0B" stroke="#0A0A0A" strokeWidth="1.5" />
            {/* Pupil Hitam */}
            <rect x="66" y="82" width="9" height="11" rx="1.5" fill="#0A0A0A" />
            {/* Kilau Bintang Api Emas & Refleksi Kosmik */}
            <circle cx="69" cy="85" r="1.8" fill="#FFFFFF" />
            <circle cx="72" cy="89" r="1.3" fill="#FFD60A" />
            <circle cx="68" cy="90" r="0.8" fill="#00F0FF" />

            {/* Mata Kanan: Fiery Golden Eyes (Huo Yan Jin Jing) */}
            <rect x="102" y="76" width="22" height="24" rx="4" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="3.5" />
            {/* Iris Cincin Emas Kera Sakti */}
            <rect x="106" y="80" width="13" height="15" rx="3" fill="#F59E0B" stroke="#0A0A0A" strokeWidth="1.5" />
            {/* Pupil Hitam */}
            <rect x="108" y="82" width="9" height="11" rx="1.5" fill="#0A0A0A" />
            {/* Kilau Bintang Api Emas & Refleksi Kosmik */}
            <circle cx="111" cy="85" r="1.8" fill="#FFFFFF" />
            <circle cx="114" cy="89" r="1.3" fill="#FFD60A" />
            <circle cx="110" cy="90" r="0.8" fill="#00F0FF" />

            {/* ALIS HEROIK KERA SAKTI LENTUR & MENANTANG */}
            <path d="M 54 69 Q 66 61 79 66" stroke="#0A0A0A" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <path d="M 103 66 Q 116 60 128 65" stroke="#0A0A0A" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            {/* Kerut Dahi Petualang Nakal & Percaya Diri */}
            <path d="M 89 65 Q 95 62 101 65" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* SENYUM SERINGAI PETUALANG KERA TERBUKA DENGAN TARING */}
            <path
              d="M 86 106 Q 98 122 114 105 Z"
              fill="#FF5C8A"
              stroke="#0A0A0A"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Gigi Putih Kera Sakti di Bagian Atas */}
            <path d="M 88 106 L 112 106 L 110 110 L 90 110 Z" fill="#FFFFFF" />
            {/* Taring Kecil Kera Sakti di Sudut Senyum */}
            <polygon points="108,106 112,106 110,112" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="1" strokeLinejoin="round" />
            {/* Lekuk Sudut Seringai Nakal */}
            <line x1="114" y1="105" x2="118" y2="102" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="86" y1="106" x2="83" y2="104" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />

            {/* ============================================================== */}
            {/* LAYER 6: MAHKOTA EMAS SUN WUKONG & JAMBUL RAMBUT KERA          */}
            {/* ============================================================== */}
            {/* Jambul Rambut Kera Coklat Auburn di Puncak Kepala */}
            <g transform="translate(0, 6)">
              <path
                d="M 68,46 C 64,34 72,24 80,28 C 86,16 104,14 112,22 C 118,16 130,22 126,46 Z"
                fill="#0A0A0A"
              />
              <path
                d="M 66,44 C 62,32 70,22 78,26 C 84,14 102,12 110,20 C 118,14 130,20 124,44 Z"
                fill="#92400E"
                stroke="#0A0A0A"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              <path d="M 86,22 C 94,17 102,17 108,23" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M 72,32 C 76,28 80,30 82,35" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>

            {/* Cambang Kera Samping Pelipis */}
            <path d="M 42,56 C 34,60 34,70 42,74 Z" fill="#92400E" stroke="#0A0A0A" strokeWidth="3" strokeLinejoin="round" />
            <path d="M 148,56 C 156,60 156,70 148,74 Z" fill="#92400E" stroke="#0A0A0A" strokeWidth="3" strokeLinejoin="round" />

            {/* Mahkota Emas (The Golden Fillet / Jin'gu Bang) */}
            <rect x="42" y="50" width="106" height="7" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="3" />
            <line x1="44" y1="52" x2="146" y2="52" stroke="#FEF08A" strokeWidth="1.5" />

            {/* Lekukan Spiral Ganda Tengah Dahi (Ikonik Jin'gu Bang Wukong) */}
            <g transform="translate(0, 6)">
              <g transform="translate(1, 2)">
                <path
                  d="M 85,47 C 85,37 91,30 95,30 C 98,30 100,36 96,38 C 93,40 92,44 94,47 Z"
                  fill="#0A0A0A"
                />
                <path
                  d="M 105,47 C 105,37 99,30 95,30 C 92,30 90,36 94,38 C 97,40 98,44 96,47 Z"
                  fill="#0A0A0A"
                />
              </g>
              <path
                d="M 85,47 C 85,37 91,30 95,30 C 98,30 100,36 96,38 C 93,40 92,44 94,47 Z"
                fill="#FFD60A"
                stroke="#0A0A0A"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path
                d="M 105,47 C 105,37 99,30 95,30 C 92,30 90,36 94,38 C 97,40 98,44 96,47 Z"
                fill="#FFD60A"
                stroke="#0A0A0A"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <circle cx="95" cy="46" r="3.5" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="2" />
              <circle cx="94" cy="45" r="1.2" fill="#38BDF8" />
            </g>

            {/* ============================================================== */}
            {/* LAYER 7: TANGAN KIRI — TELAPAK TANGAN BUDDHA                    */}
            {/* ============================================================== */}
            <g id="left-arm-buddha-palm">
              <path
                d="M 44,80 L 26,75 L 24,90 L 44,93 Z"
                fill="#EF4444"
                stroke="#0A0A0A"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <rect
                x="22"
                y="74"
                width="6.5"
                height="15"
                rx="2"
                fill="#FFD60A"
                stroke="#0A0A0A"
                strokeWidth="2.5"
              />
              <line x1="24.5" y1="76" x2="24.5" y2="87" stroke="#FEF08A" strokeWidth="1.2" strokeLinecap="round" />

              <g transform="translate(2, 2)">
                <rect x="7" y="66" width="5.2" height="17" rx="2.6" fill="#0A0A0A" />
                <rect x="11.8" y="62" width="5.2" height="21" rx="2.6" fill="#0A0A0A" />
                <rect x="16.6" y="57" width="5.4" height="26" rx="2.7" fill="#0A0A0A" />
                <rect x="21.6" y="61" width="5.2" height="22" rx="2.6" fill="#0A0A0A" />
                <path d="M 25,83 C 28.5,82.5 30.5,85.5 28.5,88.5 C 26.5,91 22,89.5 22,87.5 Z" fill="#0A0A0A" />
                <rect x="6.5" y="72" width="20" height="15" rx="4" fill="#0A0A0A" />
              </g>

              <rect
                x="6.5"
                y="72"
                width="20"
                height="15"
                rx="4"
                fill="#FFD60A"
                stroke="#0A0A0A"
                strokeWidth="2.5"
              />

              {/* 4 Jari Buddha Palm */}
              <rect
                x="7"
                y="66"
                width="5.2"
                height="17"
                rx="2.6"
                fill="#FFD60A"
                stroke="#0A0A0A"
                strokeWidth="2"
              />
              <line x1="8.5" y1="68" x2="8.5" y2="76" stroke="#FEF08A" strokeWidth="1" strokeLinecap="round" />
              <line x1="7.8" y1="71" x2="11.4" y2="71" stroke="#0A0A0A" strokeWidth="1.2" strokeLinecap="round" />

              <rect
                x="11.8"
                y="62"
                width="5.2"
                height="21"
                rx="2.6"
                fill="#FFD60A"
                stroke="#0A0A0A"
                strokeWidth="2"
              />
              <line x1="13.2" y1="64.5" x2="13.2" y2="75" stroke="#FEF08A" strokeWidth="1" strokeLinecap="round" />
              <line x1="12.5" y1="68" x2="16.2" y2="68" stroke="#0A0A0A" strokeWidth="1.2" strokeLinecap="round" />

              <rect
                x="16.6"
                y="57"
                width="5.4"
                height="26"
                rx="2.7"
                fill="#FFD60A"
                stroke="#0A0A0A"
                strokeWidth="2.5"
              />
              <line x1="18.2" y1="59.5" x2="18.2" y2="75" stroke="#FEF08A" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="17.4" y1="64" x2="21.2" y2="64" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="17.4" y1="70" x2="21.2" y2="70" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" />

              <rect
                x="21.6"
                y="61"
                width="5.2"
                height="22"
                rx="2.6"
                fill="#FFD60A"
                stroke="#0A0A0A"
                strokeWidth="2"
              />
              <line x1="23" y1="63.5" x2="23" y2="75" stroke="#FEF08A" strokeWidth="1" strokeLinecap="round" />
              <line x1="22.3" y1="67" x2="26" y2="67" stroke="#0A0A0A" strokeWidth="1.2" strokeLinecap="round" />

              <path
                d="M 25,83 C 28.5,82.5 30.5,85.5 28.5,88.5 C 26.5,91 22,89.5 22,87.5 Z"
                fill="#FFD60A"
                stroke="#0A0A0A"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <line x1="24" y1="85.5" x2="27" y2="86.5" stroke="#0A0A0A" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M 10,78 Q 15,81 21,77" stroke="#0A0A0A" strokeWidth="1.6" strokeLinecap="round" fill="none" />
              <path d="M 12,82 Q 17,84 21,81" stroke="#0A0A0A" strokeWidth="1.4" strokeLinecap="round" fill="none" />
            </g>

            {/* ============================================================== */}
            {/* LAYER 8: TANGAN KANAN & TONGKAT SAKTI RUYI JINGU BANG         */}
            {/* ============================================================== */}
            <g>
              <path d="M 148,82 L 166,74 L 162,90 L 148,92 Z" fill="#EF4444" stroke="#0A0A0A" strokeWidth="3" strokeLinejoin="round" />
              <rect x="160" y="72" width="8" height="14" rx="2" transform="rotate(-20 160 72)" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="2" />
              <circle cx="166" cy="76" r="7" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="3" />

              {/* Tongkat Sakti Ruyi Jingu Bang */}
              <line x1="181" y1="16" x2="155" y2="150" stroke="#0A0A0A" strokeWidth="11" strokeLinecap="round" />
              <line x1="178" y1="14" x2="152" y2="148" stroke="#DC2626" strokeWidth="8" strokeLinecap="round" />
              <line x1="178" y1="14" x2="152" y2="148" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />

              <line x1="178" y1="14" x2="171" y2="40" stroke="#FFD60A" strokeWidth="10" strokeLinecap="round" />
              <line x1="177" y1="20" x2="174" y2="28" stroke="#0A0A0A" strokeWidth="2.5" />

              <line x1="159" y1="122" x2="152" y2="148" stroke="#FFD60A" strokeWidth="10" strokeLinecap="round" />
              <line x1="157" y1="130" x2="154" y2="138" stroke="#0A0A0A" strokeWidth="2.5" />
            </g>

            {/* ============================================================== */}
            {/* LAYER 9: AWAN TERBANG KINTO-UN (THE FLYING SOMERSAULT CLOUD)   */}
            {/* ============================================================== */}
            <path d="M 8,180 C -2,182 -8,186 -14,186" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" className="wind-swoosh" />
            <path d="M 16,188 C 6,190 0,192 -6,192" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" className="wind-swoosh" />
            <path d="M 28,194 C 18,196 10,196 2,196" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" className="wind-swoosh" />

            <g className="cloud-wave">
              <path
                d="M 26,174 C 16,170 12,156 24,148 C 36,140 50,144 58,150 C 68,138 90,136 104,144 C 116,134 136,134 148,142 C 162,136 178,144 182,158 C 190,168 184,182 172,188 C 158,196 136,196 122,192 C 108,198 84,198 70,192 C 54,198 34,196 24,186 C 16,182 20,176 26,174 Z"
                fill="#0A0A0A"
              />
              <path
                d="M 22,168 C 12,164 8,150 20,142 C 32,134 46,138 54,144 C 64,132 86,130 100,138 C 112,128 132,128 144,136 C 158,130 174,138 178,152 C 186,162 180,176 168,182 C 154,190 132,190 118,186 C 104,192 80,192 66,186 C 50,192 30,190 20,180 C 12,176 16,170 22,168 Z"
                fill="#FFFFFF"
                stroke="#0A0A0A"
                strokeWidth="4.5"
                strokeLinejoin="round"
              />
              <path
                d="M 20,180 C 30,190 50,192 66,186 C 80,192 104,192 118,186 C 132,190 154,190 168,182 C 160,186 142,187 126,183 C 112,188 88,188 74,183 C 58,188 38,186 28,178 C 22,174 20,180 20,180 Z"
                fill="#BAE6FD"
              />
              <path
                d="M 28,178 C 38,186 58,188 74,183 C 88,188 112,188 126,183 C 142,187 160,186 168,182 C 158,180 144,178 130,176 C 114,180 92,180 78,176 C 62,180 44,180 34,174 C 28,174 28,178 28,178 Z"
                fill="#E0F2FE"
              />

              <path
                d="M 164,158 C 156,152 144,154 142,162 C 140,170 150,176 156,172 C 160,168 159,162 153,162 C 148,162 148,166 151,168"
                stroke="#0A0A0A"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 166,154 C 172,158 172,166 166,170"
                stroke="#38BDF8"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />

              <path
                d="M 86,164 C 92,158 104,160 106,168 C 107,174 100,178 94,175 C 90,172 91,167 96,167"
                stroke="#0A0A0A"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 88,160 C 94,154 106,156 110,164"
                stroke="#38BDF8"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />

              <path
                d="M 38,158 C 44,152 54,154 56,162 C 57,168 50,172 44,169 C 40,166 41,161 46,161"
                stroke="#0A0A0A"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
