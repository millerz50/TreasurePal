"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function RegisterFormSubmit() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const triggerSubmit = async () => {
    const form = document.getElementById("register-form");
    if (!(form instanceof HTMLFormElement)) return;

    setLoading(true);
    const formData = new FormData(form);
    const payload: Record<string, string> = {};
    formData.forEach((value, key) => {
      payload[key] = value.toString();
    });

    try {
      const res = await fetch(
        "https://treasurepal-backened.onrender.com/api/users/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Registration failed");

      toast.success("Account created successfully");
      setTimeout(() => router.push("/user/auth/login"), 1500);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full mt-4">
      <Button
        onClick={triggerSubmit}
        className="w-full"
        disabled={loading}
        aria-busy={loading}
        aria-label="Submit registration form">
        {loading ? "Registering..." : "Sign Up"}
      </Button>
    </motion.div>
  );
}
