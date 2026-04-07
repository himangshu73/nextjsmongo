"use client";

import { ICategory } from "@/types/circular";

export default function CategoryList({
  categories,
}: {
  categories: ICategory[];
}) {
  return (
    <div className="space-y-2">
      {categories.map((cat) => (
        <div
          key={cat._id}
          className="flex justify-between items-center border rounded-xl p-3 shadow-sm hover:shadow-md transition"
        >
          <p className="font-medium">{cat.name}</p>
          <p className="text-sm text-gray-500">{cat.count ?? 0} circulars</p>
        </div>
      ))}
    </div>
  );
}
