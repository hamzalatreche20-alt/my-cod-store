"use client"
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import prisma from '../../../lib/prisma'; // تأكد من مسار قاعدة البيانات الصحيح
import { Metadata } from 'next';

// هذه الدالة السحرية هي التي تقرأ بيانات المنتج وتعطيها لفيسبوك
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
// قائمة الولايات وأسعار التوصيل كما حددتها
const wilayasData = [
  { name: "01 - أدرار (Adrar)", desk: 700, home: 1200 },
  { name: "02 - الشلف (Chlef)", desk: 500, home: 900 },
  { name: "03 - الأغواط (Laghouat)", desk: 500, home: 900 },
  { name: "04 - أم البواقي (Oum El Bouaghi)", desk: 500, home: 800 },
  { name: "05 - باتنة (Batna)", desk: 500, home: 800 },
  { name: "06 - بجاية (Béjaïa)", desk: 500, home: 800 },
  { name: "07 - بسكرة (Biskra)", desk: 450, home: 750 },
  { name: "08 - بشار (Béchar)", desk: 500, home: 1200 },
  { name: "09 - البليدة (Blida)", desk: 500, home: 850 },
  { name: "10 - البويرة (Bouira)", desk: 500, home: 800 },
  { name: "11 - تمنراست (Tamanrasset)", desk: 750, home: 1300 },
  { name: "12 - تبسة (Tébessa)", desk: 500, home: 800 },
  { name: "13 - تلمسان (Tlemcen)", desk: 500, home: 950 },
  { name: "14 - تيارت (Tiaret)", desk: 500, home: 900 },
  { name: "15 - تيزي وزو (Tizi Ouzou)", desk: 500, home: 850 },
  { name: "16 - الجزائر (Alger)", desk: 450, home: 650 },
  { name: "17 - الجلفة (Djelfa)", desk: 500, home: 800 },
  { name: "18 - جيجل (Jijel)", desk: 500, home: 800 },
  { name: "19 - سطيف (Sétif)", desk: 500, home: 800 },
  { name: "20 - سعيدة (Saïda)", desk: 500, home: 900 },
  { name: "21 - سكيكدة (Skikda)", desk: 500, home: 800 },
  { name: "22 - سيدي بلعباس (Sidi Bel Abbès)", desk: 500, home: 900 },
  { name: "23 - عنابة (Annaba)", desk: 500, home: 800 },
  { name: "24 - قالمة (Guelma)", desk: 500, home: 800 },
  { name: "25 - قسنطينة (Constantine)", desk: 500, home: 800 },
  { name: "26 - المدية (Médéa)", desk: 500, home: 850 },
  { name: "27 - مستغانم (Mostaganem)", desk: 500, home: 900 },
  { name: "28 - المسيلة (M'Sila)", desk: 500, home: 800 },
  { name: "29 - معسكر (Mascara)", desk: 500, home: 900 },
  { name: "30 - ورقلة (Ouargla)", desk: 450, home: 750 },
  { name: "31 - وهران (Oran)", desk: 500, home: 900 },
  { name: "32 - البيض (El Bayadh)", desk: 600, home: 1150 },
  { name: "33 - إليزي (Illizi)", desk: 1000, home: 1550 },
  { name: "34 - برج بوعريريج (Bordj Bou Arréridj)", desk: 500, home: 800 },
  { name: "35 - بومرداس (Boumerdès)", desk: 500, home: 850 },
  { name: "36 - الطارف (El Tarf)", desk: 500, home: 800 },
  { name: "37 - تندوف (Tindouf)", desk: 700, home: 1400 },
  { name: "38 - تيسمسيلت (Tissemsilt)", desk: 500, home: 900 },
  { name: "39 - الوادي (El Oued)", desk: 450, home: 750 },
  { name: "40 - خنشلة (Khenchela)", desk: 500, home: 800 },
  { name: "41 - سوق أهراس (Souk Ahras)", desk: 500, home: 800 },
  { name: "42 - تيبازة (Tipaza)", desk: 500, home: 850 },
  { name: "43 - ميلة (Mila)", desk: 500, home: 800 },
  { name: "44 - عين الدفلى (Aïn Defla)", desk: 500, home: 850 },
  { name: "45 - النعامة (Naâma)", desk: 500, home: 1100 },
  { name: "46 - عين تموشنت (Aïn Témouchent)", desk: 500, home: 950 },
  { name: "47 - غرداية (Ghardaïa)", desk: 500, home: 950 },
  { name: "48 - غليزان (Relizane)", desk: 500, home: 900 },
  { name: "49 - تيميمون (Timimoun)", desk: 0, home: 1150 },
  { name: "50 - برج باجي مختار (Bordj Badji Mokhtar)", desk: 0, home: 2000 },
  { name: "51 - أولاد جلال (Ouled Djellal)", desk: 450, home: 750 },
  { name: "52 - بني عباس (Béni Abbès)", desk: 0, home: 1150 },
  { name: "53 - عين صالح (In Salah)", desk: 750, home: 1500 },
  { name: "54 - عين قزام (In Guezzam)", desk: 500, home: 1500 },
  { name: "55 - تقرت (Touggourt)", desk: 450, home: 750 },
  { name: "56 - جانت (Djanet)", desk: 800, home: 1900 },
  { name: "57 - المغير (El M'Ghair)", desk: 350, home: 500 },
  { name: "58 - المنيعة (El Meniaa)", desk: 0, home: 950 },
];

