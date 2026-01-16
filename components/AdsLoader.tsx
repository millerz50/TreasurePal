
"use client";

import { useEffect, useState } from "react";

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
    bannerImg: "/d7a05900-889a-47bf-91eb-cc76ad74884f.png", // uploaded image
    impressionPixel:
      "https://deriv.partners/rx?ca=&strategy_node_id=256926&slink_id=0&is_ib=0&type=view&media=banner",
    alt: "Deriv Banner",
    title: "Trade Crypto & Synthetics 24/7 🚀",
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
      <div className="relative bg-white rounded-xl overflow-hidden shadow-lg w-full max-w-xs sm:max-w-sm">
        <a
          href={ads[0].clickLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative"
        >
          {/* Image with proper aspect ratio */}
          <img
            src={ads[0].bannerImg}
            alt={ads[0].alt}
            className="w-full h-auto max-h-[400px] object-contain mx-auto"
          />
          {/* CTA overlay */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-bold shadow-md">
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
