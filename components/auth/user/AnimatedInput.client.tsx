"use client";

import {
  CalendarIcon,
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const icons = {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  CalendarIcon,
};

export default function AnimatedInput({
  name,
  placeholder,
  icon,
  autoComplete,
  color = "text-accent",
  type = "text",
}: {
  name: string;
  placeholder: string;
  icon: keyof typeof icons;
  autoComplete: string;
  color?: string;
  type?: string;
}) {
  const Icon = icons[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative">
      <Icon className={`absolute left-3 top-3 h-5 w-5 ${color}`} />
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="input input-bordered w-full pl-10 transition-all duration-300 hover:ring-2 hover:ring-highlight"
        required
      />
    </motion.div>
  );
}
