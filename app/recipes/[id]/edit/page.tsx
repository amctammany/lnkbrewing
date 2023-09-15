import { prisma } from "@/lib/client";
import {
  FermentableIngredientModal,
  HopIngredientModal,
  RecipeForm,
} from "../../_components";
type RecipeDisplayProps = {
  params: {
    id: string;
  };
  searchParams: Record<string, string> | null;
};

export function generateMetadata({ params }: RecipeDisplayProps) {
  return {
    title: `LNK Recipe: ${params.id}`,
  };
}

export default async function RecipeDisplay({
  params: { id },
  searchParams,
}: RecipeDisplayProps) {
  const recipe = await prisma.recipe.findFirst({
    include: { author: true, hops: true, fermentables: true, style: true },
    where: {
      id: parseInt(id),
    },
  });
  return (
    <>
      <HopIngredientModal recipeId={parseInt(id)} hopId={searchParams?.hopId} />
      <FermentableIngredientModal
        recipeId={parseInt(id)}
        fermentableId={searchParams?.fermentableId}
      />
      <RecipeForm src={recipe} />
    </>
  );
}
