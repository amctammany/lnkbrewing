import { prisma } from "@/lib/client";
import { RecipeForm } from "../../_components";
import { updateRecipe } from "../../actions";
type RecipeDisplayProps = {
  params: {
    id: string;
  };
};

export function generateMetadata({ params }: RecipeDisplayProps) {
  return {
    title: `LNK Recipe: ${params.id}`,
  };
}

export default async function RecipeDisplay({
  params: { id },
}: RecipeDisplayProps) {
  const recipe = await prisma.recipe.findFirst({
    where: {
      id: parseInt(id),
    },
  });
  return (
    <div className="m-5 p-0 min-w-full bg-slate-200">
      <RecipeForm src={recipe} action={updateRecipe} />
    </div>
  );
}
