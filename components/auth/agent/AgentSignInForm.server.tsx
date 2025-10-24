// components/Agent/AgentSignInFormSSR.tsx
import AgentSignInClient from "./AgentSignInForm.client";

export default function AgentSignInFormSSR() {
  return (
    <section
      aria-label="Agent sign-in section"
      className="max-w-md mx-auto space-y-6 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Agent Sign In
      </h2>
      <p className="text-center text-gray-500 text-sm mb-4">
        Access your dashboard and manage your listings.
      </p>
      <AgentSignInClient />
    </section>
  );
}
