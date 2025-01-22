import { AccountType, ProductType } from "@/types/product";

export async function fetchProducts(): Promise<{ data: ProductType[] }> {
  const res = await fetch(process.env.API_PRODUCTS!, {
    next: { tags: ['products'], revalidate: 3600 }
  });
  return res.json();
}

export async function fetchWeeklyAccounts(): Promise<{ data: AccountType[] }> {
  const res = await fetch(process.env.API_ACCOUNTS!, {
    next: { tags: ['accounts'], revalidate: 60 }
  });
  return res.json();
}