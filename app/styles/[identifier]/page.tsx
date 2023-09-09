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
const fieldNames: (keyof Style)[] = [
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
    </Section>
  );
}
