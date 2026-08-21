import prisma from '../../../lib/prisma'; // إذا ظهر تحته خط أحمر، اجعله '../../lib/prisma'
import { Metadata } from 'next';

// 1. الدالة السحرية لقراءة بيانات المنتج وإرسالها لفيسبوك
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const productId = Number(resolvedParams.id);
  
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    return { title: 'منتج غير متوفر' };
  }

  return {
    title: `اطلب الآن: ${product.name}`,
    description: `احصل على ${product.name} بسعر ${product.price} دج فقط! التوصيل متوفر والدفع عند الاستلام.`,
    openGraph: {
      title: `اطلب الآن: ${product.name}`,
      description: `بسعر ${product.price} دج. الدفع عند الاستلام!`,
      images: [
        {
          url: product.imageUrl, 
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

// 2. الهيكل الأساسي الذي يسمح لصفحة الشراء بالظهور
export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}