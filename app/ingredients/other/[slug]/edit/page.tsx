import { prisma } from "@/lib/client";
import { OtherIngredientForm } from "../../_components";
import { updateOtherIngredient } from "../../actions";
import { getOtherIngredient, getOtherIngredientOptions } from "../../queries";
type OtherIngredientEditorProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: OtherIngredientEditorProps) {
  return {
    title: `LNK OtherIngredient: ${params.slug}`,
  };
}

export default async function OtherIngredientEditor({
  params: { slug },
}: OtherIngredientEditorProps) {
  const otherIngredient = await getOtherIngredient(slug);
  const options = await getOtherIngredientOptions();
  return (
    <OtherIngredientForm
      src={otherIngredient}
      action={updateOtherIngredient}
      options={options}
    />
  );
}
