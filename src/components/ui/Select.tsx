import React from "react";
import { AlertCircle, ChevronDown } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

export function Select({
  label,
  error,
  options,
  className = "",
  id,
  disabled,
  ...props
}: SelectProps) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label
          htmlFor={selectId}
          className="font-display font-bold text-base text-ink tracking-tight"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          disabled={disabled}
          className={`w-full min-h-[44px] bg-surface text-ink px-4 py-2.5 font-sans text-base border-3 border-ink shadow-nb-sm appearance-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-accent-blue focus:shadow-nb-md disabled:bg-paper/70 disabled:opacity-60 disabled:cursor-not-allowed ${
            error ? "border-accent-danger bg-accent-danger/5" : ""
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-ink">
          <ChevronDown className="w-5 h-5 stroke-[2.5]" />
        </div>
      </div>
      {error && (
        <p className="font-mono text-xs text-accent-danger font-bold mt-0.5 flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 stroke-[2.5] flex-none" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
