import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }
  return (
    <div className="container px-4">
      Welcome {session.user?.name}. Your User category is {session.user.role}
    </div>
  );
}
