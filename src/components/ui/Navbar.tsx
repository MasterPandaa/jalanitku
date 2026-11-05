"use client";

import React, { useCallback, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

  const handleLogoClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
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
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 md:py-4 flex flex-wrap items-center justify-between gap-4">
        {/* Logo */}
        <Logo size="md" onClick={handleLogoClick} />

        {/* Navigation Links */}
        <nav
          aria-label="Menu Utama"
          className="flex flex-wrap items-center gap-2 md:gap-4 font-display font-bold text-base md:text-lg"
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
                <span aria-hidden="true">➔</span>
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
            <Link
              href="/login"
              className="nb-btn inline-flex items-center justify-center gap-2 font-display tracking-tight text-center border-ink transition-all bg-accent-blue text-surface hover:bg-[#2b44ea] px-3 py-1.5 text-sm md:text-base border-3 shadow-nb-sm"
            >
              {dict.nav.login}
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
