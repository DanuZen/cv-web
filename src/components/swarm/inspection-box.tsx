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
        boxShadow: `0 0 12px ${box.color}20`,
      }}
    >
      {/* 4 Corner Handles */}
      <span
        className="absolute -top-1 -left-1 size-2 bg-background border rounded-xs"
        style={{ borderColor: box.color }}
      />
      <span
        className="absolute -top-1 -right-1 size-2 bg-background border rounded-xs"
        style={{ borderColor: box.color }}
      />
      <span
        className="absolute -bottom-1 -left-1 size-2 bg-background border rounded-xs"
        style={{ borderColor: box.color }}
      />
      <span
        className="absolute -bottom-1 -right-1 size-2 bg-background border rounded-xs"
        style={{ borderColor: box.color }}
      />

      {/* Dimension & Label Pill */}
      <div
        className="absolute -top-6 left-0 px-2 py-0.5 rounded text-[10px] font-mono font-medium text-white shadow-sm flex items-center gap-1.5"
        style={{ backgroundColor: box.color }}
      >
        <span>{box.label}</span>
        <span className="opacity-70">|</span>
        <span className="tabular-nums">
          {Math.round(box.width)} × {Math.round(box.height)}
        </span>
      </div>
    </div>
  );
};

