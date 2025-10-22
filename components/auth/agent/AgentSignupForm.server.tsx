import AgentSignupSubmit from "./AgentSignupSubmit";
import AnimatedField from "./AnimatedField";

export default function AgentSignupForm() {
  return (
    <section
      aria-label="Agent Signup Form"
      className="max-w-md mx-auto space-y-6 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Agent Signup
      </h2>
      <p className="text-center text-gray-500 text-sm mb-4">
        Join Netspace and start earning commissions while empowering businesses.
      </p>

      <form
        id="agent-signup-form"
        className="space-y-6"
        aria-label="Signup form">
        <AnimatedField name="firstName" type="text" placeholder="First Name" />
        <AnimatedField name="surname" type="text" placeholder="Surname" />
        <AnimatedField name="email" type="email" placeholder="Email" />
        <AnimatedField name="password" type="password" placeholder="Password" />
        <AnimatedField
          name="nationalId"
          type="text"
          placeholder="National ID"
        />
        <AnimatedField name="image" type="file" placeholder="Upload ID Image" />

        <input
          type="hidden"
          name="status"
          value="Not Verified"
          aria-hidden="true"
        />

        <AgentSignupSubmit />
      </form>
    </section>
  );
}
