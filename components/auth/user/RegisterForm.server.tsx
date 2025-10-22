import { BriefcaseIcon, IdentificationIcon } from "@heroicons/react/24/outline";
import AnimatedInput from "./AnimatedInput.client";
import RegisterFormSubmit from "./RegisterFormSubmit";

function generateRegisterNumber(): string {
  const prefix = "TP";
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${random}-${digits}`;
}

const occupations = [
  "student",
  "retired",
  "working",
  "unemployed",
  "self employed",
];

export default function RegisterForm() {
  const registerNumber = generateRegisterNumber();

  return (
    <section
      className="space-y-6 max-w-xl mx-auto px-4"
      aria-label="Registration form">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary flex items-center justify-center gap-2">
          <IdentificationIcon className="h-6 w-6 text-accent" />
          Create an Account
        </h2>
        <p className="text-sm text-base-content mt-2">
          Fill in your details to join{" "}
          <span className="text-highlight font-semibold">TreasurePal</span> and
          start discovering hidden gems.
        </p>
      </div>

      <form id="register-form" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatedInput
            name="name"
            placeholder="First Name"
            icon="UserIcon"
            autoComplete="given-name"
          />
          <AnimatedInput
            name="surname"
            placeholder="Last Name"
            icon="UserIcon"
            autoComplete="family-name"
          />
        </div>

        <AnimatedInput
          name="email"
          placeholder="Email"
          icon="EnvelopeIcon"
          autoComplete="email"
          color="text-highlight"
        />
        <AnimatedInput
          name="password"
          placeholder="Password"
          icon="LockClosedIcon"
          autoComplete="new-password"
          color="text-accent"
          type="password"
        />
        <AnimatedInput
          name="dob"
          placeholder="Date of Birth"
          icon="CalendarIcon"
          autoComplete="bday"
          color="text-highlight"
          type="date"
        />

        <div className="relative">
          <label htmlFor="occupation" className="sr-only">
            Occupation
          </label>
          <BriefcaseIcon className="absolute left-3 top-3 h-5 w-5 text-accent" />
          <select
            id="occupation"
            name="occupation"
            className="select select-bordered w-full pl-10"
            required
            aria-label="Select Occupation">
            <option value="">Select Occupation</option>
            {occupations.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <label htmlFor="registerNumber" className="sr-only">
            Registration Number
          </label>
          <IdentificationIcon className="absolute left-3 top-3 h-5 w-5 text-highlight" />
          <input
            type="text"
            id="registerNumber"
            name="registerNumber"
            readOnly
            className="input input-bordered w-full pl-10 text-sm text-gray-500"
            value={registerNumber}
            aria-label="Registration Number"
          />
        </div>

        <RegisterFormSubmit />
      </form>
    </section>
  );
}
