"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Product } from "@/lib/types";
import { formatRupiah } from "@/lib/store";
import ProductIcon from "./ProductIcon";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="card-glow group block h-full rounded-2xl border border-neon-blue/15 bg-card-gradient p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neon-blue/10 text-neon-cyan">
            <ProductIcon name={product.icon} />
          </div>
          <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-400">
            {product.category}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-1.5">{product.name}</h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <span className="text-gradient text-xl font-bold">
            {product.priceLabel || formatRupiah(product.price)}
          </span>
          <span className="flex items-center gap-1 text-sm text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity">
            Detail <ArrowRight size={15} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
