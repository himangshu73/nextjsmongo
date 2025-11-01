"use client";
import { signIn } from "next-auth/react"; // <— use this instead of "@/auth"

export default function SignIn() {
  return <button onClick={() => signIn("github")}>Sign in with GitHub</button>;
}
