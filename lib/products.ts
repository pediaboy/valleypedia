import { Product } from "./types";

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "rw-basic",
    slug: "rw-basic",
    name: "RW Basic",
    category: "Internet",
    price: 20000,
    description:
      "Paket harian buat yang penting koneksi lancar tanpa keluar budget gede. Cocok buat push rank santai atau sekadar chat & scroll.",
    features: [
      "Lancar buat pemakaian sehari-hari",
      "Aktif langsung abis bayar, ga nunggu lama",
      "Pas buat main santai atau chatan",
      "Tinggal WA admin kalo ada kendala",
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
      "Ini yang paling laris. Jalur prioritas jadi delay nyaris ga kerasa, enak buat push rank atau streaming barengan tim.",
    features: [
      "Jalur prioritas, ga rebutan sama yang lain",
      "Kenceng stabil, ga naik turun",
      "Enak dipake mabar atau streaming",
      "Admin gercep kalo ada masalah",
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
      "Kelas paling atas yang kita punya. Buat yang serius push rank atau grinding lama tiap hari, ini pilihan paling worth it.",
    features: [
      "Kelas tertinggi, delay nyaris nol",
      "Privasi dijaga ketat",
      "Prioritas dibantu kapan aja",
      "Akses fitur khusus member VIP",
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
      "Buat yang mau browsing aman atau buka yang keblokir tanpa was-was IP ketauan. Aktif sebulan penuh, gampang settingnya.",
    features: [
      "Enkripsi kelas atas, data aman",
      "Bebas pilih server dari negara manapun",
      "IP asli disembunyiin total",
      "Aktif full 1 bulan sejak dipakai",
    ],
    icon: "Lock",
  },
  {
    id: "dk-cheat",
    slug: "dk-cheat",
    name: "DK / Cheat",
    category: "Tools",
    price: null,
    priceLabel: "Harga nego sesuai durasi",
    description:
      "Tools bantuan yang selalu di-update ngikutin patch terbaru biar tetep aman dipake. Bisa nyoba trial dulu sebelum lanjut.",
    features: [
      "Update ngikutin versi game terbaru",
      "Dijaga aman, minim resiko kena report",
      "Bisa trial dulu sesuai kebutuhan",
      "Tinggal chat admin buat konsultasi",
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
      "Script otomatis yang ringan dijalanin, cocok buat yang males kerja manual berulang-ulang. Tinggal setting sekali, jalan sendiri.",
    features: [
      "Bisa handle sampe 50 line sekaligus",
      "Ringan, ga makan resource gede",
      "Responnya cepet, ga nge-lag",
      "Panduan setting udah disertain",
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
      "Paket buat mabar bareng squad. Server-nya stabil dipake rame-rame, harganya juga lebih hemat per orang.",
    features: [
      "Stabil meski dipake rame-rame",
      "Cocok buat squad atau komunitas",
      "Kapasitas jaringan lebih gede",
      "Lebih hemat dibanding beli satuan",
    ],
    icon: "Users",
  },
];

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  Semua: "Semua produk yang kita punya, tinggal pilih sesuai kebutuhan lu.",
  Internet: "Paket RW buat koneksi stabil push rank tanpa delay, dari harian sampe kelas VIP.",
  VPN: "Buat browsing aman, privasi terjaga, dan buka akses yang keblokir.",
  Tools: "Tools bantuan trusted yang rutin di-update biar tetep aman dipake.",
  Automation: "Script otomatis biar kerjaan berulang jadi lebih ringan dan cepet.",
};

export const CATEGORIES = Array.from(
  new Set(DEFAULT_PRODUCTS.map((p) => p.category))
);
