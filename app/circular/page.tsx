"use client";

import { useEffect, useState } from "react";
import type { ICircular, ICircularFilterValues } from "@/types/circular";
import CircularFilters from "@/components/CircularFilters";
import CircularList from "@/components/CircularList";

export default function CircularPage() {
  const [circulars, setCirculars] = useState<ICircular[]>([]);

  async function fetchCirculars(filters?: ICircularFilterValues) {
    const validParams: Record<string, string> = {};

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "") {
          validParams[key] = String(value);
        }
      });
    }

    const params = new URLSearchParams(validParams).toString();

    const url = params ? `/api/circular/show?${params}` : `/api/circular/show`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.success) {
      setCirculars(data.circulars);
    }
  }
  function handleFilters(filters: ICircularFilterValues) {
    console.log(filters);
    fetchCirculars(filters);
  }

  useEffect(() => {
    async function loadCirculars() {
      await fetchCirculars();
    }
    loadCirculars();
  }, []);
  return (
    <div className="p-4">
      <CircularFilters onFilter={handleFilters} />
      <h1 className="text-xl fornt-semibold mb-4">All Circulars</h1>
      <CircularList
        circulars={circulars}
        onDelete={(id) =>
          setCirculars((prev) => prev.filter((c) => c._id !== id))
        }
      />
    </div>
  );
}
