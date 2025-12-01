import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }
  return (
    <div className="container px-4">
      <Link href="/upload">Upload Circular</Link>
    </div>
  );
}
