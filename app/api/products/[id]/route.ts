import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);

    await prisma.product.delete({
      where: { id: id },
    });

    return NextResponse.json({ success: true, message: 'تم حذف المنتج بنجاح' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'فشل الحذف' }, { status: 500 });
  }
}