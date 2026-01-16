"use client";

import { useState, useEffect } from "react";

type Ad = {
  clickLink: string;
  bannerImg: string;
  impressionPixel: string;
  alt: string;
  title: string;
};

const ads: Ad[] = [
  {
    clickLink:
      "https://deriv.partners/rx?ca=&strategy_node_id=256926&slink_id=0&is_ib=0&type=click&media=banner&lang=en",
    bannerImg:
      "https://deriv.partners/assets/image/imageoriginal/247-120x600.png",
    impressionPixel:
      "https://deriv.partners/rx?ca=&strategy_node_id=256926&slink_id=0&is_ib=0&type=view&media=banner",
    alt: "Deriv Banner",
    title: "Trade Now! Earn Exclusive Rewards 🔥",
  },
  // Add more ads here
];

export default function AdsCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % ads.length),
      5000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg">
      {ads.map((ad, idx) => (
        <a
          key={idx}
          href={ad.clickLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`transition-opacity duration-1000 ${
            idx === current ? "opacity-100 relative" : "opacity-0 absolute inset-0"
          }`}
        >
          <img
            src={ad.bannerImg}
            alt={ad.alt}
            className="w-full h-auto object-contain"
          />
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-2 py-1 rounded-md text-xs sm:text-sm font-semibold shadow-md">
            {ad.title}
          </div>
          {/* Hidden impression pixel */}
          <img src={ad.impressionPixel} alt="" style={{ display: "none" }} />
        </a>
      ))}
      {/* Navigation dots */}
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

