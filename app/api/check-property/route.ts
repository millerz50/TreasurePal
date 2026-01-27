import { Client, Account, Databases, Storage, Query } from "appwrite";

/* ----------------------------------
   Appwrite Client Setup
----------------------------------- */
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string) // e.g., "https://[HOST]/v1"
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string); // your project ID

/* ----------------------------------
   Export Appwrite Services
----------------------------------- */
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

/* ----------------------------------
   Property Existence Check
----------------------------------- */
interface CheckPropertyOptions {
  field: "title" | "address";
  value: string;
}

/**
 * Check if a property exists in Appwrite DB by title or address
 */
export async function propertyExists({ field, value }: CheckPropertyOptions) {
  // Only allow title or address checks
  if (!["title", "address"].includes(field)) {
    throw new Error("Field must be 'title' or 'address'");
  }

  // Empty values are considered non-existent
  if (!value.trim()) return false;

  try {
    // Use environment variables for DB and collection
    const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string; // e.g., treasuredataid
    const PROPERTIES_COLLECTION = process.env
      .NEXT_PUBLIC_APPWRITE_PROPERTYTABLE_ID as string; // e.g., properties

    const result = await databases.listDocuments(DB_ID, PROPERTIES_COLLECTION, [
      Query.equal(field, value),
      Query.limit(1),
    ]);

    return result.documents.length > 0;
  } catch (error) {
    console.error("Error checking property existence:", error);
    throw new Error("Failed to check property existence");
  }
}
