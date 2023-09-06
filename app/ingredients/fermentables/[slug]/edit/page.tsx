import { prisma } from "@/lib/client";
import { FermentableForm } from "../../_components";
import { updateFermentable } from "../../actions";
type FermentableDisplayProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: FermentableDisplayProps) {
  return {
    title: `LNK Fermentable: ${params.slug}`,
  };
}

export default async function FermentableDisplay({
  params: { slug },
}: FermentableDisplayProps) {
  const fermentable = await prisma.fermentable.findFirst({
    where: {
      slug,
    },
  });
  return (
    <div className="m-5 p-0 min-w-full bg-slate-200">
      <FermentableForm src={fermentable} action={updateFermentable} />
    </div>
  );
}
