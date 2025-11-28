"use client";

import { useEffect, useState } from "react";

interface Circular {
  public_id: string;
  secure_url: string;
}

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
    <div>
      {circulars.map((c: Circular) => (
        <div key={c.public_id}>
          <a href={c.secure_url} target="_blank" rel="noopener noreferrer">
            Link
          </a>
        </div>
      ))}
    </div>
  );
}
