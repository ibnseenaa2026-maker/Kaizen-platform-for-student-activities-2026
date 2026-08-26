'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function TeacherDashboard() {
  const { isAr, toggleLanguage } = useLanguage();
  const router = useRouter();

  // التبويبات الشاملة لصلاحيات المعلم (رائد الفصل، رائد الجماعة، الاعتمادات، وغيرها)
  const [activeTab, setActiveTab] = useState<'classLeader' | 'clubLeader' | 'submissions' | 'students' | 'behavior' | 'events' | 'store'>('classLeader');

  // 1. حالة رائد الفصل: إضافة طلاب وإسناد مهام
  const [classStudents, setClassStudents] = useState([
    { id: 1, name: 'أحمد بن محمد العتيبي', gradeClass: 'الثالث المتوسط (3/1)', taskAssigned: 'إعداد عرض الإذاعة الصباحية' },
    { id: 2, name: 'سعد بن فهد الأحمدي', gradeClass: 'الثالث المتوسط (3/1)', taskAssigned: 'تنظيم لوحة إعلانات الفصل' },
  ]);
  const [newStudentForm, setNewStudentForm] = useState({ name: '', gradeClass: 'الثالث المتوسط (3/1)', taskAssigned: '' });

  // 2. حالة رائد الجماعة: إدارة الطلاب الراغبين في المشاركة واعتمادهم وتحديد مهامهم
  const [clubApplicants, setClubApplicants] = useState([
    {
      id: 1,
      studentName: 'فيصل بن خالد الحربي',
      clubName: 'جماعة الإذاعة والإلقاء',
      status: 'pending' as 'pending' | 'approved' | 'rejected',
      assignedRole: 'مقدم البرامج الإذاعية',
    },
    {
      id: 2,
      studentName: 'سعود بن عبد العزيز الجهني',
      clubName: 'نادي الخط العربي والرسم',
      status: 'approved' as 'pending' | 'approved' | 'rejected',
      assignedRole: 'مصمم اللوحات الإرشادية',
    },
  ]);

  // 3. مشاركات الطلاب للاعتماد المباشر والنقاط
  const [studentSubmissions, setStudentSubmissions] = useState([
    {
      id: 1,
      studentName: 'أحمد بن محمد العتيبي',
      gradeClass: 'الثالث المتوسط (3/1)',
      title: 'مشاركة في مسابقة الإلقاء والارتجال',
      category: 'مسابقة إلقاء',
      description: 'قصيدة عن حب الوطن والإنجازات',
      linkOrProof: 'https://example.com/video1',
      status: 'pending' as 'pending' | 'approved' | 'rejected',
      pointsReward: 40,
    },
  ]);

  // 4. سجل النقاط والطلاب العام
  const [studentsList, setStudentsList] = useState([
    { id: 1, name: 'أحمد بن محمد العتيبي', grade: 'الثالث المتوسط (3/1)', points: 90, status: 'مكتمل السجل ✓' },
    { id: 2, name: 'سعد بن فهد الأحمدي', grade: 'الثالث المتوسط (3/1)', points: 50, status: 'مكتمل السجل ✓' },
  ]);

  // 5. رصد السلوك والتميز
  const [behaviorList, setBehaviorList] = useState([
    { id: 1, studentName: 'أحمد بن محمد العتيبي', type: 'إيجابي / تميز', note: 'تفاعل متميز في حصة النشاط', points: 10, date: '2026-06-01' },
  ]);
  const [newBehavior, setNewBehavior] = useState({ studentName: '', type: 'إيجابي / تميز', note: '', points: 10 });

  // دوال رائد الفصل: إضافة طالب وإسناد مهمة
  const handleAddClassStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentForm.name) return;
    setClassStudents([
      { id: Date.now(), ...newStudentForm },
      ...classStudents
    ]);
    setNewStudentForm({ name: '', gradeClass: 'الثالث المتوسط (3/1)', taskAssigned: '' });
    alert(isAr ? 'تم إضافة الطالب وإسناد المهام الفصلية بنجاح!' : 'Student added successfully');
  };

  // دوال رائد الجماعة: اعتماد أو رفض الطالب وتحديد دوره
  const handleApproveApplicant = (id: number, studentName: string) => {
    setClubApplicants(
      clubApplicants.map(app => app.id === id ? { ...app, status: 'approved' } : app)
    );
    alert(isAr ? `تم قبول انضمام الطالب (${studentName}) للجماعة بنجاح! ✓` : `Accepted`);
  };

  const handleRejectApplicant = (id: number, studentName: string) => {
    setClubApplicants(
      clubApplicants.map(app => app.id === id ? { ...app, status: 'rejected' } : app)
    );
    alert(isAr ? `تم اعتذار عن قبول الطالب (${studentName}).` : `Rejected`);
  };

  // دوال اعتماد المشاركات
  const handleApproveSubmission = (id: number, studentName: string, points: number) => {
    setStudentSubmissions(
      studentSubmissions.map(sub => sub.id === id ? { ...sub, status: 'approved' } : sub)
    );
    setStudentsList(studentsList.map(st => st.name === studentName ? { ...st, points: st.points + points } : st));
    alert(isAr ? `تم اعتماد عمل الطالب (${studentName}) وإضافة ${points} نقطة لرصيده! 🌟` : `Approved`);
  };

  const handleRejectSubmission = (id: number) => {
    setStudentSubmissions(
      studentSubmissions.map(sub => sub.id === id ? { ...sub, status: 'rejected' } : sub)
    );
  };

  const handleLogout = () => router.push('/login');

  return (
    <div className="min-h-screen bg-[#F4EAD3]/20 text-[#0B2545] p-4 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ترويسة لوحة المعلم */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <img src="/لوقو_التطبيق_page-0001-removebg-preview.png" alt="شعار كايزن" className="w-12 h-12 object-contain" />
            <div>
              <h1 className="text-lg font-black text-[#0B2545]">{isAr ? 'برنامج كايزن — لوحة المعلم وصلاحيات الإشراف' : 'Teacher Dashboard'}</h1>
              <p className="text-xs text-[#00B4D8] font-bold mt-0.5">{isAr ? 'متوسطة ابن سينا - الهيئة الملكية بينبع' : 'Ibn Sina Middle School'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={toggleLanguage} type="button" className="bg-amber-100 hover:bg-amber-200 text-[#0B2545] px-3.5 py-2 rounded-2xl font-black text-xs transition border border-amber-300">
              🌐 {isAr ? 'English' : 'عربي'}
            </button>
            <button onClick={handleLogout} type="button" className="bg-red-50 hover:bg-red-500 text-red-600 hover:text-white border border-red-200 px-3.5 py-2 rounded-2xl font-black text-xs transition shadow-sm">
              🚪 {isAr ? 'خروج' : 'Logout'}
            </button>
          </div>
        </div>

        {/* أزرار التبويبات المحدثة وفقاً للصلاحيات المعتمدة */}
        <div className="flex flex-wrap gap-2 border-b pb-3">
          <button onClick={() => setActiveTab('classLeader')} className={`px-4 py-2.5 rounded-2xl font-black text-xs transition ${activeTab === 'classLeader' ? 'bg-[#0B2545] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
            👨‍🏫 صفتي (رائد الفصل): إضافة طلاب ومهام
          </button>
          <button onClick={() => setActiveTab('clubLeader')} className={`px-4 py-2.5 rounded-2xl font-black text-xs transition ${activeTab === 'clubLeader' ? 'bg-[#0B2545] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
            🎯 صفتي (رائد الجماعة): قبول الطلاب وتحديد مهامهم
          </button>
          <button onClick={() => setActiveTab('submissions')} className={`px-4 py-2.5 rounded-2xl font-black text-xs transition ${activeTab === 'submissions' ? 'bg-[#0B2545] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
            📥 اعتماد مشاركات الطلاب ({studentSubmissions.filter(s => s.status === 'pending').length})
          </button>
          <button onClick={() => setActiveTab('students')} className={`px-4 py-2.5 rounded-2xl font-black text-xs transition ${activeTab === 'students' ? 'bg-[#0B2545] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
            👥 سجل النقاط والطلاب
          </button>
          <button onClick={() => setActiveTab('behavior')} className={`px-4 py-2.5 rounded-2xl font-black text-xs transition ${activeTab === 'behavior' ? 'bg-[#0B2545] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
            ⭐ رصد السلوك والتميز
          </button>
        </div>

        {/* 👨‍🏫 1. تبويب رائد الفصل */}
        {activeTab === 'classLeader' && (
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <div className="border-b pb-3">
              <h3 className="font-black text-sm text-[#0B2545]">إدارة طلاب الفصل وإسناد المهام الفصلية (رائد الفصل)</h3>
              <p className="text-xs text-gray-500 mt-0.5">تسجيل بيانات الطلاب الجدد وتوزيع المهام والمسؤوليات داخل الفصل الدراسي.</p>
            </div>

            <form onSubmit={handleAddClassStudent} className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-gray-50 p-4 rounded-2xl border">
              <input type="text" placeholder="اسم الطالب الرباعي" value={newStudentForm.name} onChange={(e) => setNewStudentForm({...newStudentForm, name: e.target.value})} className="p-2.5 rounded-xl border text-xs font-bold bg-white" required />
              <input type="text" placeholder="الصف والشعبة (مثال: الثالث المتوسط 3/1)" value={newStudentForm.gradeClass} onChange={(e) => setNewStudentForm({...newStudentForm, gradeClass: e.target.value})} className="p-2.5 rounded-xl border text-xs font-bold bg-white" required />
              <input type="text" placeholder="المهمة المُسندة للطالب بالفصل" value={newStudentForm.taskAssigned} onChange={(e) => setNewStudentForm({...newStudentForm, taskAssigned: e.target.value})} className="p-2.5 rounded-xl border text-xs font-bold bg-white" required />
              <button type="submit" className="sm:col-span-3 bg-[#0B2545] hover:bg-[#133c70] text-white p-3 rounded-xl text-xs font-black transition">
                + إضافة الطالب وإسناد المهمة الفصلية
              </button>
            </form>

            <div className="space-y-2">
              <h4 className="font-black text-xs text-[#0B2545]">قائمة طلاب الفصل والمهام المُسندة حالياً:</h4>
              <div className="grid grid-cols-1 gap-3">
                {classStudents.map((st) => (
                  <div key={st.id} className="p-4 rounded-2xl border bg-gray-50 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-black text-[#0B2545] text-sm">{st.name}</span>
                      <span className="text-gray-500 block mt-0.5">الصف: {st.gradeClass}</span>
                    </div>
                    <div className="bg-blue-50 text-blue-900 border border-blue-200 px-3 py-1.5 rounded-xl font-bold">
                      🎯 المهمة: {st.taskAssigned}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 🎯 2. تبويب رائد الجماعة */}
        {activeTab === 'clubLeader' && (
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <div className="border-b pb-3">
              <h3 className="font-black text-sm text-[#0B2545]">إدارة جماعات الأنشطة المدرسية (رائد الجماعة)</h3>
              <p className="text-xs text-gray-500 mt-0.5">اعتماد أو رفض الطلاب المتقدمين للانضمام للجماعة وتحديد بيان مهامهم بدقة.</p>
            </div>

            <div className="space-y-3">
              {clubApplicants.map((app) => (
                <div key={app.id} className="p-4 rounded-2xl border bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-xs text-[#0B2545] text-sm">{app.studentName}</h4>
                      <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">{app.clubName}</span>
                    </div>
                    <p className="text-xs text-gray-600 font-bold">🎯 بيان الدور والمهام بالجماعة: {app.assignedRole}</p>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {app.status === 'pending' ? (
                      <>
                        <button onClick={() => handleApproveApplicant(app.id, app.studentName)} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl font-black text-xs">
                          ✓ قبول وانضمام
                        </button>
                        <button onClick={() => handleRejectApplicant(app.id, app.studentName)} className="bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border px-4 py-2 rounded-xl font-black text-xs">
                          ✕ اعتذار / رفض
                        </button>
                      </>
                    ) : app.status === 'approved' ? (
                      <span className="bg-emerald-100 text-emerald-800 font-black text-xs px-3 py-1.5 rounded-xl border border-emerald-300">
                        ✓ مقبول ومعتمد بالجماعة
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-800 font-black text-xs px-3 py-1.5 rounded-xl border border-red-300">
                        ✕ مرفوض
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 📥 3. اعتماد مشاركات الطلاب */}
        {activeTab === 'submissions' && (
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
            <h3 className="font-black text-sm text-[#0B2545] border-b pb-3">مراجعة واعتماد إنجازات ومشاركات الطلاب</h3>
            <div className="space-y-4">
              {studentSubmissions.map((sub) => (
                <div key={sub.id} className="p-4 rounded-2xl border border-gray-200 bg-gray-50 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-xs text-[#0B2545]">{sub.studentName}</h4>
                      <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded font-bold">{sub.gradeClass}</span>
                    </div>
                    <p className="font-black text-xs text-gray-800">العنوان: {sub.title}</p>
                    <p className="text-xs text-gray-600">{sub.description}</p>
                    <a href={sub.linkOrProof} target="_blank" rel="noreferrer" className="text-blue-600 text-[10px] underline font-bold block">
                      🔗 استعراض مرفق الطالب
                    </a>
                  </div>

                  <div>
                    {sub.status === 'pending' ? (
                      <div className="flex gap-2">
                        <button onClick={() => handleApproveSubmission(sub.id, sub.studentName, sub.pointsReward)} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl font-black text-xs">
                          ✓ اعتماد (+{sub.pointsReward})
                        </button>
                        <button onClick={() => handleRejectSubmission(sub.id)} className="bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border px-4 py-2 rounded-xl font-black text-xs">
                          ✕ رفض
                        </button>
                      </div>
                    ) : (
                      <span className={`text-xs font-black px-3 py-1.5 rounded-xl ${sub.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                        {sub.status === 'approved' ? '✓ تم الاعتماد' : '✕ مرفوض'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 👥 4. سجل النقاط والطلاب */}
        {activeTab === 'students' && (
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
            <h3 className="font-black text-sm text-[#0B2545] border-b pb-3">سجل الطلاب ونقاط التميز المعتمدة</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs font-bold">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 border-b">
                    <th className="p-3">اسم الطالب</th>
                    <th className="p-3">الصف والشعبة</th>
                    <th className="p-3">رصيد النقاط</th>
                    <th className="p-3">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-gray-700">
                  {studentsList.map((st) => (
                    <tr key={st.id} className="hover:bg-gray-50">
                      <td className="p-3 font-black text-[#0B2545]">{st.name}</td>
                      <td className="p-3">{st.grade}</td>
                      <td className="p-3 text-amber-600 font-black">🎖️ {st.points} نقطة</td>
                      <td className="p-3"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">{st.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ⭐ 5. رصد السلوك والتميز */}
        {activeTab === 'behavior' && (
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <h3 className="font-black text-sm text-[#0B2545] border-b pb-3">رصد الملاحظات السلوكية ونقاط التميز اليومية</h3>
            <div className="space-y-2">
              {behaviorList.map((b) => (
                <div key={b.id} className="flex justify-between items-center p-3 rounded-xl border bg-gray-50 text-xs">
                  <div>
                    <span className="font-black text-[#0B2545]">{b.studentName}</span> — <span className="text-gray-600">{b.note}</span>
                  </div>
                  <span className="font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {b.type} (+{b.points})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}