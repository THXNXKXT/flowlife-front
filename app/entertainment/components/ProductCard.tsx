// components/ProductCard.tsx
"use client";

import { useState, useEffect } from "react";
import type { ProductType, AccountType } from "@/types/product";
import AccountCard from "./AccountCard";
import AccountDetails from "./AccountDetails";

export default function ProductList({
  products = [],
  accounts = [],
}: {
  products?: ProductType[];
  accounts?: AccountType[];
}) {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );
  const [selectedAccount, setSelectedAccount] = useState<AccountType | null>(
    null
  );
  const [filteredAccounts, setFilteredAccounts] = useState<AccountType[]>([]);

  useEffect(() => {
    if (selectedProduct) {
      const filtered = accounts
        .filter((acc) => acc.platform === selectedProduct.id)
        .sort(
          (a, b) =>
            new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
        );
      setFilteredAccounts(filtered);
    }
  }, [selectedProduct, accounts]);

  return (
    <div className="space-y-8">
      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className={`bg-white rounded-lg p-4 cursor-pointer transition-all ${
              selectedProduct?.id === product.id
                ? "ring-2 ring-blue-500"
                : "hover:ring-1 hover:ring-gray-200"
            }`}
            onClick={() => setSelectedProduct(product)}
          >
            <div className="flex items-center gap-4">
              <img
                src={product.logoImage}
                alt={product.name}
                className="w-12 h-12 object-contain"
              />
              <div>
                <h2 className="font-semibold text-gray-800">{product.name}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {accounts.filter((acc) => acc.platform === product.id).length}{" "}
                  บัญชีที่ใช้งาน
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {product.screen} จอพร้อมใช้งาน
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Product Accounts */}
      {selectedProduct && (
        <div className="animate-fadeIn">
          <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {selectedProduct.name} ({filteredAccounts.length} บัญชี)
              </h2>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕ ปิด
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAccounts.map((account) => (
                <AccountCard
                  key={account._id}
                  account={account}
                  onClick={() => setSelectedAccount(account)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Account Details Modal */}
      {selectedAccount && (
        <AccountDetails
          account={selectedAccount}
          onClose={() => setSelectedAccount(null)}
        />
      )}
    </div>
  );
}
