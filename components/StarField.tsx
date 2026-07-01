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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];
    let animationId: number;

    function createStars() {
      const count = Math.floor((width * height) / 1600);
      stars = Array.from({ length: count }, () => {
        const r = Math.random();
        const hue: Star["hue"] = r < 0.65 ? "white" : r < 0.85 ? "blue" : "cyan";
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2 + 0.6,
          baseAlpha: Math.random() * 0.5 + 0.5,
          twinkleSpeed: Math.random() * 0.03 + 0.008,
          twinkleOffset: Math.random() * Math.PI * 2,
          driftX: (Math.random() - 0.5) * 0.08,
          driftY: (Math.random() - 0.5) * 0.08,
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

        if (s.radius > 1.3) {
          ctx!.beginPath();
          ctx!.arc(s.x, s.y, s.radius * 3, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${colorMap[s.hue]}, ${alpha * 0.18})`;
          ctx!.fill();
        }
      }

      if (Math.random() < 0.01 && shootingStars.length < 2) {
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
  }, []);

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Base galaxy gradient — lives here, not on <body>, so it can never get "promoted" above this layer */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 1200px 800px at 50% -10%, #142C52 0%, #0A1830 45%, #020509 100%)",
        }}
      />
      {/* Moving nebula blobs */}
      <div className="absolute -top-24 -left-20 h-[450px] w-[450px] rounded-full bg-neon-blue/40 blur-[90px] animate-nebula-1" />
      <div className="absolute top-1/3 -right-20 h-[420px] w-[420px] rounded-full bg-neon-cyan/35 blur-[85px] animate-nebula-2" />
      <div className="absolute bottom-0 left-1/4 h-[360px] w-[360px] rounded-full bg-purple-500/30 blur-[85px] animate-nebula-3" />
      <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-neon-blue/20 blur-[100px] animate-nebula-2" />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
