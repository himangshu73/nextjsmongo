import CircularList from "@/components/CircularList";
import dbConnect from "@/lib/dbConnect";
import Circular from "@/model/Circular";
import { ICircular } from "@/types/circular";

export default async function CircularPage() {
  await dbConnect();

  const circulars = await Circular.find()
    .populate("category", "name")
    .sort({ date: -1 })
    .lean<ICircular[]>();

  return <CircularList circulars={circulars} />;
}
