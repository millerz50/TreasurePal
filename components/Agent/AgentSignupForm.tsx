"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";

interface FormData {
  firstName: string;
  surname: string;
  email: string;
  password: string;
  nationalId: string;
  status: string;
  image: File | null;
}

export default function AgentSignupForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    surname: "",
    email: "",
    password: "",
    nationalId: "",
    status: "Not Verified",
    image: null,
  });

  const [error, setError] = useState<string>("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files && files.length > 0 ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        payload.append(key, value as string | Blob);
      }
    });

    try {
      console.log("Payload preview:");
      // ✅ Fix the error with type assertion
      for (const [key, value] of (payload as any).entries()) {
        console.log(`${key}:`, value);
      }
      const res = await fetch(
        "https://treasurepal-backened.onrender.com/api/agents/create",
        {
          method: "POST",
          body: payload,
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      console.log("✅ Agent created:", data.agent);
      // Add redirect or success feedback here if needed
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg space-y-5 transition-all duration-700 ease-out transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
        Agent Signup
      </h2>
      <p className="text-center text-gray-500 text-sm mb-4">
        Join Netspace and start earning commissions while empowering businesses.
      </p>

      {error && (
        <Alert className="bg-blue-50 border-blue-300 text-blue-800">
          <Info className="h-5 w-5" />
          <AlertTitle>Notice</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
        className="input input-bordered w-full"
      />
      <input
        type="text"
        name="surname"
        placeholder="Surname"
        value={formData.surname}
        onChange={handleChange}
        required
        className="input input-bordered w-full"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="input input-bordered w-full"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="input input-bordered w-full"
      />
      <input
        type="text"
        name="nationalId"
        placeholder="National ID"
        value={formData.nationalId}
        onChange={handleChange}
        required
        className="input input-bordered w-full"
      />
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        className="file-input file-input-bordered w-full"
      />

      <button
        type="submit"
        className="btn btn-primary w-full transition-all duration-300 hover:scale-[1.02]">
        Register as Agent
      </button>
    </form>
  );
}
