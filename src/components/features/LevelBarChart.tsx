"use client";

import React from "react";

interface LevelScore {
  level: number;
  levelName: string;
  weight: number;
  percentage: number;
}

interface LevelBarChartProps {
  levels: LevelScore[];
}

export const LevelBarChart: React.FC<LevelBarChartProps> = ({ levels }) => {
  const getBarColor = (percentage: number) => {
    if (percentage >= 80) return "bg-accent-cyan"; // Sangat kuat (Cyan)
    if (percentage >= 60) return "bg-accent-yellow"; // Kuat (Kuning)
    if (percentage >= 40) return "bg-accent-orange"; // Cukup (Oranye)
    return "bg-accent-danger"; // Perlu perbaikan (Merah)
  };

  return (
    <div className="w-full space-y-4">
      {levels.map((lvl) => (
        <div key={`lvl-bar-${lvl.level}`} className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold font-mono gap-2">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span className="px-1.5 py-0.5 bg-ink text-surface text-[10px] font-black uppercase flex-none">
                L{lvl.level}
              </span>
              <span className="text-ink font-sans font-bold truncate">
                {lvl.levelName}
              </span>
              <span className="text-ink/60 text-[10px] flex-none">
                (Bobot {lvl.weight}x)
              </span>
            </div>
            <span className="font-mono font-black text-sm text-ink flex-none ml-2">
              {lvl.percentage}%
            </span>
          </div>

          {/* Bar Neo-brutalism */}
          <div className="w-full h-5 bg-paper border-2 border-ink shadow-[2px_2px_0px_#0A0A0A] overflow-hidden relative">
            <div
              className={`h-full border-r-2 border-ink transition-all duration-700 ease-out ${getBarColor(
                lvl.percentage
              )}`}
              style={{ width: `${Math.max(4, lvl.percentage)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
