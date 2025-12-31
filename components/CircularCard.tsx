"use client";

import { useSession } from "next-auth/react";
import DeleteButton from "./deletebutton";
import { ICircular } from "@/types/circular";

interface CircularCardProps {
  circular: ICircular;
  onDelete?: (id: string) => void;
}

export default function CircularCard({
  circular,
  onDelete,
}: CircularCardProps) {
  const { status } = useSession();
  return (
    <div className="border p-3 rounded-md flex justify-between items-center">
      <div>
        <div className="font-medium">{circular.fileName}</div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500">
            Category:{" "}
            {typeof circular.category === "object" &&
            "name" in circular.category
              ? circular.category.name
              : "Unknown"}
          </p>
          <div className="text-sm text-gray-500">
            Date: {new Date(circular.date).toLocaleDateString()}
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <a
          href={circular.cloudinaryUrl}
          download
          target="_blank"
          className="px-3 py-1 bg-gray-500 hover:bg-gray-700 text-white rounded-md"
        >
          Download
        </a>
        {status === "authenticated" && (
          <DeleteButton
            id={circular._id}
            apiPath="/api/circular/delete"
            itemName="circular"
            onSuccess={() => onDelete?.(circular._id)}
          />
        )}
      </div>
    </div>
  );
}
