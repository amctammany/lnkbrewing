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
import { HopIngredientSection } from "../../_components/RecipeEditor/HopIngredientSection";
import { FermentableIngredientSection } from "../../_components/RecipeEditor/FermentableIngredientSection";
import { YeastIngredientSection } from "../../_components/RecipeEditor/YeastIngredientSection/YeastIngredientSection";
import { OtherIngredientSection } from "../../_components/RecipeEditor/OtherIngredientSection/OtherIngredientSection";
import { GeneralSection } from "../../_components/RecipeEditor/GeneralSection/GeneralSection";
import { WaterProfileSection } from "../../_components/RecipeEditor/WaterProfileSection/WaterProfileSection";
import { StyleSection } from "../../_components/RecipeEditor/StyleSection/StyleSection";
import { MashSection } from "../../_components/RecipeEditor/MashSection/MashSection";
import { EquipmentSection } from "../../_components/RecipeEditor/EquipmentSection/EquipmentSection";
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
  return (
    <RecipeEditor recipe={recipe} recipeId={id}>
      <GeneralSection
        recipeId={id}
        massUnit={session.preferences.hopMassUnit}
      />
      <EquipmentSection
        recipeId={id}
        massUnit={session.preferences.hopMassUnit}
      />
      <StyleSection recipeId={id} massUnit={session.preferences.hopMassUnit} />
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
      <MashSection recipeId={id} massUnit={session.preferences.hopMassUnit} />
      <WaterProfileSection
        recipeId={id}
        massUnit={session.preferences.hopMassUnit}
      />
    </RecipeEditor>
  );
}
