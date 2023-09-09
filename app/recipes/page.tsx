import { ButtonLink, List, ListItemButton } from "@/components";
import { prisma } from "@/lib/client";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
export const metadata: Metadata = {
  title: "LNK Recipes",
};
export default async function RecipesIndex() {
  const session = await getServerSession(authOptions);
  console.log(session);
  const recipes = await prisma.recipe.findMany();
  return (
    <div>
      <ButtonLink href="/recipes/new">New</ButtonLink>
      <List>
        {recipes.map((recipe) => (
          <ListItemButton key={recipe.id} href={`/recipes/${recipe.id}`}>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="px-2.5 py-2.5 rounded-full border w-16 text-center bg-slate-200 text-black group-hover:text-white group-hover:bg-gray-300 text-sm font-medium">
                  {recipe.authorId}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="group-hover:text-slate-400"> {recipe.name}</p>
                <p className="group-hover:text-slate-400">
                  {recipe.styleIdentifer}
                </p>
              </div>
            </div>
          </ListItemButton>
        ))}
      </List>
    </div>
  );
}
