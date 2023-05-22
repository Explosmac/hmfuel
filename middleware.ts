import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (pathname.endsWith(".png")) {
    return NextResponse.next()
  }

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET
  })
  if (!session && !["/login", "/register"].includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url))
  } else if (session && ["/login", "/register"].includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/((?!_next|api).*)*"]
}
