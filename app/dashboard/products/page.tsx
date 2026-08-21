"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ManageProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // جلب المنتجات عند فتح الصفحة
  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("خطأ في جلب المنتجات");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // دالة الحذف
  const handleDelete = async (id: number, name: string) => {
    const isConfirmed = window.confirm(`هل أنت متأكد من حذف المنتج "${name}" نهائياً؟`);
    if (!isConfirmed) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        // تحديث القائمة بعد الحذف
        setProducts(products.filter(product => product.id !== id));
        alert('تم الحذف بنجاح');
      } else {
        alert('حدث خطأ أثناء الحذف');
      }
    } catch (error) {
      alert('تعذر الاتصال بالخادم');
    }
  };

  if (isLoading) return <div className="p-12 text-center text-xl font-bold">جاري تحميل المنتجات...</div>;

  return (
    <div dir="rtl" className="bg-white rounded-2xl shadow-md overflow-hidden mt-4">
      <div className="bg-gray-800 p-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">🛍️ إدارة المنتجات</h2>
        <span className="bg-green-600 text-white px-4 py-1 rounded-full font-bold">
          {products.length} منتجات
        </span>
      </div>

      {products.length === 0 ? (
        <div className="p-12 text-center text-gray-500 text-xl font-bold">
          لا توجد منتجات حتى الآن. اذهب إلى صفحة "إضافة منتج" للبدء!
        </div>
      ) : (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow bg-gray-50 flex flex-col">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-48 object-cover rounded-lg mb-4 border border-gray-100"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-green-700 font-black text-lg mb-3">{product.price} دج</p>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">{product.description}</p>
              
              <div className="flex gap-3 mt-auto pt-4 border-t border-gray-200">
                <Link 
                  href={`/dashboard/edit-product/${product.id}`}
                  className="flex-1 bg-blue-100 text-blue-700 text-center font-bold py-2 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  تعديل
                </Link>
                <button 
                  onClick={() => handleDelete(product.id, product.name)}
                  className="flex-1 bg-red-100 text-red-600 font-bold py-2 rounded-lg hover:bg-red-200 transition-colors"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}