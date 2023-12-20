//import { prisma } from "@/lib/client";
//import {
//FermentableIngredientModal,
//HopIngredientModal,
//RecipeForm,
//} from "../../_components";
////import { ClickAwayRouter } from "@/components/";
////import { EquipmentProfileForm } from "@/app/profiles/_components";
//import { EquipmentProfileModal } from "../../_components/RecipeForm/EquipmentProfileModal";
import { getExtendedRecipe } from "../../queries";
import { redirect } from "next/navigation";
import { Editor } from "./Editor";
import { auth } from "@/app/auth";
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
  const session = await auth();
  //if (!session) {
  //redirect("/api/auth/signin");
  //}
  if (recipe?.authorEmail !== session?.user.email) {
    //console.error("Unauthorized User");
    redirect(`/recipes/${recipe?.id}`);
  }
  return <Editor recipe={recipe} id={id} session={session!} />;
}
