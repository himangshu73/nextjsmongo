"use client";

import { useEffect, useState } from "react";
import type { ICircular } from "@/types/circular";

export default function CircularPage() {
  const [circulars, setCirculars] = useState([]);

  useEffect(() => {
    async function fetchPDFs() {
      const res = await fetch("/api/showcircular");
      const data = await res.json();
      console.log(data);
      if (data.success) {
        setCirculars(data.circulars);
      }
    }
    fetchPDFs();
  }, []);
  return (
    <div className="p-4">
      <h1 className="text-xl fornt-semibold mb-4">All Circulars</h1>
      <div className="space-y-4">
        {circulars.map((item: ICircular) => (
          <div
            key={item.publicId}
            className="border p-3 rounded-md flex justify-between items-center"
          >
            <div>
              <div className="font-medium">{item.fileName}</div>
              <div className="text-sm text-gray-500">
                Date: {new Date(item.date).toLocaleDateString()}
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
          </div>
        ))}
      </div>
    </div>
  );
}
