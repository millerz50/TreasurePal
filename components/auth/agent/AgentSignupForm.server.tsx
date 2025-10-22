// components/AgentSignupForm.tsx
import AgentSignupSubmit from "./AgentSignupSubmit";
import AnimatedField from "./AnimatedField";

export default function AgentSignupForm() {
  return (
    <form
      id="agent-signup-form"
      className="max-w-md mx-auto space-y-6 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Agent Signup
      </h2>
      <p className="text-center text-gray-500 text-sm mb-4">
        Join Netspace and start earning commissions while empowering businesses.
      </p>

      <AnimatedField name="firstName" type="text" placeholder="First Name" />
      <AnimatedField name="surname" type="text" placeholder="Surname" />
      <AnimatedField name="email" type="email" placeholder="Email" />
      <AnimatedField name="password" type="password" placeholder="Password" />
      <AnimatedField name="nationalId" type="text" placeholder="National ID" />
      <AnimatedField name="image" type="file" placeholder="Upload ID Image" />

      <input type="hidden" name="status" value="Not Verified" />

      <AgentSignupSubmit />
    </form>
  );
}
