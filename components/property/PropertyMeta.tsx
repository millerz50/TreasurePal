"use client";

import { Separator } from "@/components/ui/Separator";
import type { PropertyType } from "@/components/property/types/property";
import Head from "next/head";

type PropertyMetaProps = {
  property: PropertyType;
};

export default function PropertyMeta({ property }: PropertyMetaProps) {
  const {
    title,
    type,
    rooms,
    location,
    country,
    address,
    agentId,
    description,
  } = property;

  const seoTitle = title || `${type} in ${location}, ${country}`;
  const seoDescription =
    description ||
    `${rooms} rooms ${type} located at ${address}, ${location}, ${country}.`;

  return (
    <>
      {/* SEO metadata */}
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_US" />
      </Head>

      <Separator />

      {/* Property details */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-700">
        <div>
          <span className="font-medium">Type:</span> {type}
        </div>
        <div>
          <span className="font-medium">Rooms:</span> {rooms}
        </div>
        <div>
          <span className="font-medium">Location:</span> {location}
        </div>
        <div>
          <span className="font-medium">Country:</span> {country}
        </div>
        <div>
          <span className="font-medium">Address:</span> {address}
        </div>
        <div>
          <span className="font-medium">Agent ID:</span> {agentId || "N/A"}
        </div>
      </div>
    </>
  );
}
