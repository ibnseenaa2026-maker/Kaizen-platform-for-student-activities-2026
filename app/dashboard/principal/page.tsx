'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase'; // تأكد أن المسار مطابق لمجلدك

export const dynamic = 'force-dynamic';

export default function PrincipalDashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSecurity() {
      try {
        // 1. جلب جلسة المستخدم من Supabase
        const { data: { session }, error } = await supabase.auth.getSession();

        // 2. إذا لم تكن هناك جلسة أو حدث خطأ -> طرد فوري لصفحة الدخول
        if (error || !session || !session.user) {
          router.replace('/login');
          return;
        }

        // 3. التحقق الصارم من البريد الإلكتروني للمدير (saeman79@gmail.com)
        const allowedEmail = 'saeman79@gmail.com';
        if (session.user.email !== allowedEmail) {
          alert('Access Denied: Principal dashboard is restricted.');
          await supabase.auth.signOut();
          router.replace('/login');
          return;
        }

        // إذا اجتاز الشروط
        setAuthorized(true);
      } catch (err) {
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    }

    checkSecurity();
  }, [router]);

  if (loading || !authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-xs font-bold text-red-500 animate-pulse">
          🔒 جاري التحقق من أمان الصلاحيات...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4EAD3]/20 text-[#0B2545] p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-md border flex justify-between items-center">
        <div>
          <h1 className="text-lg font-black text-[#0B2545]">لوحة تحكم مدير المدرسة</h1>
          <p className="text-xs text-sky-600 font-bold mt-1">أ. نايف بن علي العتيبي</p>
        </div>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            localStorage.clear();
            sessionStorage.clear();
            router.replace('/login');
          }}
          className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-xl font-bold text-xs hover:bg-red-500 hover:text-white transition"
        >
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
}