"use client";

import { Button } from "@/components/ui/button";
import { User } from "@/lib/types/navbarTypes";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function NavbarUser({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return null;

  return (
    <div ref={dropdownRef} className="relative flex items-center gap-3">
      <motion.div
        role="button"
        onClick={() => setOpen((prev) => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 cursor-pointer focus:outline-none">
        <span className="text-sm font-medium text-accent dark:text-accent">
          {user.name}
        </span>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}>
          <Image
            src={user.avatarUrl}
            alt="User avatar"
            width={40}
            height={40}
            className="rounded-full object-cover shadow-md"
          />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-48 bg-base-100 dark:bg-neutral rounded-box shadow-lg border border-base-300 z-[999]">
            <div className="flex flex-col p-3 space-y-2">
              <Button
                variant="ghost"
                className="justify-start text-sm hover:bg-accent/10"
                onClick={() => console.log("Edit user")}>
                ✏️ Edit Profile
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-sm hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400"
                onClick={() => console.log("Sign out")}>
                🚪 Sign Out
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
