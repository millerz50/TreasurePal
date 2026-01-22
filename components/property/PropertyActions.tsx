"use client";

import { Button } from "@/components/ui/button";

type PropertyActionsProps = {
  agentId: string | null;
  status: string;
};

export default function PropertyActions({
  agentId,
  status,
}: PropertyActionsProps) {
  return (
    <>
      <div className="w-full">
        <div className="text-sm text-gray-500">Listed by</div>
        <div className="mt-2 flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold">
            {agentId ? agentId.slice(0, 2).toUpperCase() : "TP"}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">
              Treasure Pal Agent
            </div>
            <div className="text-xs text-gray-500">
              Agent ID: {agentId || "N/A"}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Button
          type="button"
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600"
        >
          Contact Agent
        </Button>
      </div>

      <div className="mt-auto text-sm text-gray-500">
        <div className="flex items-center justify-between">
          <span className="font-medium">Status</span>
          <span className="text-gray-700">{status}</span>
        </div>
        <div className="mt-3">
          <Button variant="ghost" className="w-full text-sm">
            Save Listing
          </Button>
        </div>
      </div>
    </>
  );
}
