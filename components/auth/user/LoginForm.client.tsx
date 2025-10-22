"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function LoginFormClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const formElement = document.getElementById("login-form");

    if (!(formElement instanceof HTMLFormElement)) return;

    const handleSubmit = async (e: Event) => {
      e.preventDefault();
      setLoading(true);

      const formData = new FormData(formElement);
      const payload: Record<string, string> = {};
      formData.forEach((value, key) => {
        payload[key] = value.toString();
      });

      try {
        const res = await fetch(
          "https://treasurepal-backened.onrender.com/api/users/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Invalid credentials");

        toast.success("Login successful");
        setShowSuccess(true);

        setTimeout(() => {
          router.push("/");
        }, 1500);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Something went wrong";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    formElement.addEventListener("submit", handleSubmit);
    return () => {
      formElement.removeEventListener("submit", handleSubmit);
    };
  }, [router]);

  const triggerSubmit = () => {
    const formElement = document.getElementById("login-form");
    if (formElement instanceof HTMLFormElement) {
      formElement.requestSubmit();
    }
  };

  return (
    <>
      <Button
        onClick={triggerSubmit}
        className="w-full mt-4"
        disabled={loading}
        aria-busy={loading}
        aria-label="Submit login form">
        {loading ? "Signing in..." : "Sign In"}
      </Button>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="text-center">
          <DialogTitle className="sr-only">Login Status</DialogTitle>
          <CheckCircle className="mx-auto text-green-500 w-8 h-8" />
          <h3 className="mt-2 text-lg font-semibold">Login Successful</h3>
          <DialogDescription className="text-sm text-gray-500">
            Redirecting to dashboard...
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}
