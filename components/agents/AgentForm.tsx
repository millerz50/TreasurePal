"use client";

import { useAuth } from "@/context/AuthContext";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

/* ============================
   PROPS
============================ */
type AgentFormProps = {
  onSuccess?: () => void;
  userAccountId?: string;
};

/* ============================
   FORM VALUES (APPWRITE ONLY)
============================ */
type AgentFormValues = {
  userId?: string;
  licenseNumber: string;
  agencyId: string;
  rating: number | "";
  verified: boolean;
};

/* ============================
   APPWRITE PAYLOAD (EXACT)
============================ */
type AgentPayload = {
  userId: string;
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
    throw new Error(err?.message || "Submission failed");
  }

  return res.json();
}

/* ============================
   COMPONENT
============================ */
export default function AgentForm({
  onSuccess,
  userAccountId,
}: AgentFormProps) {
  const { user, loading } = useAuth();

  const [values, setValues] = useState<AgentFormValues>({
    userId: userAccountId,
    licenseNumber: "",
    agencyId: "",
    rating: "",
    verified: false,
  });

  const [submitting, setSubmitting] = useState(false);

  /* --------------------------
     Inject userId
  -------------------------- */
  useEffect(() => {
    if (loading) return;

    const uid = user?.userId || userAccountId;
    if (!uid) {
      toast.error("You must be logged in.");
      return;
    }

    setValues((v) => ({ ...v, userId: uid }));
  }, [user, userAccountId, loading]);

  const update = useCallback(
    (patch: Partial<AgentFormValues>) => setValues((v) => ({ ...v, ...patch })),
    []
  );

  /* --------------------------
     Submit
  -------------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!values.userId) {
      toast.error("Missing user ID");
      return;
    }

    setSubmitting(true);

    try {
      const payload: AgentPayload = {
        userId: values.userId,
        licenseNumber: values.licenseNumber || null,
        agencyId: values.agencyId || null,
        rating: typeof values.rating === "number" ? values.rating : null,
        verified: values.verified,
      };

      await submitAgentApplication(payload);

      toast.success("Application submitted");

      setValues((v) => ({
        ...v,
        licenseNumber: "",
        agencyId: "",
        rating: "",
        verified: false,
      }));

      onSuccess?.();
    } catch (err: any) {
      toast.error(err.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        placeholder="Years experience"
        className="input"
      />

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={values.verified}
          onChange={(e) => update({ verified: e.target.checked })}
        />
        I confirm the information is accurate
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
