import { prisma } from "@/lib/client";
import { OtherIngredientForm } from "../../_components";
import { updateOtherIngredient } from "../../actions";
import { getOtherIngredientOptions } from "../../queries";
type OtherIngredientDisplayProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: OtherIngredientDisplayProps) {
  return {
    title: `LNK OtherIngredient: ${params.slug}`,
  };
}

export default async function OtherIngredientDisplay({
  params: { slug },
}: OtherIngredientDisplayProps) {
  const otherIngredient = await prisma.otherIngredient.findFirst({
    where: {
      slug,
    },
  });
  const options = await getOtherIngredientOptions();
  return (
    <div className="m-5 p-0 min-w-full bg-slate-200">
      <OtherIngredientForm
        src={otherIngredient}
        action={updateOtherIngredient}
        options={options}
      />
    </div>
  );
}