"use client";

import React, { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, useInView } from "@/lib/use-in-view";

const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";
const EASE_SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";

/* ------------------------------------------------------------------ */
/* CountUp: angka naik dari 0 ke target saat `active` bernilai true     */
/* ------------------------------------------------------------------ */
export function CountUp({
  to,
  active,
  delay = 0,
  duration = 1000,
}: {
  to: number;
  active: boolean;
  delay?: number;
  duration?: number;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (prefersReducedMotion()) {
      setValue(to);
      return;
    }

    let raf = 0;
    let startTs: number | null = null;
    const tick = (ts: number) => {
      if (startTs === null) startTs = ts;
      const p = Math.min((ts - startTs) / duration, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const timer = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [active, to, delay, duration]);

  return <>{value}</>;
}

/* ------------------------------------------------------------------ */
/* MiniBars: 3 batang ikon JalanID, tumbuh dari bawah saat terlihat     */
/* ------------------------------------------------------------------ */
export function MiniBars({
  className = "",
  heights = [50, 100, 70],
  barClassName = "bg-ink",
}: {
  className?: string;
  heights?: number[];
  barClassName?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });

  return (
    <div ref={ref} className={`flex items-end justify-center ${className}`} aria-hidden="true">
      {heights.map((h, i) => (
        <div
          key={i}
          className={`lv-motion w-[22%] origin-bottom ${barClassName}`}
          style={{
            height: `${h}%`,
            transform: inView ? "scaleY(1)" : "scaleY(0)",
            transition: `transform 650ms ${EASE_SPRING} ${i * 110}ms`,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ScoreBar: bar skor yang terisi + angka persen berjalan               */
/* ------------------------------------------------------------------ */
export function ScoreBar({
  label,
  value,
  fillClassName,
  active,
  delay = 0,
}: {
  label: string;
  value: number;
  fillClassName: string;
  active: boolean;
  delay?: number;
}) {
  return (
    <div className="lv-score-row">
      <div className="flex items-baseline justify-between gap-3 font-bold mb-1">
        <span className="min-w-0 truncate">{label}</span>
        <span className="flex-none tabular-nums">
          <CountUp to={value} active={active} delay={delay} duration={900} />%
        </span>
      </div>
      <div
        className="h-5 border-2 border-ink bg-surface overflow-hidden"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
      >
        <div
          className={`lv-motion lv-score-fill h-full border-r-2 border-ink ${fillClassName}`}
          style={{
            width: active ? `${value}%` : "0%",
            transition: `width 900ms ${EASE_OUT} ${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ExampleRadar: radar chart interaktif (hover/fokus legenda = sorot)   */
/* ------------------------------------------------------------------ */
const RADAR_AXES = [
  { label: "SQL", value: 95 },
  { label: "Visualisasi", value: 90 },
  { label: "Bisnis", value: 80 },
  { label: "Statistik", value: 55 },
  { label: "Komunikasi", value: 70 },
];

const CENTER = 100;
const RADIUS = 90;

function radarPoint(index: number, percent: number): [number, number] {
  const angle = ((-90 + (360 / RADAR_AXES.length) * index) * Math.PI) / 180;
  const r = (RADIUS * percent) / 100;
  return [CENTER + r * Math.cos(angle), CENTER + r * Math.sin(angle)];
}

function radarPolygon(percentFor: (i: number) => number): string {
  return RADAR_AXES.map((_, i) => radarPoint(i, percentFor(i)).map((n) => n.toFixed(1)).join(",")).join(" ");
}

export function ExampleRadar() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.35 });
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const summary = RADAR_AXES.map((a) => `${a.label} ${a.value}%`).join(", ");

  return (
    <div ref={ref} className="flex flex-wrap items-center gap-x-6 gap-y-4">
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={`Radar chart kompetensi contoh: ${summary}`}
        className="flex-none w-32 sm:w-36 md:w-44 lg:w-36 xl:w-40 h-auto overflow-visible transition-transform duration-200 group-hover:scale-105"
      >
        {/* Cincin skala */}
        <polygon
          points={radarPolygon(() => 100)}
          fill="#FFFFFF"
          stroke="#0A0A0A"
          strokeWidth="5"
          strokeLinejoin="round"
        />
        {[75, 50, 25].map((level) => (
          <polygon
            key={level}
            points={radarPolygon(() => level)}
            stroke="#0A0A0A"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            strokeLinejoin="round"
          />
        ))}
        {RADAR_AXES.map((_, i) => {
          const [x, y] = radarPoint(i, 100);
          return (
            <line
              key={i}
              x1={CENTER}
              y1={CENTER}
              x2={x}
              y2={y}
              stroke="#0A0A0A"
              strokeWidth={activeIdx === i ? 4 : 2}
              className="transition-all duration-150"
            />
          );
        })}

        {/* Data: membesar dari titik tengah */}
        <g
          className="lv-motion"
          style={{
            transformOrigin: `${CENTER}px ${CENTER}px`,
            transform: inView ? "scale(1)" : "scale(0)",
            transition: `transform 900ms ${EASE_SPRING} 150ms`,
          }}
        >
          <polygon
            points={radarPolygon((i) => RADAR_AXES[i].value)}
            fill="#FFD60A"
            stroke="#0A0A0A"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {RADAR_AXES.map((axis, i) => {
            const [x, y] = radarPoint(i, axis.value);
            const isActive = activeIdx === i;
            return (
              <g key={axis.label}>
                <circle
                  cx={x}
                  cy={y}
                  r={isActive ? 9 : 5.5}
                  fill={isActive ? "#FF5C8A" : "#0A0A0A"}
                  stroke="#0A0A0A"
                  strokeWidth="3"
                  className="transition-all duration-150"
                />
                <circle
                  cx={x}
                  cy={y}
                  r="14"
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setActiveIdx(i)}
                  onMouseLeave={() => setActiveIdx(null)}
                />
              </g>
            );
          })}
        </g>
      </svg>

      <ul className="flex flex-wrap gap-2 min-w-0 flex-1 basis-40" aria-label="Kompetensi pada radar">
        {RADAR_AXES.map((axis, i) => {
          const isActive = activeIdx === i;
          return (
            <li key={axis.label}>
              <button
                type="button"
                onMouseEnter={() => setActiveIdx(i)}
                onMouseLeave={() => setActiveIdx(null)}
                onFocus={() => setActiveIdx(i)}
                onBlur={() => setActiveIdx(null)}
                onClick={() => setActiveIdx(i)}
                className={`inline-flex items-center gap-1.5 border-2 border-ink px-2 py-1 font-mono text-[11px] sm:text-xs font-bold cursor-pointer transition-all duration-150 ${
                  isActive
                    ? "bg-accent-pink shadow-nb-sm -translate-x-0.5 -translate-y-0.5"
                    : "bg-surface hover:bg-accent-yellow"
                }`}
              >
                <span>{axis.label}</span>
                <span className="tabular-nums">{axis.value}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Ikon fitur: ilustrasi SVG responsif, beranimasi saat terlihat        */
/* ------------------------------------------------------------------ */
const iconClass =
  "flex-none w-auto overflow-visible transition-transform duration-200 group-hover:scale-105";

export function FeatureStepsIcon({ className = "h-14 sm:h-[4.5rem]" }: { className?: string }) {
  const { ref, inView } = useInView<SVGSVGElement>({ threshold: 0.5 });
  const bars = [
    { x: 4, y: 104, h: 62, fill: "#FFFFFF" },
    { x: 72, y: 64, h: 102, fill: "#FF5C8A" },
    { x: 140, y: 24, h: 142, fill: "#3D5AFE" },
  ];

  return (
    <svg
      ref={ref}
      viewBox="0 0 200 170"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`${iconClass} ${className}`}
    >
      {bars.map((b, i) => (
        <rect
          key={i}
          className="lv-motion"
          x={b.x}
          y={b.y}
          width="56"
          height={b.h}
          fill={b.fill}
          stroke="#0A0A0A"
          strokeWidth="6"
          style={{
            transformBox: "fill-box",
            transformOrigin: "50% 100%",
            transform: inView ? "scaleY(1)" : "scaleY(0)",
            transition: `transform 600ms ${EASE_SPRING} ${i * 120}ms`,
          }}
        />
      ))}
    </svg>
  );
}

export function FeatureRadarIcon({ className = "h-14 sm:h-[4.5rem]" }: { className?: string }) {
  const { ref, inView } = useInView<SVGSVGElement>({ threshold: 0.5 });

  return (
    <svg
      ref={ref}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`${iconClass} ${className}`}
    >
      <polygon
        points="100,10 185.6,72.2 153,172.8 47,172.8 14.4,72.2"
        fill="#FFFFFF"
        stroke="#0A0A0A"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <polygon
        className="lv-motion"
        points="100,28 147.1,84.7 147.6,165.5 73.5,136.4 40.1,80.5"
        fill="#FFD60A"
        stroke="#0A0A0A"
        strokeWidth="5"
        strokeLinejoin="round"
        style={{
          transformOrigin: "100px 100px",
          transform: inView ? "scale(1)" : "scale(0)",
          transition: `transform 800ms ${EASE_SPRING} 100ms`,
        }}
      />
    </svg>
  );
}

export function FeatureJobsIcon({ className = "h-14 sm:h-[4.5rem]" }: { className?: string }) {
  const { ref, inView } = useInView<SVGSVGElement>({ threshold: 0.5 });
  const slide = (i: number): React.CSSProperties => ({
    transform: inView ? "translateX(0)" : `translateX(${i % 2 === 0 ? -40 : 40}px)`,
    opacity: inView ? 1 : 0,
    transition: `transform 600ms ${EASE_OUT} ${i * 150}ms, opacity 400ms ease ${i * 150}ms`,
  });

  return (
    <svg
      ref={ref}
      viewBox="0 0 200 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`${iconClass} ${className}`}
    >
      <g className="lv-motion" style={slide(0)}>
        <rect x="6" y="6" width="176" height="50" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="6" />
        <rect x="18" y="18" width="26" height="26" fill="#FFD60A" stroke="#0A0A0A" strokeWidth="4" />
        <line x1="58" y1="24" x2="164" y2="24" stroke="#0A0A0A" strokeWidth="6" />
        <line x1="58" y1="40" x2="124" y2="40" stroke="#0A0A0A" strokeWidth="4" />
      </g>
      <g className="lv-motion" style={slide(1)}>
        <rect x="16" y="68" width="176" height="50" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="6" />
        <rect x="28" y="80" width="26" height="26" fill="#FF5C8A" stroke="#0A0A0A" strokeWidth="4" />
        <line x1="68" y1="86" x2="174" y2="86" stroke="#0A0A0A" strokeWidth="6" />
        <line x1="68" y1="102" x2="134" y2="102" stroke="#0A0A0A" strokeWidth="4" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* RoleChips: 21 chip role muncul bergantian saat terlihat              */
/* ------------------------------------------------------------------ */
export function RoleChips({ roles }: { roles: { name: string; bg: string }[] }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 pt-4 [&>*:last-child]:max-sm:col-span-2">
      {roles.map((r, i) => (
        <div
          key={r.name}
          style={inView ? { animationDelay: `${Math.min(i * 18, 300)}ms` } : undefined}
          className={`${r.bg} text-ink border-2 md:border-3 border-paper p-2.5 sm:p-3 font-display font-bold text-xs md:text-sm leading-tight transition-all duration-150 hover:-translate-y-1 hover:shadow-nb-sm hover:border-ink active:translate-y-0.5 active:shadow-none active:scale-[0.98] cursor-default select-none ${
            inView ? "lv-chip-pop" : "opacity-0"
          }`}
        >
          {r.name}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ScrollProgress: garis kemajuan baca di tepi atas halaman             */
/* ------------------------------------------------------------------ */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-2 pointer-events-none">
      <div ref={barRef} className="h-full w-0 bg-accent-pink border-b-2 border-r-2 border-ink" />
    </div>
  );
}
