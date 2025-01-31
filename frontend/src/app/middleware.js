import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');
  const { pathname } = request.nextUrl;

  if (!token && pathname.startsWith('/maps')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}