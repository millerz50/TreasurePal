// src/config/domains.ts

export type DomainConfig = {
  name: string;
  description: string;
};

export const domainConfig: Record<string, DomainConfig> = {
  // Zimbabwe-specific domain
  "treasurepal.co.zw": {
    name: "TreasurePal",
    description: "Empowering Zimbabwean Real Estate agency and house seekers",
  },

  // Global domain
  "treasureprops.com": {
    name: "TreasureProps",
    description: "Global Real Estate solutions for house seekers",
  },

  // Example placeholder for future domains
  "treasurepal.africa": {
    name: "TreasurePal Africa",
    description: "Connecting African property seekers with trusted agencies",
  },

  // Default fallback
  default: {
    name: "TreasurePal",
    description: "Your trusted real estate partner",
  },
};
