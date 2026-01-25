"use client";

import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import NavbarUser from "./NavbarUser";
import { NAV_LINKS } from "./nav.config";

export function NavbarMobileMenu() {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div className="lg:hidden relative">
      <button
        onClick={() => setOpen((p) => !p)}
        aria-label="Toggle menu"
        className="rounded-full p-2 hover:bg-accent/10"
      >
        {open ? <X /> : <Menu />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="absolute right-0 mt-3 w-80 rounded-3xl border bg-background shadow-2xl p-4 z-50"
          >
            {NAV_LINKS.map((item) => {
              const Icon = item.icon;

              return item.dropdown ? (
                <div key={item.label} className="space-y-1">
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.label ? null : item.label,
                      )
                    }
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm hover:bg-accent/10"
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 transition ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === item.label &&
                    item.dropdown.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href!} // fixed TS type
                        onClick={() => setOpen(false)}
                        className="ml-8 block rounded-lg px-3 py-2 text-sm hover:bg-accent/10"
                      >
                        {sub.label}
                      </Link>
                    ))}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!} // fixed TS type
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm hover:bg-accent/10"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}

            <div className="border-t mt-4 pt-4 space-y-3">
              <NavbarUser />
              <ThemeSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
