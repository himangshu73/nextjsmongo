import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import Category from "@/model/Category";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const session = await auth();
    if (!session?.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { name } = await req.json();

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    return NextResponse.json(
      {
        updatedCategory,
        success: true,
        message: "Category updated successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}
