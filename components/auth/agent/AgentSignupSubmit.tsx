"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"; // Adjust path if needed
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function AgentSignupSubmit() {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    console.log("🔍 Starting agent signup");
    const form = document.getElementById("agent-signup-form");
    if (!(form instanceof HTMLFormElement)) {
      console.warn("⚠️ Form not found");
      return;
    }

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
      console.log(`📦 Field ${field}:`, value);
      if (!value || (typeof value === "string" && value.trim() === "")) {
        toast.error(`Missing required field: ${field}`);
        setLoading(false);
        return;
      }
    }

    const image = formData.get("image");
    console.log("🖼️ Image:", image);
    if (!(image instanceof File) || image.size === 0) {
      toast.error("Please upload a valid image.");
      setLoading(false);
      return;
    }

    try {
      console.log("📡 Sending request to backend...");
      const res = await fetch(
        "https://treasurepal-backened.onrender.com/api/agents/create",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      console.log("📥 Response:", res.status, data);

      if (!res.ok) {
        const message = data.error || data.message || "Signup failed";
        setErrorMessage(message);
        setDialogOpen(true);
        throw new Error(message);
      }

      toast.success("Agent registered successfully");
      setTimeout(() => router.push("/agent/dashboard"), 1500);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      console.error("❌ Signup error:", message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogTitle>Signup Error</DialogTitle>
          <DialogDescription>
            {errorMessage || "Something went wrong during registration."}
          </DialogDescription>
        </DialogContent>
      </Dialog>

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
    </>
  );
}
