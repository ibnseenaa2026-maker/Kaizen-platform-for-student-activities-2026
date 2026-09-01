'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';

export const dynamic = 'force-dynamic';

export default function PrincipalDashboard() {
  const router = useRouter();
  const [isAr, setIsAr] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'approvals' | 'circulars' | 'reports' | 'activities'>('overview');

  // بيانات مدير المدرسة
  const principalName = 'أ. نايف بن علي العتيبي';
  const schoolName = 'متوسطة ابن سينا بالهيئة الملكية بينبع الصناعية';

  // حالات وهمية تفاعلية للتعاميم والشهادات
  const [circularTitle, setCircularTitle] = useState('');
  const [circularTarget, setCircularTarget] = useState('all');
  const [circularFile, setCircularFile] = useState<string | null>(null);
  const [circularsList, setCircularsList] = useState([
    { title: 'تعميم انطلاقة الأنشطة الفصلية وتفعيل نهج الكايزن', target: 'الجميع', date: '2026-08-20' },
    { title: 'خطة الاستعداد لاختبارات نهاية الفصل الدراسي', target: 'المعلمون', date: '2026-08-15' }
  ]);

  const handleUploadCircular = (e: React.FormEvent) => {
    e.preventDefault();
    if (!circularTitle) return alert('الرجاء كتابة عنوان التعميم!');
    
    const targetMap: Record<string, string> = {
      all: 'الجميع',
      teachers: 'المعلمون',
      activity_leader: 'رائد النشاط الطلابي',
      parents: 'أولياء الأمور'
    };

    setCircularsList([
      { title: circularTitle, target: targetMap[circularTarget], date: new Date().toISOString().split('T')[0] },
      ...circularsList
    ]);
    setCircularTitle('');
    alert('تم رفع التعميم وتوجيهه بنجاح!');
  };

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

        {/* 🌟 شريط الترحيب والتحكم العلوي */}
        <div className="bg-white p-6 rounded-3xl shadow-md border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border-2 border-amber-400 flex items-center justify-center text-2xl shadow-inner">
              🏫
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full font-black uppercase">
                  مدير المدرسة (Super Admin)
                </span>
                <span className="text-[10px] bg-sky-100 text-sky-800 px-2.5 py-1 rounded-full font-black">
                  نهج الكايزن 2026
                </span>
              </div>
              <h1 className="text-xl font-black text-[#0B2545] mt-1">لوحة تحكم مدير المدرسة</h1>
              <p className="text-xs text-sky-700 font-bold">{principalName} — {schoolName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAr(!isAr)}
              className="bg-gray-100 hover:bg-gray-200 text-[#0B2545] px-4 py-2.5 rounded-2xl font-bold text-xs transition border border-gray-300 cursor-pointer"
            >
              🌐 {isAr ? 'English' : 'عربي'}
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-50 hover:bg-red-500 text-red-600 hover:text-white border border-red-200 px-5 py-2.5 rounded-2xl font-black text-xs transition shadow-sm cursor-pointer"
            >
              🚪 تسجيل الخروج
            </button>
          </div>
        </div>

        {/* 📑 شريط التنقل بين الأقسام */}
        <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl border border-gray-200 shadow-sm">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl font-black text-xs transition cursor-pointer ${activeTab === 'overview' ? 'bg-[#0B2545] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            📊 نظرة عامة ونسبة الإنجاز
          </button>
          <button
            onClick={() => setActiveTab('approvals')}
            className={`px-4 py-2.5 rounded-xl font-black text-xs transition cursor-pointer ${activeTab === 'approvals' ? 'bg-[#0B2545] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            👁️ معاينة واعتماد الشهادات والتقارير
          </button>
          <button
            onClick={() => setActiveTab('circulars')}
            className={`px-4 py-2.5 rounded-xl font-black text-xs transition cursor-pointer ${activeTab === 'circulars' ? 'bg-[#0B2545] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            📢 رفع وتوجيه التعاميم الإدارية
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2.5 rounded-xl font-black text-xs transition cursor-pointer ${activeTab === 'reports' ? 'bg-[#0B2545] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            🖨️ طباعة التقارير والإحصائيات
          </button>
          <button
            onClick={() => setActiveTab('activities')}
            className={`px-4 py-2.5 rounded-xl font-black text-xs transition cursor-pointer ${activeTab === 'activities' ? 'bg-[#0B2545] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            🌟 متابعة البرامج والمشاريع
          </button>
        </div>

        {/* 1️⃣ القسم الأول: نظرة عامة ونسبة الإنجاز */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-1">
                <span className="text-[10px] text-gray-400 font-bold block">إجمالي البرامج والمشاريع</span>
                <h3 className="text-2xl font-black text-[#0B2545]">20 برنامج</h3>
                <p className="text-[11px] text-emerald-600 font-bold">تم إنجاز: 17 برنامج (85%)</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-1">
                <span className="text-[10px] text-gray-400 font-bold block">الفعاليات قيد التنفيذ</span>
                <h3 className="text-2xl font-black text-sky-600">3 فعاليات</h3>
                <p className="text-[11px] text-sky-700 font-bold">تسير وفق الجدول الزمني</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-1">
                <span className="text-[10px] text-gray-400 font-bold block">شهادات تنتظر المعاينة</span>
                <h3 className="text-2xl font-black text-amber-600">6 شهادات</h3>
                <p className="text-[11px] text-amber-700 font-bold">تحتاج الاعتماد النهائي</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-1">
                <span className="text-[10px] text-gray-400 font-bold block">تقييم الجودة (كايزن)</span>
                <h3 className="text-2xl font-black text-emerald-700">96.5%</h3>
                <p className="text-[11px] text-gray-500 font-bold">مؤشر أداء متميز</p>
              </div>
            </div>

            {/* شريط الإنجاز التفصيلي */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
              <h3 className="text-sm font-black text-[#0B2545]">📈 تتبع نسب إنجاز الفعاليات والبرامج المدرسية</h3>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>مسابقة الهيئة الملكية للإلقاء والارتجال</span>
                    <span className="text-emerald-600">مُنجز (100%)</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>فعالية "ينبع تركض" الرياضية والمجتمعية</span>
                    <span className="text-emerald-600">مُنجز (100%)</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>معرض مشاريع الطلاب التقنية (كايزن)</span>
                    <span className="text-amber-600">قيد التنفيذ (75%)</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2️⃣ القسم الثاني: معاينة واعتماد الشهادات والتقارير */}
        {activeTab === 'approvals' && (
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-base font-black text-[#0B2545]">👁️ معاينة واعتماد الشهادات الشكر وتقدير والتقارير</h3>
            <p className="text-xs text-gray-500">قم بمعاينة تصميم الشهادات ومحتوى التقارير بدقة قبل منح الاعتماد الرسمي برقم التوثيق.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl border border-amber-200 bg-amber-50/40 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] bg-amber-200 text-amber-900 px-2.5 py-1 rounded-full font-bold">شهادة مشاركة</span>
                  <span className="text-xs text-gray-500">المرسل: أ. يوسف السقاف</span>
                </div>
                <h4 className="text-sm font-black text-[#0B2545]">شهادة شكر لطلاب الكشافة (المرحلة المتوسطة)</h4>
                <p className="text-xs text-gray-600 bg-white p-3 rounded-xl border border-amber-100 italic">
                  "تتقدم إدارة متوسطة ابن سينا بخالص الشكر والتقدير للطلاب المشاركين في الأنشطة الكشفية..."
                </p>
                <div className="flex gap-2 pt-2">
                  <button onClick={() => alert('تمت المعاينة بنجاح، جاري الاعتماد والتوقيع الرقمي.')} className="bg-sky-600 hover:bg-sky-700 text-white px-3.5 py-2 rounded-xl text-xs font-black cursor-pointer">معاينة كاملة</button>
                  <button onClick={() => alert('تم اعتماد الشهادة وختمها رسمياً!')} className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-black cursor-pointer">اعتماد وختم</button>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] bg-sky-200 text-sky-900 px-2.5 py-1 rounded-full font-bold">تقرير إداري</span>
                  <span className="text-xs text-gray-500">المرسل: لجنة التميز</span>
                </div>
                <h4 className="text-sm font-black text-[#0B2545]">تقرير إنجاز الأنشطة الفردية والجماعية للفصل الحالي</h4>
                <p className="text-xs text-gray-600 bg-white p-3 rounded-xl border border-gray-200 italic">
                  "يتضمن هذا التقرير احصائيات مفصلة عن مشاركات الطلاب في الأندية المدرسية والمسابقات..."
                </p>
                <div className="flex gap-2 pt-2">
                  <button onClick={() => alert('معاينة التقرير الإداري...')} className="bg-sky-600 hover:bg-sky-700 text-white px-3.5 py-2 rounded-xl text-xs font-black cursor-pointer">معاينة كاملة</button>
                  <button onClick={() => alert('تم اعتماد التقرير بنجاح!')} className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-black cursor-pointer">اعتماد وختم</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3️⃣ القسم الثالث: رفع وتوجيه التعاميم الإدارية */}
        {activeTab === 'circulars' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* نموذج رفع تعميم جديد */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4 lg:col-span-1">
              <h3 className="text-base font-black text-[#0B2545]">📢 رفع تعميم جديد</h3>
              <form onSubmit={handleUploadCircular} className="space-y-3 text-xs font-bold">
                <div>
                  <label className="text-gray-700 block mb-1">عنوان أو موضوع التعميم:</label>
                  <input
                    type="text"
                    placeholder="أدخل عنوان التعميم..."
                    value={circularTitle}
                    onChange={(e) => setCircularTitle(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-2xl p-3 text-[#0B2545] outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-gray-700 block mb-1">توجيه التعميم إلى:</label>
                  <select
                    value={circularTarget}
                    onChange={(e) => setCircularTarget(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-2xl p-3 text-[#0B2545] outline-none font-black"
                  >
                    <option value="all">الجميع (كافة منسوبي المدرسة)</option>
                    <option value="teachers">المعلمون ومشرفو الأندية</option>
                    <option value="activity_leader">رائد النشاط الطلابي فقط</option>
                    <option value="parents">أولياء الأمور</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-700 block mb-1">ملف التعميم (PDF أو صورة):</label>
                  <input
                    type="file"
                    onChange={(e) => setCircularFile(e.target.files?.[0]?.name || null)}
                    className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 cursor-pointer"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0B2545] hover:bg-blue-900 text-white font-black p-3.5 rounded-2xl text-xs transition shadow-sm cursor-pointer mt-2"
                >
                  🚀 نشر وتوجيه التعميم رسمياً
                </button>
              </form>
            </div>

            {/* أرشيف التعاميم الموجهة */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4 lg:col-span-2">
              <h3 className="text-base font-black text-[#0B2545]">🗂️ أرشيف التعاميم الإدارية الصادرة</h3>
              <p className="text-xs text-gray-500">التعاميم والتوجهات الصادرة من مكتب مدير المدرسة والجهة المستهدفة لها.</p>
              
              <div className="space-y-3 pt-2">
                {circularsList.map((item, index) => (
                  <div key={index} className="p-4 rounded-2xl border border-gray-200 bg-gray-50 flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-black text-[#0B2545]">{item.title}</h4>
                      <div className="flex gap-2 mt-1">
                        <span className="text-[10px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded-md font-bold">موجه إلى: {item.target}</span>
                        <span className="text-[10px] text-gray-400 font-medium">التاريخ: {item.date}</span>
                      </div>
                    </div>
                    <button onClick={() => alert('جاري تحميل وعرض التعميم...')} className="bg-white border border-gray-300 hover:bg-gray-100 text-[#0B2545] px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer">
                      عرض
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4️⃣ القسم الرابع: طباعة التقارير والاحصائيات */}
        {activeTab === 'reports' && (
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-base font-black text-[#0B2545]">🖨️ طباعة التقارير والإحصائيات الشاملة</h3>
            <p className="text-xs text-gray-500">استخراج تقارير أداء الأنشطة، الإنجازات، والتقارير الدورية المعتمدة.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50 space-y-3">
                <h4 className="text-sm font-black text-[#0B2545]">📊 تقرير الإنجاز العام</h4>
                <p className="text-xs text-gray-500">تقرير شامل يتضمن نسبة إنجاز البرامج والفعاليات والأنشطة.</p>
                <button onClick={() => window.print()} className="w-full bg-[#0B2545] text-white p-2.5 rounded-xl text-xs font-black cursor-pointer">طباعة التقرير العام</button>
              </div>

              <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50 space-y-3">
                <h4 className="text-sm font-black text-[#0B2545]">🌟 تقرير أنشطة الطلاب</h4>
                <p className="text-xs text-gray-500">حصاد الأنشطة الفردية والجماعية وتكريم الطلاب الفائزين.</p>
                <button onClick={() => window.print()} className="w-full bg-[#0B2545] text-white p-2.5 rounded-xl text-xs font-black cursor-pointer">طباعة تقرير الأنشطة</button>
              </div>

              <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50 space-y-3">
                <h4 className="text-sm font-black text-[#0B2545]">📜 تقرير التواصل مع أولياء الأمور</h4>
                <p className="text-xs text-gray-500">ملخص الموافقات الرقمية، اللقاءات، والتواصل الفعّال.</p>
                <button onClick={() => window.print()} className="w-full bg-[#0B2545] text-white p-2.5 rounded-xl text-xs font-black cursor-pointer">طباعة تقرير التواصل</button>
              </div>
            </div>
          </div>
        )}

        {/* 5️⃣ القسم الخامس: متابعة البرامج والمشاريع */}
        {activeTab === 'activities' && (
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-base font-black text-[#0B2545]">🌟 المتابعة التفصيلية للبرامج والمشاريع</h3>
            <p className="text-xs text-gray-500">متابعة ما تم إنجازه وما لم يُنجز من الفعاليات الكبرى لمتوسطة ابن سينا.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 space-y-2">
                <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2.5 py-1 rounded-full font-bold">مُنجز بالكامل</span>
                <h4 className="text-sm font-black text-[#0B2545]">مسابقة الهيئة الملكية للإلقاء والارتجال</h4>
                <p className="text-xs text-gray-600">تكريم الطلاب الفائزين (سلطان الشهري، عبدالرحمن فاروق، عيسى أوغيس) بحضور رائد النشاط.</p>
              </div>

              <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/50 space-y-2">
                <span className="text-[10px] bg-amber-200 text-amber-900 px-2.5 py-1 rounded-full font-bold">قيد الإعداد والتطوير</span>
                <h4 className="text-sm font-black text-[#0B2545]">حفل تكريم خريجي الصف الثالث المتوسط 2026</h4>
                <p className="text-xs text-gray-600">تجهيز ألبومات الشرائح الرقمية ومقاطع الفيديو الترحيبية للطلاب الخريجين.</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}