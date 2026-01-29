import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  baseAlternates,
  defaultOpenGraph,
  defaultTwitter,
} from "@/app/seo/seoConfig";
import HospitalClient from "./Hospital.client";

export const metadata: Metadata = {
  title: `Hospital • ${SITE_NAME}`,
  description: "Browse hospitals and medical facilities across Zimbabwe.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    ...baseAlternates,
    canonical: `${SITE_URL}/listings/Institutional/Hospital`,
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `Hospital • ${SITE_NAME}`,
    description: "Browse hospitals and medical facilities across Zimbabwe.",
    url: `${SITE_URL}/listings/Institutional/Hospital`,
    images: [
      { url: "/og/hospital.jpg", width: 1200, height: 630, alt: "Hospital" },
    ],
  },
  twitter: {
    ...defaultTwitter,
    title: `Hospital • ${SITE_NAME}`,
    description: "Browse hospitals and medical facilities across Zimbabwe.",
    images: ["/og/hospital.jpg"],
  },
};

export default function HospitalPage() {
  return (
    <HospitalClient
      title="Hospitals"
      subtitle="Browse hospitals and medical facilities across Zimbabwe."
      endpoint="type/Institutional/Hospital"
    />
  );
}
