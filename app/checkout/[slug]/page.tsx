"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import { getProductBySlug, formatRupiah, generateInvoiceId, createInvoice } from "@/lib/store";
import { Product } from "@/lib/types";

const WHATSAPP_NUMBER = "6283897340112";

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const [agreed, setAgreed] = useState(false);
  const [invoiceId, setInvoiceId] = useState<string>("");
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const slug = params.slug as string;
    const p = getProductBySlug(slug);
    setProduct(p);
    setInvoiceId(generateInvoiceId());
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

  const handleConfirm = () => {
    if (!agreed) return;

    createInvoice({
      id: invoiceId,
      productId: product.id,
      productName: product.name,
      amount: product.price,
      status: "pending",
      createdAt: new Date().toISOString(),
    });

    setConfirmed(true);

    const priceText = product.priceLabel || formatRupiah(product.price);
    const message = `Halo VALLEYPEDIA, saya ingin mengkonfirmasi pembayaran untuk ${product.name} (${priceText}). Berikut adalah detail pesanan saya: ${invoiceId}. Mohon diproses.`;
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      window.open(waUrl, "_blank");
    }, 600);
  };

  return (
    <main className="px-6 pt-8 pb-10">
      <div className="max-w-md mx-auto">
        <Link
          href={`/products/${product.slug}`}
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-neon-cyan mb-6 transition-colors"
        >
          <ArrowLeft size={15} /> Kembali ke Produk
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-white text-slate-900 overflow-hidden shadow-glow-lg"
        >
          {/* Header ala Midtrans/Xendit */}
          <div className="bg-gradient-to-r from-space-900 to-space-800 px-6 py-5 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-slate-400 uppercase tracking-wider">Invoice</p>
              <p className="text-white font-mono text-sm font-semibold">{invoiceId}</p>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-neon-cyan/15 px-3 py-1">
              <Clock size={12} className="text-neon-cyan" />
              <span className="text-[11px] text-neon-cyan font-medium">Menunggu</span>
            </div>
          </div>

          <div className="px-6 py-6">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-dashed border-slate-200">
              <div>
                <p className="text-xs text-slate-500">Produk</p>
                <p className="font-semibold text-sm">{product.name}</p>
              </div>
              <p className="font-bold text-lg text-slate-900">
                {product.priceLabel || formatRupiah(product.price)}
              </p>
            </div>

            <p className="text-center text-xs text-slate-500 mb-3 font-medium">
              SCAN QRIS UNTUK MEMBAYAR
            </p>

            {/* QRIS mockup */}
            <div className="mx-auto mb-4 flex h-56 w-56 items-center justify-center rounded-2xl border-2 border-slate-200 bg-white p-3">
              <QRISMockup />
            </div>

            <div className="flex items-center justify-center gap-2 mb-6">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Logo_QRIS.svg/512px-Logo_QRIS.svg.png" alt="QRIS" className="h-6" onError={(e) => (e.currentTarget.style.display = 'none')} />
              <span className="text-[11px] text-slate-400">Berlaku untuk semua e-wallet & bank</span>
            </div>

            <label className="flex items-start gap-2.5 mb-5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-blue-600"
              />
              <span className="text-xs text-slate-600 leading-relaxed">
                Saya menyetujui{" "}
                <span className="font-semibold text-slate-800">Syarat dan Ketentuan</span>{" "}
                transaksi VALLEYPEDIA dan memahami bahwa pesanan diproses setelah pembayaran dikonfirmasi.
              </span>
            </label>

            {!confirmed ? (
              <button
                onClick={handleConfirm}
                disabled={!agreed}
                className={`w-full rounded-xl px-6 py-3.5 text-sm font-semibold transition-all ${
                  agreed
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                Konfirmasi Pembayaran
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 rounded-xl bg-green-50 px-6 py-3.5 text-sm font-semibold text-green-700">
                <CheckCircle2 size={17} /> Mengarahkan ke WhatsApp...
              </div>
            )}

            <div className="flex items-center justify-center gap-1.5 mt-4">
              <ShieldCheck size={13} className="text-slate-400" />
              <span className="text-[10px] text-slate-400">
                Transaksi aman & terenkripsi
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

function QRISMockup() {
  // Simple deterministic-looking QR mockup pattern (visual only)
  const size = 21;
  const cells = [];
  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < size * size; i++) {
    cells.push(rand() > 0.55);
  }
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full">
      <rect width={size} height={size} fill="white" />
      {cells.map((filled, i) => {
        const x = i % size;
        const y = Math.floor(i / size);
        // finder patterns corners
        const inFinder =
          (x < 3 && y < 3) ||
          (x > size - 4 && y < 3) ||
          (x < 3 && y > size - 4);
        if (inFinder) return null;
        return filled ? (
          <rect key={i} x={x} y={y} width={1} height={1} fill="#0A192F" />
        ) : null;
      })}
      {/* Finder patterns */}
      {[[0, 0], [size - 7, 0], [0, size - 7]].map(([fx, fy], idx) => (
        <g key={idx}>
          <rect x={fx} y={fy} width={7} height={7} fill="#0A192F" />
          <rect x={fx + 1} y={fy + 1} width={5} height={5} fill="white" />
          <rect x={fx + 2} y={fy + 2} width={3} height={3} fill="#0A192F" />
        </g>
      ))}
    </svg>
  );
}
