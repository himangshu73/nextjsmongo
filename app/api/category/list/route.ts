import dbConnect from "@/lib/dbConnect";
import Category from "@/model/Category";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const categories = await Category.find().sort({ name: 1 });
    return NextResponse.json({ success: true, categories }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Categories not found." },
      { status: 404 }
    );
  }
}
