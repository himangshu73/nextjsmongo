import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import Post from "@/model/Post";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const posts = await Post.find({ authorId: session.user.id }).sort({
    createdAt: -1,
  });
  return NextResponse.json(posts, { status: 200 });
}
