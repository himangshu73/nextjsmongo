import { ICircular } from "@/types/circular";

export default function CircularCard({ circular }: { circular: ICircular }) {
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
      </div>
    </div>
  );
}
