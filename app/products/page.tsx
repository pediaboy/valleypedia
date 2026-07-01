"use client";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/store";
import { Product } from "@/lib/types";
import { CATEGORIES } from "@/lib/products";
import AnimatedSection from "@/components/AnimatedSection";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("Semua");

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const categories = ["Semua", ...Array.from(new Set(products.map((p) => p.category)))];
  const filtered =
    activeCategory === "Semua"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <main className="px-6 pt-14 pb-10">
      <AnimatedSection className="max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Semua Produk</h1>
        <p className="text-slate-400 text-sm">
          Pilih paket yang sesuai dengan kebutuhan digital Anda.
        </p>
      </AnimatedSection>

      <AnimatedSection className="max-w-5xl mx-auto mb-8 flex gap-2 overflow-x-auto pb-2" delay={0.05}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-gradient-to-r from-neon-blue to-neon-cyan text-space-950 shadow-glow-cyan"
                : "glass text-slate-400 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </AnimatedSection>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-slate-500 mt-10">Tidak ada produk di kategori ini.</p>
      )}
    </main>
  );
}
