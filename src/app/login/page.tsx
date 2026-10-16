"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { JalanMin } from "@/components/mascot/JalanMin";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [customEmail, setCustomEmail] = useState("");
  const [customName, setCustomName] = useState("");

  const handleGoogleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: customEmail || "user.it@gmail.com",
          name: customName || "Calon Talenta IT",
        }),
      });

      const data = await res.json();
      if (data.success) {
        if (data.data.needsOnboarding) {
          router.push("/onboarding");
        } else {
          router.push("/dashboard");
        }
      } else {
        alert(data.error?.message || "Gagal masuk");
      }
    } catch {
      alert("Terjadi kesalahan jaringan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col justify-between p-4 md:p-8">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Logo size="md" />
        <Link href="/" className="nb-link font-display font-bold text-sm md:text-base px-3 py-1.5 border-3 border-ink bg-surface">
          ← Kembali ke Beranda
        </Link>
      </div>

      <div className="w-full max-w-md mx-auto my-12">
        <Card variant="white" shadow="lg" borderWidth="5" className="flex flex-col items-center text-center gap-6 p-8">
          <div className="relative">
            <JalanMin state="idle" size={140} />
          </div>

          <div>
            <h1 className="font-heading text-3xl md:text-4xl text-ink leading-tight">
              Masuk ke JalanITku
            </h1>
            <p className="font-sans text-sm md:text-base text-ink/75 mt-2 leading-relaxed">
              Masuk satu klik dengan Google untuk menyimpan progres tes dan kartu JalanID milikmu.
            </p>
          </div>

          <div className="w-full space-y-4">
            <Button
              variant="white"
              size="lg"
              fullWidth
              disabled={loading}
              onClick={() => handleGoogleLogin()}
              className="flex items-center justify-center gap-3 py-3 border-4"
            >
              {/* Google G Icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" className="flex-none">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{loading ? "Memproses..." : "Masuk dengan Google"}</span>
            </Button>
          </div>

          <div className="w-full border-t-2 border-ink/20 pt-4">
            <details className="text-left font-mono text-xs text-ink/70">
              <summary className="cursor-pointer hover:underline font-bold text-center">
                ⚙️ Opsi Akun Uji Coba (Dev Simulation)
              </summary>
              <div className="mt-3 space-y-2 bg-paper p-3 border-2 border-ink">
                <input
                  type="email"
                  placeholder="Email uji coba (opsional)"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  className="w-full p-1.5 border border-ink text-xs bg-white"
                />
                <input
                  type="text"
                  placeholder="Nama tampilan (opsional)"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full p-1.5 border border-ink text-xs bg-white"
                />
                <p className="text-[10px] text-ink/60">
                  Secara default otomatis membuat akun baru dan mengarahkan ke onboarding username.
                </p>
              </div>
            </details>
          </div>

          <div className="font-mono text-xs text-ink/60">
            Gratis penuh · Privasi terjaga · Email tidak dipublikasikan
          </div>
        </Card>
      </div>

      <div className="text-center font-mono text-xs text-ink/60 pb-2">
        © 2026 JalanITku. Masuk dengan Google OAuth 2.0
      </div>
    </div>
  );
}
