"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  driftX: number;
  driftY: number;
  hue: "white" | "blue" | "cyan";
}

interface ShootingStar {
  x: number;
  y: number;
  len: number;
  speed: number;
  angle: number;
  life: number;
  maxLife: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  // Admin dashboard is data-heavy (tables, forms) — skip the animated
  // background there entirely so it never competes for the main thread
  // and switching tabs/pages stays smooth on lower-end devices.
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];
    let animationId: number;
    let frameCount = 0;

    function createStars() {
      // Lighter density — enough to read as a starfield without taxing the CPU
      const count = Math.min(140, Math.floor((width * height) / 4500));
      stars = Array.from({ length: count }, () => {
        const r = Math.random();
        const hue: Star["hue"] = r < 0.65 ? "white" : r < 0.85 ? "blue" : "cyan";
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.8 + 0.6,
          baseAlpha: Math.random() * 0.5 + 0.5,
          twinkleSpeed: Math.random() * 0.03 + 0.008,
          twinkleOffset: Math.random() * Math.PI * 2,
          driftX: (Math.random() - 0.5) * 0.06,
          driftY: (Math.random() - 0.5) * 0.06,
          hue,
        };
      });
    }

    function spawnShootingStar() {
      shootingStars.push({
        x: Math.random() * width * 0.6 + width * 0.2,
        y: Math.random() * height * 0.3,
        len: Math.random() * 90 + 70,
        speed: Math.random() * 9 + 7,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
        life: 0,
        maxLife: 40,
      });
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width;
      canvas!.height = height;
      createStars();
    }

    const colorMap = {
      white: "220, 235, 255",
      blue: "120, 180, 255",
      cyan: "56, 224, 246",
    };

    let t = 0;
    function draw() {
      frameCount++;
      // Throttle to ~30fps instead of 60fps — halves CPU work, imperceptible for a twinkle effect
      if (frameCount % 2 === 0) {
        animationId = requestAnimationFrame(draw);
        return;
      }
      ctx!.clearRect(0, 0, width, height);
      t += 1;

      for (const s of stars) {
        const twinkle = Math.sin(t * s.twinkleSpeed + s.twinkleOffset) * 0.5 + 0.5;
        const alpha = s.baseAlpha * (0.35 + twinkle * 0.65);
        s.x += s.driftX;
        s.y += s.driftY;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${colorMap[s.hue]}, ${alpha})`;
        ctx!.fill();
      }

      if (Math.random() < 0.008 && shootingStars.length < 2) {
        spawnShootingStar();
      }
      shootingStars = shootingStars.filter((sh) => sh.life < sh.maxLife);
      for (const sh of shootingStars) {
        sh.life += 1;
        sh.x += Math.cos(sh.angle) * sh.speed;
        sh.y += Math.sin(sh.angle) * sh.speed;
        const fade = 1 - sh.life / sh.maxLife;
        const tailX = sh.x - Math.cos(sh.angle) * sh.len;
        const tailY = sh.y - Math.sin(sh.angle) * sh.len;
        const grad = ctx!.createLinearGradient(sh.x, sh.y, tailX, tailY);
        grad.addColorStop(0, `rgba(230, 245, 255, ${fade})`);
        grad.addColorStop(1, "rgba(230, 245, 255, 0)");
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 2;
        ctx!.beginPath();
        ctx!.moveTo(sh.x, sh.y);
        ctx!.lineTo(tailX, tailY);
        ctx!.stroke();
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
  }, [isAdmin]);

  if (isAdmin) {
    // Static, cheap background for admin — no animation, no blur, no canvas
    return (
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background:
            "radial-gradient(ellipse 1200px 800px at 50% -10%, #142C52 0%, #0A1830 45%, #020509 100%)",
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Base galaxy gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 1200px 800px at 50% -10%, #142C52 0%, #0A1830 45%, #020509 100%)",
        }}
      />
      {/* Nebula glow — plain radial-gradient blobs, no filter:blur() (expensive to
          repaint every animation frame on mobile GPUs). CSS transform-only animation
          is compositor-driven and cheap. */}
      <div
        className="absolute -top-24 -left-20 h-[500px] w-[500px] rounded-full animate-nebula-1"
        style={{ background: "radial-gradient(circle, rgba(56,189,248,0.35) 0%, rgba(56,189,248,0) 70%)" }}
      />
      <div
        className="absolute top-1/3 -right-20 h-[460px] w-[460px] rounded-full animate-nebula-2"
        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.3) 0%, rgba(34,211,238,0) 70%)" }}
      />
      <div
        className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full animate-nebula-3"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.25) 0%, rgba(168,85,247,0) 70%)" }}
      />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
