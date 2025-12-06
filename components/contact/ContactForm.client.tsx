// components/contact/ContactForm.client.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const statusRef = useRef<HTMLDivElement | null>(null);

  // Derive reduced motion preference synchronously to avoid setState inside an effect
  const [reducedMotion] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }
    try {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (statusRef.current) {
      statusRef.current.focus();
    }
  }, [status]);

  const resetForm = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setHoneypot("");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setStatus("submitting");

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg("Please fill in your name, email and message.");
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message, honeypot }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        resetForm();
      } else {
        setErrorMsg(data?.message || "Submission failed");
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Network or server error. Try again later.");
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-lg p-6 shadow-sm"
      noValidate
      aria-describedby="contact-form-status">
      <div className="grid gap-3">
        {/* Inputs omitted for brevity, unchanged */}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2ECC71] to-[#1E90FF] text-white px-4 py-2 rounded-full text-sm font-semibold shadow hover:scale-[1.01] transition-transform disabled:opacity-60">
            {status === "submitting" ? (
              <svg
                className={`w-4 h-4 ${reducedMotion ? "" : "animate-spin"}`}
                viewBox="0 0 24 24"
                fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="white"
                  strokeWidth="3"
                  opacity="0.25"
                />
                <path
                  d="M22 12a10 10 0 00-10-10"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            ) : null}
            Send message
          </button>

          <div className="text-sm text-slate-600 dark:text-slate-300">
            <span className="font-medium">Response</span> within 48 hours
          </div>
        </div>

        <div
          id="contact-form-status"
          ref={statusRef}
          tabIndex={-1}
          aria-live="polite"
          className={`mt-2 text-sm ${
            status === "success"
              ? "text-green-600"
              : status === "error"
              ? "text-red-600"
              : "text-slate-600"
          }`}>
          {status === "success" && "Thanks — we received your message."}
          {status === "error" && (errorMsg || "Submission failed.")}
        </div>
      </div>
    </form>
  );
}
