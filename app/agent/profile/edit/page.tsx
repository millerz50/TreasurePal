"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProfilePage() {
  const { agent, loading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!loading && agent) {
      setEmail(agent.email ?? "");
      setRole(agent.role ?? "");
      setStatus(agent.status ?? "");
    }
  }, [agent, loading]);

  const handleSubmit = async () => {
    setError("");
    setSuccess(false);

    try {
      const res = await fetch(
        "https://treasurepal-backened.onrender.com/api/agents/me",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, role, status }),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      setSuccess(true);
      router.push("/agent/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error("❌ Profile update error:", message);
      setError("Failed to update profile.");
    }
  };

  if (loading) return <div className="p-6">Loading profile...</div>;

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-primary">Edit Profile</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && (
        <p className="text-green-600">Profile updated successfully!</p>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Role</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Status</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <Button onClick={handleSubmit} className="mt-4">
          Save Changes
        </Button>
      </div>
    </main>
  );
}
