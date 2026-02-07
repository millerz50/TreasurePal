// lib/property/categorySeo.ts
import { PropertyCategory } from "@/components/property/PropertyMapping/propertyTypes";

export const CATEGORY_SEO: Record<
  PropertyCategory,
  {
    title: string;
    description: string;
    intro: string;
  }
> = {
  Residential: {
    title: "Residential Properties for Sale & Rent",
    description:
      "Browse houses, apartments, bedsitters, and student housing available for sale and rent.",
    intro:
      "Discover residential properties including full houses, apartments, and student accommodation.",
  },
  Commercial: {
    title: "Commercial Properties & Business Premises",
    description:
      "Explore offices, warehouses, retail shops, factories, and industrial buildings.",
    intro:
      "Find commercial properties designed for business growth and investment.",
  },
  Hospitality: {
    title: "Hospitality Properties & Lodging",
    description:
      "Hotels, lodges, guest houses, and event venues available across prime locations.",
    intro:
      "Hospitality properties built for tourism, accommodation, and events.",
  },
  Institutional: {
    title: "Institutional Properties",
    description:
      "Schools, hospitals, and government buildings available for lease or acquisition.",
    intro:
      "Purpose-built institutional properties serving public and private sectors.",
  },
  Recreational: {
    title: "Recreational Facilities & Properties",
    description:
      "Sports facilities, leisure centers, and recreational developments.",
    intro: "Properties designed for leisure, wellness, and recreation.",
  },
  Agricultural: {
    title: "Agricultural Land & Farming Properties",
    description:
      "Agricultural land suitable for farming, ranching, and agribusiness.",
    intro: "Explore land and properties tailored for agricultural use.",
  },
  Land: {
    title: "Land & Stands for Sale",
    description:
      "Residential, commercial, and industrial stands in prime locations.",
    intro: "Vacant land opportunities ready for development.",
  },
  SpecialPurpose: {
    title: "Special Purpose Properties",
    description: "Unique properties built for specialized uses and operations.",
    intro: "Special-purpose developments designed for unique requirements.",
  },
};
