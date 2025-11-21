import { Account, Client, Databases, Storage } from "appwrite";

// Initialize Appwrite client using environment variables
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string) // e.g. https://nyc.cloud.appwrite.io/v1
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string); // e.g. treasureproject

// Export services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
