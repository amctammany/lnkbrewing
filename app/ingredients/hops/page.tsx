import { List, ListItemButton, Table, TableColumn } from "@/components";
import { prisma } from "@/lib/client";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "LNK Hops",
};
const columns = [
  { name: "name" },
  { name: "country" },
  { name: "usage" },
  { name: "alpha" },
  { name: "beta" },
];
export default async function HopsIndex() {
  const hops = await prisma.hop.findMany();
  return <Table src={hops} columns={columns} />;
  /**
  return (
    <List>
      {hops.map((hop) => (
        <ListItemButton key={hop.id} href={`/ingredients/hops/${hop.slug}`}>
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="px-2.5 py-2.5 rounded-full border w-16 text-center bg-slate-200 text-black group-hover:text-white group-hover:bg-gray-300 text-sm font-medium">
                {hop.purpose}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="group-hover:text-slate-400"> {hop.name}</p>
              <p className="group-hover:text-slate-400"> {hop.country}</p>
            </div>
          </div>
        </ListItemButton>
      ))}
    </List>
  );
     */
}
