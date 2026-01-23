"use client";

import { useEffect, useRef, useState } from "react";

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
    bannerImg: "/d7a05900-889a-47bf-91eb-cc76ad74884f.png",
    impressionPixel:
      "https://deriv.partners/rx?ca=&strategy_node_id=256926&slink_id=0&is_ib=0&type=view&media=banner",
    alt: "Deriv Banner",
    title: "Trade Crypto & Synthetics 24/7 🚀",
  },
];

export default function AdsCarousel() {
  const [current, setCurrent] = useState(0);
  const fired = useRef(false);

  useEffect(() => {
    if (ads.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ads.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fire impression once
  useEffect(() => {
    if (fired.current) return;
    const img = new Image();
    img.src = ads[current].impressionPixel;
    fired.current = true;
  }, [current]);

  const ad = ads[current];

  return (
    <div className="relative w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg">
      <a
        href={ad.clickLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <img
          src={ad.bannerImg}
          alt={ad.alt}
          className="w-full h-auto max-h-[400px] object-contain"
        />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-md text-xs sm:text-sm font-semibold shadow-md">
          {ad.title}
        </div>
      </a>

      {ads.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
          {ads.map((_, idx) => (
            <span
              key={idx}
              className={`w-2.5 h-2.5 rounded-full ${
                idx === current ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
