import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function GET() {
  try {
    const ping = await cloudinary.api.ping();
    console.log(ping);
    console.log("waiting for result");
    const result = await cloudinary.api.resources({
      resource_type: "image",
      type: "upload",
      prefix: "circulars/",
      max_results: 100,
    });

    console.log(result);

    return NextResponse.json({
      success: true,
      message: "PDF List Fetched",
      circulars: result.resources,
    });
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
