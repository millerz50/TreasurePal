// app/(auth)/signin/page.tsx
import SigninForm from "@/components/auth/SigninForm";

export const metadata = {
  title: "Sign in",
};

export default function SigninPage() {
  return (
    <main className="min-h-[60vh]">
      <h2 className="mb-6 text-center text-2xl font-semibold">Welcome back</h2>
      <SigninForm redirectTo="/dashboard" />
    </main>
  );
}
