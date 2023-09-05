import { List, ListItemButton } from "@/components";
import { prisma } from "@/lib/client";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "LNK Fermentables",
};
export default async function FermentablesIndex() {
  const fermentables = await prisma.fermentable.findMany();
  return (
    <List>
      {fermentables.map((fermentable) => (
        <ListItemButton
          key={fermentable.id}
          href={`/fermentables/${fermentable.slug}`}
        >
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="px-2.5 py-2.5 rounded-full border w-16 text-center bg-slate-200 text-black group-hover:text-white group-hover:bg-gray-300 text-sm font-medium">
                {fermentable.country}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="group-hover:text-slate-400"> {fermentable.name}</p>
              <p className="group-hover:text-slate-400">
                {" "}
                {fermentable.country}
              </p>
            </div>
          </div>
        </ListItemButton>
      ))}
    </List>
  );
}
