import LoginFormClient from "./LoginForm.client";

export default function LoginForm() {
  return (
    <form
      id="login-form"
      className="space-y-4 max-w-md mx-auto"
      aria-label="Login form">
      <h2 className="text-2xl font-bold text-primary">Welcome Back</h2>

      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="input input-bordered w-full"
          autoComplete="email"
          required
          aria-label="Email address"
        />
      </div>

      <div>
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className="input input-bordered w-full"
          autoComplete="current-password"
          required
          aria-label="Password"
        />
      </div>

      {/* Hidden submit input to allow native triggering */}
      <input type="submit" hidden />

      <LoginFormClient />
    </form>
  );
}
