import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Simple JWT verification without importing server-only modules
function verifyTokenSimple(token: string): any {
  try {
    // Basic JWT structure validation
    const parts = token.split(".")
    if (parts.length !== 3) return null

    // Decode payload (this is just for basic validation, not security)
    const payload = JSON.parse(Buffer.from(parts[1], "base64").toString())

    // Check if token is expired
    if (payload.exp && payload.exp < Date.now() / 1000) {
      return null
    }

    return payload
  } catch (error) {
    return null
  }
}

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Allow access to login page
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next()
    }

    // Check for authentication token
    const token = request.cookies.get("admin-token")?.value

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    // Basic token verification
    try {
      const user = verifyTokenSimple(token)
      if (!user) {
        return NextResponse.redirect(new URL("/admin/login", request.url))
      }

      // Add user info to headers for use in API routes
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set("x-user-id", user.id)
      requestHeaders.set("x-user-email", user.email)
      requestHeaders.set("x-user-role", user.role)

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    } catch (error) {
      console.error("Token verification error:", error)
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
