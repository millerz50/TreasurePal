// components/AdsCarousel.tsx
"use client";

import { useState, useEffect } from "react";

type Ad = {
  link: string;
  banner: string;
  alt: string;
};

const ads: Ad[] = [
  {
    link: "https://deriv.partners/rx?sidc=7CCE174A-5078-425E-8194-93D9AD9A63F8&utm_campaign=dynamicworks&utm_medium=affiliate&utm_source=CU218274",
    banner: "https://deriv.partners/rx?ca=&strategy_node_id=256926&slink_id=0&is_ib=0&type=view&media=banner",
    alt: "Deriv Banner",
  },
  // Add more ads here
];

export default function AdsCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ads.length);
    }, 4000); // rotate every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-lg shadow-lg">
      {ads.map((ad, index) => (
        <a
          key={index}
          href={ad.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0 absolute inset-0"
          }`}
        >
          <img src={ad.banner} alt={ad.alt} className="w-full h-auto" />
        </a>
      ))}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {ads.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full transition ${
              idx === current ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
