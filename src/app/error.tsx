"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error secara aman
    const errorDetails =
      error instanceof Error
        ? { message: error.message, stack: error.stack }
        : typeof error === "object" && error !== null
        ? JSON.stringify(error, Object.getOwnPropertyNames(error))
        : String(error);
    console.error("JalanITku App Error Boundary Caught:", errorDetails);
  }, [error]);

  const displayMessage =
    error?.message ||
    (typeof error === "object" && error !== null
      ? (error as any).type
        ? `Event error: ${(error as any).type}`
        : JSON.stringify(error)
      : String(error));

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6 bg-[#F4F0EA]">
      <div className="max-w-md w-full bg-white border-4 border-[#0A0A0A] shadow-[8px_8px_0px_#0A0A0A] p-6 space-y-4">
        <div className="inline-block bg-[#FF4B4B] text-white px-2.5 py-0.5 font-mono text-xs font-bold uppercase">
          Terjadi Kendala
        </div>
        <h2 className="font-heading font-black text-2xl text-[#0A0A0A]">
          Oops! Terjadi Gangguan Tampilan
        </h2>
        <p className="text-xs font-mono text-gray-700 bg-gray-100 p-3 border-2 border-[#0A0A0A] break-words">
          {displayMessage === "[object Event]"
            ? "Event browser tidak terduga terdeteksi. Silakan muat ulang halaman."
            : displayMessage}
        </p>
        <div className="pt-2 flex gap-3">
          <Button variant="primary" onClick={() => reset()}>
            Coba Lagi
          </Button>
          <Button variant="white" onClick={() => window.location.reload()}>
            Muat Ulang Halaman
          </Button>
        </div>
      </div>
    </div>
  );
}
