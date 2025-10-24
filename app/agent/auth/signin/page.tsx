import AgentSignInFormSSR from "@/components/auth/agent/AgentSignInForm.server";

export default function AgentSignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-muted px-4">
      <AgentSignInFormSSR />
    </main>
  );
}
