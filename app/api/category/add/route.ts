import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import Category from "@/model/Category";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await dbConnect();

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name } = await req.json();

  if (!name) {
    return NextResponse.json(
      { success: false, error: "Category name required" },
      { status: 400 },
    );
  }

  const exist = await Category.findOne({ name });
  if (exist) {
    return NextResponse.json(
      { success: false, error: "Category already exists" },
      { status: 409 },
    );
  }

  const category = await Category.create({ name });

  return NextResponse.json(
    { category, success: true, message: "Category Added successfully." },
    { status: 201 },
  );
}
