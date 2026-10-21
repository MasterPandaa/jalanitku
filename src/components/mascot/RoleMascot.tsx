"use client";

import React from "react";
import { SoftwareEngineerMascot } from "./roles/SoftwareEngineerMascot";
import { MobileDeveloperMascot } from "./roles/MobileDeveloperMascot";
import { GameDeveloperMascot } from "./roles/GameDeveloperMascot";
import { QualityAssuranceMascot } from "./roles/QualityAssuranceMascot";
import { ITSupportMascot } from "./roles/ITSupportMascot";
import { NetworkEngineerMascot } from "./roles/NetworkEngineerMascot";
import { CloudEngineerMascot } from "./roles/CloudEngineerMascot";
import { DevOpsEngineerMascot } from "./roles/DevOpsEngineerMascot";
import { SecurityAnalystMascot } from "./roles/SecurityAnalystMascot";
import { JalanMin } from "./JalanMin";
import { getRoleBySlug } from "@/lib/roles";

export interface RoleMascotProps {
  roleSlug: string;
  size?: number;
  className?: string;
  showTitle?: boolean;
  showBadge?: boolean;
  state?: "idle" | "hover" | "happy";
  animated?: boolean;
  animate?: boolean;
}

/**
 * Universal Dispatcher Komponen Maskot Role IT JalanITku.
 * Otomatis me-render maskot presisi tinggi sesuai batch produksi,
 * dengan fallback adaptif neo-brutalist yang elegan.
 */
export function RoleMascot({
  roleSlug,
  size = 200,
  className = "",
  showTitle = false,
  showBadge = false,
  state = "idle",
  animated = true,
  animate,
}: RoleMascotProps) {
  const isAnimated = animate !== undefined ? animate : animated;
  const role = getRoleBySlug(roleSlug);
  const julukan = role?.julukan || "The IT Explorer";
  const roleName = role?.nama.id || roleSlug;

  // Render maskot sesuai role slug
  const renderMascotGraphic = () => {
    switch (roleSlug) {
      // BATCH 1: Core Engineering & Creators
      case "software-engineer":
        return <SoftwareEngineerMascot size={size} state={state} animated={isAnimated} />;
      case "mobile-developer":
        return <MobileDeveloperMascot size={size} state={state} animated={isAnimated} />;
      case "game-developer":
        return <GameDeveloperMascot size={size} state={state} animated={isAnimated} />;

      // BATCH 2: Reliability, Support & Connectivity
      case "quality-assurance":
        return <QualityAssuranceMascot size={size} state={state} animated={isAnimated} />;
      case "it-support":
        return <ITSupportMascot size={size} state={state} animated={isAnimated} />;
      case "network-engineer":
        return <NetworkEngineerMascot size={size} state={state} animated={isAnimated} />;

      // BATCH 3: Cloud, Platform, CI/CD & Security
      case "cloud-engineer":
        return <CloudEngineerMascot size={size} state={state} animated={isAnimated} />;
      case "devops-engineer":
        return <DevOpsEngineerMascot size={size} state={state} animated={isAnimated} />;
      case "security-analyst":
        return <SecurityAnalystMascot size={size} state={state} animated={isAnimated} />;

      default:
        // Fallback adaptif untuk role batch 4–7: JalanMin dengan badge status elegan
        return (
          <div className="relative inline-flex items-center justify-center">
            <JalanMin size={size} state={state} trackMouse={false} />
            <div
              className="absolute -bottom-1 px-2 py-0.5 border-2 border-ink text-[10px] font-heading uppercase tracking-wider shadow-[2px_2px_0_#0A0A0A] bg-accent-yellow"
            >
              Batch Mendatang
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      {/* Visual Maskot SVG */}
      <div className="relative flex items-center justify-center">
        {renderMascotGraphic()}

        {/* Badge Julukan Melayang (Opsional) */}
        {showBadge && (
          <div
            className="absolute -top-1 right-0 px-2 py-0.5 border-2 border-ink text-[11px] font-heading uppercase tracking-wide bg-accent-pink text-white shadow-[2px_2px_0_#0A0A0A] rotate-3"
          >
            {julukan}
          </div>
        )}
      </div>

      {/* Title & Julukan Text Bawah (Opsional) */}
      {showTitle && (
        <div className="mt-2 text-center">
          <div className="font-heading text-sm md:text-base text-ink leading-tight">
            {roleName}
          </div>
          <div className="font-mono text-xs font-bold text-accent-pink tracking-wide">
            &quot;{julukan}&quot;
          </div>
        </div>
      )}
    </div>
  );
}
