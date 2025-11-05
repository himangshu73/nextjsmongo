import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await auth();

  if (!session || session.user.role !== "admin") {
    redirect("/");
  }
  return <div className="container px-4">Welcome {session.user?.name}</div>;
}
