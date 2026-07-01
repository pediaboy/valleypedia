export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number | null; // null = harga menyesuaikan
  priceLabel?: string;
  description: string;
  features: string[];
  icon: string; // lucide icon name
}

export interface Invoice {
  id: string;
  productId: string;
  productName: string;
  amount: number | null;
  uniqueCode?: number;
  totalWithCode?: number | null;
  status: "pending" | "paid" | "expired";
  createdAt: string;
  customerNote?: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  createdAt: string;
}
