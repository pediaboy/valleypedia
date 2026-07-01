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
      const count = Math.floor((width * height) / 2600);
      stars = Array.from({ length: count }, () => {
        const r = Math.random();
        const hue: Star["hue"] = r < 0.7 ? "white" : r < 0.87 ? "blue" : "cyan";
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.6 + 0.4,
          baseAlpha: Math.random() * 0.6 + 0.35,
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
        len: Math.random() * 80 + 60,
        speed: Math.random() * 8 + 6,
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
      white: "180, 220, 255",
      blue: "96, 165, 250",
      cyan: "34, 211, 238",
    };

    let t = 0;
    function draw() {
      ctx!.clearRect(0, 0, width, height);
      t += 1;

      for (const s of stars) {
        const twinkle = Math.sin(t * s.twinkleSpeed + s.twinkleOffset) * 0.5 + 0.5;
        const alpha = s.baseAlpha * (0.4 + twinkle * 0.6);
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

        if (s.radius > 1.5) {
          ctx!.beginPath();
          ctx!.arc(s.x, s.y, s.radius * 2.5, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${colorMap[s.hue]}, ${alpha * 0.15})`;
          ctx!.fill();
        }
      }

      if (Math.random() < 0.006 && shootingStars.length < 2) {
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
        grad.addColorStop(0, `rgba(220, 240, 255, ${fade})`);
        grad.addColorStop(1, "rgba(220, 240, 255, 0)");
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 1.6;
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
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      {/* Moving nebula blobs */}
      <div className="absolute -top-32 -left-20 h-[420px] w-[420px] rounded-full bg-neon-blue/25 blur-[110px] animate-nebula-1" />
      <div className="absolute top-1/3 -right-24 h-[380px] w-[380px] rounded-full bg-neon-cyan/20 blur-[100px] animate-nebula-2" />
      <div className="absolute bottom-0 left-1/4 h-[320px] w-[320px] rounded-full bg-purple-500/15 blur-[100px] animate-nebula-3" />
      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
    </div>
  );
}
