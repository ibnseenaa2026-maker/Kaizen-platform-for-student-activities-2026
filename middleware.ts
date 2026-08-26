import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // جلب المستخدم الحالي من السيرفر
  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname;

  // إذا كان المسار يخص لوحة المدير
  if (path.startsWith('/dashboard/principal')) {
    // إذا لم يكن مسجل دخوله أصلاً أو إيميله ليس إيميل المدير المعتمد
    if (!user || user.email !== 'saeman79@gmail.com') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return supabaseResponse
}

// تحديد المسارات التي سيحرسها هذا الـ Middleware بدقة
export const config = {
  matcher: ['/dashboard/principal/:path*'],
}