import { Section } from "@/components/Section";
import { ButtonLink } from "@/components/Button";
import { Fermentable } from "@prisma/client";
import { getFermentable } from "../queries";
type FermentableDisplayProps = {
  params: {
    slug: string;
  };
};
const fieldNames: (keyof Fermentable)[] = ["description", "notes", "country"];
const numberFieldNames: (keyof Fermentable)[] = [
  "power",
  "maxUsage",
  "color",
  "potential",
];

export function generateMetadata({ params }: FermentableDisplayProps) {
  return {
    title: `LNK Fermentable: ${params.slug}`,
  };
}

export default async function FermentableDisplay({
  params: { slug },
}: FermentableDisplayProps) {
  const fermentable = await getFermentable(slug);
  return (
    <Section
      header={`Fermentable: ${fermentable?.name}`}
      actions={
        <ButtonLink
          href={`/ingredients/fermentables/${fermentable?.slug}/edit`}
        >
          Edit
        </ButtonLink>
      }
    >
      {fieldNames.map((field) => (
        <div key={field} className="m-2 p-2">
          <h2 key={field} className="text-lg uppercase underline">
            {field}
          </h2>
          <p className="px-2 m-2">{fermentable?.[field]}</p>
        </div>
      ))}

      <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-4">
        {numberFieldNames.map((field) => (
          <div key={field} className="m-2 p-2 bg-white shadow-sm drop-shadow">
            <h2 key={field} className="text-lg uppercase underline">
              {field}
            </h2>
            <p className="px-2 m-2">{fermentable?.[field]}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
