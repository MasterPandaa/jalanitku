import React from "react";

export interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  className?: string;
}

export function ProgressBar({ current, total, label, className = "" }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, Math.round((current / total) * 100)));

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      <div className="flex items-center justify-between font-mono text-xs md:text-sm font-bold text-ink">
        <span>{label || `Progress: ${current} / ${total}`}</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full h-5 md:h-6 bg-surface border-3 border-ink shadow-nb-sm overflow-hidden p-0.5">
        <div
          className="h-full bg-accent-green transition-all duration-300 ease-out border-r-2 border-ink"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={0}
          aria-valuemax={total}
        />
      </div>
    </div>
  );
}
