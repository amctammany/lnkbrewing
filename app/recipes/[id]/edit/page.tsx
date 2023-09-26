import { prisma } from "@/lib/client";
import {
  FermentableIngredientModal,
  HopIngredientModal,
  RecipeForm,
} from "../../_components";
//import { ClickAwayRouter } from "@/components/";
//import { EquipmentProfileForm } from "@/app/profiles/_components";
import { EquipmentProfileModal } from "../../_components/RecipeForm/EquipmentProfileModal";
import { RecipeEditor } from "../../_components/RecipeEditor/RecipeEditor";
import { getExtendedRecipe } from "../../queries";
type RecipeEditorPageProps = {
  params: {
    id: string;
  };
  searchParams?: Record<string, string>;
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
  const recipe = await getExtendedRecipe(parseInt(id));
  return (
    <RecipeEditor
      src={recipe}
      recipeId={parseInt(id)}
      searchParams={searchParams}
    />
  );
}
