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
    <div className="flex gap-3 mb-4">
      <input
        type="text"
        value={titleDes}
        onChange={(e) => setTittleDes(e.target.value)}
        className="border px-2 py-1"
      />
      <select
        value={selectedCategory}
        onChange={(e) => onChangeCategory(e.target.value)}
        className="border px-2 py-1"
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
        className="border px-2 py-1"
      />

      <input
        type="date"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="border px-2 py-1"
      />

      <button onClick={applySearch} className="bg-black text-white px-3">
        Apply
      </button>

      <button onClick={clearSearch} className="border px-3">
        Clear
      </button>
    </div>
  );
}
