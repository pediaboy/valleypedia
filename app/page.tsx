"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, Sparkles } from "lucide-react";
import { getProducts, formatRupiah } from "@/lib/store";
import { Product } from "@/lib/types";
import AnimatedSection from "@/components/AnimatedSection";
import ProductCard from "@/components/ProductCard";

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
          <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-neon-blue/20 blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 mb-6 shadow-glow"
        >
          <Sparkles size={14} className="text-neon-cyan" />
          <span className="text-xs font-medium text-slate-300">Akses Premium Terpercaya</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
        >
          <span className="text-white">VALLEY</span>
          <span className="text-gradient">PEDIA</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-md text-slate-400 text-base leading-relaxed mb-8"
        >
          Ekosistem akses digital premium — jaringan stabil, VPN aman,
          dan tools eksklusif untuk kebutuhan profesional Anda.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/products"
            className="btn-glow inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-blue to-neon-cyan px-7 py-3.5 text-sm font-semibold text-space-950"
          >
            Jelajahi Produk <ArrowRight size={16} />
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
      <section className="px-6 pb-10">
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

      {/* CTA */}
      <AnimatedSection className="px-6 py-10">
        <div className="mx-auto max-w-2xl rounded-3xl glass p-10 text-center shadow-glow">
          <h3 className="text-2xl font-bold text-white mb-3">
            Butuh Bantuan Memilih Paket?
          </h3>
          <p className="text-slate-400 text-sm mb-6">
            Tim kami siap membantu Anda menemukan solusi yang tepat.
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
