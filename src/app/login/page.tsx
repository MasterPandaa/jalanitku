"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AlertCircle, ArrowLeft, Lightbulb, Loader2, UserCog } from "lucide-react";
import { JalanMin } from "@/components/mascot/JalanMin";
import { GoogleAccountModal } from "@/components/auth/GoogleAccountModal";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [realOAuthEnabled, setRealOAuthEnabled] = useState(false);

  useEffect(() => {
    // Check if real Google OAuth is configured via GCP env vars
    fetch("/api/auth/google/config")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.realOAuthEnabled) {
          setRealOAuthEnabled(true);
        }
      })
      .catch(() => {});

    // Check query params for error
    const err = searchParams.get("error");
    if (err === "invalid_state") {
      setErrorMessage("Sesi autentikasi kedaluwarsa. Silakan coba lagi.");
    } else if (err === "token_failed" || err === "oauth_error") {
      setErrorMessage("Gagal menyinkronkan akun dengan Google.");
    }
  }, [searchParams]);

  const handleStartLogin = () => {
    setErrorMessage("");
    if (realOAuthEnabled) {
      window.location.href = "/api/auth/google";
    } else {
      setIsModalOpen(true);
    }
  };

  const handleAccountSelected = async (account: { email: string; name: string; sub?: string }) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: account.email,
          name: account.name,
          sub: account.sub,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        if (data.data.needsOnboarding) {
          router.push("/onboarding");
        } else {
          router.push("/dashboard");
        }
      } else {
        setErrorMessage(data.error?.message || "Gagal masuk.");
      }
    } catch {
      setErrorMessage("Terjadi gangguan jaringan saat menghubungi server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col justify-between p-4 md:p-8">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Logo size="md" />
        <Link
          href="/"
          className="nb-link inline-flex items-center gap-2 font-display font-bold text-sm md:text-base px-3 py-1.5 border-3 border-ink bg-surface shadow-nb-sm"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          Kembali ke Beranda
        </Link>
      </div>

      <div className="animate-fade-up w-full max-w-md mx-auto my-12">
        <Card variant="white" shadow="lg" borderWidth="5" className="flex flex-col items-center text-center gap-6 p-6 sm:p-8">
          <div className="relative transition-transform duration-200 hover:scale-105">
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

          {errorMessage && (
            <div
              role="alert"
              className="animate-scaleUp w-full bg-accent-danger text-surface border-3 border-ink shadow-nb-sm p-3 text-left font-mono text-xs font-bold flex items-start gap-3 -rotate-1"
            >
              <div className="w-7 h-7 border-2 border-ink bg-surface text-accent-danger flex items-center justify-center flex-none">
                <AlertCircle className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="pt-1 leading-snug">{errorMessage}</span>
            </div>
          )}

          <div className="w-full space-y-4">
            <Button
              variant="white"
              size="lg"
              fullWidth
              disabled={loading}
              onClick={handleStartLogin}
              className="flex items-center justify-center gap-3 py-3 border-4 hover:bg-white"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 stroke-[2.5] animate-spin flex-none" />
              ) : (
              /* Google G Icon */
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
              )}
              <span>{loading ? "Memproses..." : "Masuk dengan Google"}</span>
            </Button>
          </div>

          <div className="w-full border-t-3 border-dashed border-ink pt-4 flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-ink/80">
              <div className="w-6 h-6 border-2 border-ink bg-accent-yellow shadow-[2px_2px_0_#0A0A0A] flex items-center justify-center text-ink flex-none">
                <Lightbulb className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <span>{realOAuthEnabled ? "Mode Google OAuth GCP Aktif" : "Mode Google Account Chooser Aktif"}</span>
            </div>
            <Button
              variant="secondary"
              size="sm"
              fullWidth
              disabled={loading}
              onClick={() => setIsModalOpen(true)}
              className="text-xs sm:text-sm"
            >
              <UserCog className="w-4 h-4 stroke-[2.5] flex-none" />
              <span>Pilih Profil Cepat (Demo &amp; Onboarding Baru)</span>
            </Button>
          </div>

          <div className="font-mono text-xs text-ink/70">
            Gratis penuh · Privasi terjaga · Email tidak dipublikasikan
          </div>
        </Card>
      </div>

      <div className="text-center font-mono text-xs text-ink/60 pb-2">
        © 2026 JalanITku. Masuk dengan Google OAuth 2.0
      </div>

      {/* Google Account Selector Dialog */}
      <GoogleAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectAccount={handleAccountSelected}
        isProcessing={loading}
      />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-paper flex items-center justify-center p-6">
          <div className="bg-surface border-4 border-ink shadow-nb-md p-8 flex flex-col items-center gap-4">
            <JalanMin state="idle" size={100} />
            <div className="font-mono text-sm font-bold animate-pulse">Menyiapkan Halaman Masuk...</div>
          </div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
