"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
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
  const [saving, setSaving] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetch("/api/me")
      .then((res) => {
        if (!res.ok) throw new Error("Unauthenticated");
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setUser(data.data);
          setNewUsername(data.data.username || "");
        }
      })
      .catch(() => router.push("/login"));
  }, [router]);

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
        alert("Akun berhasil dihapus.");
        router.push("/");
      }
    } catch {
      alert("Gagal menghapus akun.");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center p-6">
        <div className="font-mono text-sm font-bold animate-pulse">Memuat data profil...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col justify-between">
      <header className="bg-surface border-b-4 border-ink sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between gap-4">
          <Logo size="md" />
          <Link
            href="/dashboard"
            className="nb-btn px-4 py-2 bg-paper text-ink border-3 border-ink shadow-nb-sm font-display font-bold text-sm hover:bg-accent-yellow"
          >
            ← Kembali ke Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12 w-full space-y-8">
        {toastMsg && (
          <div className="animate-fadeIn">
            <Toast type="success" message={toastMsg} onClose={() => setToastMsg("")} />
          </div>
        )}

        <Card variant="white" shadow="lg" borderWidth="5" className="p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-4 border-b-4 border-ink pb-6">
            <JalanMin state="neutral" size={80} className="flex-none" />
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
              {saving ? "Menyimpan..." : "Simpan Perubahan Username"}
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
        <Card variant="white" shadow="md" borderWidth="4" className="border-accent-danger p-6 space-y-4">
          <div className="flex items-center justify-between border-b-2 border-accent-danger pb-3">
            <h3 className="font-display font-bold text-lg text-accent-danger">
              Zona Bahaya · Hapus Akun
            </h3>
            <span className="font-mono text-xs bg-red-100 text-accent-danger px-2 py-0.5 font-bold">
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
