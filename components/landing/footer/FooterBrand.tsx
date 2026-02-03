"use client";

import Link from "next/link";
import React from "react";

export default function FooterBrand() {
  return (
    <div className="md:col-span-4 space-y-5">
      <Link
        href="/"
        className="flex items-center gap-4"
        aria-label="TreasurePal home"
      >
        <div className="rounded-md flex-shrink-0 bg-gradient-to-r from-emerald-400 to-sky-500 p-1 shadow-md">
          <svg
            width="48"
            height="36"
            viewBox="0 0 48 36"
            aria-hidden="true"
            className="rounded-sm block"
          >
            <defs>
              <linearGradient id="tp-grad" x1="0" x2="1">
                <stop offset="0" stopColor="#2ECC71" />
                <stop offset="1" stopColor="#1E90FF" />
              </linearGradient>
            </defs>
            <rect width="48" height="36" rx="6" fill="url(#tp-grad)"></rect>
          </svg>
        </div>
        <div className="min-w-0">
          <div
            className="text-lg font-extrabold leading-tight bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg,#2ECC71,#1E90FF)",
            }}
          >
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
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full text-white font-semibold shadow-lg transform transition hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-300"
          style={{ background: "linear-gradient(90deg,#2ECC71,#1E90FF)" }}
        >
          List with us
        </Link>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-slate-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-sky-200"
        >
          Contact
        </Link>
      </div>
    </div>
  );
}
