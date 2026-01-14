export function getApiUrl(): string {
  const v = process.env.NEXT_PUBLIC_API_VERSION;
  const v1 = process.env.NEXT_PUBLIC_API_URLV1;
  const v2 = process.env.NEXT_PUBLIC_API_URLV2;

  if (v === "v2" && v2) return v2;
  if (v === "v1" && v1) return v1;
  if (v2) return v2;
  if (v1) return v1;
  throw new Error("API base URL not configured");
}
