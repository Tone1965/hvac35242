import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'es']

function getLocale(request: NextRequest): string {
  const pathname = request.nextUrl.pathname
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  
  if (pathnameLocale) return pathnameLocale
  
  // Default to English
  return 'en'
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Allow Let's Encrypt ACME challenges to pass through
  if (pathname.startsWith('/.well-known/acme-challenge/')) {
    return NextResponse.next()
  }
  
  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // REWRITE instead of redirect - no more 307!
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    return NextResponse.rewrite(
      new URL(`/${locale}${pathname}`, request.url)
    )
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}