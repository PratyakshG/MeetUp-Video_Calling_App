"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import React from "react";

const SignInPage = () => {
  const signInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <main className="flex h-screen w-full items-center justify-center text-white">
      <div className="px-10 py-12 bg-white rounded-xl w-full max-w-sm text-black flex flex-col items-center justify-center gap-5">
        <div className="flex items-center justify-center gap-4">
          <Image
            src="/icons/logo-dark.svg"
            alt="MeetUp Logo"
            width={80}
            height={80}
            className="max-sm:size-10 size-14"
          />
          <h1 className="text-4xl font-bold">MeetUp</h1>
        </div>

        <button
          onClick={signInWithGoogle}
          className="bg-neutral-200 border rounded-xl px-5 py-3 flex items-center justify-center gap-5 w-full"
        >
          <Image
            src="/icons/google-icon.svg"
            alt="Google"
            width={24}
            height={24}
          />
          Login with Google
        </button>
      </div>
    </main>
  );
};

export default SignInPage;
