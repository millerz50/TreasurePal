import { PROPERTY_HIERARCHY } from "@/components/property/PropertyMapping/propertySetup";
import { Briefcase, Building2, Home, Info, Phone, Store } from "lucide-react";
import React from "react";

/* ----------------------------------
   Navigation types
----------------------------------- */
export type NavDropdownItem = {
  label: string;
  href: string;
  className?: string;
  subItems?: NavDropdownItem[]; // for categories with multiple subtypes
};

export type NavItem = {
  label: string;
  href?: string; // Main link (optional if dropdown)
  icon: React.ComponentType<{ className?: string }>;
  dropdown?: NavDropdownItem[];
  dropdownClassName?: string;
  itemClassName?: string;
};

/* ----------------------------------
   Build Listings dropdown by category
----------------------------------- */
const listingsDropdown: NavDropdownItem[] = Object.values(PROPERTY_HIERARCHY)
  .map((category) => {
    // Map each subType to a dropdown item
    const subItems: NavDropdownItem[] = category.subTypes.map((subType) => ({
      label: subType,
      href: `/listings/${subType.toLowerCase()}`,
    }));

    // Skip categories with no subtypes
    if (!subItems.length) return null;

    return {
      label: category.label,
      href: subItems[0].href, // main category link goes to first subitem
      subItems,
    };
  })
  .filter(Boolean) as NavDropdownItem[];

// Add transaction links at the end
listingsDropdown.push(
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
);

/* ----------------------------------
   Final NAV_LINKS
----------------------------------- */
export const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  {
    label: "Listings",
    icon: Building2,
    href: listingsDropdown[0]?.href || "#", // fallback to first subitem
    dropdownClassName:
      "absolute left-0 top-full mt-3 w-72 rounded-2xl border bg-background shadow-xl ring-1 ring-black/5 dark:ring-white/10",
    itemClassName:
      "flex items-center rounded-lg px-4 py-2 text-sm font-medium transition hover:bg-muted hover:text-primary dark:hover:bg-muted/50",
    dropdown: listingsDropdown,
  },
  { label: "Marketplace", href: "/marketplace", icon: Store },
  { label: "Contact", href: "/contact", icon: Phone },
  { label: "About", href: "/about", icon: Info },
  { label: "Careers", href: "/careers", icon: Briefcase },
];
