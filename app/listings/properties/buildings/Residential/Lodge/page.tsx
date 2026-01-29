import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  baseAlternates,
  defaultOpenGraph,
  defaultTwitter,
} from "@/app/seo/seoConfig";
import LodgeClient from "./Lodge.client";

export const metadata: Metadata = {
  title: `Lodge • ${SITE_NAME}`,
  description:
    "Browse residential lodges and short-term stays across Zimbabwe.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    ...baseAlternates,
    canonical: `${SITE_URL}/listings/Residential/Lodge`,
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `Lodge • ${SITE_NAME}`,
    description:
      "Browse residential lodges and short-term stays across Zimbabwe.",
    url: `${SITE_URL}/listings/Residential/Lodge`,
    images: [{ url: "/og/lodge.jpg", width: 1200, height: 630, alt: "Lodge" }],
  },
  twitter: {
    ...defaultTwitter,
    title: `Lodge • ${SITE_NAME}`,
    description:
      "Browse residential lodges and short-term stays across Zimbabwe.",
    images: ["/og/lodge.jpg"],
  },
};

export default function LodgePage() {
  return (
    <LodgeClient
      title="Lodges"
      subtitle="Browse residential lodges and short-term stays across Zimbabwe."
      endpoint="type/Residential/Lodge"
    />
  );
}
