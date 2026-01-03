"use client";

import { useAuth } from "@/context/AuthContext";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

/* ============================
   TYPES
============================ */
type AgentFormProps = {
  onSuccess?: () => void;
};

type AgentFormValues = {
  userId: string;
  fullname: string;
  message: string;
};

type AgentPayload = {
  agentId: string; // maps to userId
  fullname: string;
  message: string;
  agencyId: string | null;
  rating: number | null; // always null
  verified: boolean | null; // always false
};

/* ============================
   API CALLS
============================ */
async function createAgency(): Promise<string> {
  // call backend API to create a new agency and return its ID
  const res = await fetch(
    "https://treasurepalapi.onrender.com/api/agency/create",
    { method: "POST" }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "Failed to create agency");
  }

  const data = await res.json();
  return data.agencyId; // backend must return { agencyId: '...' }
}

async function submitAgentApplication(payload: AgentPayload) {
  const res = await fetch(
    "https://treasurepalapi.onrender.com/api/agents/apply",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "Application submission failed");
  }

  return res.json();
}

/* ============================
   COMPONENT
============================ */
export default function AgentForm({ onSuccess }: AgentFormProps) {
  const { user, loading } = useAuth();
  const [values, setValues] = useState<AgentFormValues | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Initialize form
  useEffect(() => {
    if (loading) return;
    if (!user || !user.userId) {
      toast.error("You must be logged in to apply.");
      return;
    }

    const fullname = `${user.firstName ?? ""} ${user.surname ?? ""}`.trim();
    if (!fullname) {
      toast.error("Your account is missing a name.");
      return;
    }

    const message = `I, ${fullname}, hereby apply to become a TreasurePal agent. I confirm that all information provided is accurate and truthful.`;

    setValues({ userId: user.userId, fullname, message });
  }, [user, loading]);

  const update = useCallback(
    (patch: Partial<AgentFormValues>) => {
      if (!values) return;
      setValues((v) => ({ ...v!, ...patch }));
    },
    [values]
  );

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!values) return toast.error("Form is not ready.");

    setSubmitting(true);

    try {
      // 1️⃣ Create agency first
      const agencyId = await createAgency();

      // 2️⃣ Build payload
      const payload: AgentPayload = {
        agentId: values.userId,
        fullname: values.fullname,
        message: values.message,
        agencyId,
        rating: null, // rating set by admin
        verified: false, // always false
      };

      // 3️⃣ Submit agent application
      await submitAgentApplication(payload);
      toast.success("Agent application submitted successfully");

      // 4️⃣ WhatsApp notification
      const whatsappNumber = "+263777768431";
      const whatsappMessage = encodeURIComponent(
        `Hello, I (${values.fullname}) have submitted my TreasurePal agent application.`
      );
      window.open(
        `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
        "_blank"
      );

      // Reset form
      setValues((v) => ({ ...v!, message: "", fullname: "" }));

      onSuccess?.();
    } catch (err: any) {
      toast.error(err?.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !values) {
    return <p className="text-sm text-slate-500">Loading your profile…</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
        Apply to Become an Agent
      </h2>

      {/* Fullname (locked) */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
          Full Name
        </label>
        <input
          value={values.fullname}
          disabled
          className="input bg-gray-100 dark:bg-slate-800 cursor-not-allowed"
        />
      </div>

      {/* Message (locked) */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
          Application Message
        </label>
        <textarea
          value={values.message}
          disabled
          rows={4}
          className="input bg-gray-100 dark:bg-slate-800 cursor-not-allowed resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full px-4 py-3 bg-emerald-600 text-white font-semibold rounded-lg shadow hover:brightness-105 disabled:opacity-60 transition">
        {submitting ? "Submitting…" : "Submit Application"}
      </button>
    </form>
  );
}
