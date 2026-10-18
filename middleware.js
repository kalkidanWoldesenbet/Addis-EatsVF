import { NextResponse } from 'next/server';

// Layer 1 (optimistic): bounce visitors who have no session cookie at all.
// This is a convenience redirect, NOT the security check. It cannot verify the
// signature (Edge runtime), so every page and action re-checks with getSession().
export function middleware(req) {
  if (!req.cookies.get('ae_session')) {
    const url = new URL('/signin', req.url);
    url.searchParams.set('next', req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ['/checkout', '/orders/:path*'] };
