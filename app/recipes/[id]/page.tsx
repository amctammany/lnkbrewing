import { prisma } from "@/lib/client";
import { RecipeDisplay } from "../_components";
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

export default async function RecipeDisplayPage({
  params: { id },
}: RecipeDisplayProps) {
  const recipe = await prisma.recipe.findFirst({
    include: {
      author: true,
      hops: { include: { hop: { select: { name: true, id: true } } } },
      fermentables: {
        include: { fermentable: { select: { name: true, id: true } } },
      },
    },
    where: {
      id: parseInt(id),
    },
  });
  return <RecipeDisplay recipe={recipe} />;
}