export default function CheckoutPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', phone: '', wilaya: '', baladiya: '', address: '', deliveryType: 'home'
  });

  // جلب معلومات المنتج المطلوب
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        const foundProduct = data.find((p: any) => p.id === Number(id));
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          alert('المنتج غير موجود!');
          router.push('/');
        }
      } catch (error) {
        console.error("خطأ في جلب المنتج");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id, router]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // العثور على الولاية المختارة لمعرفة أسعارها
  const selectedWilayaData = wilayasData.find(w => w.name === formData.wilaya);

  // تحديث نوع التوصيل تلقائياً إذا اختار ولاية لا تدعم توصيل المكتب
  useEffect(() => {
    if (selectedWilayaData && selectedWilayaData.desk === 0 && formData.deliveryType === 'desk') {
      setFormData(prev => ({ ...prev, deliveryType: 'home' }));
    }
  }, [formData.wilaya, selectedWilayaData, formData.deliveryType]);

  // حساب تكلفة التوصيل
  let currentDeliveryCost = 0;
  if (selectedWilayaData) {
    currentDeliveryCost = formData.deliveryType === 'desk' ? selectedWilayaData.desk : selectedWilayaData.home;
  }

  const finalTotal = product ? product.price + currentDeliveryCost : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const orderPayload = {
      ...formData,
      productId: product.id,
      productPrice: product.price,
      deliveryCost: currentDeliveryCost,
      total: finalTotal,
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      if (response.ok) {
        alert(`تم تأكيد طلبك بنجاح! التكلفة النهائية: ${finalTotal} دج.`);
        router.push('/'); // العودة للمتجر بعد الطلب
      } else {
        alert('حدث خطأ، يرجى المحاولة مرة أخرى.');
      }
    } catch (error) {
      alert('تعذر الاتصال بالخادم.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center font-bold text-xl">جاري تحميل صفحة الدفع...</div>;
  if (!product) return null;

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 font-sans py-12 px-4 pb-20">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* معلومات المنتج والفاتورة */}
        <div className="bg-white p-6 rounded-3xl shadow-md h-fit border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">ملخص الطلب</h2>
          <div className="flex gap-4 items-center mb-6">
            <img src={product.imageUrl} alt={product.name} className="w-24 h-24 object-cover rounded-xl shadow-sm" />
            <div>
              <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
              <p className="text-gray-500 text-sm line-clamp-2 mt-1">{product.description}</p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 space-y-3">
            <div className="flex justify-between text-gray-700">
              <span>سعر المنتج:</span>
              <span className="font-bold">{product.price} دج</span>
            </div>
            
            {formData.wilaya && (
              <div className="flex justify-between text-gray-700">
                <span>تكلفة التوصيل ({formData.deliveryType === 'desk' ? 'للمكتب' : 'للمنزل'}):</span>
                <span className="font-bold text-orange-600">+{currentDeliveryCost} دج</span>
              </div>
            )}
            
            <hr className="border-blue-200" />
            <div className="flex justify-between text-2xl text-blue-900 font-black pt-2">
              <span>الإجمالي:</span>
              <span>{finalTotal} دج</span>
            </div>
          </div>
        </div>

        {/* نموذج معلومات الزبون */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">معلومات التوصيل</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
                <input required type="text" name="firstName" value={formData.firstName} onChange={handleTextChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">اللقب</label>
                <input required type="text" name="lastName" value={formData.lastName} onChange={handleTextChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
              <input required type="tel" name="phone" dir="ltr" value={formData.phone} onChange={handleTextChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-right" placeholder="05xx xx xx xx" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الولاية</label>
                <select required name="wilaya" value={formData.wilaya} onChange={handleTextChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option value="">اختر الولاية...</option>
                  {wilayasData.map((w, index) => (
                    <option key={index} value={w.name}>{w.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">البلدية</label>
                <input required type="text" name="baladiya" value={formData.baladiya} onChange={handleTextChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            {/* خيارات التوصيل تظهر فقط بعد اختيار الولاية */}
            {formData.wilaya && selectedWilayaData && (
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-4">
                <label className="block text-sm font-bold text-gray-800 mb-3">طريقة التوصيل المتاحة:</label>
                <div className="flex flex-col gap-3">
                  
                  {/* خيار التوصيل للمكتب (يختفي إذا كان السعر 0) */}
                  {selectedWilayaData.desk > 0 && (
                    <label className="flex items-center gap-3 cursor-pointer p-3 bg-white border rounded-lg hover:border-blue-500 transition-colors">
                      <input 
                        type="radio" 
                        name="deliveryType" 
                        value="desk" 
                        checked={formData.deliveryType === 'desk'} 
                        onChange={handleTextChange}
                        className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="font-medium">توصيل إلى مكتب شركة الشحن</span>
                      <span className="mr-auto font-bold text-orange-600">({selectedWilayaData.desk} دج)</span>
                    </label>
                  )}
                  
                  {/* خيار التوصيل للمنزل */}
                  <label className="flex items-center gap-3 cursor-pointer p-3 bg-white border rounded-lg hover:border-blue-500 transition-colors">
                    <input 
                      type="radio" 
                      name="deliveryType" 
                      value="home" 
                      checked={formData.deliveryType === 'home'} 
                      onChange={handleTextChange}
                      className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="font-medium">توصيل حتى باب المنزل</span>
                    <span className="mr-auto font-bold text-orange-600">({selectedWilayaData.home} دج)</span>
                  </label>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">العنوان الكامل</label>
              <textarea required name="address" rows={2} value={formData.address} onChange={handleTextChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="الحي، الشارع..."></textarea>
            </div>

            <button type="submit" disabled={isSubmitting || !formData.wilaya} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-4 rounded-xl text-xl transition-colors shadow-lg mt-6">
              {isSubmitting ? 'جاري تأكيد الطلب...' : 'تأكيد الطلب الآن'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}