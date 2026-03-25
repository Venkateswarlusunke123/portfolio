"use client";

import { useEffect, useRef } from "react";

export default function MouseSpotlight() {
  const spotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -999, y: -999 });
  const current = useRef({ x: -999, y: -999 });

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      current.current.x += (pos.current.x - current.current.x) * 0.06;
      current.current.y += (pos.current.y - current.current.y) * 0.06;
      if (spotRef.current) {
        spotRef.current.style.background = `radial-gradient(600px circle at ${current.current.x}px ${current.current.y}px, rgba(0,217,126,0.05) 0%, transparent 60%)`;
      }
      requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={spotRef}
      className="fixed inset-0 pointer-events-none z-[1] transition-none"
      aria-hidden
    />
  );
}
