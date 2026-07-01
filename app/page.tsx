"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, Sparkles, Gamepad2 } from "lucide-react";
import { getProducts } from "@/lib/store";
import { Product } from "@/lib/types";
import AnimatedSection from "@/components/AnimatedSection";
import ProductCard from "@/components/ProductCard";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const featured = products.slice(0, 4);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-20 pb-16 text-center">
        <div className="absolute inset-0 -z-10 opacity-40">
          <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-neon-blue/20 blur-[120px] animate-pulse-slow" />
        </div>
        <div className="absolute inset-0 -z-10 opacity-25">
          <div className="absolute right-0 bottom-0 h-[350px] w-[350px] rounded-full bg-neon-cyan/20 blur-[100px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 mb-6 shadow-glow"
        >
          <Gamepad2 size={14} className="text-neon-cyan" />
          <span className="text-xs font-medium text-slate-300">Dipercaya Ratusan Player Mobile Legend</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="brand-wordmark text-5xl md:text-7xl font-extrabold tracking-tight mb-1 uppercase"
        >
          <span className="brand-valley text-white">VALLEY</span>
          <span className="text-gradient">PEDIA</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-[11px] tracking-[0.35em] text-neon-cyan/70 font-medium mb-5 uppercase"
        >
          Premium Digital Access
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-md text-slate-400 text-base leading-relaxed mb-8"
        >
          Capek koneksi ngelag pas lagi war? Di VALLEYPEDIA lengkap — RW anti delay,
          VPN buat jaga privasi, sampe tools support biar mabar makin nyaman. Udah dipake banyak orang, tinggal gas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-3"
        >
          <Link
            href="/products"
            className="btn-glow inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-blue to-neon-cyan px-7 py-3.5 text-sm font-semibold text-space-950"
          >
            Jelajahi Produk <ArrowRight size={16} />
          </Link>
          <Link
            href="/snk"
            className="glass inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Kenapa Kami?
          </Link>
        </motion.div>
      </section>

      {/* Trust badges */}
      <AnimatedSection className="px-6 mb-16">
        <div className="mx-auto grid max-w-md grid-cols-3 gap-3">
          {[
            { icon: Shield, label: "Aman & Terpercaya" },
            { icon: Zap, label: "Aktivasi Instan" },
            { icon: Sparkles, label: "Kualitas Premium" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="glass flex flex-col items-center gap-2 rounded-xl px-3 py-4 text-center"
              >
                <Icon size={20} className="text-neon-cyan" />
                <span className="text-[11px] text-slate-400 leading-tight">{item.label}</span>
              </div>
            );
          })}
        </div>
      </AnimatedSection>

      {/* Featured Products */}
      <section className="px-6 pb-16">
        <AnimatedSection className="mb-6 flex items-center justify-between max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-white">Produk Unggulan</h2>
          <Link href="/products" className="text-sm text-neon-cyan flex items-center gap-1 hover:gap-2 transition-all">
            Lihat Semua <ArrowRight size={14} />
          </Link>
        </AnimatedSection>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="pb-16">
        <AnimatedSection className="px-6 mb-6 max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-1.5">Apa Kata Mereka</h2>
          <p className="text-sm text-slate-400">30+ transaksi nyata dari pelanggan VALLEYPEDIA</p>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <Testimonials />
        </AnimatedSection>
      </section>

      {/* CTA */}
      <AnimatedSection className="px-6 py-4">
        <div className="mx-auto max-w-2xl rounded-3xl glass p-10 text-center shadow-glow">
          <h3 className="text-2xl font-bold text-white mb-3">
            Bingung Mau Pilih yang Mana?
          </h3>
          <p className="text-slate-400 text-sm mb-6">
            Chat aja langsung, nanti dibantu carikan paket yang paling pas buat kebutuhan lu.
          </p>
          <a
            href="https://wa.me/6283897340112"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-blue to-neon-cyan px-6 py-3 text-sm font-semibold text-space-950"
          >
            Hubungi Kami <ArrowRight size={16} />
          </a>
        </div>
      </AnimatedSection>
    </main>
  );
}
