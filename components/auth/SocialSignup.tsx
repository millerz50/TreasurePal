"use client";

import { account } from "@/lib/appwrite";
import { OAuthProvider } from "appwrite";
import { Button } from "../../components/ui/button";

export default function SocialSignup() {
  function signInWith(provider: OAuthProvider) {
    account.createOAuth2Session(
      provider,
      `${window.location.origin}/auth/callback`,
      `${window.location.origin}/auth/signup`
    );
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      <Button
        type="button"
        className="w-full bg-red-500 hover:bg-red-600 text-white rounded-lg py-2 text-sm font-medium"
        onClick={() => signInWith(OAuthProvider.Google)}>
        Continue with Google
      </Button>

      <Button
        type="button"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 text-sm font-medium"
        onClick={() => signInWith(OAuthProvider.Facebook)}>
        Continue with Facebook
      </Button>
    </div>
  );
}
