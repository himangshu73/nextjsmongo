import CircularList from "@/components/CircularList";
import dbConnect from "@/lib/dbConnect";
import Category from "@/model/Category";
import Circular from "@/model/Circular";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  await dbConnect();

  const foundCategory = await Category.findOne({ name: category });

  const foundCirculars = await Circular.find({ category: foundCategory._id })
    .populate("category", "name")
    .sort({ date: -1 });
  const circulars = JSON.parse(JSON.stringify(foundCirculars));
  return (
    <div>
      {category}
      <CircularList circulars={circulars} showDeleteButton={true} />
    </div>
  );
}
