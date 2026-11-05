"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

export interface AppNavbarProps {
  user?: {
    id?: string;
    username: string;
    name?: string;
    avatar_url?: string;
  } | null;
  onLogout?: () => void;
}

export function AppNavbar({ user: initialUser, onLogout }: AppNavbarProps) {
  const pathname = usePathname();
  const [user, setUser] = useState<{ username: string; name?: string } | null>(
    initialUser ? { username: initialUser.username, name: initialUser.name } : null
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (initialUser !== undefined) {
      setUser(initialUser ? { username: initialUser.username, name: initialUser.name } : null);
      return;
    }

    let isMounted = true;
    fetch("/api/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data?.success && data?.data) {
          setUser({ username: data.data.username, name: data.data.name });
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [initialUser]);

  const handleLogout = async () => {
    if (onLogout) {
      onLogout();
      return;
    }

    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      window.location.href = "/";
    }
  };

  const navItems = [
    { label: "Dashboard", href: "/dashboard", active: pathname === "/dashboard" },
    { label: "JalanKarir", href: "/karir", active: pathname.startsWith("/karir") },
    { label: "JalanRapor", href: "/rapor", active: pathname.startsWith("/rapor") },
  ];

  return (
    <header className="w-full bg-surface border-b-4 md:border-b-5 border-ink sticky top-0 z-30 shadow-[0_4px_0_#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4">
        {/* Left: Logo & Desktop Links */}
        <div className="flex items-center gap-6">
          <Logo size="md" href="/dashboard" />

          {/* Desktop Navigation */}
          <nav
            aria-label="Navigasi Aplikasi"
            className="hidden md:flex items-center gap-2 font-display font-bold text-sm"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-1.5 transition-all ${
                  item.active
                    ? "bg-accent-yellow text-ink border-3 border-ink shadow-nb-sm"
                    : "text-ink/80 hover:text-ink hover:bg-paper border-3 border-transparent"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: User Profile & Logout */}
        <div className="flex items-center gap-2 md:gap-3">
          {user?.username ? (
            <Link
              href="/profil"
              className={`nb-btn min-h-[44px] px-3 py-2 text-ink border-3 border-ink shadow-nb-sm font-display font-bold text-xs md:text-sm hover:bg-accent-yellow flex items-center gap-1.5 ${
                pathname === "/profil" ? "bg-accent-yellow" : "bg-paper"
              }`}
            >
              <span className="font-mono text-ink">@{user.username}</span>
              <span className="hidden sm:inline text-xs text-ink/75">(Profil)</span>
            </Link>
          ) : (
            <Link
              href="/profil"
              className="nb-btn min-h-[44px] px-3 py-2 bg-paper text-ink border-3 border-ink shadow-nb-sm font-display font-bold text-xs md:text-sm hover:bg-accent-yellow flex items-center"
            >
              Profil
            </Link>
          )}

          <button
            type="button"
            onClick={handleLogout}
            className="min-h-[44px] min-w-[44px] border-2 md:border-3 border-ink bg-surface text-ink font-mono text-xs md:text-sm font-bold px-3 py-2 shadow-nb-sm hover:bg-accent-danger hover:text-surface transition-colors cursor-pointer flex items-center justify-center"
          >
            Keluar
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden min-h-[44px] min-w-[44px] border-2 border-ink p-2.5 bg-paper shadow-nb-sm font-bold text-base cursor-pointer flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-3 border-ink bg-paper px-4 py-3 flex flex-col gap-2 animate-fade-in">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`min-h-[44px] px-3 py-2.5 flex items-center font-display font-bold text-sm ${
                item.active
                  ? "bg-accent-yellow text-ink border-2 border-ink shadow-nb-sm"
                  : "bg-surface text-ink border-2 border-ink/40"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
