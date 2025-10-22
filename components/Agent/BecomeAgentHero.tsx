"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BecomeAgentHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 px-4 py-16 text-center md:px-8 overflow-hidden">
      <div
        className={`transition-all duration-700 ease-out transform ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Become a Netspace Agent
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
          Empower Zimbabwean businesses through tech. Earn commissions, gain
          skills, and grow with us.
        </p>
        <Link href="/agent/signup">
          <button className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-full text-base md:text-lg shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
            Become an Agent
          </button>
        </Link>
      </div>
    </section>
  );
}
