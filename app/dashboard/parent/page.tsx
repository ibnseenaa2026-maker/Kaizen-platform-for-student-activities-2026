'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';

export const dynamic = 'force-dynamic';

export default function ParentDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'children' | 'circulars' | 'activities' | 'messages'>('children');

  // بيانات افتراضية تجريبية لولي الأمر وأبنائه (تمهيداً لربطها بقاعدة البيانات لاحقاً)
  const parentName = 'ولي الأمر الكريم';
  const schoolName = 'متوسطة ابن سينا بالهيئة الملكية بينبع الصناعية';

  const [childrenList, setChildrenList] = useState([
    { id: 1, name: 'عبدالله', grade: 'الثالث المتوسط', class: '3/1', status: 'منتظم ومتميز', behavior: 'ممتاز' },
    { id: 2, name: 'سعد', grade: 'الثاني المتوسط', class: '2/2', status: 'مشارك في الأنشطة', behavior: 'جيد جداً' }
  ]);

  const [circulars, setCirculars] = useState([
    { title: 'دعوة لحضور لقاء أولياء الأمور والاطلاع على نهج الكايزن', date: '2026-08-25', target: 'أولياء الأمور' },
    { title: 'تنبيه بشأن انطلاق فعاليات "ينبع تركض" الرياضية', date: '2026-04-10', target: 'أولياء الأمور والطلاب' }
  ]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {}
    localStorage.clear();
    sessionStorage.clear();
    router.replace('/login');
  };

  return (
    <div className="min-h-screen bg-[#F4EAD3]/20 text-[#0B2545] p-4 md:p-8 font-sans rtl text-right">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* 🌟 هيدر لوحة ولي الأمر */}
        <div className="bg-white p-6 rounded-3xl shadow-md border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-sky-50 border-2 border-sky-400 flex items-center justify-center text-2xl shadow-inner">
              👨‍👦
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-sky-100 text-sky-800 px-2.5 py-1 rounded-full font-black uppercase">
                  بوابة ولي الأمر
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-black">
                  متوسطة ابن سينا
                </span>
              </div>
              <h1 className="text-xl font-black text-[#0B2545] mt-1">لوحة متابعة ولي الأمر</h1>
              <p className="text-xs text-sky-700 font-bold">{parentName} — متابعة الأبناء والتعاميم</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="bg-red-50 hover:bg-red-500 text-red-600 hover:text-white border border-red-200 px-5 py-2.5 rounded-2xl font-black text-xs transition shadow-sm cursor-pointer"
            >
              🚪 تسجيل الخروج
            </button>
          </div>
        </div>

        {/* 📑 أزرار التنقل */}
        <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl border border-gray-200 shadow-sm">
          <button
            onClick={() => setActiveTab('children')}
            className={`px-4 py-2.5 rounded-xl font-black text-xs transition cursor-pointer ${activeTab === 'children' ? 'bg-[#0B2545] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            👨‍🎓 أبنائي الطلاب ومستواهم
          </button>
          <button
            onClick={() => setActiveTab('circulars')}
            className={`px-4 py-2.5 rounded-xl font-black text-xs transition cursor-pointer ${activeTab === 'circulars' ? 'bg-[#0B2545] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            📢 التعاميم الموجهة لأولياء الأمور
          </button>
          <button
            onClick={() => setActiveTab('activities')}
            className={`px-4 py-2.5 rounded-xl font-black text-xs transition cursor-pointer ${activeTab === 'activities' ? 'bg-[#0B2545] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            🌟 الأنشطة والفعاليات والرحلات
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2.5 rounded-xl font-black text-xs transition cursor-pointer ${activeTab === 'messages' ? 'bg-[#0B2545] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            💬 التواصل مع الإدارة
          </button>
        </div>

        {/* 📋 1. قسم الأبناء */}
        {activeTab === 'children' && (
          <div className="space-y-4">
            <h3 className="text-base font-black text-[#0B2545]">👨‍🎓 الأبناء المسجلون في المدرسه</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {childrenList.map((child) => (
                <div key={child.id} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-sky-100 text-sky-800 px-3 py-1 rounded-full font-bold">{child.grade} - فصل {child.class}</span>
                    <span className="text-xs text-emerald-600 font-black">{child.status}</span>
                  </div>
                  <h4 className="text-lg font-black text-[#0B2545]">{child.name}</h4>
                  <div className="pt-2 border-t border-gray-100 flex justify-between text-xs text-gray-500 font-bold">
                    <span>السلوك والمواظبة: <span className="text-emerald-700">{child.behavior}</span></span>
                    <button onClick={() => alert(`جاري عرض السجل التفصيلي للطالب: ${child.name}`)} className="text-sky-600 hover:underline cursor-pointer">عرض التفاصيل والدرجات ↗</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 📢 2. التعاميم */}
        {activeTab === 'circulars' && (
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-base font-black text-[#0B2545]">📢 التعاميم والرسائل الإدارية الصادرة من إدارة المدرسة</h3>
            <p className="text-xs text-gray-500">التعاميم والتوجيهات المعتمدة من مدير المدرسة (أ. نايف العتيبي) والموجهة لأولياء الأمور.</p>
            
            <div className="space-y-3 pt-2">
              {circulars.map((circ, idx) => (
                <div key={idx} className="p-4 rounded-2xl border border-gray-200 bg-gray-50 flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-black text-[#0B2545]">{circ.title}</h4>
                    <span className="text-[10px] text-gray-400 font-bold mt-1 block">تاريخ النشر: {circ.date}</span>
                  </div>
                  <button onClick={() => alert('جاري تحميل قراءة التعميم...')} className="bg-white border border-gray-300 hover:bg-gray-100 text-[#0B2545] px-4 py-2 rounded-xl text-xs font-bold cursor-pointer">
                    قراءة التعميم
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 🌟 3. الأنشطة والفعاليات */}
        {activeTab === 'activities' && (
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-base font-black text-[#0B2545]">🌟 مشاركات الأبناء في الأنشطة المدرسية والفعاليات</h3>
            <p className="text-xs text-gray-500">متابعة الفعاليات المجتمعية والرياضية (مثل فعالية "ينبع تركض") والموافقات الرقمية.</p>
            
            <div className="p-4 rounded-2xl border border-sky-200 bg-sky-50/50 space-y-2">
              <span className="text-[10px] bg-sky-200 text-sky-900 px-2 py-0.5 rounded-full font-bold">فعالية مجتمعية</span>
              <h4 className="text-sm font-black text-[#0B2545]">مشاركة الأبناء في فعالية "ينبع تركض" الرياضية</h4>
              <p className="text-xs text-gray-600">تم تسجيل موافقة ولي الأمر بنجاح لمشاركة الأبناء في الفعاليات الرياضية بتنظيم رائد النشاط.</p>
            </div>
          </div>
        )}

        {/* 💬 4. التواصل */}
        {activeTab === 'messages' && (
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-base font-black text-[#0B2545]">💬 التواصل المباشر مع إدارة المدرسة</h3>
            <p className="text-xs text-gray-500">إرسال استفسار أو مقترح لإدارة متوسطة ابن سينا.</p>
            
            <div className="space-y-3 pt-2">
              <textarea 
                placeholder="اكتب رسالتك أو استفسارك هنا..." 
                className="w-full h-32 bg-gray-50 border border-gray-300 rounded-2xl p-4 text-xs text-[#0B2545] outline-none focus:ring-2 focus:ring-sky-500"
              ></textarea>
              <button 
                onClick={() => alert('تم إرسال رسالتك إلى إدارة المدرسة بنجاح!')} 
                className="bg-[#0B2545] hover:bg-blue-900 text-white px-6 py-3 rounded-2xl text-xs font-black cursor-pointer shadow-sm transition"
              >
                إرسال الرسالة للإدارة
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}