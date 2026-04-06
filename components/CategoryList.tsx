"use client";

import { ICategory } from "@/types/circular";
import { useEffect, useState } from "react";

export default function CategoryList() {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    async function loadCategory() {
      const response = await fetch("/api/category/list");

      if (response.status === 401) {
        return;
      }

      const data = await response.json();

      if (data.success) {
        setCategories(data.categories);
      }
    }
    loadCategory();
  }, []);

  const topCategories = categories
    .sort((a, b) => (b.count ?? 0) - (a.count ?? 0))
    .slice(0, 5);
  return (
    <div className="space-y-2">
      {topCategories.map((cat) => (
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
