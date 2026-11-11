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
  { id: "a5", name: "Margaret", color: "#FFC700" },  // Figma Amber
  { id: "a6", name: "Sophie", color: "#FF7262" },    // Figma Coral
];

export default function SwarmOverlay() {
  const [active, setActive] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [statusText, setStatusText] = useState("Swarm active");
  const [agents, setAgents] = useState<AgentState[]>([]);
  const [boxes, setBoxes] = useState<InspectionBox[]>([]);

  const agentsRef = useRef<AgentState[]>([]);
  const boxesRef = useRef<InspectionBox[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const userMouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  // Determine context verb for an element
  const getContextAction = useCallback((el: HTMLElement): string => {
    const text = el.innerText?.toLowerCase() || "";
    const id = el.closest("section")?.id || "";

    if (id === "hero") {
      if (text.includes("rian")) return "identifying engineer";
      return "reading bio";
    }
    if (id === "about") return "analyzing background";
    if (id === "work") {
      if (text.includes("mbois")) return "reviewing PT Mbois";
      if (text.includes("howarts")) return "inspecting Howarts";
      if (text.includes("infitech")) return "checking UNP lead";
      return "verifying role";
    }
    if (id === "education") return "checking degree";
    if (id === "skills") {
      const firstWord = text.split(/\s+/)[0];
      return firstWord ? `evaluating ${firstWord}` : "tagging skills";
    }
    if (id === "projects") {
      if (text.includes("siakad")) return "testing SIAKAD";
      if (text.includes("sinergis")) return "inspecting LPPM";
      if (text.includes("sumatrans")) return "testing Sumatrans";
      if (text.includes("sicanting")) return "testing SiCanting";
      if (text.includes("replan")) return "inspecting SaaS";
      if (text.includes("paud")) return "checking PAUD gov";
      if (text.includes("medclass")) return "inspecting MedClass";
      if (text.includes("phyxel")) return "testing IoT game";
      return "inspecting project";
    }
    if (id === "certifications") {
      if (text.includes("mikrotik") || text.includes("mtcna")) return "verifying MTCNA";
      if (text.includes("aws")) return "validating AWS";
      return "verifying credential";
    }
    if (id === "contact") return "copying email";

    return "observing";
  }, []);

  // Pick a visible target element
  const pickTarget = useCallback(
    (agent: AgentState): { x: number; y: number; el: HTMLElement | null; action: string } => {
      if (typeof window === "undefined") {
        return { x: 400, y: 300, el: null, action: "exploring" };
      }

      // Collect eligible targets currently visible in window
      const selector =
        "#hero h1, #hero p, #about, #work [data-state], #education a, #skills .border, #projects .border, #certifications .border, #contact a";
      const candidates = Array.from(document.querySelectorAll<HTMLElement>(selector)).filter((el) => {
        const r = el.getBoundingClientRect();
        return r.top < window.innerHeight && r.bottom > 0 && r.width > 20 && r.height > 10;
      });

      if (candidates.length === 0) {
        // Fallback random roam within viewport
        return {
          x: 60 + Math.random() * (window.innerWidth - 120),
          y: 60 + Math.random() * (window.innerHeight - 160),
          el: null,
          action: "scouting viewport",
        };
      }

      // Choose random candidate
      const targetEl = candidates[Math.floor(Math.random() * candidates.length)];
      const rect = targetEl.getBoundingClientRect();

      // Pick point inside element
      const tx = rect.left + Math.random() * Math.max(10, rect.width * 0.7);
      const ty = rect.top + Math.random() * Math.max(10, rect.height * 0.7);
      const action = getContextAction(targetEl);

      return { x: tx, y: ty, el: targetEl, action };
    },
    [getContextAction]
  );

  // Initialize Agents
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Fewer agents on mobile screens
    const count = window.innerWidth < 768 ? 3 : AGENT_TEMPLATES.length;
    const initialAgents: AgentState[] = AGENT_TEMPLATES.slice(0, count).map((t, idx) => {
      const startX = 80 + (idx * (window.innerWidth - 160)) / count;
      const startY = 100 + Math.random() * 200;
      return {
        id: t.id,
        name: t.name,
        color: t.color,
        x: startX,
        y: startY,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        targetX: startX,
        targetY: startY,
        action: "joining",
        mode: "roam",
        targetElement: null,
        inspectDuration: 0,
        inspectStart: 0,
        trail: [],
      };
    });

    agentsRef.current = initialAgents;
    setAgents(initialAgents);
  }, []);

  // Track User Mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      userMouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      userMouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
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

  // Main Animation Physics Loop
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

      // Clear trail canvas with gentle fade
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      const curAgents = agentsRef.current;
      const curBoxes = [...boxesRef.current];
      const userMouse = userMouseRef.current;

      // Update Inspection Boxes opacity & expiration
      const updatedBoxes: InspectionBox[] = [];
      for (const box of curBoxes) {
        box.opacity = Math.max(0, box.opacity - 0.02);
        if (box.opacity > 0.05) {
          updatedBoxes.push(box);
        }
      }
      boxesRef.current = updatedBoxes;
      setBoxes(updatedBoxes);

      // Active inspecting agent summary
      const inspectingAgent = curAgents.find((a) => a.mode === "inspect");
      if (inspectingAgent) {
        setStatusText(`${inspectingAgent.name} · ${inspectingAgent.action}`);
      } else {
        setStatusText(`${curAgents.length} agents exploring`);
      }

      // Update each agent
      curAgents.forEach((agent) => {
        // If inspecting
        if (agent.mode === "inspect") {
          if (time - agent.inspectStart > agent.inspectDuration) {
            // Finished inspecting, choose next target
            const next = pickTarget(agent);
            agent.targetX = next.x;
            agent.targetY = next.y;
            agent.targetElement = next.el;
            agent.action = next.action;
            agent.mode = "seek";
          } else {
            // Subtle breathing micro-motion while inspecting
            agent.x += Math.sin(time * 0.005 + agent.x) * 0.3;
            agent.y += Math.cos(time * 0.005 + agent.y) * 0.3;
          }
        } else {
          // Seeking or Roaming
          const dx = agent.targetX - agent.x;
          const dy = agent.targetY - agent.y;
          const dist = Math.hypot(dx, dy);

          // Force towards target
          const speed = dist > 300 ? 0.045 : 0.035;
          agent.vx += dx * speed;
          agent.vy += dy * speed;

          // User Mouse Avoidance (scatter gently if user cursor approaches)
          if (userMouse.active) {
            const mdx = agent.x - userMouse.x;
            const mdy = agent.y - userMouse.y;
            const mdist = Math.hypot(mdx, mdy);
            if (mdist < 100 && mdist > 0) {
              const repulse = (100 - mdist) * 0.08;
              agent.vx += (mdx / mdist) * repulse;
              agent.vy += (mdy / mdist) * repulse;
              agent.action = "stepping aside";
            }
          }

          // Damping friction
          agent.vx *= 0.86;
          agent.vy *= 0.86;

          // Apply velocity
          agent.x += agent.vx;
          agent.y += agent.vy;

          // Arrived at target
          if (dist < 18) {
            agent.mode = "inspect";
            agent.inspectStart = time;
            agent.inspectDuration = 1400 + Math.random() * 1200;

            // Trigger sound & selection box
            swarmAudio.playInspectSound(agent.x / window.innerWidth);

            if (agent.targetElement && document.body.contains(agent.targetElement)) {
              const r = agent.targetElement.getBoundingClientRect();
              if (r.width > 20 && r.height > 10) {
                // Add inspection box (limit to max 2 concurrent boxes)
                const newBox: InspectionBox = {
                  id: `${agent.id}-${time}`,
                  agentName: agent.name,
                  color: agent.color,
                  x: r.left,
                  y: r.top,
                  width: r.width,
                  height: r.height,
                  label: agent.name,
                  opacity: 0.9,
                };
                boxesRef.current = [...boxesRef.current.slice(-1), newBox];
              }
            }
          }
        }

        // Keep inside screen bounds
        agent.x = Math.max(10, Math.min(window.innerWidth - 20, agent.x));
        agent.y = Math.max(10, Math.min(window.innerHeight - 20, agent.y));

        // Manage motion trails
        agent.trail.push({ x: agent.x, y: agent.y });
        if (agent.trail.length > 7) {
          agent.trail.shift();
        }

        // Draw particle trails onto canvas
        if (ctx && agent.trail.length > 2) {
          ctx.beginPath();
          ctx.moveTo(agent.trail[0].x, agent.trail[0].y);
          for (let i = 1; i < agent.trail.length; i++) {
            ctx.lineTo(agent.trail[i].x, agent.trail[i].y);
          }
          ctx.strokeStyle = `${agent.color}40`; // 25% opacity
          ctx.lineWidth = 1.5;
          ctx.lineCap = "round";
          ctx.stroke();

          // Small fading dot at trail head
          ctx.beginPath();
          ctx.arc(agent.x, agent.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = agent.color;
          ctx.fill();
        }
      });

      // Commit agent positions to React state
      setAgents([...curAgents]);

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [active, pickTarget]);

  // Handle Scroll to re-target
  useEffect(() => {
    if (!active) return;

    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // Redirect idle agents to newly visible sections
        agentsRef.current.forEach((agent) => {
          if (agent.mode !== "inspect") {
            const next = pickTarget(agent);
            agent.targetX = next.x;
            agent.targetY = next.y;
            agent.targetElement = next.el;
            agent.action = next.action;
          }
        });
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [active, pickTarget]);

  const handleToggleActive = () => {
    setActive((prev) => !prev);
    swarmAudio.playClickSound();
  };

  const handleToggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    swarmAudio.setEnabled(nextVal);
  };

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

        {/* Multi-Agent Figma Cursors */}
        {active &&
          agents.map((agent) => (
            <SwarmCursor
              key={agent.id}
              name={agent.name}
              color={agent.color}
              x={agent.x}
              y={agent.y}
              action={agent.action}
              isInspecting={agent.mode === "inspect"}
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

