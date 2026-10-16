import React from "react";

export type MascotState = "idle" | "hover" | "happy" | "neutral" | "encourage";

export interface JalanMinProps {
  state?: MascotState;
  size?: number;
  className?: string;
  label?: string;
}

export function JalanMin({
  state = "idle",
  size = 200,
  className = "",
  label = "JalanMin, maskot JalanITku",
}: JalanMinProps) {
  // Eye, mouth, and arm variations according to mascot state
  const isWaving = state === "hover";
  const isJumping = state === "happy";
  const isPumping = state === "encourage";

  return (
    <div
      style={{ width: size, height: size }}
      className={`inline-flex items-center justify-center select-none ${className}`}
      role="img"
      aria-label={label}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <g className={isJumping ? "jm-jump" : "jm-bob"}>
          {/* Feet */}
          <rect x="62" y="150" width="22" height="26" fill="#0A0A0A" />
          <rect x="116" y="150" width="22" height="26" fill="#0A0A0A" />

          {/* Left Arm */}
          <line
            x1="40"
            y1="104"
            x2="20"
            y2="122"
            stroke="#0A0A0A"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Right Arm (Waving on hover, pump on encourage, normal otherwise) */}
          {isWaving ? (
            <line
              className="jm-wave"
              x1="150"
              y1="104"
              x2="174"
              y2="82"
              stroke="#0A0A0A"
              strokeWidth="6"
              strokeLinecap="round"
            />
          ) : isPumping ? (
            <line
              x1="150"
              y1="104"
              x2="172"
              y2="92"
              stroke="#0A0A0A"
              strokeWidth="6"
              strokeLinecap="round"
            />
          ) : (
            <line
              x1="150"
              y1="104"
              x2="172"
              y2="122"
              stroke="#0A0A0A"
              strokeWidth="6"
              strokeLinecap="round"
            />
          )}

          {/* Body Shadow */}
          <rect x="48" y="58" width="110" height="100" fill="#0A0A0A" />

          {/* Body Main (Yellow signboard) */}
          <rect
            x="40"
            y="50"
            width="110"
            height="100"
            fill="#FFD60A"
            stroke="#0A0A0A"
            strokeWidth="5"
          />

          {/* Road Markings Dashed Line */}
          <line
            x1="54"
            y1="136"
            x2="136"
            y2="136"
            stroke="#0A0A0A"
            strokeWidth="4"
            strokeDasharray="10 8"
          />

          {/* Blush Cheeks */}
          <rect x="56" y="104" width="12" height="8" fill="#FF5C8A" />
          <rect x="122" y="104" width="12" height="8" fill="#FF5C8A" />

          {/* Eyes (Animated blink) */}
          <rect className="jm-eye" x="70" y="80" width="14" height="20" fill="#0A0A0A" />
          <rect className="jm-eye" x="106" y="80" width="14" height="20" fill="#0A0A0A" />

          {/* Mouth (Varied by state) */}
          {state === "happy" || isWaving ? (
            <path
              d="M74 114 Q95 136 116 114"
              fill="none"
              stroke="#0A0A0A"
              strokeWidth="5"
              strokeLinecap="round"
            />
          ) : state === "neutral" ? (
            <line
              x1="82"
              y1="118"
              x2="108"
              y2="118"
              stroke="#0A0A0A"
              strokeWidth="5"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M78 116 Q95 130 112 116"
              fill="none"
              stroke="#0A0A0A"
              strokeWidth="5"
              strokeLinecap="round"
            />
          )}

          {/* Hat / Arrow Signpost (Pink arrow pointing right) */}
          <polygon
            className="jm-hat"
            points="52,16 128,16 150,32 128,48 52,48"
            fill="#FF5C8A"
            stroke="#0A0A0A"
            strokeWidth="5"
            strokeLinejoin="miter"
          />
          <line x1="66" y1="32" x2="116" y2="32" stroke="#0A0A0A" strokeWidth="5" />
        </g>
      </svg>
    </div>
  );
}
