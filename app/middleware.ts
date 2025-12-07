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
  "/static/",
  "/assets/",
];

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p));
}

/**
 * Helper: detect if request is an API / XHR / fetch call.
 * - API routes start with /api
 * - fetch/XHR often include Accept: application/json or x-requested-with header
 */
function isApiOrFetch(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  if (pathname.startsWith("/api/")) return true;

  const accept = req.headers.get("accept") || "";
  const xrw = req.headers.get("x-requested-with") || "";
  if (accept.includes("application/json")) return true;
  if (xrw.toLowerCase() === "xmlhttprequest") return true;

  // Next.js data requests (optional)
  if (req.headers.get("x-nextjs-data")) return true;

  return false;
}

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Allow public paths (signup, signin, assets, public APIs)
  if (isPublicPath(pathname)) return NextResponse.next();

  // Allow API routes to pass through middleware without redirecting to signin
  // (we'll return a JSON 401 for unauthenticated API/fetch requests below)
  const apiOrFetch = isApiOrFetch(req);

  // Check for auth cookie(s). Adjust names to match what your backend sets.
  // Many backends use a session cookie like "connect.sid" or a JWT cookie like "auth_token".
  const token = req.cookies.get("auth_token")?.value;
  const session = req.cookies.get("connect.sid")?.value; // common express-session name
  const hasAuth = Boolean(token || session);

  if (!hasAuth) {
    if (apiOrFetch) {
      // For API/fetch requests, return a JSON 401 instead of redirecting to HTML signin page.
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "content-type": "application/json" },
      });
    }

    // For normal browser navigation to protected pages, redirect to signin
    const signInUrl = new URL("/signin", req.url);
    // Optionally preserve original destination:
    // signInUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Auth present — allow the request
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
