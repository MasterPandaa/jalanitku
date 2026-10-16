import React from "react";

export interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

export function Skeleton({ className = "", width = "w-full", height = "h-6" }: SkeletonProps) {
  return (
    <div
      className={`bg-ink/10 border-2 border-ink animate-pulse ${width} ${height} ${className}`}
      aria-hidden="true"
    />
  );
}
