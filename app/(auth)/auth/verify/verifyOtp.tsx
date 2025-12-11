"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function VerifyOtp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const userId =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("userId")
      : null;

  const inputRefs = useRef<HTMLInputElement[]>([]);

  const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
    if (el) inputRefs.current[index] = el;
  };

  function handleChange(value: string, index: number) {
    if (!/^[0-9]?$/.test(value)) return;
    const copied = [...otp];
    copied[index] = value;
    setOtp(copied);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const code = otp.join("");

    if (code.length < 6) {
      setMessage("Please enter the complete 6-digit code.");
      setLoading(false);
      return;
    }

    try {
      // SAME API logic as your signup form
      const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(
        /\/$/,
        ""
      );

      if (!API_BASE) throw new Error("API base URL is not configured");

      const url = API_BASE.endsWith("/api")
        ? `${API_BASE}/users/verify-phone`
        : `${API_BASE}/api/users/verify-phone`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, otp: code }),
      });

      const text = await res.text();

      if (!res.ok) {
        let message = text;
        try {
          const json = JSON.parse(text);
          message = json.error ?? json.message ?? JSON.stringify(json);
        } catch {}
        throw new Error(message || "Verification failed");
      }

      // SUCCESS → redirect
      window.location.href = "/signin";
    } catch (err) {
      setMessage((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-800 to-black p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}>
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white/10 backdrop-blur-lg border border-white/20 space-y-6 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-semibold text-center">
          Verify Your Phone
        </h1>
        <p className="text-sm text-center text-gray-300">
          Enter the 6-digit code sent via SMS.
        </p>

        {/* OTP INPUT */}
        <div className="flex justify-between gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={setInputRef(index)}
              inputMode="numeric"
              maxLength={1}
              className="w-12 h-14 rounded-xl bg-white/20 backdrop-blur-md 
                         text-center text-2xl font-semibold
                         focus:ring-2 focus:ring-teal-400 outline-none"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        {message && (
          <p className="text-center text-red-300 text-sm">{message}</p>
        )}

        <Button
          disabled={loading}
          type="submit"
          className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl">
          {loading ? "Verifying..." : "Verify Code"}
        </Button>

        <p className="text-center text-sm text-gray-300 mt-4">
          Didn’t receive a code?{" "}
          <button
            type="button"
            className="text-teal-300 hover:underline"
            onClick={() => alert("Add resend API here")}>
            Resend
          </button>
        </p>
      </motion.form>
    </motion.div>
  );
}
