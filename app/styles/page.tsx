import { List, ListItemButton, Section } from "@/components";
import { prisma } from "@/lib/client";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "LNK Styles",
};
export default async function StylesIndex() {
  const styles = await prisma.style.findMany();
  return (
    <Section header="Styles">
      <List>
        {styles.map((style) => (
          <ListItemButton key={style.id} href={`/styles/${style.identifier}`}>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="px-2.5 py-2.5 rounded-full border w-16 text-center bg-slate-200 text-black group-hover:text-white group-hover:bg-gray-300 text-sm font-medium">
                  {style.identifier}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="group-hover:text-slate-400"> {style.name}</p>
                <p className="group-hover:text-slate-400"> {style.category}</p>
              </div>
            </div>
          </ListItemButton>
        ))}
      </List>
    </Section>
  );
}
