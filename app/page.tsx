"use client";

import CircularFilters from "@/components/CircularFilters";

export interface CircularFilterValues {
  search?: string;
  category?: "GAD" | "SME" | "CIB" | "";
  from?: string;
  to?: string;
}

export default function Home() {
  function handleFilters(filters: CircularFilterValues) {
    console.log(filters);
  }
  return (
    <div className="p-2">
      <CircularFilters onFilter={handleFilters} />
    </div>
  );
}
