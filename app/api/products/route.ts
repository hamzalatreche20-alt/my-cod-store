import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

// دالة جلب المنتجات (GET)
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ success: false, message: 'فشل جلب المنتجات' }, { status: 500 });
  }
}

// دالة إضافة منتج جديد (POST)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newProduct = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: Number(body.price),
        imageUrl: body.imageUrl,
      },
    });
    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'حدث خطأ' }, { status: 500 });
  }
}