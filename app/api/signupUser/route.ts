import { NextResponse } from "next/server";
import { Client, Databases, ID, Permission, Role } from "node-appwrite";

export async function POST(req: Request) {
  console.log("[API] signupUser called");

  try {
    const payload = await req.json();
    console.log("[API] Received:", payload);

    // ---- SERVER CLIENT (uses API KEY) ----
    const client = new Client()
      .setProject(process.env.APPWRITE_PROJECT_ID!)
      .setKey(process.env.APPWRITE_API_KEY!)
      .setEndpoint(process.env.APPWRITE_ENDPOINT!);

    const db = new Databases(client);

    const rowPayload = {
      accountid: payload.accountId,
      email: payload.email,
      firstName: payload.firstName,
      surname: payload.surname,
      country: payload.country ?? null,
      location: payload.location ?? null,
      role: payload.role ?? "user",
      status: payload.status ?? "Pending",
      nationalId: payload.nationalId ?? null,
      bio: payload.bio ?? null,
      metadata: payload.metadata ?? [],
      dateOfBirth: payload.dateOfBirth ?? null,
      phone: payload.phone ?? null,
      agentId: ID.unique(),
    };

    console.log("[API] Creating document…");

    const perms = [
      Permission.read(Role.user(payload.accountId)),
      Permission.update(Role.user(payload.accountId)),
      Permission.delete(Role.user(payload.accountId)),
    ];

    const doc = await db.createDocument(
      process.env.DB_ID!,
      process.env.USERS_COLLECTION_ID!,
      ID.unique(),
      rowPayload,
      perms
    );

    console.log("[API] SUCCESS document created:", doc.$id);

    return NextResponse.json({ success: true, profileId: doc.$id });
  } catch (err: any) {
    console.error("[API] ERROR:", err);
    return NextResponse.json(
      { success: false, error: err?.message },
      { status: 500 }
    );
  }
}
