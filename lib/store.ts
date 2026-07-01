"use client";
import { Product, Invoice } from "./types";
import { DEFAULT_PRODUCTS } from "./products";

const PRODUCTS_KEY = "vp_products_v1";
const INVOICES_KEY = "vp_invoices_v1";
const AUTH_KEY = "vp_admin_auth";

export function formatRupiah(amount: number | null): string {
  if (amount === null) return "Menyesuaikan";
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

export function deleteInvoice(id: string) {
  const invoices = getInvoices().filter((inv) => inv.id !== id);
  localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices));
  return invoices;
}

export function getFinanceSummary() {
  const invoices = getInvoices();
  const income = invoices
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + (i.amount || 0), 0);
  const pending = invoices
    .filter((i) => i.status === "pending")
    .reduce((sum, i) => sum + (i.amount || 0), 0);
  return {
    income,
    pending,
    outcome: 0,
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
