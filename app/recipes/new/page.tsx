import { prisma } from "@/lib/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import { redirect } from "next/navigation";
import { updateRecipeVitals } from "../actions";
type RecipeCreatorProps = {};

//export function generateMetadata({ params }: RecipeCreatorProps) {
//return {
//title: `LNK Recipe: ${params.id}`,
//};
//}

export default async function RecipeCreator({}: RecipeCreatorProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/api/auth/signin");
  const recipe = await prisma.recipe.create({
    data: {
      authorEmail: session.user.email,
      mashProfileId: session.preferences.mashProfileId,
      equipmentProfileId: session.preferences.equipmentProfileId,
      waterProfileId: session.preferences.sourceWaterProfileId,

      name: "New Recipe",
      slug: "new-recipe",
    },
  });
  const r = await updateRecipeVitals(recipe.id);
  return redirect(`/recipes/${recipe.id}/edit`);
}
