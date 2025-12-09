"use client";

import { useEffect, useState } from "react";
import type { ICircular } from "@/types/circular";
import DeleteCircularButton from "@/components/deletebutton";
import { useSession } from "next-auth/react";
import CircularFilters from "@/components/CircularFilters";

export interface CircularFilterValues {
  search?: string;
  category?: "GAD" | "SME" | "CIB" | "";
  from?: string;
  to?: string;
}

export default function CircularPage() {
  const [circulars, setCirculars] = useState([]);
  const { status } = useSession();

  async function fetchCirculars(filters?: CircularFilterValues) {
    const validParams: Record<string, string> = {};

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "") {
          validParams[key] = String(value);
        }
      });
    }

    const params = new URLSearchParams(validParams).toString();

    const url = params ? `/api/showcircular?${params}` : `/api/showcircular`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.success) {
      setCirculars(data.circulars);
    }
  }
  function handleFilters(filters: CircularFilterValues) {
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
      <div className="space-y-4">
        {circulars.map((item: ICircular) => (
          <div
            key={item.publicId}
            className="border p-3 rounded-md flex justify-between items-center"
          >
            <div>
              <div className="font-medium">{item.fileName}</div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">
                  Category: {item.category}
                </p>
                <div className="text-sm text-gray-500">
                  Date: {new Date(item.date).toLocaleDateString()}
                </div>
              </div>
            </div>
            <a
              href={item.cloudinaryUrl}
              download
              target="_blank"
              className="px-3 py-1 bg-gray-500 hover:bg-gray-700 text-white rounded-md"
            >
              Download
            </a>
            {status === "authenticated" && (
              <DeleteCircularButton id={item._id} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
