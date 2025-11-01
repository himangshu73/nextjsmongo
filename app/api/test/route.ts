import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  dbConnect();
  return NextResponse.json(
    {
      message: "Connection to DB Successful",
    },
    { status: 200 }
  );
}
