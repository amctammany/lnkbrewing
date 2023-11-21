import { ButtonLink } from "@/components/Button/Button";
import { Section } from "@/components/Section/Section";
import { prisma } from "@/lib/client";
import { MashProfile } from "@prisma/client";
import Link from "next/link";
type MashProfileDisplayProps = {
  params: {
    slug: string;
  };
};
const fieldNames: (keyof MashProfile)[] = ["name", "description"];
const numberFieldNames: (keyof MashProfile)[] = [];

export function generateMetadata({ params }: MashProfileDisplayProps) {
  return {
    title: `LNK MashProfile: ${params.slug}`,
  };
}

export default async function MashProfileDisplay({
  params: { slug },
}: MashProfileDisplayProps) {
  const mashProfile = await prisma.mashProfile.findFirst({
    where: {
      slug,
    },
  });
  return (
    <Section
      header={`MashProfile: ${mashProfile?.name}`}
      actions={
        <ButtonLink href={`/profiles/mash/${mashProfile?.slug}/edit`}>
          Edit
        </ButtonLink>
      }
    >
      {fieldNames.map((field) => (
        <div key={field} className="m-2 p-2">
          <h2 key={field} className="text-lg uppercase underline">
            {field}
          </h2>
          <p className="px-2 m-2">{mashProfile?.[field]}</p>
        </div>
      ))}

      <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-4">
        {numberFieldNames.map((field) => (
          <div key={field} className="m-2 p-2 bg-white shadow-sm drop-shadow">
            <h2 key={field} className="text-lg uppercase underline">
              {field}
            </h2>
            <p className="px-2 m-2">{mashProfile?.[field]}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
