import { Section } from "@/components";
import { prisma } from "@/lib/client";
import { Fermentable } from "@prisma/client";
import Link from "next/link";
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
  const fermentable = await prisma.fermentable.findFirst({
    where: {
      slug,
    },
  });
  return (
    <Section
      header={`Fermentable: ${fermentable?.name}`}
      actions={
        <Link
          className="text-2xl flex-shrink px-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
          href={`/ingredients/fermentables/${fermentable?.slug}/edit`}
        >
          Edit
        </Link>
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
