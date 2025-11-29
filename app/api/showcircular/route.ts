import dbConnect from "@/lib/dbConnect";
import Circular from "@/model/Circular";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const circulars = await Circular.find();
    console.log(circulars);

    return NextResponse.json(
      {
        success: true,
        circulars,
      },
      { status: 200 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown serer error";
    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
