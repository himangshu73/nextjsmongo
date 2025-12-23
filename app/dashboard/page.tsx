"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Category {
  _id: string;
  name: string;
}

export default function Dashboard() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadCategory() {
      const response = await fetch("/api/category/list");
      const data = await response.json();

      if (data.success) {
        console.log("Categories: ", data.categories);
        setCategories(data.categories);
      }
    }
    loadCategory();
  }, []);

  return (
    <div className="container px-4">
      <Link href="/upload">Upload Circular</Link>
      <div className="mt-4 space-y-2">
        {categories.map((cat) => (
          <div key={cat._id} className="rounded bg-gray-800 p-2 text-white">
            {cat.name}
          </div>
        ))}
      </div>
    </div>
  );
}
