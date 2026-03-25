"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = document.querySelectorAll("section[id]");
      const scrollPos = window.scrollY + 100;
      sections.forEach((section) => {
        const el = section as HTMLElement;
        if (scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          setActiveSection(section.getAttribute("id") || "");
        }
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    document.body.style.overflow = "";
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
  };

  const toggleMenu = () => {
    setMenuOpen((v) => !v);
    document.body.style.overflow = menuOpen ? "" : "hidden";
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(3,13,7,0.92)] backdrop-blur-xl border-b border-[rgba(0,217,126,0.15)]"
            : ""
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
            className="font-mono text-lg font-bold text-white/90 hover:text-[#00d97e] transition-colors duration-200 flex items-center gap-2"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <span style={{ color: "#00d97e" }}>[</span>
            <span>SV_AGENT</span>
            <span style={{ color: "#00d97e" }}>]</span>
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{
                background: "#00d97e",
                boxShadow: "0 0 8px #00d97e",
                animation: "agent-pulse 2s infinite",
              }}
            />
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={`px-4 py-2 rounded text-sm font-medium transition-all duration-200 flex items-center gap-1`}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      background: isActive ? "rgba(0,217,126,0.08)" : "transparent",
                      color: isActive ? "#00d97e" : "#94a3b8",
                      border: isActive ? "1px solid rgba(0,217,126,0.2)" : "1px solid transparent",
                    }}
                  >
                    {isActive && <span style={{ color: "#00d97e" }}>›</span>}
                    {link.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <a
            href="mailto:venkateswarlusunkea9381@gmail.com"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded text-sm font-semibold text-white btn-glow transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #00d97e, #0ea5e9)",
              fontFamily: "'JetBrains Mono', monospace",
              borderRadius: "4px",
            }}
          >
            → Connect
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1.5 z-50"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[72px] left-0 right-0 z-40 backdrop-blur-xl border-b"
            style={{
              background: "rgba(3,13,7,0.97)",
              borderColor: "rgba(0,217,126,0.15)",
            }}
          >
            <ul className="flex flex-col py-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-left px-8 py-4 text-slate-300 hover:text-[#00d97e] transition-colors text-base font-medium"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="px-8 py-4">
                <a
                  href="mailto:venkateswarlusunkea9381@gmail.com"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white btn-glow"
                  style={{
                    background: "linear-gradient(135deg, #00d97e, #0ea5e9)",
                    borderRadius: "4px",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                  onClick={() => { setMenuOpen(false); document.body.style.overflow = ""; }}
                >
                  → Connect
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
