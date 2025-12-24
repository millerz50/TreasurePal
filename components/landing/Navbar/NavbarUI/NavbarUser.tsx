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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading…</div>;
  }

  if (!user) {
    return (
      <Button
        variant="ghost"
        className="text-sm flex items-center gap-2"
        onClick={() => router.push("/signin")}>
        🔑 <span className="hidden sm:inline">Sign In</span>
      </Button>
    );
  }

  return (
    <div ref={dropdownRef} className="relative flex items-center gap-3">
      <motion.button
        type="button"
        onClick={() => setOpen((p) => !p)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-accent/10">
        <span className="text-sm font-medium text-accent">
          {user.email ?? user.userId}
        </span>

        {user.avatarUrl && (
          <Image
            src={user.avatarUrl}
            alt="User avatar"
            width={36}
            height={36}
            className="rounded-full object-cover shadow"
          />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-56 rounded-2xl border bg-background shadow-xl z-50">
            <div className="flex flex-col p-2 space-y-1">
              <NavItem
                label="Dashboard"
                onClick={() => router.push("/dashboard")}
              />
              <NavItem
                label="Settings"
                onClick={() => router.push("/profile/settings")}
              />
              <NavItem
                label="Profile"
                onClick={() => router.push("/profile")}
              />
              <NavItem label="Sign Out" danger onClick={signOut} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------ */

function NavItem({
  label,
  onClick,
  danger,
}: {
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={`justify-start text-sm ${
        danger
          ? "text-red-600 hover:bg-red-100 dark:hover:bg-red-900"
          : "hover:bg-accent/10"
      }`}>
      {label}
    </Button>
  );
}
