import React from "react";

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
          className={`w-full bg-surface text-ink px-4 py-2.5 font-sans text-base border-3 border-ink shadow-nb-sm appearance-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-accent-blue focus:shadow-nb-md disabled:bg-gray-100 disabled:cursor-not-allowed ${
            error ? "border-accent-danger bg-red-50" : ""
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-ink font-bold">
          ▼
        </div>
      </div>
      {error && (
        <p className="font-mono text-xs text-accent-danger font-bold mt-0.5">⚠️ {error}</p>
      )}
    </div>
  );
}
