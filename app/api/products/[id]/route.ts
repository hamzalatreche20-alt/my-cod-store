import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

// دالة تعديل المنتج (PUT)
export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    // التحديث الجديد: إضافة await هنا
    const params = await props.params;
    const id = Number(params.id);
    const body = await request.json();
    
    const updatedProduct = await prisma.product.update({
      where: { id: id },
      data: {
        name: body.name,
        description: body.description,
        price: Number(body.price),
        imageUrl: body.imageUrl,
      },
    });

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'حدث خطأ أثناء التعديل' }, { status: 500 });
  }
}

// دالة حذف المنتج (DELETE)
export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    // التحديث الجديد: إضافة await هنا
    const params = await props.params;
    const id = Number(params.id);
    
    await prisma.product.delete({
      where: { id: id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'لا يمكن حذف منتج مرتبط بطلبات الزبائن' }, { status: 500 });
  }
}