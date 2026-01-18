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
    bannerImg: "/d7a05900-889a-47bf-91eb-cc76ad74884f.png",
    impressionPixel:
      "https://deriv.partners/rx?ca=&strategy_node_id=256926&slink_id=0&is_ib=0&type=view&media=banner",
    alt: "Deriv Banner",
    title: "Trade Crypto & Synthetics 24/7 🚀",
  },
  // Add more ads here if needed
];

export default function AdsLoader() {
  const [visible, setVisible] = useState(true);
  const [current, setCurrent] = useState(0);

  // Auto carousel
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 15000); // auto-hide after 15s
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % ads.length),
      5000 // change ad every 5s
    );
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg sm:max-w-xl lg:max-w-2xl mx-auto overflow-hidden rounded-xl shadow-2xl bg-white dark:bg-slate-800">
        {/* Carousel */}
        {ads.map((ad, idx) => (
          <a
            key={idx}
            href={ad.clickLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-opacity duration-1000 ease-in-out ${
              idx === current
                ? "opacity-100 relative"
                : "opacity-0 absolute inset-0"
            }`}
          >
            <img
              src={ad.bannerImg}
              alt={ad.alt}
              className="w-full h-auto max-h-[80vh] object-contain mx-auto"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm sm:text-base font-semibold shadow-md">
              {ad.title}
            </div>
            {/* Hidden impression pixel */}
            <img src={ad.impressionPixel} alt="" style={{ display: "none" }} />
          </a>
        ))}

        {/* Close Button */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-3 right-3 bg-gray-800 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl hover:bg-gray-700 transition"
        >
          &times;
        </button>

        {/* Dots Carousel */}
        {ads.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
            {ads.map((_, idx) => (
              <span
                key={idx}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === current ? "bg-blue-500 scale-125" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
