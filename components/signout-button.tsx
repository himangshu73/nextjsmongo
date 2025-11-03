"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <div
      onClick={() => signOut()}
      className="bg-red-700 hover:bg-red-500 px-3 py-2 rounded-md text-white cursor-pointer"
    >
      Logout
    </div>
  );
}
