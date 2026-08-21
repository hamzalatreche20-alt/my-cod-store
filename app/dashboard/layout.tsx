import Link from 'next/link';
import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div dir="rtl" className="min-h-screen bg-gray-100 flex flex-col md:flex-row font-sans">
      
      {/* القائمة الجانبية */}
      <aside className="w-full md:w-64 bg-gray-900 text-white p-6 shadow-xl flex flex-col h-auto md:min-h-screen">
        <h2 className="text-2xl font-bold mb-8 text-center text-blue-400">لوحة التحكم</h2>
        
        <nav className="flex flex-col gap-4 flex-1">
          <Link href="/dashboard" className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-3">
            <span>📦</span> الطلبات الجديدة
          </Link>
          
          <Link href="/dashboard/products" className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-3">
            <span>⚙️</span> إدارة المنتجات
          </Link>
          
          <Link href="/dashboard/add-product" className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-3">
            <span>➕</span> إضافة منتج جديد
          </Link>
        </nav>

        {/* زر للعودة إلى المتجر لرويته كزبون */}
        <div className="mt-8">
          <Link href="/" target="_blank" className="block w-full p-3 bg-blue-600 hover:bg-blue-700 text-center rounded-lg transition-colors font-bold shadow-lg">
            🌐 مشاهدة المتجر
          </Link>
        </div>
      </aside>

      {/* محتوى الصفحات المتغير (الطلبات، التعديل، الإضافة) */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {children}
      </main>
      
    </div>
  );
}