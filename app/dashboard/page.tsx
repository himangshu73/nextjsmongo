"use client";

import DeleteButton from "@/components/deletebutton";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Category {
  _id: string;
  name: string;
}

export default function Dashboard() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category.trim()) return;
    try {
      const response = await fetch("/api/category/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: category }),
      });
      const data = await response.json();
      if (data.success) {
        setCategories((prev) => [...prev, data.category]);
        setCategory("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container px-4">
      <Link href="/upload">Upload Circular</Link>
      <div>
        <h2>Add Category</h2>
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            className="border px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-400 px-3 py-2 cursor-pointer"
          >
            Add
          </button>
        </form>
      </div>
      <div className="mt-4 space-y-2">
        {categories.map((cat) => (
          <div key={cat._id} className="rounded bg-gray-800 p-2 text-white">
            {cat.name}
            <DeleteButton
              id={cat._id}
              apiPath="/api/category/delete"
              itemName="category"
              onSuccess={() => window.location.reload()}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
