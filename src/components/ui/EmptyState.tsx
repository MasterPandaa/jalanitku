import React from "react";
import { PackageOpen } from "lucide-react";
import { Button } from "./Button";

export interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <div className="w-full bg-surface border-4 border-ink shadow-nb-md p-8 md:p-12 flex flex-col items-center text-center gap-4 max-w-lg mx-auto">
      <div className="w-16 h-16 bg-accent-yellow border-3 border-ink shadow-nb-sm flex items-center justify-center font-heading transition-transform duration-200 hover:-rotate-6 hover:scale-105">
        {icon || <PackageOpen className="w-8 h-8 stroke-[2.5] text-ink" />}
      </div>
      <h4 className="font-display font-bold text-xl md:text-2xl text-ink">{title}</h4>
      <p className="font-sans text-sm md:text-base text-ink/75 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction} className="mt-2">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
