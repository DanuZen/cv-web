"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { SwarmAgentData, AgentState, InspectionBox } from "./types";
import { SwarmCursor } from "./swarm-cursor";
import { InspectionBoxView } from "./inspection-box";
import { SwarmBar } from "./swarm-bar";
import { swarmAudio } from "./audio";

const AGENT_TEMPLATES: SwarmAgentData[] = [
  { id: "a1", name: "Ada", color: "#F24E1E" },       // Figma Red
  { id: "a2", name: "Linus", color: "#0D99FF" },     // Figma Blue
  { id: "a3", name: "Grace", color: "#0ACF83" },     // Figma Green
  { id: "a4", name: "Alan", color: "#A259FF" },      // Figma Purple
];

const MAX_ACTIVE_AGENTS = 3; // Up to 3 active agents working concurrently on distinct elements

export default function SwarmOverlay() {
  const [active, setActive] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [statusText, setStatusText] = useState("Swarm ready");
  const [agents, setAgents] = useState<AgentState[]>([]);
  const [boxes, setBoxes] = useState<InspectionBox[]>([]);

  const agentsRef = useRef<AgentState[]>([]);
  const boxesRef = useRef<InspectionBox[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Initialize pool of agents (all initially docked & hidden)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const pool: AgentState[] = AGENT_TEMPLATES.map((t) => ({
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

    agentsRef.current = pool;
    setAgents(pool);
  }, []);

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

    for (const el of targets) {
      const status = el.dataset.swarmStatus;
      if (status === "built" || status === "building") continue;
      if (claimedElements.has(el)) continue;

      const r = el.getBoundingClientRect();
      // Ignore if element is giant (e.g. layout wrapper > 850px wide AND > 200px tall)
      if (r.width > 850 && r.height > 200) continue;

      // Check if visible inside the viewport
      if (
        r.top < window.innerHeight - 30 &&
        r.bottom > 30 &&
        r.width > 15 &&
        r.height > 8
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
      const curBoxes = [...boxesRef.current];

      // Update Inspection Boxes opacity & fadeout
      const updatedBoxes: InspectionBox[] = [];
      for (const box of curBoxes) {
        box.opacity = Math.max(0, box.opacity - 0.025);
        if (box.opacity > 0.05) {
          updatedBoxes.push(box);
        }
      }
      boxesRef.current = updatedBoxes;
      setBoxes(updatedBoxes);

      // Check how many agents are currently active
      const activeCount = curAgents.filter((a) => a.mode !== "docked").length;

      // If active agents < MAX_ACTIVE_AGENTS, try to dispatch a docked agent
      if (activeCount < MAX_ACTIVE_AGENTS) {
        const targetEl = findNextUnbuiltTarget();
        if (targetEl) {
          // Find first docked agent
          const idleAgent = curAgents.find((a) => a.mode === "docked");
          if (idleAgent) {
            // Claim element immediately
            targetEl.dataset.swarmStatus = "building";
            idleAgent.targetElement = targetEl;

            const rect = targetEl.getBoundingClientRect();
            if (rect.width < 180) {
              idleAgent.targetX = rect.left + rect.width / 2;
              idleAgent.targetY = rect.top + rect.height / 2;
            } else {
              idleAgent.targetX = rect.left + Math.min(24, rect.width * 0.15);
              idleAgent.targetY = rect.top + Math.min(24, rect.height * 0.4);
            }

            // Spawn near the edge closest to target
            idleAgent.x = idleAgent.targetX + (Math.random() > 0.5 ? 80 : -80);
            idleAgent.y = Math.max(20, idleAgent.targetY - 60);
            idleAgent.vx = 0;
            idleAgent.vy = 0;
            idleAgent.mode = "fly";
            idleAgent.opacity = 1;
            idleAgent.action = targetEl.dataset.swarmAction || "inspecting";
            idleAgent.trail = [];
          }
        }
      }

      // Update Status Bar text
      const workingAgent = curAgents.find((a) => a.mode === "inspect");
      const flyingAgent = curAgents.find((a) => a.mode === "fly");
      if (workingAgent) {
        setStatusText(`${workingAgent.name} · ${workingAgent.action}`);
      } else if (flyingAgent) {
        setStatusText(`${flyingAgent.name} · moving to target`);
      } else {
        setStatusText("All visible elements built");
      }

      // Physics and state update per agent
      curAgents.forEach((agent) => {
        if (agent.mode === "docked") {
          agent.opacity = Math.max(0, agent.opacity - 0.05);
          return;
        }

        // Mode: Inspecting
        if (agent.mode === "inspect") {
          const el = agent.targetElement;
          if (el && document.body.contains(el)) {
            const r = el.getBoundingClientRect();
            if (r.width < 180) {
              agent.targetX = r.left + r.width / 2;
              agent.targetY = r.top + r.height / 2;
            } else {
              agent.targetX = r.left + Math.min(24, r.width * 0.15);
              agent.targetY = r.top + Math.min(24, r.height * 0.4);
            }
          }

          if (time - agent.inspectStart > agent.inspectDuration) {
            // Work complete! Mark element as built and dock agent
            if (agent.targetElement) {
              agent.targetElement.dataset.swarmStatus = "built";
            }
            agent.mode = "docked";
            agent.targetElement = null;
          } else {
            // Micro hovering motion
            agent.x = agent.targetX + Math.sin(time * 0.006) * 1.5;
            agent.y = agent.targetY + Math.cos(time * 0.006) * 1.5;
          }
        }
        // Mode: Flying to target
        else if (agent.mode === "fly") {
          const el = agent.targetElement;
          if (!el || !document.body.contains(el)) {
            agent.mode = "docked";
            return;
          }

          const r = el.getBoundingClientRect();
          if (r.width < 180) {
            agent.targetX = r.left + r.width / 2;
            agent.targetY = r.top + r.height / 2;
          } else {
            agent.targetX = r.left + Math.min(24, r.width * 0.15);
            agent.targetY = r.top + Math.min(24, r.height * 0.4);
          }

          const dx = agent.targetX - agent.x;
          const dy = agent.targetY - agent.y;
          const dist = Math.hypot(dx, dy);

          // Snappy spring physics towards target
          agent.vx += dx * 0.08;
          agent.vy += dy * 0.08;
          agent.vx *= 0.78;
          agent.vy *= 0.78;

          agent.x += agent.vx;
          agent.y += agent.vy;

          // Arrived at target element!
          if (dist < 18) {
            agent.mode = "inspect";
            agent.inspectStart = time;
            agent.inspectDuration = 800 + Math.random() * 400;

            // 1. TRIGGER THE ELEMENT'S ANIMATION (Starts right as cursor works!)
            el.dispatchEvent(new CustomEvent("swarm:build"));

            // 2. Play Audio click & inspect chime
            swarmAudio.playInspectSound(agent.x / window.innerWidth);

            // 3. Create Figma Selection Box around the element
            if (r.width > 20 && r.height > 10) {
              const newBox: InspectionBox = {
                id: `${agent.id}-${time}`,
                agentName: agent.name,
                color: agent.color,
                x: r.left - 3,
                y: r.top - 3,
                width: r.width + 6,
                height: r.height + 6,
                label: agent.name,
                opacity: 0.9,
              };
              boxesRef.current = [...boxesRef.current.slice(-1), newBox];
            }
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

      // Commit visible agents state
      setAgents([...curAgents]);

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [active, findNextUnbuiltTarget]);

  // Handle Scroll: Reset off-screen elements so scrolling back up triggers rebuilding!
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const targets = Array.from(
          document.querySelectorAll<HTMLElement>('[data-swarm-target="true"]')
        );

        targets.forEach((el) => {
          const r = el.getBoundingClientRect();
          // If scrolled off-screen (well above or below viewport)
          if (r.bottom < -80 || r.top > window.innerHeight + 80) {
            if (el.dataset.swarmStatus === "built") {
              el.dataset.swarmStatus = "idle";
              el.dispatchEvent(new CustomEvent("swarm:reset"));
            }
          }
        });
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const handleToggleActive = () => {
    setActive((prev) => !prev);
    swarmAudio.playClickSound();
  };

  const handleToggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    swarmAudio.setEnabled(nextVal);
  };

  // Only render agents that are actively working / flying (not docked)
  const visibleAgents = agents.filter(
    (a) => a.mode !== "docked" || a.opacity > 0.02
  );

  return (
    <>
      {/* Fullscreen Overlay for Cursors, Trails, and Selection Boxes */}
      <div
        className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
        aria-hidden="true"
      >
        {/* Canvas for motion particle trails */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 size-full pointer-events-none"
        />

        {/* Figma Selection Boxes */}
        {active &&
          boxes.map((box) => (
            <InspectionBoxView key={box.id} box={box} />
          ))}

        {/* Multi-Agent Figma Cursors (Only Active / Working Agents are Rendered) */}
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

      {/* Floating Control Pill Bar */}
      <SwarmBar
        active={active}
        onToggleActive={handleToggleActive}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        agents={AGENT_TEMPLATES}
        statusText={statusText}
      />
    </>
  );
}
