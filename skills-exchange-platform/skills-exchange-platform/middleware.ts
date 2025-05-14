import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("currentUser")
  const { pathname } = request.nextUrl

  // Redirect root to dashboard for authenticated users
  if (pathname === "/" && currentUser) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Redirect authenticated routes to login if not authenticated
  const authenticatedRoutes = ["/profile", "/messages", "/skill-requests", "/settings"]
  const isAuthenticatedRoute = authenticatedRoutes.includes(pathname)

  if (isAuthenticatedRoute && !currentUser) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Redirect login/signup to dashboard if already authenticated
  if ((pathname === "/login" || pathname === "/signup") && currentUser) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
