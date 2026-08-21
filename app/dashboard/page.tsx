import prisma from '../../lib/prisma';

// لمنع تخزين الصفحة وجلب الطلبات الجديدة فوراً
export const dynamic = 'force-dynamic';

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { product: true } 
  });

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden mt-4">
      <div className="bg-gray-800 p-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">📦 الطلبات الجديدة</h2>
        <span className="bg-blue-600 text-white px-4 py-1 rounded-full font-bold">
          {orders.length} طلبات
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="p-12 text-center text-gray-500 text-xl font-bold">
          لا توجد طلبات حتى الآن. شارك رابط متجرك لتبدأ المبيعات!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-100 text-gray-700 border-b-2 border-gray-200">
              <tr>
                <th className="p-4">التاريخ</th>
                <th className="p-4">الزبون والهاتف</th>
                <th className="p-4">العنوان والتوصيل</th>
                <th className="p-4">المنتج</th>
                <th className="p-4">الإجمالي</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b hover:bg-blue-50 transition-colors">
                  <td className="p-4 text-sm text-gray-600 font-medium whitespace-nowrap">
                    {new Date(order.createdAt).toLocaleDateString('ar-DZ')}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-gray-800">{order.firstName} {order.lastName}</div>
                    <div className="text-blue-600 font-bold mt-1" dir="ltr">{order.phone}</div>
                  </td>
                  <td className="p-4 text-sm">
                    <span className="font-bold text-gray-800">{order.wilaya}</span> - {order.baladiya}
                    <div className="text-gray-500 mt-1">{order.address}</div>
                    <div className="inline-block mt-2 px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-bold">
                      التوصيل: {order.deliveryType === 'desk' ? 'للمكتب' : 'للمنزل'} ({order.deliveryCost} دج)
                    </div>
                  </td>
                  <td className="p-4">
                    {order.product ? (
                      <div className="flex items-center gap-3">
                        <img src={order.product.imageUrl} alt="product" className="w-10 h-10 rounded-md object-cover shadow-sm" />
                        <div>
                          <div className="font-bold text-gray-800 line-clamp-1">{order.product.name}</div>
                          <div className="text-xs text-gray-500">{order.productPrice} دج</div>
                        </div>
                      </div>
                    ) : (
                      <span className="text-red-500 text-sm font-bold">منتج محذوف</span>
                    )}
                  </td>
                  <td className="p-4 text-xl font-black text-green-700">{order.total} دج</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}