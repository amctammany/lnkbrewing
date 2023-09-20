import { ButtonLink, List, ListItem, Section } from "@/components";
import { HopIngredient } from "./HopIngredient";
import { ExtendedHopIngredient } from "../../types";
import { PlusIcon } from "@heroicons/react/24/solid";

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
      <PlusIcon className="w-6 h-6 text-lg" />
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
