"use client";

import { useRef, MouseEvent, ReactNode } from "react";

interface GlowBorderProps {
  children: ReactNode;
  className?: string;
}

/**
 * Card that renders an animated gradient border glow following the mouse.
 */
export default function GlowBorder({ children, className = "" }: GlowBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el || !borderRef.current) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    borderRef.current.style.background = `radial-gradient(300px circle at ${x}% ${y}%, rgba(0,217,126,0.6), rgba(14,165,233,0.35), transparent 70%)`;
    borderRef.current.style.opacity = "1";
  };

  const onMouseLeave = () => {
    if (borderRef.current) borderRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`relative rounded-2xl ${className}`}
      style={{ padding: "1px" }}
    >
      {/* Animated border layer */}
      <div
        ref={borderRef}
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500"
        style={{ opacity: 0, zIndex: 0 }}
      />
      {/* Static dim border */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: "rgba(255,255,255,0.08)", zIndex: 0 }}
      />
      {/* Content */}
      <div className="relative rounded-2xl z-[1]" style={{ background: "rgba(3,13,7,0.85)", backdropFilter: "blur(12px)" }}>
        {children}
      </div>
    </div>
  );
}
