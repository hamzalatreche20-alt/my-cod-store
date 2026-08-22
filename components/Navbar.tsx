import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* الشعار (يمكنك استبدال النص بصورة <img> لاحقاً) */}
        <Link href="/" className="text-2xl font-black text-blue-600 flex items-center gap-2">
          🛒 متجري
        </Link>
        <div className="flex gap-6">
          <Link href="/" className="font-bold text-gray-700 hover:text-blue-600 transition-colors">الرئيسية</Link>
          <Link href="/dashboard/products" className="font-bold text-gray-400 hover:text-blue-600 transition-colors text-sm">الإدارة</Link>
        </div>
      </div>
    </nav>
  );
}