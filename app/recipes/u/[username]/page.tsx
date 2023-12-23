import { ButtonLink } from "@/components/Button";
import { List, ListItem } from "@/components/List";
import { Section } from "@/components/Section";
import { Metadata } from "next";
//import { getServerSession } from "next-auth";
//import { authOptions } from "../api/auth/authOptions";
import { getRecipes } from "@/app/recipes/queries";
//import { removeRecipe } from "./actions";
//import { TrashIcon } from "@heroicons/react/24/solid";
//import Link from "next/link";
export const metadata: Metadata = {
  title: "LNK Recipes",
};
type UserRecipesIndexProps = {
  params: {
    username: string;
  };
};

import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
import { Recipe } from "@prisma/client";
import { ExtendedRecipe } from "../../types";
type RecipeListItemProps = {
  recipe?: Partial<ExtendedRecipe>;
};
const RecipeListItem = ({ recipe }: RecipeListItemProps) => (
  <ListItem
    key={recipe?.id}
    href={`/recipes/u/${recipe?.author?.username}/${recipe?.slug}`}
  >
    <ListItemIcon variant="icon">{recipe?.styleIdentifer}</ListItemIcon>
    <ListItemText primary={recipe?.name} secondary={recipe?.authorEmail} />
  </ListItem>
);
export default async function UserRecipesIndex({
  params: { username },
}: UserRecipesIndexProps) {
  const recipes = await getRecipes({
    author: { username: { equals: username } },
  });
  return (
    <Section header="UserRecipesIndex">
      <List>
        {(recipes || []).map((recipe) => (
          <RecipeListItem key={recipe.id} recipe={recipe} />
        ))}
      </List>
    </Section>
  );
}
