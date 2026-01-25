"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS } from "./nav.config";

export default function NavLinksDesktop() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="flex items-center gap-2">
      {NAV_LINKS.map((item) => {
        const Icon = item.icon;

        return item.dropdown ? (
          <div key={item.label} className="relative">
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === item.label ? null : item.label)
              }
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/10"
            >
              <Icon className="h-4 w-4" />
              {item.label}
              <ChevronDown
                className={`h-4 w-4 transition ${
                  openDropdown === item.label ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {openDropdown === item.label && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  className="absolute left-0 top-full mt-3 w-56 rounded-2xl border bg-background shadow-xl z-50"
                >
                  <div className="p-2 space-y-1">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href!} // fixed TS type
                        onClick={() => setOpenDropdown(null)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-accent/10 hover:text-foreground"
                      >
                        <span className="h-2 w-2 rounded-full bg-accent" />
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link
            key={item.href}
            href={item.href!} // fixed TS type
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/10"
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
