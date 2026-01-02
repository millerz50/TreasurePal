"use client";

import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import Image from "next/image";

export default function NavbarUser() {
  const { user, loading } = useAuth();

  // Not authenticated or still loading → render nothing
  if (loading || !user) return null;

  return (
    <div className="relative">
      <motion.button
        type="button"
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
    </div>
  );
}
