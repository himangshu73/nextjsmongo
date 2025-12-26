"use client";

import CircularFilters from "@/components/CircularFilters";
import { ICircularFilterValues } from "@/types/circular";

export default function Home() {
  function handleFilters(filters: ICircularFilterValues) {
    console.log(filters);
  }
  return (
    <div className="p-2">
      <CircularFilters onFilter={handleFilters} />
    </div>
  );
}
