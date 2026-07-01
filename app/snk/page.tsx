"use client";
import { ShieldCheck, Zap, Users, Lock, Clock, Award, FileCheck } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const WHY_US = [
  {
    icon: ShieldCheck,
    title: "Aman & Terpercaya",
    desc: "Setiap transaksi diproses dengan sistem terenkripsi. Sudah dipercaya ratusan pelanggan sejak awal beroperasi.",
  },
  {
    icon: Zap,
    title: "Aktivasi Instan",
    desc: "Setelah pembayaran dikonfirmasi, pesanan diproses secepat mungkin tanpa antrean panjang.",
  },
  {
    icon: Users,
    title: "Komunitas Solid",
    desc: "Dipakai oleh ratusan player Mobile Legend untuk push rank tanpa delay maupun kendala jaringan.",
  },
  {
    icon: Lock,
    title: "Privasi Terjaga",
    desc: "Data dan aktivitas pelanggan tidak pernah dibagikan ke pihak ketiga mana pun.",
  },
  {
    icon: Clock,
    title: "Dukungan Responsif",
    desc: "Tim support siap membantu lewat WhatsApp untuk kendala teknis maupun pertanyaan sebelum order.",
  },
  {
    icon: Award,
    title: "Kualitas Konsisten",
    desc: "Server dan tools terus dipantau dan diperbarui agar performa tetap stabil setiap saat.",
  },
];

const TERMS = [
  "Pembayaran wajib sesuai nominal yang tertera termasuk kode unik agar terverifikasi otomatis oleh sistem.",
  "Pesanan diproses setelah bukti pembayaran dikonfirmasi melalui WhatsApp resmi VALLEYPEDIA.",
  "Produk digital yang sudah aktif tidak dapat dikembalikan atau di-refund, kecuali ada kesalahan dari pihak kami.",
  "VALLEYPEDIA tidak bertanggung jawab atas penyalahgunaan produk di luar ketentuan penggunaan wajar.",
  "Durasi aktif tiap produk mengikuti keterangan yang tercantum pada halaman detail produk.",
  "Kerahasiaan data pelanggan dijaga penuh dan tidak diperjualbelikan ke pihak manapun.",
  "Hubungi admin melalui tombol Kontak jika pesanan tidak aktif dalam 1x24 jam setelah pembayaran dikonfirmasi.",
  "Harga dan ketentuan dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya.",
];

export default function SnkPage() {
  return (
    <main className="px-6 pt-12 pb-10 max-w-2xl mx-auto">
      <AnimatedSection className="text-center mb-12">
        <span className="inline-flex items-center gap-1.5 rounded-full glass px-4 py-1.5 text-xs text-slate-300 mb-4">
          <FileCheck size={13} className="text-neon-cyan" /> Informasi Resmi
        </span>
        <h1 className="text-3xl font-bold text-white mb-3">
          Kenapa Harus <span className="text-gradient">VALLEYPEDIA</span>?
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Kami bukan sekadar toko digital biasa — VALLEYPEDIA dibangun untuk
          menjadi ekosistem akses premium yang benar-benar diandalkan komunitas
          Mobile Legend dan pengguna digital lainnya.
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
        {WHY_US.map((item, i) => {
          const Icon = item.icon;
          return (
            <AnimatedSection key={item.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-neon-blue/15 bg-card-gradient p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-blue/10 text-neon-cyan mb-3">
                  <Icon size={19} />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1.5">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </AnimatedSection>
          );
        })}
      </div>

      <AnimatedSection className="mb-8">
        <h2 className="text-xl font-bold text-white mb-2">Syarat & Ketentuan</h2>
        <p className="text-sm text-slate-400 mb-6">
          Dengan melakukan transaksi di VALLEYPEDIA, Anda dianggap telah membaca
          dan menyetujui ketentuan berikut:
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="rounded-2xl glass p-6 space-y-4">
          {TERMS.map((term, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neon-cyan/15 text-[10px] font-bold text-neon-cyan mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-slate-300 leading-relaxed">{term}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.15} className="mt-10 text-center">
        <p className="text-xs text-slate-500">
          Ada pertanyaan lain? Hubungi kami langsung lewat tombol{" "}
          <span className="text-neon-cyan font-medium">Kontak</span> di navigasi bawah.
        </p>
      </AnimatedSection>
    </main>
  );
}
