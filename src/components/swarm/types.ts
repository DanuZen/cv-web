export interface SwarmAgentData {
  id: string;
  name: string;
  color: string;
}

export interface AgentState {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  action: string;
  mode: "seek" | "inspect" | "roam" | "scatter";
  targetElement: HTMLElement | null;
  inspectDuration: number;
  inspectStart: number;
  trail: { x: number; y: number }[];
}

export interface InspectionBox {
  id: string;
  agentName: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  opacity: number;
}

