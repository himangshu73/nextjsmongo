import "@/model";

import CircularList from "@/components/CircularList";
import dbConnect from "@/lib/dbConnect";
import Circular from "@/model/Circular";
import Category from "@/model/Category";
import { ICategory, ICircular } from "@/types/circular";
import SearchCirculars from "@/components/SearchCirculars";

type PageProps = {
  searchParams: {
    q?: string;
  };
};

export default async function CircularPage({ searchParams }: PageProps) {
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

  if (params.q) {
    const q = params.q.trim();

    const yearMatch = q.match(/^\d{4}$/);
    if (yearMatch) {
      query.date = {
        $gte: new Date(`${yearMatch[0]}-01-01`),
        $lte: new Date(`${yearMatch[0]}-12-31`),
      };
    } else {
      const orConditions: any[] = [
        { fileName: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];

      const categoryMatch = categories.find((c) =>
        c.name.toLowerCase().includes(q.toLowerCase()),
      );

      if (categoryMatch) {
        orConditions.push({ category: categoryMatch?._id });
      }

      query.$or = orConditions;

      const yearInside = q.match(/\b(19|20)\d{2}\b/);
      if (yearInside) {
        query.date = {
          $gte: new Date(`${yearInside[0]}-01-01`),
          $lte: new Date(`${yearInside[0]}-12-31`),
        };
      }
    }
  }
  const foundCirculars = await Circular.find(query)
    .populate("category", "name")
    .sort({ date: -1 })
    .lean<ICircular[]>();

  const circulars = JSON.parse(JSON.stringify(foundCirculars));

  return (
    <div className="w-full px-3 md:px-0">
      <div className="mx-auto w-full md:w-1/2">
        <SearchCirculars />
        <CircularList circulars={circulars} />;
      </div>
    </div>
  );
}
