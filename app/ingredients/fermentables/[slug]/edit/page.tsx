import { prisma } from "@/lib/client";
import { FermentableForm } from "../../_components";
import { updateFermentable } from "../../actions";
import { getFermentable } from "../../queries";
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
  const fermentable = await getFermentable(slug);
  return <FermentableForm src={fermentable} action={updateFermentable} />;
}
