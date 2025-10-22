"use client";

import RegisterForm from "@/components/auth/user/RegisterForm.server";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Register | TreasurePal",
  description:
    "Create your TreasurePal account to access treasures and properties around the globe. Find anything to your specification.",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-accent to-highlight px-4">
      <section className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-base-100 rounded-box shadow-2xl p-8 font-sans">
        {/* Left side: Heading and Description */}
        <div className="flex flex-col justify-center text-base-content">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/854/854894.png"
            alt="Treasure icon"
            width={64}
            height={64}
            className="mb-4 animate-bounce"
            priority
          />
          <h1 className="text-4xl font-bold text-primary mb-4">
            Welcome to TreasurePal
          </h1>
          <p className="text-base">
            Create your account to unlock access to unique treasures and
            properties around the world. Customize your search, manage your
            listings, and connect with fellow treasure seekers.
          </p>
        </div>

        {/* Right side: Registration Form */}
        <div className="w-full">
          <RegisterForm />
        </div>
      </section>
    </main>
  );
}
