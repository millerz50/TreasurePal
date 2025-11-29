// components/Footer.tsx
import Link from "next/link";
import FooterClient from "./Footer.client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="treasurepal-footer"
      className="bg-gradient-to-b from-white/90 to-gray-50 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100 border-t border-gray-200 dark:border-slate-700"
      role="contentinfo"
      aria-label="TreasurePal footer">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-8 md:grid-cols-12 md:items-start">
          {/* Brand + CTA */}
          <div className="md:col-span-4 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-3"
              aria-label="TreasurePal home">
              <svg
                width="48"
                height="36"
                viewBox="0 0 48 36"
                aria-hidden="true"
                className="rounded-md flex-shrink-0">
                <defs>
                  <linearGradient id="tp-grad" x1="0" x2="1">
                    <stop offset="0" stopColor="#2ECC71" />
                    <stop offset="1" stopColor="#1E90FF" />
                  </linearGradient>
                </defs>
                <rect width="48" height="36" rx="6" fill="url(#tp-grad)"></rect>
              </svg>
              <div className="min-w-0">
                <div
                  className="text-lg font-extrabold leading-tight bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(90deg,#2ECC71,#1E90FF)",
                  }}>
                  TREASURE PAL
                </div>
                <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Affordable properties across Zimbabwe
                </div>
              </div>
            </Link>

            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-[20rem]">
              List with TreasurePal or discover curated properties — fast,
              transparent, local.easly
            </p>

            <div className="flex gap-3">
              <Link
                href="/list-with-us"
                data-cta="primary"
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full text-white font-semibold shadow-lg transform transition hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(90deg,#2ECC71,#1E90FF)",
                }}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true">
                  <path
                    d="M5 12h14"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                List with us
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-slate-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition">
                Contact
              </Link>
            </div>
          </div>

          {/* Links */}
          <nav
            aria-label="Footer navigation"
            className="md:col-span-5 grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Explore
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/listings" className="hover:underline">
                    Listings
                  </Link>

                  {/* Sub-links under Listings */}
                  <ul className="mt-2 ml-4 space-y-1 text-sm">
                    <li>
                      <Link
                        href="/sale"
                        className="text-slate-600 dark:text-slate-300 hover:underline">
                        For Sale
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/rent"
                        className="text-slate-600 dark:text-slate-300 hover:underline">
                        Rent
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/students"
                        className="text-slate-600 dark:text-slate-300 hover:underline">
                        Student Housing
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/lodges"
                        className="text-slate-600 dark:text-slate-300 hover:underline">
                        Lodges & Hotels
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/industrial"
                        className="text-slate-600 dark:text-slate-300 hover:underline">
                        Industrial & Commercial
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/careers"
                        className="text-slate-600 dark:text-slate-300 hover:underline">
                        Careers
                      </Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link href="/sell" className="hover:underline">
                    Sell
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:underline">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:underline">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Company
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/careers" className="hover:underline">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:underline">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:underline">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          {/* Newsletter + Social */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Get property alerts
            </h4>

            <form
              id="tp-newsletter-form"
              action="/api/newsletter"
              method="post"
              className="flex gap-2"
              noValidate>
              <label htmlFor="tp-newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="tp-newsletter-email"
                name="email"
                type="email"
                required
                placeholder="you@domain.com"
                className="flex-1 rounded-full px-4 py-2 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="rounded-full px-4 py-2 bg-gradient-to-r from-[#2ECC71] to-[#1E90FF] text-white font-semibold text-sm shadow">
                Subscribe
              </button>
            </form>

            <p
              className="text-sm text-slate-500 dark:text-slate-400 tp-newsletter-status"
              aria-live="polite"></p>

            <div className="flex items-center gap-3 mt-2">
              {/* FACEBOOK ICON */}
              <a
                className="w-10 h-10 rounded-full border flex items-center justify-center tp-social-hoverable"
                href="#"
                aria-label="Facebook">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99H8.08V12h2.36V9.8c0-2.33 1.39-3.62 3.52-3.62 1.02 0 2.09.18 2.09.18v2.3h-1.18c-1.16 0-1.52.72-1.52 1.46V12h2.58l-.41 2.89h-2.17v6.99C18.34 21.13 22 17 22 12z" />
                </svg>
              </a>

              {/* TWITTER / X ICON */}
              <a
                className="w-10 h-10 rounded-full border flex items-center justify-center tp-social-hoverable"
                href="#"
                aria-label="Twitter">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.29 4.29 0 00 1.88-2.37 8.59 8.59 0 01-2.72 1.04 4.27 4.27 0 00-7.3 3.89A12.1 12.1 0 013 4.8a4.27 4.27 0 001.32 5.7 4.22 4.22 0 01-1.93-.54v.05a4.28 4.28 0 003.42 4.19 4.28 4.28 0 01-1.92.07 4.28 4.28 0 003.99 2.97A8.58 8.58 0 012 19.54 12.1 12.1 0 008.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.35-.02-.53A8.35 8.35 0 0022.46 6z" />
                </svg>
              </a>

              {/* INSTAGRAM ICON */}
              <a
                className="w-10 h-10 rounded-full border flex items-center justify-center tp-social-hoverable"
                href="#"
                aria-label="Instagram">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true">
                  <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.25a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 dark:border-slate-700 pt-6 flex flex-col md:flex-row items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
          <div>© {year} TreasurePal</div>
          <div className="ml-auto flex gap-4">
            <Link href="/sitemap.xml" className="hover:underline">
              Sitemap
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>

      <FooterClient />
    </footer>
  );
}
