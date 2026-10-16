import React from "react";

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
    success: "✓",
    error: "✕",
    info: "ℹ",
  };

  return (
    <div
      className={`inline-flex items-center gap-3 px-4 py-3 border-3 border-ink shadow-nb-md font-mono text-sm font-bold ${bgStyles[type]}`}
      role="alert"
    >
      <span className="w-5 h-5 flex items-center justify-center bg-ink text-surface text-xs font-bold border border-ink">
        {icons[type]}
      </span>
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-2 font-bold hover:underline cursor-pointer"
          aria-label="Tutup notifikasi"
        >
          ✕
        </button>
      )}
    </div>
  );
}
