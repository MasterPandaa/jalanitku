import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({
  label,
  error,
  helperText,
  className = "",
  id,
  disabled,
  ...props
}: InputProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label
          htmlFor={inputId}
          className="font-display font-bold text-base text-ink tracking-tight flex items-center justify-between"
        >
          <span>{label}</span>
          {props.required && <span className="text-accent-danger font-mono text-xs">*Wajib</span>}
        </label>
      )}
      <input
        id={inputId}
        disabled={disabled}
        className={`w-full bg-surface text-ink px-4 py-2.5 font-sans text-base border-3 border-ink shadow-nb-sm placeholder:text-ink/40 transition-all focus:outline-none focus:ring-4 focus:ring-accent-blue focus:shadow-nb-md disabled:bg-gray-100 disabled:cursor-not-allowed ${
          error ? "border-accent-danger bg-red-50" : ""
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="font-mono text-xs text-accent-danger font-bold mt-0.5">⚠️ {error}</p>
      )}
      {helperText && !error && (
        <p className="font-mono text-xs text-ink/70 mt-0.5">{helperText}</p>
      )}
    </div>
  );
}
