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
      .then(data => { setProducts(data); setIsLoading(false); });
  }, []);

  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-[#f8fafc] font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />
      
      <main className="flex-grow w-full">
        
        {/* 1. قسم الواجهة (Hero Section) مع تأثيرات بصرية فخمة */}
        <section className="relative overflow-hidden bg-white border-b border-gray-100">
          {/* خلفية شبكية أنيقة (Grid Pattern) */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          {/* دائرة زرقاء متوهجة للزينة */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32 flex flex-col lg:flex-row items-center justify-between gap-12">
            
            <div className="lg:w-1/2 text-center lg:text-right z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold text-sm mb-8 animate-bounce">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                </span>
                موسم التخفيضات الكبرى قد بدأ!
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
                اكتشف الجودة، <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-600 to-cyan-400">
                  بأسعار لا تقاوم.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-500 mb-10 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                تشكيلة حصرية من أفضل المنتجات المختارة بعناية. اطلب الآن براحة تامة، والدفع لن يكون إلا بعد استلامك للمنتج وتأكدك منه.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#products" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_40px_-10px_rgba(37,99,235,0.6)] flex justify-center items-center gap-2">
                  <span>تسوق الآن</span>
                  <svg className="w-5 h-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </a>
              </div>
            </div>

            <div className="lg:w-1/2 relative z-10 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-300 rounded-3xl transform rotate-3 scale-105 opacity-20 group-hover:rotate-6 transition-transform duration-500"></div>
              <img 
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop" 
                alt="Shopping" 
                className="relative rounded-3xl shadow-2xl object-cover h-[400px] w-full transform group-hover:-translate-y-2 transition-transform duration-500 border border-white/50"
              />
            </div>
          </div>
        </section>

        {/* 2. شريط مميزات المتجر (Floating Trust Badges) */}
        <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 mb-20">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-50 p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-gray-100">
              {[
                { title: 'دفع عند الاستلام', desc: 'أمان تام وموثوقية', icon: '💵' },
                { title: 'توصيل لـ 58 ولاية', desc: 'سريع إلى باب منزلك', icon: '🚚' },
                { title: 'ضمان الجودة', desc: 'استبدال مجاني للمنتج', icon: '🛡️' },
                { title: 'خدمة زبائن 24/7', desc: 'نحن هنا لمساعدتك دائماً', icon: '📞' }
              ].map((f, i) => (
                <div key={i} className="flex flex-col items-center text-center pt-6 md:pt-0 first:pt-0 group cursor-default">
                  <div className="text-4xl mb-3 transform group-hover:scale-125 transition-transform duration-300">{f.icon}</div>
                  <h4 className="font-bold text-gray-900 text-lg">{f.title}</h4>
                  <p className="text-sm text-gray-500 mt-1 font-medium">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. قسم المنتجات الاحترافي */}
        <section id="products" className="max-w-7xl mx-auto px-4 py-10 mb-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-2">المنتجات الأكثر طلباً</h2>
              <p className="text-gray-500 font-medium">تصفح أحدث المنتجات التي وفرناها لك هذا الأسبوع.</p>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64 space-x-2 space-x-reverse">
              <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map(product => (
                <div key={product.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full transform hover:-translate-y-2">
                  
                  {/* حاوية الصورة مع الزوم الداخلي */}
                  <div className="relative h-72 overflow-hidden bg-gray-50 cursor-pointer" onClick={() => window.location.href = `/product/${product.id}`}>
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                    />
                    
                    {/* الشارة التسويقية الديناميكية (التي برمجناها سابقاً) */}
                    {product.badge && (
                      <div className={`absolute top-4 right-4 text-xs font-black px-4 py-2 rounded-xl shadow-lg backdrop-blur-md ${
                        product.badge.includes('جديد') ? 'bg-green-500/90 text-white border border-green-400' :
                        product.badge.includes('مبيعاً') ? 'bg-yellow-400/90 text-gray-900 border border-yellow-300' :
                        product.badge.includes('تخفيض') ? 'bg-blue-600/90 text-white border border-blue-500' :
                        'bg-red-500/90 text-white border border-red-400'
                      }`}>
                        {product.badge}
                      </div>
                    )}

                    {/* زر المشاهدة السريعة يظهر عند التمرير */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <span className="bg-white/20 backdrop-blur-md text-white font-bold py-2.5 px-8 rounded-full border border-white/30 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        عرض التفاصيل
                      </span>
                    </div>
                  </div>
                  
                  {/* معلومات المنتج */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-6 line-clamp-2 leading-relaxed">{product.description}</p>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400 line-through mb-1">{Number(product.price) + (Number(product.price) * 0.2)} دج</span>
                        <span className="text-2xl font-black text-gray-900">{product.price} <span className="text-base font-bold text-blue-600">دج</span></span>
                      </div>
                      <Link 
                        href={`/product/${product.id}`}
                        className="w-12 h-12 bg-gray-50 group-hover:bg-blue-600 text-gray-900 group-hover:text-white rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-blue-300/50"
                        aria-label="اطلب الآن"
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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

      </main>

      <Footer />
    </div>
  );
}