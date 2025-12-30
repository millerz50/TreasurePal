// components/agents/AgentJoinShell.tsx
"use client";

import { useEffect, useState } from "react";
import AgentJoinModal from "./AgentJoinModal";

/**
 * AgentJoinShell
 *
 * - Opens modal on page load (route /agents/join)
 * - Listens for `openAgentJoin` CustomEvent so other parts of the app can open the modal
 * - Accepts optional `accountid` prop (prefill from auth)
 *
 * Usage:
 * <AgentJoinShell accountid={currentAccountId} />
 */
export default function AgentJoinShell({ accountid }: { accountid?: string }) {
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("openAgentJoin", onOpen as EventListener);
    return () =>
      window.removeEventListener("openAgentJoin", onOpen as EventListener);
  }, []);

  return (
    <main className="min-h-screen py-12 bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-3xl mx-auto px-6">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold">
            Become a TreasurePal Agent
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Join our network of trusted local agents. Submit your details and
            we'll review your application.
          </p>
        </header>

        <section className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-6 shadow-sm">
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
            Apply here or open the quick modal from anywhere in the app by
            clicking "Join".
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-emerald-400 to-sky-500 text-white font-semibold shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-300">
              Apply now
            </button>

            <a
              href="#agent-info"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border text-sm hover:bg-gray-50 dark:hover:bg-slate-700">
              Learn more
            </a>
          </div>
        </section>

        <div
          id="agent-info"
          className="mt-8 prose prose-slate dark:prose-invert">
          <h2>What we look for</h2>
          <ul>
            <li>Local market knowledge</li>
            <li>Good communication and reliability</li>
            <li>Ability to list and manage properties</li>
          </ul>
        </div>
      </div>

      <AgentJoinModal
        open={open}
        onClose={() => setOpen(false)}
        accountid={accountid}
      />
    </main>
  );
}
