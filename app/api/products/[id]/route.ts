import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// دالة التعديل (لحفظ التغييرات الجديدة والصور)
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);
    const body = await request.json();

    const updatedProduct = await prisma.product.update({
      where: { id: id },
      data: {
        name: body.name,
        description: body.description,
        price: Number(body.price),
        imageUrl: body.imageUrl,
        images: body.images || [], // حفظ معرض الصور الجديد
      },
    });

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'فشل التعديل' }, { status: 500 });
  }
}

// دالة الحذف (التي برمجناها سابقاً)
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