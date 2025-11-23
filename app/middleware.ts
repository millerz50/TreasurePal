// middleware.ts
// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_PATHS = [
  "/", // home
  "/signin",
  "/signup",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/_next/", // next internals / static assets
  "/static/", // static folder if you use it
  "/assets/",
];

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p));
}

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const token = req.cookies.get("auth_token")?.value;

  // Allow public paths (signup, signin, assets, public APIs)
  if (isPublicPath(pathname)) return NextResponse.next();

  // If this is not a public path and there's no token, redirect to signin
  if (!token) {
    const signInUrl = new URL("/signin", req.url);
    // Optionally preserve original destination: signInUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

// Only run middleware for app areas you want protected; keep this list narrow
export const config = {
  matcher: [
    // protect dashboard and profile paths
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    // add other protected prefixes here
  ],
};
