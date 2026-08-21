import prisma from '../../../lib/prisma'; // تأكد أن مسار الاستدعاء يطابق باقي ملفاتك

export const dynamic = 'force-dynamic';

export default async function ManageProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div dir="rtl" className="bg-white rounded-2xl shadow-md overflow-hidden mt-4">
      <div className="bg-gray-800 p-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">🛍️ إدارة المنتجات</h2>
        <span className="bg-green-600 text-white px-4 py-1 rounded-full font-bold">
          {products.length} منتجات
        </span>
      </div>

      {products.length === 0 ? (
        <div className="p-12 text-center text-gray-500 text-xl font-bold">
          لا توجد منتجات حتى الآن. اذهب إلى صفحة "إضافة منتج" للبدء!
        </div>
      ) : (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow bg-gray-50">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-48 object-cover rounded-lg mb-4 border border-gray-100"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-green-700 font-black text-lg mb-3">{product.price} دج</p>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-red-100 text-red-600 font-bold py-2 rounded-lg hover:bg-red-200 transition-colors">
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}