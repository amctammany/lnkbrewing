import { ButtonLink } from "@/components/Button/Button";
import { Section } from "@/components/Section/Section";
import { prisma } from "@/lib/client";
import { Hop } from "@prisma/client";
import Link from "next/link";
import { HopDisplay } from "@/app/ingredients/hops/_components/HopDisplay/HopDisplay";
type HopDisplayPageProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: HopDisplayPageProps) {
  return {
    title: `LNK Hop: ${params.slug}`,
  };
}

export default async function HopDisplayPage({
  params: { slug },
}: HopDisplayPageProps) {
  const hop = await prisma.hop.findFirst({
    where: {
      slug,
    },
    include: {
      HopSensoryPanel: true,
    },
  });
  return <HopDisplay hop={hop} />;
}
