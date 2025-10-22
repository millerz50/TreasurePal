"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function AgentSignupSubmit() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    const form = document.getElementById("agent-signup-form");
    if (!(form instanceof HTMLFormElement)) return;

    setLoading(true);
    const formData = new FormData(form);

    const requiredFields = [
      "firstName",
      "surname",
      "email",
      "password",
      "nationalId",
      "status",
    ];

    for (const field of requiredFields) {
      const value = formData.get(field);
      if (!value || (typeof value === "string" && value.trim() === "")) {
        toast.error(`Missing required field: ${field}`);
        setLoading(false);
        return;
      }
    }

    const image = formData.get("image");
    if (!(image instanceof File) || image.size === 0) {
      toast.error("Please upload a valid image.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        "https://treasurepal-backened.onrender.com/api/agents/create",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.message || "Signup failed");
      }

      toast.success("Agent registered successfully");
      setTimeout(() => router.push("/agent/dashboard"), 1500);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        aria-label="Submit agent signup form"
        aria-busy={loading}
        className="btn btn-primary w-full">
        {loading ? "Registering..." : "Register as Agent"}
      </button>
    </motion.div>
  );
}
