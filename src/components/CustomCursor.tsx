"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Hide on mobile
    if (window.innerWidth < 768) return;

    const moveDot = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    const animateRing = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }
      rafId.current = requestAnimationFrame(animateRing);
    };
    rafId.current = requestAnimationFrame(animateRing);

    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);
    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);

    window.addEventListener("mousemove", moveDot);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    const targets = document.querySelectorAll("a, button, [data-cursor-hover]");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveDot);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full will-change-transform"
        style={{
          width: clicked ? "8px" : hovered ? "14px" : "10px",
          height: clicked ? "8px" : hovered ? "14px" : "10px",
          background: hovered ? "#67e8f9" : "#00d97e",
          boxShadow: hovered ? "0 0 12px #67e8f9, 0 0 24px rgba(103,232,249,0.5)" : "0 0 8px #00d97e",
          transition: "width 0.2s, height 0.2s, background 0.2s, box-shadow 0.2s",
          mixBlendMode: "difference",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full will-change-transform"
        style={{
          width: hovered ? "54px" : "36px",
          height: hovered ? "54px" : "36px",
          border: `1.5px solid ${hovered ? "rgba(103,232,249,0.6)" : "rgba(0,217,126,0.5)"}`,
          boxShadow: hovered ? "0 0 16px rgba(103,232,249,0.25)" : "none",
          transition: "width 0.3s, height 0.3s, border-color 0.3s, box-shadow 0.3s",
        }}
      />
    </>
  );
}
