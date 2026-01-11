// components/dashboard/QuickActions.tsx
import { Plus, Users } from "lucide-react";
import Link from "next/link";

type Props = {
  role?: "agent" | "user" | "admin" | string | null;
  loading?: boolean;
};

export default function QuickActions({ role = null, loading = false }: Props) {
  // Agent sees Add Property; Admin sees Invite Agent; Admin also sees Add Property
  const showAddProperty = role === "agent" || role === "admin";
  const showInviteAgent = role === "admin";

  if (loading) {
    return (
      <div className="flex gap-4">
        <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
        <div className="h-8 w-28 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      {showAddProperty && (
        <Link
          href="/dashboard/properties/add"
          className="btn btn-primary btn-sm flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Property
        </Link>
      )}

      {showInviteAgent && (
        <Link
          href="/dashboard/agents"
          className="btn btn-outline btn-sm flex items-center gap-2">
          <Users className="h-4 w-4" />
          Invite Agent
        </Link>
      )}
    </div>
  );
}
