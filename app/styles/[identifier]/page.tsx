import {
  Button,
  ButtonLink,
  List,
  ListItemButton,
  Section,
} from "@/components";
import { prisma } from "@/lib/client";
import { Style } from "@prisma/client";
import Link from "next/link";
type StyleDisplayProps = {
  params: {
    identifier: string;
  };
};
const vitalFieldNames: Record<string, (keyof Style)[]> = {
  abv: ["abvLow", "abvHigh", "abvFlex"],
  og: ["ogLow", "ogHigh", "ogFlex"],
  fg: ["fgLow", "fgHigh", "fgFlex"],
  ibu: ["ibuLow", "ibuHigh", "ibuFlex"],
  srm: ["srmLow", "srmHigh", "srmFlex"],
};
const vitalFieldLabels = {
  abv: "%",
};
const fieldNames: (keyof Style)[] = [
  "overall",
  "aroma",
  "appearance",
  "flavor",
  "mouthfeel",
  "history",
  "ingredients",
  "comments",
  "comparison",
  "examples",
];

export function generateMetadata({ params }: StyleDisplayProps) {
  return {
    title: `LNK Style: ${params.identifier}`,
  };
}

export default async function StyleDisplay({
  params: { identifier },
}: StyleDisplayProps) {
  const style = await prisma.style.findFirst({
    where: {
      identifier,
    },
  });
  return (
    <Section
      header={`Style Display: ${style?.identifier} ${style?.name}`}
      actions={
        <ButtonLink href={`/styles/${style?.identifier}/edit`}>Edit</ButtonLink>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          {fieldNames.map((field) => (
            <div key={field} className="m-2 p-2 ">
              <h2 key={field} className="text-lg uppercase underline">
                {field}
              </h2>
              <p className="px-2 m-2">{style?.[field]}</p>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-lg">Vitals</h2>
          {Object.entries(vitalFieldNames).map(([field, [low, high, flex]]) => (
            <div key={field} className="m-2 p-2 ">
              <h2 key={field} className="text-lg uppercase underline">
                {field}
              </h2>
              <p className="px-2 m-2">
                {style?.[low]} - {style?.[high]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
