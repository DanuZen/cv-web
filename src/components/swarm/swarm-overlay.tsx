"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { SwarmAgentData, AgentState, InspectionBox } from "./types";
import { SwarmCursor } from "./swarm-cursor";
import { InspectionBoxView } from "./inspection-box";
import { swarmAudio } from "./audio";

const AGENT_TEMPLATES: SwarmAgentData[] = [
  { id: "a1", name: "Ada", color: "#0D99FF" },       // Figma Blue
  { id: "a2", name: "Linus", color: "#0D99FF" },     // Figma Blue
  { id: "a3", name: "A-03", color: "#0D99FF" },      // Figma Blue (Interactive Hover Co-Pilot)
  { id: "a4", name: "Alan", color: "#0D99FF" },      // Figma Blue
  { id: "a5", name: "Devon", color: "#0D99FF" },     // Figma Blue
  { id: "a6", name: "Grace", color: "#0D99FF" },     // Figma Blue
];

const MAX_ACTIVE_AGENTS = 5; // Ambient workers

// Boundary limits bounded by the progressive blur effects in layout.tsx:
// Top blur height: 40px (+2px buffer = 42px)
// Bottom blur height: 110px
const TOP_BLUR_LIMIT = 42;
const BOTTOM_BLUR_OFFSET = 110;

const getBlurBoundaries = () => {
  if (typeof window === "undefined") {
    return { top: 42, bottom: 800 };
  }
  return {
    top: TOP_BLUR_LIMIT,
    bottom: window.innerHeight - BOTTOM_BLUR_OFFSET,
  };
};

const createInitialPool = (): AgentState[] =>
  AGENT_TEMPLATES.map((t) => ({
    id: t.id,
    name: t.name,
    color: t.color,
    x: -100,
    y: -100,
    vx: 0,
    vy: 0,
    targetX: -100,
    targetY: -100,
    action: "idle",
    mode: "docked",
    targetElement: null,
    inspectDuration: 0,
    inspectStart: 0,
    opacity: 0,
    trail: [],
  }));

