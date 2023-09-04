import { List, ListItem } from "@/components";
import { prisma } from "@/lib/client";
export default async function StylesIndex() {
  const styles = await prisma.style.findMany();
  return (
    <main className="top-16 left-2 right-2 flex flex-col items-center justify-between p-2">
      <List>
        {styles.map((style) => (
          <ListItem key={style.id}>{style.name}</ListItem>
        ))}
      </List>
    </main>
  );
}
