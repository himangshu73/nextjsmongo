"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type Category = {
  _id: string;
  name: string;
};

type Props = {
  categories: Category[];
};

export default function SearchCirculars({ categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category") || "";

  const [titleDes, setTittleDes] = useState(searchParams.get("titleDes") || "");
  const [from, setFrom] = useState(searchParams.get("from") || "");
  const [to, setTo] = useState(searchParams.get("to") || "");

  function applySearch() {
    const params = new URLSearchParams();

    if (titleDes) params.set("titleDes", titleDes);
    if (selectedCategory) params.set("category", selectedCategory);
    if (from) params.set("from", from);
    if (to) params.set("to", to);

    router.push(`?${params.toString()}`);
  }

  function clearSearch() {
    router.push("/circular");
  }

  function onChangeCategory(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    router.push("?" + params.toString());
  }

  return (
    <div className="bg-white border rounded-lg p-4 mb-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Search title or description"
          value={titleDes}
          onChange={(e) => setTittleDes(e.target.value)}
          className="border px-3 py-2 rounded focus:outline-none focus:ring-1"
        />
        <select
          value={selectedCategory}
          onChange={(e) => onChangeCategory(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c._id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border rounded px-3 py-2"
        />

        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <div className="flex gap-3 mt-4">
          <button
            onClick={applySearch}
            className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            Apply
          </button>

          <button
            onClick={clearSearch}
            className="flex-1 border py-2 rounded hover:bg-gray-100"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
