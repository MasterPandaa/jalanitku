import React from "react";

export interface TabItem {
  id: string;
  label: string;
}

export interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ items, activeId, onChange, className = "" }: TabsProps) {
  return (
    <div className={`flex flex-wrap items-center gap-2 border-b-3 border-ink pb-2 ${className}`}>
      {items.map((tab) => {
        const isActive = activeId === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`nb-btn px-4 py-2 font-display font-bold text-sm md:text-base border-3 border-ink transition-all ${
              isActive
                ? "bg-accent-yellow text-ink shadow-nb-sm -translate-y-0.5"
                : "bg-surface text-ink hover:bg-paper"
            }`}
            aria-selected={isActive}
            role="tab"
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
