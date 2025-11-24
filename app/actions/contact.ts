// app/actions/contact.ts
import { NextResponse } from "next/server";

/**
 * Server action to handle contact submissions.
 * Replace the sendEmail placeholder with your mail provider integration.
 */
export async function handleContactSubmission(payload: {
  name: string;
  email: string;
  subject?: string;
  message: string;
  honeypot?: string;
}) {
  // Basic anti-spam honeypot
  if (payload.honeypot && payload.honeypot.trim() !== "") {
    return NextResponse.json(
      { success: false, message: "Spam detected" },
      { status: 400 }
    );
  }

  // Basic server-side validation
  if (!payload.name || !payload.email || !payload.message) {
    return NextResponse.json(
      { success: false, message: "Missing required fields" },
      { status: 400 }
    );
  }

  // TODO: integrate with your email provider or CRM
  // Example placeholder: await sendEmail({ to: SUPPORT_EMAIL, subject, body })
  try {
    // Example: store to DB or send email
    // await sendToInbox(payload);

    // Simulate async work
    await new Promise((res) => setTimeout(res, 300));

    return NextResponse.json({ success: true, message: "Message received" });
  } catch (err) {
    console.error("Contact submission error", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
