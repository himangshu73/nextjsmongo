import { ICircular } from "@/types/circular";
import CircularCard from "./CircularCard";

interface CircularListProps {
  circulars?: ICircular[];
  showDeleteButton?: boolean;
}

export default function CircularList({
  circulars = [],
  showDeleteButton = false,
}: CircularListProps) {
  if (circulars.length === 0) {
    return (
      <div className="text-center text-gray-800 p-8">No circulars found.</div>
    );
  }
  return (
    <div className="space-y-4">
      {circulars.map((circular) => (
        <CircularCard
          key={circular._id.toString()}
          circular={circular}
          showDeleteButton={showDeleteButton}
        />
      ))}
    </div>
  );
}
