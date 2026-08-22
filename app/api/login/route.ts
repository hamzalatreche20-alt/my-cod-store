import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const adminPassword = process.env.ADMIN_PASSWORD || '123456';

  // إذا كانت كلمة المرور مطابقة
  if (body.password === adminPassword) {
    const response = NextResponse.json({ success: true });
    
    // إعطاء المستخدم "بطاقة مرور" (Cookie) صالحة لمدة أسبوع
    response.cookies.set('admin_auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 أيام
    });
    
    return response;
  }

  // إذا كانت كلمة المرور خاطئة
  return NextResponse.json({ success: false, message: 'كلمة المرور خاطئة' }, { status: 401 });
}