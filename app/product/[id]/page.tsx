"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        const foundProduct = data.find((p: any) => p.id === Number(id));
        if (foundProduct) {
          setProduct(foundProduct);
          setSelectedImage(foundProduct.imageUrl); // جعل الصورة الرئيسية هي المختارة افتراضياً
        }
      } catch (error) {
        console.error("خطأ");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (isLoading) return <div dir="rtl" className="min-h-screen flex items-center justify-center font-bold text-xl">جاري التحميل...</div>;
  if (!product) return <div dir="rtl" className="min-h-screen flex items-center justify-center font-bold text-xl text-red-500">هذا المنتج غير متوفر!</div>;

  // دمج الصورة الرئيسية مع باقي صور المعرض ليتنقل بينها الزبون
  const allImages = [product.imageUrl, ...(product.images || [])];

  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Navbar />
      
      <main className="flex-grow max-w-6xl mx-auto px-4 py-12 w-full">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* قسم معرض الصور (اليمين) */}
            <div className="p-6 md:p-8 md:border-l border-gray-100 flex flex-col">
              {/* شاشة العرض الكبيرة */}
              <div className="mb-4 bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center h-80 md:h-[400px] border border-gray-100">
                <img 
                  src={selectedImage} 
                  alt={product.name} 
                  className="max-w-full max-h-full object-contain drop-shadow-md"
                />
              </div>
              
              {/* شريط الصور المصغرة */}
              {allImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto py-2 px-1 pb-4 custom-scrollbar">
                  {allImages.map((img, index) => (
                    <button 
                      key={index} 
                      onClick={() => setSelectedImage(img)}
                      className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all duration-200 ${selectedImage === img ? 'border-blue-600 shadow-md scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                      <img src={img} alt={`Thumbnail ${index}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* قسم المواصفات والشراء (اليسار) */}
            <div className="p-6 md:p-10 flex flex-col bg-gray-50/50">
              <div className="bg-blue-100 text-blue-800 text-xs font-bold px-4 py-2 rounded-full w-fit mb-5">
                متوفر في المخزون
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{product.name}</h1>
              
              <div className="text-4xl font-black text-blue-600 mb-8 py-6 border-y border-gray-200">
                {product.price} <span className="text-2xl text-gray-500 font-bold">دج</span>
              </div>
              
              <div className="mb-10 flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>📋</span> مواصفات المنتج:
                </h3>
                <p className="text-gray-600 leading-loose whitespace-pre-wrap font-medium">
                  {product.description}
                </p>
              </div>
              
              <Link 
                href={`/checkout/${product.id}`}
                className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white font-black text-2xl py-5 rounded-2xl shadow-xl shadow-blue-200 transition-all hover:scale-[1.02]"
              >
                🛒 اطلب الآن (الدفع عند الاستلام)
              </Link>
              
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-bold text-gray-500">
                <span className="flex items-center gap-2">🚚 توصيل لكل الولايات</span>
                <span className="flex items-center gap-2">🛡️ ضمان الجودة</span>
                <span className="flex items-center gap-2">🤝 دفع آمن</span>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}