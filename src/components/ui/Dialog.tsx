import React, { useEffect } from "react";
import { Button } from "./Button";

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "primary";
}

export function Dialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Lanjutkan",
  cancelLabel = "Batal",
  variant = "danger",
}: DialogProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-none animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md bg-surface border-4 md:border-5 border-ink shadow-nb-lg p-6 md:p-8 flex flex-col gap-5 text-left animate-scaleUp">
        <div className="flex items-start justify-between gap-3 border-b-3 border-ink pb-3">
          <h3 className="font-display font-bold text-xl md:text-2xl text-ink leading-tight">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center font-bold text-lg border-2 border-ink hover:bg-accent-yellow cursor-pointer"
            aria-label="Tutup modal"
          >
            ✕
          </button>
        </div>

        <p className="font-sans text-base text-ink/90 leading-relaxed">{description}</p>

        <div className="flex items-center justify-end gap-3 pt-3">
          <Button variant="ghost" size="sm" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant === "danger" ? "danger" : "primary"}
            size="sm"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
