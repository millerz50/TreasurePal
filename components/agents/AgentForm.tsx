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
  userId: string; // fetched userId
  fullname: string;
  message: string;
  agencyId: string;
  rating: number | "";
  verified: boolean;
};

type AgentPayload = {
  agentId: string; // map userId -> agentId
  fullname: string;
  message: string;
  agencyId: string | null;
  rating: number | null;
  verified: boolean | null;
};

/* ============================
   API CALL
============================ */
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

  /* ---------------------------
     Initialize values once user is loaded
  --------------------------- */
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

    setValues({
      userId: user.userId, // will map to agentId
      fullname,
      message,
      agencyId: "",
      rating: "",
      verified: false, // always false
    });
  }, [user, loading]);

  const update = useCallback(
    (patch: Partial<AgentFormValues>) => {
      if (!values) return;
      setValues((v) => ({ ...v!, ...patch }));
    },
    [values]
  );

  /* ---------------------------
     Submit handler
  --------------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!values) {
      toast.error("Form is not ready.");
      return;
    }

    const { userId, fullname, message, agencyId, rating, verified } = values;

    if (!fullname || !message || !agencyId) {
      toast.error("Please fill in the agency ID.");
      return;
    }

    if (rating === "" || rating < 1 || rating > 5) {
      toast.error("Please provide a valid rating (1-5).");
      return;
    }

    setSubmitting(true);

    try {
      const payload: AgentPayload = {
        agentId: userId, // map userId to agentId
        fullname,
        message,
        agencyId: agencyId || null,
        rating: typeof rating === "number" ? rating : null,
        verified, // always false
      };

      await submitAgentApplication(payload);
      toast.success("Agent application submitted successfully");

      // WhatsApp auto-send
      const whatsappNumber = "+263777768431";
      const whatsappMessage = encodeURIComponent(
        `Hello, I (${fullname}) have submitted my TreasurePal agent application. My rating: ${rating}`
      );
      window.open(
        `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
        "_blank"
      );

      // Reset editable fields
      setValues((v) => ({
        ...v!,
        agencyId: "",
        rating: "",
        verified: false,
      }));

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

  /* ============================
     UI
  ============================ */
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

      {/* Agency ID */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
          Agency ID
        </label>
        <input
          value={values.agencyId}
          onChange={(e) => update({ agencyId: e.target.value })}
          placeholder="Enter your Agency ID"
          className="input"
          required
        />
      </div>

      {/* User Rating */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
          Your Rating (1-5)
        </label>
        <input
          type="number"
          min={1}
          max={5}
          value={values.rating}
          onChange={(e) =>
            update({
              rating: e.target.value === "" ? "" : Number(e.target.value),
            })
          }
          placeholder="Enter your rating"
          className="input"
          required
        />
      </div>

      {/* Verified note */}
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Note: Verified status will be set by admin after review.
      </p>

      <button
        type="submit"
        disabled={submitting}
        className="w-full px-4 py-3 bg-emerald-600 text-white font-semibold rounded-lg shadow hover:brightness-105 disabled:opacity-60 transition">
        {submitting ? "Submitting…" : "Submit Application"}
      </button>
    </form>
  );
}