export default function SwarmOverlay() {
  const [active, setActive] = useState(true);
  const [agents, setAgents] = useState<AgentState[]>(createInitialPool);
  const [boxes, setBoxes] = useState<InspectionBox[]>([]);

  const agentsRef = useRef<AgentState[]>(createInitialPool());
  const hoverBoxRef = useRef<InspectionBox | null>(null);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);
  const lastSoundHoverCardRef = useRef<HTMLElement | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Resize canvas handler
  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // Track user mouse position for hover co-pilot detection
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mousePosRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Listen for elements signaling completion
  useEffect(() => {
    const handleCompleted = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      target.dataset.swarmStatus = "built";

      // Instantly dock any agent inspecting this element
      agentsRef.current.forEach((agent) => {
        if (agent.targetElement === target) {
          agent.mode = "docked";
          agent.targetElement = null;
          agent.opacity = 0;
        }
      });
    };

    document.addEventListener("swarm:completed", handleCompleted, true);
    return () => {
      document.removeEventListener("swarm:completed", handleCompleted, true);
    };
  }, []);

  // Find next unbuilt element that NO OTHER AGENT is currently working on (Top-to-Bottom order)
  const findNextUnbuiltTarget = useCallback((): HTMLElement | null => {
    if (typeof window === "undefined") return null;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-swarm-target="true"]')
    );

    // Get elements currently claimed by active agents
    const claimedElements = new Set(
      agentsRef.current
        .filter((a) => a.mode !== "docked" && a.targetElement)
        .map((a) => a.targetElement!)
    );

    const eligible: { el: HTMLElement; top: number }[] = [];

    const { top: blurTop, bottom: blurBottom } = getBlurBoundaries();

    for (const el of targets) {
      const status = el.dataset.swarmStatus;
      if (status === "built" || status === "building") continue;
      if (claimedElements.has(el)) continue;

      const r = el.getBoundingClientRect();
      const isTarget = el.dataset.swarmTarget === "true";

      // Strictly check if visible between the top and bottom progressive blur boundaries
      if (
        r.bottom > blurTop &&
        r.top < blurBottom &&
        (isTarget || (r.width > 15 && r.height > 8))
      ) {
        eligible.push({ el, top: r.top });
      }
    }

    if (eligible.length === 0) return null;

    // Build in strictly natural top-to-bottom order
    eligible.sort((a, b) => a.top - b.top);
    return eligible[0].el;
  }, []);

  // Main Animation Physics & Dispatch Loop
  useEffect(() => {
    if (!active) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min(32, time - lastTime);
      lastTime = time;

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      const curAgents = agentsRef.current;

      // =========================================================================
      // 1. DEDICATED HOVER CO-PILOT AGENT (A-03): Tracks card approached by mouse
      // =========================================================================
      let approachedCard: HTMLElement | null = null;
      let bestScore = Infinity;

      if (mousePosRef.current) {
        const { x, y } = mousePosRef.current;
        // Strictly target INDIVIDUAL cards marked with data-swarm-hover-card="true"
        // (Per card only - never section containers or whole rows)
        const candidateCards = Array.from(
          document.querySelectorAll<HTMLElement>(
            '[data-swarm-hover-card="true"]'
          )
        );

        const { top: blurTop, bottom: blurBottom } = getBlurBoundaries();
        for (const card of candidateCards) {
          const r = card.getBoundingClientRect();
          // Filter out tiny or invisible elements, include individual badges (>= 45x20) up to large cards
          if (r.width < 45 || r.height < 20) continue;
          if (r.bottom <= blurTop || r.top >= blurBottom) continue;

          const isInside =
            x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
          const dx = Math.max(r.left - x, 0, x - r.right);
          const dy = Math.max(r.top - y, 0, y - r.bottom);
          const dist = Math.hypot(dx, dy);

          let score: number;
          if (isInside) {
            // Direct hover takes absolute priority!
            // In case of multiple nested/overlapping cards, prefer the smaller specific card
            const area = r.width * r.height;
            score = area * 0.0001;
          } else if (dist < 40) {
            // Proximity threshold of 40px when cursor is close to a specific card
            score = 1000 + dist;
          } else {
            continue;
          }

          if (score < bestScore) {
            bestScore = score;
            approachedCard = card;
          }
        }
      }

      const hoverAgent = curAgents.find((a) => a.id === "a3");
      if (hoverAgent) {
        if (approachedCard) {
          const r = approachedCard.getBoundingClientRect();

          // Play chime sound when switching to a new card
          if (lastSoundHoverCardRef.current !== approachedCard) {
            swarmAudio.playInspectSound(hoverAgent.x / window.innerWidth);
            lastSoundHoverCardRef.current = approachedCard;
          }

          // Target position: Pointer arrow tip precisely at top-right corner handle (matching Figma reference)
          const isNearRightEdge = r.right + 110 > window.innerWidth;
          const cursorTargetX = isNearRightEdge
            ? r.right - 18
            : r.right + 2;
          const cursorTargetY = r.top - 2;

          hoverAgent.targetX = cursorTargetX;
          hoverAgent.targetY = cursorTargetY;

          // If agent was hidden, smoothly spawn nearby
          if (hoverAgent.opacity < 0.1) {
            hoverAgent.x = cursorTargetX + 30;
            hoverAgent.y = cursorTargetY - 20;
            hoverAgent.vx = 0;
            hoverAgent.vy = 0;
          }

          hoverAgent.mode = "inspect";
          hoverAgent.action = "inspecting";
          hoverAgent.opacity = 1;
          hoverAgent.targetElement = approachedCard;

          // Snappy spring physics towards top-right corner
          const dx = hoverAgent.targetX - hoverAgent.x;
          const dy = hoverAgent.targetY - hoverAgent.y;
          hoverAgent.vx += dx * 0.24;
          hoverAgent.vy += dy * 0.24;
          hoverAgent.vx *= 0.65;
          hoverAgent.vy *= 0.65;
          hoverAgent.x += hoverAgent.vx;
          hoverAgent.y += hoverAgent.vy;

          // Live hover inspection box pinned to the individual card
          hoverBoxRef.current = {
            id: "hover-copilot-box",
            agentName: hoverAgent.name,
            color: hoverAgent.color,
            x: Math.max(2, r.left - 3),
            y: r.top - 3,
            width: Math.min(window.innerWidth - 6, r.width + 6),
            height: r.height + 6,
            label: `${hoverAgent.name} · inspecting`,
            opacity: 1,
          };
        } else {
          // Mouse moved away from cards
          lastSoundHoverCardRef.current = null;
          if (hoverBoxRef.current) {
            hoverBoxRef.current.opacity = Math.max(0, hoverBoxRef.current.opacity - 0.04);
            if (hoverBoxRef.current.opacity <= 0.02) {
              hoverBoxRef.current = null;
            }
          }

          if (hoverAgent.mode === "inspect") {
            hoverAgent.opacity = Math.max(0, hoverAgent.opacity - 0.03);
            if (hoverAgent.opacity <= 0.02) {
              hoverAgent.mode = "docked";
              hoverAgent.targetElement = null;
            }
          }
        }
      }

      // =========================================================================
      // 2. AMBIENT BUILD WORKERS (Ada, Linus, Alan): Top-to-bottom automatic builds
      // =========================================================================
      const ambientAgents = curAgents.filter((a) => a.id !== "a3");
      let activeAmbientCount = ambientAgents.filter((a) => a.mode !== "docked").length;

      while (activeAmbientCount < MAX_ACTIVE_AGENTS) {
        const targetEl = findNextUnbuiltTarget();
        if (!targetEl) break;

        const idleAgent = ambientAgents.find((a) => a.mode === "docked");
        if (!idleAgent) break;

        // Claim element immediately
        targetEl.dataset.swarmStatus = "building";
        idleAgent.targetElement = targetEl;

        const rect = targetEl.getBoundingClientRect();
        const isNearRightEdge = rect.right + 110 > window.innerWidth;
        idleAgent.targetX = isNearRightEdge ? rect.right - 18 : rect.right + 2;
        idleAgent.targetY = rect.top - 2;

        // Snappy spawn close to target for immediate fast response
        idleAgent.x = idleAgent.targetX + (Math.random() > 0.5 ? 40 : -40);
        idleAgent.y = Math.max(10, idleAgent.targetY - 30);
        idleAgent.vx = 0;
        idleAgent.vy = 0;
        idleAgent.mode = "fly";
        idleAgent.opacity = 1;
        idleAgent.action = targetEl.dataset.swarmAction || "inspecting";
        idleAgent.trail = [];
        activeAmbientCount++;
      }

      // Physics and state update for ambient agents
      curAgents.forEach((agent) => {
        // Skip hover copilot (handled by dedicated hover tracker above)
        if (agent.id === "a3") {
          // Render motion trails for a3
          if (agent.opacity > 0.1) {
            agent.trail.push({ x: agent.x, y: agent.y });
            if (agent.trail.length > 6) {
              agent.trail.shift();
            }

            if (ctx && agent.trail.length > 2) {
              ctx.beginPath();
              ctx.moveTo(agent.trail[0].x, agent.trail[0].y);
              for (let i = 1; i < agent.trail.length; i++) {
                ctx.lineTo(agent.trail[i].x, agent.trail[i].y);
              }
              ctx.strokeStyle = `${agent.color}40`;
              ctx.lineWidth = 1.5;
              ctx.lineCap = "round";
              ctx.stroke();
            }
          }
          return;
        }

        if (agent.mode === "docked") {
          agent.opacity = Math.max(0, agent.opacity - 0.05);
          return;
        }

        // Mode: Inspecting
        if (agent.mode === "inspect") {
          const el = agent.targetElement;
          if (el && document.body.contains(el)) {
            const r = el.getBoundingClientRect();
            const { top: blurTop, bottom: blurBottom } = getBlurBoundaries();

            // Strict boundary: If target element or cursor has passed into or beyond blur regions:
            // "jika sudah terlewat atau tidak ada dilayar ... batasnya efek blur yang ada di atas bawah web ni"
            if (
              r.bottom <= blurTop ||
              r.top >= blurBottom ||
              agent.y <= blurTop ||
              agent.y >= blurBottom
            ) {
              el.dataset.swarmStatus = "built";
              agent.mode = "docked";
              agent.targetElement = null;
              agent.opacity = 0;
              return;
            }

            // Position cursor precisely at top-right handle of element
            const isNearRightEdge = r.right + 110 > window.innerWidth;
            agent.targetX = isNearRightEdge ? r.right - 18 : r.right + 2;
            agent.targetY = r.top - 2;

            // Spring follow element as it moves/expands
            const dx = agent.targetX - agent.x;
            const dy = agent.targetY - agent.y;
            agent.vx += dx * 0.22;
            agent.vy += dy * 0.22;
            agent.vx *= 0.65;
            agent.vy *= 0.65;
            agent.x += agent.vx;
            agent.y += agent.vy;

            // Check if element is still actively running its typing or build animation
            const isStillBuilding = el.dataset.swarmStatus === "building";
            const elapsed = time - agent.inspectStart;
            const timeout = elapsed > 10000; // Generous safety ceiling (10s max, never prematurely interrupts active typing or animation)

            // Instantly dock as soon as element finishes building or times out
            if (!isStillBuilding || timeout) {
              el.dataset.swarmStatus = "built";
              agent.mode = "docked";
              agent.targetElement = null;
              agent.opacity = 0;
            }
          } else {
            agent.mode = "docked";
            agent.targetElement = null;
            agent.opacity = 0;
          }
        }
        // Mode: Flying to target
        else if (agent.mode === "fly") {
          const el = agent.targetElement;
          if (!el || !document.body.contains(el) || el.dataset.swarmStatus === "built") {
            agent.mode = "docked";
            agent.targetElement = null;
            agent.opacity = 0;
            return;
          }

          const r = el.getBoundingClientRect();
          const { top: blurTop, bottom: blurBottom } = getBlurBoundaries();

          // If target is beyond the blur boundaries, cancel flight immediately
          if (r.bottom <= blurTop || r.top >= blurBottom) {
            el.dataset.swarmStatus = "idle";
            agent.mode = "docked";
            agent.targetElement = null;
            agent.opacity = 0;
            return;
          }

          const isNearRightEdge = r.right + 110 > window.innerWidth;
          agent.targetX = isNearRightEdge ? r.right - 18 : r.right + 2;
          agent.targetY = r.top - 2;

          const dx = agent.targetX - agent.x;
          const dy = agent.targetY - agent.y;
          const dist = Math.hypot(dx, dy);

          // Snappy spring physics towards target
          agent.vx += dx * 0.18;
          agent.vy += dy * 0.18;
          agent.vx *= 0.68;
          agent.vy *= 0.68;

          agent.x += agent.vx;
          agent.y += agent.vy;

          // Arrived at target element!
          if (dist < 26) {
            agent.mode = "inspect";
            agent.inspectStart = time;
            agent.inspectDuration = 600;

            // 1. Trigger element build
            el.dispatchEvent(new CustomEvent("swarm:build"));

            // 2. Play audio inspect sound
            swarmAudio.playInspectSound(agent.x / window.innerWidth);
          }
        }

        // Motion Trails
        if (agent.opacity > 0.1) {
          agent.trail.push({ x: agent.x, y: agent.y });
          if (agent.trail.length > 6) {
            agent.trail.shift();
          }

          if (ctx && agent.trail.length > 2) {
            ctx.beginPath();
            ctx.moveTo(agent.trail[0].x, agent.trail[0].y);
            for (let i = 1; i < agent.trail.length; i++) {
              ctx.lineTo(agent.trail[i].x, agent.trail[i].y);
            }
            ctx.strokeStyle = `${agent.color}40`;
            ctx.lineWidth = 1.5;
            ctx.lineCap = "round";
            ctx.stroke();
          }
        }
      });

      // Active live inspection boxes for all ambient agents currently inspecting
      const activeInspectionBoxes: InspectionBox[] = [];
      const { top: blurTop, bottom: blurBottom } = getBlurBoundaries();

      ambientAgents.forEach((agent) => {
        if (
          agent.mode === "inspect" &&
          agent.targetElement &&
          document.body.contains(agent.targetElement) &&
          agent.targetElement.dataset.swarmStatus === "building"
        ) {
          const r = agent.targetElement.getBoundingClientRect();
          if (
            r.bottom > blurTop &&
            r.top < blurBottom &&
            r.width > 20 &&
            r.height > 10
          ) {
            const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
            const displayAction =
              isMobile && agent.action.length > 16
                ? `${agent.action.slice(0, 14)}…`
                : agent.action;

            activeInspectionBoxes.push({
              id: `box-${agent.id}`,
              agentName: agent.name,
              color: agent.color,
              x: Math.max(2, r.left - 3),
              y: r.top - 3,
              width: Math.min(window.innerWidth - 6, r.width + 6),
              height: r.height + 6,
              label: `${agent.name} · ${displayAction}`,
              opacity: 0.95,
            });
          }
        }
      });

      // Combine ambient active boxes with hover copilot box
      const finalBoxes: InspectionBox[] = [...activeInspectionBoxes];
      if (hoverBoxRef.current) {
        finalBoxes.push(hoverBoxRef.current);
      }
      setBoxes(finalBoxes);

      // Commit visible agents state
      setAgents([...curAgents]);

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [active, findNextUnbuiltTarget]);

  // If swarm is turned off, immediately reveal all elements so content is accessible
  useEffect(() => {
    if (!active) {
      const targets = document.querySelectorAll<HTMLElement>('[data-swarm-target="true"]');
      targets.forEach((el) => {
        el.dataset.swarmStatus = "built";
        el.dispatchEvent(new CustomEvent("swarm:build"));
      });
    }
  }, [active]);

  // Handle Scroll: Instantly dismiss off-boundary agents, and reset off-screen elements on scroll up
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      // 1. Immediately dock any agent whose target or cursor entered/passed blur boundaries
      const { top: blurTop, bottom: blurBottom } = getBlurBoundaries();
      agentsRef.current.forEach((agent) => {
        if (agent.targetElement) {
          const r = agent.targetElement.getBoundingClientRect();
          if (r.bottom <= blurTop || r.top >= blurBottom) {
            agent.targetElement.dataset.swarmStatus = "built";
            agent.mode = "docked";
            agent.targetElement = null;
            agent.opacity = 0;
          }
        }
      });

      // 2. Reset elements that are scrolled far away so scrolling back up can trigger re-animation
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const targets = Array.from(
          document.querySelectorAll<HTMLElement>('[data-swarm-target="true"]')
        );

        targets.forEach((el) => {
          const r = el.getBoundingClientRect();
          // If scrolled outside the blur boundaries (out of visible screen)
          if (r.bottom <= blurTop || r.top >= blurBottom) {
            if (el.dataset.swarmStatus === "built") {
              el.dataset.swarmStatus = "idle";
              el.dispatchEvent(new CustomEvent("swarm:reset"));
            }
          }
        });
      }, 35);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Only render agents that are actively working / flying / inspecting (not docked) AND within visible blur boundaries
  const { top: blurTop, bottom: blurBottom } = getBlurBoundaries();
  const visibleAgents = agents.filter(
    (a) => (a.mode !== "docked" || a.opacity > 0.02) && a.y > blurTop && a.y < blurBottom
  );

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
      aria-hidden="true"
    >
      {/* Canvas for motion particle trails */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 size-full pointer-events-none"
      />

      {/* Figma Selection Boxes (including Hover Co-Pilot Box with corner handles & dimensions) */}
      {active &&
        boxes.map((box) => (
          <InspectionBoxView key={box.id} box={box} />
        ))}

      {/* Multi-Agent Figma Cursors */}
      {active &&
        visibleAgents.map((agent) => (
          <SwarmCursor
            key={agent.id}
            name={agent.name}
            color={agent.color}
            x={agent.x}
            y={agent.y}
            action={agent.action}
            isInspecting={agent.mode === "inspect"}
            opacity={agent.opacity}
          />
        ))}
    </div>
  );
}
