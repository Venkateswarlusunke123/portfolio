"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      const { name, email, subject, message } = form;
      window.location.href = `mailto:venkateswarlusunkea9381@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
      setSending(false);
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    }, 1200);
  };

  const contactItems = [
    { icon: "fa-envelope",      color: "#00d97e", prefixLabel: "endpoint: email",    value: "venkateswarlusunkea9381@gmail.com",  href: "mailto:venkateswarlusunkea9381@gmail.com" },
    { icon: "fa-phone",         color: "#0ea5e9", prefixLabel: "endpoint: phone",    value: "+91 93810 09089",                    href: "tel:+919381009089" },
    { icon: "fab fa-linkedin-in", color: "#0ea5e9", prefixLabel: "endpoint: linkedin", value: "venkateswarlu-sunke-79a086274",     href: "https://linkedin.com/in/venkateswarlu-sunke-79a086274/" },
  ];

  const inputClass = "w-full border rounded-lg px-4 py-3 text-white text-sm placeholder:text-slate-600 outline-none transition-all duration-200"
    + " bg-[rgba(0,217,126,0.03)] border-[rgba(0,217,126,0.12)] focus:border-[#00d97e] focus:bg-[rgba(0,217,126,0.06)] focus:ring-2 focus:ring-[rgba(0,217,126,0.10)]";

  return (
    <section id="contact" className="relative z-10 py-28">
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
            ┌─[ MODULE_05: API_ENDPOINT ]───────────────────────────
          </div>
          <span className="section-tag">05 / Contact</span>
          <h2 className="text-5xl font-black tracking-[-0.03em]">Agent API</h2>
          <p className="text-slate-400 mt-3 text-[1.05rem]" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.9rem" }}>
            <span style={{ color: "#00d97e" }}>POST</span> /api/contact · Open to roles, projects, collaborations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              <span style={{ color: "#00d97e" }}>→</span> Initialize Connection
            </h3>
            <p className="text-slate-400 leading-[1.85] mb-8 text-sm">
              Whether you have an AI project, a full-stack challenge, or a collaboration opportunity —
              this API endpoint is always open.
            </p>
            <div className="space-y-3">
              {contactItems.map((item) => (
                <a
                  key={item.prefixLabel}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 agent-card rounded-xl hover:translate-x-1 transition-all duration-200"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `color-mix(in srgb, ${item.color} 12%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${item.color} 28%, transparent)`,
                      color: item.color,
                    }}
                  >
                    <i className={`${item.icon.startsWith("fab") ? item.icon : `fas ${item.icon}`} text-sm`} />
                  </div>
                  <div className="min-w-0">
                    <p
                      className="text-[0.65rem] mb-0.5"
                      style={{ color: item.color, fontFamily: "'JetBrains Mono', monospace", opacity: 0.7 }}
                    >
                      {item.prefixLabel}
                    </p>
                    <p className="text-sm font-medium text-white truncate" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="agent-card rounded-2xl p-8"
          >
            {/* Request header bar */}
            <div
              className="flex items-center gap-3 mb-6 pb-4"
              style={{ borderBottom: "1px solid var(--terminal-border)" }}
            >
              <span
                className="text-xs px-2 py-1"
                style={{
                  background: "rgba(0,217,126,0.12)",
                  color: "#00d97e",
                  border: "1px solid rgba(0,217,126,0.30)",
                  borderRadius: "3px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                }}
              >
                POST
              </span>
              <span className="text-xs text-slate-500" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                /api/contact · application/json
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-2 text-[0.75rem]" style={{ color: "#64748b", fontFamily: "'JetBrains Mono', monospace" }}>
                  <span style={{ color: "#0ea5e9" }}>string</span> name
                </label>
                <input className={inputClass} type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required />
              </div>
              <div>
                <label className="block mb-2 text-[0.75rem]" style={{ color: "#64748b", fontFamily: "'JetBrains Mono', monospace" }}>
                  <span style={{ color: "#0ea5e9" }}>email</span> from
                </label>
                <input className={inputClass} type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" required />
              </div>
              <div>
                <label className="block mb-2 text-[0.75rem]" style={{ color: "#64748b", fontFamily: "'JetBrains Mono', monospace" }}>
                  <span style={{ color: "#0ea5e9" }}>string</span> subject
                </label>
                <input className={inputClass} type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="Opportunity / Collaboration / Hello" required />
              </div>
              <div>
                <label className="block mb-2 text-[0.75rem]" style={{ color: "#64748b", fontFamily: "'JetBrains Mono', monospace" }}>
                  <span style={{ color: "#0ea5e9" }}>string</span> message
                </label>
                <textarea className={inputClass} name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell me about the project or opportunity..." required style={{ resize: "vertical" }} />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 py-3.5 font-semibold text-white text-sm btn-glow transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, #00d97e, #0ea5e9)",
                  borderRadius: "4px",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {sending ? (
                  <><i className="fas fa-spinner fa-spin" /> executing request...</>
                ) : (
                  <>→ POST /api/contact</>
                )}
              </button>
              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-2 text-sm p-3"
                  style={{
                    color: "#00d97e",
                    background: "rgba(0,217,126,0.08)",
                    border: "1px solid rgba(0,217,126,0.25)",
                    borderRadius: "4px",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  <span>[200 OK]</span> Message received · I&apos;ll respond soon
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
