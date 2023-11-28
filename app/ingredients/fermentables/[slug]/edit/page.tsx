import { prisma } from "@/lib/client";
import { FermentableForm } from "../../_components";
import { updateFermentable } from "../../actions";
type FermentableEditorProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: FermentableEditorProps) {
  return {
    title: `LNK Fermentable: ${params.slug}`,
  };
}

export default async function FermentableEditor({
  params: { slug },
}: FermentableEditorProps) {
  const fermentable = await prisma.fermentable.findFirst({
    where: {
      slug,
    },
  });
  return <FermentableForm src={fermentable} action={updateFermentable} />;
}
