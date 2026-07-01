"use client";
import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  driftX: number;
  driftY: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let stars: Star[] = [];
    let animationId: number;

    function createStars() {
      const count = Math.floor((width * height) / 8000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.3 + 0.3,
        baseAlpha: Math.random() * 0.5 + 0.25,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        driftX: (Math.random() - 0.5) * 0.03,
        driftY: (Math.random() - 0.5) * 0.03,
      }));
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width;
      canvas!.height = height;
      createStars();
    }

    let t = 0;
    function draw() {
      ctx!.clearRect(0, 0, width, height);
      t += 1;
      for (const s of stars) {
        const twinkle = Math.sin(t * s.twinkleSpeed + s.twinkleOffset) * 0.5 + 0.5;
        const alpha = s.baseAlpha * (0.5 + twinkle * 0.5);
        s.x += s.driftX;
        s.y += s.driftY;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(180, 225, 255, ${alpha})`;
        ctx!.fill();
      }
      animationId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}
