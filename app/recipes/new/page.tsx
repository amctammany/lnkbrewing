import { prisma } from "@/lib/client";
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
  if (!session?.user?.email) redirect("/api/auth/signin");
  const recipe = await prisma.recipe.create({
    data: {
      authorEmail: session.user.email,
      name: "New Recipe",
      slug: "new-recipe",
    },
  });
  return redirect(`/recipes/${recipe.id}/edit`);
}
