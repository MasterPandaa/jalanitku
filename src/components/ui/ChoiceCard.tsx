import React from "react";
import { Check } from "lucide-react";

export interface ChoiceCardProps {
  id: string;
  labelKey: string; // e.g. "A", "B", "C", "D", "E"
  text: string;
  selected?: boolean;
  onSelect: (id: string) => void;
  disabled?: boolean;
}

export function ChoiceCard({
  id,
  labelKey,
  text,
  selected = false,
  onSelect,
  disabled = false,
}: ChoiceCardProps) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onSelect(id)}
      disabled={disabled}
      className={`nb-btn min-h-[48px] w-full text-left p-4 md:p-5 border-3 md:border-4 border-ink transition-all flex items-start gap-3.5 sm:gap-4 ${
        selected
          ? "bg-accent-yellow shadow-nb-md translate-x-1"
          : "bg-surface shadow-nb-sm hover:bg-paper"
      } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
      aria-pressed={selected}
    >
      <span
        className={`flex-none w-9 h-9 flex items-center justify-center font-heading text-lg border-2 border-ink ${
          selected ? "bg-ink text-accent-yellow" : "bg-paper text-ink"
        }`}
      >
        {labelKey}
      </span>
      <span className="flex-1 font-sans font-medium text-base md:text-lg text-ink pt-0.5 leading-snug">
        {text}
      </span>
      {selected && (
        <span className="flex-none w-6 h-6 flex items-center justify-center bg-ink text-surface border-2 border-ink shadow-[1px_1px_0_#0A0A0A] mt-1.5">
          <Check className="w-4 h-4 stroke-[3]" />
        </span>
      )}
    </button>
  );
}
