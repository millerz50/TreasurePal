"use client";

import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { useAuth } from "@/context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import NavbarUser from "./NavbarUser";
import { NAV_LINKS } from "./nav.config";

export function NavbarMobileMenu() {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { user } = useAuth();

  return (
    <div className="lg:hidden relative">
      <button
        onClick={() => setOpen((p) => !p)}
        aria-label="Toggle menu"
        className="rounded-full p-2 hover:bg-accent/10 transition">
        {open ? <X /> : <Menu />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="absolute right-0 mt-3 w-80 rounded-3xl border bg-background shadow-2xl p-4 z-50">
            {NAV_LINKS.map((item) => {
              const Icon = item.icon;

              return item.dropdown ? (
                <div key={item.label} className="space-y-1">
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.label ? null : item.label
                      )
                    }
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm hover:bg-accent/10">
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

                  <AnimatePresence>
                    {openDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-8 space-y-1">
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/10">
                            {sub.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm hover:bg-accent/10">
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}

            <div className="my-4 border-t pt-4 space-y-3">
              {user ? (
                <NavbarUser />
              ) : (
                <Button className="w-full rounded-full">Join Us</Button>
              )}
              <ThemeSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
