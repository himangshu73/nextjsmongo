"use client";
import { useEffect, useState } from "react";

interface Category {
  _id: string;
  name: string;
}

export default function UploadPage() {
  const [selectedFileName, setSelectedFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<string>("");

  const [fileName, setFileName] = useState("");
  const [circularDate, setCircularDate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("/api/category/list");
      const data = await res.json();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return alert("Please upload a PDF");
    if (!category) return alert("Please select a category");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);
    formData.append("fileName", fileName);
    formData.append("date", circularDate);
    formData.append("description", description);

    try {
      setLoading(true);
      const res = await fetch("/api/circular", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      alert(data.message);

      if (data.success) {
        setFile(null);
        setSelectedFileName("");
        setFileName("");
        setCircularDate("");
        setCategory("");
        setDescription("");
      }
    } catch (error) {
      alert("Upload Failed. Try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-6"
      >
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Upload Circular
        </h1>
        <div className="space-y-4"></div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Upload PDF
          </label>
          <input
            id="fileUpload"
            type="file"
            accept="application/pdf"
            className="hidden"
            required
            onChange={(e) => {
              const f = e.target.files?.[0] || null;
              setFile(f);
              setSelectedFileName(f?.name || "");
            }}
          />
          <label
            htmlFor="fileUpload"
            className="cursor-pointer bg-blue-600 text-white p-3 rounded-xl text-center shadow hover:bg-blue-700 transition"
          >
            {selectedFileName || "Upload PDF"}
          </label>
          <p className="text-xs text-gray-500" id="fileNameDisplay">
            {selectedFileName || "No file choosen."}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Category</label>
          <select
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-xl p-3 text-sm bg-gray-50 cursor-pointer"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">File Name</label>
          <input
            type="text"
            placeholder="Enter file name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            required
            className="border rounded-xl p-3 text-sm bg-gray-50"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Circular Date
          </label>
          <input
            type="date"
            required
            value={circularDate}
            onChange={(e) => setCircularDate(e.target.value)}
            className="border rounded-xl p-3 text-sm bg-gray-50"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Short Description
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a short description..."
            className="border rounded-xl p-3 text-sm bg-gray-50 resize-none"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white p-3 rounded-xl font-medium shadow transition cursor-pointer ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              <span className="loader h-5 w-5 border-2 border-white border-t-transparent roundedfull animate-spin"></span>
              Uploading...
            </div>
          ) : (
            "Upload"
          )}
        </button>
      </form>
    </div>
  );
}
