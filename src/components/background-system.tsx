"use client";

import React, { useEffect, useRef, useState } from "react";

interface NodePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
}

export function BackgroundSystem() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Detect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMotionChange);
      return () => mediaQuery.removeEventListener("change", handleMotionChange);
    }
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Keep node count small and elegant (14 on desktop, 8 on mobile)
    const isMobile = width < 768;
    const nodeCount = isMobile ? 8 : 16;
    const maxConnectionDistance = isMobile ? 120 : 180;

    const nodes: NodePoint[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25, // Very slow, calm movement
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.5 + 1.2,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Determine accent color from active DOM style
      const isDark = document.documentElement.getAttribute("data-theme") !== "light";
      const nodeColor = isDark ? "rgba(182, 240, 156, " : "rgba(85, 125, 67, ";
      const lineColor = isDark ? "rgba(182, 240, 156, " : "rgba(85, 125, 67, ";

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        // Soft bounce at borders
        if (node.x < 0) { node.x = 0; node.vx *= -1; }
        if (node.x > width) { node.x = width; node.vx *= -1; }
        if (node.y < 0) { node.y = 0; node.vy *= -1; }
        if (node.y > height) { node.y = height; node.vy *= -1; }

        // Draw connections to nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectionDistance) {
            const alpha = (1 - dist / maxConnectionDistance) * (isDark ? 0.12 : 0.09);
            ctx.beginPath();
            ctx.strokeStyle = `${lineColor}${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        // Draw node with subtle breathing opacity
        const pulse = 0.5 + Math.sin(time * 0.001 + node.phase) * 0.3;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${nodeColor}${isDark ? 0.4 * pulse : 0.35 * pulse})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [reducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none"
    >
      {/* ── 1. Base Layer Gradient Depth ──────────────────────────────── */}
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, var(--surface) 0%, var(--bg-primary) 70%)",
        }}
      />

      {/* ── 2. Ambient Radial Lighting Orbs ───────────────────────────── */}
      {/* Hero Glow (Top Right) */}
      <div
        className="absolute -top-[10%] -right-[5%] w-[45vw] max-w-[650px] h-[45vw] max-h-[650px] rounded-full transition-opacity duration-700 animate-ambient-drift"
        style={{
          background:
            "radial-gradient(circle, var(--glow-color) 0%, transparent 68%)",
          filter: "blur(70px)",
        }}
      />

      {/* Mid-Page Glow (Projects / Lab Left) */}
      <div
        className="absolute top-[40%] -left-[10%] w-[40vw] max-w-[550px] h-[40vw] max-h-[550px] rounded-full transition-opacity duration-700 animate-ambient-drift"
        style={{
          animationDelay: "-6s",
          background:
            "radial-gradient(circle, var(--glow-color) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Contact Bottom Glow (Right) */}
      <div
        className="absolute -bottom-[5%] right-[10%] w-[35vw] max-w-[500px] h-[35vw] max-h-[500px] rounded-full transition-opacity duration-700 animate-ambient-drift"
        style={{
          animationDelay: "-12s",
          background:
            "radial-gradient(circle, var(--glow-color) 0%, transparent 70%)",
          filter: "blur(75px)",
        }}
      />

      {/* ── 3. Subtle Technical Grid with Radial Falloff ─────────────── */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at 50% 40%, black 40%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 40%, black 40%, transparent 95%)",
        }}
      />

      {/* ── 4. Lightweight Restrained Network Canvas ──────────────────── */}
      {!reducedMotion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-70"
        />
      )}

      {/* ── 5. Fine Film Grain Texture ─────────────────────────────────── */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.028] dark:opacity-[0.024] pointer-events-none mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
