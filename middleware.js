import { NextResponse } from "next/server"

export function middleware(req) {
  if (req.nextUrl.clone().pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.url))
  }

  const token = req.cookies.get("access_token")?.value
  const pathname = req.nextUrl.pathname

  const guestUrl = ["/auth"]

  const authUrl = ["/car/edit", "/car/create", "/checkout", "/dashboard", "/order", "/products", "/profile"]

  for (const url of guestUrl) {
    if (pathname.startsWith(url)) {
      if (!token) {
        return NextResponse.next()
      }

      return NextResponse.redirect(new URL("/home", req.url))
    }
  }

  for (const url of authUrl) {
    if (pathname.startsWith(url)) {
      if (!token) {
        return NextResponse.redirect(new URL("/auth/login", req.url))
      }

      return NextResponse.next()
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/",
    "/auth/:path*",
    "/car/:path*",
    "/checkout/:path*",
    "/dashboard/:path*",
    "/home/:path*",
    "/order/:path*",
    "/products/:path*",
    "/profile/:path*",
  ],
}
