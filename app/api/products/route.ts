import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// جلب كل المنتجات
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { id: 'desc' }
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'فشل جلب المنتجات' }, { status: 500 });
  }
}

// إضافة منتج جديد
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: Number(body.price),
        imageUrl: body.imageUrl,
        images: body.images || [],
        
        // @ts-ignore
        badge: body.badge || null, // <--- السطر الجديد
      },
    });
    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'فشل إضافة المنتج' }, { status: 500 });
  }
}