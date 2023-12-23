import { RecipeDisplay } from "@/app/recipes/_components";
import { getExtendedRecipe } from "@/app/recipes/queries";
type UserRecipeDisplayProps = {
  params: {
    username: string;
    slug: string;
  };
};

export function generateMetadata({ params }: UserRecipeDisplayProps) {
  return {
    title: `LNK Recipe: ${params.username}/${params.slug}`,
  };
}

export default async function UserRecipeDisplayPage({
  params: { username, slug },
}: UserRecipeDisplayProps) {
  const recipe = await getExtendedRecipe({
    author: { username: { equals: username } },
    slug: { equals: slug },
  });
  return <RecipeDisplay recipe={recipe} />;
}
