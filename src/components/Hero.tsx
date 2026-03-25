"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Transition } from "framer-motion";
import { typedPhrases } from "@/lib/data";

const baseTransition = (delay = 0): Transition => ({ duration: 0.7, delay });
const baseRightTransition: Transition = { duration: 0.8, delay: 0.4 };

const BOOT_LINES = [
  { text: '> agent.initialize("sunke_venkateswarlu")', delay: 150 },
  { text: "[OK] profile loaded · 2yr_experience",       delay: 450 },
  { text: "[OK] capabilities: 12 tools registered",     delay: 750 },
  { text: "> status: ONLINE",                           delay: 1050 },
];

// LangGraph SVG diagram node/edge definitions
const DIAGRAM_NODES = [
  { id: "user",     label: "USER",     sublabel: "Input",       x: 210, y: 50,  color: "#94a3b8", active: false },
  { id: "agent",    label: "SV_AGENT", sublabel: "LangGraph",   x: 210, y: 140, color: "#00d97e", active: true  },
  { id: "tools",    label: "TOOLS",    sublabel: "CrewAI",      x: 75,  y: 245, color: "#0ea5e9", active: false },
  { id: "memory",   label: "MEMORY",   sublabel: "RAG/FAISS",   x: 210, y: 245, color: "#7c3aed", active: false },
  { id: "llm",      label: "LLM",      sublabel: "GPT/Claude",  x: 345, y: 245, color: "#f59e0b", active: false },
  { id: "response", label: "RESPONSE", sublabel: "Output",      x: 210, y: 350, color: "#00d97e", active: false },
];

const DIAGRAM_EDGES = [
  { from: "user",   to: "agent",    label: "request"  },
  { from: "agent",  to: "tools",    label: "invoke"   },
  { from: "agent",  to: "memory",   label: "retrieve" },
  { from: "agent",  to: "llm",      label: "prompt"   },
  { from: "tools",  to: "response", label: ""         },
  { from: "memory", to: "response", label: ""         },
  { from: "llm",    to: "response", label: ""         },
];

const NODE_W = 100, NODE_H = 40, NODE_R = 4;

function getNodeCenter(id: string) {
  const n = DIAGRAM_NODES.find((n) => n.id === id);
  if (!n) return { x: 0, y: 0 };
  return { x: n.x, y: n.y };
}

function DiagramPacket({ x1, y1, x2, y2, color }: { x1: number; y1: number; x2: number; y2: number; color: string }) {
  const progressRef = useRef(Math.random());
  const [pos, setPos] = useState({ x: x1, y: y1 });

  useEffect(() => {
    let raf: number;
    const animate = () => {
      progressRef.current += 0.003;
      if (progressRef.current > 1) progressRef.current = 0;
      const t = progressRef.current;
      setPos({ x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [x1, y1, x2, y2]);

  return (
    <circle
      cx={pos.x}
      cy={pos.y}
      r={3}
      fill={color}
      style={{ filter: `drop-shadow(0 0 4px ${color})` }}
    />
  );
}

function MagneticBtn({ children, className, style, onClick }: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
  };
  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };
  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`magnetic-btn ${className ?? ""}`}
      style={style}
    >
      {children}
    </button>
  );
}

