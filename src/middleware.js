import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  
  // Define routes that require authentication
  const isAdminRoute = path.startsWith('/admin') && !path.startsWith('/admin/login');
  
  // Check for admin session cookie
  const adminSession = request.cookies.get('admin_session')?.value;
  
  if (isAdminRoute && !adminSession) {
    // Redirect to login if accessing admin without session
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
