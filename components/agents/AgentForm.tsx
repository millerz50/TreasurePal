"use client";

import { useAuth } from "@/context/AuthContext";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

/* ============================
   TYPES
============================ */
type AgentFormProps = {
  onSuccess?: () => void;
};

/* UI state */
type AgentFormValues = {
  userId: string;
  fullname: string;
  message: string;
  licenseNumber: string;
  agencyId: string;
  rating: number | "";
  verified: boolean;
};

/* Appwrite payload (EXACT SCHEMA) */
type AgentPayload = {
  userId: string; // ← agentId = userId
  fullname: string;
  message: string;
  licenseNumber: string | null;
  agencyId: string | null;
  rating: number | null;
  verified: boolean | null;
};

/* ============================
   API
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

  const [values, setValues] = useState<AgentFormValues>({
    userId: "",
    fullname: "",
    message: "",
    licenseNumber: "",
    agencyId: "",
    rating: "",
    verified: false,
  });

  const [submitting, setSubmitting] = useState(false);

  /* --------------------------
     Resolve agentId (userId)
  -------------------------- */
  const agentId = useMemo(() => user?.userId ?? "", [user]);

  const fullname = useMemo(() => {
    if (!user) return "";
    return `${user.firstName ?? ""} ${user.surname ?? ""}`.trim();
  }, [user]);

  const message = useMemo(() => {
    if (!fullname) return "";
    return `I, ${fullname}, hereby apply to become a TreasurePal agent. I confirm that all information provided is accurate and truthful.`;
  }, [fullname]);

  /* --------------------------
     Autofill locked fields
  -------------------------- */
  useEffect(() => {
    if (loading) return;

    if (!agentId || !fullname) {
      toast.error("You must be logged in to apply.");
      return;
    }

    setValues((v) => ({
      ...v,
      userId: agentId, // ← agentId = userId (AUTO)
      fullname,
      message,
    }));
  }, [agentId, fullname, message, loading]);

  const update = useCallback(
    (patch: Partial<AgentFormValues>) => setValues((v) => ({ ...v, ...patch })),
    []
  );

  /* --------------------------
     Submit
  -------------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!values.userId || !values.fullname || !values.message) {
      toast.error("Missing required application data.");
      return;
    }

    setSubmitting(true);

    try {
      const payload: AgentPayload = {
        userId: values.userId, // ← agentId
        fullname: values.fullname,
        message: values.message,
        licenseNumber: values.licenseNumber || null,
        agencyId: values.agencyId || null,
        rating: typeof values.rating === "number" ? values.rating : null,
        verified: values.verified,
      };

      await submitAgentApplication(payload);

      toast.success("Agent application submitted successfully");

      setValues((v) => ({
        ...v,
        licenseNumber: "",
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

  if (loading) return null;

  /* ============================
     UI
  ============================ */
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Agent ID (userId) — hidden but guaranteed */}
      <input type="hidden" value={values.userId} />

      {/* Full name (locked) */}
      <input
        value={values.fullname}
        disabled
        className="input bg-gray-100 cursor-not-allowed"
      />

      {/* Message (locked) */}
      <textarea
        value={values.message}
        disabled
        rows={4}
        className="input bg-gray-100 cursor-not-allowed"
      />

      <input
        value={values.licenseNumber}
        onChange={(e) => update({ licenseNumber: e.target.value })}
        placeholder="License number"
        className="input"
      />

      <input
        value={values.agencyId}
        onChange={(e) => update({ agencyId: e.target.value })}
        placeholder="Agency ID"
        className="input"
      />

      <input
        type="number"
        value={values.rating}
        onChange={(e) =>
          update({
            rating: e.target.value === "" ? "" : Number(e.target.value),
          })
        }
        placeholder="Years of experience"
        className="input"
      />

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={values.verified}
          onChange={(e) => update({ verified: e.target.checked })}
        />
        I confirm the information above is accurate
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="px-4 py-2 bg-emerald-600 text-white rounded disabled:opacity-60">
        {submitting ? "Submitting…" : "Submit application"}
      </button>
    </form>
  );
}
