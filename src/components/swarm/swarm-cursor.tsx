"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SwarmCursorProps {
  name: string;
  color: string;
  x: number;
  y: number;
  action: string;
  isInspecting?: boolean;
  opacity?: number;
}

export const SwarmCursor: React.FC<SwarmCursorProps> = ({
  name,
  color,
  x,
  y,
  action,
  isInspecting = false,
  opacity = 1,
}) => {
  if (opacity <= 0.01) return null;

  const isLightColor =
    color === "#F59E0B" ||
    color === "#FBBF24" ||
    color === "#EAB308" ||
    color === "#0ACF83";
  const badgeTextColor = isLightColor ? "#09090b" : "#FFFFFF";

  const isNearRightEdge =
    typeof window !== "undefined" && x > window.innerWidth - 130;

  return (
    <div
      className="absolute top-0 left-0 pointer-events-none z-50 select-none will-change-transform transition-opacity duration-300"
      style={{
        transform: `translate3d(${x}px, ${y}px, 0)`,
        opacity,
      }}
    >
      {/* Figma-style SVG Arrow Pointer */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
      >
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
          fill={color}
          stroke="#FFFFFF"
          strokeWidth="1.2"
        />
      </svg>

      {/* Name and Context Action Badge - auto-flips left if near screen edge */}
      <div
        className={cn(
          "absolute top-3.5 flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium tracking-tight shadow-md border border-white/20 whitespace-nowrap backdrop-blur-xs transition-transform duration-200",
          isNearRightEdge
            ? "-left-1 -translate-x-full"
            : "left-3.5"
        )}
        style={{
          backgroundColor: color,
          color: badgeTextColor,
        }}
      >
        <span className="font-semibold">{name}</span>
        {action && (
          <>
            <span className="opacity-60 text-[9px]">●</span>
            <span className="opacity-95 text-[9px] sm:text-[10px] max-w-[120px] sm:max-w-none truncate">{action}</span>
          </>
        )}
        {isInspecting && (
          <span className="size-1.5 rounded-full bg-white animate-ping ml-0.5" />
        )}
      </div>
    </div>
  );
};
