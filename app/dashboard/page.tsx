"use client";

import DeleteButton from "@/components/deletebutton";
import EditCategoryModal from "@/components/EditCategoryModal";
import { ICategory } from "@/types/circular";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Dashboard() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [category, setCategory] = useState("");
  const [editCategory, setEditCategory] = useState<ICategory | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCategory() {
      const response = await fetch("/api/category/list");
      const data = await response.json();

      if (data.success) {
        setCategories(data.categories);
      }
    }
    loadCategory();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/category/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: category }),
      });
      const data = await response.json();
      if (data.success) {
        toast(data.message);
        setCategories((prev) => [...prev, data.category]);
        setCategory("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container px-4">
      <div className="w-full md:w-1/3 mt-4 space-y-4">
        <Link
          className="block w-full text-center bg-cyan-700 hover:bg-cyan-800 px-4 py-3 text-xl rounded text-white cursor-pointer font-semibold"
          href="/upload"
        >
          Upload Circular
        </Link>
        <div className="rounded-lg border bg-white p-4 shadow-sm flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Add Category</h2>
          <form className="flex gap-2" onSubmit={handleSubmit}>
            <input
              autoFocus
              type="text"
              className="border px-3 py-2 w-full rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-cyan-700 hover:bg-cyan-800 text-white px-3 py-2 cursor-pointer whitespace-nowrap rounded"
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </form>
        </div>
        <div className="space-y-2">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="rounded-lg bg-gray-800 p-3 text-white flex justify-between items-center"
            >
              <div className="px-2">{cat.name}</div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditCategory(cat)}
                  className="text-sm text-white hover:underline cursor-pointer"
                >
                  Edit
                </button>
                <DeleteButton
                  id={cat._id}
                  apiPath="/api/category/delete"
                  itemName="category"
                  onSuccess={() =>
                    setCategories((prev) =>
                      prev.filter((c) => c._id !== cat._id)
                    )
                  }
                />
              </div>
            </div>
          ))}

          {editCategory && (
            <EditCategoryModal
              category={editCategory}
              onClose={() => setEditCategory(null)}
              onSuccess={(updatedCategory) => {
                if (!updatedCategory?._id) return;

                setCategories((prev) =>
                  prev.map((c) =>
                    c._id === updatedCategory._id ? updatedCategory : c
                  )
                );
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
