import { ICircular } from "@/types/circular";

export default function CircularCard({ circular }: { circular: ICircular }) {
  return (
    <div className="border rounded-lg p-4 flex justify-between items-start bg-white shadow-sm">
      <div className="space-y-1">
        <div className="font-semibold text-gray-900">{circular.fileName}</div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-500">
            Category:{" "}
            {typeof circular.category === "object" &&
            "name" in circular.category
              ? circular.category.name
              : "Unknown"}
          </div>
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
          className="shrink-0 px-3 py-1.5 bg-gray-600 hover:bg-gray-800 text-white text-sm rounded-md"
        >
          Download
        </a>
      </div>
    </div>
  );
}
