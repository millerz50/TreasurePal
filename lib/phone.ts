// /lib/phone.ts

/**
 * A simplified mapping of ISO country codes to calling codes.
 * This is not exhaustive but includes all major countries.
 * Add/modify entries as needed.
 */
export const COUNTRY_CALLING_CODES: Record<string, string> = {
  // Africa
  zimbabwe: "263",
  south_africa: "27",
  botswana: "267",
  zambia: "260",
  kenya: "254",
  nigeria: "234",
  ghana: "233",

  // Europe
  united_kingdom: "44",
  uk: "44",
  germany: "49",
  france: "33",
  italy: "39",
  spain: "34",

  // Asia
  india: "91",
  china: "86",
  japan: "81",
  pakistan: "92",
  saudi_arabia: "966",
  uae: "971",

  // Americas
  united_states: "1",
  usa: "1",
  canada: "1",
  mexico: "52",
  brazil: "55",
  argentina: "54",

  // Oceania
  australia: "61",
  new_zealand: "64",
};

/**
 * Normalize any phone number to E.164.
 *
 * Rules:
 *  - Accept "+<digits>"
 *  - Convert local numbers based on `country`
 *  - Strip formatting (spaces, dashes)
 *  - Ensure length between 7 and 15 digits total (ITU spec)
 */
export function normalizePhone(
  input?: string | null,
  country?: string | null
): string | null {
  if (!input) return null;

  let number = input.trim();

  if (number === "") return null;

  // Strip formatting
  number = number.replace(/[^\d+]/g, "");

  // Already E.164
  if (/^\+\d{7,15}$/.test(number)) {
    return number;
  }

  // No country provided → cannot convert to E.164
  if (!country) return null;

  const key = country.toLowerCase().replace(/\s+/g, "_");

  const callingCode = COUNTRY_CALLING_CODES[key];
  if (!callingCode) return null;

  // If starts with 0 → local format (remove leading 0)
  if (/^0\d+$/.test(number)) {
    number = number.replace(/^0+/, "");
  }

  // Build the final E.164 number
  const final = `+${callingCode}${number}`;

  // Validate final
  if (/^\+\d{7,15}$/.test(final)) return final;

  return null;
}
