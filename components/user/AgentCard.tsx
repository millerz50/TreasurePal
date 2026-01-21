import { Agent } from "./AgencySection";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Star } from "lucide-react";

export default function AgentCard({ agent }: { agent: Agent }) {
  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Top Accent */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-600" />

      <div className="p-6 space-y-4">
        {/* Name + Verified */}
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-slate-800">
            {agent.fullname}
          </h3>

          {agent.verified && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
              <ShieldCheck className="w-3 h-3" />
              Verified
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          {agent.rating ?? "No rating yet"}
        </div>

        {/* Bio / Message */}
        {agent.message && (
          <p className="text-sm text-slate-600 line-clamp-3">
            {agent.message}
          </p>
        )}

        {/* Meta */}
        <div className="text-xs text-slate-400">
          Joined {new Date(agent.$createdAt).toLocaleDateString()}
        </div>

        {/* Action */}
        <div className="pt-4">
          <Button className="w-full rounded-xl bg-blue-600 hover:bg-blue-700">
            Contact Agent
          </Button>
        </div>
      </div>
    </div>
  );
}
