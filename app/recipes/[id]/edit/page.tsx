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
import { RecEditor } from "../../_components/RecEditor/RecEditor";
import { getExtendedRecipe } from "../../queries";
import { authOptions } from "@/app/api/auth/authOptions";
import { redirect } from "next/navigation";
import { getHops } from "@/app/ingredients/hops/queries";
import { HopIngredientSection } from "../../_components/RecEditor/HopIngredientSection";
import { FermentableIngredientSection } from "../../_components/RecEditor/FermentableIngredientSection";
import { YeastIngredientSection } from "../../_components/RecEditor/YeastIngredientSection/YeastIngredientSection";
import { OtherIngredientSection } from "../../_components/RecEditor/OtherIngredientSection/OtherIngredientSection";
import { GeneralSection } from "../../_components/RecEditor/GeneralSection/GeneralSection";
import { WaterProfileSection } from "../../_components/RecEditor/WaterProfileSection/WaterProfileSection";
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
  params: { id: _id },
  searchParams,
}: RecipeEditorPageProps) {
  const id = parseInt(_id);
  const recipe = await getExtendedRecipe(id);
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  if (recipe?.authorEmail !== session?.user.email) {
    console.error("Unauthorized User");
    redirect(`/recipes/${recipe?.id}`);
  }
  //const hops = await getHops();
  return (
    <RecEditor
      //preferences={session?.preferences}
      //hops={hops}
      recipe={recipe}
      recipeId={id}
      //searchParams={searchParams}
    >
      <GeneralSection
        recipeId={id}
        massUnit={session.preferences.hopMassUnit}
      />
      <HopIngredientSection
        recipeId={id}
        massUnit={session.preferences.hopMassUnit}
      />
      <FermentableIngredientSection
        recipeId={id}
        massUnit={session.preferences.hopMassUnit}
      />
      <YeastIngredientSection
        recipeId={id}
        massUnit={session.preferences.hopMassUnit}
      />
      <OtherIngredientSection
        recipeId={id}
        massUnit={session.preferences.hopMassUnit}
      />
      <WaterProfileSection
        recipeId={id}
        massUnit={session.preferences.hopMassUnit}
      />
    </RecEditor>
  );
}
