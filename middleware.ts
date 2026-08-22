import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // البحث عن بطاقة المرور (Cookie)
  const authCookie = request.cookies.get('admin_auth');
  
  // إذا كان الزائر يحاول الدخول لأي مسار يبدأ بـ /dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // إذا لم يكن يملك البطاقة، اطرده لصفحة تسجيل الدخول
    if (!authCookie || authCookie.value !== 'true') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

// تطبيق الحارس فقط على لوحة التحكم للحفاظ على سرعة باقي الموقع
export const config = {
  matcher: ['/dashboard/:path*'],
};