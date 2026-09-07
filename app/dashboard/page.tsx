"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardHome() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  // حساب الإحصائيات
  const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.totalPrice) || 0), 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status.includes('الانتظار')).length;

  return (
    <div dir="rtl" className="p-4 md:p-8">
      <h1 className="text-3xl font-black text-gray-900 mb-8">📊 نظرة عامة على المتجر</h1>
      
      {/* بطاقات الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center">
          <div className="text-gray-500 text-sm font-bold mb-2">إجمالي المبيعات المتوقعة</div>
          <div className="text-4xl font-black text-blue-600">{totalRevenue} <span className="text-lg">دج</span></div>
        </div>
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center">
          <div className="text-gray-500 text-sm font-bold mb-2">إجمالي الطلبات</div>
          <div className="text-4xl font-black text-gray-900">{totalOrders} <span className="text-lg font-bold text-gray-400">طلب</span></div>
        </div>
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center">
          <div className="text-gray-500 text-sm font-bold mb-2">طلبات قيد الانتظار</div>
          <div className="text-4xl font-black text-orange-500">{pendingOrders} <span className="text-lg font-bold text-gray-400">طلب</span></div>
        </div>
      </div>

      {/* قسم أحدث الطلبات المصغر */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">🛒 أحدث الطلبات</h2>
          <Link href="/dashboard/orders" className="text-blue-600 text-sm font-bold hover:underline bg-blue-50 px-4 py-2 rounded-lg">
            إدارة كل الطلبات ←
          </Link>
        </div>
        
        {isLoading ? (
          <div className="text-center py-10 font-bold text-gray-400">جاري تحميل البيانات...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="bg-gray-50 text-gray-600 rounded-xl">
                <tr>
                  <th className="p-4 font-black">الزبون</th>
                  <th className="p-4 font-black">المنتج</th>
                  <th className="p-4 font-black">المبلغ</th>
                  <th className="p-4 font-black">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr><td colSpan={4} className="p-4 text-center">لا توجد طلبات بعد</td></tr>
                ) : (
                  orders.slice(0, 5).map(order => (
                    <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 font-bold text-gray-900">{order.customerName}</td>
                      <td className="p-4 text-gray-600 line-clamp-1">{order.product?.name || 'منتج محذوف'}</td>
                      <td className="p-4 font-black text-blue-600">{order.totalPrice} دج</td>
                      <td className="p-4">
                        <span className="bg-gray-100 px-3 py-1 rounded-lg text-xs font-bold text-gray-700">{order.status}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}