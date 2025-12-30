// components/Footer.tsx
"use client";

import {
  Building2,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import FooterClient from "./Footer.client";

/**
 * Footer component
 * - Improved visuality: stronger gradients, icon badges, hover states
 * - Accessible labels and aria attributes
 */

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="treasurepal-footer"
      className="bg-gradient-to-b from-white/95 to-gray-50 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100 border-t border-gray-200 dark:border-slate-700"
      role="contentinfo"
      aria-label="TreasurePal footer">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-10 md:grid-cols-12 md:items-start">
          {/* Brand + CTA */}
          <div className="md:col-span-4 space-y-5">
            <Link
              href="/"
              className="flex items-center gap-4"
              aria-label="TreasurePal home">
              <div className="rounded-md flex-shrink-0 bg-gradient-to-r from-emerald-400 to-sky-500 p-1 shadow-md">
                <svg
                  width="48"
                  height="36"
                  viewBox="0 0 48 36"
                  aria-hidden="true"
                  className="rounded-sm block">
                  <defs>
                    <linearGradient id="tp-grad" x1="0" x2="1">
                      <stop offset="0" stopColor="#2ECC71" />
                      <stop offset="1" stopColor="#1E90FF" />
                    </linearGradient>
                  </defs>
                  <rect
                    width="48"
                    height="36"
                    rx="6"
                    fill="url(#tp-grad)"></rect>
                </svg>
              </div>

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

            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-[22rem]">
              List with TreasurePal or discover curated properties — fast,
              transparent, local. Easily connect with owners and agents.
            </p>

            <div className="flex gap-3">
              <Link
                href="/list-with-us"
                data-cta="primary"
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full text-white font-semibold shadow-lg transform transition hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-300"
                style={{
                  background: "linear-gradient(90deg,#2ECC71,#1E90FF)",
                }}
                aria-label="List with TreasurePal">
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-slate-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-sky-200"
                aria-label="Contact TreasurePal">
                Contact
              </Link>
            </div>
          </div>

          {/* Links */}
          <nav
            aria-label="Footer navigation"
            className="md:col-span-5 grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                Explore
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/listings"
                    className="hover:underline flex items-center gap-2">
                    <Globe
                      className="w-4 h-4 text-slate-500"
                      aria-hidden={true}
                    />
                    Listings
                  </Link>

                  {/* Sub-links under Listings */}
                  <ul className="mt-2 ml-6 space-y-1 text-sm">
                    <li>
                      <Link
                        href="/listings/sale"
                        className="text-slate-600 dark:text-slate-300 hover:underline flex items-center gap-2">
                        <BriefcaseIconSmall />
                        For Sale
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/listings/rent"
                        className="text-slate-600 dark:text-slate-300 hover:underline flex items-center gap-2">
                        <BriefcaseIconSmall />
                        Rent
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/listings/students"
                        className="text-slate-600 dark:text-slate-300 hover:underline flex items-center gap-2">
                        <MapPin
                          className="w-4 h-4 text-slate-500"
                          aria-hidden={true}
                        />
                        Student Housing
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/listings/lodges"
                        className="text-slate-600 dark:text-slate-300 hover:underline flex items-center gap-2">
                        <HomeIconSmall />
                        Lodges & Hotels
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/listings/industrial"
                        className="text-slate-600 dark:text-slate-300 hover:underline flex items-center gap-2">
                        <Building2
                          className="w-4 h-4 text-slate-500"
                          aria-hidden={true}
                        />
                        Industrial & Commercial
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/careers"
                        className="text-slate-600 dark:text-slate-300 hover:underline flex items-center gap-2">
                        <Linkedin
                          className="w-4 h-4 text-slate-500"
                          aria-hidden={true}
                        />
                        Careers
                      </Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link
                    href="/listings/sell"
                    className="hover:underline flex items-center gap-2">
                    <BriefcaseIconSmall />
                    Sell
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:underline flex items-center gap-2">
                    <InfoIconSmall />
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="hover:underline flex items-center gap-2">
                    <InfoIconSmall />
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                Company
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/careers"
                    className="hover:underline flex items-center gap-2">
                    <Linkedin
                      className="w-4 h-4 text-slate-500"
                      aria-hidden={true}
                    />
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:underline flex items-center gap-2">
                    <InfoIconSmall />
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:underline flex items-center gap-2">
                    <InfoIconSmall />
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:underline flex items-center gap-2">
                    <Phone
                      className="w-4 h-4 text-slate-500"
                      aria-hidden={true}
                    />
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
                aria-label="Email address for property alerts"
              />
              <button
                type="submit"
                className="rounded-full px-4 py-2 bg-gradient-to-r from-[#2ECC71] to-[#1E90FF] text-white font-semibold text-sm shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-300"
                aria-label="Subscribe to property alerts">
                Subscribe
              </button>
            </form>

            <p
              className="text-sm text-slate-500 dark:text-slate-400 tp-newsletter-status"
              aria-live="polite"></p>

            <div className="flex items-center gap-3 mt-2">
              <SocialIcon
                href="#"
                label="Facebook"
                Icon={Facebook}
                bg="bg-white"
                hover="hover:bg-[#1877F2]/10"
                color="text-[#1877F2]"
              />
              <SocialIcon
                href="#"
                label="Twitter"
                Icon={Twitter}
                bg="bg-white"
                hover="hover:bg-[#1DA1F2]/10"
                color="text-[#1DA1F2]"
              />
              <SocialIcon
                href="#"
                label="Instagram"
                Icon={Instagram}
                bg="bg-white"
                hover="hover:bg-gradient-to-br hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF]"
                color="text-current"
              />
              <SocialIcon
                href="#"
                label="LinkedIn"
                Icon={Linkedin}
                bg="bg-white"
                hover="hover:bg-[#0A66C2]/10"
                color="text-[#0A66C2]"
              />
            </div>

            <div className="mt-4 text-sm text-slate-600 dark:text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-500" aria-hidden={true} />
                <span>Harare, Zimbabwe</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-500" aria-hidden={true} />
                <a href="tel:+263000000000" className="hover:underline">
                  +263 7777 68431
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500" aria-hidden={true} />
                <a
                  href="mailto:hello@treasurepal.example"
                  className="hover:underline">
                  hello@millerz.co.zw
                </a>
              </div>
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

/* ------------------------------------------------------------------
   Small presentational helpers
------------------------------------------------------------------- */

function SocialIcon({
  href,
  label,
  Icon,
  bg = "bg-white",
  hover = "hover:bg-gray-50",
  color = "text-current",
}: {
  href: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  bg?: string;
  hover?: string;
  color?: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className={`w-10 h-10 rounded-full border flex items-center justify-center tp-social-hoverable transition ${bg} ${hover}`}
      title={label}>
      <Icon className={`w-5 h-5 ${color}`} aria-hidden={true} />
    </a>
  );
}

function BriefcaseIconSmall() {
  return (
    <svg
      className="w-4 h-4 text-slate-500"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true">
      <path
        d="M3 7h18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 7v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="3"
        y="7"
        width="18"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HomeIconSmall() {
  return (
    <svg
      className="w-4 h-4 text-slate-500"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true">
      <path
        d="M3 11.5L12 4l9 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 21V12h6v9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoIconSmall() {
  return (
    <svg
      className="w-4 h-4 text-slate-500"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 8v.01"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 12h1v4h1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
