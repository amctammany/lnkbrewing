import { prisma } from "@/lib/client";
import { HopForm } from "../../_components/HopForm";
import { updateHop } from "../../actions";
import { getHop } from "../../queries";
type HopEditorProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: HopEditorProps) {
  return {
    title: `LNK Hop: ${params.slug}`,
  };
}

export default async function HopEditor({ params: { slug } }: HopEditorProps) {
  const hop = await getHop(slug);
  return <HopForm src={hop} action={updateHop} />;
}
