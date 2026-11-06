import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "yellow" | "pink" | "blue" | "green" | "orange" | "ink" | "white" | "cyan";
  size?: "sm" | "md";
}

export function Badge({
  children,
  variant = "yellow",
  size = "md",
  className = "",
  ...props
}: BadgeProps) {
  const variantStyles = {
    yellow: "bg-accent-yellow text-ink border-ink",
    pink: "bg-accent-pink text-ink border-ink",
    blue: "bg-accent-blue text-surface border-ink",
    green: "bg-accent-green text-ink border-ink",
    orange: "bg-accent-orange text-ink border-ink",
    ink: "bg-ink text-paper border-ink",
    white: "bg-surface text-ink border-ink",
    cyan: "bg-accent-cyan text-ink border-ink",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs font-mono font-bold border-2 shadow-[2px_2px_0_#0A0A0A]",
    md: "px-3 py-1 text-xs md:text-sm font-mono font-bold border-3 shadow-nb-sm",
  };

  return (
    <span
      className={`inline-flex items-center uppercase tracking-wider select-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
