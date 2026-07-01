"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Check, ShoppingCart } from "lucide-react";
import { getProductBySlug, formatRupiah } from "@/lib/store";
import { Product } from "@/lib/types";
import ProductIcon from "@/components/ProductIcon";
import AnimatedSection from "@/components/AnimatedSection";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null | undefined>(undefined);

  useEffect(() => {
    const slug = params.slug as string;
    setProduct(getProductBySlug(slug));
  }, [params.slug]);

  if (product === undefined) {
    return <main className="px-6 pt-20 text-center text-slate-500">Memuat...</main>;
  }

  if (!product) {
    return (
      <main className="px-6 pt-20 text-center">
        <p className="text-slate-400 mb-4">Produk tidak ditemukan.</p>
        <Link href="/products" className="text-neon-cyan text-sm">← Kembali ke Produk</Link>
      </main>
    );
  }

  return (
    <main className="px-6 pt-10 pb-10">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-neon-cyan mb-6 transition-colors"
        >
          <ArrowLeft size={15} /> Kembali
        </Link>

        <AnimatedSection>
          <div className="rounded-3xl border border-neon-blue/15 bg-card-gradient p-8 shadow-glow">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neon-blue/10 text-neon-cyan animate-float">
                <ProductIcon name={product.icon} size={32} />
              </div>
              <div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-400">
                  {product.category}
                </span>
                <h1 className="text-2xl font-bold text-white mt-1.5">{product.name}</h1>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed mb-6">{product.description}</p>

            <div className="space-y-2.5 mb-8">
              {product.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neon-cyan/15 text-neon-cyan">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-sm text-slate-400">{feat}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-white/5 px-5 py-4 mb-6">
              <span className="text-xs text-slate-400">Harga</span>
              <span className="text-gradient text-2xl font-bold">
                {product.priceLabel || formatRupiah(product.price)}
              </span>
            </div>

            <button
              onClick={() => router.push(`/checkout/${product.slug}`)}
              className="btn-glow w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-blue to-neon-cyan px-6 py-3.5 text-sm font-semibold text-space-950"
            >
              <ShoppingCart size={17} /> Beli Sekarang
            </button>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}
