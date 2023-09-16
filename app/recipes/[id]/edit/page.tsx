import { prisma } from "@/lib/client";
import {
  FermentableIngredientModal,
  HopIngredientModal,
  RecipeForm,
} from "../../_components";
type RecipeEditorProps = {
  params: {
    id: string;
  };
  searchParams: Record<string, string> | null;
};

export function generateMetadata({ params }: RecipeEditorProps) {
  return {
    title: `LNK Recipe: ${params.id}`,
  };
}

export default async function RecipeEditor({
  params: { id },
  searchParams,
}: RecipeEditorProps) {
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
