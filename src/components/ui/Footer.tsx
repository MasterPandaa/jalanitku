"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Dialog } from "./Dialog";
import { getDictionary } from "@/lib/i18n";

export function Footer() {
  const dict = getDictionary();
  const [modalContent, setModalContent] = useState<{ title: string; desc: string } | null>(null);

  const handleOpenPrivacy = (e: React.MouseEvent) => {
    e.preventDefault();
    setModalContent({
      title: "Kebijakan Privasi JalanITku",
      desc: "JalanITku menjunjung tinggi privasi Anda sesuai amanat UU Perlindungan Data Pribadi (UU PDP No. 27/2022). Data email dan identitas akun Google Anda murni digunakan untuk keperluan autentikasi dan menyimpan progres pengujian pribadi. JalanITku tidak menyediakan profil publik yang dapat dilacak pihak luar, serta tidak pernah memperjualbelikan data pengguna.",
    });
  };

  const handleOpenTerms = (e: React.MouseEvent) => {
    e.preventDefault();
    setModalContent({
      title: "Syarat & Ketentuan Layanan",
      desc: "Seluruh layanan JalanKarir dan JalanRapor disediakan 100% gratis untuk memajukan talenta digital Indonesia. Hasil evaluasi kompetensi teknis dan kecocokan role merupakan panduan belajar yang dirancang sebagai sarana uji mandiri. Kartu JalanID dan Cocoklogiku diunduh secara lokal oleh pengguna.",
    });
  };

  return (
    <footer className="w-full bg-paper border-t-4 md:border-t-5 border-ink py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex flex-col items-start gap-3 max-w-md">
          <Logo size="sm" />
          <p className="font-sans text-sm md:text-base text-ink/80 leading-relaxed">
            {dict.footer.tagline}
          </p>
        </div>

        <div className="flex flex-col md:items-end gap-3 font-mono text-xs md:text-sm text-ink/80">
          <div className="flex flex-wrap gap-4 font-bold">
            <button
              type="button"
              onClick={handleOpenPrivacy}
              className="hover:underline cursor-pointer text-ink font-bold"
            >
              {dict.footer.privacy}
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={handleOpenTerms}
              className="hover:underline cursor-pointer text-ink font-bold"
            >
              {dict.footer.terms}
            </button>
            <span>·</span>
            <Link href="/status" className="hover:underline text-ink font-bold">
              Status HTTP
            </Link>
            <span>·</span>
            <a href="mailto:halo@jalanitku.id" className="hover:underline">
              Kontak
            </a>
          </div>
          <div>{dict.footer.copyright}</div>
        </div>
      </div>

      <Dialog
        isOpen={Boolean(modalContent)}
        onClose={() => setModalContent(null)}
        onConfirm={() => setModalContent(null)}
        title={modalContent?.title || ""}
        description={modalContent?.desc || ""}
        confirmLabel="Paham & Tutup"
        cancelLabel="Tutup"
        variant="primary"
      />
    </footer>
  );
}
