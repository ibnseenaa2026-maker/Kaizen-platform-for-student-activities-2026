'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import DashboardHeader from '@/components/DashboardHeader';

export default function ActivityLeaderDashboard() {
  const { dir, isAr } = useLanguage();

  // ==========================================
  // 1. تقارير المعلمين الواردة للاطلاع والاعتماد
  // ==========================================
  const [teacherReports, setTeacherReports] = useState([
    { id: 101, teacherName: 'أحمد محمود السالم', activityTitle: 'ورشة الخط العربي والتصميم', date: '2026-05-12', details: 'تم تنفيذ الورشة لـ 30 طالباً وتوزيع أدوات الخط العربي.', status: 'بانتظار الاعتماد' },
    { id: 102, teacherName: 'خالد عبدالله عمر', activityTitle: 'دوري كرة القدم الخماسي', date: '2026-05-08', details: 'مشاركة 8 فصول وتكريم الفريق الفائز.', status: 'معتمد' },
    { id: 103, teacherName: 'فهد إبراهيم الزهراني', activityTitle: 'معرض التجارب الفيزيائية الممتعة', date: '2026-05-15', details: 'تجارب تفاعلية في معمل العلوم ومشاركة 50 طالباً.', status: 'بانتظار الاعتماد' },
  ]);

  // ==========================================
  // 2. تقارير الأنشطة المرفوعة لمدير المدرسة (الأستاذ نايف العتيبي)
  // ==========================================
  const [activityReportsToPrincipal, setActivityReportsToPrincipal] = useState([
    { id: 1, title: 'التقرير الختامي لفعالية ينبع تركض 2026', category: 'نشاط رياضي وصحي', executedDate: '2026-05-02', status: 'جاهز للرفع', notes: 'يتضمن إحصائيات المشاركة والصور الفوتوغرافية' },
    { id: 2, title: 'تقرير نتائج مسابقة الإلقاء والارتجال (الهيئة الملكية)', category: 'نشاط ثقافي', executedDate: '2026-05-10', status: 'تم الرفع للمدير', notes: 'أسماء الطلاب الفائزين والشهادات المرشحة' },
    { id: 3, title: 'تقرير ألبوم صور وحفل خريجي متوسطة ابن سينا 2026', category: 'أنشطة ختامية', executedDate: '2026-06-05', status: 'جاهز للرفع', notes: 'عرض 10 شرائح وألبوم صور 20 طالباً خريجاً' },
    { id: 4, title: 'تقرير زيارة مركز الإبداع بالهيئة الملكية', category: 'زيارة ميدانية', executedDate: '2026-05-20', status: 'جاهز للرفع', notes: 'تقرير التقييم والانطباعات من مركز الإبداع' },
  ]);

  // ==========================================
  // 3. الخطط والبرامج والزيارات المتاحة
  // ==========================================
  const [plans, setPlans] = useState([
    { id: 1, title: 'زيارة الهيئة الملكية بينبع - مركز الإبداع', type: 'زيارة ميدانية', status: 'متاحة', term: 'الفصل الأول', target: 'الطلاب المتميزون', executed: true, requiresOtp: true },
    { id: 2, title: 'فعالية ينبع تركض الرياضية', type: 'فعالية رياضية', status: 'منفذة', term: 'الفصل الثاني', target: 'جميع الطلاب', executed: true, requiresOtp: false },
    { id: 3, title: 'مسابقة الإلقاء والارتجال', type: 'برنامج ثقافي', status: 'متاحة', term: 'الفصل الثاني', target: 'موهوبو الإلقاء', executed: true, requiresOtp: false },
    { id: 4, title: 'ألبوم حفل تخرج طلاب متوسطة ابن سينا 2026', type: 'برنامج ختامي', status: 'منفذة', term: 'الفصل الثالث', target: 'خريجو متوسطة ابن سينا 2026', executed: true, requiresOtp: false },
    { id: 5, title: 'معرض كايزن للابتكار المستمر', type: 'معرض علمي', status: 'مقترحة', term: 'الفصل الثالث', target: 'المخترعون الصغار', executed: false, requiresOtp: false },
  ]);

  const [newPlan, setNewPlan] = useState({ title: '', type: 'برنامج ثقافي', status: 'متاحة', term: 'الفصل الأول', target: '', requiresOtp: false });

  // ==========================================
  // 4. نقاط كايزن والشهادات
  // ==========================================
  const [pointAward, setPointAward] = useState({ studentName: '', points: 10, reason: '' });

  const [certificates, setCertificates] = useState([
    { id: 1, recipient: 'الطالب: محمد علي الزهراني', type: 'شهادة تميز في الإلقاء', status: 'معتمدة ومصدرة' },
    { id: 2, recipient: 'خريجو متوسطة ابن سينا 2026 (دفعة العام)', type: 'شهادة إتمام المرحلة المتوسطة وتكريم التخرج', status: 'معتمدة ومصدرة' },
    { id: 3, recipient: 'المعلم: أحمد محمود السالم', type: 'شهادة تنظيم مسابقة خط', status: 'بانتظار توقيع المدير' },
  ]);
  const [newCert, setNewCert] = useState({ recipient: '', type: 'شهادة مشاركة بالنشاط' });

  // ==========================================
  // 5. متجر كايزن للجوائز (تحت إدارة رائد النشاط أ. يوسف السقاف)
  // ==========================================
  
  // قائمة الجوائز المتاحة بالمتجر
  const [storePrizes, setStorePrizes] = useState([
    { id: 1, title: 'حقيبة أدوات هندسية متكاملة', pointsCost: 50, stock: 15, category: 'أدوات دراسية' },
    { id: 2, title: 'كوبون وجبة مجانية من المقصف المدرسي', pointsCost: 30, stock: 40, category: 'كوبونات' },
    { id: 3, title: 'شهادة تقدير خاصة وموثقة من رائد النشاط', pointsCost: 20, stock: 100, category: 'شهادات' },
    { id: 4, title: 'المشاركة في الرحلة الميدانية القادمة مجاناً', pointsCost: 100, stock: 10, category: 'رحلات' },
    { id: 5, title: 'مجموعة كتب وقصص علمية قيمة', pointsCost: 60, stock: 8, category: 'جوائز عينية' },
  ]);

  // نموذج إضافة جائزة جديدة بالمتجر
  const [newPrize, setNewPrize] = useState({ title: '', pointsCost: 30, stock: 10, category: 'أدوات دراسية' });

  // طلبات استبدال النقاط المقدمة من الطلاب (تنتظر اعتماد وصرف رائد النشاط)
  const [redemptionRequests, setRedemptionRequests] = useState([
    { id: 201, studentName: 'عبدالرحمن خالد الغامدي', prizeTitle: 'كوبون وجبة مجانية من المقصف المدرسي', pointsSpent: 30, date: '2026-05-18', status: 'بانتظار الصرف' },
    { id: 202, studentName: 'ياسر فهد الشهري', prizeTitle: 'حقيبة أدوات هندسية متكاملة', pointsSpent: 50, date: '2026-05-17', status: 'بانتظار الصرف' },
    { id: 203, studentName: 'سعود عبدالله الجهني', prizeTitle: 'شهادة تقدير خاصة وموثقة من رائد النشاط', pointsSpent: 20, date: '2026-05-14', status: 'تم الاعتماد والصرف ✅' },
  ]);

  // --- المعالجات والأحداث --- //

  const handleApproveTeacherReport = (id: number) => {
    setTeacherReports(teacherReports.map(r => r.id === id ? { ...r, status: 'معتمد' } : r));
    alert(isAr ? 'تم اعتماد تقرير المعلم بنجاح!' : 'Teacher report approved successfully!');
  };

  const handleSendReportToPrincipal = (id: number) => {
    setActivityReportsToPrincipal(activityReportsToPrincipal.map(r => r.id === id ? { ...r, status: 'تم الرفع للمدير' } : r));
    alert(isAr ? 'تم رفع التقرير لمدير المدرسة (الأستاذ نايف بن علي العتيبي) بنجاح!' : 'Report sent to the principal successfully!');
  };

  const handleAddPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlan.title || !newPlan.target) return;
    setPlans([...plans, { id: Date.now(), title: newPlan.title, type: newPlan.type, status: newPlan.status, term: newPlan.term, target: newPlan.target, executed: false, requiresOtp: newPlan.requiresOtp }]);
    setNewPlan({ title: '', type: 'برنامج ثقافي', status: 'متاحة', term: 'الفصل الأول', target: '', requiresOtp: false });
  };

  const toggleExecution = (id: number) => {
    setPlans(plans.map(p => p.id === id ? { ...p, executed: !p.executed } : p));
  };

  const handleAwardPoints = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pointAward.studentName || !pointAward.reason) return;
    alert(isAr ? `تم منح ${pointAward.points} نقطة بنجاح للطالب: ${pointAward.studentName}` : `Points awarded to ${pointAward.studentName}`);
    setPointAward({ studentName: '', points: 10, reason: '' });
  };

  const handleAddCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.recipient) return;
    setCertificates([...certificates, { id: Date.now(), recipient: newCert.recipient, type: newCert.type, status: 'مرفوعة بانتظار الاعتماد' }]);
    setNewCert({ recipient: '', type: 'شهادة مشاركة بالنشاط' });
  };

  // --- معالجات متجر كايزن الجديدة --- //

  // 1. حذف جائزة من المتجر
  const handleDeletePrize = (id: number) => {
    if (confirm(isAr ? 'هل أنت تأكد من رغبتك في حذف هذه الجائزة من المتجر؟' : 'Are you sure you want to delete this prize?')) {
      setStorePrizes(storePrizes.filter(p => p.id !== id));
    }
  };

  // 2. إضافة جائزة جديدة للمتجر
  const handleAddPrize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrize.title) return;
    setStorePrizes([...storePrizes, { id: Date.now(), title: newPrize.title, pointsCost: newPrize.pointsCost, stock: newPrize.stock, category: newPrize.category }]);
    setNewPrize({ title: '', pointsCost: 30, stock: 10, category: 'أدوات دراسية' });
    alert(isAr ? 'تمت إضافة الجائزة الجديدة للمتجر بنجاح!' : 'New prize added to store!');
  };

  // 3. اعتماد وصرف طلب استبدال النقاط مباشرة بصلاحية رائد النشاط
  const handleApproveRedemption = (id: number) => {
    setRedemptionRequests(redemptionRequests.map(req => req.id === id ? { ...req, status: 'تم الاعتماد والصرف ✅' } : req));
    alert(isAr ? 'تم اعتماد الطلب وصرف الجائزة للطالب بنجاح بصلاحية رائد النشاط!' : 'Prize redemption approved successfully!');
  };

  return (
    <div dir={dir} className="min-h-screen bg-[#F4EAD3]/20 text-[#0B2545] p-4 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* الترويسة الرئيسية */}
        <DashboardHeader 
          title={isAr ? 'لوحة تحكم رائد النشاط الطلابي' : 'Activity Leader Dashboard'}
          subtitle={isAr ? 'الأستاذ يوسف محمد السقاف - متوسطة ابن سينا (الهيئة الملكية ينبع)' : 'Mr. Yousef Al-Saqqaf - Ibn Sina Middle School'}
        />

        {/* 1. الإحصائيات السريعة */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 print:hidden">
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-lg font-bold">🗺️</div>
            <div>
              <p className="text-[11px] text-gray-500 font-bold">{isAr ? 'إجمالي الأنشطة' : 'Total Activities'}</p>
              <p className="text-lg font-black text-[#0B2545]">{plans.length}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#00B4D8]/10 text-[#00B4D8] flex items-center justify-center text-lg font-bold">📥</div>
            <div>
              <p className="text-[11px] text-gray-500 font-bold">{isAr ? 'تقارير المعلمين' : 'Teacher Reports'}</p>
              <p className="text-lg font-black text-[#0B2545]">{teacherReports.length}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl font-bold">🛍️</div>
            <div>
              <p className="text-[11px] text-gray-500 font-bold">{isAr ? 'جوائز متجر كايزن' : 'Kaizen Store Items'}</p>
              <p className="text-lg font-black text-[#0B2545]">{storePrizes.length}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl font-bold">🎁</div>
            <div>
              <p className="text-[11px] text-gray-500 font-bold">{isAr ? 'طلبات الصرف المعلقة' : 'Pending Redemptions'}</p>
              <p className="text-lg font-black text-[#0B2545]">{redemptionRequests.filter(r => r.status === 'بانتظار الصرف').length}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold">📜</div>
            <div>
              <p className="text-[11px] text-gray-500 font-bold">{isAr ? 'الشهادات' : 'Certificates'}</p>
              <p className="text-lg font-black text-[#0B2545]">{certificates.length}</p>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/*  🎁 قسم متجر كايزن للجوائز - تحت إدارة وإشراف رائد النشاط الطلابي  */}
        {/* ============================================================== */}
        <section className="bg-gradient-to-br from-amber-500/10 via-white to-amber-500/5 p-6 rounded-3xl shadow-md border-2 border-amber-400/40 space-y-6">
          
          {/* ترويسة المتجر وتوضيح الإشراف والإدارة */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-amber-200 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🛍️</span>
                <h2 className="text-lg font-black text-[#0B2545]">
                  {isAr ? 'متجر كايزن للجوائز والتحفيز' : 'Kaizen Rewards Store'}
                </h2>
              </div>
              <p className="text-xs font-bold text-amber-800 mt-1 flex items-center gap-1">
                🛡️ {isAr ? 'تحت الإدارة والإشراف المباشر لرائد النشاط الطلابي: الأستاذ يوسف محمد السقاف' : 'Under direct supervision of Student Activity Leader: Mr. Yousef Al-Saqqaf'}
              </p>
            </div>
            
            <div className="bg-amber-100 text-amber-900 px-4 py-2 rounded-2xl text-xs font-black shadow-sm flex items-center gap-2">
              <span>🌟 {isAr ? 'نظام استبدال النقاط المعتمد' : 'Approved Points Exchange'}</span>
            </div>
          </div>

          {/* 1. قائمة الجوائز المتاحة + زر حذف الجائزة 🗑️ + نموذج إضافة جائزة */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* عرض الجوائز المتاحة مع زر الحذف */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="text-sm font-black text-[#0B2545] flex items-center gap-2">
                📦 {isAr ? 'الجوائز المتاحة بالمتجر وإدارتها' : 'Manage Available Store Prizes'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {storePrizes.map((prize) => (
                  <div key={prize.id} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between space-y-3 hover:border-amber-400 transition">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start">
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded-md">
                          {prize.category}
                        </span>
                        <span className="text-xs font-black text-[#00B4D8] bg-cyan-50 px-2 py-0.5 rounded-lg border border-cyan-100">
                          {prize.pointsCost} {isAr ? 'نقطة' : 'Pts'}
                        </span>
                      </div>
                      <h4 className="font-black text-xs text-[#0B2545] pt-1">{prize.title}</h4>
                      <p className="text-[11px] text-gray-500 font-bold">
                        {isAr ? `الكمية المتاحة: ${prize.stock} قطعة` : `Stock: ${prize.stock}`}
                      </p>
                    </div>

                    {/* زر الحذف 🗑️ بصلاحيات رائد النشاط */}
                    <div className="pt-2 border-t flex justify-end">
                      <button
                        onClick={() => handleDeletePrize(prize.id)}
                        type="button"
                        className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition border border-red-200"
                        title={isAr ? 'حذف الجائزة من المتجر' : 'Delete Prize'}
                      >
                        🗑️ {isAr ? 'حذف الجائزة' : 'Delete'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* نموذج إضافة جائزة جديدة للمتجر */}
            <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm space-y-3 print:hidden">
              <h3 className="text-xs font-black text-[#0B2545] border-b pb-2 flex items-center gap-2">
                ➕ {isAr ? 'إضافة جائزة جديدة للمتجر' : 'Add New Prize'}
              </h3>
              <form onSubmit={handleAddPrize} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold mb-1">{isAr ? 'اسم الجائزة' : 'Prize Title'}</label>
                  <input
                    type="text"
                    required
                    value={newPrize.title}
                    onChange={(e) => setNewPrize({ ...newPrize, title: e.target.value })}
                    placeholder={isAr ? 'مثال: دفتر ملاحظات فاخر' : 'Prize Title'}
                    className="w-full p-2.5 border rounded-xl bg-gray-50 focus:bg-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold mb-1">{isAr ? 'التكلفة بالنقاط' : 'Points'}</label>
                    <input
                      type="number"
                      min="5"
                      required
                      value={newPrize.pointsCost}
                      onChange={(e) => setNewPrize({ ...newPrize, pointsCost: Number(e.target.value) })}
                      className="w-full p-2 border rounded-xl bg-gray-50 outline-none font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">{isAr ? 'الكمية' : 'Stock'}</label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={newPrize.stock}
                      onChange={(e) => setNewPrize({ ...newPrize, stock: Number(e.target.value) })}
                      className="w-full p-2 border rounded-xl bg-gray-50 outline-none font-mono font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-1">{isAr ? 'التصنيف' : 'Category'}</label>
                  <select
                    value={newPrize.category}
                    onChange={(e) => setNewPrize({ ...newPrize, category: e.target.value })}
                    className="w-full p-2 border rounded-xl bg-gray-50 font-bold outline-none"
                  >
                    <option value="أدوات دراسية">{isAr ? '📚 أدوات دراسية' : 'School Supplies'}</option>
                    <option value="كوبونات">{isAr ? '🎟️ كوبونات المقصف' : 'Coupons'}</option>
                    <option value="شهادات">{isAr ? '📜 شهادات تقدير' : 'Certificates'}</option>
                    <option value="رحلات">{isAr ? '🚌 رحلات وزيارات' : 'Trips'}</option>
                    <option value="جوائز عينية">{isAr ? '🎁 جوائز عينية' : 'Gifts'}</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2.5 rounded-xl font-black shadow-sm transition"
                >
                  {isAr ? 'إدراج بالمتجر 🎁' : 'Add to Store 🎁'}
                </button>
              </form>
            </div>

          </div>

          {/* 2. جدول اعتماد وصرف طلبات استبدال النقاط (صلاحيات رائد النشاط المباشرة) */}
          <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-xs font-black text-[#0B2545] flex items-center gap-2">
                ✍️ {isAr ? 'طلبات استبدال النقاط وصرف الجوائز (صلاحيات الاعتماد المباشر)' : 'Approve & Fulfill Point Redemptions'}
              </h3>
              <span className="bg-purple-100 text-purple-800 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                {redemptionRequests.filter(r => r.status === 'بانتظار الصرف').length} {isAr ? 'طلبات بانتظار الاعتماد' : 'Pending Requests'}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-amber-50/50 text-gray-700 border-b">
                    <th className="p-2.5">{isAr ? 'اسم الطالب' : 'Student Name'}</th>
                    <th className="p-2.5">{isAr ? 'الجائزة المطلوبة' : 'Requested Prize'}</th>
                    <th className="p-2.5 text-center">{isAr ? 'النقاط المستهلكة' : 'Points'}</th>
                    <th className="p-2.5 text-center">{isAr ? 'تاريخ الطلب' : 'Date'}</th>
                    <th className="p-2.5 text-center">{isAr ? 'الحالة' : 'Status'}</th>
                    <th className="p-2.5 text-center print:hidden">{isAr ? 'الإجراء والصلاحية' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {redemptionRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-gray-50/50">
                      <td className="p-2.5 font-bold text-[#0B2545]">{req.studentName}</td>
                      <td className="p-2.5 text-gray-700">{req.prizeTitle}</td>
                      <td className="p-2.5 text-center font-mono font-bold text-amber-700">{req.pointsSpent}</td>
                      <td className="p-2.5 text-center font-mono text-gray-500">{req.date}</td>
                      <td className="p-2.5 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                          req.status.includes('الاعتماد') ? 'bg-emerald-100 text-emerald-700' : 'bg-purple-100 text-purple-700'
                        }`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="p-2.5 text-center print:hidden">
                        {req.status === 'بانتظار الصرف' ? (
                          <button
                            onClick={() => handleApproveRedemption(req.id)}
                            type="button"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl font-bold text-[11px] shadow-sm transition flex items-center justify-center gap-1 mx-auto"
                          >
                            ✔ {isAr ? 'اعتماد وصرف الجائزة' : 'Approve & Redeem'}
                          </button>
                        ) : (
                          <span className="text-[10px] text-gray-400 font-bold">
                            {isAr ? 'تم التسليم 🎁' : 'Delivered 🎁'}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </section>

        {/* 2. الاطلاع على تقارير المعلمين لاعتمادها */}
        <section className="bg-white p-6 rounded-3xl shadow-md border border-gray-100 space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <h2 className="text-base font-black text-[#0B2545] flex items-center gap-2">
              📥 {isAr ? 'الاطلاع على تقارير المعلمين لاعتمادها' : 'Review & Approve Teacher Reports'}
            </h2>
            <span className="bg-amber-100 text-amber-700 text-xs font-black px-3 py-1 rounded-full">
              {teacherReports.filter(r => r.status === 'بانتظار الاعتماد').length} {isAr ? 'بانتظار الاعتماد' : 'Pending'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {teacherReports.map((report) => (
              <div key={report.id} className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-3 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-[#0B2545] text-xs">{report.teacherName}</span>
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded-md border font-mono">{report.date}</span>
                  </div>
                  <h3 className="font-black text-sm text-[#00B4D8]">{report.activityTitle}</h3>
                  <p className="text-xs text-gray-600 bg-white p-2.5 rounded-xl border leading-relaxed">{report.details}</p>
                </div>

                <div className="pt-2 border-t flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                    report.status === 'معتمد' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {report.status}
                  </span>

                  {report.status !== 'معتمد' && (
                    <button
                      onClick={() => handleApproveTeacherReport(report.id)}
                      type="button"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl font-bold text-xs shadow-sm transition"
                    >
                      ✔ {isAr ? 'اعتماد التقرير' : 'Approve'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. رفع تقارير الأنشطة والفعاليات لمدير المدرسة */}
        <section className="bg-white p-6 rounded-3xl shadow-md border border-gray-100 space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <h2 className="text-base font-black text-[#00B4D8] flex items-center gap-2">
              📤 {isAr ? 'رفع تقارير الأنشطة والفعاليات لمدير المدرسة (الأستاذ نايف العتيبي)' : 'Submit Activity Reports to Principal'}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="bg-gray-50 text-gray-700 border-b">
                  <th className="p-3">{isAr ? 'عنوان التقرير التنفيذي' : 'Report Title'}</th>
                  <th className="p-3">{isAr ? 'تصنيف النشاط' : 'Category'}</th>
                  <th className="p-3">{isAr ? 'تاريخ التنفيذ' : 'Date'}</th>
                  <th className="p-3">{isAr ? 'ملاحظات وتفاصيل' : 'Notes'}</th>
                  <th className="p-3 text-center">{isAr ? 'حالة الرفع' : 'Upload Status'}</th>
                  <th className="p-3 text-center print:hidden">{isAr ? 'الإجراء' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {activityReportsToPrincipal.map((act) => (
                  <tr key={act.id} className="hover:bg-gray-50/50">
                    <td className="p-3 font-bold text-[#0B2545]">{act.title}</td>
                    <td className="p-3">
                      <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg font-bold text-[11px]">
                        {act.category}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-gray-600">{act.executedDate}</td>
                    <td className="p-3 text-gray-500">{act.notes}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                        act.status.includes('المدير') ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {act.status}
                      </span>
                    </td>
                    <td className="p-3 text-center print:hidden">
                      <button
                        onClick={() => handleSendReportToPrincipal(act.id)}
                        disabled={act.status.includes('المدير')}
                        type="button"
                        className="bg-[#0B2545] hover:bg-[#00B4D8] disabled:bg-gray-200 disabled:text-gray-400 text-white px-3 py-1.5 rounded-xl text-[11px] font-bold shadow-sm transition"
                      >
                        📤 {act.status.includes('المدير') ? (isAr ? 'تم الرفع' : 'Sent') : (isAr ? 'رفع للمدير' : 'Send to Principal')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. إعداد خطط النشاط والبرامج وموقف التنفيذ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* إضافة خطة جديدة */}
          <div className="bg-white p-6 rounded-3xl shadow-md border border-gray-100 space-y-4 print:hidden">
            <h2 className="text-base font-black text-[#0B2545] border-b pb-3 flex items-center gap-2">
              ➕ {isAr ? 'إضافة خطة / برنامج / زيارة' : 'Add Plan / Visit'}
            </h2>
            <form onSubmit={handleAddPlan} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">{isAr ? 'عنوان البرنامج أو الزيارة' : 'Title'}</label>
                <input
                  type="text"
                  required
                  value={newPlan.title}
                  onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
                  placeholder={isAr ? 'مثال: زيارة للمركز العلمي' : 'Title'}
                  className="w-full p-3 border rounded-xl bg-gray-50 focus:bg-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">{isAr ? 'نوع النشاط' : 'Type'}</label>
                  <select
                    value={newPlan.type}
                    onChange={(e) => setNewPlan({ ...newPlan, type: e.target.value })}
                    className="w-full p-2.5 border rounded-xl bg-gray-50 font-bold outline-none"
                  >
                    <option value="برنامج ثقافي">{isAr ? '🎤 برنامج ثقافي' : 'Cultural'}</option>
                    <option value="فعالية رياضية">{isAr ? '⚽ فعالية رياضية' : 'Sports'}</option>
                    <option value="زيارة ميدانية">{isAr ? '🚌 زيارة ميدانية' : 'Field Visit'}</option>
                    <option value="معرض علمي">{isAr ? '🔬 معرض علمي' : 'Science Fair'}</option>
                    <option value="برنامج ختامي">{isAr ? '🎓 برنامج ختامي وتخرج' : 'Graduation'}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">{isAr ? 'الفصل الدراسي' : 'Term'}</label>
                  <select
                    value={newPlan.term}
                    onChange={(e) => setNewPlan({ ...newPlan, term: e.target.value })}
                    className="w-full p-2.5 border rounded-xl bg-gray-50 font-bold outline-none"
                  >
                    <option value="الفصل الأول">{isAr ? 'الفصل الأول' : 'Term 1'}</option>
                    <option value="الفصل الثاني">{isAr ? 'الفصل الثاني' : 'Term 2'}</option>
                    <option value="الفصل الثالث">{isAr ? 'الفصل الثالث' : 'Term 3'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">{isAr ? 'الفئة المستهدفة' : 'Target'}</label>
                <input
                  type="text"
                  required
                  value={newPlan.target}
                  onChange={(e) => setNewPlan({ ...newPlan, target: e.target.value })}
                  placeholder={isAr ? 'مثال: خريجو متوسطة ابن سينا 2026' : 'Target'}
                  className="w-full p-2.5 border rounded-xl bg-gray-50 focus:bg-white outline-none"
                />
              </div>

              {/* خيار تحديد رمز OTP للواتساب */}
              <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <label htmlFor="requireOtpToggle" className="text-xs font-black text-[#0B2545] cursor-pointer block">
                    🔒 {isAr ? 'إجبار التحقق عبر رمز الواتساب (OTP)' : 'Require WhatsApp OTP Verification'}
                  </label>
                  <p className="text-[10px] text-gray-500 font-bold">
                    {isAr 
                      ? 'فّعله للرحلات والزيارات الخارجية فقط، واتركه معطلاً للأنشطة الداخلية.' 
                      : 'Enable for external visits/trips only.'}
                  </p>
                </div>

                <input
                  id="requireOtpToggle"
                  type="checkbox"
                  checked={newPlan.requiresOtp}
                  onChange={(e) => setNewPlan({ ...newPlan, requiresOtp: e.target.checked })}
                  className="w-5 h-5 accent-[#0B2545] rounded cursor-pointer shrink-0"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#00B4D8] hover:bg-[#0096B4] text-white py-3 rounded-xl font-black shadow-md transition mt-2"
              >
                {isAr ? 'اعتماد ونشر الخطة 📑' : 'Publish Plan 📑'}
              </button>
            </form>
          </div>

          {/* جدول الخطط وتحديد موقف التنفيذ */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-md border border-gray-100 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-base font-black text-[#0B2545] flex items-center gap-2">
                📋 {isAr ? 'جدول البرامج والزيارات المتاحة وموقف التنفيذ' : 'Activities & Field Visits Plan'}
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-gray-50 text-gray-700 border-b">
                    <th className="p-3">{isAr ? 'البرنامج / الزيارة' : 'Title'}</th>
                    <th className="p-3">{isAr ? 'النوع' : 'Type'}</th>
                    <th className="p-3">{isAr ? 'المستهدفون' : 'Target'}</th>
                    <th className="p-3 text-center">{isAr ? 'نوع التوثيق' : 'Auth Type'}</th>
                    <th className="p-3 text-center">{isAr ? 'موقف التنفيذ' : 'Execution Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {plans.map((plan) => (
                    <tr key={plan.id} className="hover:bg-gray-50/50">
                      <td className="p-3 font-bold text-[#0B2545]">{plan.title}</td>
                      <td className="p-3">
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-lg font-bold text-[11px]">
                          {plan.type}
                        </span>
                      </td>
                      <td className="p-3 text-gray-600">{plan.target}</td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          plan.requiresOtp ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {plan.requiresOtp ? (isAr ? '🔒 رمز OTP' : '🔒 OTP Required') : (isAr ? '⚡ موافقة سريعة' : '⚡ Quick Consent')}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => toggleExecution(plan.id)}
                          type="button"
                          className={`px-3 py-1 rounded-xl text-[10px] font-black transition ${
                            plan.executed ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                          }`}
                        >
                          {plan.executed ? (isAr ? 'تم التنفيذ ✅' : 'Executed ✅') : (isAr ? 'لم يتم التنفيذ ❌' : 'Not Executed ❌')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* 5. نقاط التميز والشهادات */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* منح النقاط */}
          <section className="bg-white p-6 rounded-3xl shadow-md border border-gray-100 space-y-4 print:hidden">
            <h2 className="text-base font-black text-[#0B2545] border-b pb-3 flex items-center gap-2">
              ⭐ {isAr ? 'رصد نقاط التميز للطلاب' : 'Award Student Points'}
            </h2>
            <form onSubmit={handleAwardPoints} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">{isAr ? 'اسم الطالب' : 'Student Name'}</label>
                <input
                  type="text"
                  required
                  value={pointAward.studentName}
                  onChange={(e) => setPointAward({ ...pointAward, studentName: e.target.value })}
                  placeholder={isAr ? 'أدخل اسم الطالب' : 'Student Name'}
                  className="w-full p-2.5 border rounded-xl bg-gray-50 focus:bg-white outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">{isAr ? 'عدد النقاط' : 'Points'}</label>
                  <input
                    type="number"
                    min="5"
                    max="100"
                    required
                    value={pointAward.points}
                    onChange={(e) => setPointAward({ ...pointAward, points: Number(e.target.value) })}
                    className="w-full p-2.5 border rounded-xl bg-gray-50 outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">{isAr ? 'الفعالية / السبب' : 'Reason'}</label>
                  <input
                    type="text"
                    required
                    value={pointAward.reason}
                    onChange={(e) => setPointAward({ ...pointAward, reason: e.target.value })}
                    placeholder={isAr ? 'مثال: مسابقة الإلقاء' : 'Reason'}
                    className="w-full p-2.5 border rounded-xl bg-gray-50 outline-none"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-[#0B2545] hover:bg-[#00B4D8] text-white py-2.5 rounded-xl font-bold transition"
              >
                {isAr ? 'منح النقاط الآن 🌟' : 'Award Points 🌟'}
              </button>
            </form>
          </section>

          {/* الشهادات المعتمدة */}
          <section className="bg-white p-6 rounded-3xl shadow-md border border-gray-100 space-y-4">
            <h2 className="text-base font-black text-[#00B4D8] border-b pb-3 flex items-center gap-2">
              📜 {isAr ? 'اعتماد ورصد الشهادات' : 'Certificates'}
            </h2>
            <form onSubmit={handleAddCertificate} className="space-y-3 text-xs print:hidden">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  value={newCert.recipient}
                  onChange={(e) => setNewCert({ ...newCert, recipient: e.target.value })}
                  placeholder={isAr ? 'اسم المعلم أو الطالب' : 'Recipient'}
                  className="p-2.5 border rounded-xl bg-gray-50 outline-none"
                />
                <select
                  value={newCert.type}
                  onChange={(e) => setNewCert({ ...newCert, type: e.target.value })}
                  className="p-2.5 border rounded-xl bg-gray-50 font-bold outline-none"
                >
                  <option value="شهادة مشاركة بالنشاط">{isAr ? '🎖️ شهادة مشاركة' : 'Participation'}</option>
                  <option value="شهادة تفوق وتميز">{isAr ? '🏆 شهادة تفوق' : 'Excellence'}</option>
                  <option value="شهادة شكر وتقدير معلم">{isAr ? '👨‍🏫 شهادة معلم' : 'Teacher Thanks'}</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-[#00B4D8] hover:bg-[#0096B4] text-white py-2 rounded-xl font-bold transition"
              >
                {isAr ? 'رفع الشهادة للاعتماد 📤' : 'Upload Certificate'}
              </button>
            </form>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="p-2">{isAr ? 'المستفيد' : 'Recipient'}</th>
                    <th className="p-2">{isAr ? 'نوع الشهادة' : 'Type'}</th>
                    <th className="p-2 text-center">{isAr ? 'الحالة' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-[11px]">
                  {certificates.map((cert) => (
                    <tr key={cert.id}>
                      <td className="p-2 font-bold text-[#0B2545]">{cert.recipient}</td>
                      <td className="p-2">{cert.type}</td>
                      <td className="p-2 text-center">
                        <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-[9px] font-black">
                          {cert.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}