import { databases } from "@/lib/appwrite-server";
import { NextResponse } from "next/server";
import { ID } from "node-appwrite";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message, honeypot } = await req.json();

    // 🛑 Bot protection
    if (honeypot && honeypot.trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await databases.createDocument(
      "treasuredataid", // replace with your actual database ID
      "contact", // your collection/table ID
      ID.unique(),
      {
        name,
        email,
        subject,
        message,
        honeypot: honeypot ?? "", // ✅ REQUIRED FIELD
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json(
      { error: "Failed to submit message" },
      { status: 500 }
    );
  }
}
