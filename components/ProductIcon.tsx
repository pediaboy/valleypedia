import {
  Wifi, Gauge, ShieldCheck, Lock, Cpu, Bot, Users, Package,
} from "lucide-react";

const ICON_MAP: Record<string, any> = {
  Wifi, Gauge, ShieldCheck, Lock, Cpu, Bot, Users, Package,
};

export default function ProductIcon({ name, size = 28, className = "" }: { name: string; size?: number; className?: string }) {
  const Icon = ICON_MAP[name] || Package;
  return <Icon size={size} className={className} strokeWidth={1.8} />;
}
