import { ButtonLink } from "@/components/Button/Button";
import { Section } from "@/components/Section/Section";
import { prisma } from "@/lib/client";
import { EquipmentProfile } from "@prisma/client";
import Link from "next/link";
type EquipmentProfileDisplayProps = {
  params: {
    slug: string;
  };
};
const fieldNames: (keyof EquipmentProfile)[] = ["name", "description"];
const numberFieldNames: (keyof EquipmentProfile)[] = [
  "batchVolume",
  "boilTime",
  "boilOffRate",
  "trubLoss",
  "fermenterLoss",
  "mashLoss",
  "mashEfficiency",
  "brewEfficiency",
];

export function generateMetadata({ params }: EquipmentProfileDisplayProps) {
  return {
    title: `LNK EquipmentProfile: ${params.slug}`,
  };
}

export default async function EquipmentProfileDisplay({
  params: { slug },
}: EquipmentProfileDisplayProps) {
  const equipmentProfile = await prisma.equipmentProfile.findFirst({
    where: {
      slug,
    },
  });
  return (
    <Section
      header={`EquipmentProfile: ${equipmentProfile?.name}`}
      actions={
        <ButtonLink href={`/profiles/equipment/${equipmentProfile?.slug}/edit`}>
          Edit
        </ButtonLink>
      }
    >
      {fieldNames.map((field) => (
        <div key={field} className="m-2 p-2">
          <h2 key={field} className="text-lg uppercase underline">
            {field}
          </h2>
          <p className="px-2 m-2">{equipmentProfile?.[field]}</p>
        </div>
      ))}

      <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-4">
        {numberFieldNames.map((field) => (
          <div key={field} className="m-2 p-2 bg-white shadow-sm drop-shadow">
            <h2 key={field} className="text-lg uppercase underline">
              {field}
            </h2>
            <p className="px-2 m-2">{equipmentProfile?.[field]}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
