import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const updatedOrder = await prisma.order.update({
      where: { id: Number(params.id) },
      data: { status: body.status } // تحديث الحالة فقط
    });
    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'فشل تحديث الطلب' }, { status: 500 });
  }
}