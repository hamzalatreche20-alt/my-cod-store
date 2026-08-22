"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Navbar />
      
      <main className="flex-grow max-w-6xl mx-auto px-4 py-12 w-full">
        {/* قسم الترحيب */}
        <div className="text-center mb-16 bg-blue-600 text-white p-12 rounded-3xl shadow-lg">
          <h1 className="text-4xl md:text-5xl font-black mb-4">اكتشف أحدث العروض</h1>
          <p className="text-lg md:text-xl font-medium opacity-90">تسوق الآن وادفع عند الاستلام بكل أمان!</p>
        </div>

        {/* شبكة المنتجات */}
        {isLoading ? (
          <div className="text-center text-xl font-bold text-gray-500 py-20">⏳ جاري تحميل المنتجات...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <div key={product.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col transform hover:-translate-y-1">
                <Link href={`/product/${product.id}`} className="block relative">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover" />
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">جديد</div>
                </Link>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                  
                  <div className="mt-auto flex items-center justify-between border-t pt-4">
                    <span className="text-2xl font-black text-blue-600">{product.price} دج</span>
                    <Link 
                      href={`/product/${product.id}`}
                      className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-5 rounded-xl transition-colors text-sm"
                    >
                      التفاصيل
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}