"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { skillCategories, proficiencies } from "@/lib/data";
import GlowBorder from "@/components/GlowBorder";
import TiltCard from "@/components/TiltCard";

function ProfBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  const fillRef = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = fillRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered.current) {
        triggered.current = true;
        setTimeout(() => { el.style.width = `${pct}%`; }, 200);
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [pct]);

  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-slate-400" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem" }}>{label}</span>
        <span className="font-semibold" style={{ color: "#00d97e", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem" }}>
          confidence: {pct}%
        </span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(0,217,126,0.05)" }}>
        <div
          ref={fillRef}
          className="prof-fill h-full rounded-full"
          style={{ width: 0, background: color, boxShadow: `0 0 10px ${color}` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative z-10 py-28">
      <div className="max-w-[1200px] mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="font-mono text-xs mb-3" style={{ color: "#00d97e", fontFamily: "'JetBrains Mono', monospace" }}>
            ┌─[ MODULE_03: TOOL_REGISTRY ]──────────────────────────
          </div>
          <span className="section-tag">03 / Skills</span>
          <h2 className="text-5xl font-black tracking-[-0.03em]">Tool Registry</h2>
        </motion.div>

        {/* Skill categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-10">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <GlowBorder>
              <TiltCard className="shimmer-card rounded-2xl p-6" intensity={6}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{
                      background: `color-mix(in srgb, ${cat.color} 12%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${cat.color} 28%, transparent)`,
                      color: cat.color,
                    }}
                  >
                    <i className={`fas ${cat.icon} text-sm`} />
                  </div>
                  <div>
                    <span
                      className="block text-[0.6rem]"
                      style={{ color: cat.color, fontFamily: "'JetBrains Mono', monospace", opacity: 0.6 }}
                    >
                      namespace:
                    </span>
                    <h3 className="font-bold text-white text-sm leading-tight">{cat.title}</h3>
                  </div>
                </div>
                <span
                  className="text-[0.6rem]"
                  style={{ color: cat.color, fontFamily: "'JetBrains Mono', monospace", opacity: 0.5 }}
                >
                  {cat.skills.length}_tools
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.78rem] font-medium transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: `color-mix(in srgb, ${cat.color} 8%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${cat.color} 25%, transparent)`,
                      color: `color-mix(in srgb, ${cat.color} 90%, #fff)`,
                      borderRadius: "3px",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: cat.color, opacity: 0.7 }}
                    />
                    {skill}
                  </span>
                ))}
              </div>
              </TiltCard>
              </GlowBorder>
            </motion.div>
          ))}
        </div>

        {/* Proficiency bars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="agent-card rounded-2xl p-8"
        >
          <h3
            className="mb-8 text-sm"
            style={{ color: "#64748b", fontFamily: "'JetBrains Mono', monospace" }}
          >
            <span style={{ color: "#00d97e" }}>$</span> confidence_scores --format=bar
          </h3>
          <div className="space-y-6">
            {proficiencies.map((p) => (
              <ProfBar key={p.label} label={p.label} pct={p.pct} color={p.color} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
