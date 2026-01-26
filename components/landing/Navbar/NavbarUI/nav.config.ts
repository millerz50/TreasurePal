import { Briefcase, Building2, Home, Info, Phone, Store } from "lucide-react";
import React from "react";

/* ----------------------------------
   Navigation types
----------------------------------- */
export type NavDropdownItem = {
  label: string;
  href: string;
  className?: string;
  subItems?: NavDropdownItem[];
};

export type NavItem = {
  label: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  dropdown?: NavDropdownItem[];
  dropdownClassName?: string;
  itemClassName?: string;
};

/* ----------------------------------
   Final NAV_LINKS (Listings = LINK)
----------------------------------- */
export const NAV_LINKS: NavItem[] = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },

  {
    label: "Listings",
    href: "/listings/properties/buildings",
    icon: Building2,
    // ✅ NO dropdown
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
