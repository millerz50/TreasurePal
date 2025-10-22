// components/AnimatedField.tsx
"use client";

import { motion } from "framer-motion";

export default function AnimatedField({
  name,
  type,
  placeholder,
}: {
  name: string;
  type: string;
  placeholder: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={type !== "file"}
        accept={type === "file" ? "image/*" : undefined}
        className={`${
          type === "file"
            ? "file-input file-input-bordered"
            : "input input-bordered"
        } w-full`}
      />
    </motion.div>
  );
}
