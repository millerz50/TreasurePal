import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  baseAlternates,
  defaultOpenGraph,
  defaultTwitter,
} from "@/app/seo/seoConfig";
import RetailShopClient from "./RetailShop.client";

export const metadata: Metadata = {
  title: `Retail Shop • ${SITE_NAME}`,
  description: "Browse retail shops and storefront properties across Zimbabwe.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    ...baseAlternates,
    canonical: `${SITE_URL}/listings/commercial/RetailShop`,
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `Retail Shop • ${SITE_NAME}`,
    description:
      "Browse retail shops and storefront properties across Zimbabwe.",
    url: `${SITE_URL}/listings/commercial/RetailShop`,
    images: [
      { url: "/og/retail.jpg", width: 1200, height: 630, alt: "Retail Shop" },
    ],
  },
  twitter: {
    ...defaultTwitter,
    title: `Retail Shop • ${SITE_NAME}`,
    description:
      "Browse retail shops and storefront properties across Zimbabwe.",
    images: ["/og/retail.jpg"],
  },
};

export default function RetailShopPage() {
  return (
    <RetailShopClient
      title="Retail Shops"
      subtitle="Browse retail shops and storefront properties across Zimbabwe."
      endpoint="type/Commercial/RetailShop"
    />
  );
}
