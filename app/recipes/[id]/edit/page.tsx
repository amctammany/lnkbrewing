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
    include: { author: true, hops: true, fermentables: true, style: true },
    where: {
      id: parseInt(id),
    },
  });
  const hops = (
    await prisma.hop.findMany({
      select: {
        name: true,
        id: true,
      },
    })
  ).reduce((acc, hop) => {
    acc[hop.id] = hop.name;
    return acc;
  }, {} as Record<string, string>);
  const fermentables = (
    await prisma.fermentable.findMany({
      select: {
        name: true,
        id: true,
      },
    })
  ).reduce((acc, fermentable) => {
    acc[fermentable.id] = fermentable.name;
    return acc;
  }, {} as Record<string, string>);
  const styles = (
    await prisma.style.findMany({
      select: {
        name: true,
        identifier: true,
      },
      orderBy: [
        {
          subcategoryId: "asc",
        },
        {
          identifier: "asc",
        },
      ],
    })
  ).reduce((acc, style) => {
    acc[style.identifier] = `${style.identifier}: ${style.name}`;
    return acc;
  }, {} as Record<string, string>);

  return (
    <RecipeForm
      src={recipe}
      action={updateRecipe}
      hops={hops}
      styles={styles}
      fermentables={fermentables}
    />
  );
}