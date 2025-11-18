import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import Post from "@/model/Post";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await dbConnect();

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { message } = await req.json();

  const post = await Post.create({
    content: message,
    authorId: session.user.id,
  });

  return NextResponse.json(post, { status: 200 });
}
