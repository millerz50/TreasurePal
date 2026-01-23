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

export default function AdsLoader() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const impressionFired = useRef(false);

  // Show ad only once per session
  useEffect(() => {
    const shown = sessionStorage.getItem("splash_ad_seen");
    if (!shown && ads.length > 0) {
      setVisible(true);
      sessionStorage.setItem("splash_ad_seen", "true");
    }
  }, []);

  // Auto hide after 15s
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setVisible(false), 15000);
    return () => clearTimeout(timer);
  }, [visible]);

  // Carousel rotation (only if more than 1 ad)
  useEffect(() => {
    if (ads.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ads.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fire impression ONCE per view
  useEffect(() => {
    if (!visible || impressionFired.current) return;
    const img = new Image();
    img.src = ads[current].impressionPixel;
    impressionFired.current = true;
  }, [visible, current]);

  if (!visible) return null;

  const ad = ads[current];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl bg-white dark:bg-slate-800">
        <a
          href={ad.clickLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <img
            src={ad.bannerImg}
            alt={ad.alt}
            className="w-full h-auto max-h-[80vh] object-contain"
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm sm:text-base font-semibold shadow-md">
            {ad.title}
          </div>
        </a>

        {/* Close */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-3 right-3 bg-black/70 text-white w-10 h-10 rounded-full text-2xl hover:bg-black transition"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
