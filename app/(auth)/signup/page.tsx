// app/(auth)/signup/page.tsx
import SignupForm from "@/components/auth/SignupForm";

export const metadata = {
  title: "Sign up",
};

export default function SignupPage() {
  return (
    <main className="min-h-[60vh]">
      <h2 className="mb-6 text-center text-2xl font-semibold">
        Create an account
      </h2>
      <SignupForm redirectTo="/signin" />
    </main>
  );
}
