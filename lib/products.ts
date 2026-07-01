import { Product } from "./types";

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "rw-basic",
    slug: "rw-basic",
    name: "RW Basic",
    category: "Internet",
    price: 20000,
    description:
      "Akses esensial dengan performa stabil untuk kebutuhan dasar digital Anda.",
    features: [
      "Kecepatan stabil untuk pemakaian harian",
      "Aktivasi instan setelah pembayaran",
      "Cocok untuk browsing & chat ringan",
      "Dukungan teknis dasar",
    ],
    icon: "Wifi",
  },
  {
    id: "rw-premium",
    slug: "rw-premium",
    name: "RW Premium",
    category: "Internet",
    price: 50000,
    description:
      "Kecepatan tinggi dan prioritas jaringan utama, dirancang khusus untuk pengalaman tanpa hambatan.",
    features: [
      "Prioritas jalur jaringan utama",
      "Kecepatan tinggi tanpa throttling",
      "Stabilitas untuk streaming & gaming",
      "Dukungan teknis prioritas",
    ],
    icon: "Gauge",
  },
  {
    id: "rw-kyvip",
    slug: "rw-kyvip",
    name: "RW KyVIP",
    category: "Internet",
    price: 150000,
    description:
      "Kasta tertinggi dengan fitur eksklusif, anti-delay, dan tingkat privasi maksimal untuk profesional.",
    features: [
      "Kelas jaringan tertinggi (anti-delay)",
      "Privasi & enkripsi maksimal",
      "Prioritas dukungan 24/7",
      "Akses fitur eksklusif VIP",
    ],
    icon: "ShieldCheck",
  },
  {
    id: "vpn-surfshark-1b",
    slug: "vpn-surfshark-1-bulan",
    name: "VPN Surfshark 1 Bulan",
    category: "VPN",
    price: 10000,
    description:
      "Proteksi identitas digital komprehensif dan akses server global tanpa batas selama 1 bulan.",
    features: [
      "Enkripsi tingkat militer",
      "Akses server global tanpa batas",
      "Sembunyikan IP & lokasi asli",
      "Masa aktif 1 bulan penuh",
    ],
    icon: "Lock",
  },
  {
    id: "dk-cheat",
    slug: "dk-cheat",
    name: "DK / Cheat",
    category: "Tools",
    price: null,
    priceLabel: "Harga menyesuaikan masa trial",
    description:
      "Solusi bypass premium dengan pembaruan real-time dan keamanan sistem terenkripsi.",
    features: [
      "Update real-time mengikuti versi terbaru",
      "Sistem keamanan terenkripsi",
      "Trial fleksibel sesuai kebutuhan",
      "Support konsultasi langsung",
    ],
    icon: "Cpu",
  },
  {
    id: "bot-warlit-50",
    slug: "file-bot-warlit-50-line",
    name: "File Bot Warlit 50 Line",
    category: "Automation",
    price: 25000,
    description:
      "Skrip otomatisasi efisien, ringan, dan sangat responsif untuk optimalisasi tugas Anda.",
    features: [
      "Kapasitas hingga 50 line sekaligus",
      "Ringan & hemat resource",
      "Respons cepat dan stabil",
      "Dokumentasi setup disertakan",
    ],
    icon: "Bot",
  },
  {
    id: "partyan-rw",
    slug: "partyan-rw",
    name: "Partyan RW",
    category: "Internet",
    price: 30000,
    description:
      "Paket komunal dengan stabilitas server tingkat tinggi yang cocok untuk sesi kolaboratif.",
    features: [
      "Stabilitas server tingkat tinggi",
      "Cocok untuk pemakaian bersama/tim",
      "Kapasitas jaringan lebih besar",
      "Harga lebih efisien per sesi",
    ],
    icon: "Users",
  },
];

export const CATEGORIES = Array.from(
  new Set(DEFAULT_PRODUCTS.map((p) => p.category))
);
