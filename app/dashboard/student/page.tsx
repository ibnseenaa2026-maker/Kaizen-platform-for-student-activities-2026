'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function StudentDashboard() {
  const { isAr, toggleLanguage } = useLanguage();
  const router = useRouter();

  // حالة إكمال السجل الشامل
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  // بيانات السجل الشامل الكاملة (شاملة العمر والبيانات الصحية وتفاصيل السكن والمهارات)
  const [profileData, setProfileData] = useState({
    fullNameAr: 'أحمد بن محمد العتيبي',
    fullNameEn: 'Ahmed Mohammed Al-Otaibi',
    nationalId: '1098765432',
    age: '14', // ➕ العمر
    nationality: 'سعودي',
    gradeClass: 'الثالث المتوسط — الفصل (3/1)',
    phone: '0551234567',
    district: 'حي الشاطئ',
    street: 'شارع الأمير مقرن',
    building: '45',
    // ➕ البيانات الصحية الشاملة
    bloodType: 'O+',
    healthCondition: 'سليم ولله الحمد (لا توجد أمراض مزمنة)',
    allergies: 'لا توجد حساسيات معروفة',
    medications: 'لا توجد أدوية منتظمة',
    socialStatus: 'يعيش مع الوالدين الكريمين',
    guardianRelation: 'الأب',
    emergencyContact: '0509876543',
    hobbies: 'القراءة، الخط العربي، البرمجة',
    talents: 'الإلقاء والارتجال، التصميم الرقمي',
    techSkills: 'استخدام المنصات التعليمية، برامج التصميم',
  });

  // التبويب النشط
  const [activeTab, setActiveTab] = useState<'profile' | 'submissions' | 'events' | 'clubs' | 'store'>('profile');

  // نموذج إرسال مشاركة جديدة من قِبل الطالب
  const [newSubForm, setNewSubForm] = useState({
    title: '',
    category: 'مسابقة إلقاء',
    description: '',
    linkOrProof: '',
  });

  // قائمة مشاركات الطالب (الحالات المحدثة: pending, approved, rejected)
  const [submissions, setSubmissions] = useState<Array<{
    id: number;
    title: string;
    category: string;
    description: string;
    linkOrProof: string;
    status: 'pending' | 'approved' | 'rejected';
    pointsReward: number;
    date: string;
  }>>([
    {
      id: 1,
      title: 'مشاركة في مسابقة الإلقاء والارتجال',
      category: 'مسابقة إلقاء',
      description: 'قصيدة عن حب الوطن والإنجازات',
      linkOrProof: 'https://example.com/video1',
      status: 'approved', // مقبولة وتضاف لرصيد النقاط الفعلي
      pointsReward: 40,
      date: '2026-05-10',
    },
    {
      id: 2,
      title: 'بحث علمي مصغر عن الطاقة المتجددة',
      category: 'بحث علمي',
      description: 'مشروع ابتكار مدرسي',
      linkOrProof: 'https://example.com/research',
      status: 'pending', // معلقة (لا تضاف للنقاط حتى تُعتمد)
      pointsReward: 50,
      date: '2026-05-18',
    },
  ]);

  // قائمة الجماعات والأندية الطلابية
  const [clubs, setClubs] = useState([
    { id: 1, name: 'نادي الخط العربي والرسم', advisor: 'معلم التربية الفنية', joined: false },
    { id: 2, name: 'جماعة الإذاعة والإلقاء', advisor: 'رائد النشاط: أ. يوسف السقاف', joined: true },
    { id: 3, name: 'النادي العلمي والمبتكرين', advisor: 'معلم العلوم', joined: false },
    { id: 4, name: 'جماعة الكشافة المدرسية', advisor: 'قائد الكشافة', joined: false },
  ]);

  // قائمة الفعاليات والمسابقات
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'مسابقة الهيئة الملكية للإلقاء والارتجال 🎤',
      date: '2026-05-20',
      pointsReward: 40,
      description: 'مسابقة تنافسية لإبراز مواهب الطلاب في الخطابة والإلقاء.',
      registered: true,
    },
    {
      id: 2,
      title: 'فعالية ينبع تركض الرياضية 🏃‍♂️',
      date: '2026-05-25',
      pointsReward: 30,
      description: 'مبادرة رياضية مجتمعية لتعزيز الصحة والنشاط البدني.',
      registered: false,
    },
  ]);

  // متجر الجوائز
  const rewardsList = [
    { id: 1, title: 'بطاقة قائد اليوم في نشاط الفصل 🏷️', pointsCost: 100, category: 'امتياز معنوي' },
    { id: 2, title: 'شهادة شكر وتقدير معتمدة من النشاط 🎓', pointsCost: 150, category: 'تكريم رقمي' },
    { id: 3, title: 'وسام الطالب المتميز بالبروفايل 🏅', pointsCost: 200, category: 'وسام رقمي' },
    { id: 4, title: 'قسيمة مجانية من المقصف المدرسي ☕', pointsCost: 250, category: 'قسيمة عينية' },
  ];

  // 🧮 حساب رصيد النقاط الفعلي: (النقاط التأسيسية 50 للسجل + مجموع نقاط المشاركات approved فقط)
  const basePoints = isProfileComplete ? 50 : 0;
  const submissionsApprovedPoints = submissions
    .filter((sub) => sub.status === 'approved')
    .reduce((acc, curr) => acc + curr.pointsReward, 0);

  const pointsBalance = basePoints + submissionsApprovedPoints;

  // حفظ السجل الشامل
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileData.fullNameAr || !profileData.nationalId || !profileData.age || !profileData.district) {
      alert(isAr ? 'الرجاء إكمال كافة الحقول الأساسية المطلوبة!' : 'Please fill all required fields!');
      return;
    }
    setIsProfileComplete(true);
    alert(isAr ? 'تم اعتماد السجل الشامل الكامل بنجاح! وحصلت على +50 نقطة تميز 🌟' : 'Profile saved successfully! +50 points 🌟');
  };

  // 📤 إرسال مشاركة جديدة من قِبل الطالب (تُضاف بحالة pending معلق افتراضياً)
  const handleCreateSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubForm.title || !newSubForm.description) {
      alert(isAr ? 'يرجى كتابة عنوان ووصف المشاركة على الأقل!' : 'Please provide title and description!');
      return;
    }

    const newEntry = {
      id: Date.now(),
      title: newSubForm.title,
      category: newSubForm.category,
      description: newSubForm.description,
      linkOrProof: newSubForm.linkOrProof || 'لا يوجد رابط مرفق',
      status: 'pending' as const,
      pointsReward: 35,
      date: new Date().toISOString().split('T')[0],
    };

    setSubmissions([newEntry, ...submissions]);
    setNewSubForm({ title: '', category: 'مسابقة إلقاء', description: '', linkOrProof: '' });
    alert(isAr ? 'تم إرسال مشاركتك بنجاح! وهي الآن بانتظار مراجعة وموافقة رائد النشاط (معلق ⏳).' : 'Submission sent! Status is pending review.');
  };

  const handlePrintRecord = () => window.print();
  const handleLogout = () => router.push('/login');

  const handleJoinClub = (clubId: number) => {
    setClubs(clubs.map(c => c.id === clubId ? { ...c, joined: true } : c));
    alert(isAr ? 'تم الانضمام للنادي بنجاح!' : 'Joined club successfully!');
  };

  const handleRegisterEvent = (eventId: number, title: string) => {
    setEvents(events.map(ev => ev.id === eventId ? { ...ev, registered: true } : ev));
    alert(isAr ? `تم التسجيل في (${title}) بنجاح!` : 'Registered successfully!');
  };

  const handleRedeemReward = (title: string, cost: number) => {
    if (pointsBalance < cost) {
      alert(isAr ? `رصيدك الفعلي (${pointsBalance} نقطة) لا يكفي لاستبدال هذه المكافأة (${cost} نقطة).` : 'Insufficient points!');
      return;
    }
    alert(isAr ? `تم استبدال (${title}) بنجاح! راجع الأستاذ يوسف السقاف لاستلامها.` : 'Reward redeemed successfully!');
  };

  return (
    <div className="min-h-screen bg-[#F4EAD3]/20 text-[#0B2545] p-4 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ترويسة اللوحة */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-3xl shadow-sm border border-gray-100 print:hidden">
          <div className="flex items-center gap-3">
            <img src="/لوقو_التطبيق_page-0001-removebg-preview.png" alt="شعار كايزن" className="w-12 h-12 object-contain" />
            <div>
              <h1 className="text-lg font-black text-[#0B2545]">{isAr ? 'برنامج كايزن — لوحة الطالب' : 'Kaizen Program'}</h1>
              <p className="text-xs text-[#00B4D8] font-bold mt-0.5">{isAr ? 'متوسطة ابن سينا - الهيئة الملكية بينبع' : 'Ibn Sina Middle School'}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button onClick={handlePrintRecord} type="button" className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-2xl font-black text-xs transition flex items-center gap-1.5 shadow-sm">
              🖨️ {isAr ? 'طباعة السجل الرسمي' : 'Print Record'}
            </button>
            <button onClick={toggleLanguage} type="button" className="bg-amber-100 hover:bg-amber-200 text-[#0B2545] px-3.5 py-2 rounded-2xl font-black text-xs transition border border-amber-300">
              🌐 {isAr ? 'English' : 'عربي'}
            </button>
            <button onClick={handleLogout} type="button" className="bg-red-50 hover:bg-red-500 text-red-600 hover:text-white border border-red-200 px-3.5 py-2 rounded-2xl font-black text-xs transition shadow-sm">
              🚪 {isAr ? 'خروج' : 'Logout'}
            </button>
          </div>
        </div>

        {/* نموذج استكمال السجل الشامل (يظهر في البداية أو عند التعديل) */}
        {!isProfileComplete ? (
          <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-lg border border-amber-200 space-y-6">
            <div className="text-center space-y-2 border-b pb-4">
              <span className="bg-amber-100 text-amber-900 text-xs font-black px-3 py-1 rounded-full">بوابة استكمال السجل الشامل للطالب 📋</span>
              <h2 className="text-2xl font-black text-[#0B2545]">استمارة السجل الشامل (شاملة العمر والبيانات الصحية)</h2>
              <p className="text-xs text-gray-500 font-bold">يرجى تعبئة كافة الحقول أدناه بدقة لاعتماد سجلك الرسمي والحصول على (+50 نقطة)</p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-6 text-xs font-bold">
              
              {/* 1. البيانات الشخصية والأساسية */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-3">
                <h3 className="text-sm font-black text-[#0B2545] border-b pb-2">👤 1. البيانات الشخصية والعمر</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-gray-700 block mb-1">اسم الطالب بالعربي (الرباعي) *</label>
                    <input type="text" value={profileData.fullNameAr} onChange={(e) => setProfileData({ ...profileData, fullNameAr: e.target.value })} className="w-full bg-white border border-gray-300 rounded-xl p-2.5" required />
                  </div>
                  <div>
                    <label className="text-gray-700 block mb-1">اسم الطالب بالإنجليزية *</label>
                    <input type="text" value={profileData.fullNameEn} onChange={(e) => setProfileData({ ...profileData, fullNameEn: e.target.value })} className="w-full bg-white border border-gray-300 rounded-xl p-2.5" required />
                  </div>
                  <div>
                    <label className="text-gray-700 block mb-1">رقم الهوية الوطنية / الإقامة *</label>
                    <input type="text" value={profileData.nationalId} onChange={(e) => setProfileData({ ...profileData, nationalId: e.target.value })} className="w-full bg-white border border-gray-300 rounded-xl p-2.5" required />
                  </div>
                  <div>
                    <label className="text-gray-700 block mb-1">العمر (بالسنوات) *</label>
                    <input type="number" placeholder="مثال: 14" value={profileData.age} onChange={(e) => setProfileData({ ...profileData, age: e.target.value })} className="w-full bg-white border border-gray-300 rounded-xl p-2.5" required />
                  </div>
                  <div>
                    <label className="text-gray-700 block mb-1">الصف والشعبة *</label>
                    <input type="text" value={profileData.gradeClass} onChange={(e) => setProfileData({ ...profileData, gradeClass: e.target.value })} className="w-full bg-white border border-gray-300 rounded-xl p-2.5" required />
                  </div>
                  <div>
                    <label className="text-gray-700 block mb-1">رقم جوال الطالب *</label>
                    <input type="tel" value={profileData.phone} onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })} className="w-full bg-white border border-gray-300 rounded-xl p-2.5" required />
                  </div>
                  <div>
                    <label className="text-gray-700 block mb-1">الجنسية</label>
                    <input type="text" value={profileData.nationality} onChange={(e) => setProfileData({ ...profileData, nationality: e.target.value })} className="w-full bg-white border border-gray-300 rounded-xl p-2.5" />
                  </div>
                </div>
              </div>

              {/* 2. السجل والبيانات الصحية الشاملة */}
              <div className="bg-red-50/50 p-4 rounded-2xl border border-red-200 space-y-3">
                <h3 className="text-sm font-black text-red-900 border-b border-red-200 pb-2">🏥 2. السجل والبيانات الصحية الشاملة</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-700 block mb-1">فصيلة الدم (Blood Type)</label>
                    <select value={profileData.bloodType} onChange={(e) => setProfileData({ ...profileData, bloodType: e.target.value })} className="w-full bg-white border border-gray-300 rounded-xl p-2.5">
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-700 block mb-1">الحالة الصحية العامة / الأمراض المزمنة</label>
                    <input type="text" placeholder="سليم ولله الحمد، ربو، سكري..." value={profileData.healthCondition} onChange={(e) => setProfileData({ ...profileData, healthCondition: e.target.value })} className="w-full bg-white border border-gray-300 rounded-xl p-2.5" />
                  </div>
                  <div>
                    <label className="text-gray-700 block mb-1">الحساسيات (أدوية، أطعمة، أخرى)</label>
                    <input type="text" placeholder="لا توجد حساسيات معروفة..." value={profileData.allergies} onChange={(e) => setProfileData({ ...profileData, allergies: e.target.value })} className="w-full bg-white border border-gray-300 rounded-xl p-2.5" />
                  </div>
                  <div>
                    <label className="text-gray-700 block mb-1">الأدوية المستخدمة بانتظام</label>
                    <input type="text" placeholder="لا توجد أدوية منتظمة..." value={profileData.medications} onChange={(e) => setProfileData({ ...profileData, medications: e.target.value })} className="w-full bg-white border border-gray-300 rounded-xl p-2.5" />
                  </div>
                </div>
              </div>

              {/* 3. العنوان والسكن وتواصل الطوارئ */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-3">
                <h3 className="text-sm font-black text-[#0B2545] border-b pb-2">🏠 3. السكن والعنوان وتواصل الطوارئ</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-gray-700 block mb-1">الحي السكني *</label>
                    <input type="text" value={profileData.district} onChange={(e) => setProfileData({ ...profileData, district: e.target.value })} className="w-full bg-white border border-gray-300 rounded-xl p-2.5" required />
                  </div>
                  <div>
                    <label className="text-gray-700 block mb-1">اسم أو رقم الشارع</label>
                    <input type="text" value={profileData.street} onChange={(e) => setProfileData({ ...profileData, street: e.target.value })} className="w-full bg-white border border-gray-300 rounded-xl p-2.5" />
                  </div>
                  <div>
                    <label className="text-gray-700 block mb-1">رقم المبنى / المنزل</label>
                    <input type="text" value={profileData.building} onChange={(e) => setProfileData({ ...profileData, building: e.target.value })} className="w-full bg-white border border-gray-300 rounded-xl p-2.5" />
                  </div>
                  <div>
                    <label className="text-gray-700 block mb-1">الحالة الاجتماعية والعائلية</label>
                    <input type="text" value={profileData.socialStatus} onChange={(e) => setProfileData({ ...profileData, socialStatus: e.target.value })} className="w-full bg-white border border-gray-300 rounded-xl p-2.5" />
                  </div>
                  <div>
                    <label className="text-gray-700 block mb-1">صلة ولي الأمر</label>
                    <input type="text" value={profileData.guardianRelation} onChange={(e) => setProfileData({ ...profileData, guardianRelation: e.target.value })} className="w-full bg-white border border-gray-300 rounded-xl p-2.5" />
                  </div>
                  <div>
                    <label className="text-gray-700 block mb-1">رقم هاتف الطوارئ لولي الأمر *</label>
                    <input type="tel" value={profileData.emergencyContact} onChange={(e) => setProfileData({ ...profileData, emergencyContact: e.target.value })} className="w-full bg-white border border-gray-300 rounded-xl p-2.5" required />
                  </div>
                </div>
              </div>

              {/* 4. الهوايات والمهارات */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-3">
                <h3 className="text-sm font-black text-[#0B2545] border-b pb-2">💡 4. الهوايات والمواهب والمهارات التقنية</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-gray-700 block mb-1">الهوايات والميول</label>
                    <input type="text" value={profileData.hobbies} onChange={(e) => setProfileData({ ...profileData, hobbies: e.target.value })} className="w-full bg-white border border-gray-300 rounded-xl p-2.5" />
                  </div>
                  <div>
                    <label className="text-gray-700 block mb-1">المواهب الخاصة</label>
                    <input type="text" value={profileData.talents} onChange={(e) => setProfileData({ ...profileData, talents: e.target.value })} className="w-full bg-white border border-gray-300 rounded-xl p-2.5" />
                  </div>
                  <div>
                    <label className="text-gray-700 block mb-1">المهارات التقنية</label>
                    <input type="text" value={profileData.techSkills} onChange={(e) => setProfileData({ ...profileData, techSkills: e.target.value })} className="w-full bg-white border border-gray-300 rounded-xl p-2.5" />
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full bg-[#0B2545] hover:bg-[#00B4D8] text-white p-3.5 rounded-2xl font-black text-sm shadow-lg transition">
                اعتماد السجل الشامل بالكامل وحفظ البيانات (+50 نقطة) 🚀
              </button>
            </form>
          </div>
        ) : (

          /* اللوحة الرئيسية للطالب مع السجل الشامل الكامل */
          <div className="space-y-6">

            {/* بانر الترحيب ورصيد النقاط الفعلي */}
            <div className="print:hidden bg-gradient-to-r from-[#0B2545] to-[#134074] text-white p-6 rounded-3xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="bg-[#00B4D8] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  برنامج كايزن .. طور خطواتك 🚀
                </span>
                <h2 className="text-xl lg:text-2xl font-black mt-2">
                  أهلاً بك، {profileData.fullNameAr}
                </h2>
                <p className="text-xs text-blue-200 mt-1 font-bold">
                  {profileData.gradeClass} | متوسطة ابن سينا بالهيئة الملكية بينبع
                </p>
              </div>

              {/* رصيد النقاط الفعلي المعتمد فقط (approved) */}
              <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 text-center flex items-center gap-3">
                <span className="text-3xl">🎖️</span>
                <div>
                  <div className="text-2xl font-black text-amber-300">{pointsBalance}</div>
                  <div className="text-[11px] text-gray-200 font-bold">رصيد النقاط الفعلي (المعتمد)</div>
                </div>
              </div>
            </div>

            {/* أزرار التبويبات */}
            <div className="print:hidden flex flex-wrap gap-2 border-b pb-3">
              <button onClick={() => setActiveTab('profile')} className={`px-4 py-2.5 rounded-2xl font-black text-xs transition ${activeTab === 'profile' ? 'bg-[#0B2545] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
                📋 السجل الشامل الرسمي
              </button>
              <button onClick={() => setActiveTab('submissions')} className={`px-4 py-2.5 rounded-2xl font-black text-xs transition ${activeTab === 'submissions' ? 'bg-[#0B2545] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
                📥 مشاركاتي وإرسال عمل
              </button>
              <button onClick={() => setActiveTab('events')} className={`px-4 py-2.5 rounded-2xl font-black text-xs transition ${activeTab === 'events' ? 'bg-[#0B2545] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
                📣 المسابقات والفعاليات
              </button>
              <button onClick={() => setActiveTab('clubs')} className={`px-4 py-2.5 rounded-2xl font-black text-xs transition ${activeTab === 'clubs' ? 'bg-[#0B2545] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
                🎯 الأندية والجماعات
              </button>
              <button onClick={() => setActiveTab('store')} className={`px-4 py-2.5 rounded-2xl font-black text-xs transition ${activeTab === 'store' ? 'bg-amber-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
                🎁 متجر الجوائز
              </button>
            </div>

            {/* 📋 تبويب السجل الشامل الرسمي المفصل */}
            {activeTab === 'profile' && (
              <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-sm border border-gray-200 space-y-6">
                <div className="flex justify-between items-center border-b pb-4">
                  <div>
                    <span className="bg-emerald-100 text-emerald-900 text-xs font-black px-3 py-1 rounded-full">سجل رسمي معتمد ✓</span>
                    <h3 className="text-xl font-black text-[#0B2545] mt-2">السجل الشامل للطالب بمتوسطة ابن سينا</h3>
                  </div>
                  <button onClick={() => setIsProfileComplete(false)} className="print:hidden text-xs bg-gray-100 hover:bg-gray-200 text-[#0B2545] px-3 py-2 rounded-xl font-black transition">
                    ✏️ تعديل بيانات السجل
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold">
                  
                  {/* البطاقة الأولى: البيانات الشخصية والعمر */}
                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-3">
                    <h4 className="text-sm font-black text-[#0B2545] border-b pb-2">👤 البيانات الشخصية والعمر</h4>
                    <div className="space-y-2 text-gray-700">
                      <p><span className="text-gray-400">الاسم بالعربي:</span> {profileData.fullNameAr}</p>
                      <p><span className="text-gray-400">الاسم بالإنجليزية:</span> {profileData.fullNameEn}</p>
                      <p><span className="text-gray-400">رقم الهوية:</span> {profileData.nationalId}</p>
                      <p><span className="text-gray-400">العمر:</span> {profileData.age} سنوات</p>
                      <p><span className="text-gray-400">الجنسية:</span> {profileData.nationality}</p>
                      <p><span className="text-gray-400">الصف الدراسي:</span> {profileData.gradeClass}</p>
                      <p><span className="text-gray-400">رقم جوال الطالب:</span> {profileData.phone}</p>
                    </div>
                  </div>

                  {/* البطاقة الثانية: السجل والبيانات الصحية */}
                  <div className="bg-red-50/40 p-5 rounded-2xl border border-red-200 space-y-3">
                    <h4 className="text-sm font-black text-red-900 border-b border-red-200 pb-2">🏥 السجل والبيانات الصحية الشاملة</h4>
                    <div className="space-y-2 text-gray-700">
                      <p><span className="text-gray-400">فصيلة الدم:</span> <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded font-black">{profileData.bloodType}</span></p>
                      <p><span className="text-gray-400">الحالة الصحية العامة:</span> {profileData.healthCondition}</p>
                      <p><span className="text-gray-400">الحساسيات:</span> {profileData.allergies}</p>
                      <p><span className="text-gray-400">الأدوية المنتظمة:</span> {profileData.medications}</p>
                    </div>
                  </div>

                  {/* البطاقة الثالثة: العنوان والسكن */}
                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-3">
                    <h4 className="text-sm font-black text-[#0B2545] border-b pb-2">🏠 العنوان والسكن وتواصل الطوارئ</h4>
                    <div className="space-y-2 text-gray-700">
                      <p><span className="text-gray-400">الحي السكني:</span> {profileData.district}</p>
                      <p><span className="text-gray-400">الشارع:</span> {profileData.street}</p>
                      <p><span className="text-gray-400">رقم المبنى:</span> {profileData.building}</p>
                      <p><span className="text-gray-400">الحالة الاجتماعية:</span> {profileData.socialStatus}</p>
                      <p><span className="text-gray-400">صلة ولي الأمر:</span> {profileData.guardianRelation}</p>
                      <p><span className="text-gray-400">جوال الطوارئ:</span> {profileData.emergencyContact}</p>
                    </div>
                  </div>

                  {/* البطاقة الرابعة: الهوايات والمهارات */}
                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-3">
                    <h4 className="text-sm font-black text-[#0B2545] border-b pb-2">💡 المهارات والهوايات والمواهب</h4>
                    <div className="space-y-2 text-gray-700">
                      <p><span className="text-gray-400">الهوايات والميول:</span> {profileData.hobbies}</p>
                      <p><span className="text-gray-400">المواهب الخاصة:</span> {profileData.talents}</p>
                      <p><span className="text-gray-400">المهارات التقنية:</span> {profileData.techSkills}</p>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* 📥 تبويب مشاركاتي وإرسال عمل جديد */}
            {activeTab === 'submissions' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* نموذج إرسال مشاركة جديدة */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4 lg:col-span-1 print:hidden">
                  <div className="border-b pb-3">
                    <h3 className="font-black text-sm text-[#0B2545]">📤 إرسال مشاركة أو إنجاز جديد</h3>
                    <p className="text-[11px] text-gray-500 mt-0.5">تخضع للمراجعة لتُضاف للنقاط عند الاعتماد.</p>
                  </div>

                  <form onSubmit={handleCreateSubmission} className="space-y-3.5 text-xs font-bold">
                    <div>
                      <label className="text-gray-700 block mb-1">عنوان المشاركة *</label>
                      <input type="text" placeholder="مثال: بحث، قصيدة، لوحة فنية" value={newSubForm.title} onChange={(e) => setNewSubForm({ ...newSubForm, title: e.target.value })} className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5" required />
                    </div>

                    <div>
                      <label className="text-gray-700 block mb-1">تصنيف المشاركة</label>
                      <select value={newSubForm.category} onChange={(e) => setNewSubForm({ ...newSubForm, category: e.target.value })} className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5">
                        <option value="مسابقة إلقاء">مسابقة إلقاء وارتجال</option>
                        <option value="بحث علمي">بحث علمي أو ابتكار</option>
                        <option value="عمل تطوعي">عمل تطوعي ومجتمعي</option>
                        <option value="نشاط فني">نشاط فني أو خط عربي</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-gray-700 block mb-1">وصف موجز *</label>
                      <textarea placeholder="تفاصيل المشاركة..." value={newSubForm.description} onChange={(e) => setNewSubForm({ ...newSubForm, description: e.target.value })} rows={3} className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5" required />
                    </div>

                    <div>
                      <label className="text-gray-700 block mb-1">رابط المشاركة / الملف المرفق</label>
                      <input type="url" placeholder="https://..." value={newSubForm.linkOrProof} onChange={(e) => setNewSubForm({ ...newSubForm, linkOrProof: e.target.value })} className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5" />
                    </div>

                    <button type="submit" className="w-full bg-[#0B2545] hover:bg-[#00B4D8] text-white p-3 rounded-xl font-black text-xs shadow-md transition">
                      إرسال للمراجعة (معلق ⏳)
                    </button>
                  </form>
                </div>

                {/* قائمة المشاركات والحالات المحدثة */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4 lg:col-span-2">
                  <div className="flex justify-between items-center border-b pb-3">
                    <h3 className="font-black text-sm text-[#0B2545]">سجل مشاركاتي والحالات المحدثة</h3>
                    <span className="text-xs text-gray-500 font-bold">عدد المشاركات: {submissions.length}</span>
                  </div>

                  <div className="space-y-3">
                    {submissions.map((sub) => (
                      <div key={sub.id} className="p-4 rounded-2xl border border-gray-200 bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-black text-xs text-[#0B2545]">{sub.title}</h4>
                            <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-md">{sub.category}</span>
                          </div>
                          <p className="text-xs text-gray-600">{sub.description}</p>
                          <p className="text-[10px] text-gray-400 font-mono">تاريخ الإرسال: {sub.date}</p>
                        </div>

                        <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                          {sub.status === 'approved' && (
                            <span className="bg-emerald-100 text-emerald-800 font-black text-[11px] px-3 py-1 rounded-full border border-emerald-300">
                              ✓ مقبول (+{sub.pointsReward} نقطة مضافة للرصيد)
                            </span>
                          )}
                          {sub.status === 'pending' && (
                            <span className="bg-amber-100 text-amber-800 font-black text-[11px] px-3 py-1 rounded-full border border-amber-300">
                              ⏳ معلق (بانتظار موافقة المشرف)
                            </span>
                          )}
                          {sub.status === 'rejected' && (
                            <span className="bg-red-100 text-red-800 font-black text-[11px] px-3 py-1 rounded-full border border-red-300">
                              ✕ مرفوض
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* 📣 المسابقات والفعاليات */}
            {activeTab === 'events' && (
              <div className="print:hidden bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                <h3 className="font-black text-sm text-[#0B2545] border-b pb-3">المسابقات والفعاليات المتاحة</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {events.map((ev) => (
                    <div key={ev.id} className="p-4 rounded-2xl border border-gray-200 bg-gray-50 flex flex-col justify-between gap-3">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-black text-sm text-[#0B2545]">{ev.title}</h4>
                          <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2.5 py-1 rounded-full">+{ev.pointsReward} نقطة</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">{ev.description}</p>
                      </div>
                      <button onClick={() => handleRegisterEvent(ev.id, ev.title)} disabled={ev.registered} type="button" className={`w-full py-2.5 rounded-xl font-black text-xs transition ${ev.registered ? 'bg-emerald-100 text-emerald-800 cursor-not-allowed' : 'bg-[#0B2545] hover:bg-[#00B4D8] text-white'}`}>
                        {ev.registered ? '✓ تم التسجيل بنجاح' : 'التسجيل بالفعالية 🚀'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 🎯 الأندية والجماعات */}
            {activeTab === 'clubs' && (
              <div className="print:hidden bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                <h3 className="font-black text-sm text-[#0B2545] border-b pb-3">الأندية والجماعات المدرسية</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {clubs.map((club) => (
                    <div key={club.id} className="p-4 rounded-2xl border border-gray-200 bg-gray-50 flex flex-col justify-between gap-3">
                      <div>
                        <h4 className="font-black text-sm text-[#0B2545]">{club.name}</h4>
                        <p className="text-xs text-gray-600 mt-1">المشرف: {club.advisor}</p>
                      </div>
                      <button onClick={() => handleJoinClub(club.id)} disabled={club.joined} type="button" className={`w-full py-2.5 rounded-xl font-black text-xs transition ${club.joined ? 'bg-emerald-100 text-emerald-800 cursor-not-allowed' : 'bg-[#00B4D8] hover:bg-[#0077B6] text-white'}`}>
                        {club.joined ? '✓ مشترك بالفعل' : 'الانضمام للنادي'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 🎁 متجر الجوائز */}
            {activeTab === 'store' && (
              <div className="print:hidden bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <h3 className="font-black text-sm text-[#0B2545]">متجر المكافآت والتميز</h3>
                  <span className="text-xs font-bold text-amber-600">رصيدك الفعلي المعتمد: {pointsBalance} نقطة</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {rewardsList.map((reward) => (
                    <div key={reward.id} className="p-4 rounded-2xl border border-amber-200 bg-amber-50/30 flex flex-col justify-between gap-3">
                      <div>
                        <span className="text-[10px] bg-amber-100 text-amber-900 font-black px-2 py-0.5 rounded-full">{reward.category}</span>
                        <h4 className="font-black text-xs text-[#0B2545] mt-2">{reward.title}</h4>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-amber-100">
                        <span className="text-xs font-black text-amber-700">{reward.pointsCost} نقطة</span>
                        <button onClick={() => handleRedeemReward(reward.title, reward.pointsCost)} type="button" className="bg-[#0B2545] hover:bg-amber-600 text-white px-3 py-1.5 rounded-xl font-black text-xs transition shadow-sm">
                          استبدال 🎁
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}