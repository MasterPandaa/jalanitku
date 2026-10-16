import React from "react";
import { Logo } from "./Logo";
import { getDictionary } from "@/lib/i18n";

export function Footer() {
  const dict = getDictionary();

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
            <a href="#privasi" className="hover:underline">
              {dict.footer.privacy}
            </a>
            <span>·</span>
            <a href="#syarat" className="hover:underline">
              {dict.footer.terms}
            </a>
            <span>·</span>
            <a href="mailto:halo@jalanitku.id" className="hover:underline">
              Kontak
            </a>
          </div>
          <div>{dict.footer.copyright}</div>
        </div>
      </div>
    </footer>
  );
}
