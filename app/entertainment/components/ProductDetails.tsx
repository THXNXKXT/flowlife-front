'use client';

import type { ProductType } from '@/types/product';

export default function ProductDetails({
  product,
  onClose,
}: {
  product: ProductType;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-3xl w-full mx-4 overflow-hidden shadow-xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.type.map((plan) => (
              <li key={plan._id} className="p-4 border rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{plan.dayType} วัน</h3>
                  <span className="text-lg font-semibold text-blue-600">
                    ฿{plan.price}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  ค่าบริการตัวแทน: ฿{plan.cost}
                </p>
              </li>
            ))}
          </ul>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">ข้อกำหนดและเงื่อนไข</h3>
            <div className="prose max-w-none text-gray-600 text-sm">
              {product.remark.split('\n').map((line, i) => (
                <p key={i} className="mb-2">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
