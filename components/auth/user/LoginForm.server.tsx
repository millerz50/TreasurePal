import LoginFormClient from "./LoginForm.client";

export default function LoginForm() {
  return (
    <form id="login-form" className="space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-primary">Welcome Back</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="input input-bordered w-full"
        autoComplete="email"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="input input-bordered w-full"
        autoComplete="current-password"
        required
      />

      {/* Hidden submit input to allow native triggering */}
      <input type="submit" hidden />

      <LoginFormClient />
    </form>
  );
}
