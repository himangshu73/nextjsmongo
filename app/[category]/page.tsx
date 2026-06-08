import CircularList from "@/components/CircularList";
import dbConnect from "@/lib/dbConnect";
import Category from "@/model/Category";
import Circular from "@/model/Circular";
import { auth } from "@/auth";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  const session = await auth();
  let deleteButton = false;
  if (session) {
    deleteButton = true;
  }

  await dbConnect();

  const foundCategory = await Category.findOne({ name: category });

  const foundCirculars = await Circular.find({ category: foundCategory._id })
    .populate("category", "name")
    .sort({ date: -1 });
  const circulars = JSON.parse(JSON.stringify(foundCirculars));
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 pb-4 border-b">
        <h1 className="text-3xl font-bold tracking-tight">
          Category: {category}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {circulars.length} circular
          {circulars.length !== 1 ? "s" : ""} found
        </p>
      </div>
      <CircularList circulars={circulars} showDeleteButton={deleteButton} />
    </div>
  );
}
