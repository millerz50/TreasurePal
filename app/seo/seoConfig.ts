// components/seo/seoConfig.ts
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const baseAlternates = {
  languages: {
    en: `${SITE_URL}/en`,
    "en-zw": "https://treasurepal.co.zw/en",
    sn: `${SITE_URL}/sn`,
    "sn-zw": "https://treasurepal.co.zw/sn",
    nd: `${SITE_URL}/nd`,
    "nd-zw": "https://treasurepal.co.zw/nd",
  },
};

export const defaultOpenGraph = {
  siteName: SITE_NAME,
  type: "website",
};

export const defaultTwitter = {
  card: "summary_large_image",
};
