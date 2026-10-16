import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { getDictionary } from "@/lib/i18n";

export interface NavbarProps {
  user?: {
    username: string;
    avatar_url?: string;
  } | null;
  onLoginClick?: () => void;
}

export function Navbar({ user, onLoginClick }: NavbarProps) {
  const dict = getDictionary();

  return (
    <header className="w-full bg-paper border-b-4 md:border-b-5 border-ink sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 md:py-4 flex flex-wrap items-center justify-between gap-4">
        {/* Logo */}
        <Logo size="md" />

        {/* Navigation Links */}
        <nav
          aria-label="Menu Utama"
          className="flex flex-wrap items-center gap-2 md:gap-4 font-display font-bold text-base md:text-lg"
        >
          <a
            href="#fitur"
            className="nb-link px-3 py-1.5 border-3 border-transparent transition-colors hover:border-ink"
          >
            {dict.nav.features}
          </a>
          <a
            href="#cara"
            className="nb-link px-3 py-1.5 border-3 border-transparent transition-colors hover:border-ink"
          >
            {dict.nav.howItWorks}
          </a>
          <a
            href="#maskot"
            className="nb-link px-3 py-1.5 border-3 border-transparent transition-colors hover:border-ink"
          >
            {dict.nav.mascot}
          </a>
          <a
            href="#faq"
            className="nb-link px-3 py-1.5 border-3 border-transparent transition-colors hover:border-ink"
          >
            {dict.nav.faq}
          </a>

          {user ? (
            <div className="flex items-center gap-3 pl-2">
              <Link
                href="/dashboard"
                className="nb-btn px-4 py-2 bg-accent-yellow text-ink border-3 border-ink shadow-nb-sm font-bold text-sm"
              >
                @{user.username}
              </Link>
            </div>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={onLoginClick || (() => (window.location.href = "/login"))}
              className="text-sm md:text-base"
            >
              {dict.nav.login}
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
