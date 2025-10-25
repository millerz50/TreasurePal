"use client";

import { useEffect, useState } from "react";

export default function LogoLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(false), 2500);
    return () => clearTimeout(timeout);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-base-100">
      <svg
        viewBox="0 0 200 150"
        xmlns="http://www.w3.org/2000/svg"
        className="w-48 sm:w-56 md:w-64 lg:w-72">
        <defs>
          <filter id="shadow-blue" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0074D9" />
          </filter>
          <filter
            id="shadow-green"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#2ECC40" />
          </filter>
          <style>
            {`
              .fadeInOut {
                animation: fadeInOut 2.5s ease-in-out infinite;
              }
              @keyframes fadeInOut {
                0%, 100% { opacity: 0; transform: scale(0.8); }
                50% { opacity: 0.5; transform: scale(1); }
              }
            `}
          </style>
        </defs>

        {/* Blue Triangle */}
        <polygon
          points="30,110 70,50 110,110"
          fill="#0074D9"
          filter="url(#shadow-blue)"
          className="animate-[bounce_1.2s_ease-in-out_infinite]"
        />
        {/* Blue Window */}
        <rect x="55" y="75" width="20" height="20" fill="white" rx="3" />
        {/* Blue Shadow */}
        <ellipse
          cx="65"
          cy="85"
          rx="6"
          ry="8"
          fill="rgba(0,0,0,0.3)"
          className="fadeInOut"
        />

        {/* Green Triangle */}
        <polygon
          points="90,110 130,50 170,110"
          fill="#2ECC40"
          filter="url(#shadow-green)"
          className="animate-[bounce_1.2s_ease-in-out_infinite] [animation-delay:0.3s]"
        />
        {/* Green Window */}
        <rect x="115" y="75" width="20" height="20" fill="white" rx="3" />
        {/* Green Shadow */}
        <ellipse
          cx="125"
          cy="85"
          rx="6"
          ry="8"
          fill="rgba(0,0,0,0.3)"
          className="fadeInOut"
        />
      </svg>
    </div>
  );
}
