import { useEffect, useState } from "react";
import { COUNTRY_CALLING_CODES } from "../lib/countryCallingCodes";

/**
 * Hook to manage phone input formatting according to selected country.
 * Always outputs a valid E.164 string or empty string.
 */
export default function usePhoneFormatter(initialCountry: string) {
  const [phone, setPhone] = useState("");

  // Update phone prefix when country changes
  useEffect(() => {
    if (!initialCountry) return;

    const key = initialCountry.toLowerCase().replace(/\s+/g, "_");
    const code = COUNTRY_CALLING_CODES[key];
    if (!code) return;

    // Only add prefix if empty or user hasn't typed '+'
    if (!phone || !phone.startsWith("+")) {
      setPhone(`+${code}`);
    }
  }, [initialCountry]);

  // Update phone while enforcing E.164 allowed characters
  function updatePhone(input: string) {
    // Allow only digits and leading '+'
    let cleaned = input.replace(/[^\d+]/g, "");

    // Ensure only a single leading '+'
    if (cleaned.startsWith("++")) cleaned = "+" + cleaned.slice(2);

    setPhone(cleaned);
  }

  // Convert to E.164 or undefined for backend
  function getE164(): string | undefined {
    if (!phone) return undefined;

    const match = phone.match(/^\+\d{1,15}$/);
    return match ? match[0] : undefined;
  }

  return { phone, setPhone: updatePhone, getE164 };
}
