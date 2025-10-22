"use client";

import {
  CalendarIcon,
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import React from "react";

const icons = {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  CalendarIcon,
};

interface AnimatedInputProps {
  name: string;
  placeholder: string;
  icon: keyof typeof icons;
  autoComplete: string;
  color?: string;
  type?: string;
}

const AnimatedInput: React.FC<AnimatedInputProps> = ({
  name,
  placeholder,
  icon,
  autoComplete,
  color = "text-accent",
  type = "text",
}) => {
  const Icon = icons[icon] as React.ElementType;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative">
      <Icon
        className={`absolute left-3 top-3 h-5 w-5 ${color}`}
        aria-hidden="true"
      />
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-label={placeholder}
        className="input input-bordered w-full pl-10 transition-all duration-300 hover:ring-2 hover:ring-highlight"
        required
      />
    </motion.div>
  );
};

export default AnimatedInput;
