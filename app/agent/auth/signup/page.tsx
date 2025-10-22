// app/agent-signup/page.tsx
import AgentSignupForm from "@/components/auth/agent/AgentSignupForm.server";

export default function AgentSignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-base-100 px-4 py-12">
      <AgentSignupForm />
    </main>
  );
}
