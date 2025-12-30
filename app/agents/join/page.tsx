// app/agents/join/page.tsx
import AgentJoinShell from "@/components/agents/AgentJoinShell";

export const metadata = {
  title: "Join as an Agent — TreasurePal",
  description:
    "Apply to become a TreasurePal agent and start listing properties.",
};

export default function AgentJoinPage() {
  // If you have server-side auth and want to pass account id into the shell,
  // fetch it here (server component) and pass as prop. For now we render the shell.
  return <AgentJoinShell />;
}
