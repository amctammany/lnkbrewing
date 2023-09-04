import { List, ListItemButton } from "@/components";
import { prisma } from "@/lib/client";
export default async function StylesIndex() {
  const styles = await prisma.style.findMany();
  return (
    <List>
      {styles.map((style) => (
        <ListItemButton key={style.id} href={`/styles/${style.identifier}`}>
          {style.name}
        </ListItemButton>
      ))}
    </List>
  );
}
