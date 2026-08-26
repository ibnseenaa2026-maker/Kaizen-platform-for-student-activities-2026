'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function ParentPage() {
  const { isAr, toggleLanguage } = useLanguage();
  const router = useRouter();

  // 👨‍👦‍👦 قائمة الأبناء التابعين لولي الأمر
  const [childrenList, setChildrenList] = useState([
    {
      id: 'student_1',
      fullNameAr: 'عبدالله محمد العتيبي',
      fullNameEn: 'Abdullah Muhammad Al-Otaibi',
      nationalId: '1102938475',
      school: 'متوسطة ابن سينا',
      gradeClass: 'ثالث/1 (3/1)',
      parentPhone: '0501234567',
      pointsBalance: 120,
      joinedClubsCount: 2,
      participatedEventsCount: 2,
      activities: [
        {
          id: 101,
          title: 'مسابقة الهيئة الملكية للإلقاء والارتجال 🎤',
          type: 'مسابقة تنافسية',
          date: '2026-05-20',
          status: 'بانتظار موافقة ولي الأمر',
          earnedPoints: 40,
        },
        {
          id: 102,
          title: 'فعالية ينبع تركض الرياضية 🏃‍♂️',
          type: 'مبادرة مجتمعية',
          date: '2026-05-25',
          status: 'معتمد من ولي الأمر',
          earnedPoints: 30,
        },
      ],
      clubs: [
        { id: 1, name: 'جماعة الإذاعة والإلقاء', advisor: 'رائد النشاط: أ. يوسف السقاف' },
        { id: 2, name: 'نادي الخط العربي والرسم', advisor: 'معلم التربية الفنية' },
      ],
      approvals: [
        {
          id: 201,
          title: 'موافقة مشاركة: مسابقة الهيئة الملكية للإلقاء والارتجال 🎤',
          description: 'نأمل موافقتكم على مشاركة ابنكم في فعاليات المسابقة ووسام التميز المرافق لها.',
          date: '2026-05-20',
          status: 'pending',
          requiresOtp: false,
        },
        {
          id: 202,
          title: 'زيارة ميدانية: مركز العلوم والتكنولوجيا بالهيئة الملكية 🔬',
          description: 'موافقة ولي الأمر على خروج الطالب في زيارة خارجية رسمية مع المدرسة.',
          date: '2026-05-28',
          status: 'pending',
          requiresOtp: true,
        },
      ],
    },
    {
      id: 'student_2',
      fullNameAr: 'عمر محمد العتيبي',
      fullNameEn: 'Omar Muhammad Al-Otaibi',
      nationalId: '1108877665',
      school: 'متوسطة ابن سينا',
      gradeClass: 'أول/2 (1/2)',
      parentPhone: '0501234567',
      pointsBalance: 85,
      joinedClubsCount: 1,
      participatedEventsCount: 1,
      activities: [
        {
          id: 103,
          title: 'دوري كرة القدم المدرسي ⚽',
          type: 'نشاط رياضي',
          date: '2026-05-15',
          status: 'مكتمل',
          earnedPoints: 35,
        },
      ],
      clubs: [
        { id: 1, name: 'النادي الرياضي والذكاء الاصطناعي', advisor: 'معلم البدنية' },
      ],
      approvals: [
        {
          id: 203,
          title: 'موافقة انضمام: جماعة ابتكر وتعلّم 🤖',
          description: 'طلب انضمام الطالب للورش الأسبوعية بالنادي.',
          date: '2026-05-29',
          status: 'pending',
          requiresOtp: false,
        },
      ],
    },
  ]);

  // 🆔 تحديد الابن المختار حالياً
  const [selectedStudentId, setSelectedStudentId] = useState(childrenList[0].id);

  // جلب بيانات الابن المختار
  const currentStudent = childrenList.find((child) => child.id === selectedStudentId) || childrenList[0];

  // 🔒 حالات التحقق عبر الواتساب (OTP)
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [otpCode, setOtpCode] = useState('');
  const [sentOtp, setSentOtp] = useState('');
  const [isOtpStep, setIsOtpStep] = useState(false);

  // 💬 نموذج التواصل
  const [messageSubject, setMessageSubject] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [recipient, setRecipient] = useState('رائد النشاط: أ. يوسف السقاف');

  // تحديث الابن المختار
  const handleSelectStudent = (studentId: string) => {
    setSelectedStudentId(studentId);
  };

  // 🚪 تسجيل الخروج
  const handleLogout = () => {
    if (confirm(isAr ? 'هل أنت تأكد من تسجيل الخروج من حساب ولي الأمر؟' : 'Are you sure you want to log out?')) {
      router.push('/login');
    }
  };

  // 🖨️ الطباعة
  const handlePrintReport = () => {
    window.print();
  };

  // ⚡ الموافقة المباشرة
  const handleQuickApprove = (reqId: number, newStatus: 'approved' | 'rejected') => {
    setChildrenList((prevList) =>
      prevList.map((student) => {
        if (student.id === currentStudent.id) {
          return {
            ...student,
            approvals: student.approvals.map((req) =>
              req.id === reqId ? { ...req, status: newStatus } : req
            ),
          };
        }
        return student;
      })
    );

    alert(
      newStatus === 'approved'
        ? (isAr ? `✔ تمت الموافقة والاعتماد بنجاح للطالب (${currentStudent.fullNameAr})` : 'Approval Granted!')
        : (isAr ? '✕ تم تسجيل الرفض.' : 'Rejected.')
    );
  };

  // 📲 بدء التحقق بالواتساب للزيارات الخارجية
  const handleInitiateOtpApproval = (req: any) => {
    setSelectedRequest(req);
    const generatedCode = Math.floor(1000 + Math.random() * 9000).toString();
    setSentOtp(generatedCode);
    setIsOtpStep(true);

    alert(
      isAr
        ? `📲 تم إرسال رمز التحقق (OTP: ${generatedCode}) عبر WhatsApp للرقم المعتمد لولي الأمر (${currentStudent.parentPhone}) للموافقة على الطالب: ${currentStudent.fullNameAr}`
        : `WhatsApp OTP sent to ${currentStudent.parentPhone}: ${generatedCode}`
    );
  };

  // ✅ تأكيد الرمز الـ OTP
  const handleVerifyAndApprove = (approvalStatus: 'approved' | 'rejected') => {
    if (approvalStatus === 'approved' && otpCode !== sentOtp) {
      alert(isAr ? 'رمز التحقق غير صحيح! يرجى إدخال الرمز المرسل للواتساب.' : 'Invalid OTP code!');
      return;
    }

    setChildrenList((prevList) =>
      prevList.map((student) => {
        if (student.id === currentStudent.id) {
          return {
            ...student,
            approvals: student.approvals.map((req) =>
              req.id === selectedRequest.id ? { ...req, status: approvalStatus } : req
            ),
          };
        }
        return student;
      })
    );

    alert(
      approvalStatus === 'approved'
        ? (isAr ? `✔ تم توثيق الاعتماد والزيارة للطالب (${currentStudent.fullNameAr}) بنجاح!` : 'Approval confirmed!')
        : (isAr ? '✕ تم تسجيل الرفض.' : 'Rejected.')
    );

    setIsOtpStep(false);
    setSelectedRequest(null);
    setOtpCode('');
  };

  // ✉️ إرسال رسالة
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageSubject || !messageBody) {
      alert(isAr ? 'الرجاء إكمال بيانات الرسالة!' : 'Please complete the message fields!');
      return;
    }
    alert(
      isAr
        ? `تم إرسال رسالتكم بخصوص الطالب (${currentStudent.fullNameAr}) إلى (${recipient}) بنجاح.`
        : 'Message sent successfully!'
    );
    setMessageSubject('');
    setMessageBody('');
  };

  return (
    <div className="min-h-screen bg-[#F4EAD3]/20 text-[#0B2545] p-4 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* 🔝 الترويسة الرئيسية وشريط الأدوات */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-3xl shadow-sm border border-gray-100 print:hidden">
          <div className="flex items-center gap-3">
            <img
              src="/لوقو_التطبيق_page-0001-removebg-preview.png"
              alt="شعار كايزن"
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-lg font-black text-[#0B2545]">
                {isAr ? 'برنامج كايزن — لوحة ولي الأمر' : 'Kaizen Program — Parent Dashboard'}
              </h1>
              <p className="text-xs text-[#00B4D8] font-bold mt-0.5">
                {isAr ? 'متوسطة ابن سينا بالهيئة الملكية بينبع' : 'Ibn Sina Middle School in Yanbu'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handlePrintReport}
              type="button"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-2xl font-black text-xs transition flex items-center gap-1.5 shadow-sm"
            >
              🖨️ {isAr ? 'طباعة تقرير الطالب (PDF)' : 'Print Student Report'}
            </button>

            <button
              onClick={toggleLanguage}
              type="button"
              className="bg-amber-100 hover:bg-amber-200 text-[#0B2545] px-3.5 py-2 rounded-2xl font-black text-xs transition border border-amber-300"
            >
              🌐 {isAr ? 'English' : 'عربي'}
            </button>

            <button
              onClick={handleLogout}
              type="button"
              className="bg-red-50 hover:bg-red-500 text-red-600 hover:text-white border border-red-200 px-3.5 py-2 rounded-2xl font-black text-xs transition shadow-sm"
            >
              🚪 {isAr ? 'خروج' : 'Logout'}
            </button>
          </div>
        </div>

        {/* 👨‍👦‍👦 شريط اختيار الأبناء */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-lg">👨‍👦‍👦</span>
            <span className="text-xs font-black text-[#0B2545]">اختر الطالب للمتابعة واعتماد الموافقات:</span>
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {childrenList.map((child) => (
              <button
                key={child.id}
                onClick={() => handleSelectStudent(child.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 ${
                  selectedStudentId === child.id
                    ? 'bg-[#0B2545] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-amber-100'
                }`}
              >
                <span>🎓 {child.fullNameAr}</span>
                <span className="text-[10px] opacity-80">({child.gradeClass})</span>
              </button>
            ))}
          </div>
        </div>

        {/* 💳 بطاقة ملخص الابن المختار ورصيد النقاط */}
        <div className="bg-gradient-to-r from-[#0B2545] to-[#134074] text-white p-6 rounded-3xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <span className="bg-[#00B4D8] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
              {isAr ? 'بيانات الطالب المعتمدة 👨‍🎓' : 'Selected Student Details'}
            </span>
            <h2 className="text-xl lg:text-2xl font-black">
              {currentStudent.fullNameAr} ({currentStudent.fullNameEn})
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-blue-200 font-bold">
              <p>🏫 {currentStudent.school}</p>
              <p>📚الصف: {currentStudent.gradeClass}</p>
              <p>📱جوال ولي الأمر: {currentStudent.parentPhone}</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex items-center gap-4 w-full md:w-auto justify-around">
            <div className="text-center">
              <div className="text-2xl font-black text-amber-300">{currentStudent.pointsBalance}</div>
              <div className="text-[10px] text-gray-200 font-bold">نقاط التميز 🎖️</div>
            </div>

            <div className="h-8 w-[1px] bg-white/20"></div>

            <div className="text-center">
              <div className="text-2xl font-black text-emerald-300">{currentStudent.participatedEventsCount}</div>
              <div className="text-[10px] text-gray-200 font-bold">المشاركات 📣</div>
            </div>

            <div className="h-8 w-[1px] bg-white/20"></div>

            <div className="text-center">
              <div className="text-2xl font-black text-sky-300">{currentStudent.joinedClubsCount}</div>
              <div className="text-[10px] text-gray-200 font-bold">الأندية 🎯</div>
            </div>
          </div>
        </div>

        {/* 🖨️ تقرير الطباعة الشامل */}
        <div className="hidden print:block bg-white p-6 border-4 border-[#0B2545] rounded-xl text-black font-sans space-y-6">
          <div className="flex justify-between items-center border-b-2 border-[#0B2545] pb-4">
            <div className="text-right text-xs font-black">
              <h2 className="text-base font-black text-[#0B2545]">متوسطة ابن سينا</h2>
              <p className="text-gray-600 font-bold text-[11px] mt-0.5">تقرير متابعة ولي الأمر الدوري</p>
            </div>

            <div className="text-center space-y-1">
              <img
                src="/لوقو_التطبيق_page-0001-removebg-preview.png"
                alt="شعار كايزن"
                className="h-16 object-contain mx-auto"
              />
              <h1 className="text-xs font-black text-[#0B2545]">تقرير متابعة الطالب ببرنامج كايزن</h1>
            </div>

            <div className="text-left text-xs font-mono font-bold">
              <p>التاريخ: {new Date().toLocaleDateString('ar-SA')}</p>
              <p>الهوية: {currentStudent.nationalId}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="bg-[#0B2545] text-white text-xs font-black px-3 py-1 rounded-md">بيانات الطالب والمشاركات</h3>
            <table className="w-full text-xs border-collapse border border-gray-400">
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="p-2 bg-gray-100 font-bold w-1/4">اسم الطالب:</td>
                  <td className="p-2 font-black">{currentStudent.fullNameAr}</td>
                  <td className="p-2 bg-gray-100 font-bold w-1/4">الصف والشعبة:</td>
                  <td className="p-2">{currentStudent.gradeClass}</td>
                </tr>
                <tr>
                  <td className="p-2 bg-gray-100 font-bold">رصيد النقاط:</td>
                  <td className="p-2 font-black text-amber-700">{currentStudent.pointsBalance} نقطة</td>
                  <td className="p-2 bg-gray-100 font-bold">الأندية المشارك بها:</td>
                  <td className="p-2">{currentStudent.joinedClubsCount} أندية</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-8 flex justify-between items-center text-xs font-bold border-t border-gray-300">
            <div className="text-center space-y-6">
              <p>رائد النشاط الطلابي</p>
              <p className="text-[#0B2545] font-black">أ. يوسف بن محمد السقاف</p>
            </div>
            <div className="text-center space-y-6">
              <p>مدير المدرسة</p>
              <p className="text-[#0B2545] font-black">أ. نايف بن علي العتيبي</p>
            </div>
          </div>
        </div>

        {/* 📲 نافذة التحقق OTP Modal للرحلات والزيارات */}
        {isOtpStep && selectedRequest && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 lg:p-8 max-w-md w-full shadow-2xl border border-gray-200 space-y-5">
              <div className="text-center space-y-2">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full">
                  التحقق الآمن عبر WhatsApp 🔒
                </span>
                <h3 className="text-lg font-black text-[#0B2545]">توثيق الزيارة الخارجية</h3>
                <p className="text-xs text-gray-500 font-bold">
                  رمز التوثيق الخاص بالزيارة للطالب: <strong className="text-[#0B2545]">{currentStudent.fullNameAr}</strong>
                </p>
              </div>

              <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 text-xs font-bold text-amber-900">
                <p>الطلب: {selectedRequest.title}</p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 block">أدخل رمز التحقق (OTP)</label>
                <input
                  type="text"
                  maxLength={4}
                  placeholder="xxxx"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full text-center tracking-widest text-lg font-mono bg-gray-50 border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#00B4D8]"
                />
                <p className="text-[10px] text-gray-400 font-bold text-center">
                  (رمز الواتساب التجريبي المرسل: <strong className="text-emerald-600 font-mono">{sentOtp}</strong>)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleVerifyAndApprove('approved')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs py-3 rounded-xl transition shadow-md"
                >
                  ✓ موافقة واعتمد
                </button>
                <button
                  type="button"
                  onClick={() => handleVerifyAndApprove('rejected')}
                  className="bg-red-50 hover:bg-red-500 text-red-600 hover:text-white border border-red-200 font-black text-xs py-3 rounded-xl transition"
                >
                  ✕ رفض
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsOtpStep(false);
                  setSelectedRequest(null);
                }}
                className="w-full text-gray-400 hover:text-gray-600 text-xs font-bold text-center block"
              >
                إلغاء
              </button>
            </div>
          </div>
        )}

        {/* 📊 محتوى اللوحة الرئيسي للابن المختار */}
        <div className="print:hidden grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 space-y-6">

            {/* 📋 الموافقات الرقمية */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-200 space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <span className="bg-emerald-100 text-emerald-900 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                    الموافقات الرقمية 🛡️
                  </span>
                  <h3 className="font-black text-sm text-[#0B2545] mt-1">
                    طلبات الموافقات الخاصة بـ: {currentStudent.fullNameAr}
                  </h3>
                </div>
                <span className="text-xs text-gray-500 font-bold">نظام الموافقات الذكي</span>
              </div>

              <div className="space-y-3">
                {currentStudent.approvals.length === 0 ? (
                  <p className="text-xs text-gray-400 font-bold py-4 text-center">لا توجد طلبات موافقة معلقة لهذا الطالب حالياً.</p>
                ) : (
                  currentStudent.approvals.map((req) => (
                    <div key={req.id} className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-xs text-[#0B2545]">{req.title}</h4>
                        </div>
                        <p className="text-[11px] text-gray-600 font-medium">{req.description}</p>
                        <p className="text-[10px] text-gray-400 font-mono">تاريخ الطلب: {req.date}</p>
                      </div>

                      <div>
                        {req.status === 'approved' && (
                          <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-2 rounded-xl block text-center">
                            ✓ معتمد إلكترونياً
                          </span>
                        )}
                        {req.status === 'rejected' && (
                          <span className="bg-red-100 text-red-800 text-xs font-black px-3 py-2 rounded-xl block text-center">
                            ✕ مرفوض
                          </span>
                        )}
                        {req.status === 'pending' && (
                          <div className="flex items-center gap-2">
                            {/* تم توحيد عبارة جميع أزرار الموافقة لتصبح "موافقة واعتمد" حصرياً دون استثناء */}
                            {req.requiresOtp ? (
                              <button
                                onClick={() => handleInitiateOtpApproval(req)}
                                className="bg-[#0B2545] hover:bg-[#00B4D8] text-white text-xs font-black px-4 py-2.5 rounded-xl transition shadow-sm whitespace-nowrap"
                              >
                                ✓ موافقة واعتمد
                              </button>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleQuickApprove(req.id, 'approved')}
                                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-3.5 py-2 rounded-xl transition shadow-sm whitespace-nowrap"
                                >
                                  ✓ موافقة واعتمد
                                </button>
                                <button
                                  onClick={() => handleQuickApprove(req.id, 'rejected')}
                                  className="bg-red-50 hover:bg-red-500 text-red-600 hover:text-white border border-red-200 text-xs font-black px-3 py-2 rounded-xl transition"
                                >
                                  ✕
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* 📣 سجل الأنشطة والمسابقات للابن المختار */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="font-black text-sm text-[#0B2545]">سجل المشاركات لـ ({currentStudent.fullNameAr}) 📣</h3>
                <span className="text-xs text-gray-400 font-bold">إشراف النشاط الطلابي</span>
              </div>

              <div className="space-y-3">
                {currentStudent.activities.map((act) => (
                  <div key={act.id} className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <span className="text-[10px] bg-blue-100 text-blue-800 font-black px-2 py-0.5 rounded-md">
                        {act.type}
                      </span>
                      <h4 className="font-black text-xs text-[#0B2545] mt-1.5">{act.title}</h4>
                      <p className="text-[11px] text-gray-500 font-mono mt-0.5">التاريخ: {act.date} | الحالة: {act.status}</p>
                    </div>

                    <span className="bg-amber-100 text-amber-900 font-black text-xs px-3 py-1.5 rounded-xl border border-amber-200 self-end sm:self-center">
                      +{act.earnedPoints} نقطة 🎖️
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 🎯 أندية الابن المختار */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
              <h3 className="font-black text-sm text-[#0B2545] border-b pb-3">الأندية المنضم إليها الطالب 🎯</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentStudent.clubs.map((club) => (
                  <div key={club.id} className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200 flex items-center gap-3">
                    <span className="text-2xl">🌱</span>
                    <div>
                      <h4 className="font-black text-xs text-[#0B2545]">{club.name}</h4>
                      <p className="text-[11px] text-emerald-800 font-bold mt-0.5">{club.advisor}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* العمود الثالث: التواصل بخصوص الطالب المختار */}
          <div className="space-y-6">

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-amber-200 space-y-4">
              <div className="border-b pb-3">
                <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                  ملاحظة واستفسار ✉️
                </span>
                <h3 className="font-black text-sm text-[#0B2545] mt-1">تواصل بخصوص: {currentStudent.fullNameAr}</h3>
              </div>

              <form onSubmit={handleSendMessage} className="space-y-3 text-xs font-bold">
                <div>
                  <label className="text-gray-700 block mb-1">الجهة المستقبلة</label>
                  <select
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 focus:ring-2 focus:ring-[#00B4D8]"
                  >
                    <option value="رائد النشاط: أ. يوسف السقاف">رائد النشاط الطلابي (أ. يوسف السقاف)</option>
                    <option value="مدير المدرسة: أ. نايف العتيبي">مدير المدرسة (أ. نايف العتيبي)</option>
                    <option value="الموجه الطلابي">الموجه الطلابي بالمدرسة</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-700 block mb-1">عنوان موضوع الرسالة *</label>
                  <input
                    type="text"
                    placeholder="مثال: استفسار عن رحلة أو مسابقة"
                    value={messageSubject}
                    onChange={(e) => setMessageSubject(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 focus:ring-2 focus:ring-[#00B4D8]"
                    required
                  />
                </div>

                <div>
                  <label className="text-gray-700 block mb-1">نص الرسالة *</label>
                  <textarea
                    rows={4}
                    placeholder="اكتب ملاحظتك عن أداء الابن أو استفسارك..."
                    value={messageBody}
                    onChange={(e) => setMessageBody(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 focus:ring-2 focus:ring-[#00B4D8]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0B2545] hover:bg-[#00B4D8] text-white p-3 rounded-2xl font-black text-xs shadow-md transition"
                >
                  إرسال الرسالة لإدارة المدرسة 🚀
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}