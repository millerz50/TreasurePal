"use client";

import { useEffect, useState } from "react";

type Ad = {
  clickLink: string;
  bannerImg: string;
  impressionPixel: string;
  alt: string;
  title: string; // Added CTA / affiliate text
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
    title: "Start Trading Today! Get Exclusive Bonuses 🎯",
  },
];

export default function AdsLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative bg-white rounded-xl overflow-hidden shadow-xl max-w-xs sm:max-w-sm w-full">
        <a href={ads[0].clickLink} target="_blank" rel="noopener noreferrer">
          <img
            src={ads[0].bannerImg}
            alt={ads[0].alt}
            className="w-full h-auto object-contain"
          />
          {/* Overlay text CTA */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-semibold shadow-md">
            {ads[0].title}
          </div>
          {/* Hidden impression pixel */}
          <img
            src={ads[0].impressionPixel}
            alt=""
            style={{ display: "none" }}
          />
        </a>
        <button
          onClick={() => setVisible(false)}
          className="absolute top-2 right-2 bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg hover:bg-gray-700 transition"
        >
          &times;
        </button>
      </div>
    </div>
  );
}

