import { prisma } from "@/lib/client";
import { HopForm } from "../../_components/HopForm";
import { updateHop } from "../../actions";
type HopDisplayProps = {
  params: {
    slug: string;
  };
};

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
  console.log(hop);
  return <HopForm src={hop} action={updateHop} />;
}
