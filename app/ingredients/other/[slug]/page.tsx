import { ButtonLink } from "@/components/Button";
import { Section } from "@/components/Section";
import { OtherIngredient } from "@prisma/client";
import { getOtherIngredient } from "../queries";
type OtherIngredientDisplayProps = {
  params: {
    slug: string;
  };
};
const fieldNames: (keyof OtherIngredient)[] = ["name", "type", "description"];
const numberFieldNames: (keyof OtherIngredient)[] = [];

export function generateMetadata({ params }: OtherIngredientDisplayProps) {
  return {
    title: `LNK OtherIngredient: ${params.slug}`,
  };
}

export default async function OtherIngredientDisplay({
  params: { slug },
}: OtherIngredientDisplayProps) {
  const otherIngredient = await getOtherIngredient(slug);
  return (
    <Section
      header={`OtherIngredient: ${otherIngredient?.name}`}
      actions={
        <ButtonLink href={`/ingredients/other/${otherIngredient?.slug}/edit`}>
          Edit
        </ButtonLink>
      }
    >
      {fieldNames.map((field) => (
        <div key={field} className="m-2 p-2">
          <h2 key={field} className="text-lg uppercase underline">
            {field}
          </h2>
          <p className="px-2 m-2">{otherIngredient?.[field]}</p>
        </div>
      ))}

      <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-4">
        {numberFieldNames.map((field) => (
          <div key={field} className="m-2 p-2 bg-white shadow-sm drop-shadow">
            <h2 key={field} className="text-lg uppercase underline">
              {field}
            </h2>
            <p className="px-2 m-2">{otherIngredient?.[field]}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
