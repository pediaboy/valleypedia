"use client";
import { Product, Invoice, Expense } from "./types";
import { DEFAULT_PRODUCTS } from "./products";

const PRODUCTS_KEY = "vp_products_v1";
const INVOICES_KEY = "vp_invoices_v1";
const EXPENSES_KEY = "vp_expenses_v1";
const AUTH_KEY = "vp_admin_auth";
const ADJUSTMENTS_KEY = "vp_finance_adjustments_v1";

export function formatRupiah(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return "Menyesuaikan";
  return "Rp " + amount.toLocaleString("id-ID");
}

// ── Products ─────────────────────────────────────────────────────────────

export function getProducts(): Product[] {
  if (typeof window === "undefined") return DEFAULT_PRODUCTS;
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    if (!raw) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(DEFAULT_PRODUCTS));
      return DEFAULT_PRODUCTS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_PRODUCTS;
  }
}

export function saveProducts(products: Product[]) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug);
}

export function updateProduct(id: string, updates: Partial<Product>) {
  const products = getProducts().map((p) =>
    p.id === id ? { ...p, ...updates } : p
  );
  saveProducts(products);
  return products;
}

export function deleteProduct(id: string) {
  const products = getProducts().filter((p) => p.id !== id);
  saveProducts(products);
  return products;
}

export function addProduct(product: Product) {
  const products = [...getProducts(), product];
  saveProducts(products);
  return products;
}

// ── Invoices ─────────────────────────────────────────────────────────────

export function generateInvoiceId(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `VP-${y}${m}${d}-${rand}`;
}

export function generateUniqueCode(): number {
  // 3-digit unique code (100-999) appended to nominal for auto payment matching
  return Math.floor(Math.random() * 900) + 100;
}

export function getInvoices(): Invoice[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(INVOICES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function createInvoice(invoice: Invoice) {
  const invoices = [invoice, ...getInvoices()];
  localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices));
  return invoice;
}

export function updateInvoiceStatus(id: string, status: Invoice["status"]) {
  const invoices = getInvoices().map((inv) =>
    inv.id === id ? { ...inv, status } : inv
  );
  localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices));
  return invoices;
}

export function updateInvoiceAmount(id: string, amount: number | null) {
  const invoices = getInvoices().map((inv) =>
    inv.id === id ? { ...inv, amount, totalWithCode: amount !== null ? amount + (inv.uniqueCode || 0) : null } : inv
  );
  localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices));
  return invoices;
}

export function deleteInvoice(id: string) {
  const invoices = getInvoices().filter((inv) => inv.id !== id);
  localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices));
  return invoices;
}

// ── Expenses (Pengeluaran) ───────────────────────────────────────────────

export function getExpenses(): Expense[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(EXPENSES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addExpense(expense: Expense) {
  const expenses = [expense, ...getExpenses()];
  localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
  return expenses;
}

export function updateExpense(id: string, updates: Partial<Expense>) {
  const expenses = getExpenses().map((e) => (e.id === id ? { ...e, ...updates } : e));
  localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
  return expenses;
}

export function deleteExpense(id: string) {
  const expenses = getExpenses().filter((e) => e.id !== id);
  localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
  return expenses;
}

// ── Finance Adjustments (manual +/- on top of auto-computed totals) ──────

interface FinanceAdjustments {
  income: number; // manual add/subtract applied to Pemasukan
  outcome: number; // manual add/subtract applied to Pengeluaran
}

export function getAdjustments(): FinanceAdjustments {
  if (typeof window === "undefined") return { income: 0, outcome: 0 };
  try {
    const raw = localStorage.getItem(ADJUSTMENTS_KEY);
    return raw ? JSON.parse(raw) : { income: 0, outcome: 0 };
  } catch {
    return { income: 0, outcome: 0 };
  }
}

export function setAdjustments(adjustments: FinanceAdjustments) {
  localStorage.setItem(ADJUSTMENTS_KEY, JSON.stringify(adjustments));
}

// Adjust Pemasukan by a delta (positive to add, negative to subtract)
export function adjustIncome(delta: number) {
  const adj = getAdjustments();
  adj.income += delta;
  setAdjustments(adj);
  return adj;
}

// Adjust Pengeluaran by a delta (positive to add, negative to subtract)
export function adjustOutcome(delta: number) {
  const adj = getAdjustments();
  adj.outcome += delta;
  setAdjustments(adj);
  return adj;
}

// Directly set Pemasukan to an exact figure (computed as a delta under the hood)
export function setIncomeTotal(target: number, autoComputedIncome: number) {
  const adj = getAdjustments();
  adj.income = target - autoComputedIncome;
  setAdjustments(adj);
  return adj;
}

// Directly set Pengeluaran to an exact figure (computed as a delta under the hood)
export function setOutcomeTotal(target: number, autoComputedOutcome: number) {
  const adj = getAdjustments();
  adj.outcome = target - autoComputedOutcome;
  setAdjustments(adj);
  return adj;
}

// ── Finance Summary ──────────────────────────────────────────────────────

export function getFinanceSummary() {
  const invoices = getInvoices();
  const expenses = getExpenses();
  const adjustments = getAdjustments();
  const autoIncome = invoices
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + (i.totalWithCode ?? i.amount ?? 0), 0);
  const pending = invoices
    .filter((i) => i.status === "pending")
    .reduce((sum, i) => sum + (i.totalWithCode ?? i.amount ?? 0), 0);
  const autoOutcome = expenses.reduce((sum, e) => sum + e.amount, 0);
  const income = autoIncome + adjustments.income;
  const outcome = autoOutcome + adjustments.outcome;
  return {
    income,
    autoIncome,
    pending,
    outcome,
    autoOutcome,
    net: income - outcome,
    totalInvoices: invoices.length,
    paidCount: invoices.filter((i) => i.status === "paid").length,
    pendingCount: invoices.filter((i) => i.status === "pending").length,
  };
}

// ── Auth ─────────────────────────────────────────────────────────────────

export function loginAdmin(username: string, password: string): boolean {
  if (username === "admin" && password === "admin203") {
    sessionStorage.setItem(AUTH_KEY, "1");
    return true;
  }
  return false;
}

export function isAdminAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_KEY) === "1";
}

export function logoutAdmin() {
  sessionStorage.removeItem(AUTH_KEY);
}
