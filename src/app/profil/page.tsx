"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RotateCcw, ArrowLeft } from "lucide-react";
import { AppNavbar } from "@/components/ui/AppNavbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Dialog } from "@/components/ui/Dialog";
import { Toast } from "@/components/ui/Toast";
import { Footer } from "@/components/ui/Footer";
import { JalanMin } from "@/components/mascot/JalanMin";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [newUsername, setNewUsername] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const loadProfile = React.useCallback(() => {
    setLoading(true);
    setLoadError(null);
    fetch("/api/me")
      .then((res) => {
        if (res.status === 401) {
          router.push("/login");
          return null;
        }
        if (!res.ok) throw new Error("Gagal mengambil data akun.");
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        if (data.success && data.data) {
          setUser(data.data);
          setNewUsername(data.data.username || "");
        }
      })
      .catch((err) => {
        setLoadError(err.message || "Terjadi gangguan saat memuat data profil.");
      })
      .finally(() => setLoading(false));
  }, [router]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleUpdateUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername || saving) return;

    setSaving(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/me/username", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: newUsername }),
      });

      const data = await res.json();
      if (data.success) {
        setUser((prev: any) => ({ ...prev, username: data.data.user.username }));
        setToastType("success");
        setToastMsg("Username berhasil diperbarui!");
      } else {
        setErrorMsg(data.error?.message || "Gagal memperbarui username.");
      }
    } catch {
      setErrorMsg("Terjadi kesalahan jaringan.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await fetch("/api/me/delete", { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setToastType("success");
        setToastMsg("Akun berhasil dihapus. Mengalihkan ke beranda…");
        setTimeout(() => {
          router.push("/");
        }, 1200);
      } else {
        setToastType("error");
        setToastMsg(data.error?.message || "Gagal menghapus akun.");
      }
    } catch {
      setToastType("error");
      setToastMsg("Gagal menghapus akun. Terjadi gangguan jaringan.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center p-6">
        <div className="bg-surface border-4 border-ink shadow-nb-md p-8 flex flex-col items-center gap-4 text-center">
          <JalanMin state="idle" size={90} />
          <div className="font-mono text-sm font-bold animate-pulse text-ink">Memuat data profil…</div>
        </div>
      </div>
    );
  }

  if (loadError && !user) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center p-6">
        <div className="bg-surface border-4 border-ink shadow-nb-lg p-8 max-w-md w-full flex flex-col items-center gap-4 text-center animate-fade-in">
          <JalanMin state="neutral" size={90} />
          <h2 className="font-heading font-black text-2xl text-ink">Gagal Memuat Profil</h2>
          <p className="font-sans text-sm text-ink/80 leading-relaxed">{loadError}</p>
          <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full">
            <Button variant="primary" size="md" fullWidth onClick={loadProfile} className="inline-flex items-center justify-center gap-2">
              <span>Coba Lagi</span>
              <RotateCcw className="w-4 h-4 stroke-[2.5]" />
            </Button>
            <Button variant="white" size="md" fullWidth href="/login">
              Ke Halaman Masuk
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col justify-between">
      <AppNavbar user={user} />

      <main className="max-w-2xl mx-auto px-4 py-8 w-full space-y-6">
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="nb-btn px-4 py-2 bg-surface text-ink border-3 border-ink shadow-nb-sm font-display font-bold text-sm hover:bg-accent-yellow inline-flex items-center gap-2 transition-all hover:-translate-x-0.5"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            <span>Kembali ke Dashboard</span>
          </Link>
        </div>
        {toastMsg && (
          <div className="animate-fadeIn">
            <Toast type={toastType} message={toastMsg} onClose={() => setToastMsg("")} />
          </div>
        )}

        <Card variant="white" shadow="lg" borderWidth="5" className="animate-fade-up nb-card-hover p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-4 border-b-4 border-ink pb-6">
            <JalanMin state="neutral" size={80} className="flex-none transition-transform duration-200 hover:scale-105" />
            <div>
              <div className="inline-block bg-accent-yellow border-2 border-ink px-2 py-0.5 font-mono text-xs font-bold uppercase mb-1">
                Pengaturan Akun
              </div>
              <h1 className="font-heading text-2xl md:text-3xl text-ink leading-tight">
                Profil &amp; Identitas
              </h1>
            </div>
          </div>

          <form onSubmit={handleUpdateUsername} className="space-y-4">
            <Input
              label="Ubah Username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              error={errorMsg}
              helperText="Username lama akan dilepas dan dapat diambil pengguna lain."
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={saving || newUsername === user.username}
            >
              {saving ? "Menyimpan…" : "Simpan Perubahan Username"}
            </Button>
          </form>

          <div className="pt-6 border-t-3 border-ink/20 space-y-3 font-mono text-xs text-ink/70">
            <div>
              <strong>Informasi Privasi:</strong> Email terdaftar milikmu dirahasiakan dan tidak pernah
              dibagikan ke siapa pun. Kartu JalanID dan rapor Cocoklogiku murni dibagikan sebagai file
              gambar/dokumen oleh dirimu sendiri.
            </div>
          </div>
        </Card>

        {/* Zona Bahaya - Hapus Akun */}
        <Card variant="white" shadow="md" borderWidth="4" className="animate-fade-up-1 nb-card-hover border-accent-danger p-6 space-y-4">
          <div className="flex items-center justify-between border-b-2 border-accent-danger pb-3">
            <h3 className="font-display font-bold text-lg text-accent-danger">
              Zona Bahaya · Hapus Akun
            </h3>
            <span className="font-mono text-xs bg-accent-danger/15 text-accent-danger border border-accent-danger px-2 py-0.5 font-bold">
              Permanen
            </span>
          </div>
          <p className="font-sans text-sm text-ink/80 leading-relaxed">
            Menghapus akun akan membersihkan semua data sesi, hasil JalanID, dan rapor Cocoklogiku
            milikmu secara permanen sesuai dengan ketentuan UU PDP. Tindakan ini tidak dapat dibatalkan.
          </p>
          <Button
            variant="danger"
            size="sm"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            Hapus Akun &amp; Seluruh Data
          </Button>
        </Card>
      </main>

      <Footer />

      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteAccount}
        title="Yakin Ingin Menghapus Akun?"
        description="Semua data termasuk akun, progres tes, JalanID, dan Cocoklogiku akan dihapus selamanya dari sistem JalanITku."
        confirmLabel="Ya, Hapus Akun Saya"
        cancelLabel="Batal"
        variant="danger"
      />
    </div>
  );
}
