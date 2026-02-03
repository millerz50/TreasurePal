"use client";

import Link from "next/link";
import {
  Building2,
  Home,
  MapPin,
  Briefcase,
  Linkedin,
  Info,
  Phone,
} from "lucide-react";

export default function FooterLinks() {
  return (
    <nav
      aria-label="Footer navigation"
      className="md:col-span-5 grid grid-cols-2 gap-6"
    >
      {/* Explore */}
      <div>
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
          Explore
        </h4>
        <ul className="space-y-2 text-sm">
          <li>
            <Link
              href="/listings"
              className="hover:underline flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-slate-500" />
              Listings
            </Link>
            <ul className="mt-2 ml-6 space-y-1 text-sm">
              <li>
                <Link
                  href="/listings/properties/buildings/Commercial/BusinessBuilding"
                  className="flex items-center gap-2 hover:underline"
                >
                  <Building2 className="w-4 h-4 text-slate-500" /> Commercial
                </Link>
              </li>
              <li>
                <Link
                  href="/listings/properties/buildings/Residential/StudentHousing"
                  className="flex items-center gap-2 hover:underline"
                >
                  <MapPin className="w-4 h-4 text-slate-500" /> Student Housing
                </Link>
              </li>
              <li>
                <Link
                  href="/listings/properties/buildings/Residential/Lodge"
                  className="flex items-center gap-2 hover:underline"
                >
                  <Home className="w-4 h-4 text-slate-500" /> Lodges & Hotels
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link
              href="/listings/sell"
              className="hover:underline flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4 text-slate-500" /> Sell
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:underline flex items-center gap-2"
            >
              <Info className="w-4 h-4 text-slate-500" /> About
            </Link>
          </li>
          <li>
            <Link
              href="/faq"
              className="hover:underline flex items-center gap-2"
            >
              <Info className="w-4 h-4 text-slate-500" /> FAQ
            </Link>
          </li>
        </ul>
      </div>

      {/* Company */}
      <div>
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
          Company
        </h4>
        <ul className="space-y-2 text-sm">
          <li>
            <Link
              href="/careers"
              className="flex items-center gap-2 hover:underline"
            >
              <Linkedin className="w-4 h-4 text-slate-500" /> Careers
            </Link>
          </li>
          <li>
            <Link
              href="/terms"
              className="flex items-center gap-2 hover:underline"
            >
              <Info className="w-4 h-4 text-slate-500" /> Terms
            </Link>
          </li>
          <li>
            <Link
              href="/privacy"
              className="flex items-center gap-2 hover:underline"
            >
              <Info className="w-4 h-4 text-slate-500" /> Privacy
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="flex items-center gap-2 hover:underline"
            >
              <Phone className="w-4 h-4 text-slate-500" /> Support
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
