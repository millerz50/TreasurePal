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
              transparent, local.
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
                  <path d="M22 12..." />
                </svg>
              </a>
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
                  <path d="M22 5..." />
                </svg>
              </a>
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
                  <path d="M7 2..." />
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
