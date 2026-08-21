"use client"
import React, { useState } from 'react';

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', imageUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('تمت إضافة المنتج بنجاح!');
        setFormData({ name: '', description: '', price: '', imageUrl: '' });
      } else {
        alert('حدث خطأ أثناء الإضافة.');
      }
    } catch (error) {
      alert('تعذر الاتصال بالخادم.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div dir="rtl" className="bg-white p-8 rounded-2xl shadow-md max-w-2xl mx-auto border border-gray-100 mt-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">إضافة منتج جديد</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">اسم المنتج</label>
          <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">سعر المنتج (دج)</label>
          <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">رابط صورة المنتج (URL)</label>
          <input required type="url" name="imageUrl" dir="ltr" value={formData.imageUrl} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">وصف المنتج</label>
          <textarea required name="description" rows={4} value={formData.description} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-4 rounded-xl text-xl transition-colors shadow-lg">
          {isSubmitting ? 'جاري الحفظ...' : 'حفظ المنتج وإضافته'}
        </button>
      </form>
    </div>
  );
}