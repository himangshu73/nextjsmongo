"use client";

import { signIn } from "next-auth/react";
import { AiOutlineHome } from "react-icons/ai";

export default function Navbar() {
  return (
    <div className="flex justify-between px-4">
      <div>
        <AiOutlineHome />
        <span>Home</span>
      </div>
      <div>
        <button onClick={() => signIn("github", { callbackUrl: "/dashboard" })}>
          Login
        </button>
      </div>
    </div>
  );
}
