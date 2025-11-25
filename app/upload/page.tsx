"use client";
import { useState } from "react";

export default function UploadPage() {
  const [selectedFileName, setSelectedFileName] = useState("");
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-6">
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
            className="hidden"
            required
            onChange={(e) =>
              setSelectedFileName(e.target.files?.[0]?.name || "")
            }
          />
          <label
            htmlFor="fileUpload"
            className="cursor-pointer bg-blue-600 text-white p-3 rounded-xl text-center shadow hover:bg-blue-700 transition"
          >
            {selectedFileName ? selectedFileName : "Upload PDF"}
          </label>
          <p className="text-xs text-gray-500" id="fileNameDisplay">
            {selectedFileName || "No file choosen."}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Category</label>
          <select
            required
            className="border rounded-xl p-3 text-sm bg-gray-50 cursor-pointer"
          >
            <option value="GAD">GAD</option>
            <option value="SME">SME</option>
            <option value="CIB">CIB</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">File Name</label>
          <input
            type="text"
            placeholder="Enter file name"
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
            className="border rounded-xl p-3 text-sm bg-gray-50"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Short Description
          </label>
          <textarea
            rows={3}
            placeholder="Write a short description..."
            className="border rounded-xl p-3 text-sm bg-gray-50 resize-none"
          ></textarea>
        </div>
        <button className="w-full bg-blue-600 text-white p-3 rounded-xl font-medium shadow hover:bg-blue-700 transition cursor-pointer">
          Upload
        </button>
      </div>
    </div>
  );
}
