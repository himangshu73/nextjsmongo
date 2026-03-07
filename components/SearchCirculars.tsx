"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchCirculars() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");

  function applySearch() {
    const params = new URLSearchParams();

    if (query.trim()) {
      params.set("q", query.trim());
    }
    router.push(`/circular?${params.toString()}`);
  }

  function clearSearch() {
    setQuery("");
    router.push("/circular");
  }

  return (
    <div className="bg-white border rounded-lg p-4 mb-6 shadow-sm">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search circulars (title, category, year...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && applySearch()}
          className="flex-1 border px-4 py-2 rounded focus:outline-none focus:ring-1"
        />
        <button
          onClick={applySearch}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Search
        </button>
        {query && (
          <button
            onClick={clearSearch}
            className="border px-4 py-2 rounded hover:bg-gray-100"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
