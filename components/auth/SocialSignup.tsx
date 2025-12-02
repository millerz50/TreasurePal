"use client";

import { Button } from "../../components/ui/button";

export default function SocialSignup() {
  return (
    <div className="mt-6 flex flex-col gap-3">
      <Button
        type="button"
        className="w-full bg-red-500 hover:bg-red-600 text-white rounded-lg py-2 text-sm font-medium"
        onClick={() =>
          (window.location.href =
            "https://treasurepal-backened.onrender.com/api/auth/google")
        }>
        Continue with Google
      </Button>
      <Button
        type="button"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 text-sm font-medium"
        onClick={() =>
          (window.location.href =
            "https://treasurepal-backened.onrender.com/api/auth/facebook")
        }>
        Continue with Facebook
      </Button>
    </div>
  );
}
