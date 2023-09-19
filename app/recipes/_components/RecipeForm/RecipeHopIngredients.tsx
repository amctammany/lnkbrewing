import { ButtonLink, List, ListItem, Section } from "@/components";
import { prisma } from "@/lib/client";
import { HopIngredient } from "./HopIngredient";

export type RecipeHopIngredientsProps = {
  recipeId?: number;
};
export const RecipeHopIngredients = async ({
  recipeId,
}: RecipeHopIngredientsProps) => {
  const recipeHops = await prisma.hopIngredient.findMany({
    where: {
      recipeId,
    },
    orderBy: [{ durationType: "asc" }, { duration: "desc" }],
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
          <HopIngredient key={hop.id} hop={hop} />
        ))}
      </List>
    </Section>
  );
};
