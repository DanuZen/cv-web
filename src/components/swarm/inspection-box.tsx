"use client";

import React from "react";
import { InspectionBox as InspectionBoxType } from "./types";

interface Props {
  box: InspectionBoxType;
}

export const InspectionBoxView: React.FC<Props> = ({ box }) => {
  return (
    <div
      className="absolute pointer-events-none z-30 transition-opacity duration-300 rounded-sm"
      style={{
        transform: `translate3d(${box.x}px, ${box.y}px, 0)`,
        width: `${box.width}px`,
        height: `${box.height}px`,
        border: `1.5px solid ${box.color}`,
        opacity: box.opacity,
        boxShadow: `0 0 10px ${box.color}25`,
      }}
    >
      {/* 4 Corner Resize Handles */}
      <span
        className="absolute -top-1 -left-1 size-1.5 bg-background border rounded-xs"
        style={{ borderColor: box.color }}
      />
      <span
        className="absolute -top-1 -right-1 size-1.5 bg-background border rounded-xs"
        style={{ borderColor: box.color }}
      />
      <span
        className="absolute -bottom-1 -left-1 size-1.5 bg-background border rounded-xs"
        style={{ borderColor: box.color }}
      />
      <span
        className="absolute -bottom-1 -right-1 size-1.5 bg-background border rounded-xs"
        style={{ borderColor: box.color }}
      />

      {/* Dimension & Label Pill */}
      <div
        className="absolute -top-5 left-0 px-2 py-0.5 rounded text-[10px] font-sans font-medium text-white shadow-sm flex items-center gap-1.5 whitespace-nowrap leading-none select-none"
        style={{ backgroundColor: box.color }}
      >
        <span className="font-semibold">{box.label}</span>
        <span className="opacity-60 text-[8px]">●</span>
        <span className="font-mono text-[9px] tabular-nums opacity-95">
          {Math.round(box.width)} × {Math.round(box.height)}
        </span>
      </div>
    </div>
  );
};
