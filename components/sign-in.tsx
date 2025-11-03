"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <button
      onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
      className="bg-green-700 hover:bg-green-800 px-3 py-2 rounded-md text-white cursor-pointer"
    >
      Login
    </button>
  );
}
