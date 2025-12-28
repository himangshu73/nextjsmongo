import { ICategory } from "@/types/circular";
import { useState } from "react";

export default function EditCategoryModal({
  category,
  onClose,
  onSuccess,
}: {
  category: ICategory;
  onClose: () => void;
  onSuccess: (updatedCategory: ICategory) => void;
}) {
  const [name, setName] = useState(category.name);
  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
    if (!name.trim()) return;

    setLoading(true);

    const res = await fetch(`/api/category/edit/${category._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    console.log("Response: ", data);
    setLoading(false);

    if (res.ok) {
      onSuccess(data.updatedCategory);
      onClose();
    }
  }
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-5 rounded w-80 space-y-4">
        <h2 className="text-lg font-semibold">Edit Category</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-sm">
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-1 rounded text-sm"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
