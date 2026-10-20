"use client";
        
        import React, { useEffect, useRef, useState } from "react";
        
        export type MascotState = "idle" | "hover" | "happy" | "neutral" | "encourage";
        
        export interface JalanMinProps {
          state?: MascotState;
          size?: number;
          className?: string;
          label?: string;
          trackMouse?: boolean;
        }
        
        export function JalanMin({
          state = "idle",
          size = 200,
          className = "",
          label = "Detektif JalanMin, maskot penyelidik potensi IT JalanITku",
          trackMouse = true,
        }: JalanMinProps) {
          const containerRef = useRef<HTMLDivElement>(null);
        
          // Dynamic tracking offsets
          const [offsets, setOffsets] = useState({
            plx: 0,
            ply: 0,
            prx: 0,
            pry: 0,
            gx: 0,
            gy: 0,
            rot: 0,
          });
        
          useEffect(() => {
            if (!trackMouse || state === "happy") {
              setOffsets({ plx: 0, ply: 0, prx: 0, pry: 0, gx: 0, gy: 0, rot: 0 });
              return;
            }
        
            let rafId: number;
        
            const handleMouseMove = (e: MouseEvent) => {
              if (!containerRef.current) return;
              const rect = containerRef.current.getBoundingClientRect();
              const cx = rect.left + rect.width / 2;
              const cy = rect.top + rect.height / 2;
        
              const dx = e.clientX - cx;
              const dy = e.clientY - cy;
              const dist = Math.sqrt(dx * dx + dy * dy);
        
              const ux = dist > 0 ? dx / dist : 0;
              const uy = dist > 0 ? dy / dist : 0;
        
              // Non-linear easing for pupils
              const travelLeft = Math.min(6.0, dist / 40);
              const travelRight = Math.min(7.5, dist / 35);
        
              const plx = Number((ux * travelLeft).toFixed(1));
              const ply = Number((uy * travelLeft).toFixed(1));
              const prx = Number((ux * travelRight).toFixed(1));
              const pry = Number((uy * travelRight).toFixed(1));
        
              // Magnifier displacement & tilt
              const gx = Number(Math.max(-10, Math.min(10, ux * Math.min(10, dist / 28))).toFixed(1));
              const gy = Number(Math.max(-8, Math.min(8, uy * Math.min(8, dist / 32))).toFixed(1));
              const rot = Number(Math.max(-16, Math.min(16, dx / 35)).toFixed(1));
        
              cancelAnimationFrame(rafId);
              rafId = requestAnimationFrame(() => {
                setOffsets({ plx, ply, prx, pry, gx, gy, rot });
              });
            };
        
            window.addEventListener("mousemove", handleMouseMove, { passive: true });
            return () => {
              window.removeEventListener("mousemove", handleMouseMove);
              cancelAnimationFrame(rafId);
            };
          }, [trackMouse, state]);
        
          // Animation classes
          const isHappy = state === "happy";
          const isPumping = state === "encourage";
          const isHover = state === "hover";
          const isNeutral = state === "neutral";
        
          const bodyAnimClass = isHappy ? "jm-jump" : isPumping ? "jm-pump" : "jm-bob";
          const hatAnimClass = isHappy ? "jm-hat-happy" : "jm-hat";
        
          // Magnifier transform
          const magnifierTransform = isHappy
            ? "translate(6px, -18px) rotate(-22deg)"
            : `translate(${offsets.gx}px, ${offsets.gy}px) ${
                isHover ? "scale(1.08)" : "scale(1)"
              } rotate(${offsets.rot}deg)`;
        
          return (
            <div
              ref={containerRef}
              style={{ width: size, height: size }}
              className={`inline-flex items-center justify-center select-none ${className}`}
              role="img"
              aria-label={label}
            >
              <svg
                width={size}
                height={size}
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full overflow-visible"
              >
                <g className={bodyAnimClass}>
                  {/* 1. Hard Shadow & Sepatu Hitam */}
                  <rect x="66" y="154" width="22" height="26" fill="#0A0A0A" />
                  <rect x="120" y="154" width="22" height="26" fill="#0A0A0A" />
                  <rect x="62" y="150" width="22" height="26" fill="#0A0A0A" rx="2" />
                  <rect x="116" y="150" width="22" height="26" fill="#0A0A0A" rx="2" />
                  <line
                    x1="62"
                    y1="172"
                    x2="84"
                    y2="172"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    strokeLinecap="square"
                  />
                  <line
                    x1="116"
                    y1="172"
                    x2="138"
                    y2="172"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    strokeLinecap="square"
                  />
        
                  {/* 2. Lengan Kiri (Variasi State) */}
                  {isHappy ? (
                    <g>
                      <line
                        x1="40"
                        y1="100"
                        x2="16"
                        y2="76"
                        stroke="#0A0A0A"
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                      <circle cx="14" cy="74" r="6" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="4" />
                    </g>
                  ) : isPumping ? (
                    <g>
                      <line
                        x1="40"
                        y1="104"
                        x2="18"
                        y2="92"
                        stroke="#0A0A0A"
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                      <circle cx="16" cy="90" r="7" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="4" />
                      <path
                        d="M16 83 L16 88"
                        stroke="#0A0A0A"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </g>
                  ) : (
                    <g>
                      <line
                        x1="40"
                        y1="104"
                        x2="18"
                        y2="124"
                        stroke="#0A0A0A"
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                      <circle cx="16" cy="126" r="6" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="4" />
                    </g>
                  )}
        
                  {/* 3. Lengan Kanan Menghubungkan ke Gagang */}
                  <line
                    x1="150"
                    y1="104"
                    x2="148"
                    y2="114"
                    stroke="#0A0A0A"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
        
                  {/* 4. Badan Rambu Papan Kuning & Hard Shadow */}
                  <rect x="48" y="58" width="110" height="96" fill="#0A0A0A" />
                  <rect
                    x="40"
                    y="50"
                    width="110"
                    height="96"
                    fill="#FFD60A"
                    stroke="#0A0A0A"
                    strokeWidth="5"
                  />
                  {/* Garis Marka Putus-putus Jalan */}
                  <line
                    x1="52"
                    y1="134"
                    x2="138"
                    y2="134"
                    stroke="#0A0A0A"
                    strokeWidth="4"
                    strokeDasharray="10 8"
                  />
                  {/* Pipi Merona Pink */}
                  <rect x="54" y="104" width="12" height="8" rx="2" fill="#FF5C8A" />
                  <rect x="124" y="104" width="12" height="8" rx="2" fill="#FF5C8A" />
        
                  {/* 5. Kerah Mantel Putih & Dasi Cyan */}
                  <polygon
                    points="74,146 88,146 82,132"
                    fill="#FFFFFF"
                    stroke="#0A0A0A"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="116,146 102,146 108,132"
                    fill="#FFFFFF"
                    stroke="#0A0A0A"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  <rect
                    x="91"
                    y="132"
                    width="8"
                    height="5"
                    fill="#00F0FF"
                    stroke="#0A0A0A"
                    strokeWidth="2.5"
                  />
                  <polygon
                    points="91,137 99,137 101,146 95,150 89,146"
                    fill="#00F0FF"
                    stroke="#0A0A0A"
                    strokeWidth="2.5"
                  />
        
                  {/* 6. Alis Detektif */}
                  {isHappy ? (
                    <g>
                      <line
                        x1="64"
                        y1="68"
                        x2="84"
                        y2="72"
                        stroke="#0A0A0A"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      <line
                        x1="104"
                        y1="64"
                        x2="128"
                        y2="68"
                        stroke="#0A0A0A"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </g>
                  ) : isNeutral ? (
                    <g>
                      <line
                        x1="64"
                        y1="72"
                        x2="84"
                        y2="72"
                        stroke="#0A0A0A"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      <line
                        x1="104"
                        y1="64"
                        x2="128"
                        y2="68"
                        stroke="#0A0A0A"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </g>
                  ) : isPumping ? (
                    <g>
                      <line
                        x1="64"
                        y1="70"
                        x2="86"
                        y2="76"
                        stroke="#0A0A0A"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      <line
                        x1="126"
                        y1="70"
                        x2="104"
                        y2="76"
                        stroke="#0A0A0A"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </g>
                  ) : (
                    <g>
                      <line
                        x1="64"
                        y1="72"
                        x2="84"
                        y2="74"
                        stroke="#0A0A0A"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      <line
                        x1="104"
                        y1="68"
                        x2="128"
                        y2="70"
                        stroke="#0A0A0A"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </g>
                  )}
        
                  {/* 7. Mata Kiri (Normal) */}
                  <rect
                    x="66"
                    y="78"
                    width="18"
                    height="22"
                    rx="4"
                    fill="#FFFFFF"
                    stroke="#0A0A0A"
                    strokeWidth="4"
                  />
                  <g
                    style={{
                      transform: `translate(${offsets.plx}px, ${offsets.ply}px)`,
                      transition: "transform 0.12s ease-out",
                    }}
                  >
                    <rect x="71" y="84" width="8" height="10" rx="2" fill="#0A0A0A" />
                    <circle cx="73.5" cy="86.5" r="1.5" fill="#FFFFFF" />
                  </g>
        
                  {/* 8. Mata Kanan (Mata Investigasi di Belakang Kaca Pembesar — Membesar 1.25x) */}
                  <rect
                    x="104"
                    y="74"
                    width="24"
                    height="28"
                    rx="5"
                    fill="#FFFFFF"
                    stroke="#0A0A0A"
                    strokeWidth="4"
                  />
                  <g
                    style={{
                      transform: `translate(${offsets.prx}px, ${offsets.pry}px)`,
                      transition: "transform 0.12s ease-out",
                    }}
                  >
                    <rect x="110" y="81" width="11" height="13" rx="2.5" fill="#0A0A0A" />
                    <circle cx="113.5" cy="84" r="2.2" fill="#FFFFFF" />
                    <circle cx="117.5" cy="89" r="1.2" fill="#00F0FF" />
                  </g>
        
                  {/* 9. Mulut Detektif (Ekspresi State) */}
                  {isHappy ? (
                    <g>
                      <path
                        d="M72 112 Q94 142 116 112 Z"
                        fill="#0A0A0A"
                        stroke="#0A0A0A"
                        strokeWidth="3"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M84 124 Q94 118 104 124 Q94 132 84 124 Z"
                        fill="#FF5C8A"
                      />
                    </g>
                  ) : isHover ? (
                    <g>
                      <path
                        d="M76 114 Q94 136 112 114"
                        fill="#0A0A0A"
                        stroke="#0A0A0A"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M85 125 Q94 120 103 125 Q94 132 85 125 Z"
                        fill="#FF5C8A"
                      />
                    </g>
                  ) : isNeutral ? (
                    <line
                      x1="82"
                      y1="118"
                      x2="108"
                      y2="118"
                      stroke="#0A0A0A"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  ) : isPumping ? (
                    <path
                      d="M76 118 Q94 130 114 112"
                      stroke="#0A0A0A"
                      strokeWidth="5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  ) : (
                    <path
                      d="M78 116 Q94 126 110 116"
                      stroke="#0A0A0A"
                      strokeWidth="5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  )}
        
                  {/* 10. Kaca Pembesar Neo-Brutalism dengan Tracking Mouse & Tilt */}
                  <g
                    id="jm-magnifier"
                    style={{
                      transform: magnifierTransform,
                      transformOrigin: "116px 88px",
                      transition: "transform 0.14s cubic-bezier(0.2, 0.8, 0.2, 1)",
                    }}
                  >
                    {/* Bayangan Kaca & Gagang */}
                    <circle cx="120" cy="92" r="23" fill="#0A0A0A" />
                    <rect
                      x="138"
                      y="106"
                      width="12"
                      height="32"
                      rx="3"
                      transform="rotate(-38 138 106)"
                      fill="#0A0A0A"
                    />
        
                    {/* Gagang Pink dengan Aksen Tekstur */}
                    <rect
                      x="134"
                      y="102"
                      width="12"
                      height="32"
                      rx="3"
                      transform="rotate(-38 134 102)"
                      fill="#FF5C8A"
                      stroke="#0A0A0A"
                      strokeWidth="4.5"
                    />
                    <line
                      x1="140"
                      y1="112"
                      x2="148"
                      y2="106"
                      stroke="#0A0A0A"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <line
                      x1="144"
                      y1="117"
                      x2="152"
                      y2="111"
                      stroke="#0A0A0A"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
        
                    {/* Bingkai Lensa Tebal & Lensa Kaca Reflektif Cyan */}
                    <circle
                      cx="116"
                      cy="88"
                      r="23"
                      fill="#FFFFFF"
                      fillOpacity="0.12"
                      stroke="#0A0A0A"
                      strokeWidth="5"
                    />
                    <circle
                      cx="116"
                      cy="88"
                      r="19.5"
                      fill="#00F0FF"
                      fillOpacity="0.28"
                    />
        
                    {/* Kilau Refleksi Putih Khas Neo-Brutalism */}
                    <path
                      d="M103 78 A16 16 0 0 1 126 73"
                      stroke="#FFFFFF"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <circle cx="124" cy="98" r="2" fill="#FFFFFF" />
        
                    {/* Tangan Kanan Mencengkeram Gagang */}
                    <circle
                      cx="146"
                      cy="110"
                      r="6.5"
                      fill="#FFD60A"
                      stroke="#0A0A0A"
                      strokeWidth="4"
                    />
                  </g>
        
                  {/* 11. Topi Detektif Deerstalker Neo-Brutalism */}
                  <g className={hatAnimClass} style={{ transformOrigin: "95px 44px" }}>
                    {/* Bayangan Topi */}
                    <path
                      d="M46 48 C46 22 70 12 95 12 C120 12 144 22 144 48 Z"
                      fill="#0A0A0A"
                    />
                    {/* Kubah Pink */}
                    <path
                      d="M42 44 C42 18 68 8 95 8 C122 8 148 18 148 44 Z"
                      fill="#FF5C8A"
                      stroke="#0A0A0A"
                      strokeWidth="5"
                    />
                    {/* Visor Depan (Pet Kanan / Arah Depan) */}
                    <path
                      d="M142 40 L168 46 L142 50 Z"
                      fill="#FFD60A"
                      stroke="#0A0A0A"
                      strokeWidth="4.5"
                      strokeLinejoin="miter"
                    />
                    {/* Visor Belakang (Pet Kiri) */}
                    <path
                      d="M48 40 L22 46 L48 50 Z"
                      fill="#FFD60A"
                      stroke="#0A0A0A"
                      strokeWidth="4.5"
                      strokeLinejoin="miter"
                    />
                    {/* Pita Pinggang Topi Cyan */}
                    <rect
                      x="42"
                      y="38"
                      width="106"
                      height="8"
                      fill="#00F0FF"
                      stroke="#0A0A0A"
                      strokeWidth="3"
                    />
                    {/* Penutup Telinga & Tali Pengikat di Puncak */}
                    <path
                      d="M68 38 C68 22 80 14 93 11"
                      stroke="#0A0A0A"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      d="M122 38 C122 22 110 14 97 11"
                      stroke="#0A0A0A"
                      strokeWidth="4"
                      fill="none"
                    />
                    <circle
                      cx="95"
                      cy="8"
                      r="4.5"
                      fill="#00F0FF"
                      stroke="#0A0A0A"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M92 8 Q86 3 88 12"
                      stroke="#00F0FF"
                      strokeWidth="3"
                      fill="none"
                    />
                    <path
                      d="M98 8 Q104 3 102 12"
                      stroke="#00F0FF"
                      strokeWidth="3"
                      fill="none"
                    />
                  </g>
                </g>
              </svg>
            </div>
          );
        }
        