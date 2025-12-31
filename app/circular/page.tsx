import CircularList from "@/components/CircularList";

export default async function CircularPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/circular/show`, {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">All Circulars</h1>
      <CircularList circulars={data?.circulars ?? []} />
    </div>
  );
}
