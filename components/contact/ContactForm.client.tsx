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

  const [reducedMotion] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    statusRef.current?.focus();
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
        setErrorMsg(data?.message || "Submission failed.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network or server error. Try again later.");
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-describedby="contact-form-status"
      className="space-y-5 text-base-content">
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
      />

      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Full name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded-lg border border-base-300 bg-base-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-1">Email address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-lg border border-base-300 bg-base-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Subject */}
      <div>
        <label className="block text-sm font-medium mb-1">Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full rounded-lg border border-base-300 bg-base-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="w-full rounded-lg border border-base-300 bg-base-100 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-content shadow hover:scale-[1.01] transition disabled:opacity-60">
          {status === "submitting" && (
            <svg
              className={`w-4 h-4 ${reducedMotion ? "" : "animate-spin"}`}
              viewBox="0 0 24 24"
              fill="none">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                opacity="0.25"
              />
              <path
                d="M22 12a10 10 0 00-10-10"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          )}
          Send message
        </button>

        <span className="text-sm text-base-content/70">
          Response within 48 hours
        </span>
      </div>

      {/* Status */}
      <div
        id="contact-form-status"
        ref={statusRef}
        tabIndex={-1}
        aria-live="polite"
        className={`text-sm ${
          status === "success"
            ? "text-success"
            : status === "error"
            ? "text-error"
            : "text-base-content/70"
        }`}>
        {status === "success" && "Thanks — we received your message."}
        {status === "error" && errorMsg}
      </div>
    </form>
  );
}
