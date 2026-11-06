import React from "react";
import { Check, AlertTriangle, Info, X } from "lucide-react";

export interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose?: () => void;
}

export function Toast({ message, type = "info", onClose }: ToastProps) {
  const bgStyles = {
    success: "bg-accent-green text-ink",
    error: "bg-accent-danger text-surface",
    info: "bg-accent-yellow text-ink",
  };

  const icons = {
    success: <Check className="w-3.5 h-3.5 stroke-[3]" />,
    error: <AlertTriangle className="w-3.5 h-3.5 stroke-[2.5]" />,
    info: <Info className="w-3.5 h-3.5 stroke-[2.5]" />,
  };

  return (
    <div
      className={`inline-flex items-center gap-3 px-4 py-3 border-3 border-ink shadow-nb-md font-mono text-sm font-bold ${bgStyles[type]}`}
      role="alert"
    >
      <span className="w-6 h-6 flex items-center justify-center bg-ink text-surface text-xs font-bold border-2 border-ink flex-none shadow-[1px_1px_0_#0A0A0A]">
        {icons[type]}
      </span>
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-2 p-1 font-bold hover:bg-ink/10 transition-colors cursor-pointer flex items-center justify-center"
          aria-label="Tutup notifikasi"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>
      )}
    </div>
  );
}
