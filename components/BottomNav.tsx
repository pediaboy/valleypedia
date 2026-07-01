"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, MessageCircle } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "Produk", icon: LayoutGrid },
  { href: "https://wa.me/6283897340112", label: "Kontak", icon: MessageCircle, external: true },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-4 px-4">
      <div className="glass-nav flex items-center gap-1 rounded-2xl px-2 py-2 shadow-glow max-w-sm w-full justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = !item.external && pathname === item.href;
          const commonClasses = `flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${
            active
              ? "bg-neon-blue/20 text-neon-cyan shadow-glow-cyan"
              : "text-slate-400 hover:text-neon-cyan hover:bg-white/5"
          }`;
          if (item.external) {
            return (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={commonClasses}
              >
                <Icon size={20} strokeWidth={2} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </a>
            );
          }
          return (
            <Link key={item.href} href={item.href} className={commonClasses}>
              <Icon size={20} strokeWidth={2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
