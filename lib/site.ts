// lib/site.ts
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "TreasurePal";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://treasure-pal.vercel.app/";
export const SITE_DESCRIPTION =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ??
  "TreasurePal — connect with local businesses, discover listings, and grow with local agents.";
export const SITE_TWITTER =
  process.env.NEXT_PUBLIC_SITE_TWITTER ?? "@treasurepal";
export const SITE_OG_IMAGE = `${SITE_URL}/og/default.png`;
