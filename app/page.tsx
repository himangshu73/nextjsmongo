import "@/model";

import CircularList from "@/components/CircularList";
import Circular from "@/model/Circular";
import { ICategory, ICircular } from "@/types/circular";
import dbConnect from "@/lib/dbConnect";
import CategoryList from "@/components/CategoryList";
import Category from "@/model/Category";

export default async function Home() {
  await dbConnect();
  const circulars = await Circular.find()
    .populate("category", "name")
    .sort({ date: -1 })
    .limit(5)
    .lean<ICircular[]>();

  const categories = await Category.find().lean<ICategory[]>();

  const topCategories = categories
    .sort((a, b) => (b.count ?? 0) - (a.count ?? 0))
    .slice(0, 5)
    .map((cat) => ({
      ...cat,
      _id: cat._id.toString(),
    }));
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-3">Latest Circulars</h2>
          <div className="border rounded-xl p-3 shadow-sm">
            <CircularList circulars={circulars} />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-3">Top Categories</h2>
          <div className="border rounded-xl p-3 shadow-sm">
            <CategoryList categories={topCategories} />
          </div>
        </div>
      </div>
    </div>
  );
}
