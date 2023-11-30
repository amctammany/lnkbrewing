import { ButtonLink } from "@/components/Button";
import { List } from "@/components/List";
import { Section } from "@/components/Section";
import { Metadata } from "next";
//import { getServerSession } from "next-auth";
//import { authOptions } from "../api/auth/authOptions";
import { getRecipes } from "./queries";
//import { removeRecipe } from "./actions";
//import { TrashIcon } from "@heroicons/react/24/solid";
//import Link from "next/link";
import { RecipeListItem } from "./_components/RecipeListItem/RecipeListItem";
export const metadata: Metadata = {
  title: "LNK Recipes",
};

export default async function RecipesIndex() {
  const recipes = await getRecipes();
  return (
    <Section
      header="RecipesIndex"
      actions={<ButtonLink href="/recipes/new">New</ButtonLink>}
    >
      <List>
        {recipes.map((recipe) => (
          <RecipeListItem key={recipe.id} recipe={recipe} />
        ))}
      </List>
    </Section>
  );
}
