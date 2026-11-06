"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Check, ArrowRight, Lightbulb } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { JalanMin } from "@/components/mascot/JalanMin";

export default function OnboardingPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Verify user is authenticated and actually needs onboarding
          useEffect(() => {
            fetch("/api/me")
              .then((res) => {
                if (!res.ok) throw new Error("Unauthenticated");
                return res.json();
              })
              .then((data) => {
                if (data.success && data.data?.username) {
                  router.push("/dashboard");
                }
              })
              .catch(() => {
                router.push("/login");
              });
          }, [router]);
        

  // Debounced username availability check
  const checkUsername = useCallback(async (val: string) => {
    if (!val || val.length < 3) {
      setAvailable(null);
      setErrorMsg(val ? "Minimal 3 karakter." : "");
      return;
    }

    setChecking(true);
    try {
      const res = await fetch(`/api/username/check?q=${encodeURIComponent(val)}`);
      const data = await res.json();
      if (data.success) {
        setAvailable(data.data.available);
        setErrorMsg(data.data.available ? "" : data.data.message);
      }
    } catch {
      setErrorMsg("Gagal memeriksa username.");
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (username) {
        checkUsername(username);
      } else {
        setAvailable(null);
        setErrorMsg("");
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [username, checkUsername]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!available || submitting) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/me/username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();
      if (data.success) {
        router.push("/dashboard");
      } else {
        setErrorMsg(data.error?.message || "Gagal menyimpan username.");
      }
    } catch {
      setErrorMsg("Terjadi kesalahan jaringan.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col justify-between p-4 md:p-8">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Logo size="md" />
      </div>

      <div className="w-full max-w-lg mx-auto my-12">
        <Card variant="white" shadow="lg" borderWidth="5" className="p-8 md:p-10 flex flex-col gap-6">
          <div className="flex items-center gap-4 border-b-4 border-ink pb-6">
            <JalanMin state="happy" size={90} className="flex-none" />
            <div>
              <div className="inline-block bg-accent-yellow border-2 border-ink px-2 py-0.5 font-mono font-bold text-xs uppercase mb-1">
                Langkah 1 Dari 1
              </div>
              <h1 className="font-heading text-2xl md:text-3xl text-ink leading-tight">
                Pilih Username Unikmu
              </h1>
            </div>
          </div>

          <p className="font-sans text-sm md:text-base text-ink/80 leading-relaxed">
            Username ini akan tertera pada kartu digital <strong>JalanID</strong> dan rapor{" "}
            <strong>Cocoklogiku</strong> milikmu. Tenang, kamu bisa mengubahnya kapan saja nanti!
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                label="Username Pilihan"
                placeholder="misal: dev_hebat"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                error={errorMsg}
                helperText="Hanya boleh huruf (a-z), angka (0-9), titik (.), dan garis bawah (_)."
                required
                autoFocus
                autoComplete="username"
                spellCheck={false}
                autoCapitalize="none"
              />

              <div className="mt-2 min-h-[24px] font-mono text-xs">
                {checking && <span className="text-ink/60">Sedang memeriksa ketersediaan…</span>}
                {!checking && available === true && (
                  <span className="text-accent-green font-bold bg-ink px-2 py-0.5 inline-flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Username &quot;{username}&quot; tersedia!</span>
                  </span>
                )}
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={!available || submitting || checking}
              className="inline-flex items-center justify-center gap-2"
            >
              <span>{submitting ? "Menyimpan…" : "Lanjut ke Dashboard"}</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </Button>
          </form>

          <div className="bg-paper border-2 border-ink p-3 font-mono text-xs text-ink/70 flex items-start gap-2">
            <Lightbulb className="w-4 h-4 stroke-[2.5] text-accent-yellow flex-none mt-0.5" />
            <div>
              <strong>Info:</strong> Email Google milikmu tidak akan pernah ditampilkan di kartu JalanID
              maupun dibagikan kepada publik.
            </div>
          </div>
        </Card>
      </div>

      <div className="text-center font-mono text-xs text-ink/60 pb-2">
        © 2026 JalanITku · Pengaturan Username Akun
      </div>
    </div>
  );
}
