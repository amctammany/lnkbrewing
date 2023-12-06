//import { prisma } from "@/lib/client";
//import {
//FermentableIngredientModal,
//HopIngredientModal,
//RecipeForm,
//} from "../../_components";
////import { ClickAwayRouter } from "@/components/";
////import { EquipmentProfileForm } from "@/app/profiles/_components";
//import { EquipmentProfileModal } from "../../_components/RecipeForm/EquipmentProfileModal";
import { getServerSession } from "next-auth";
import { RecipeEditor } from "../../_components/RecipeEditor/RecipeEditor";
import { getExtendedRecipe } from "../../queries";
import { authOptions } from "@/app/api/auth/authOptions";
import { redirect } from "next/navigation";
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
  const session = await getServerSession(authOptions);
  if (recipe?.authorEmail !== session?.user.email) {
    console.error("Unauthorized User");
    redirect(`/recipes/${recipe?.id}`);
  }
  return (
    <RecipeEditor
      preferences={session?.preferences}
      src={recipe}
      recipeId={parseInt(id)}
      searchParams={searchParams}
    />
  );
}
