// components/Footer.tsx
import Link from "next/link";
import FooterClient from "./Footer.client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="treasurepal-footer"
      className="bg-tpBg text-tpText border-t border-gray-100"
      role="contentinfo"
      aria-label="TreasurePal footer">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="footer-card p-5 md:p-6 grid gap-6 grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_1.2fr] md:items-start">
          {/* Brand + CTA */}
          <div className="space-y-4">
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
                <div className="font-extrabold text-lg gradient-text leading-tight truncate">
                  TREASURE PAL
                </div>
                <div className="text-sm font-medium text-tpMuted">
                  AFFORDABLE PROPERTIES
                </div>
              </div>
            </Link>

            <Link
              href="/list-with-us"
              data-cta="primary"
              aria-label="List with TreasurePal"
              className="inline-flex items-center gap-3 w-full md:w-auto px-5 py-3 rounded-full text-white font-semibold shadow-tp-soft tp-focus justify-center min-h-[44px] transition-transform active:translate-y-0.5"
              style={{ background: "linear-gradient(90deg,#2ECC71,#1E90FF)" }}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="opacity-90">
                <path
                  d="M12 2v20"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 9h14"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>List with TreasurePal</span>
            </Link>

            <p className="text-xs text-tpMuted max-w-[20rem]">
              Find affordable homes and list with confidence. Quick responses
              and transparent fees.
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer quick links" className="md:col-span-1">
            <h4 className="text-sm font-semibold text-tpMuted mb-2">Explore</h4>
            <ul className="grid grid-cols-3 gap-2 md:grid-cols-1">
              {[
                ["Listings", "/listings"],
                ["Sell", "/sell"],
                ["About", "/about"],
                ["FAQ", "/faq"],
                ["Careers", "/careers"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={String(href)}
                    className="block p-2 rounded-md font-medium text-tpText hover:text-tpBlue hover:underline focus-visible:tp-focus">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact + Social */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-tpMuted">Contact</h4>
            <div className="flex flex-col gap-1">
              <a
                href="tel:+1234567890"
                className="text-sm font-medium text-tpText">
                +1 (234) 567‑890
              </a>
              <a
                href="mailto:hello@treasurepal.com"
                className="text-sm font-medium text-tpText">
                hello@treasurepal.com
              </a>
            </div>

            <div className="flex gap-2 mt-3">
              {[
                { label: "Facebook", href: "#", path: "M22 12..." },
                { label: "Twitter", href: "#", path: "M22 5..." },
                { label: "Instagram", href: "#", path: "M7 2..." },
              ].map((s) => (
                <a
                  key={s.label}
                  className="w-10 h-10 rounded-full border flex items-center justify-center tp-social-hoverable tp-focus"
                  href={s.href}
                  aria-label={s.label}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter + Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-tpMuted">
              Stay in the loop
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
                placeholder="Your email"
                className="flex-1 input input-bordered rounded-full px-4 py-2"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-gradient-to-r from-tpGreen to-tpBlue text-white font-semibold min-h-[44px]"
                aria-label="Subscribe">
                <span>Subscribe</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true">
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>

            <p
              className="text-sm text-tpMuted tp-newsletter-status"
              aria-live="polite"></p>

            <div className="flex items-center gap-3 text-sm text-tpMuted mt-2">
              <Link href="/terms" className="hover:underline">
                Terms
              </Link>
              <Link href="/privacy" className="hover:underline">
                Privacy
              </Link>
              <div className="ml-auto">© {year} TreasurePal</div>
            </div>
          </div>
        </div>
      </div>

      <FooterClient />
    </footer>
  );
}
