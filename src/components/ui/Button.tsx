import React from "react";
import Link from "next/link";

export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "white";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

export function getButtonStyles({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
}: ButtonStyleOptions = {}): string {
  const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-accent-blue text-surface hover:bg-[#2b44ea]",
    secondary: "bg-accent-yellow text-ink hover:bg-[#e6c109]",
    danger: "bg-accent-danger text-surface hover:bg-[#e02828]",
    white: "bg-surface text-ink hover:bg-[#f2f2f2]",
    ghost: "bg-transparent text-ink hover:bg-accent-yellow",
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm border-3 shadow-nb-sm",
    md: "px-5 py-2.5 text-base border-4 shadow-nb-md font-bold",
    lg: "px-7 py-3.5 text-lg md:text-xl border-4 shadow-nb-md font-bold",
  };

  return `nb-btn inline-flex items-center justify-center gap-2 font-display tracking-tight text-center border-ink transition-all ${
    variantStyles[variant]
  } ${sizeStyles[size]} ${fullWidth ? "w-full" : ""} ${className}`.trim();
}

export interface ButtonProps
  extends ButtonStyleOptions,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  target?: string;
  rel?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  href,
  disabled,
  target,
  rel,
  ...props
}: ButtonProps) {
  const classes = getButtonStyles({ variant, size, fullWidth, className });

  if (href) {
    const isExternal =
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:");

    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target={target}
          rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
          {...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={classes}
        target={target}
        rel={rel}
        {...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
