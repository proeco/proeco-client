import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest): Response {
  const { pathname } = req.nextUrl;

  // 直接チームページにはアクセスさせない
  if (pathname.startsWith(`/team`)) {
    return new Response(null, { status: 404 });
  }

  const hostname = req.headers.get('host');

  // hostname が RootURL
  if (hostname === process.env.NEXT_PUBLIC_ROOT_URL) {
    return NextResponse.rewrite(pathname);
  }

  // public 配下のファイルはそのまま
  if (!pathname.includes('.') && !pathname.startsWith('/api')) {
    const slug = hostname?.replace(`.${process.env.NEXT_PUBLIC_ROOT_URL}`, '');
    return NextResponse.rewrite(`/team/${slug}${pathname}`);
  }
  return NextResponse.rewrite(pathname);
}
