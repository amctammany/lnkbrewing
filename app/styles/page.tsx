import { List, ListItemButton } from "@/components";
import { prisma } from "@/lib/client";
export default async function StylesIndex() {
  const styles = await prisma.style.findMany();
  return (
    <main className="top-16 left-2 right-2 flex flex-col items-center justify-between p-2">
      <List>
        {styles.map((style) => (
          <ListItemButton key={style.id} href={`/styles/${style.identifier}`}>
            {style.name}
          </ListItemButton>
        ))}
      </List>
    </main>
  );
}
