import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "white";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const variantStyles = {
    primary: "bg-accent-blue text-surface hover:bg-[#2b44ea]",
    secondary: "bg-accent-yellow text-ink hover:bg-[#e6c109]",
    danger: "bg-accent-danger text-surface hover:bg-[#e02828]",
    white: "bg-surface text-ink hover:bg-[#f2f2f2]",
    ghost: "bg-transparent text-ink hover:bg-accent-yellow",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm border-3 shadow-nb-sm",
    md: "px-5 py-2.5 text-base border-4 shadow-nb-md font-bold",
    lg: "px-7 py-3.5 text-lg md:text-xl border-4 shadow-nb-md font-bold",
  };

  return (
    <button
      className={`nb-btn inline-flex items-center justify-center gap-2 font-display tracking-tight text-center border-ink transition-all ${
        variantStyles[variant]
      } ${sizeStyles[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
