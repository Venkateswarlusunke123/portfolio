export default function Footer() {
  return (
    <footer className="relative z-10 border-t py-8" style={{ borderColor: "rgba(0,217,126,0.15)" }}>
      <div className="max-w-[1200px] mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-5">
        <span className="font-bold text-white/90 text-lg flex items-center gap-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          <span style={{ color: "#00d97e" }}>[</span>
          <span>SV_AGENT</span>
          <span style={{ color: "#00d97e" }}>]</span>
        </span>
        <p className="text-slate-500 text-sm text-center">
          Designed &amp; Built by <strong className="text-white">Sunke Venkateswarlu</strong> · 2025
        </p>
        <div className="flex gap-3">
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
              className="w-9 h-9 rounded flex items-center justify-center text-slate-400 hover:text-[#00d97e] hover:bg-[rgba(0,217,126,0.08)] transition-all duration-200 text-xs"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <i className={s.icon} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
