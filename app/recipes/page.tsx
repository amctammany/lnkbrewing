import {
  ButtonLink,
  List,
  ListItem,
  ListItemButton,
  Section,
} from "@/components";
import { prisma } from "@/lib/client";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/authOptions";
import { getRecipes } from "./queries";
import { removeRecipe } from "./actions";
import { TrashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
export const metadata: Metadata = {
  title: "LNK Recipes",
};
type RemoveRecipeButtonProps = {
  id: number;
};
const RemoveRecipeButton = ({ id }: RemoveRecipeButtonProps) => {
  return (
    <form action={removeRecipe}>
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="border-red-300 border rounded-md p-2">
        <TrashIcon className="h-6 w-6 text-red-500 " />
      </button>
    </form>
  );
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
          <ListItem key={recipe.id}>
            <Link href={`/recipes/${recipe.id}`}>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="px-2.5 py-2.5 rounded-full border w-16 text-center bg-slate-200 text-black group-hover:text-white group-hover:bg-gray-300 text-sm font-medium">
                    {recipe.styleIdentifer}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-md group-hover:text-slate-400">
                    {recipe.name}
                  </p>
                  <p className="text-sm group-hover:text-slate-400">
                    {recipe.authorEmail}
                  </p>
                </div>
              </div>
            </Link>
            <div className="m-auto">
              <RemoveRecipeButton id={recipe.id} />
            </div>
          </ListItem>
        ))}
      </List>
    </Section>
  );
}
