"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function NavbarUser() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  // debug log to observe auth values each render
  useEffect(() => {
    console.warn("[NavbarUser] render", {
      loading,
      user: user ? { id: user.userId, email: user.email } : null,
    });
  }, [loading, user]);

  useEffect(() => {
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

  if (loading) {
    return (
      <div className="text-sm text-muted-foreground">
        Loading…
        <div className="text-xs text-muted-foreground/70">
          [debug: auth loading true]
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <Button
          variant="ghost"
          className="text-sm"
          onClick={() => router.push("/signin")}>
          🔑 Sign In
        </Button>
        <div className="mt-1 text-xs text-muted-foreground/70">
          [debug: no user]
        </div>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className="relative flex items-center gap-3">
      <motion.div
        role="button"
        onClick={() => setOpen((prev) => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 cursor-pointer focus:outline-none">
        <span className="text-sm font-medium text-accent dark:text-accent">
          {user.email ?? user.userId}
        </span>
        {user.avatarUrl && (
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
        )}
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
                onClick={() => console.warn("Edit user")}>
                ✏️ Edit Profile
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-sm hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400"
                onClick={signOut}>
                🚪 Sign Out
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
