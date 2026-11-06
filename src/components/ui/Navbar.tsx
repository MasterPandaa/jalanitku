"use client";

import React, { useCallback, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { getDictionary } from "@/lib/i18n";
import { smoothScrollTo } from "@/lib/smooth-scroll";

export interface NavbarProps {
  user?: {
    username: string;
    avatar_url?: string;
  } | null;
  onLoginClick?: () => void;
}

export function Navbar({ user: propUser, onLoginClick }: NavbarProps) {
  const dict = getDictionary();
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<NavbarProps["user"]>(propUser ?? null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (propUser !== undefined) {
      setCurrentUser(propUser);
      return;
    }

    let isMounted = true;
    fetch("/api/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data?.success && data?.data) {
          setCurrentUser({
            username: data.data.username,
            avatar_url: data.data.avatar_url,
          });
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [propUser]);

  const handleSmoothScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      // Jika berada di homepage, cegah navigasi default dan luncurkan animasi smooth scroll
      if (pathname === "/" || pathname === "") {
        e.preventDefault();
        window.history.pushState(null, "", `#${targetId}`);
        smoothScrollTo(targetId, 85, 750);
      }
    },
    [pathname]
  );

  const handleMobileNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      setMobileMenuOpen(false);
      handleSmoothScroll(e, targetId);
    },
    [handleSmoothScroll]
  );

  const handleLogoClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      setMobileMenuOpen(false);
      if (pathname === "/" || pathname === "") {
        e.preventDefault();
        window.history.pushState(null, "", "/");
        smoothScrollTo(0, 0, 750);
      }
    },
    [pathname]
  );

  return (
    <header className="w-full bg-paper border-b-4 md:border-b-5 border-ink sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 md:py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Logo size="md" onClick={handleLogoClick} />

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Menu Utama Desktop"
          className="hidden lg:flex items-center gap-3 xl:gap-5 font-display font-bold text-base xl:text-lg"
        >
          <Link
            href="/#fitur"
            scroll={false}
            onClick={(e) => handleSmoothScroll(e, "fitur")}
            className="nb-link px-3 py-1.5 border-3 border-transparent transition-colors hover:border-ink"
          >
            {dict.nav.features}
          </Link>
          <Link
            href="/#cara"
            scroll={false}
            onClick={(e) => handleSmoothScroll(e, "cara")}
            className="nb-link px-3 py-1.5 border-3 border-transparent transition-colors hover:border-ink"
          >
            {dict.nav.howItWorks}
          </Link>
          <Link
            href="/#maskot"
            scroll={false}
            onClick={(e) => handleSmoothScroll(e, "maskot")}
            className="nb-link px-3 py-1.5 border-3 border-transparent transition-colors hover:border-ink"
          >
            {dict.nav.mascot}
          </Link>
          <Link
            href="/#faq"
            scroll={false}
            onClick={(e) => handleSmoothScroll(e, "faq")}
            className="nb-link px-3 py-1.5 border-3 border-transparent transition-colors hover:border-ink"
          >
            {dict.nav.faq}
          </Link>

          {currentUser ? (
            <div className="flex items-center gap-3 pl-2">
              <Link
                href="/dashboard"
                className="nb-btn px-4 py-2 bg-accent-yellow text-ink border-3 border-ink shadow-nb-sm font-display font-bold text-sm md:text-base hover:bg-yellow-300 transition-all flex items-center gap-2"
              >
                <span>Buka Dashboard</span>
                {currentUser.username && (
                  <span className="text-xs font-mono font-normal opacity-75 hidden sm:inline">
                    (@{currentUser.username})
                  </span>
                )}
                <ArrowRight className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
              </Link>
            </div>
          ) : onLoginClick ? (
            <Button
              variant="primary"
              size="sm"
              onClick={onLoginClick}
              className="text-sm md:text-base"
            >
              {dict.nav.login}
            </Button>
          ) : (
            <Button
              href="/login"
              variant="primary"
              size="sm"
              className="text-sm md:text-base"
            >
              {dict.nav.login}
            </Button>
          )}
        </nav>

        {/* Mobile Header Right Controls: Fast Action CTA + Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          {currentUser ? (
            <Link
              href="/dashboard"
              className="nb-btn min-h-[44px] px-3 py-2 bg-accent-yellow text-ink border-3 border-ink shadow-nb-sm font-display font-bold text-xs flex items-center gap-1.5"
            >
              <span>Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
            </Link>
          ) : (
            <Link
              href="/login"
              aria-label={dict.nav.login}
              className="nb-btn min-h-[44px] px-3.5 py-2 bg-accent-blue text-surface border-3 border-ink shadow-nb-sm font-display font-bold text-xs sm:text-sm flex items-center whitespace-nowrap"
            >
              <span className="sm:hidden" aria-hidden="true">Masuk</span>
              <span className="hidden sm:inline">{dict.nav.login}</span>
            </Link>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-h-[44px] min-w-[44px] border-3 border-ink bg-surface text-ink p-2 shadow-nb-sm font-bold text-lg flex items-center justify-center cursor-pointer transition-colors hover:bg-accent-yellow"
            aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 stroke-[2.5]" />
            ) : (
              <Menu className="w-6 h-6 stroke-[2.5]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t-4 border-ink bg-paper px-4 py-4 flex flex-col gap-2.5 animate-fade-in shadow-[0_8px_0_#0A0A0A]">
          <Link
            href="/#fitur"
            scroll={false}
            onClick={(e) => handleMobileNavClick(e, "fitur")}
            className="min-h-[44px] px-4 py-2.5 flex items-center font-display font-bold text-base text-ink bg-surface border-3 border-ink shadow-nb-sm hover:bg-accent-yellow transition-colors"
          >
            {dict.nav.features}
          </Link>
          <Link
            href="/#cara"
            scroll={false}
            onClick={(e) => handleMobileNavClick(e, "cara")}
            className="min-h-[44px] px-4 py-2.5 flex items-center font-display font-bold text-base text-ink bg-surface border-3 border-ink shadow-nb-sm hover:bg-accent-yellow transition-colors"
          >
            {dict.nav.howItWorks}
          </Link>
          <Link
            href="/#maskot"
            scroll={false}
            onClick={(e) => handleMobileNavClick(e, "maskot")}
            className="min-h-[44px] px-4 py-2.5 flex items-center font-display font-bold text-base text-ink bg-surface border-3 border-ink shadow-nb-sm hover:bg-accent-yellow transition-colors"
          >
            {dict.nav.mascot}
          </Link>
          <Link
            href="/#faq"
            scroll={false}
            onClick={(e) => handleMobileNavClick(e, "faq")}
            className="min-h-[44px] px-4 py-2.5 flex items-center font-display font-bold text-base text-ink bg-surface border-3 border-ink shadow-nb-sm hover:bg-accent-yellow transition-colors"
          >
            {dict.nav.faq}
          </Link>
        </div>
      )}
    </header>
  );
}
