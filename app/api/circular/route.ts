import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import Circular from "@/model/Circular";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    await dbConnect();

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    const file = formData.get("file") as File | null;
    const fileName = formData.get("fileName") as string;
    const date = formData.get("date") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "circulars", resource_type: "auto" },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        )
        .end(buffer);
    });
    console.log("Uploadresult:", uploadResult);
    const upload = uploadResult as UploadApiResponse;

    const newCircular = await Circular.create({
      fileName,
      category,
      date,
      description,
      cloudinaryUrl: upload.secure_url,
      publicId: upload.public_id,
      fileSize: upload.bytes,
      format: upload.format,
      uploadedBy: session.user.id,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Circular Uploaded successfully",
        circular: newCircular,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Upload Failed" }, { status: 500 });
  }
}
