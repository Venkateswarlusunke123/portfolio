"use client";

import { useEffect, useRef } from "react";

type NodeType = "agent" | "tool" | "memory" | "llm";

interface GraphNode {
  id: string;
  nx: number; // normalized 0–1
  ny: number;
  type: NodeType;
  label: string;
  pulsePhase: number;
  pulseSpeed: number;
}

interface DataPacket {
  progress: number;
  speed: number;
  active: boolean;
}

interface GraphEdge {
  from: string;
  to: string;
  packet: DataPacket;
  spawnTimer: number;
}

const NODE_COLORS: Record<NodeType, string> = {
  agent:  "#00d97e",
  tool:   "#0ea5e9",
  memory: "#7c3aed",
  llm:    "#f59e0b",
};

const NODES: GraphNode[] = [
  { id: "a1", nx: 0.08, ny: 0.12, type: "agent",  label: "User Agent",  pulsePhase: 0,   pulseSpeed: 2.1 },
  { id: "a2", nx: 0.22, ny: 0.28, type: "agent",  label: "Router",      pulsePhase: 1.2, pulseSpeed: 1.8 },
  { id: "a6", nx: 0.55, ny: 0.18, type: "agent",  label: "Planner",     pulsePhase: 1.4, pulseSpeed: 1.8 },
  { id: "a3", nx: 0.15, ny: 0.85, type: "agent",  label: "Executor",    pulsePhase: 0.3, pulseSpeed: 2.4 },
  { id: "a4", nx: 0.40, ny: 0.92, type: "agent",  label: "Responder",   pulsePhase: 1.1, pulseSpeed: 1.6 },
  { id: "a5", nx: 0.70, ny: 0.88, type: "agent",  label: "Validator",   pulsePhase: 2.0, pulseSpeed: 2.2 },
  { id: "a7", nx: 0.93, ny: 0.10, type: "agent",  label: "Monitor",     pulsePhase: 0.6, pulseSpeed: 2.2 },
  { id: "l1", nx: 0.45, ny: 0.08, type: "llm",    label: "GPT-4o",      pulsePhase: 0.4, pulseSpeed: 2.5 },
  { id: "l2", nx: 0.70, ny: 0.15, type: "llm",    label: "Llama",       pulsePhase: 2.1, pulseSpeed: 1.6 },
  { id: "l3", nx: 0.92, ny: 0.55, type: "llm",    label: "Embedder",    pulsePhase: 0.8, pulseSpeed: 1.9 },
  { id: "l4", nx: 0.33, ny: 0.22, type: "llm",    label: "Claude",      pulsePhase: 2.2, pulseSpeed: 2.0 },
  { id: "t1", nx: 0.35, ny: 0.42, type: "tool",   label: "LangChain",   pulsePhase: 0.7, pulseSpeed: 2.3 },
  { id: "t2", nx: 0.55, ny: 0.35, type: "tool",   label: "LangGraph",   pulsePhase: 1.5, pulseSpeed: 1.9 },
  { id: "t3", nx: 0.75, ny: 0.42, type: "tool",   label: "CrewAI",      pulsePhase: 0.2, pulseSpeed: 2.7 },
  { id: "t4", nx: 0.18, ny: 0.55, type: "tool",   label: "RAG",         pulsePhase: 1.9, pulseSpeed: 1.7 },
  { id: "t5", nx: 0.88, ny: 0.30, type: "tool",   label: "FastAPI",     pulsePhase: 0.9, pulseSpeed: 2.1 },
  { id: "t6", nx: 0.62, ny: 0.60, type: "tool",   label: "ReactJS",     pulsePhase: 1.3, pulseSpeed: 1.5 },
  { id: "t7", nx: 0.05, ny: 0.40, type: "tool",   label: "Python",      pulsePhase: 1.6, pulseSpeed: 2.1 },
  { id: "t8", nx: 0.10, ny: 0.70, type: "tool",   label: "Docker",      pulsePhase: 2.4, pulseSpeed: 1.7 },
  { id: "t9", nx: 0.82, ny: 0.52, type: "tool",   label: "AWS",         pulsePhase: 0.1, pulseSpeed: 2.5 },
  { id: "m1", nx: 0.28, ny: 0.70, type: "memory", label: "FAISS",       pulsePhase: 2.3, pulseSpeed: 1.4 },
  { id: "m2", nx: 0.48, ny: 0.78, type: "memory", label: "ChromaDB",    pulsePhase: 0.6, pulseSpeed: 2.0 },
  { id: "m3", nx: 0.82, ny: 0.68, type: "memory", label: "Context",     pulsePhase: 1.8, pulseSpeed: 1.8 },
  { id: "m4", nx: 0.95, ny: 0.82, type: "memory", label: "Vector DB",   pulsePhase: 0.5, pulseSpeed: 2.3 },
  { id: "m5", nx: 0.12, ny: 0.92, type: "memory", label: "Session",     pulsePhase: 1.7, pulseSpeed: 1.6 },
];

