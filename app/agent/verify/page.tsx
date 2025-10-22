"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function AgentVerificationPage() {
  const [email, setEmail] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("email", email);
    if (image) formData.append("image", image);

    const res = await fetch(
      "https://treasurepal-backened.onrender.com/api/agents/verify",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await res.json();
    console.log("✅ Verification submitted:", result);
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-xl font-bold text-primary">
        Verify Your Agent Profile
      </h1>
      <Input
        type="email"
        placeholder="Your registered email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full"
      />
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="w-full"
      />
      <Button onClick={handleSubmit} className="w-full">
        Submit for Verification
      </Button>
    </div>
  );
}
