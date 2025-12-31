import { ICircular } from "@/types/circular";
import CircularCard from "./CircularCard";

export default function CircularList({
  circulars = [],
}: {
  circulars?: ICircular[];
}) {
  if (circulars.length === 0) {
    return (
      <div className="text-center text-gray-800 p-8">No circulars found.</div>
    );
  }
  return (
    <div className="w-full md:w-1/3 space-y-4">
      {circulars.map((circular) => (
        <CircularCard key={circular._id} circular={circular} />
      ))}
    </div>
  );
}
