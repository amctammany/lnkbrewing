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
  return (
    <div className="m-5 p-0 min-w-full bg-slate-200">
      <YeastForm src={yeast} action={updateYeast} />
    </div>
  );
}
