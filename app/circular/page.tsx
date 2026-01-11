import "@/model";

import CircularList from "@/components/CircularList";
import dbConnect from "@/lib/dbConnect";
import Circular from "@/model/Circular";
import Category from "@/model/Category";
import { ICategory, ICircular } from "@/types/circular";
import SearchCirculars from "@/components/SearchCirculars";

type PageProps = {
  searchParams: {
    titleDes?: string;
    category?: string;
    from?: string;
    to?: string;
  };
};

export default async function CircularPage({
  searchParams,
}: {
  searchParams: Promise<PageProps["searchParams"]>;
}) {
  await dbConnect();

  const categoriesRaw = await Category.find()
    .sort({ name: 1 })
    .lean<ICategory[]>();

  const categories = categoriesRaw.map((c) => ({
    _id: c._id.toString(),
    name: c.name,
  }));

  const params = await searchParams;

  const query: any = {};

  if (params.titleDes) {
    query.$or = [
      { fileName: { $regex: params.titleDes, $options: "i" } },
      { description: { $regex: params.titleDes, $options: "i" } },
    ];
  }

  if (params.category) {
    const categoryDoc = categories.find((c) => c.name === params.category);

    if (categoryDoc) {
      query.category = categoryDoc._id;
    } else {
      query.category = null;
    }
  }

  if (params.from || params.to) {
    query.date = {};
    if (params.from) query.date.$gte = new Date(params.from);
    if (params.to) query.date.$lte = new Date(params.to);
  }

  const circulars = await Circular.find(query)
    .populate("category", "name")
    .sort({ date: -1 })
    .lean<ICircular[]>();

  return (
    <>
      <SearchCirculars categories={categories} />
      <CircularList circulars={circulars} />;
    </>
  );
}
