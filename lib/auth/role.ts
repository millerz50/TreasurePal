import type { UserPayload } from "@/context/AuthContext";

export type Role = "user" | "agent" | "admin";

export function getPrimaryRole(user?: UserPayload | null): Role | null {
  if (!user?.roles?.length) return null;
  return user.roles[0];
}

export function hasRole(
  user: UserPayload | null | undefined,
  role: Role
): boolean {
  return !!user?.roles?.includes(role);
}
