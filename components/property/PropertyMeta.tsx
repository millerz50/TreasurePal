"use client";

import { Separator } from "@/components/ui/Separator";
import type { PropertyType } from "@/components/property/types/property";

type PropertyMetaProps = {
  property: PropertyType;
};

export default function PropertyMeta({ property }: PropertyMetaProps) {
  return (
    <>
      <Separator />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-700">
        <div>
          <span className="font-medium">Type:</span> {property.type}
        </div>
        <div>
          <span className="font-medium">Rooms:</span> {property.rooms}
        </div>
        <div>
          <span className="font-medium">Location:</span> {property.location}
        </div>
        <div>
          <span className="font-medium">Country:</span> {property.country}
        </div>
        <div>
          <span className="font-medium">Address:</span> {property.address}
        </div>
        <div>
          <span className="font-medium">Agent ID:</span>{" "}
          {property.agentId || "N/A"}
        </div>
      </div>
    </>
  );
}
