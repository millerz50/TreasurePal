import { cookies } from "next/headers";

export async function getCurrentUser() {
  const session = cookies().get("session");

  if (!session) return null;

  // Replace with Appwrite / DB / JWT verification
  return {
    firstName: "John",
    surname: "Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
  };
}
