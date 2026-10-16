import React from "react";

export interface LikertScaleProps {
  value?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const scaleLabels = [
  { val: 1, label: "Sangat Tidak Suka / Tidak Cocok", short: "Sangat Tidak" },
  { val: 2, label: "Kurang Suka / Kurang Cocok", short: "Kurang" },
  { val: 3, label: "Biasa Saja / Netral", short: "Netral" },
  { val: 4, label: "Cukup Suka / Cukup Cocok", short: "Suka" },
  { val: 5, label: "Sangat Suka / Sangat Cocok", short: "Sangat Suka" },
];

export function LikertScale({ value, onChange, disabled = false }: LikertScaleProps) {
  return (
    <div className="w-full flex flex-col gap-3">
      {/* 5 Rating Buttons */}
      <div className="grid grid-cols-5 gap-2 md:gap-3">
        {scaleLabels.map((item) => {
          const isSelected = value === item.val;
          return (
            <button
              key={item.val}
              type="button"
              disabled={disabled}
              onClick={() => !disabled && onChange(item.val)}
              className={`nb-btn flex flex-col items-center justify-center py-3 md:py-4 border-3 border-ink transition-all ${
                isSelected
                  ? "bg-accent-yellow shadow-nb-md -translate-y-1"
                  : "bg-surface hover:bg-paper shadow-nb-sm"
              } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              aria-label={`${item.val} - ${item.label}`}
              aria-pressed={isSelected}
            >
              <span className="font-heading text-2xl md:text-3xl text-ink leading-none">
                {item.val}
              </span>
              <span className="hidden md:inline font-mono text-[11px] font-bold text-ink mt-1.5 uppercase text-center px-1">
                {item.short}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile/Bottom Indicator Label */}
      <div className="flex items-center justify-between text-xs font-mono font-bold text-ink/70 px-1">
        <span>← Sangat Tidak Cocok</span>
        <span>Sangat Cocok →</span>
      </div>

      {value && (
        <div className="bg-ink text-paper font-display text-sm font-bold text-center py-1.5 px-3 border border-ink mt-1">
          Pilihanmu: {value} — {scaleLabels.find((s) => s.val === value)?.label}
        </div>
      )}
    </div>
  );
}
