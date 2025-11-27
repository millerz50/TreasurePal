// components/seo/Seo.tsx
"use client";

import {
  baseAlternates,
  defaultOpenGraph,
  defaultTwitter,
} from "@/app/seo/seoConfig";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import Head from "next/head";

export default function Seo({
  title = SITE_NAME,
  description = "Discover properties with TreasurePal & TreasureProps — inclusive, global, and local.",
  url = SITE_URL,
}: {
  title?: string;
  description?: string;
  url?: string;
}) {
  // ✅ Structured Data JSON-LD
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TreasureProps",
    url: "https://www.treasureprops.com/",
    alternateName: "TreasurePal Zimbabwe",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.treasureprops.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    inLanguage: ["en", "sn", "nd"],
    hasPart: [
      {
        "@type": "WebSite",
        name: "TreasurePal Zimbabwe",
        url: "https://treasurepal.co.zw/",
        inLanguage: ["en-ZW", "sn-ZW", "nd-ZW"],
      },
    ],
  };

  return (
    <Head>
      {/* Basic Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph */}
      <meta property="og:site_name" content={defaultOpenGraph.siteName} />
      <meta property="og:type" content={defaultOpenGraph.type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content={defaultTwitter.card} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* hreflang alternates */}
      {Object.entries(baseAlternates.languages).map(([lang, href]) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={href} />
      ))}

      {/* Canonical */}
      <link rel="canonical" href={url} />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
}