export default function Hero() {
  const [typed, setTyped] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [bootStep, setBootStep] = useState(-1);

  // Boot sequence
  useEffect(() => {
    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => setBootStep(i), line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Typewriter
  useEffect(() => {
    const phrase = typedPhrases[phraseIdx];
    let timeout: NodeJS.Timeout;
    if (!deleting) {
      if (charIdx < phrase.length) {
        timeout = setTimeout(() => { setTyped(phrase.slice(0, charIdx + 1)); setCharIdx((c) => c + 1); }, 75);
      } else {
        timeout = setTimeout(() => setDeleting(true), 1800);
      }
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => { setTyped(phrase.slice(0, charIdx - 1)); setCharIdx((c) => c - 1); }, 45);
      } else {
        setDeleting(false);
        setPhraseIdx((i) => (i + 1) % typedPhrases.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [typed, charIdx, deleting, phraseIdx]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.replace("#", ""));
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative z-10 min-h-screen flex items-center max-w-[1200px] mx-auto px-8 pt-[90px] pb-16 gap-12"
    >
      {/* ── Left: Content ── */}
      <div className="flex-1 min-w-0">

        {/* Boot sequence */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-5"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem" }}
        >
          {BOOT_LINES.map((line, i) => (
            <div
              key={i}
              className={bootStep >= i ? "boot-line" : ""}
              style={{
                display: bootStep >= i ? "flex" : "none",
                alignItems: "center",
                gap: "8px",
                marginBottom: "2px",
                color: i === BOOT_LINES.length - 1 ? "#00d97e" : "rgba(0,217,126,0.6)",
                animationDelay: "0ms",
              }}
            >
              {i === BOOT_LINES.length - 1 && (
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "#00d97e", boxShadow: "0 0 6px #00d97e", animation: "agent-pulse 2s infinite" }}
                />
              )}
              {line.text}
            </div>
          ))}
        </motion.div>

        {/* Agent status badge */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={baseTransition(0.1)}>
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium mb-6 cursor-default"
            style={{
              background: "rgba(0,217,126,0.08)",
              border: "1px solid rgba(0,217,126,0.30)",
              borderRadius: "4px",
              color: "#00d97e",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.8rem",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-[#00d97e] agent-pulse flex-shrink-0" />
            agent.status = &quot;ONLINE&quot; · available_for_hire = true
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={baseTransition(0.2)}
          className="font-black leading-[1.05] tracking-[-0.04em] mb-5"
          style={{ fontSize: "clamp(2.8rem, 8vw, 5.5rem)" }}
        >
          <span className="block text-white">Sunke</span>
          <span className="block gradient-text-animated">Venkateswarlu</span>
        </motion.h1>

        {/* Typed title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={baseTransition(0.3)}
          className="flex items-center flex-wrap gap-2 mb-5 text-slate-400"
          style={{ fontSize: "clamp(1.1rem, 3vw, 1.45rem)" }}
        >
          <span>I build </span>
          <span className="flex items-center gap-0.5">
            <span
              className="font-bold text-[#00d97e] typed-glow"
              style={{ fontFamily: "'JetBrains Mono', monospace", minWidth: "14ch" }}
            >
              {typed}
            </span>
            <span className="text-[#00d97e] cursor-blink font-light">|</span>
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={baseTransition(0.4)}
          className="text-slate-400 text-[1.05rem] leading-[1.85] max-w-[540px] mb-10"
        >
          Full Stack &amp; Generative AI Engineer crafting intelligent agentic systems,
          production-grade AI pipelines, and scalable microservices that ship to real users.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={baseTransition(0.5)}
          className="flex flex-wrap gap-4 mb-10"
        >
          <MagneticBtn
            onClick={() => scrollTo("#experience")}
            className="inline-flex items-center gap-2 px-8 py-3.5 font-semibold text-white btn-glow text-[0.95rem]"
            style={{
              background: "linear-gradient(135deg, #00d97e, #0ea5e9)",
              borderRadius: "4px",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            → view_deployments()
          </MagneticBtn>
          <MagneticBtn
            onClick={() => scrollTo("#contact")}
            className="inline-flex items-center gap-2 px-8 py-3.5 font-semibold text-white text-[0.95rem] transition-all duration-200"
            style={{
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: "4px",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            → contact.api()
          </MagneticBtn>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={baseTransition(0.6)}
          className="flex gap-3"
        >
          {[
            { href: "https://linkedin.com/in/venkateswarlu-sunke-79a086274/", icon: "fab fa-linkedin-in", label: "LinkedIn" },
            { href: "mailto:venkateswarlusunkea9381@gmail.com", icon: "fas fa-envelope", label: "Email" },
            { href: "tel:+919381009089", icon: "fas fa-phone", label: "Phone" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-11 h-11 flex items-center justify-center text-slate-400 hover:text-[#00d97e] hover:bg-[rgba(0,217,126,0.08)] hover:-translate-y-1 transition-all duration-200"
              style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: "4px" }}
            >
              <i className={`${s.icon} text-sm`} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* ── Right: LangGraph Workflow Diagram ── */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={baseRightTransition}
        className="flex-none hidden lg:flex items-center justify-center relative w-[420px] h-[420px]"
      >
        <svg
          width="420"
          height="420"
          viewBox="0 0 420 420"
          style={{ overflow: "visible" }}
        >
          <defs>
            {DIAGRAM_NODES.map((node) => (
              <marker
                key={`arrow-${node.id}`}
                id={`arrow-${node.id}`}
                markerWidth="6"
                markerHeight="6"
                refX="5"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L0,6 L6,3 z" fill={node.color} fillOpacity={0.4} />
              </marker>
            ))}
          </defs>

          {/* Edges */}
          {DIAGRAM_EDGES.map((edge, i) => {
            const from = getNodeCenter(edge.from);
            const to = getNodeCenter(edge.to);
            const fromNode = DIAGRAM_NODES.find((n) => n.id === edge.from)!;
            const toNode = DIAGRAM_NODES.find((n) => n.id === edge.to)!;

            // Adjust endpoints to node borders
            const x1 = from.x;
            const y1 = from.y + NODE_H / 2;
            const x2 = to.x;
            const y2 = to.y - NODE_H / 2;

            // For branching edges (agent → tools/memory/llm), use curves
            const isBranch = edge.from === "agent" && edge.to !== "user" && edge.to !== "response";
            const isConverge = edge.to === "response" && edge.from !== "agent";

            let d: string;
            if (isBranch) {
              const mx = x2;
              const my = y1 + (y2 - y1) * 0.4;
              d = `M ${x1} ${y1} C ${x1} ${my}, ${mx} ${my}, ${x2} ${y2}`;
            } else if (isConverge) {
              const mx = x1;
              const my = y1 + (y2 - y1) * 0.6;
              d = `M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`;
            } else {
              d = `M ${x1} ${y1} L ${x2} ${y2}`;
            }

            return (
              <g key={i}>
                <path
                  d={d}
                  stroke={fromNode.color}
                  strokeWidth={1.2}
                  strokeOpacity={0.35}
                  fill="none"
                  markerEnd={`url(#arrow-${fromNode.id})`}
                />
                {edge.label && (
                  <text
                    x={(x1 + x2) / 2 + (isBranch ? (x2 < 210 ? -18 : 18) : 8)}
                    y={(y1 + y2) / 2}
                    fontSize="8"
                    fill={fromNode.color}
                    fillOpacity={0.45}
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    textAnchor="middle"
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Data packets */}
          {DIAGRAM_EDGES.map((edge, i) => {
            const from = getNodeCenter(edge.from);
            const to = getNodeCenter(edge.to);
            const fromNode = DIAGRAM_NODES.find((n) => n.id === edge.from)!;
            const x1 = from.x;
            const y1 = from.y + NODE_H / 2;
            const x2 = to.x;
            const y2 = to.y - NODE_H / 2;
            return (
              <DiagramPacket
                key={`pkt-${i}`}
                x1={x1} y1={y1} x2={x2} y2={y2}
                color={fromNode.color}
              />
            );
          })}

          {/* Nodes */}
          {DIAGRAM_NODES.map((node) => {
            const nx = node.x - NODE_W / 2;
            const ny = node.y - NODE_H / 2;
            return (
              <g key={node.id}>
                {/* Pulsing glow rect for active node */}
                {node.active && (
                  <rect
                    x={nx - 4} y={ny - 4}
                    width={NODE_W + 8} height={NODE_H + 8}
                    rx={NODE_R + 2}
                    fill="none"
                    stroke={node.color}
                    strokeWidth={1.5}
                    strokeOpacity={0.3}
                    style={{ animation: "agent-pulse-rect 2s ease infinite" }}
                  />
                )}
                {/* Node box */}
                <rect
                  x={nx} y={ny}
                  width={NODE_W} height={NODE_H}
                  rx={NODE_R}
                  fill={node.color}
                  fillOpacity={node.active ? 0.15 : 0.08}
                  stroke={node.color}
                  strokeWidth={node.active ? 1.5 : 1}
                  strokeOpacity={node.active ? 0.9 : 0.45}
                  style={node.active ? { filter: `drop-shadow(0 0 8px ${node.color})` } : undefined}
                />
                {/* Label */}
                <text
                  x={node.x} y={node.y - 3}
                  fontSize={node.active ? "10" : "9"}
                  fontWeight={node.active ? "700" : "600"}
                  fill={node.color}
                  fillOpacity={node.active ? 1 : 0.8}
                  textAnchor="middle"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {node.label}
                </text>
                {/* Sublabel */}
                <text
                  x={node.x} y={node.y + 10}
                  fontSize="8"
                  fill={node.color}
                  fillOpacity={0.55}
                  textAnchor="middle"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {node.sublabel}
                </text>
              </g>
            );
          })}

          {/* Legend */}
          {[
            { color: "#00d97e", label: "agent" },
            { color: "#0ea5e9", label: "tool"  },
            { color: "#7c3aed", label: "memory"},
            { color: "#f59e0b", label: "llm"   },
          ].map((item, i) => (
            <g key={item.label}>
              <circle cx={30 + i * 95} cy={400} r={4} fill={item.color} fillOpacity={0.7} />
              <text
                x={38 + i * 95} y={404}
                fontSize="8"
                fill={item.color}
                fillOpacity={0.6}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {item.label}
              </text>
            </g>
          ))}
        </svg>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 text-[0.7rem] tracking-[0.12em] uppercase select-none">
        <span>Scroll</span>
        <div className="w-px h-12 scroll-line" style={{ background: "linear-gradient(to bottom, #00d97e, transparent)" }} />
      </div>
    </section>
  );
}
