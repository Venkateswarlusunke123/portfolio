"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { achievements, education } from "@/lib/data";
import TiltCard from "@/components/TiltCard";
import GlowBorder from "@/components/GlowBorder";

function AchCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const startTime = performance.now();
        const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
        const tick = (now: number) => {
          const p = Math.min((now - startTime) / duration, 1);
          setCount(Math.floor(easeOut(p) * target));
          if (p < 1) requestAnimationFrame(tick);
          else setCount(target);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="text-5xl font-black text-white ach-number-glow" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      {count}
      <span className="text-3xl" style={{ color: "#00d97e" }}>{suffix}</span>
    </span>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" className="relative z-10 py-28" style={{ background: "rgba(0,217,126,0.012)" }}>
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
            ┌─[ MODULE_04: SYSTEM_METRICS ]─────────────────────────
          </div>
          <span className="section-tag">04 / Achievements</span>
          <h2 className="text-5xl font-black tracking-[-0.03em]">System Metrics</h2>
        </motion.div>

        {/* Achievement cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {achievements.map((ach, i) => (
            <motion.div
              key={ach.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlowBorder>
              <TiltCard
                className="shimmer-card rounded-2xl p-6 text-center"
                intensity={8}
                style={{ background: "rgba(3,13,7,0.9)", backdropFilter: "blur(12px)" }}
              >
                {/* Panel header */}
                <div
                  className="flex items-center justify-between mb-4"
                  style={{ fontSize: "0.6rem", fontFamily: "'JetBrains Mono', monospace", color: "#475569" }}
                >
                  <span>metric.{ach.label.toLowerCase().replace(/ /g, "_").replace(/\+/g, "")}</span>
                  <span style={{ color: "#00d97e", opacity: 0.6 }}>● live</span>
                </div>

                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 text-xl"
                  style={{
                    background: `color-mix(in srgb, ${ach.color} 12%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${ach.color} 25%, transparent)`,
                    color: ach.color,
                  }}
                >
                  <i className={`fas ${ach.icon}`} />
                </div>
                <AchCounter target={ach.count} suffix={ach.suffix} />
                <p className="font-bold mt-3 mb-1 text-sm">{ach.label}</p>
                <p className="text-slate-500 text-xs">{ach.sub}</p>
              </TiltCard>
              </GlowBorder>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <h3
            className="text-xl font-bold mb-5"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <span style={{ color: "#00d97e" }}>$</span> knowledge_base --list
          </h3>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.degree} className="agent-card rounded-2xl p-6 flex items-start gap-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
                  style={{
                    background: `color-mix(in srgb, ${edu.color} 12%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${edu.color} 28%, transparent)`,
                    color: edu.color,
                  }}
                >
                  <i className={`fas ${edu.icon}`} />
                </div>
                <div>
                  <h4 className="font-bold text-[1rem] mb-1">{edu.degree}</h4>
                  <p className="text-slate-400 text-sm mb-3">{edu.institution}</p>
                  <div className="flex gap-3 flex-wrap">
                    <span
                      className="text-xs px-3 py-1"
                      style={{
                        background: "rgba(0,217,126,0.08)",
                        border: "1px solid rgba(0,217,126,0.2)",
                        color: "#00d97e",
                        fontFamily: "'JetBrains Mono', monospace",
                        borderRadius: "3px",
                      }}
                    >
                      {edu.duration}
                    </span>
                    <span
                      className="text-xs px-3 py-1"
                      style={{
                        background: "rgba(14,165,233,0.08)",
                        border: "1px solid rgba(14,165,233,0.2)",
                        color: "#38bdf8",
                        fontFamily: "'JetBrains Mono', monospace",
                        borderRadius: "3px",
                      }}
                    >
                      cgpa: {edu.cgpa}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
