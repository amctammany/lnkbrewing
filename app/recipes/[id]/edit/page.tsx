import { prisma } from "@/lib/client";
import {
  FermentableIngredientModal,
  HopIngredientModal,
  RecipeForm,
} from "../../_components";
import { ClickAwayRouter } from "@/components/";
type RecipeEditorPageProps = {
  params: {
    id: string;
  };
  searchParams: Record<string, string> | null;
};

export function generateMetadata({ params }: RecipeEditorPageProps) {
  return {
    title: `LNK Recipe: ${params.id}`,
  };
}

export default async function RecipeEditorPage({
  params: { id },
  searchParams,
}: RecipeEditorPageProps) {
  const recipe = await prisma.recipe.findFirst({
    include: { author: true, hops: true, fermentables: true, style: true },
    where: {
      id: parseInt(id),
    },
  });
  return (
    <>
      <ClickAwayRouter url={`/recipes/${id}/edit`}>
        <HopIngredientModal
          recipeId={parseInt(id)}
          hopId={searchParams?.hopId}
        />
      </ClickAwayRouter>
      <ClickAwayRouter url={`/recipes/${id}/edit`}>
        <FermentableIngredientModal
          recipeId={parseInt(id)}
          fermentableId={searchParams?.fermentableId}
        />
      </ClickAwayRouter>
      <RecipeForm src={recipe} />
    </>
  );
}
