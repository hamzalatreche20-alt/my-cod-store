import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // حفظ الطلب الجديد مع تفاصيل المنتج ونوع التوصيل
    const newOrder = await prisma.order.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        wilaya: body.wilaya,
        baladiya: body.baladiya,
        address: body.address,
        productId: Number(body.productId),
        productPrice: Number(body.productPrice),
        deliveryType: body.deliveryType, // 'desk' أو 'home'
        deliveryCost: Number(body.deliveryCost),
        total: Number(body.total),
      },
    });

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error) {
    console.error("خطأ في حفظ الطلب:", error);
    return NextResponse.json({ success: false, message: 'حدث خطأ أثناء حفظ الطلب' }, { status: 500 });
  }
}