const EDGE_DEFS: { from: string; to: string }[] = [
  { from: "a1", to: "a2" },
  { from: "a2", to: "a6" },
  { from: "a2", to: "t4" },
  { from: "a6", to: "l4" },
  { from: "a6", to: "t1" },
  { from: "l4", to: "t2" },
  { from: "t1", to: "t2" },
  { from: "t2", to: "t3" },
  { from: "t2", to: "l1" },
  { from: "l1", to: "l2" },
  { from: "l1", to: "t5" },
  { from: "t3", to: "m3" },
  { from: "t4", to: "m1" },
  { from: "t4", to: "m2" },
  { from: "m1", to: "a3" },
  { from: "m2", to: "a4" },
  { from: "t6", to: "a4" },
  { from: "a3", to: "m5" },
  { from: "l2", to: "t9" },
  { from: "t9", to: "m4" },
  { from: "m4", to: "a5" },
  { from: "a5", to: "a7" },
  { from: "l3", to: "m4" },
  { from: "t7", to: "t1" },
  { from: "t8", to: "t9" },
  { from: "t5", to: "t6" },
];

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

export default function NeuralGraphCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    let animId: number;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Build edges with packet state
    const edges: GraphEdge[] = EDGE_DEFS.map(() => ({
      from: "",
      to: "",
      packet: { progress: 0, speed: 0.0004 + Math.random() * 0.0004, active: false },
      spawnTimer: Math.random() * 3000,
    }));
    EDGE_DEFS.forEach((def, i) => {
      edges[i].from = def.from;
      edges[i].to = def.to;
    });

    const nodeMap = new Map<string, GraphNode>(NODES.map((n) => [n.id, n]));

    let lastTime = performance.now();

    const drawArrow = (x1: number, y1: number, x2: number, y2: number, color: string) => {
      const angle = Math.atan2(y2 - y1, x2 - x1);
      const len = 6;
      const spread = 0.45;
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - len * Math.cos(angle - spread), y2 - len * Math.sin(angle - spread));
      ctx.lineTo(x2 - len * Math.cos(angle + spread), y2 - len * Math.sin(angle + spread));
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    };

    const drawHexagon = (x: number, y: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        if (i === 0) ctx.moveTo(x + r * Math.cos(angle), y + r * Math.sin(angle));
        else ctx.lineTo(x + r * Math.cos(angle), y + r * Math.sin(angle));
      }
      ctx.closePath();
    };

    const drawDiamond = (x: number, y: number, r: number) => {
      ctx.beginPath();
      ctx.moveTo(x, y - r);
      ctx.lineTo(x + r * 0.75, y);
      ctx.lineTo(x, y + r);
      ctx.lineTo(x - r * 0.75, y);
      ctx.closePath();
    };

    const animate = (time: number) => {
      const dt = time - lastTime;
      lastTime = time;
      ctx.clearRect(0, 0, W, H);

      const t = time / 1000;

      // Draw edges first (behind nodes)
      for (const edge of edges) {
        const fromNode = nodeMap.get(edge.from);
        const toNode = nodeMap.get(edge.to);
        if (!fromNode || !toNode) continue;

        const x1 = fromNode.nx * W;
        const y1 = fromNode.ny * H;
        const x2 = toNode.nx * W;
        const y2 = toNode.ny * H;

        const fromColor = NODE_COLORS[fromNode.type];
        const toColor = NODE_COLORS[toNode.type];
        const [fr, fg, fb] = hexToRgb(fromColor);
        const [tr, tg, tb] = hexToRgb(toColor);

        // Edge line
        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, `rgba(${fr},${fg},${fb},0.18)`);
        grad.addColorStop(1, `rgba(${tr},${tg},${tb},0.10)`);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = grad;
        ctx.globalAlpha = 1;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Arrowhead near destination
        const arrowX = x1 + (x2 - x1) * 0.82;
        const arrowY = y1 + (y2 - y1) * 0.82;
        ctx.globalAlpha = 0.3;
        drawArrow(x1, y1, arrowX, arrowY, fromColor);
        ctx.globalAlpha = 1;

        // Data packet
        edge.spawnTimer -= dt;
        if (!edge.packet.active && edge.spawnTimer <= 0) {
          edge.packet.active = true;
          edge.packet.progress = 0;
          edge.packet.speed = 0.0003 + Math.random() * 0.0005;
        }
        if (edge.packet.active) {
          edge.packet.progress += edge.packet.speed * dt;
          if (edge.packet.progress >= 1) {
            edge.packet.active = false;
            edge.spawnTimer = 800 + Math.random() * 2200;
          } else {
            const px = x1 + (x2 - x1) * edge.packet.progress;
            const py = y1 + (y2 - y1) * edge.packet.progress;
            ctx.save();
            ctx.shadowColor = fromColor;
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(px, py, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = fromColor;
            ctx.globalAlpha = 0.85;
            ctx.fill();
            ctx.restore();
          }
        }
      }

      // Draw nodes
      for (const node of NODES) {
        const x = node.nx * W;
        const y = node.ny * H;
        const color = NODE_COLORS[node.type];
        const [r, g, b] = hexToRgb(color);
        const pulse = 0.5 + 0.5 * Math.sin(t * node.pulseSpeed + node.pulsePhase);
        const glowSize = 4 + pulse * 12;

        ctx.save();
        ctx.shadowColor = color;
        ctx.shadowBlur = glowSize;

        if (node.type === "agent") {
          // Circle
          ctx.beginPath();
          ctx.arc(x, y, 7, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${0.15 + pulse * 0.12})`;
          ctx.fill();
          ctx.strokeStyle = `rgba(${r},${g},${b},${0.55 + pulse * 0.3})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        } else if (node.type === "tool") {
          // Rounded square
          const s = 7;
          ctx.beginPath();
          ctx.roundRect(x - s, y - s, s * 2, s * 2, 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${0.12 + pulse * 0.1})`;
          ctx.fill();
          ctx.strokeStyle = `rgba(${r},${g},${b},${0.5 + pulse * 0.3})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        } else if (node.type === "memory") {
          // Diamond
          drawDiamond(x, y, 8);
          ctx.fillStyle = `rgba(${r},${g},${b},${0.12 + pulse * 0.1})`;
          ctx.fill();
          ctx.strokeStyle = `rgba(${r},${g},${b},${0.5 + pulse * 0.3})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        } else if (node.type === "llm") {
          // Hexagon
          drawHexagon(x, y, 8);
          ctx.fillStyle = `rgba(${r},${g},${b},${0.12 + pulse * 0.1})`;
          ctx.fill();
          ctx.strokeStyle = `rgba(${r},${g},${b},${0.5 + pulse * 0.3})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        ctx.restore();

        // Label
        ctx.font = "9px 'JetBrains Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillStyle = `rgba(${r},${g},${b},0.45)`;
        ctx.globalAlpha = 1;
        ctx.fillText(node.label, x, y + 18);
      }

      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
