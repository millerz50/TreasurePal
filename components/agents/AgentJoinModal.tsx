"use client";

import { useEffect, useRef } from "react";
import AgentForm from "./AgentForm";

type Props = {
  open: boolean;
  onClose: () => void;
  accountid?: string; // optional
};

export default function AgentJoinModal({ open, onClose, accountid }: Props) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Apply to become an agent"
      className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-xl border dark:border-slate-700 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b dark:border-slate-800">
          <h3 className="text-lg font-semibold">Agent Application</h3>
          <div className="flex items-center gap-2">
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Close agent application"
              className="inline-flex items-center justify-center w-9 h-9 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-sky-300">
              ✕
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Pass accountid to AgentForm if needed */}
          <AgentForm onSuccess={onClose} userAccountId={accountid} />
        </div>
      </div>
    </div>
  );
}
