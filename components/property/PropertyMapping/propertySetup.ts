import { PROPERTY_HIERARCHY } from "./propertyHierarchy";
import type {
  PropertyCategory,
  PropertySubType,
  PropertySetupMap,
} from "./propertyTypes";
import { AMENITIES } from "@/components/amenities/Amenities";
import type { ICON_MAP } from "@/components/icons/maps/ICON_MAP";

/* ----------------------------------
   PROPERTY SETUP
----------------------------------- */
export const PROPERTY_SETUP: Record<PropertyCategory, PropertySetupMap> =
  Object.fromEntries(
    Object.entries(PROPERTY_HIERARCHY).map(([category, data]) => [
      category,
      {
        label: data.label,
        subTypes: Object.fromEntries(
          data.subTypes.map((subType) => [
            subType,
            AMENITIES[subType] ?? undefined,
          ]),
        ) as Record<PropertySubType, any>,
      },
    ]),
  ) as Record<PropertyCategory, PropertySetupMap>;

/* ----------------------------------
   HELPERS
----------------------------------- */
export const getPropertyIcons = (
  subType: PropertySubType,
): Record<string, (keyof typeof ICON_MAP)[]> => {
  const amenities = AMENITIES[subType];
  if (!amenities) return {};

  return Object.fromEntries(
    Object.entries(amenities).map(([category, items]) => [
      category,
      items.map((item) => item.icon),
    ]),
  );
};

export const PROPERTY_TYPES = Object.keys(AMENITIES) as PropertySubType[];
