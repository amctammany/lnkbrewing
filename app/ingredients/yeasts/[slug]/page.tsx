import { ButtonLink } from "@/components/Button/Button";
import { Section } from "@/components/Section/Section";
import { prisma } from "@/lib/client";
import { Yeast } from "@prisma/client";
import Link from "next/link";
type YeastDisplayProps = {
  params: {
    slug: string;
  };
};
const fieldNames: (keyof Yeast)[] = [
  "name",
  "description",
  "manufacturer",
  "type",
  "tolerance",
  "attenuation",
  "flocculation",
  "notes",
  "usage",
];
type RangePropProps = {
  label?: string;
  low?: number | null;
  high?: number | null;
  avg?: number | null;
};
function RangeProp({ label, low, high, avg }: RangePropProps) {
  return (
    <div className="m-2 p-0">
      <h2 className="text-lg uppercase underline">{label}</h2>
      <div className="px-2 m-0 flex items-center gap-4">
        <div className="flex-grow text-md">
          Range: {low} - {high}
        </div>
      </div>
    </div>
  );
}

export function generateMetadata({ params }: YeastDisplayProps) {
  return {
    title: `LNK Yeast: ${params.slug}`,
  };
}

export default async function YeastDisplay({
  params: { slug },
}: YeastDisplayProps) {
  const yeast = await prisma.yeast.findFirst({
    where: {
      slug,
    },
  });
  return (
    <Section
      header={`Yeast: ${yeast?.name}`}
      actions={
        <ButtonLink href={`/ingredients/yeasts/${yeast?.slug}/edit`}>
          Edit
        </ButtonLink>
      }
    >
      <div className="grid grid-auto grid-cols-1 md:grid-cols-2">
        <div className="m-0 p-2 shadow-lg">
          {fieldNames.map((field) => (
            <div key={field} className="m-2 p-0 ">
              <h2 key={field} className="text-lg uppercase underline">
                {field}
              </h2>
              <p className="px-2 m-1">{yeast?.[field]}</p>
            </div>
          ))}
        </div>
        <div className="p-2 shadow-lg">
          <RangeProp
            label="Temperature"
            low={yeast?.tempLow}
            high={yeast?.tempHigh}
          />
        </div>
      </div>
    </Section>
  );
}
