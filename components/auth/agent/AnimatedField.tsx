"use client";

import { motion } from "framer-motion";
import React from "react";
export interface AnimatedFieldProps {
  name: string;
  type: string;
  placeholder: string;
  autoComplete?: string; // ✅ Add this line
}

const AnimatedField: React.FC<AnimatedFieldProps> = ({
  name,
  type,
  placeholder,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative">
      <label htmlFor={name} className="sr-only">
        {placeholder}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        required={type !== "file"}
        accept={type === "file" ? "image/*" : undefined}
        aria-label={placeholder}
        className={`${
          type === "file"
            ? "file-input file-input-bordered"
            : "input input-bordered"
        } w-full`}
      />
    </motion.div>
  );
};

export default AnimatedField;
