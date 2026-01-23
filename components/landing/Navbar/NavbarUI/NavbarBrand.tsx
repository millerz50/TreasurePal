"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { domainConfig } from "@/components/landing/Navbar/ssrWrapperNav/domains";

export function NavbarBrand() {
  const [config, setConfig] = useState(domainConfig.default);

  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    // Animate when in view
    if (inView) controls.start("visible");

    // Detect host dynamically (client-side)
    if (typeof window !== "undefined") {
      const host = window.location.host.replace(/:\d+$/, "");
      setConfig(domainConfig[host] ?? domainConfig.default);
    }
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
      className="flex items-center gap-3"
    >
      <Image
        src="/logo/logo.png"
        alt={`${config.name} logo`}
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
          className="text-lg font-bold bg-clip-text text-transparent bg-[length:200%_100%] bg-gradient-to-r from-[#2563eb] via-[#10b981] to-[#f59e0b]"
        >
          {config.name}
        </motion.span>
        <span className="text-xs text-highlight dark:text-yellow-400">
          {config.description}
        </span>
      </div>
    </motion.div>
  );
}
