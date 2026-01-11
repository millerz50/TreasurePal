// components/seo/seoConfig.ts
import { SITE_NAME } from "@/lib/site";

export const baseAlternates = {
  languages: {
    // Universal domain (global fallback)
    en: "https://www.treasureprops.com/en",
    sn: "https://www.treasureprops.com/sn",
    nd: "https://www.treasureprops.com/nd",

    // Zimbabwe-specific domain
    "en-zw": "https://treasurepal.co.zw/en",
    "sn-zw": "https://treasurepal.co.zw/sn",
    "nd-zw": "https://treasurepal.co.zw/nd",

    // Global fallback (x-default)
    "x-default": "https://www.treasureprops.com/",
  },
};

export const defaultOpenGraph = {
  siteName: SITE_NAME,
  type: "website",
};

export const defaultTwitter = {
  card: "summary_large_image",
};
