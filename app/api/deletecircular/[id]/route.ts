import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import Circular from "@/model/Circular";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    const circular = await Circular.findById(id);
    if (!circular) {
      return NextResponse.json(
        { error: "Circular not found" },
        { status: 404 }
      );
    }

    if (circular.publicId) {
      await cloudinary.uploader.destroy(circular.publicId);
    }

    await circular.deleteOne();

    return NextResponse.json(
      { success: true, message: "Circular deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Delete Error: ", error);
    return NextResponse.json(
      { error: "Failed to delete circular" },
      { status: 500 }
    );
  }
}
