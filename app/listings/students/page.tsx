import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { baseAlternates, defaultOpenGraph, defaultTwitter } from "@/app/seo/seoConfig";
import StudentsPageClient from "./StudentsPageClient";

export const metadata: Metadata = {
  title: `Student Housing • ${SITE_NAME}`,
  description: `Student rooms and shared housing across Zimbabwe. Find affordable student accommodation.`,
  metadataBase: new URL(SITE_URL),
  alternates: {
    ...baseAlternates,
    canonical: `${SITE_URL}/students`,
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `Student Housing • ${SITE_NAME}`,
    description: "Affordable student rooms and shared housing across Zimbabwe. Find accommodation near universities and colleges.",
    url: `${SITE_URL}/students`,
    images: [
      {
        url: "/og/students.jpg",
        width: 1200,
        height: 630,
        alt: "Student housing in Zimbabwe",
      },
    ],
  },
  twitter: {
    ...defaultTwitter,
    title: `Student Housing • ${SITE_NAME}`,
    description: "Find affordable student accommodation across Zimbabwe. Rooms, shared housing, and near-campus stays.",
    images: ["/og/students.jpg"],
  },
};

export default function StudentsPage() {
  return <StudentsPageClient />;
}
