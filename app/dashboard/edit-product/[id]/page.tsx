"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '', // الصورة الرئيسية
    images: [] as string[] // معرض الصور
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // جلب مفتاح ImgBB من البيئة
  const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  // 1. جلب بيانات المنتج الحالية
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        const foundProduct = data.find((p: any) => p.id === Number(id));
        
        if (foundProduct) {
          setFormData({
            name: foundProduct.name,
            description: foundProduct.description,
            price: foundProduct.price.toString(),
            imageUrl: foundProduct.imageUrl || '',
            images: foundProduct.images || [],
          });
        } else {
          alert('المنتج غير موجود');
          router.push('/dashboard/products');
        }
      } catch (error) {
        console.error("خطأ في جلب المنتج");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id, router]);

  // 2. دالة الرفع السحابي إلى ImgBB
  const uploadToImgBB = async (file: File) => {
    if (!IMGBB_API_KEY) {
      alert('مفتاح ImgBB مفقود! تأكد من وضعه في ملف .env');
      return null;
    }
    const formDataImg = new FormData();
    formDataImg.append('image', file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formDataImg,
      });
      const data = await res.json();
      if (data.success) {
        return data.data.url;
      } else {
        alert('فشل رفع الصورة');
        return null;
      }
    } catch (error) {
      alert('خطأ في الاتصال بخدمة الصور');
      return null;
    }
  };

  // 3. رفع الصورة الرئيسية
  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploadingImage(true);
    const file = e.target.files[0];
    const url = await uploadToImgBB(file);
    if (url) {
      setFormData({ ...formData, imageUrl: url });
    }
    setUploadingImage(false);
  };

  // 4. رفع عدة صور لمعرض الصور
  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploadingImage(true);
    const files = Array.from(e.target.files);
    
    let uploadedUrls: string[] = [];
    for (const file of files) {
      const url = await uploadToImgBB(file);
      if (url) uploadedUrls.push(url);
    }

    if (uploadedUrls.length > 0) {
      setFormData({ ...formData, images: [...formData.images, ...uploadedUrls] });
    }
    setUploadingImage(false);
  };

  // 5. حذف صورة من المعرض
  const removeGalleryImage = (indexToRemove: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, index) => index !== indexToRemove)
    });
  };

  // 6. حفظ البيانات المعدلة
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        alert('تم حفظ التعديلات والصور بنجاح! 🥳');
        router.push('/dashboard/products');
      } else {
        alert('حدث خطأ أثناء الحفظ');
      }
    } catch (error) {
      alert('تعذر الاتصال بالخادم');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isLoading) return <div className="p-12 text-center text-xl font-bold">جاري تحميل بيانات المنتج...</div>;

  return (
    <div dir="rtl" className="bg-white rounded-2xl shadow-md p-8 mt-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-4">✏️ تعديل بيانات المنتج</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">اسم المنتج</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl outline-none focus:border-blue-500 bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">السعر (دج)</label>
            <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl outline-none focus:border-blue-500 bg-gray-50" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">الوصف</label>
          <textarea required name="description" rows={3} value={formData.description} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl outline-none focus:border-blue-500 bg-gray-50" />
        </div>

        <div className="border-t pt-6">
          <h3 className="text-xl font-bold mb-4 text-blue-800">📷 الصور</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* الصورة الرئيسية */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <label className="block text-sm font-bold text-gray-700 mb-2">الصورة الرئيسية (الغلاف)</label>
              {formData.imageUrl && (
                <img src={formData.imageUrl} alt="Main" className="w-full h-48 object-cover rounded-lg mb-3 shadow-sm border border-gray-100" />
              )}
              <input type="file" accept="image/*" onChange={handleMainImageUpload} disabled={uploadingImage} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
            </div>

            {/* معرض الصور */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <label className="block text-sm font-bold text-gray-700 mb-2">معرض الصور الإضافية</label>
              <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} disabled={uploadingImage} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer mb-4" />
              
              <div className="flex flex-wrap gap-3">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative group">
                    <img src={img} alt={`Gallery ${index}`} className="w-20 h-20 object-cover rounded-lg border shadow-sm" />
                    <button 
                      type="button" 
                      onClick={() => removeGalleryImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-md hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {uploadingImage && <p className="text-orange-500 font-bold mt-3 animate-pulse">⏳ جاري رفع الصور إلى السحابة، يرجى الانتظار...</p>}
        </div>

        <div className="pt-6 border-t flex gap-4">
          <button type="submit" disabled={isSaving || uploadingImage} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg">
            {isSaving ? 'جاري الحفظ...' : '💾 حفظ التعديلات'}
          </button>
          <button type="button" onClick={() => router.push('/dashboard/products')} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 rounded-xl transition-colors">
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
}