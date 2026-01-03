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
  licenseNumber: string;
  agencyId: string;
  rating: number | "";
  verified: boolean;
};

type AgentPayload = {
  userId: string;
  fullname: string;
  message: string;
  licenseNumber: string | null;
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
      userId: user.userId,
      fullname,
      message,
      licenseNumber: "",
      agencyId: "",
      rating: "",
      verified: false,
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

    const {
      userId,
      fullname,
      message,
      licenseNumber,
      agencyId,
      rating,
      verified,
    } = values;

    if (!fullname || !message) {
      toast.error("Fullname and message are required.");
      return;
    }

    setSubmitting(true);

    try {
      const payload: AgentPayload = {
        userId,
        fullname,
        message,
        licenseNumber: licenseNumber || null,
        agencyId: agencyId || null,
        rating: typeof rating === "number" ? rating : null,
        verified,
      };

      await submitAgentApplication(payload);

      toast.success("Agent application submitted successfully");

      // Reset optional fields only
      setValues((v) => ({
        ...v!,
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

  if (loading || !values) {
    return <p className="text-sm text-slate-500">Loading your profile…</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Fullname (locked) */}
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

      {/* Editable fields */}
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
