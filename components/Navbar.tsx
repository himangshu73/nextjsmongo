import { auth } from "@/auth";
import { AiOutlineHome } from "react-icons/ai";
import SignOut from "./signout-button";
import SignIn from "./sign-in";

export default async function Navbar() {
  const session = await auth();
  return (
    <div className="flex justify-between px-4">
      <div className="flex gap-2">
        <AiOutlineHome />
        <span>Home</span>
      </div>
      {session ? (
        <div className="flex gap-2">
          <p>{session.user?.name}</p>
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
