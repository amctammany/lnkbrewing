import { ButtonLink, Section } from "@/components";
import { prisma } from "@/lib/client";
import { OtherIngredient } from "@prisma/client";
import Link from "next/link";
type OtherIngredientDisplayProps = {
  params: {
    slug: string;
  };
};
const fieldNames: (keyof OtherIngredient)[] = ["name", "description"];
const numberFieldNames: (keyof OtherIngredient)[] = [];

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
