"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (res.ok) {
        // إذا نجح الدخول، وجهه مباشرة للداشبورد
        router.push('/dashboard/products');
      } else {
        setError('❌ كلمة المرور غير صحيحة!');
      }
    } catch (err) {
      setError('حدث خطأ في الاتصال.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-gray-800">لوحة تحكم المتجر 🔒</h1>
          <p className="text-gray-500 mt-2 text-sm">أدخل كلمة المرور للوصول للإدارة</p>
        </div>
        
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-center font-bold text-sm">{error}</div>}
        
        <input
          type="password"
          placeholder="أدخل كلمة المرور..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 border rounded-xl mb-6 outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg bg-gray-50 tracking-widest"
          required
        />
        
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg disabled:bg-gray-400"
        >
          {isLoading ? 'جاري التحقق...' : 'تسجيل الدخول'}
        </button>
      </form>
    </div>
  );
}