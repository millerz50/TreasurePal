"use client";

import Link from "next/link";

export default function FooterBottom({ year }: { year: number }) {
  return (
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
  );
}
