import { ButtonLink, List, ListItem, Section } from "@/components";
import { prisma } from "@/lib/client";

export type FermentableIngredientsProps = {
  recipeId?: number;
};
export const FermentableIngredients = async ({
  recipeId,
}: FermentableIngredientsProps) => {
  const recipeFermentables = await prisma.fermentableIngredient.findMany({
    where: {
      recipeId,
    },
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
          <ListItem key={fermentable.id}>
            <div className="flex gap-4">
              <div className="flex-1">{fermentable.fermentable.name}</div>
              <div className="flex-0">{fermentable.amount}</div>
              <div className="flex-0">{fermentable.amountType}</div>
              <div>
                <ButtonLink
                  scroll={false}
                  href={`?fermentableId=${fermentable.id}`}
                >
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
