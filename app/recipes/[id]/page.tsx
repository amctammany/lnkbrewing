import { List, ListItemButton } from "@/components";
import { prisma } from "@/lib/client";
import { Recipe } from "@prisma/client";
import Link from "next/link";
import { RecipeDisplay } from "../_components";
type RecipeDisplayProps = {
  params: {
    id: string;
  };
};
const fieldNames: (keyof Recipe)[] = ["description"];

export function generateMetadata({ params }: RecipeDisplayProps) {
  return {
    title: `LNK Recipe: ${params.id}`,
  };
}

export default async function RecipeDisplayPage({
  params: { id },
}: RecipeDisplayProps) {
  const recipe = await prisma.recipe.findFirst({
    where: {
      id: parseInt(id),
    },
  });
  return <RecipeDisplay recipe={recipe} />;
}
