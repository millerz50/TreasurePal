// app/(auth)/signup/page.tsx
import SignupForm from "@/components/auth/SignupForm";

export const metadata = {
  title: "Sign up",
};

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-base-200 p-6">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-semibold mb-6">Create an account</h1>
        <SignupForm />
      </div>
    </main>
  );
}
