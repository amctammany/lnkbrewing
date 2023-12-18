import { YeastForm } from "../../_components/YeastForm";
import { updateYeast } from "../../actions";
import { getYeast } from "../../queries";
type YeastEditorProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: YeastEditorProps) {
  return {
    title: `LNK Yeast: ${params.slug}`,
  };
}

export default async function YeastEditor({
  params: { slug },
}: YeastEditorProps) {
  const yeast = await getYeast(slug);
  return <YeastForm src={yeast} action={updateYeast} />;
}
