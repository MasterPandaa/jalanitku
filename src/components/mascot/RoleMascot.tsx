"use client";

import React from "react";
import { SoftwareEngineerMascot } from "./roles/SoftwareEngineerMascot";
import { MobileDeveloperMascot } from "./roles/MobileDeveloperMascot";
import { GameDeveloperMascot } from "./roles/GameDeveloperMascot";
import { getRoleBySlug } from "@/lib/roles";

export interface RoleMascotProps {
  roleSlug: string;
  size?: number | string;
  className?: string;
  animate?: boolean;
  showBadge?: boolean;
  showJulukan?: boolean;
}

/**
 * Universal Role Mascot Component for JalanITku
 * Dispatches dedicated Batch 1 mascots or dynamic Neo-brutalist fallback avatar for upcoming batches.
 */
export function RoleMascot({
  roleSlug,
  size = 140,
  className = "",
  animate = true,
  showBadge = false,
  showJulukan = false,
}: RoleMascotProps) {
  const role = getRoleBySlug(roleSlug);
  const julukan = role?.julukan || "The Specialist";

  const renderMascotArt = () => {
    switch (roleSlug) {
      case "software-engineer":
        return <SoftwareEngineerMascot size={size} animate={animate} />;
      case "mobile-developer":
        return <MobileDeveloperMascot size={size} animate={animate} />;
      case "game-developer":
        return <GameDeveloperMascot size={size} animate={animate} />;
      default:
        // Elegant Neo-brutalist fallback avatar for batches 2-7
        const numSize = typeof size === "number" ? size : parseInt(size) || 120;
        const color = role?.warna || "#FFD60A";
        const initials = (role?.nama.id || roleSlug)
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")
          .toUpperCase();

        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
          >
            {/* Shadow */}
            <rect x="20" y="24" width="120" height="116" rx="8" fill="#0A0A0A" />
            {/* Body */}
            <rect
              x="14"
              y="18"
              width="120"
              height="116"
              rx="8"
              fill={color}
              stroke="#0A0A0A"
              strokeWidth="4.5"
            />
            {/* Dashed line */}
            <line x1="22" y1="108" x2="126" y2="108" stroke="#0A0A0A" strokeWidth="3" strokeDasharray="6 4" />
            {/* Eyes */}
            <rect x="36" y="46" width="22" height="26" rx="4" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="4" />
            <rect x="42" y="52" width="10" height="12" rx="2" fill="#0A0A0A" />
            <circle cx="45" cy="55" r="2" fill="#FFFFFF" />

            <rect x="90" y="46" width="22" height="26" rx="4" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="4" />
            <rect x="96" y="52" width="10" height="12" rx="2" fill="#0A0A0A" />
            <circle cx="99" cy="55" r="2" fill="#FFFFFF" />

            {/* Smile */}
            <path d="M66,88 Q74,96 82,88" stroke="#0A0A0A" strokeWidth="3.5" strokeLinecap="round" fill="none" />

            {/* Role Code Initials Badge at Bottom */}
            <rect x="54" y="114" width="40" height="16" rx="3" fill="#0A0A0A" />
            <text x="74" y="126" textAnchor="middle" fill="#FFFFFF" fontFamily="monospace" fontSize="10" fontWeight="bold">
              {initials}
            </text>
          </svg>
        );
    }
  };

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      {renderMascotArt()}

      {showJulukan && (
        <div className="mt-2 text-center">
          <span className="inline-block bg-ink text-paper font-heading text-xs font-bold px-2.5 py-0.5 border-2 border-ink shadow-[2px_2px_0_#FFD60A] uppercase tracking-wider">
            &quot;{julukan}&quot;
          </span>
        </div>
      )}

      {showBadge && role && (
        <span className="mt-1 font-mono text-[11px] font-bold text-ink/80">
          {role.nama.id}
        </span>
      )}
    </div>
  );
}
