// components/AdsLoader.tsx
"use client";

import { useEffect, useState } from "react";

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
  // add more ads here if needed
];

export default function AdsLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // auto-hide after 5 seconds if user doesn't close
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative bg-white rounded-lg overflow-hidden w-[90%] max-w-xl shadow-lg">
        <a href={ads[0].link} target="_blank" rel="noopener noreferrer">
          <img src={ads[0].banner} alt={ads[0].alt} className="w-full h-auto" />
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
