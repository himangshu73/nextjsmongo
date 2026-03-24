import "@/model";

import CircularList from "@/components/CircularList";
import Circular from "@/model/Circular";
import { ICircular } from "@/types/circular";

export default async function Home() {
  const circulars = await Circular.find()
    .populate("category", "name")
    .sort({ date: -1 })
    .limit(5)
    .lean<ICircular[]>();
  return (
    <div className="p-2">
      <CircularList circulars={circulars} />
    </div>
  );
}
