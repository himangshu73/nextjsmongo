import dbConnect from "@/lib/dbConnect";
import Circular from "@/model/Circular";
import { NextResponse } from "next/server";

type QueryType = {
  $or?: Array<Record<string, unknown>>;
  category?: string;
  date?: { $gte?: Date; $lte?: Date };
};

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { search, category, from, to } = Object.fromEntries(
      new URL(req.url).searchParams
    );

    const query: QueryType = {};

    if (search && search.trim() !== "") {
      query.$or = [
        { fileName: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category && category !== "") {
      query.category = category;
    }

    if (from || to) {
      query.date = {};
      if (from) query.date.$gte = new Date(from);
      if (to) query.date.$lte = new Date(to);
    }

    const circulars = await Circular.find(query).sort({ date: -1 });

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
