import { prisma } from "@/lib/client";
import {
  FermentableIngredientModal,
  HopIngredientModal,
  RecipeForm,
} from "../../_components";
import { ClickAwayRouter } from "@/components/";
import { EquipmentProfileForm } from "@/app/profiles/_components";
import { EquipmentProfileModal } from "../../_components/RecipeForm/EquipmentModal";
type RecipeEditorPageProps = {
  params: {
    id: string;
  };
  searchParams: Record<string, string> | null;
};

//export const dynamic = "force-dynamic";
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
    include: {
      author: true,
      hops: { include: { hop: true } },
      equipment: true,
      fermentables: { include: { fermentable: true } },
      style: true,
    },
    where: {
      id: parseInt(id),
    },
  });
  return (
    <>
      <EquipmentProfileModal
        recipeId={parseInt(id)}
        open={!!searchParams?.equipment}
      />
      <HopIngredientModal recipeId={parseInt(id)} hopId={searchParams?.hopId} />
      <FermentableIngredientModal
        recipeId={parseInt(id)}
        fermentableId={searchParams?.fermentableId}
      />
      <RecipeForm src={recipe} />
    </>
  );
}
