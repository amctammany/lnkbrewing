import { Section } from "@/components/Section";
import { ExtendedRecipe } from "../../types";
import { ButtonLink } from "@/components/Button";
import { List } from "@/components/List";
import { RecipeListItem } from "../RecipeListItem";
import { Recipe } from "@prisma/client";

export type RecipesListProps = {
  recipes?: Recipe[];
};
export function RecipesList({ recipes }: RecipesListProps) {
  return (
    <Section
      header="RecipesIndex"
      actions={<ButtonLink href="/recipes/new">New</ButtonLink>}
    >
      <List>
        {(recipes || []).map((recipe) => (
          <RecipeListItem key={recipe.id} recipe={recipe} />
        ))}
      </List>
    </Section>
  );
}
