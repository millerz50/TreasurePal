"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

export function NavbarBrand({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: -20, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.8, ease: "easeOut" },
        },
      }}
      className="flex items-center gap-3">
      <Image
        src="/logo/logo.png"
        alt={`${name} logo`}
        width={40}
        height={40}
        className="rounded-xl shadow-md"
        priority
      />
      <div className="flex flex-col">
        <motion.span
          initial={{ backgroundPosition: "0% 0%" }}
          animate={{ backgroundPosition: "200% 0%" }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="text-lg font-bold bg-clip-text text-transparent bg-[length:200%_100%] bg-gradient-to-r from-[#2563eb] via-[#10b981] to-[#f59e0b]">
          {name}
        </motion.span>
        <span className="text-xs text-highlight dark:text-yellow-400">
          {description}
        </span>
      </div>
    </motion.div>
  );
}
