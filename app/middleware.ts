// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  // If no token and trying to access protected routes → redirect to /signin
  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

// Run middleware for both /dashboard and /
export const config = {
  matcher: ["/dashboard/:path*", "/"],
};
