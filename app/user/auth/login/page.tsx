import LoginForm from "@/components/auth/user/LoginForm.server"; // SSR shell
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | TreasurePal",
  description: "Access your TreasurePal dashboard and manage your listings.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="w-full max-w-md space-y-6">
        <LoginForm />
      </div>
    </main>
  );
}
