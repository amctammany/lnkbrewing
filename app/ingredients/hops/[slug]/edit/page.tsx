import { prisma } from "@/lib/client";
import { HopForm } from "../../_components";
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
  return (
    <div className="m-5 p-0 bg-slate-200">
      <HopForm src={hop} />
    </div>
  );
}
