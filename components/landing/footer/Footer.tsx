"use client";

import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";
import FooterNewsletter from "./FooterNewsletter";
import FooterSocial from "./FooterSocial";
import FooterBottom from "./FooterBottom";
import FooterClient from "./Footer.client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-white/95 to-gray-50 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100 border-t border-gray-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-10 md:grid-cols-12 md:items-start">
          <FooterBrand />
          <FooterLinks />
          <div className="md:col-span-3 space-y-4">
            <FooterNewsletter />
            <FooterSocial />
          </div>
        </div>

        <FooterBottom year={year} />
      </div>

      <FooterClient />
    </footer>
  );
}
