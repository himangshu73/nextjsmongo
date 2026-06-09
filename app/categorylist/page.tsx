import CategoryList from "@/components/CategoryList";
import dbConnect from "@/lib/dbConnect";
import Category from "@/model/Category";
import { ICategory } from "@/types/circular";

export default async function CategoryListPage() {
  await dbConnect();

  const foundCategories = await Category.find().lean<ICategory[]>();

  const categories = JSON.parse(JSON.stringify(foundCategories));
  return (
    <div>
      <CategoryList categories={categories} />
    </div>
  );
}
