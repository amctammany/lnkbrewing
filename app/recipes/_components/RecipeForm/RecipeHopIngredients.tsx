import { ButtonLink, List, ListItem, Section } from "@/components";
import { HopIngredient } from "./HopIngredient";
import { ExtendedHopIngredient } from "../../types";

export type RecipeHopIngredientsProps = {
  hops?: ExtendedHopIngredient[] | null;
};
export const RecipeHopIngredients = async ({
  hops,
}: RecipeHopIngredientsProps) => {
  //const recipeHops = await prisma.hopIngredient.findMany({
  //where: {
  //recipeId,
  //},
  //orderBy: [{ durationType: "asc" }, { duration: "desc" }],
  //include: {
  //hop: true,
  //},
  //});
  const HopActionBar = () => (
    <ButtonLink scroll={false} className="flex-shrink" href="?hopId=new">
      Add
    </ButtonLink>
  );

  return (
    <Section header="Hops" actions={<HopActionBar />}>
      <List>
        {(hops || []).map((hop) => (
          <HopIngredient key={hop.id} hop={hop} />
        ))}
      </List>
    </Section>
  );
};
