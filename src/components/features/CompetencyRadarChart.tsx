"use client";

import React from "react";

interface CompetencyScore {
  competencyName: string;
  percentage: number;
}

interface CompetencyRadarChartProps {
  scores: CompetencyScore[];
  size?: number;
}

// Memecah nama kompetensi menjadi 1-2 baris ringkas
function formatCompetencyName(name: string): string[] {
  if (name.length <= 13) return [name];

  const words = name.split(" ");
  if (words.length <= 1) {
    return [name.substring(0, 13), name.substring(13)];
  }

  const half = Math.ceil(words.length / 2);
  const line1 = words.slice(0, half).join(" ");
  const line2 = words.slice(half).join(" ");
  return [line1, line2];
}

export const CompetencyRadarChart: React.FC<CompetencyRadarChartProps> = ({
  scores,
}) => {
  if (!scores || scores.length === 0) return null;

  // Kanvas proposional yang pas mengisi kotak kartu secara optimal
  const width = 420;
  const height = 370;
  const cx = width / 2; // 210
  const cy = height / 2 + 5; // 190
  const radius = 115; // Radius poligon dibesarkan agar grafik terlihat gagah dan dominan
  const totalAxes = scores.length;
  const angleStep = (Math.PI * 2) / totalAxes;

  // Level grid poligon (20%, 40%, 60%, 80%, 100%)
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  const getCoordinates = (index: number, factor: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const x = cx + radius * factor * Math.cos(angle);
    const y = cy + radius * factor * Math.sin(angle);
    return { x, y };
  };

  // Titik poligon data pengguna
  const dataPoints = scores.map((item, index) => {
    const factor = Math.max(0.08, Math.min(1.0, item.percentage / 100));
    return getCoordinates(index, factor);
  });

  const dataPolygonPoints = dataPoints
    .map((pt) => `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`)
    .join(" ");

  return (
    <div className="w-full flex flex-col items-center justify-center overflow-hidden">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto select-none"
        style={{ filter: "none" }}
      >
        {/* Background Grid Polygons */}
        {gridLevels.map((lvl, lvlIdx) => {
          const isOuter = lvlIdx === gridLevels.length - 1;
          const points = scores
            .map((_, i) => {
              const pt = getCoordinates(i, lvl);
              return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
            })
            .join(" ");

          return (
            <polygon
              key={`grid-${lvlIdx}`}
              points={points}
              fill={isOuter ? "#FFF8E7" : "none"}
              stroke="#0A0A0A"
              strokeWidth={isOuter ? "2.5" : "1"}
              strokeDasharray={isOuter ? undefined : "3 3"}
              opacity={isOuter ? 1 : 0.45}
            />
          );
        })}

        {/* Axis Spoke Lines dari pusat */}
        {scores.map((_, i) => {
          const outerPt = getCoordinates(i, 1.0);
          return (
            <line
              key={`axis-${i}`}
              x1={cx}
              y1={cy}
              x2={outerPt.x}
              y2={outerPt.y}
              stroke="#0A0A0A"
              strokeWidth="1.2"
              strokeDasharray="2 2"
              opacity={0.35}
            />
          );
        })}

        {/* User Data Polygon */}
        <polygon
          points={dataPolygonPoints}
          fill="#FFD60A"
          fillOpacity="0.75"
          stroke="#0A0A0A"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Data Points (Dots) */}
        {dataPoints.map((pt, i) => (
          <circle
            key={`dot-${i}`}
            cx={pt.x}
            cy={pt.y}
            r="5"
            fill="#00F0FF"
            stroke="#0A0A0A"
            strokeWidth="2.5"
          />
        ))}

        {/* Axis Labels & Percentage */}
        {scores.map((item, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);

          // Jarak label dari titik simpul
          const labelDist = radius + 15;
          const lx = cx + labelDist * cos;
          const ly = cy + labelDist * sin;

          let textAnchor: "middle" | "start" | "end" = "middle";
          let xOffset = 0;
          let yBase = ly;

          if (cos > 0.3) {
            textAnchor = "start";
            xOffset = 4;
          } else if (cos < -0.3) {
            textAnchor = "end";
            xOffset = -4;
          }

          if (sin < -0.7) {
            yBase = ly - 16;
          } else if (sin > 0.7) {
            yBase = ly + 14;
          }

          const lines = formatCompetencyName(item.competencyName);
          const isTwoLines = lines.length > 1;

          // Warna teks persentase dengan rasio kontras WCAG AA (>= 4.5:1) pada background terang
          const scoreColor =
            item.percentage >= 80
              ? "#047857" // Accessible dark emerald (5.1:1)
              : item.percentage >= 60
              ? "#B45309" // Accessible dark amber (4.8:1)
              : "#C53030"; // Accessible dark red (5.3:1)

          return (
            <g key={`lbl-${i}`} className="select-none">
              {/* Baris 1 Nama Kompetensi */}
              <text
                x={lx + xOffset}
                y={isTwoLines ? yBase - 7 : yBase - 1}
                textAnchor={textAnchor}
                className="fill-[#0A0A0A] font-sans font-bold text-[12px]"
              >
                {lines[0]}
              </text>

              {/* Baris 2 Nama Kompetensi */}
              {isTwoLines && (
                <text
                  x={lx + xOffset}
                  y={yBase + 7}
                  textAnchor={textAnchor}
                  className="fill-[#0A0A0A] font-sans font-bold text-[12px]"
                >
                  {lines[1]}
                </text>
              )}

              {/* Angka Persentase */}
              <text
                x={lx + xOffset}
                y={isTwoLines ? yBase + 22 : yBase + 15}
                textAnchor={textAnchor}
                className="font-mono font-black text-[12px]"
                fill={scoreColor}
              >
                {item.percentage}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
