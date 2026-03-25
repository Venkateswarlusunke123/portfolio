"use client";

import { motion } from "framer-motion";
import { experiences } from "@/lib/data";
import GlowBorder from "@/components/GlowBorder";
import TiltCard from "@/components/TiltCard";

export default function Experience() {
  return (
    <section id="experience" className="relative z-10 py-28" style={{ background: "rgba(0,217,126,0.012)" }}>
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
            ┌─[ MODULE_02: DEPLOYMENTS ]────────────────────────────
          </div>
          <span className="section-tag">02 / Experience</span>
          <h2 className="text-5xl font-black tracking-[-0.03em]">Deployment History</h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="grid gap-6 mb-8"
              style={{ gridTemplateColumns: "48px 1fr" }}
            >
              {/* Marker */}
              <div className="flex flex-col items-center pt-6">
                <div
                  className="w-3 h-3 rounded-sm flex-shrink-0 z-10"
                  style={{
                    background: exp.active ? exp.typeColor : "#334155",
                    boxShadow: exp.active ? `0 0 0 4px color-mix(in srgb, ${exp.typeColor} 20%, transparent)` : "none",
                  }}
                />
                {i < experiences.length - 1 && (
                  <div className="w-px flex-1 mt-2" style={{ background: "var(--terminal-border)" }} />
                )}
              </div>

              {/* Card */}
              <GlowBorder>
              <TiltCard className="shimmer-card rounded-2xl p-7 group" intensity={5}>
                {/* Meta row */}
                <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold"
                    style={{
                      background: `color-mix(in srgb, ${exp.typeColor} 12%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${exp.typeColor} 30%, transparent)`,
                      color: exp.typeColor,
                      borderRadius: "3px",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    <i className={`fas ${exp.icon} text-xs`} />
                    [{exp.type.toUpperCase().replace(/ \/ /g, "_").replace(/ /g, "_")}]
                  </span>
                  <div className="flex items-center gap-4">
                    <span
                      className="text-xs font-mono"
                      style={{ fontFamily: "'JetBrains Mono', monospace", color: "#64748b" }}
                    >
                      timestamp: {exp.duration}
                    </span>
                    {exp.active ? (
                      <span className="text-xs font-mono flex items-center gap-1.5" style={{ color: "#00d97e", fontFamily: "'JetBrains Mono', monospace" }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00d97e] inline-block agent-pulse" />
                        RUNNING
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-slate-500 flex items-center gap-1.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        <span>✓</span> COMPLETED
                      </span>
                    )}
                  </div>
                </div>

                {/* Role & Company */}
                <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                <div className="flex items-center gap-4 mb-5 flex-wrap">
                  <span className="font-semibold" style={{ color: "#00d97e" }}>{exp.company}</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <i className="fas fa-map-pin text-[0.6rem]" /> {exp.location}
                  </span>
                </div>

                {/* Points */}
                <ul className="space-y-3 mb-5">
                  {exp.points.map((pt, j) => (
                    <li key={j} className="flex gap-3 text-slate-400 text-sm leading-[1.7]">
                      <span style={{ color: "#00d97e", flexShrink: 0, fontFamily: "'JetBrains Mono', monospace", marginTop: "2px", fontSize: "0.85rem" }}>→</span>
                      <span dangerouslySetInnerHTML={{ __html: pt.replace(/<strong>/g, '<strong class="text-white font-semibold">') }} />
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="tag-pill">{tag}</span>
                  ))}
                </div>
              </TiltCard>
              </GlowBorder>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
