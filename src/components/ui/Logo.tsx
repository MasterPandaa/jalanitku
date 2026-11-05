import React from "react";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function Logo({ size = "md", className = "", href = "/", onClick }: LogoProps) {
  const sizeClasses = {
    sm: "text-2xl gap-1",
    md: "text-3xl md:text-4xl gap-1.5",
    lg: "text-4xl md:text-5xl gap-2",
    xl: "text-5xl md:text-7xl gap-3",
  };

  const badgeClasses = {
    sm: "border-2 shadow-[2px_2px_0_#0A0A0A] px-2 py-0.5",
    md: "border-3 md:border-4 shadow-[4px_4px_0_#0A0A0A] px-2.5 py-0.5",
    lg: "border-4 md:border-5 shadow-[6px_6px_0_#0A0A0A] px-3 py-1",
    xl: "border-5 md:border-7 shadow-[8px_8px_0_#0A0A0A] px-4 py-1.5",
  };

  const content = (
    <div
      className={`inline-flex items-center font-heading font-normal tracking-[-0.03em] leading-none text-ink select-none ${sizeClasses[size]} ${className}`}
      aria-label="JalanITku Logo"
    >
      <span>Jalan</span>
      <span
        className={`inline-block bg-accent-yellow text-ink border-ink -rotate-3 text-[1.12em] ${badgeClasses[size]}`}
      >
        IT
      </span>
      <span>ku</span>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className="inline-block transition-transform hover:-translate-y-0.5"
      >
        {content}
      </Link>
    );
  }

  return content;
}
