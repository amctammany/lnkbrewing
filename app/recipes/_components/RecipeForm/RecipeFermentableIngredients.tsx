import { ButtonLink, List, ListItem, Section } from "@/components";
import { FermentableIngredient } from "./FermentableIngredient";
import { ExtendedFermentableIngredient } from "../../types";

export type RecipeFermentableIngredientsProps = {
  fermentables?: ExtendedFermentableIngredient[] | null;
};
export const RecipeFermentableIngredients = async ({
  fermentables,
}: RecipeFermentableIngredientsProps) => {
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
        {fermentables.map((fermentable) => (
          <FermentableIngredient
            key={fermentable.id}
            fermentable={fermentable}
          />
        ))}
      </List>
    </Section>
  );
};
