"use client";

import { useEffect, useState } from "react";

export default function LogoLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(false), 2000); // adjust duration
    return () => clearTimeout(timeout);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-base-100">
      <svg
        width="120"
        height="120"
        viewBox="0 0 200 150"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-pulse">
        <polygon
          points="20,100 60,60 100,100"
          fill="#0074D9"
          className="animate-bounce origin-center"
        />
        <polygon
          points="100,100 140,60 180,100"
          fill="#2ECC40"
          className="animate-bounce origin-center delay-200"
        />
        <text
          x="100"
          y="125"
          fontSize="16"
          fontFamily="Arial"
          textAnchor="middle">
          <tspan fill="#2ECC40">TREASURE </tspan>
          <tspan fill="#0074D9">PAL</tspan>
        </text>
        <text
          x="100"
          y="140"
          fontSize="10"
          fontFamily="Arial"
          textAnchor="middle"
          fill="#0074D9">
          AFFORDABLE.PROPERTIES
        </text>
      </svg>
    </div>
  );
}
