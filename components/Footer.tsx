import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t-4 border-blue-600">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* العمود الأول: عن المتجر */}
          <div>
            <Link href="/" className="text-3xl font-black text-white mb-6 block tracking-tight">
              متجري<span className="text-blue-500">.</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium">
              نحن نقدم لك تجربة تسوق فريدة ومريحة. نختار لك أفضل المنتجات بأعلى جودة لنوفرها لك بأسعار تنافسية مع خدمة توصيل سريعة ومضمونة.
            </p>
            <div className="flex items-center gap-4">
              {/* أيقونات تواصل اجتماعي وهمية للتصميم الاحترافي */}
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"><span className="text-lg">📱</span></a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"><span className="text-lg">📸</span></a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"><span className="text-lg">📺</span></a>
            </div>
          </div>

          {/* العمود الثاني: روابط سريعة */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">روابط سريعة</h4>
            <ul className="space-y-3 font-medium text-sm">
              <li><Link href="/" className="hover:text-blue-400 hover:translate-x-[-8px] transition-all duration-300 flex items-center gap-2"><span>←</span> الرئيسية</Link></li>
              <li><Link href="#" className="hover:text-blue-400 hover:translate-x-[-8px] transition-all duration-300 flex items-center gap-2"><span>←</span> جميع المنتجات</Link></li>
              <li><Link href="#" className="hover:text-blue-400 hover:translate-x-[-8px] transition-all duration-300 flex items-center gap-2"><span>←</span> من نحن</Link></li>
              <li><Link href="#" className="hover:text-blue-400 hover:translate-x-[-8px] transition-all duration-300 flex items-center gap-2"><span>←</span> اتصل بنا</Link></li>
            </ul>
          </div>

          {/* العمود الثالث: سياسات المتجر */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">خدمات الزبائن</h4>
            <ul className="space-y-3 font-medium text-sm">
              <li><Link href="#" className="hover:text-blue-400 hover:translate-x-[-8px] transition-all duration-300 flex items-center gap-2"><span>←</span> الدفع عند الاستلام (COD)</Link></li>
              <li><Link href="#" className="hover:text-blue-400 hover:translate-x-[-8px] transition-all duration-300 flex items-center gap-2"><span>←</span> سياسة الاستبدال والاسترجاع</Link></li>
              <li><Link href="#" className="hover:text-blue-400 hover:translate-x-[-8px] transition-all duration-300 flex items-center gap-2"><span>←</span> أسعار ومدة التوصيل</Link></li>
              <li><Link href="#" className="hover:text-blue-400 hover:translate-x-[-8px] transition-all duration-300 flex items-center gap-2"><span>←</span> الأسئلة الشائعة</Link></li>
            </ul>
          </div>

          {/* العمود الرابع: معلومات الاتصال */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">تواصل معنا</h4>
            <ul className="space-y-4 font-medium text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <span className="text-blue-500 text-xl">📍</span>
                <span>الجزائر، ولاية النعامة<br/>توصيل متوفر لـ 58 ولاية</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500 text-xl">📞</span>
                <span dir="ltr" className="font-bold tracking-wider">05XX XX XX XX</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500 text-xl">✉️</span>
                <span>contact@store.dz</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 font-medium text-center md:text-right">
            © {new Date().getFullYear()} جميع الحقوق محفوظة. تم التطوير بكل ❤️ في الجزائر.
          </p>
          <div className="flex gap-4">
            {/* بطاقات ثقة وهمية للدفع */}
            <div className="bg-gray-800 px-3 py-1 rounded text-xs font-bold text-gray-400 border border-gray-700">الدفع عند الاستلام</div>
            <div className="bg-gray-800 px-3 py-1 rounded text-xs font-bold text-gray-400 border border-gray-700">توصيل سريع</div>
          </div>
        </div>
      </div>
    </footer>
  );
}