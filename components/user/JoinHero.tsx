// components/user/JoinHero.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { domainConfig } from "../landing/Navbar/ssrWrapperNav/domains"; // import domain config

/** Synchronous check for reduced motion preference (safe on server) */
function prefersReducedMotionSync(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

/**
 * JoinHero
 *
 * - Uses domainConfig to show brand-specific copy.
 * - When the CTA is clicked it:
 *   1. Dispatches a `openAgentJoin` CustomEvent (so an Agent component/modal can listen and open immediately).
 *   2. Navigates to the canonical join route `/agents/join` so users who land there directly still see the join flow.
 *
 * If your agent component listens for the event, it can open a modal instantly; otherwise the route `/agents/join`
 * should render the join/request-to-be-agent UI.
 */
export default function JoinHero() {
  // Derive initial visible state from reduced-motion preference
  const initialVisible = prefersReducedMotionSync();
  const [visible, setVisible] = useState<boolean>(initialVisible);

  // Domain-based branding
  const [brand, setBrand] = useState(domainConfig["default"]);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const host = window.location.hostname;
    setBrand(domainConfig[host] || domainConfig["default"]);
  }, []);

  // entrance animation (respect reduced motion)
  useEffect(() => {
    if (initialVisible) return;
    const timeout = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timeout);
  }, [initialVisible]);

  const router = useRouter();

  // CTA handler: dispatch event for in-page agent component, then navigate to canonical join route
  const handleJoinClick = (e?: React.MouseEvent) => {
    // allow any parent handlers to run first
    try {
      // Dispatch a DOM event so an Agent component (if mounted) can open a modal immediately
      const ev = new CustomEvent("openAgentJoin", {
        detail: { source: "JoinHero", timestamp: Date.now() },
        bubbles: true,
        cancelable: true,
      });
      window.dispatchEvent(ev);
    } catch {
      // ignore if CustomEvent isn't supported (very old browsers)
    }

    // Navigate to canonical join page so direct visits work
    // Use router.push to ensure client-side navigation
    try {
      router.push("/agents/join");
    } catch {
      // fallback: Link will handle navigation if router.push fails
    }

    // Prevent default Link behavior if this handler is attached to a Link onClick
    if (e) e.preventDefault();
  };

  return (
    <section
      className="px-4 py-16 md:px-8 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-800"
      aria-labelledby="become-agent-title">
      <div
        className={`mx-auto max-w-4xl text-center transition-all duration-700 ease-out transform ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}>
        <h1
          id="become-agent-title"
          className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-slate-100 mb-4 tracking-tight">
          Join {brand.name}
        </h1>

        <p className="text-gray-600 dark:text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
          {brand.description} — Earn commissions, gain skills, and grow with us.
        </p>

        {/* CTA: dispatch event + navigate to canonical join route */}
        <Link
          href="/agents/join"
          onClick={handleJoinClick}
          className="inline-block focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:outline-none rounded-full shadow-md transition-transform duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
          aria-label={`Join ${brand.name}`}>
          <span className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#2ECC71] to-[#1E90FF] text-white font-medium px-8 py-3 rounded-full text-base md:text-lg">
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="flex-shrink-0">
              <path
                d="M12 2v20"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 9h14"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Join {brand.name}
          </span>
        </Link>
      </div>
    </section>
  );
}
