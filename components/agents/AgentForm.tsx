"use client";

import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

/* ============================
   API URL SELECTION
   - Uses env var NEXT_PUBLIC_API_VERSION to pick v1 or v2.
   - If NEXT_PUBLIC_API_VERSION is not set, falls back to V2 then V1.
   - Expected env values for version: "v1" or "v2"
============================ */
function getApiUrl(): string {
  const v = process.env.NEXT_PUBLIC_API_VERSION;
  const v1 = process.env.NEXT_PUBLIC_API_URLV1;
  const v2 = process.env.NEXT_PUBLIC_API_URLV2;

  if (v === "v2" && v2) return v2;
  if (v === "v1" && v1) return v1;

  if (v2) return v2;
  if (v1) return v1;

  return "";
}

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
  accountid: string; // backend requires this now
  fullname: string;
  message: string;
  agentId?: string | null; // optional
  rating?: number | null; // optional
  verified?: boolean | null; // optional
};

/* ============================
   API CALL (with forced debugging)
============================ */
async function submitAgentApplication(payload: AgentPayload) {
  const API_BASE = getApiUrl();
  if (!API_BASE) {
    console.error("submitAgentApplication: API base URL not configured");
    throw new Error(
      "API base URL is not configured. Set NEXT_PUBLIC_API_URLV1 or NEXT_PUBLIC_API_URLV2 and optionally NEXT_PUBLIC_API_VERSION."
    );
  }

  console.log("=======================================");
  console.log("submitAgentApplication (frontend): START");
  console.log("Payload being sent:", JSON.stringify(payload, null, 2));
  console.log("Using API base:", API_BASE);
  console.log("=======================================");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}/api/agents/apply`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  console.log(
    "submitAgentApplication (frontend): Response status:",
    res.status
  );

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    console.error("=======================================");
    console.error("submitAgentApplication (frontend): API ERROR");
    console.error("Status:", res.status);
    console.error("Error body:", JSON.stringify(errBody, null, 2));
    console.error("=======================================");
    throw new Error(errBody?.message || "Application submission failed");
  }

  const data = await res.json().catch(() => null);
  console.log("=======================================");
  console.log("submitAgentApplication (frontend): SUCCESS RESPONSE");
  console.log("Data:", JSON.stringify(data, null, 2));
  console.log("=======================================");
  return data;
}

/* ============================
   COMPONENT
============================ */
export default function AgentForm({ onSuccess }: AgentFormProps) {
  const { user, loading } = useAuth();
  const [values, setValues] = useState<AgentFormValues | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (!user?.userId) {
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
      userId: user.userId,
      fullname,
      message,
    });
  }, [user, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!values) return;

    setSubmitting(true);

    try {
      const payload: AgentPayload = {
        accountid: values.userId, // map userId → accountid
        fullname: values.fullname,
        message: values.message,
        verified: false, // optional default
      };

      console.log(
        "AgentForm: Final payload before submit:",
        JSON.stringify(payload, null, 2)
      );

      await submitAgentApplication(payload);

      toast.success("Agent application submitted successfully");

      // Optional WhatsApp notification
      const whatsappNumber = "263777768431";
      const whatsappMessage = encodeURIComponent(
        `Hello, I (${values.fullname}) have submitted my TreasurePal agent application.`
      );
      if (typeof window !== "undefined") {
        window.open(
          `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
          "_blank"
        );
      }

      onSuccess?.();
    } catch (err: any) {
      console.error("AgentForm: Submission error:", err);
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
      className="space-y-5 bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 max-w-lg mx-auto"
    >
      <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
        Apply to Become an Agent
      </h2>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Full Name</label>
        <input
          value={values.fullname}
          disabled
          className="input bg-gray-100 cursor-not-allowed"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Application Message</label>
        <textarea
          value={values.message}
          disabled
          rows={4}
          className="input bg-gray-100 cursor-not-allowed resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full px-4 py-3 bg-emerald-600 text-white font-semibold rounded-lg disabled:opacity-60"
      >
        {submitting ? "Submitting…" : "Submit Application"}
      </button>
    </form>
  );
}
