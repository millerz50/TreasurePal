import { useEffect, useRef, useState } from "react";
import { COUNTRY_CALLING_CODES } from "../lib/countryCallingCodes";

/**
 * Safe phone formatting that NEVER updates after user begins typing.
 * Prevents overwriting other fields like email.
 */
export default function usePhoneFormatter(initialCountry: string) {
  const [phone, setPhone] = useState("");
  const userTyped = useRef(false); // Track user activity

  // Only set default prefix ONCE when country changes AND user hasn't typed yet
  useEffect(() => {
    if (!initialCountry || userTyped.current) return;

    const key = initialCountry.toLowerCase().replace(/\s+/g, "_");
    const code = COUNTRY_CALLING_CODES[key];
    if (!code) return;

    setPhone(`+${code}`);
  }, [initialCountry]);

  // Update phone safely
  function updatePhone(input: string) {
    userTyped.current = true;

    // Allow only digits and leading '+'
    let cleaned = input.replace(/[^\d+]/g, "");

    // Ensure only one '+'
    if (cleaned.startsWith("++")) cleaned = "+" + cleaned.slice(2);

    setPhone(cleaned);
  }

  function getE164(): string | undefined {
    if (!phone) return undefined;
    const match = phone.match(/^\+\d{1,15}$/);
    return match ? match[0] : undefined;
  }

  return { phone, setPhone: updatePhone, getE164 };
}
