"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/testimonials";

export default function Testimonials() {
  return (
    <div className="overflow-hidden">
      <div className="flex gap-4 animate-scroll-x">
        {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
          <div
            key={i}
            className="w-[260px] shrink-0 rounded-2xl border border-neon-blue/15 bg-card-gradient p-5"
          >
            <div className="flex items-center gap-1 mb-2.5">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star
                  key={s}
                  size={13}
                  className={s < t.rating ? "fill-neon-cyan text-neon-cyan" : "text-slate-700"}
                />
              ))}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">"{t.text}"</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white">{t.name}</p>
                <p className="text-[11px] text-slate-500">{t.product}</p>
              </div>
              <span className="text-[10px] text-slate-600">{t.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
