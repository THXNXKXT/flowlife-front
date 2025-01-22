import { fetchProducts, fetchWeeklyAccounts } from '@/lib/api';
import ProductList from './components/ProductCard';
import { Suspense } from 'react';

export default async function EntertainmentPage() {
  try {
    const [productsRes, accountsRes] = await Promise.all([
      fetchProducts(),
      fetchWeeklyAccounts()
    ]);

    const products = productsRes.data;
    const accounts = accountsRes.data;

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-8">
        {/* Header Section */}
        <header className="max-w-6xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-4">
            บริการ Entertainment
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">
            ค้นพบประสบการณ์ความบันเทิงรูปแบบใหม่ที่ทันสมัย
          </p>
        </header>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<LoadingSkeleton />}>
            <ProductList 
              products={products} 
              accounts={accounts}
            />
          </Suspense>
        </div>
      </div>
    );
  } catch (error) {
    console.error('เกิดข้อผิดพลาด:', error);
    return <ErrorState />;
  }
}

// Reusable Loading Skeleton
const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="animate-pulse bg-white rounded-xl p-4 h-32"
      >
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    ))}
  </div>
);

// Reusable Error State
const ErrorState = () => (
  <div className="min-h-screen flex items-center justify-center bg-red-50">
    <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
      <div className="text-6xl mb-4">❌</div>
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        เกิดข้อผิดพลาดในการเชื่อมต่อ
      </h2>
      <p className="text-gray-600 mb-4">
        กรุณารอสักครู่และลองรีเฟรชหน้าอีกครั้ง
      </p>
      <button
        onClick={() => window.location.reload()}
        className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-lg transition-colors"
      >
        ลองอีกครั้ง
      </button>
    </div>
  </div>
);