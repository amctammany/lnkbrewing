import { ButtonLink, List, ListItem, Section } from "@/components";
import { prisma } from "@/lib/client";

export type HopIngredientsProps = {
  recipeId?: number;
};
export const HopIngredients = async ({ recipeId }: HopIngredientsProps) => {
  const recipeHops = await prisma.hopIngredient.findMany({
    where: {
      recipeId,
    },
    include: {
      hop: true,
    },
  });
  const HopActionBar = () => (
    <ButtonLink scroll={false} className="flex-shrink" href="?hopId=new">
      Add
    </ButtonLink>
  );

  return (
    <Section header="Hops" actions={<HopActionBar />}>
      <List>
        {recipeHops.map((hop) => (
          <ListItem key={hop.id}>
            <div className="flex gap-4">
              <div className="flex-0">{hop.duration}</div>
              <div className="flex-1">{hop.hop.name}</div>
              <div className="flex-0">{hop.amount}</div>
              <div>
                <ButtonLink scroll={false} href={`?hopId=${hop.id}`}>
                  Edit
                </ButtonLink>
              </div>
            </div>
          </ListItem>
        ))}
      </List>
    </Section>
  );
};
