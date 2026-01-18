// app/api/agents/route.ts (Next.js 13 App Router)
import { NextResponse } from "next/server";
import { Databases, Query, Client } from "node-appwrite";

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const USERS_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION!;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // your endpoint
  .setProject(PROJECT_ID);

const databases = new Databases(client);

export async function GET() {
  try {
    const res = await databases.listDocuments(DB_ID, USERS_COLLECTION, [
      Query.equal("roles", "agent"),
    ]);

    return NextResponse.json(res.documents);
  } catch (err) {
    console.error("Failed to list agents:", err);
    return NextResponse.json([], { status: 500 });
  }
}
