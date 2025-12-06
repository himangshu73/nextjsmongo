"use client";

import { useState } from "react";

export interface CircularFilterValues {
  search?: string;
  category?: "GAD" | "SME" | "CIB" | "";
  from?: string;
  to?: string;
}

interface CircularFilterProps {
  onFilter: (filters: CircularFilterValues) => void;
}

export default function CircularFilters({ onFilter }: CircularFilterProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onFilter({
      search,
      category: category as CircularFilterValues["category"],
      from,
      to,
    });
  }
  return (
    <div className="w-full bg-gray-800 p-4 rounded-xl shadow-md">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row flex-wrap gap-4 items-start md:items-center "
      >
        <input
          type="text"
          placeholder="Type name or description"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] bg-gray-700 text-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="min-w-[120px] bg-gray-700 text-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          <option value="GAD">GAD</option>
          <option value="SME">SME</option>
          <option value="CIB">CIB</option>
        </select>
        <div className="flex flex-col md:flex-row items-center gap-2 min-w-[150px]">
          <label className="text-xs text-gray-400 mb-1`">From</label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="bg-gray-700 text-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2 min-w-[150px]">
          <label className="text-xs text-gray-400 mb-1`">To</label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="bg-gray-700 text-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="min-w-[120px] bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 cursor-pointer rounded-lg shadow-md mt-2 md:mt-0"
        >
          Search
        </button>
      </form>
    </div>
  );
}
