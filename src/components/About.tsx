"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { num: 2,   suffix: "+", label: "yrs_experience" },
  { num: 500, suffix: "+", label: "dsa_problems"   },
  { num: 3,   suffix: "",  label: "orgs_deployed"  },
  { num: 30,  suffix: "%", label: "revenue_impact" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
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
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="text-3xl font-black" style={{ color: "#00d97e", fontFamily: "'JetBrains Mono', monospace" }}>
      {count}{suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="relative z-10 py-28 px-8 max-w-[1200px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="font-mono text-xs mb-3" style={{ color: "#00d97e", fontFamily: "'JetBrains Mono', monospace" }}>
          ┌─[ MODULE_01: PROFILE ]────────────────────────────────
        </div>
        <span className="section-tag">01 / About</span>
        <h2 className="text-5xl font-black tracking-[-0.03em]">Agent Profile</h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left — Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-[1.12rem] text-white leading-[1.85] mb-4">
            I&apos;m a{" "}
            <strong style={{ color: "#00d97e" }}>Full Stack &amp; Generative AI Engineer</strong>{" "}
            with 2+ years of production experience building intelligent systems and scalable web applications.
          </p>
          <p className="text-slate-400 leading-[1.85] mb-4">
            Currently at <strong style={{ color: "#00d97e" }}>OneLab Ventures</strong>, I architect SDLC
            Automation Agents and multi-agent AI pipelines using LangChain, LangGraph, and CrewAI.
            Previously at <strong style={{ color: "#00d97e" }}>Orange League Ventures</strong> and{" "}
            <strong style={{ color: "#00d97e" }}>Cogoport</strong>, I delivered full-stack microservices
            and contributed to systems generating 30% of total company revenue.
          </p>
          <p className="text-slate-400 leading-[1.85] mb-10">
            I hold a <strong className="text-white">B.Tech in ECE</strong> from Sastra Deemed University
            with a CGPA of 7.734, and have solved <strong className="text-white">500+ DSA problems</strong>{" "}
            on LeetCode and HackerRank.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="agent-card rounded-xl p-5 text-center cursor-default"
              >
                <span
                  className="block text-[0.6rem] mb-1"
                  style={{ color: "#00d97e", fontFamily: "'JetBrains Mono', monospace", opacity: 0.6 }}
                >
                  sys_metric:
                </span>
                <Counter target={s.num} suffix={s.suffix} />
                <span className="block text-[0.68rem] text-slate-500 tracking-widest mt-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — Info Cards */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col gap-4"
        >
          {[
            {
              icon: "fa-graduation-cap",
              prefixLabel: "training_data:",
              title: "B.Tech — ECE",
              lines: ["Sastra Deemed University · 2019–2023", "CGPA: 7.734"],
              color: "#00d97e",
            },
            {
              icon: "fa-map-marker-alt",
              prefixLabel: "geo_location:",
              title: "Pune, India",
              lines: ["Open to remote & hybrid roles"],
              color: "#0ea5e9",
            },
            {
              icon: "fa-terminal",
              prefixLabel: "primary_domains:",
              title: "Generative AI · Agentic Systems",
              lines: ["Full Stack · Cloud Architecture"],
              color: "#f59e0b",
            },
          ].map((card) => (
            <div key={card.prefixLabel} className="agent-card rounded-xl p-5 flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-base flex-shrink-0 mt-0.5"
                style={{
                  background: `color-mix(in srgb, ${card.color} 12%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${card.color} 28%, transparent)`,
                  color: card.color,
                }}
              >
                <i className={`fas ${card.icon}`} />
              </div>
              <div>
                <p
                  className="text-[0.65rem] mb-1"
                  style={{ color: card.color, fontFamily: "'JetBrains Mono', monospace", opacity: 0.65 }}
                >
                  {card.prefixLabel}
                </p>
                {card.lines.map((line, i) => (
                  <p
                    key={i}
                    className={i === 0 ? "text-[0.95rem] font-semibold text-white" : "text-[0.85rem] text-slate-500"}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
