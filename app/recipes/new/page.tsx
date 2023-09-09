import { prisma } from "@/lib/client";
import { RecipeForm } from "../_components";
import { updateRecipe } from "../actions";
import { Recipe } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
type RecipeCreatorProps = {};

//export function generateMetadata({ params }: RecipeCreatorProps) {
//return {
//title: `LNK Recipe: ${params.id}`,
//};
//}

export default async function RecipeCreator({}: RecipeCreatorProps) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/api/auth/signin");
  const recipe = { authorEmail: session.user?.email } as Partial<Recipe>;
  const hops = (
    await prisma.hop.findMany({
      select: {
        name: true,
        id: true,
      },
    })
  ).reduce((acc, hop) => {
    acc[hop.id] = hop.name;
    return acc;
  }, {} as Record<string, string>);
  const fermentables = (
    await prisma.fermentable.findMany({
      select: {
        name: true,
        id: true,
      },
    })
  ).reduce((acc, fermentable) => {
    acc[fermentable.id] = fermentable.name;
    return acc;
  }, {} as Record<string, string>);
  const styles = (
    await prisma.style.findMany({
      select: {
        name: true,
        identifier: true,
      },
      orderBy: [
        {
          subcategoryId: "asc",
        },
        {
          identifier: "asc",
        },
      ],
    })
  ).reduce((acc, style) => {
    acc[style.identifier] = `${style.identifier}: ${style.name}`;
    return acc;
  }, {} as Record<string, string>);

  return (
    <RecipeForm
      src={recipe}
      action={updateRecipe}
      hops={hops}
      styles={styles}
      fermentables={fermentables}
    />
  );
}
