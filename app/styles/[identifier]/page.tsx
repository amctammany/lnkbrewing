import { ButtonLink } from "@/components/Button";
import { Section } from "@/components/Section";
import { prisma } from "@/lib/client";
import { Style } from "@prisma/client";
import Link from "next/link";
import { StyleDisplay } from "../_components/StyleDisplay";
type StyleDisplayPageProps = {
  params: {
    identifier: string;
  };
};
export function generateMetadata({ params }: StyleDisplayPageProps) {
  return {
    title: `LNK Style: ${params.identifier}`,
  };
}

export default async function StyleDisplayPage({
  params: { identifier },
}: StyleDisplayPageProps) {
  const style = await prisma.style.findFirst({
    where: {
      identifier,
    },
  });
  return <StyleDisplay style={style} />;
}
