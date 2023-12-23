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
import { RecipesList } from "./_components/RecipesList/RecipesList";
export const metadata: Metadata = {
  title: "LNK Recipes",
};

export default async function RecipesIndex() {
  const recipes = await getRecipes();
  return <RecipesList recipes={recipes} />;
}
