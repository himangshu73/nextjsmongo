"use client";

import { useState } from "react";

interface DeleteButtonProps {
  id: string;
  apiPath: string;
  itemName: string;
  onSuccess?: () => void;
}

export default function DeleteButton({
  id,
  apiPath,
  itemName,
  onSuccess,
}: DeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);

    const res = await fetch(`${apiPath}/${id}`, { method: "DELETE" });

    const data = await res.json();

    setLoading(false);
    setOpen(false);

    if (data.success) {
      alert(`${itemName} deleted successfully`);
      onSuccess?.();
    } else {
      alert(data.error || "Failed to delete");
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
      >
        Delete
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Confirm Delete
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this {itemName}?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
