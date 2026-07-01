"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut, TrendingUp, TrendingDown, Receipt, Package,
  Plus, Trash2, Pencil, Check, X, Wallet, Wallet2,
} from "lucide-react";
import {
  isAdminAuthed, logoutAdmin, getProducts, updateProduct, deleteProduct,
  addProduct, getInvoices, updateInvoiceStatus, updateInvoiceAmount, deleteInvoice,
  getExpenses, addExpense, deleteExpense,
  getFinanceSummary, formatRupiah, setIncomeTotal, setOutcomeTotal,
} from "@/lib/store";
import { Product, Invoice, Expense } from "@/lib/types";

type Tab = "overview" | "invoices" | "expenses" | "products";

export default function AdminDashboard() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<Tab>("overview");
  const [products, setProducts] = useState<Product[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [summary, setSummary] = useState(getFinanceSummary());

  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", category: "", price: "", description: "" });

  const [editingInvoiceId, setEditingInvoiceId] = useState<string | null>(null);
  const [editInvoiceAmount, setEditInvoiceAmount] = useState("");

  const [newExpense, setNewExpense] = useState({ description: "", amount: "" });

  const [editingIncome, setEditingIncome] = useState(false);
  const [editIncomeValue, setEditIncomeValue] = useState("");
  const [editingOutcome, setEditingOutcome] = useState(false);
  const [editOutcomeValue, setEditOutcomeValue] = useState("");

  useEffect(() => {
    if (!isAdminAuthed()) {
      router.push("/admin");
      return;
    }
    refresh();
    setReady(true);
  }, [router]);

  function refresh() {
    setProducts(getProducts());
    setInvoices(getInvoices());
    setExpenses(getExpenses());
    setSummary(getFinanceSummary());
  }

  function handleLogout() {
    logoutAdmin();
    router.push("/admin");
  }

  // Products
  function startEditProduct(p: Product) {
    setEditingProductId(p.id);
    setEditPrice(p.price?.toString() || "");
  }
  function saveEditProduct(id: string) {
    updateProduct(id, { price: editPrice ? parseInt(editPrice) : null });
    setEditingProductId(null);
    refresh();
  }
  function handleDeleteProduct(id: string) {
    if (confirm("Hapus produk ini?")) {
      deleteProduct(id);
      refresh();
    }
  }
  function handleAddProduct() {
    if (!newProduct.name || !newProduct.category) return;
    const id = newProduct.name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
    addProduct({
      id,
      slug: id,
      name: newProduct.name,
      category: newProduct.category,
      price: newProduct.price ? parseInt(newProduct.price) : null,
      description: newProduct.description || "Deskripsi produk premium VALLEYPEDIA.",
      features: ["Fitur premium standar VALLEYPEDIA"],
      icon: "Package",
    });
    setNewProduct({ name: "", category: "", price: "", description: "" });
    setShowAddForm(false);
    refresh();
  }

  // Invoices
  function handleStatusChange(id: string, status: Invoice["status"]) {
    updateInvoiceStatus(id, status);
    refresh();
  }
  function startEditInvoice(inv: Invoice) {
    setEditingInvoiceId(inv.id);
    setEditInvoiceAmount((inv.amount ?? "").toString());
  }
  function saveEditInvoice(id: string) {
    updateInvoiceAmount(id, editInvoiceAmount ? parseInt(editInvoiceAmount) : null);
    setEditingInvoiceId(null);
    refresh();
  }
  function handleDeleteInvoice(id: string) {
    if (confirm("Hapus invoice ini?")) {
      deleteInvoice(id);
      refresh();
    }
  }

  // Expenses
  function handleAddExpense() {
    if (!newExpense.description || !newExpense.amount) return;
    addExpense({
      id: "exp-" + Date.now(),
      description: newExpense.description,
      amount: parseInt(newExpense.amount),
      createdAt: new Date().toISOString(),
    });
    setNewExpense({ description: "", amount: "" });
    refresh();
  }
  function handleDeleteExpense(id: string) {
    if (confirm("Hapus pengeluaran ini?")) {
      deleteExpense(id);
      refresh();
    }
  }

  // Manual finance adjustments
  function startEditIncome() {
    setEditIncomeValue(summary.income.toString());
    setEditingIncome(true);
  }
  function saveEditIncome() {
    const target = parseInt(editIncomeValue) || 0;
    setIncomeTotal(target, summary.autoIncome);
    setEditingIncome(false);
    refresh();
  }
  function startEditOutcome() {
    setEditOutcomeValue(summary.outcome.toString());
    setEditingOutcome(true);
  }
  function saveEditOutcome() {
    const target = parseInt(editOutcomeValue) || 0;
    setOutcomeTotal(target, summary.autoOutcome);
    setEditingOutcome(false);
    refresh();
  }

  if (!ready) return <main className="px-6 pt-20 text-center text-slate-500">Memuat...</main>;

  return (
    <main className="px-6 pt-8 pb-16 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-xs text-slate-500">VALLEYPEDIA Management</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-xs text-slate-400 hover:text-red-400 hover:border-red-400/30 transition-colors"
        >
          <LogOut size={14} /> Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {[
          { id: "overview", label: "Overview", icon: Wallet },
          { id: "invoices", label: "Invoice", icon: Receipt },
          { id: "expenses", label: "Pengeluaran", icon: Wallet2 },
          { id: "products", label: "Produk", icon: Package },
        ].map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id as Tab)}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                tab === t.id
                  ? "bg-gradient-to-r from-neon-blue to-neon-cyan text-space-950"
                  : "glass text-slate-400"
              }`}
            >
              <Icon size={14} /> {t.label}
            </button>
          );
        })}
      </div>

      {/* Overview */}
      {tab === "overview" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-green-400">
                  <TrendingUp size={16} />
                  <span className="text-xs font-medium">Pemasukan</span>
                </div>
                {!editingIncome && (
                  <button onClick={startEditIncome} className="text-slate-500 hover:text-green-400">
                    <Pencil size={12} />
                  </button>
                )}
              </div>
              {editingIncome ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    value={editIncomeValue}
                    onChange={(e) => setEditIncomeValue(e.target.value)}
                    autoFocus
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-2 py-1.5 text-sm text-white outline-none"
                  />
                  <button onClick={saveEditIncome} className="text-green-400 shrink-0"><Check size={16} /></button>
                  <button onClick={() => setEditingIncome(false)} className="text-slate-500 shrink-0"><X size={16} /></button>
                </div>
              ) : (
                <p className="text-2xl font-bold text-white">{formatRupiah(summary.income)}</p>
              )}
              <p className="text-[11px] text-slate-500 mt-1">{summary.paidCount} invoice lunas</p>
            </div>
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-red-400">
                  <TrendingDown size={16} />
                  <span className="text-xs font-medium">Pengeluaran</span>
                </div>
                {!editingOutcome && (
                  <button onClick={startEditOutcome} className="text-slate-500 hover:text-red-400">
                    <Pencil size={12} />
                  </button>
                )}
              </div>
              {editingOutcome ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    value={editOutcomeValue}
                    onChange={(e) => setEditOutcomeValue(e.target.value)}
                    autoFocus
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-2 py-1.5 text-sm text-white outline-none"
                  />
                  <button onClick={saveEditOutcome} className="text-green-400 shrink-0"><Check size={16} /></button>
                  <button onClick={() => setEditingOutcome(false)} className="text-slate-500 shrink-0"><X size={16} /></button>
                </div>
              ) : (
                <p className="text-2xl font-bold text-white">{formatRupiah(summary.outcome)}</p>
              )}
              <p className="text-[11px] text-slate-500 mt-1">{expenses.length} catatan</p>
            </div>
          </div>
          <p className="text-[11px] text-slate-600 -mt-2">
            Tips: klik ikon pensil buat set nominal manual (nambah/ngurangin total).
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
              <div className="flex items-center gap-2 mb-2 text-amber-400">
                <Receipt size={16} />
                <span className="text-xs font-medium">Pending</span>
              </div>
              <p className="text-2xl font-bold text-white">{formatRupiah(summary.pending)}</p>
              <p className="text-[11px] text-slate-500 mt-1">{summary.pendingCount} menunggu bayar</p>
            </div>
            <div className="rounded-2xl glass p-5">
              <div className="flex items-center gap-2 mb-2 text-neon-cyan">
                <Wallet size={16} />
                <span className="text-xs font-medium">Saldo Bersih</span>
              </div>
              <p className="text-2xl font-bold text-white">{formatRupiah(summary.net)}</p>
              <p className="text-[11px] text-slate-500 mt-1">Pemasukan - Pengeluaran</p>
            </div>
          </div>
        </div>
      )}

      {/* Invoices */}
      {tab === "invoices" && (
        <div className="rounded-2xl glass overflow-hidden">
          {invoices.length === 0 ? (
            <p className="p-8 text-center text-sm text-slate-500">Belum ada invoice.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[11px] text-slate-500 border-b border-white/10">
                    <th className="p-3">Invoice ID</th>
                    <th className="p-3">Produk</th>
                    <th className="p-3">Jumlah</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="border-b border-white/5">
                      <td className="p-3 font-mono text-xs text-slate-400">{inv.id}</td>
                      <td className="p-3 text-white">{inv.productName}</td>
                      <td className="p-3">
                        {editingInvoiceId === inv.id ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              value={editInvoiceAmount}
                              onChange={(e) => setEditInvoiceAmount(e.target.value)}
                              className="w-24 rounded-lg bg-white/5 border border-white/10 px-2 py-1 text-xs text-white outline-none"
                            />
                            <button onClick={() => saveEditInvoice(inv.id)} className="text-green-400"><Check size={14} /></button>
                            <button onClick={() => setEditingInvoiceId(null)} className="text-slate-500"><X size={14} /></button>
                          </div>
                        ) : (
                          <button onClick={() => startEditInvoice(inv)} className="flex items-center gap-1.5 hover:text-neon-cyan">
                            {formatRupiah(inv.totalWithCode ?? inv.amount)} <Pencil size={11} className="text-slate-500" />
                          </button>
                        )}
                      </td>
                      <td className="p-3">
                        <select
                          value={inv.status}
                          onChange={(e) => handleStatusChange(inv.id, e.target.value as Invoice["status"])}
                          className="rounded-lg bg-white/5 border border-white/10 px-2 py-1 text-xs text-white outline-none"
                        >
                          <option value="pending">Pending</option>
                          <option value="paid">Paid</option>
                          <option value="expired">Expired</option>
                        </select>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => handleDeleteInvoice(inv.id)}
                          className="text-slate-500 hover:text-red-400"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Expenses */}
      {tab === "expenses" && (
        <div className="space-y-3">
          <div className="rounded-2xl glass p-5 space-y-3">
            <p className="text-sm font-semibold text-white mb-1">Tambah Pengeluaran</p>
            <input
              placeholder="Deskripsi (misal: biaya server)"
              value={newExpense.description}
              onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white outline-none"
            />
            <input
              placeholder="Jumlah (angka saja)"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white outline-none"
            />
            <button
              onClick={handleAddExpense}
              className="rounded-lg bg-red-500/20 text-red-400 px-4 py-2 text-sm font-medium"
            >
              Simpan Pengeluaran
            </button>
          </div>

          {expenses.length === 0 ? (
            <p className="text-center text-sm text-slate-500 py-6">Belum ada catatan pengeluaran.</p>
          ) : (
            expenses.map((exp) => (
              <div key={exp.id} className="rounded-2xl glass p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">{exp.description}</p>
                  <p className="text-[11px] text-slate-500">
                    {new Date(exp.createdAt).toLocaleDateString("id-ID")}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-red-400">- {formatRupiah(exp.amount)}</span>
                  <button onClick={() => handleDeleteExpense(exp.id)} className="text-slate-500 hover:text-red-400">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Products */}
      {tab === "products" && (
        <div className="space-y-3">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-neon-blue to-neon-cyan px-4 py-2 text-sm font-medium text-space-950 mb-2"
          >
            <Plus size={15} /> Tambah Produk
          </button>

          {showAddForm && (
            <div className="rounded-2xl glass p-5 space-y-3 mb-4">
              <input
                placeholder="Nama Produk"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white outline-none"
              />
              <input
                placeholder="Kategori"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white outline-none"
              />
              <input
                placeholder="Harga (angka saja)"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white outline-none"
              />
              <textarea
                placeholder="Deskripsi"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white outline-none"
                rows={2}
              />
              <button
                onClick={handleAddProduct}
                className="rounded-lg bg-green-500/20 text-green-400 px-4 py-2 text-sm font-medium"
              >
                Simpan Produk
              </button>
            </div>
          )}

          {products.map((p) => (
            <div key={p.id} className="rounded-2xl glass p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">{p.name}</p>
                <p className="text-xs text-slate-500">{p.category}</p>
              </div>
              <div className="flex items-center gap-3">
                {editingProductId === p.id ? (
                  <>
                    <input
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      className="w-28 rounded-lg bg-white/5 border border-white/10 px-2 py-1.5 text-sm text-white outline-none"
                    />
                    <button onClick={() => saveEditProduct(p.id)} className="text-green-400"><Check size={16} /></button>
                    <button onClick={() => setEditingProductId(null)} className="text-slate-500"><X size={16} /></button>
                  </>
                ) : (
                  <>
                    <span className="text-sm font-medium text-neon-cyan">
                      {p.priceLabel || formatRupiah(p.price)}
                    </span>
                    <button onClick={() => startEditProduct(p)} className="text-slate-500 hover:text-white">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => handleDeleteProduct(p.id)} className="text-slate-500 hover:text-red-400">
                      <Trash2 size={14} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
