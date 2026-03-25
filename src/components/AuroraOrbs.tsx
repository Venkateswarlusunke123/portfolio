"use client";

export default function AuroraOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
      {/* Top-left green orb */}
      <div
        className="absolute rounded-full"
        style={{
          width: "700px",
          height: "700px",
          top: "-200px",
          left: "-200px",
          background: "radial-gradient(circle, rgba(0,217,126,0.10) 0%, transparent 70%)",
          animation: "aurora-1 18s ease-in-out infinite",
          filter: "blur(40px)",
        }}
      />
      {/* Top-right cyan orb */}
      <div
        className="absolute rounded-full"
        style={{
          width: "600px",
          height: "600px",
          top: "-150px",
          right: "-150px",
          background: "radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)",
          animation: "aurora-2 22s ease-in-out infinite",
          filter: "blur(50px)",
        }}
      />
      {/* Middle green orb */}
      <div
        className="absolute rounded-full"
        style={{
          width: "500px",
          height: "500px",
          top: "40%",
          left: "30%",
          background: "radial-gradient(circle, rgba(0,217,126,0.05) 0%, transparent 70%)",
          animation: "aurora-3 26s ease-in-out infinite",
          filter: "blur(60px)",
        }}
      />
      {/* Bottom-right purple orb */}
      <div
        className="absolute rounded-full"
        style={{
          width: "480px",
          height: "480px",
          bottom: "-100px",
          right: "-100px",
          background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)",
          animation: "aurora-4 20s ease-in-out infinite",
          filter: "blur(50px)",
        }}
      />
      {/* Bottom-left green tint */}
      <div
        className="absolute rounded-full"
        style={{
          width: "400px",
          height: "400px",
          bottom: "10%",
          left: "-80px",
          background: "radial-gradient(circle, rgba(0,217,126,0.04) 0%, transparent 70%)",
          animation: "aurora-5 30s ease-in-out infinite",
          filter: "blur(60px)",
        }}
      />
      {/* Terminal grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `linear-gradient(rgba(0,217,126,0.025) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,217,126,0.025) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
