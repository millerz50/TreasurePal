import { Plus, Users } from "lucide-react";
import Link from "next/link";

export default function QuickActions() {
  return (
    <div className="flex gap-4">
      <Link
        href="/dashboard/properties/add"
        className="btn btn-primary btn-sm flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Add Property
      </Link>
      <Link
        href="/dashboard/agents"
        className="btn btn-outline btn-sm flex items-center gap-2">
        <Users className="h-4 w-4" />
        Invite Agent
      </Link>
    </div>
  );
}
