import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// جلب جميع الطلبات للداشبورد
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { id: 'desc' },
      include: { product: true } // لجلب تفاصيل المنتج الذي طلبه الزبون
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'فشل جلب الطلبات' }, { status: 500 });
  }
}

// تسجيل طلب جديد (يستخدمه الزبون في واجهة المتجر)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const order = await prisma.order.create({
      data: {
        productId: Number(body.productId),
        customerName: body.customerName,
        phone: body.phone,
        wilaya: body.wilaya,
        address: body.address,
        quantity: Number(body.quantity),
        totalPrice: Number(body.totalPrice),
        status: "قيد الانتظار ⏳"
      }
    });
    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'فشل تسجيل الطلب' }, { status: 500 });
  }
}