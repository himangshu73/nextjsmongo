import { auth } from "@/auth";
import { AiOutlineHome } from "react-icons/ai";
import SignOut from "./signout-button";
import SignIn from "./sign-in";
import Link from "next/link";

export default async function Navbar() {
  const session = await auth();
  return (
    <div className="bg-gray-800 flex justify-between px-4 py-8">
      <Link href="/">
        <div className="flex gap-2 justify-center items-center">
          <AiOutlineHome size={32} className="text-white" />
          <h1 className="text-2xl font-bold text-white">Share More</h1>
        </div>
      </Link>
      {session ? (
        <div className="flex gap-2 justify-center items-center">
          <Link href="/dashboard" className="text-white">
            <span>Welcome, </span>
            <span className="hover:underline">
              {session.user?.name?.split(" ")[0]}
            </span>
          </Link>
          <SignOut />
        </div>
      ) : (
        <div>
          <SignIn />
        </div>
      )}
    </div>
  );
}
