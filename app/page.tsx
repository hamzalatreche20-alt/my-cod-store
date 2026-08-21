import prisma from '../lib/prisma';
import Link from 'next/link';

// لمنع حفظ نسخة قديمة من الصفحة وتحديثها فور إضافة منتج جديد
export const dynamic = 'force-dynamic';

export default async function StoreFront() {
  // جلب جميع المنتجات من قاعدة البيانات
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 font-sans pb-20">
      
      {/* رأس المتجر (Header) */}
      <header className="bg-blue-700 text-white text-center py-16 px-4 shadow-md">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">متجرنا الإلكتروني</h1>
          <p className="text-xl text-blue-100">
            تصفح أفضل منتجاتنا واطلبها الآن. الدفع عند الاستلام والتوصيل متوفر لجميع الولايات!
          </p>
        </div>
      </header>

      {/* عرض المنتجات */}
      <main className="max-w-6xl mx-auto px-4 mt-12">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-2xl font-bold">المتجر فارغ حالياً.</p>
            <p className="text-gray-400 mt-2">قم بالدخول إلى لوحة التحكم وإضافة منتجاتك الأولى.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>
                  <p className="text-gray-500 mb-4 line-clamp-2 text-sm">{product.description}</p>
                  <div className="text-3xl font-black text-orange-600 mb-6">{product.price} دج</div>
                  
                  {/* هذا الزر سيأخذ الزبون لصفحة الدفع الخاصة بهذا المنتج تحديداً */}
                  <Link 
                    href={`/checkout/${product.id}`} 
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-md"
                  >
                    اطلب الآن
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}