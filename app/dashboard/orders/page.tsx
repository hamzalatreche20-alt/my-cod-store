"use client";

import React, { useState, useEffect } from 'react';

const STATUS_OPTIONS = [
  "قيد الانتظار ⏳",
  "تم التأكيد 📞",
  "قيد التوصيل 🚚",
  "تم الاستلام ✅",
  "ملغى ❌"
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error('خطأ في جلب الطلبات:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    // التحديث الفوري في الواجهة (لتحسين تجربة المستخدم)
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    
    // الإرسال لقاعدة البيانات
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (error) {
      alert('حدث خطأ أثناء تحديث الحالة');
      fetchOrders(); // إعادة جلب البيانات الأصلية في حالة الفشل
    }
  };

  // دالة لاختيار لون الشارة حسب الحالة
  const getStatusColor = (status: string) => {
    if (status.includes('الانتظار')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (status.includes('التأكيد')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (status.includes('التوصيل')) return 'bg-purple-100 text-purple-800 border-purple-200';
    if (status.includes('الاستلام')) return 'bg-green-100 text-green-800 border-green-200';
    if (status.includes('ملغى')) return 'bg-red-100 text-red-800 border-red-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (isLoading) return <div dir="rtl" className="p-8 text-center font-bold text-gray-500">جاري تحميل الطلبات... ⏳</div>;

  return (
    <div dir="rtl" className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-gray-800">📦 إدارة الطلبات</h1>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-bold text-sm">
          إجمالي الطلبات: {orders.length}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm text-gray-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-black">رقم الطلب</th>
                <th className="px-6 py-4 font-black">الزبون / الهاتف</th>
                <th className="px-6 py-4 font-black">الولاية / العنوان</th>
                <th className="px-6 py-4 font-black">المنتج (الكمية)</th>
                <th className="px-6 py-4 font-black">الإجمالي</th>
                <th className="px-6 py-4 font-black text-center">حالة الطلب</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-10 text-center font-bold text-gray-400">لا توجد طلبات حالياً</td></tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-900">#{order.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{order.customerName}</div>
                      <div className="text-blue-600 font-bold" dir="ltr">{order.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold">{order.wilaya}</div>
                      <div className="text-gray-400 text-xs mt-1">{order.address}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={order.product?.imageUrl} alt={order.product?.name} className="w-10 h-10 rounded-lg object-cover border border-gray-200" />
                        <div>
                          <div className="font-bold text-gray-800 line-clamp-1 max-w-[150px]">{order.product?.name}</div>
                          <div className="text-xs font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-600 mt-1 inline-block">الكمية: {order.quantity}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-black text-blue-600 whitespace-nowrap">
                      {order.totalPrice} دج
                    </td>
                    <td className="px-6 py-4 text-center">
                      <select 
                        value={order.status} 
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className={`px-3 py-2 text-xs font-bold rounded-xl border outline-none cursor-pointer w-full text-center appearance-none ${getStatusColor(order.status)}`}
                      >
                        {STATUS_OPTIONS.map(status => (
                          <option key={status} value={status} className="text-gray-900 bg-white">{status}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}