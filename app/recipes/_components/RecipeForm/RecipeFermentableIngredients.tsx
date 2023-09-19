import { ButtonLink, List, ListItem, Section } from "@/components";
import { prisma } from "@/lib/client";
import { FermentableIngredient } from "./FermentableIngredient";

export type RecipeFermentableIngredientsProps = {
  recipeId?: number;
};
export const RecipeFermentableIngredients = async ({
  recipeId,
}: RecipeFermentableIngredientsProps) => {
  const recipeFermentables = await prisma.fermentableIngredient.findMany({
    where: {
      recipeId,
    },
    orderBy: { amount: "desc" },
    include: {
      fermentable: true,
    },
  });
  const FermentableActionBar = () => (
    <ButtonLink
      scroll={false}
      className="flex-shrink"
      href="?fermentableId=new"
    >
      Add
    </ButtonLink>
  );

  return (
    <Section header="Fermentables" actions={<FermentableActionBar />}>
      <List>
        {recipeFermentables.map((fermentable) => (
          <FermentableIngredient
            key={fermentable.id}
            fermentable={fermentable}
          />
        ))}
      </List>
    </Section>
  );
};
