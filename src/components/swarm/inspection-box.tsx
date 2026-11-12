"use client";

import React from "react";
import { InspectionBox as InspectionBoxType } from "./types";

interface Props {
  box: InspectionBoxType;
}

export const InspectionBoxView: React.FC<Props> = ({ box }) => {
  if (box.opacity <= 0.01) return null;

  const isLightColor =
    box.color === "#F59E0B" ||
    box.color === "#FBBF24" ||
    box.color === "#EAB308" ||
    box.color === "#0ACF83";
  const badgeTextColor = isLightColor ? "#09090b" : "#FFFFFF";

  return (
    <div
      className="absolute pointer-events-none z-30 transition-opacity duration-200 select-none"
      style={{
        transform: `translate3d(${box.x}px, ${box.y}px, 0)`,
        width: `${box.width}px`,
        height: `${box.height}px`,
        border: `1.5px dashed ${box.color}`,
        opacity: box.opacity,
        boxShadow: `0 0 16px ${box.color}20`,
      }}
    >
      {/* 4 Corner Resize Handles - exactly matching Figma & screenshot */}
      <span
        className="absolute -top-1.5 -left-1.5 size-2 bg-background border shadow-xs"
        style={{ borderColor: box.color }}
      />
      <span
        className="absolute -top-1.5 -right-1.5 size-2 bg-background border shadow-xs"
        style={{ borderColor: box.color }}
      />
      <span
        className="absolute -bottom-1.5 -left-1.5 size-2 bg-background border shadow-xs"
        style={{ borderColor: box.color }}
      />
      <span
        className="absolute -bottom-1.5 -right-1.5 size-2 bg-background border shadow-xs"
        style={{ borderColor: box.color }}
      />

      {/* Top-Left Agent & Action Badge - exactly matching screenshot (e.g. A-03 · inspecting) */}
      <div
        className="absolute -top-5.5 sm:-top-6 left-0 max-w-[calc(100vw-28px)] overflow-hidden px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono font-semibold shadow-md flex items-center gap-1.5 whitespace-nowrap leading-none select-none border border-black/10"
        style={{
          backgroundColor: box.color,
          color: badgeTextColor,
        }}
      >
        <span className="truncate">{box.label}</span>
      </div>

      {/* Bottom-Right Dimensions Display - exactly matching screenshot (e.g. 441 × 578) */}
      <div
        className="absolute -bottom-4.5 sm:-bottom-5 right-0 font-mono text-[9px] sm:text-[11px] font-semibold tabular-nums select-none tracking-tight"
        style={{ color: box.color }}
      >
        {Math.round(box.width)} × {Math.round(box.height)}
      </div>
    </div>
  );
};
