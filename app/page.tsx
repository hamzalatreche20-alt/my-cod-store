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
    <div dir="rtl" className="min-h-screen flex flex-col bg-gray-50 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      
      {/* شريط الإعلانات العلوي الجذاب (متحرك) */}
      <div className="bg-gradient-to-r from-orange-600 to-red-500 text-white text-xs md:text-sm font-bold py-2 overflow-hidden relative z-50">
        <div className="whitespace-nowrap animate-[marquee_15s_linear_infinite] flex items-center justify-center gap-8">
          <span>🔥 عرض خاص: توصيل سريع لـ 58 ولاية والدفع عند الاستلام 🔥</span>
          <span className="hidden md:inline">|</span>
          <span className="hidden md:inline">ضمان استبدال المنتج مجاناً في حالة وجود أي خلل</span>
        </div>
      </div>

      <Navbar />
      
      <main className="flex-grow w-full">
        
        {/* 1. قسم الواجهة الفاخر (مخصص لشاشات OLED في الهواتف) */}
        <section className="relative bg-[#0B1121] overflow-hidden">
          {/* التوهج الخلفي الساحر */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-600/30 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-purple-600/20 rounded-full blur-[60px] pointer-events-none"></div>

          <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-28 flex flex-col lg:flex-row items-center justify-between gap-10">
            
            <div className="w-full lg:w-1/2 text-center lg:text-right z-10 flex flex-col items-center lg:items-start">
              <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 border border-white/20 text-blue-300 text-xs md:text-sm font-bold mb-6 backdrop-blur-md">
                ✨ الخيار الأول للتسوق في الجزائر
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight">
                جودة تستحقها، <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-400 to-cyan-300">
                  بأسعار لا تنافس.
                </span>
              </h1>
              <p className="text-gray-400 text-sm md:text-lg mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed font-medium">
                تصفح تشكيلتنا الجديدة. أطلب الآن، وسيصلك المنتج إلى باب منزلك. لا تدفع أي سنتيم حتى تستلم وتتأكد بنفسك!
              </p>
              
              {/* زر الشراء مع تأثير اللمعان (Shine) */}
              <a href="#products" className="group relative overflow-hidden bg-blue-600 hover:bg-blue-500 text-white font-black text-lg py-4 px-12 rounded-2xl transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center gap-3 w-full sm:w-auto justify-center">
                <span className="relative z-10">اكتشف العروض</span>
                <svg className="w-5 h-5 relative z-10 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                {/* تأثير اللمعان المتحرك */}
                <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 animate-[shine_3s_infinite]"></div>
              </a>
            </div>

            {/* صورة الهيرو مع حركة العوم (Floating) */}
            <div className="w-full lg:w-1/2 relative z-10 flex justify-center mt-8 lg:mt-0">
              <div className="relative w-full max-w-sm md:max-w-md animate-[float_6s_ease-in-out_infinite]">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-3xl transform rotate-6 opacity-30 blur-lg"></div>
                <img 
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop" 
                  alt="Premium Products" 
                  className="relative rounded-3xl shadow-2xl object-cover h-[300px] md:h-[450px] w-full border border-gray-700/50"
                />
                {/* بطاقة عائمة صغيرة لزيادة الثقة */}
                <div className="absolute -bottom-4 -right-4 md:-right-8 bg-white text-gray-900 rounded-2xl p-3 md:p-4 shadow-xl border border-gray-100 flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="bg-green-100 p-2 rounded-full text-green-600"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div>
                  <div className="font-bold text-xs md:text-sm">توصيل متوفر<br/><span className="text-blue-600">لـ 58 ولاية</span></div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 2. أيقونات الثقة المصغرة (ممتازة للهواتف) */}
        <section className="bg-white border-b border-gray-100 shadow-sm relative z-20">
          <div className="max-w-7xl mx-auto px-2 py-6">
            <div className="flex justify-between items-center overflow-x-auto custom-scrollbar pb-2 gap-4 md:gap-8 px-4">
              {[
                { title: 'دفع عند الاستلام', icon: '💵' },
                { title: 'توصيل سريع', icon: '🚚' },
                { title: 'جودة مضمونة', icon: '✨' },
                { title: 'دعم فني', icon: '🎧' }
              ].map((f, i) => (
                <div key={i} className="flex flex-col items-center justify-center min-w-[80px] md:min-w-[120px]">
                  <span className="text-2xl md:text-3xl mb-1">{f.icon}</span>
                  <span className="text-[10px] md:text-xs font-bold text-gray-600 text-center">{f.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. شبكة المنتجات (عمودين في الهواتف / 4 في الكمبيوتر) */}
        <section id="products" className="max-w-7xl mx-auto px-3 md:px-4 py-12 md:py-20">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">🔥 الأكثر طلباً هذا الأسبوع</h2>
            <div className="w-16 h-1.5 bg-blue-600 rounded-full mx-auto"></div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {products.map(product => (
                <div key={product.id} className="bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group">
                  
                  {/* حاوية الصورة */}
                  <Link href={`/product/${product.id}`} className="relative h-40 md:h-64 bg-gray-50 overflow-hidden block">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                    />
                    
                    {/* الشارة التسويقية مصغرة للهواتف */}
                    {product.badge && (
                      <div className={`absolute top-2 right-2 text-[10px] md:text-xs font-black px-2 md:px-3 py-1 rounded-lg shadow-sm ${
                        product.badge.includes('جديد') ? 'bg-green-500 text-white' :
                        product.badge.includes('مبيعاً') ? 'bg-yellow-400 text-gray-900' :
                        product.badge.includes('تخفيض') ? 'bg-blue-600 text-white' :
                        'bg-red-500 text-white'
                      }`}>
                        {product.badge}
                      </div>
                    )}
                  </Link>
                  
                  {/* معلومات المنتج */}
                  <div className="p-3 md:p-5 flex flex-col flex-grow">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="text-sm md:text-lg font-bold text-gray-900 line-clamp-1 mb-1 group-hover:text-blue-600">{product.name}</h3>
                    </Link>
                    
                    <div className="mt-auto pt-3 md:pt-4 flex items-center justify-between border-t border-gray-50">
                      <div className="flex flex-col">
                        <span className="text-[10px] md:text-xs text-gray-400 line-through">{Number(product.price) + (Number(product.price) * 0.2)} دج</span>
                        <span className="text-base md:text-xl font-black text-blue-600 leading-none">{product.price} <span className="text-[10px] md:text-sm text-gray-500 font-bold">دج</span></span>
                      </div>
                      
                      {/* زر الشراء ينبض لجذب الانتباه في الهواتف */}
                      <Link 
                        href={`/product/${product.id}`}
                        className="w-8 h-8 md:w-10 md:h-10 bg-gray-900 text-white rounded-lg md:rounded-xl flex items-center justify-center shadow-md animate-pulse"
                      >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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

      {/* أكواد الحركات المخصصة (Tailwind Custom Animations) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes shine {
          100% { left: 200%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e5e7eb;
          border-radius: 10px;
        }
      `}} />
    </div>
  );
}