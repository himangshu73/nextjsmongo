import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import Post from "@/model/Post";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const posts = await Post.find({
    authorId: new mongoose.Types.ObjectId(session.user.id),
  });
  console.log(posts);
  return NextResponse.json(posts, { status: 200 });
}
