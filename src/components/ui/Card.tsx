import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "white" | "yellow" | "pink" | "blue" | "paper";
  shadow?: "sm" | "md" | "lg" | "none";
  borderWidth?: "3" | "4" | "5";
}

export function Card({
  children,
  variant = "white",
  shadow = "md",
  borderWidth = "4",
  className = "",
  ...props
}: CardProps) {
  const bgStyles = {
    white: "bg-surface text-ink",
    yellow: "bg-accent-yellow text-ink",
    pink: "bg-accent-pink text-surface",
    blue: "bg-accent-blue text-surface",
    paper: "bg-paper text-ink",
  };

  const shadowStyles = {
    none: "shadow-none",
    sm: "shadow-nb-sm",
    md: "shadow-nb-md",
    lg: "shadow-nb-lg",
  };

  const borderStyles = {
    "3": "border-3",
    "4": "border-4",
    "5": "border-5",
  };

  return (
    <div
      className={`border-ink ${borderStyles[borderWidth]} ${shadowStyles[shadow]} ${bgStyles[variant]} p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
