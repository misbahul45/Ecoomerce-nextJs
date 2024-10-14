import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
import { auth } from './lib/auth'
 
export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/profile/:path*','/checkout/:path*'],
}