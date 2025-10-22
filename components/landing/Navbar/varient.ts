// variants.ts
import type { Variants } from "framer-motion";

// NavbarBrand container animation
export const containerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Logo image animation
export const imageVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

// Shimmer effect for heading text
export const shimmerVariants: Variants = {
  hidden: { backgroundPosition: "0% 0%" },
  visible: {
    backgroundPosition: "200% 0%",
    transition: { duration: 3, repeat: Infinity, ease: "linear" },
  },
};

// Staggered entrance for grouped elements (e.g. navbar actions)
export const fadeUp: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Individual item animation for staggered groups
export const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
