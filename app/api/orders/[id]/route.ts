import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  // تحديث Next.js 15: params أصبح Promise
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const resolvedParams = await params; // انتظار قراءة الـ ID
    const body = await request.json();
    
    const updatedOrder = await prisma.order.update({
      where: { id: Number(resolvedParams.id) },
      data: { status: body.status }
    });
    
    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'فشل تحديث الطلب' }, { status: 500 });
  }
}