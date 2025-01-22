import { AccountType, ProductType } from "@/types/product";

const API_BASE = 'https://harn-backend.onrender.com/api';

export async function fetchProducts(): Promise<{ data: ProductType[] }> {
  const res = await fetch(`${API_BASE}/products`, {
    next: { tags: ['products'], revalidate: 3600 }
  });
  return res.json();
}

export async function fetchWeeklyAccounts(): Promise<{ data: AccountType[] }> {
  const res = await fetch(`${API_BASE}/accounts/week`, {
    next: { tags: ['accounts'], revalidate: 60 }
  });
  return res.json();
}