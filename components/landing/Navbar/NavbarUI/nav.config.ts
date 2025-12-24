import { Briefcase, Building2, Home, Info, Phone, Store } from "lucide-react";
import React from "react";

export type NavDropdownItem = {
  label: string;
  href: string;
  className?: string;
  activeClassName?: string;
};

export type NavItem = {
  label: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  dropdown?: NavDropdownItem[];

  /** Styling hooks */
  dropdownClassName?: string;
  itemClassName?: string;
};

export const NAV_LINKS: NavItem[] = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },

  {
    label: "Listings",
    icon: Building2,

    /** Dropdown container */
    dropdownClassName:
      "absolute left-0 top-full mt-3 w-64 rounded-2xl border bg-background shadow-xl ring-1 ring-black/5 dark:ring-white/10",

    /** Dropdown items */
    itemClassName:
      "flex items-center rounded-lg px-4 py-2 text-sm font-medium transition hover:bg-muted hover:text-primary dark:hover:bg-muted/50",

    dropdown: [
      // Property types
      { label: "Students", href: "/listings/students" },
      { label: "Houses", href: "/listings/houses" },
      { label: "Apartments", href: "/listings/apartments" },
      { label: "Industrial", href: "/listings/industrial" },
      { label: "Lodges", href: "/listings/lodges" },

      // Divider (handled via className)
      {
        label: "—",
        href: "#",
        className:
          "pointer-events-none my-2 h-px bg-border px-0 py-0 rounded-none",
      },

      // Transaction types
      {
        label: "For Sale",
        href: "/listings/sale",
        className: "text-primary font-semibold",
      },
      {
        label: "For Rent",
        href: "/listings/rent",
        className: "text-primary font-semibold",
      },
    ],
  },

  {
    label: "Marketplace",
    href: "/marketplace",
    icon: Store,
  },
  {
    label: "Contact",
    href: "/contact",
    icon: Phone,
  },
  {
    label: "About",
    href: "/about",
    icon: Info,
  },
  {
    label: "Careers",
    href: "/careers",
    icon: Briefcase,
  },
];
