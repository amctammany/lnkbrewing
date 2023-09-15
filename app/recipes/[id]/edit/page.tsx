import { prisma } from "@/lib/client";
import { RecipeForm } from "../../_components";
import { updateRecipe } from "../../actions";
import {
  Form,
  Section,
  TextField,
  TextArea,
  Select,
  Submit,
} from "@/components";
import { RecipeFermentableIngredients } from "../../_components/RecipeForm/RecipeFermentableIngredients";
import { RecipeHopIngredients } from "../../_components/RecipeForm/RecipeHopIngredients";
import { HopIngredients } from "./HopIngredients";
type RecipeDisplayProps = {
  params: {
    id: string;
  };
  searchParams: Record<string, string> | null;
};

export function generateMetadata({ params }: RecipeDisplayProps) {
  return {
    title: `LNK Recipe: ${params.id}`,
  };
}

export default async function RecipeDisplay({
  params: { id },
  searchParams,
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

  const src = recipe;
  return (
    <Form action={updateRecipe}>
      <input type="hidden" name="id" value={src?.id} />
      <input type="hidden" name="authorEmail" value={src?.authorEmail} />
      <Section header="General">
        <TextField name="name" label="Name" defaultValue={src?.name} />
        <TextArea
          name="description"
          label="description"
          defaultValue={src?.description}
        />
      </Section>
      <Section header="Style">
        <Select
          label="Style"
          name="styleIdentifer"
          options={styles}
          defaultValue={src?.styleIdentifer || "1A"}
        />
      </Section>
      <HopIngredients recipeId={src?.id} hopId={searchParams?.hopId} />
      <Submit>{(src?.id ? "Update" : "Create") + " Recipe"}</Submit>
    </Form>
  );
}
