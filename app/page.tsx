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
    <div dir="rtl" className="min-h-screen flex flex-col bg-[#F8F9FA] font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />
      
      <main className="flex-grow w-full">
        
        {/* 1. قسم الواجهة الرئيسية (Hero Section) */}
        <section className="relative bg-gray-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-gray-900 opacity-90"></div>
          {/* تأثير دائري في الخلفية للمسة عصرية */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
          
          <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-32 flex flex-col items-center text-center">
            <span className="bg-blue-500/20 text-blue-300 font-bold px-4 py-1.5 rounded-full text-sm mb-6 border border-blue-500/30 backdrop-blur-sm">
              🚀 أحدث تشكيلة لعام 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              تسوق بذكاء، اختر <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">الأفضل</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 font-medium leading-relaxed">
              نوفر لك تشكيلة منتقاة بعناية من أفضل المنتجات بأسعار تنافسية. اطلب الآن وادفع براحة تامة عند استلام طلبك عند باب منزلك.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#products-section" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-xl transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                تصفح المنتجات الآن
              </a>
              <Link href="/about" className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-10 rounded-xl backdrop-blur-md transition-all border border-white/10">
                تعرف علينا
              </Link>
            </div>
          </div>
        </section>

        {/* 2. شريط الثقة والمميزات (Trust Badges) */}
        <section className="border-b border-gray-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { title: 'دفع عند الاستلام', desc: 'لا تدفع حتى تستلم منتجك', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
                { title: 'توصيل سريع', desc: 'توصيل لجميع الولايات الـ 58', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
                { title: 'ضمان الجودة', desc: 'منتجات أصلية ومضمونة 100%', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
                { title: 'دعم متواصل', desc: 'خدمة عملاء طوال أيام الأسبوع', icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z' }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{feature.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. قسم المنتجات */}
        <section id="products-section" className="max-w-6xl mx-auto px-4 py-20">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">أحدث المنتجات</h2>
              <div className="w-20 h-1.5 bg-blue-600 rounded-full"></div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <p className="text-xl text-gray-500 font-bold">المتجر قيد التجهيز، سيتم إضافة المنتجات قريباً!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {products.map(product => (
                <div key={product.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                  {/* صورة المنتج مع زر سري يظهر عند المرور */}
                  <div className="relative h-64 bg-gray-50 overflow-hidden">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-sm">
                      نفذت الكمية تقريباً
                    </div>
                    {/* طبقة تظهر عند تمرير الماوس */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link href={`/product/${product.id}`} className="bg-white text-gray-900 font-bold py-2.5 px-6 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        نظرة سريعة
                      </Link>
                    </div>
                  </div>
                  
                  {/* معلومات المنتج */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-1">{product.description}</p>
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400 line-through mb-0.5">{Number(product.price) + (Number(product.price) * 0.2)} دج</span>
                        <span className="text-xl font-black text-blue-600">{product.price} <span className="text-sm">دج</span></span>
                      </div>
                      <Link 
                        href={`/product/${product.id}`}
                        className="bg-gray-900 hover:bg-blue-600 text-white p-3 rounded-xl transition-colors shadow-sm"
                        aria-label="اطلب الآن"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 4. بانر تحفيزي قبل الفوتر */}
        <section className="bg-blue-600 text-white py-16 mt-10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-4">هل أنت جاهز لتجربة تسوق مميزة؟</h2>
            <p className="text-blue-100 mb-8 text-lg">خدمة التوصيل السريع متاحة لـ 58 ولاية. اطلب اليوم واستلم غداً.</p>
            <div className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-bold px-8 py-4 rounded-xl shadow-lg">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>اتصل بنا للطلب المباشر</span>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}