"use client";

import React, { useEffect, useId, useRef, useState } from "react";

export type MascotState = "idle" | "hover" | "happy" | "neutral" | "encourage" | "tracking";

export interface JalanMinProps {
  state?: MascotState;
  size?: number;
  className?: string;
  label?: string;
  trackMouse?: boolean;
}

export function JalanMin({
  state = "idle",
  size = 200,
  className = "",
  label = "Detektif JalanMin, maskot penyelidik potensi IT JalanITku",
  trackMouse = true,
}: JalanMinProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pupilsRef = useRef<SVGGElement>(null);
  const [isMouseActive, setIsMouseActive] = useState(false);

  // Generate unique ID for SVG filters & clip paths to prevent collision across multiple instances
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9_-]/g, "");
  const filterId = `comic-shadow-${uid}`;
  const clipCoatLeftId = `clipCoatLeft-${uid}`;
  const clipCoatRightId = `clipCoatRight-${uid}`;

  useEffect(() => {
    if (!trackMouse || state === "happy" || state === "tracking") {
      setIsMouseActive(false);
      if (pupilsRef.current) {
        pupilsRef.current.style.transform = "translate(0px, 0px)";
      }
      return;
    }

    let rafId: number;
    let timerId: ReturnType<typeof setTimeout>;

    const handleMouseMove = (e: MouseEvent) => {
      try {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();

        // Eye center in 1000x1000 viewBox is roughly (514, 396)
        const eyeX = rect.left + (514 / 1000) * rect.width;
        const eyeY = rect.top + (396 / 1000) * rect.height;

        const dx = e.clientX - eyeX;
        const dy = e.clientY - eyeY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const ux = dist > 0 ? dx / dist : 0;
        const uy = dist > 0 ? dy / dist : 0;

        // Max travel in 1000x1000 space is 16px (sclera radius 52, pupil radius 32)
        const maxTravel = 16.0;
        const travel = Math.min(maxTravel, dist / 18);
        const plx = (ux * travel).toFixed(1);
        const ply = (uy * travel).toFixed(1);

        setIsMouseActive(true);
        clearTimeout(timerId);
        timerId = setTimeout(() => {
          setIsMouseActive(false);
          if (pupilsRef.current) {
            pupilsRef.current.style.transform = "translate(0px, 0px)";
          }
        }, 3200);

        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          if (pupilsRef.current) {
            pupilsRef.current.style.transform = `translate(${plx}px, ${ply}px)`;
          }
        });
      } catch {
        // Safe guard against unexpected window event error
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
    };
  }, [trackMouse, state]);

  // Animation configuration based on state
  const isHappy = state === "happy";
  const isHover = state === "hover";
  const isNeutral = state === "neutral";
  const isEncourage = state === "encourage";
  const isTracking = state === "tracking";

  // Dynamic animation speeds & modifier classes
  const animSpeed = isHappy ? "1.25" : isEncourage ? "1.3" : isNeutral ? "0.8" : isHover ? "1.1" : "1";
  const bodyModifierClass = isHappy ? "trigger-jump" : isTracking ? "trigger-tracking" : "";
  const magnifierModifierClass = isHover ? "trigger-inspect" : isTracking ? "trigger-tracking-magnifier" : "";
  const leftArmModifierClass = isTracking ? "trigger-tracking-left-arm" : "";
  const capeModifierClass = isTracking ? "trigger-tracking-cape" : "";
  const hatModifierClass = isTracking ? "trigger-tracking-hat" : "";
  const leftLegModifierClass = isTracking ? `anim-track-left-leg-${uid}` : "";
  const rightLegModifierClass = isTracking ? `anim-track-right-leg-${uid}` : "";
  const pupilAnimClass = isTracking
    ? `trigger-tracking-pupils-${uid}`
    : !isMouseActive && trackMouse && !isHappy
    ? `anim-pupils-auto-${uid}`
    : "";

  return (
    <div
      ref={containerRef}
      style={{ width: size, height: size }}
      className={`inline-flex items-center justify-center select-none ${className}`}
      role="img"
      aria-label={label}
    >
      <svg
        id={`detectiveSvg-${uid}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
        width={size}
        height={size}
        className="w-full h-full overflow-visible"
        style={{ ["--anim-speed" as string]: animSpeed }}
      >
        <defs>
          {/* Filter Bayangan Blok Hitam Komik Presisi & Mendukung Animasi Real-time */}
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="18" dy="18" stdDeviation="0" floodColor="#080808" floodOpacity="1" />
          </filter>

          <style>
            {`
              .stk-${uid} {
                stroke: #080808;
                stroke-width: 14px;
                stroke-linecap: round;
                stroke-linejoin: round;
              }
              .stk-med-${uid} {
                stroke: #080808;
                stroke-width: 12.5px;
                stroke-linecap: round;
                stroke-linejoin: round;
              }
              .comic-drop-shadow-${uid} {
                filter: url(#${filterId});
              }

              @keyframes detectiveBounce-${uid} {
                0%, 100% { transform: translateY(0px) scaleY(1) scaleX(1); }
                50% { transform: translateY(9px) scaleY(0.986) scaleX(1.014); }
              }
              @keyframes capeWave-${uid} {
                0%, 100% { transform: rotate(0deg) scaleX(1); }
                50% { transform: rotate(-1.2deg) scaleX(1.024); }
              }
              @keyframes hatBob-${uid} {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-5px) rotate(-1deg); }
              }
              @keyframes bowWiggle-${uid} {
                0%, 100% { transform: rotate(0deg) scale(1); }
                50% { transform: rotate(6deg) scale(1.06); }
              }
              @keyframes leftArmSwing-${uid} {
                0%, 100% { transform: rotate(0deg); }
                50% { transform: rotate(4deg); }
              }
              @keyframes magnifySearch-${uid} {
                0%, 100% { transform: rotate(0deg); }
                35% { transform: rotate(-5.5deg); }
                70% { transform: rotate(3.5deg); }
              }
              @keyframes eyeBlink-${uid} {
                0%, 44%, 48%, 94%, 98%, 100% { transform: scaleY(1); }
                46%, 96% { transform: scaleY(0.06); }
              }
              @keyframes pupilLookAround-${uid} {
                0%, 20%, 100% { transform: translate(0px, 0px); }
                30%, 45% { transform: translate(9px, -4px); }
                55%, 70% { transform: translate(-8px, 2px); }
                80%, 90% { transform: translate(6px, 5px); }
              }
              @keyframes lensGlint-${uid} {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.75; transform: scale(0.96); }
              }
              @keyframes actionInspectZoom-${uid} {
                0%, 100% { transform: rotate(0deg) scale(1); }
                35% { transform: rotate(-7deg) scale(1.08); }
                70% { transform: rotate(3.5deg) scale(1.03); }
              }
              @keyframes actionHappyJump-${uid} {
                0%, 100% { transform: translateY(0) scale(1, 1); }
                20% { transform: translateY(14px) scale(1.05, 0.94); }
                45% { transform: translateY(-44px) scale(0.96, 1.05); }
                75% { transform: translateY(6px) scale(1.02, 0.98); }
              }

              .anim-character-body-${uid} {
                transform-box: view-box;
                transform-origin: 505px 860px;
                animation: detectiveBounce-${uid} calc(2.4s / var(--anim-speed, 1)) ease-in-out infinite;
              }
              .anim-cape-${uid} {
                transform-box: view-box;
                transform-origin: 505px 480px;
                animation: capeWave-${uid} calc(2.4s / var(--anim-speed, 1)) ease-in-out infinite;
              }
              .anim-hat-${uid} {
                transform-box: view-box;
                transform-origin: 485px 295px;
                animation: hatBob-${uid} calc(2.4s / var(--anim-speed, 1)) ease-in-out infinite;
              }
              .anim-bow-${uid} {
                transform-box: view-box;
                transform-origin: 438px 124px;
                animation: bowWiggle-${uid} calc(1.8s / var(--anim-speed, 1)) ease-in-out infinite;
              }
              .anim-left-arm-${uid} {
                transform-box: view-box;
                transform-origin: 295px 590px;
                animation: leftArmSwing-${uid} calc(2.4s / var(--anim-speed, 1)) ease-in-out infinite;
              }
              .anim-magnifier-arm-${uid} {
                transform-box: view-box;
                transform-origin: 685px 490px;
                animation: magnifySearch-${uid} calc(3.2s / var(--anim-speed, 1)) ease-in-out infinite;
              }
              .anim-eyes-blink-${uid} {
                transform-box: view-box;
                transform-origin: 514px 396px;
                animation: eyeBlink-${uid} calc(4.8s / var(--anim-speed, 1)) infinite;
              }
              .anim-pupils-auto-${uid} {
                animation: pupilLookAround-${uid} calc(5.8s / var(--anim-speed, 1)) ease-in-out infinite;
              }
              .anim-glint-${uid} {
                transform-box: view-box;
                transform-origin: 780px 275px;
                animation: lensGlint-${uid} calc(2.4s / var(--anim-speed, 1)) ease-in-out infinite;
              }
              .trigger-inspect {
                animation: actionInspectZoom-${uid} 1.8s ease-in-out infinite !important;
              }
              .trigger-jump {
                animation: actionHappyJump-${uid} 0.95s cubic-bezier(0.25, 1, 0.5, 1) infinite !important;
              }

              /* Animasi Berlari Melacak Jejak ke Kanan (Detective Running Stride to Right) */
              @keyframes actionTrackingBody-${uid} {
                0%, 50%, 100% {
                  transform: translateY(-16px) rotate(13deg);
                }
                25%, 75% {
                  transform: translateY(4px) rotate(15deg);
                }
              }
              @keyframes actionTrackingLeftLeg-${uid} {
                0% {
                  transform: rotate(-30deg) translate(16px, -24px);
                }
                25% {
                  transform: rotate(-6deg) translate(0px, -4px);
                }
                50% {
                  transform: rotate(26deg) translate(-14px, -6px);
                }
                75% {
                  transform: rotate(4deg) translate(-2px, 0px);
                }
                100% {
                  transform: rotate(-30deg) translate(16px, -24px);
                }
              }
              @keyframes actionTrackingRightLeg-${uid} {
                0% {
                  transform: rotate(26deg) translate(-14px, -6px);
                }
                25% {
                  transform: rotate(4deg) translate(-2px, 0px);
                }
                50% {
                  transform: rotate(-30deg) translate(16px, -24px);
                }
                75% {
                  transform: rotate(-6deg) translate(0px, -4px);
                }
                100% {
                  transform: rotate(26deg) translate(-14px, -6px);
                }
              }
              @keyframes actionTrackingMagnifier-${uid} {
                0%, 100% {
                  transform: rotate(26deg) translate(22px, 38px);
                }
                50% {
                  transform: rotate(34deg) translate(34px, 52px);
                }
              }
              @keyframes actionTrackingPupils-${uid} {
                0%, 100% {
                  transform: translate(15px, 13px);
                }
                50% {
                  transform: translate(17px, 16px);
                }
              }
              @keyframes actionTrackingLeftArm-${uid} {
                0%, 100% {
                  transform: rotate(24deg) translate(-8px, 6px);
                }
                50% {
                  transform: rotate(-24deg) translate(12px, -10px);
                }
              }
              @keyframes actionTrackingCape-${uid} {
                0%, 100% {
                  transform: rotate(-16deg) scaleX(1.12) scaleY(0.96);
                }
                50% {
                  transform: rotate(-24deg) scaleX(1.22) scaleY(1.04);
                }
              }
              @keyframes actionTrackingHat-${uid} {
                0%, 50%, 100% {
                  transform: translateY(-6px) rotate(4deg);
                }
                25%, 75% {
                  transform: translateY(2px) rotate(7deg);
                }
              }

              .trigger-tracking {
                transform-box: view-box;
                transform-origin: 505px 860px;
                animation: actionTrackingBody-${uid} 0.75s ease-in-out infinite !important;
              }
              .anim-track-left-leg-${uid} {
                transform-box: view-box;
                transform-origin: 440px 760px;
                animation: actionTrackingLeftLeg-${uid} 0.75s ease-in-out infinite !important;
              }
              .anim-track-right-leg-${uid} {
                transform-box: view-box;
                transform-origin: 580px 760px;
                animation: actionTrackingRightLeg-${uid} 0.75s ease-in-out infinite !important;
              }
              .trigger-tracking-magnifier {
                transform-box: view-box;
                transform-origin: 685px 490px;
                animation: actionTrackingMagnifier-${uid} 0.75s ease-in-out infinite !important;
              }
              .trigger-tracking-pupils-${uid} {
                animation: actionTrackingPupils-${uid} 0.75s ease-in-out infinite !important;
              }
              .trigger-tracking-left-arm {
                transform-box: view-box;
                transform-origin: 295px 590px;
                animation: actionTrackingLeftArm-${uid} 0.75s ease-in-out infinite !important;
              }
              .trigger-tracking-cape {
                transform-box: view-box;
                transform-origin: 505px 480px;
                animation: actionTrackingCape-${uid} 0.75s ease-in-out infinite !important;
              }
              .trigger-tracking-hat {
                transform-box: view-box;
                transform-origin: 485px 295px;
                animation: actionTrackingHat-${uid} 0.75s ease-in-out infinite !important;
              }
            `}
          </style>

          {/* ClipPath Presisi untuk Polkadot pada Mantel Kiri & Lengan Kiri */}
          <clipPath id={clipCoatLeftId}>
            <path d="M 505,550 C 425,565 340,562 258,552 L 222,646 L 312,676 L 336,602 L 315,692 C 368,714 438,716 488,708 C 504,705 508,685 508,668 L 505,550 Z" />
          </clipPath>

          {/* ClipPath Presisi untuk Polkadot pada Mantel Kanan & Lengan Kanan */}
          <clipPath id={clipCoatRightId}>
            <path d="M 505,550 C 580,562 662,538 724,462 L 796,534 L 710,606 L 726,672 C 668,700 595,708 538,704 C 518,702 510,684 510,668 L 505,550 Z" />
          </clipPath>
        </defs>

        {/* GRUP UTAMA KARAKTER DENGAN BAYANGAN KOMIK REAL-TIME */}
        <g id="characterShadowWrapper" className={`comic-drop-shadow-${uid}`}>
          <g id="mainCharacterGroup" className={`anim-character-body-${uid} ${bodyModifierClass}`}>

            {/* 1. JUBAH BELAKANG PINK (#FF4B72) DENGAN GELOMBANG BAWAH RAPI */}
            <g id="pinkBackCape" className={`anim-cape-${uid} ${capeModifierClass}`}>
              <path
                className={`stk-${uid}`}
                fill="#FF4B72"
                d="
                  M 278,492
                  C 208,548 156,648 115,765
                  C 98,805 152,828 192,794
                  C 202,838 262,844 292,806
                  C 312,844 368,844 392,808
                  L 642,808
                  C 682,832 732,822 740,782
                  C 786,796 822,762 802,718
                  C 782,652 756,585 730,535
                  Z"
              />
              {/* Gelombang Jubah Tengah di Celah Antara Kedua Kaki */}
              <path
                className={`stk-${uid}`}
                fill="#FF4B72"
                d="
                  M 476,775
                  C 488,850 536,850 548,775
                  Z"
              />
            </g>

            {/* 2. KAKI KUNING & SEPATU BOT ORANYE (#F26419) */}
            <g id="legsAndBoots">
              {/* Kaki & Sepatu Bot Kiri */}
              <g id="leftLegAndBoot" className={leftLegModifierClass}>
                <rect className={`stk-${uid}`} x="396" y="755" width="88" height="72" rx="12" fill="#FFD21E" />
                <path d="M 402,786 L 478,790" stroke="#080808" strokeWidth={11} strokeLinecap="round" />
                {isTracking ? (
                  // Saat bergerak/berlari ke kanan: kedua kaki menghadap ke kanan!
                  <>
                    <path
                      className={`stk-${uid}`}
                      fill="#F26419"
                      d="
                        M 388,808
                        C 384,824 384,892 392,908
                        C 422,920 496,920 534,908
                        C 560,894 546,854 502,844
                        L 496,805
                        C 460,814 422,816 388,808 Z"
                    />
                    <path d="M 502,844 L 474,852" stroke="#080808" strokeWidth={12} strokeLinecap="round" />
                  </>
                ) : (
                  // Posisi normal diam menghadap kiri
                  <>
                    <path
                      className={`stk-${uid}`}
                      fill="#F26419"
                      d="
                        M 386,805
                        L 382,846
                        C 338,856 324,894 352,912
                        C 392,922 462,920 492,908
                        C 500,894 498,822 494,808
                        C 458,816 420,814 386,805 Z"
                    />
                    <path d="M 382,846 L 410,852" stroke="#080808" strokeWidth={12} strokeLinecap="round" />
                  </>
                )}
              </g>

              {/* Kaki & Sepatu Bot Kanan */}
              <g id="rightLegAndBoot" className={rightLegModifierClass}>
                <rect className={`stk-${uid}`} x="536" y="755" width="88" height="72" rx="12" fill="#FFD21E" />
                <path d="M 542,790 L 618,786" stroke="#080808" strokeWidth={11} strokeLinecap="round" />
                <path
                  className={`stk-${uid}`}
                  fill="#F26419"
                  d="
                    M 528,808
                    C 524,824 524,892 532,908
                    C 562,920 636,920 674,908
                    C 700,894 686,854 642,844
                    L 636,805
                    C 600,814 562,816 528,808 Z"
                />
                <path d="M 642,844 L 614,852" stroke="#080808" strokeWidth={12} strokeLinecap="round" />
              </g>
            </g>

            {/* 3. BADAN KUNING UTAMA (#FFD21E) & PERUT KUNING MUDA (#FFF24B) */}
            <g id="yellowBody">
              {/* Siluet Badan & Kepala Kuning Bulat Telur */}
              <path
                className={`stk-${uid}`}
                fill="#FFD21E"
                d="
                  M 312,445
                  C 326,315 395,265 505,265
                  C 615,265 656,325 674,448
                  C 700,590 765,680 724,742
                  C 684,804 598,800 505,800
                  C 412,800 315,778 290,710
                  C 268,648 296,548 312,445 Z"
              />

              {/* Area Perut Bawah Kuning Cerah (#FFF24B) */}
              <path
                className={`stk-${uid}`}
                fill="#FFF24B"
                d="
                  M 378,778
                  C 406,690 456,648 514,646
                  C 574,648 626,690 656,778
                  C 572,800 460,800 378,778 Z"
              />
            </g>

            {/* 4. WAJAH (MATA BESAR SIMETRIS & MULUT TERSENYUM) */}
            <g id="faceFeatures">
              {/* Grup Mata (Berkedip bersama) */}
              <g className={`anim-eyes-blink-${uid}`}>
                {/* Mata Kiri & Kanan: Sklera Putih */}
                <circle className={`stk-med-${uid}`} cx="454" cy="396" r="52" fill="#FFFFFF" />
                <circle className={`stk-med-${uid}`} cx="574" cy="396" r="52" fill="#FFFFFF" />

                {/* Grup Pupil (Mengikuti kursor atau lirik otomatis) */}
                <g
                  ref={pupilsRef}
                  id="pupilsGroup"
                  className={pupilAnimClass}
                  style={{ transition: "transform 0.12s ease-out" }}
                >
                  {/* Pupil Hitam Kiri + Catchlight */}
                  <circle cx="458" cy="396" r="32" fill="#080808" />
                  <circle cx="440" cy="384" r="11" fill="#FFFFFF" />

                  {/* Pupil Hitam Kanan + Catchlight */}
                  <circle cx="578" cy="396" r="32" fill="#080808" />
                  <circle cx="560" cy="384" r="11" fill="#FFFFFF" />
                </g>
              </g>

              {/* Mulut */}
              <g id="mouthGroup">
                {isNeutral ? (
                  <path
                    d="M 490,464 C 504,472 524,472 538,464"
                    fill="none"
                    stroke="#080808"
                    strokeWidth={11}
                    strokeLinecap="round"
                  />
                ) : (
                  <>
                    <path
                      className={`stk-med-${uid}`}
                      fill="#080808"
                      d="
                        M 490,454
                        C 502,460 526,460 538,454
                        C 548,450 552,466 542,478
                        C 528,492 500,492 486,478
                        C 476,466 480,450 490,454 Z"
                    />
                    <path d="M 495,474 C 506,466 522,466 533,474 C 526,485 502,485 495,474 Z" fill="#FF4B72" />
                  </>
                )}
              </g>
            </g>

            {/* 5. TANGAN KIRI & MANTEL POLKADOT SISI KIRI (#DE6C18) */}
            <g id="leftArmGroup" className={`anim-left-arm-${uid} ${leftArmModifierClass}`}>
              <path
                className={`stk-${uid}`}
                fill="#FFD21E"
                d="
                  M 230,638
                  C 198,678 202,732 242,746
                  C 270,755 290,736 294,718
                  C 308,728 322,718 320,698
                  C 318,680 306,660 292,648 Z"
              />
            </g>

            <g id="coatLeft">
              <path
                className={`stk-${uid}`}
                fill="#DE6C18"
                d="
                  M 505,550
                  C 425,565 340,562 258,552
                  L 222,646
                  L 312,676
                  L 336,602
                  L 315,692
                  C 368,714 438,716 488,708
                  C 504,705 508,685 508,668
                  L 505,550 Z"
              />

              {/* Bintik Polkadot Kuning Sisi Kiri */}
              <g clipPath={`url(#${clipCoatLeftId})`} fill="#FFD21E">
                <ellipse cx="256" cy="614" rx="10" ry="13" transform="rotate(18 256 614)" />
                <ellipse cx="290" cy="574" rx="9" ry="12" transform="rotate(15 290 574)" />
                <ellipse cx="298" cy="642" rx="9" ry="12" transform="rotate(-10 298 642)" />
                <ellipse cx="372" cy="612" rx="10" ry="14" transform="rotate(18 372 612)" />
                <ellipse cx="352" cy="676" rx="9" ry="13" transform="rotate(-14 352 676)" />
                <ellipse cx="428" cy="582" rx="10" ry="13" transform="rotate(22 428 582)" />
                <ellipse cx="436" cy="650" rx="10" ry="14" transform="rotate(12 436 650)" />
                <ellipse cx="480" cy="610" rx="10" ry="13" transform="rotate(20 480 610)" />
                <ellipse cx="476" cy="682" rx="10" ry="13" transform="rotate(24 476 682)" />
              </g>

              <path
                className={`stk-${uid}`}
                fill="none"
                d="
                  M 505,550
                  C 425,565 340,562 258,552
                  L 222,646
                  L 312,676
                  L 336,602
                  L 315,692
                  C 368,714 438,716 488,708
                  C 504,705 508,685 508,668
                  L 505,550 Z"
              />
            </g>

            {/* 6. GRUP TANGAN KANAN, LENGAN KANAN & KACA PEMBESAR */}
            <g id="magnifierArmGroup" className={`anim-magnifier-arm-${uid} ${magnifierModifierClass}`}>
              {/* (6.1) Lengan Bawah & Telapak Tangan Kuning di Belakang Gagang */}
              <path
                className={`stk-${uid}`}
                fill="#FFD21E"
                d="
                  M 718,478
                  L 762,412
                  C 776,392 802,394 812,416
                  L 832,492
                  L 774,536
                  Z"
              />

              {/* (6.2) KACA PEMBESAR */}
              <g id="magnifyingGlass" transform="rotate(-15 780 275)">
                <rect className={`stk-${uid}`} x="761" y="365" width="38" height="158" rx="19" fill="#9A4B1A" />
                <circle className={`stk-${uid}`} cx="780" cy="275" r="104" fill="#9A4B1A" />
                <circle className={`stk-${uid}`} cx="780" cy="275" r="78" fill="#FFFFFF" />
                <path
                  className={`anim-glint-${uid}`}
                  d="M 786,216 C 818,220 838,242 842,268"
                  fill="none"
                  stroke="#080808"
                  strokeWidth="13"
                  strokeLinecap="round"
                />
              </g>

              {/* (6.3) Jari Kepalan Tangan Kanan */}
              <path
                className={`stk-${uid}`}
                fill="#FFD21E"
                d="
                  M 812,394
                  C 848,384 878,414 872,456
                  C 866,486 840,496 818,478
                  C 802,462 798,422 812,394 Z"
              />

              {/* (6.4) Ibu Jari Kuning */}
              <path
                className={`stk-${uid}`}
                fill="#FFD21E"
                d="
                  M 754,424
                  C 766,396 808,398 814,424
                  C 818,442 798,452 772,444"
              />

              {/* (6.5) Mantel Polkadot Sisi Kanan */}
              <g id="coatRight">
                <path
                  className={`stk-${uid}`}
                  fill="#DE6C18"
                  d="
                    M 505,550
                    C 580,562 662,538 724,462
                    L 796,534
                    L 710,606
                    L 726,672
                    C 668,700 595,708 538,704
                    C 518,702 510,684 510,668
                    L 505,550 Z"
                />

                {/* Bintik Polkadot Kuning Sisi Kanan */}
                <g clipPath={`url(#${clipCoatRightId})`} fill="#FFD21E">
                  <ellipse cx="552" cy="612" rx="10" ry="14" transform="rotate(-12 552 612)" />
                  <ellipse cx="564" cy="676" rx="10" ry="13" transform="rotate(14 564 676)" />
                  <ellipse cx="618" cy="638" rx="10" ry="14" transform="rotate(-8 618 638)" />
                  <ellipse cx="672" cy="604" rx="10" ry="13" transform="rotate(12 672 604)" />
                  <ellipse cx="688" cy="656" rx="10" ry="13" transform="rotate(-16 688 656)" />
                  <ellipse cx="704" cy="552" rx="9" ry="12" transform="rotate(-22 704 552)" />
                  <ellipse cx="730" cy="502" rx="9" ry="12" transform="rotate(-18 730 502)" />
                  <ellipse cx="756" cy="544" rx="9" ry="12" transform="rotate(15 756 544)" />
                </g>

                <path
                  className={`stk-${uid}`}
                  fill="none"
                  d="
                    M 505,550
                    C 580,562 662,538 724,462
                    L 796,534
                    L 710,606
                    L 726,672
                    C 668,700 595,708 538,704
                    C 518,702 510,684 510,668
                    L 505,550 Z"
                />
              </g>
            </g>

            {/* 7. KERAH JUBAH & SHOULDER CAPELET */}
            <g id="collarAndCapelet">
              <path
                className={`stk-${uid}`}
                fill="#8F4012"
                d="
                  M 284,432
                  C 282,414 304,408 320,418
                  L 322,456 Z"
              />
              <path
                className={`stk-${uid}`}
                fill="#8F4012"
                d="
                  M 692,422
                  C 694,406 674,400 660,410
                  L 658,448 Z"
              />

              <path
                className={`stk-${uid}`}
                fill="#FF7E26"
                d="
                  M 284,492
                  C 226,528 190,584 176,648
                  C 218,582 288,566 378,582
                  C 442,592 484,580 505,550
                  C 425,550 338,530 284,492 Z"
              />

              <path
                className={`stk-${uid}`}
                fill="#FF7E26"
                d="
                  M 505,550
                  C 548,590 628,588 674,552
                  C 702,530 718,494 724,462
                  C 690,478 638,518 505,550 Z"
              />

              <path
                className={`stk-${uid}`}
                fill="#D96B1B"
                d="
                  M 284,432
                  C 314,458 368,476 436,482
                  C 464,485 476,496 484,518
                  L 498,550
                  C 412,552 332,534 290,498
                  L 284,432 Z"
              />

              <path
                className={`stk-${uid}`}
                fill="#D96B1B"
                d="
                  M 692,422
                  C 664,448 614,468 564,476
                  C 538,480 526,492 520,516
                  L 512,550
                  C 594,548 660,530 688,490
                  L 692,422 Z"
              />
            </g>

            {/* 8. TOPI DETEKTIF PINK */}
            <g id="detectiveHat" className={`anim-hat-${uid} ${hatModifierClass}`}>
              <path
                className={`stk-${uid}`}
                fill="#FF4B72"
                d="
                  M 318,314
                  C 282,340 264,368 272,384
                  C 280,398 312,394 330,368
                  C 336,350 332,328 318,314 Z"
              />

              <path
                className={`stk-${uid}`}
                fill="#FF4B72"
                d="
                  M 312,318
                  C 308,192 388,120 490,122
                  C 578,124 620,192 624,264
                  C 535,258 415,280 312,318 Z"
              />

              <path d="M 442,126 C 400,174 392,235 398,286" fill="none" stroke="#080808" strokeWidth={14} strokeLinecap="round" />

              <path
                className={`stk-${uid}`}
                fill="#FF4B72"
                d="
                  M 396,288
                  C 462,242 598,234 656,268
                  C 678,282 666,306 616,312
                  C 532,322 446,316 396,288 Z"
              />

              <g className={`anim-bow-${uid}`}>
                <path
                  className={`stk-${uid}`}
                  fill="#FF4B72"
                  d="
                    M 436,128
                    C 394,102 378,132 414,144
                    C 426,148 436,138 436,128 Z"
                />
                <path
                  className={`stk-${uid}`}
                  fill="#FF4B72"
                  d="
                    M 440,126
                    C 448,88 484,78 480,112
                    C 478,126 458,132 440,126 Z"
                />
              </g>
            </g>

          </g>
        </g>
      </svg>
    </div>
  );
}
