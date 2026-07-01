"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, ShieldAlert } from "lucide-react";
import { loginAdmin, isAdminAuthed } from "@/lib/store";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAdminAuthed()) router.push("/admin-hidden-portal/dashboard");
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(username, password)) {
      router.push("/admin-hidden-portal/dashboard");
    } else {
      setError("Username atau password salah.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm rounded-3xl border border-neon-blue/15 bg-card-gradient p-8 shadow-glow"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neon-blue/10 text-neon-cyan mx-auto mb-5">
          <ShieldAlert size={28} />
        </div>
        <h1 className="text-center text-xl font-bold text-white mb-1">Admin Portal</h1>
        <p className="text-center text-xs text-slate-500 mb-6">VALLEYPEDIA Management System</p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 px-3 py-2 text-xs text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl bg-white/5 border border-white/10 pl-10 pr-4 py-3 text-sm text-white outline-none focus:border-neon-cyan/50"
              required
            />
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl bg-white/5 border border-white/10 pl-10 pr-4 py-3 text-sm text-white outline-none focus:border-neon-cyan/50"
              required
            />
          </div>
          <button
            type="submit"
            className="btn-glow w-full rounded-xl bg-gradient-to-r from-neon-blue to-neon-cyan px-6 py-3 text-sm font-semibold text-space-950"
          >
            Masuk
          </button>
        </form>
      </motion.div>
    </main>
  );
}
