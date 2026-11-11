"use client";

import React, { useState } from "react";
import { Volume2, VolumeX, Play, Pause, Users, ChevronDown, ChevronUp } from "lucide-react";
import { SwarmAgentData } from "./types";

interface SwarmBarProps {
  active: boolean;
  onToggleActive: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  agents: SwarmAgentData[];
  statusText: string;
}

export const SwarmBar: React.FC<SwarmBarProps> = ({
  active,
  onToggleActive,
  soundEnabled,
  onToggleSound,
  agents,
  statusText,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      aria-label="Swarm Cursors Control"
      className="pointer-events-auto fixed bottom-20 sm:bottom-22 left-1/2 -translate-x-1/2 z-40 transition-all duration-300"
    >
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/80 bg-card/85 backdrop-blur-xl shadow-lg shadow-black/5 hover:border-border transition-all">
        {/* Swarm Status Indicator */}
        <div className="flex items-center gap-1.5 pl-1">
          <span className="relative flex h-2 w-2">
            {active && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            )}
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                active ? "bg-emerald-500" : "bg-muted-foreground/50"
              }`}
            />
          </span>
          <span className="text-[11px] font-medium tracking-tight text-foreground select-none max-w-[140px] sm:max-w-[200px] truncate">
            {active ? statusText || "Swarm active" : "Swarm paused"}
          </span>
        </div>

        {!collapsed && (
          <>
            <div className="h-3 w-px bg-border/60 mx-0.5" />

            {/* Overlapping Agent Avatar Dots */}
            <div className="hidden sm:flex items-center -space-x-1.5">
              {agents.slice(0, 5).map((a) => (
                <div
                  key={a.id}
                  className="size-3.5 rounded-full border border-card shadow-xs ring-1 ring-border/20 transition-transform hover:scale-125"
                  style={{ backgroundColor: a.color }}
                  title={`${a.name} (Active Agent)`}
                />
              ))}
              {agents.length > 5 && (
                <span className="pl-2 text-[10px] font-mono text-muted-foreground">
                  +{agents.length - 5}
                </span>
              )}
            </div>

            <div className="h-3 w-px bg-border/60 mx-0.5" />

            {/* Toggle Sound */}
            <button
              type="button"
              onClick={onToggleSound}
              className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              title={soundEnabled ? "Mute audio clicks" : "Enable sound synthesis"}
              aria-label={soundEnabled ? "Mute sound" : "Unmute sound"}
            >
              {soundEnabled ? (
                <Volume2 className="size-3.5 text-primary" />
              ) : (
                <VolumeX className="size-3.5" />
              )}
            </button>

            {/* Toggle Pause/Resume */}
            <button
              type="button"
              onClick={onToggleActive}
              className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              title={active ? "Pause swarm cursors" : "Resume swarm cursors"}
              aria-label={active ? "Pause swarm" : "Resume swarm"}
            >
              {active ? (
                <Pause className="size-3.5" />
              ) : (
                <Play className="size-3.5 text-emerald-500 fill-emerald-500" />
              )}
            </button>
          </>
        )}

        {/* Minimize / Expand Toggle */}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="p-0.5 text-muted-foreground/70 hover:text-foreground transition-colors"
          title={collapsed ? "Expand controls" : "Collapse"}
          aria-label={collapsed ? "Expand controls" : "Collapse controls"}
        >
          {collapsed ? (
            <ChevronUp className="size-3" />
          ) : (
            <ChevronDown className="size-3" />
          )}
        </button>
      </div>
    </aside>
  );
};

