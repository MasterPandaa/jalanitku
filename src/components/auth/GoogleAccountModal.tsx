"use client";
        
        import React, { useState, useEffect } from "react";
        import { User as UserIcon, Plus, Check, ArrowRight, X, Loader2 } from "lucide-react";
        import { Button } from "@/components/ui/Button";
        
        export interface GoogleAccountOption {
          email: string;
          name: string;
          sub: string;
          avatarSeed: string;
          badge: string;
          badgeVariant: "demo" | "new";
          description: string;
        }
        
        const PRESET_ACCOUNTS: GoogleAccountOption[] = [
          {
            name: "Budi Santoso",
            email: "demo.student@gmail.com",
            sub: "google_sub_123456",
            avatarSeed: "budidev",
            badge: "Siap Pakai (@budidev)",
            badgeVariant: "demo",
            description: "Akun demo lengkap dengan kartu JalanID & Cocoklogiku.",
          },
          {
            name: "Siti Rahmawati",
            email: "siti.rahmawati@gmail.com",
            sub: "google_sub_siti_rahmawati",
            avatarSeed: "siti_rahmawati",
            badge: "Akun Baru (Tes Onboarding)",
            badgeVariant: "new",
            description: "Akun baru tanpa username. Akan diarahkan ke pemilihan username unik.",
          },
          {
            name: "Calon Talenta IT",
            email: "calon.talenta@gmail.com",
            sub: "google_sub_calon_talenta",
            avatarSeed: "calon_talenta",
            badge: "Akun Baru (Eksplorasi)",
            badgeVariant: "new",
            description: "Akun baru default untuk simulasi pendaftaran pertama kali.",
          },
        ];
        
        interface GoogleAccountModalProps {
          isOpen: boolean;
          onClose: () => void;
          onSelectAccount: (account: { email: string; name: string; sub?: string }) => Promise<void>;
          isProcessing: boolean;
        }
        
        export function GoogleAccountModal({
          isOpen,
          onClose,
          onSelectAccount,
          isProcessing,
        }: GoogleAccountModalProps) {
          const [showCustomForm, setShowCustomForm] = useState(false);
          const [customEmail, setCustomEmail] = useState("");
          const [customName, setCustomName] = useState("");
          const [activeSub, setActiveSub] = useState<string | null>(null);
        
          useEffect(() => {
            const handleKeyDown = (e: KeyboardEvent) => {
              if (e.key === "Escape" && isOpen && !isProcessing) {
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
          }, [isOpen, isProcessing, onClose]);
        
          if (!isOpen) return null;
        
          const handlePresetSelect = async (acc: GoogleAccountOption) => {
            if (isProcessing) return;
            setActiveSub(acc.sub);
            await onSelectAccount({
              email: acc.email,
              name: acc.name,
              sub: acc.sub,
            });
          };
        
          const handleCustomSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            if (isProcessing || !customEmail.trim()) return;
        
            const email = customEmail.trim().toLowerCase();
            const name = customName.trim() || email.split("@")[0];
            const sub = `google_sub_custom_${Date.now()}`;
            setActiveSub(sub);
        
            await onSelectAccount({ email, name, sub });
          };
        
          return (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/75 backdrop-blur-[2px] animate-fadeIn"
              role="dialog"
              aria-modal="true"
            >
              <div className="w-full max-w-lg bg-surface border-4 md:border-5 border-ink shadow-nb-lg p-6 md:p-8 flex flex-col gap-6 text-left animate-scaleUp max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="flex items-start justify-between gap-4 border-b-4 border-ink pb-4">
                  <div className="flex items-center gap-3">
                    {/* Google Multi-colored Icon */}
                    <div className="w-10 h-10 rounded-full bg-white border-2 border-ink flex items-center justify-center shadow-nb-sm flex-none">
                      <svg width="22" height="22" viewBox="0 0 24 24">
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
                    </div>
                    <div>
                      <h2 className="font-heading text-xl md:text-2xl text-ink leading-tight">
                        Pilih Akun Google
                      </h2>
                      <p className="font-sans text-xs md:text-sm text-ink/75">
                        untuk melanjutkan ke <strong>JalanITku</strong>
                      </p>
                    </div>
                  </div>
        
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isProcessing}
                    className="w-8 h-8 flex items-center justify-center font-bold text-base border-2 border-ink hover:bg-accent-yellow cursor-pointer flex-none transition-colors disabled:opacity-50"
                    aria-label="Tutup dialog"
                  >
                    <X size={18} />
                  </button>
                </div>
        
                {/* Content Section */}
                {isProcessing ? (
                  <div className="py-12 flex flex-col items-center justify-center gap-4 bg-paper border-3 border-ink p-6 text-center">
                    <Loader2 className="w-10 h-10 animate-spin text-ink" />
                    <div className="space-y-1">
                      <p className="font-heading text-lg text-ink">Menghubungkan ke Google...</p>
                      <p className="font-mono text-xs text-ink/70">
                        Memverifikasi sesi dan otentikasi akun Anda.
                      </p>
                    </div>
                  </div>
                ) : !showCustomForm ? (
                  <div className="space-y-4">
                    <p className="font-sans text-sm text-ink/80 leading-relaxed">
                      Pilih salah satu profil Google siap pakai atau masukkan email Google kustom untuk masuk:
                    </p>
        
                    <div className="space-y-2.5">
                      {PRESET_ACCOUNTS.map((acc) => {
                        const isSelected = activeSub === acc.sub;
                        return (
                          <button
                            key={acc.email}
                            type="button"
                            onClick={() => handlePresetSelect(acc)}
                            disabled={isProcessing}
                            className="w-full text-left bg-paper hover:bg-white border-3 border-ink p-3.5 transition-all duration-150 hover:translate-x-1 hover:shadow-nb-sm flex items-center justify-between gap-3 group cursor-pointer"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-10 h-10 rounded-full border-2 border-ink bg-accent-yellow flex items-center justify-center font-heading font-bold text-ink text-base flex-none group-hover:bg-accent-blue group-hover:text-paper transition-colors">
                                {acc.name.charAt(0)}
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-display font-bold text-sm text-ink truncate">
                                    {acc.name}
                                  </span>
                                  <span
                                    className={`text-[10px] font-mono font-bold px-1.5 py-0.2 border border-ink ${
                                      acc.badgeVariant === "demo"
                                        ? "bg-accent-green text-paper"
                                        : "bg-accent-pink text-ink"
                                    }`}
                                  >
                                    {acc.badge}
                                  </span>
                                </div>
                                <div className="font-mono text-xs text-ink/70 truncate">
                                  {acc.email}
                                </div>
                                <div className="text-[11px] text-ink/60 mt-0.5 hidden sm:block">
                                  {acc.description}
                                </div>
                              </div>
                            </div>
        
                            <ArrowRight
                              size={18}
                              className="text-ink/60 group-hover:text-ink group-hover:translate-x-1 transition-transform flex-none"
                            />
                          </button>
                        );
                      })}
                    </div>
        
                    {/* Custom Account Toggle Button */}
                    <button
                      type="button"
                      onClick={() => setShowCustomForm(true)}
                      className="w-full mt-2 py-3 px-4 border-2 border-dashed border-ink bg-paper/60 hover:bg-paper font-display font-bold text-sm text-ink flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Plus size={16} />
                      <span>Gunakan Akun Google Lain (Kustom)</span>
                    </button>
                  </div>
                ) : (
                  /* Custom Account Form */
                  <form onSubmit={handleCustomSubmit} className="space-y-4">
                    <div className="bg-paper border-3 border-ink p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-sm text-ink">
                          Masukkan Akun Google
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowCustomForm(false)}
                          className="font-mono text-xs text-ink/70 hover:underline cursor-pointer"
                        >
                          ← Kembali ke pilihan cepat
                        </button>
                      </div>
        
                      <div className="space-y-3">
                        <div>
                          <label className="block font-mono text-xs font-bold text-ink mb-1">
                            Email Google *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="nama.anda@gmail.com"
                            value={customEmail}
                            onChange={(e) => setCustomEmail(e.target.value)}
                            className="w-full p-2.5 bg-white border-2 border-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-accent-yellow"
                            autoFocus
                          />
                        </div>
        
                        <div>
                          <label className="block font-mono text-xs font-bold text-ink mb-1">
                            Nama Tampilan (Opsional)
                          </label>
                          <input
                            type="text"
                            placeholder="Contoh: Farhan Pratama"
                            value={customName}
                            onChange={(e) => setCustomName(e.target.value)}
                            className="w-full p-2.5 bg-white border-2 border-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-accent-yellow"
                          />
                          <p className="text-[11px] text-ink/60 mt-1">
                            Jika dikosongkan, nama akan diambil otomatis dari alamat email.
                          </p>
                        </div>
                      </div>
                    </div>
        
                    <div className="flex items-center justify-between gap-3 pt-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowCustomForm(false)}
                      >
                        Kembali
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        size="sm"
                        disabled={!customEmail.trim() || isProcessing}
                      >
                        Lanjutkan Masuk →
                      </Button>
                    </div>
                  </form>
                )}
        
                {/* Modal Footer Note */}
                <div className="border-t-2 border-ink/20 pt-3 text-[11px] font-sans text-ink/60 leading-relaxed">
                  🔒 Untuk memverifikasi akun Anda, Google akan membagikan nama, email, dan foto profil Anda ke <strong>JalanITku</strong>. Kami menjamin kerahasiaan dan privasi data Anda.
                </div>
              </div>
            </div>
          );
        }
        