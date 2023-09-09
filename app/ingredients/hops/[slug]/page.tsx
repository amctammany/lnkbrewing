import { ButtonLink, List, ListItemButton, Section } from "@/components";
import { prisma } from "@/lib/client";
import { Hop } from "@prisma/client";
import Link from "next/link";
type HopDisplayProps = {
  params: {
    slug: string;
  };
};
const fieldNames: (keyof Hop)[] = ["description", "country"];

export function generateMetadata({ params }: HopDisplayProps) {
  return {
    title: `LNK Hop: ${params.slug}`,
  };
}

export default async function HopDisplay({
  params: { slug },
}: HopDisplayProps) {
  const hop = await prisma.hop.findFirst({
    where: {
      slug,
    },
  });
  return (
    <Section
      header={`Hop: ${hop?.name}`}
      actions={
        <ButtonLink href={`/ingredients/hops/${hop?.slug}/edit`}>
          Edit
        </ButtonLink>
      }
    >
      <div>
        {fieldNames.map((field) => (
          <div key={field} className="m-2 p-2 ">
            <h2 key={field} className="text-lg uppercase underline">
              {field}
            </h2>
            <p className="px-2 m-2">{hop?.[field]}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
