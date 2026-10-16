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

export const CompetencyRadarChart: React.FC<CompetencyRadarChartProps> = ({
  scores,
  size = 380,
}) => {
  if (!scores || scores.length === 0) return null;

  const center = size / 2;
  const radius = (size / 2) - 60; // Margin untuk label teks
  const totalAxes = scores.length;
  const angleStep = (Math.PI * 2) / totalAxes;

  // Level grid poligon (20%, 40%, 60%, 80%, 100%)
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  const getCoordinates = (index: number, factor: number) => {
    // Mulai dari atas (-PI / 2)
    const angle = index * angleStep - Math.PI / 2;
    const x = center + radius * factor * Math.cos(angle);
    const y = center + radius * factor * Math.sin(angle);
    return { x, y };
  };

  // Titik poligon data
  const dataPoints = scores.map((item, index) => {
    const factor = Math.max(0.08, item.percentage / 100);
    return getCoordinates(index, factor);
  });

  const dataPolygonPoints = dataPoints
    .map((pt) => `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`)
    .join(" ");

  return (
    <div className="w-full flex flex-col items-center justify-center p-2">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible max-w-full h-auto drop-shadow-[2px_2px_0px_#0A0A0A]"
      >
        {/* Background Grid Polygons */}
        {gridLevels.map((lvl, lvlIdx) => {
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
              fill={lvlIdx === gridLevels.length - 1 ? "#F4F0EA" : "none"}
              stroke="#0A0A0A"
              strokeWidth={lvlIdx === gridLevels.length - 1 ? "2.5" : "1.2"}
              strokeDasharray={lvlIdx === gridLevels.length - 1 ? undefined : "3 3"}
              opacity={0.6}
            />
          );
        })}

        {/* Axis Lines dari pusat */}
        {scores.map((_, i) => {
          const outerPt = getCoordinates(i, 1.0);
          return (
            <line
              key={`axis-${i}`}
              x1={center}
              y1={center}
              x2={outerPt.x}
              y2={outerPt.y}
              stroke="#0A0A0A"
              strokeWidth="1.5"
              strokeDasharray="2 2"
              opacity={0.5}
            />
          );
        })}

        {/* User Data Polygon */}
        <polygon
          points={dataPolygonPoints}
          fill="#FFE600"
          fillOpacity="0.65"
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

        {/* Axis Labels */}
        {scores.map((item, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const labelDist = radius + 28;
          const lx = center + labelDist * Math.cos(angle);
          const ly = center + labelDist * Math.sin(angle);

          // Penyesuaian anchor teks berdasarkan kuadran
          let textAnchor: "middle" | "start" | "end" = "middle";
          if (Math.cos(angle) > 0.3) textAnchor = "start";
          else if (Math.cos(angle) < -0.3) textAnchor = "end";

          return (
            <g key={`lbl-${i}`} className="select-none">
              <text
                x={lx}
                y={ly - 4}
                textAnchor={textAnchor}
                className="fill-[#0A0A0A] font-bold text-[11px] font-sans"
              >
                {item.competencyName.length > 20
                  ? item.competencyName.substring(0, 18) + "..."
                  : item.competencyName}
              </text>
              <text
                x={lx}
                y={ly + 10}
                textAnchor={textAnchor}
                className="fill-[#FF4B4B] font-mono font-black text-[12px]"
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
