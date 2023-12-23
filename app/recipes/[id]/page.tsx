import { prisma } from "@/lib/client";
import { RecipeDisplay } from "../_components";
import { getExtendedRecipe } from "../queries";
type RecipeDisplayProps = {
  params: {
    id: number;
  };
};

export function generateMetadata({ params }: RecipeDisplayProps) {
  return {
    title: `LNK Recipe: ${params.id}`,
  };
}

export default async function RecipeDisplayPage({
  params: { id },
}: RecipeDisplayProps) {
  const recipe = await getExtendedRecipe({ id });
  return <RecipeDisplay recipe={recipe} />;
}
