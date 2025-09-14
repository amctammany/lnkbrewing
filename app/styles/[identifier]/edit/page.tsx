import { getStyle } from "@/app/styles/queries";
import { notFound } from "next/navigation";
import { StyleEditorPage } from "@/app/styles/_components/StyleEditor/StyleEditorPage";
import { updateStyle } from "../../actions";
interface StyleEditorPageProps {
  params: Promise<{
    identifier: string;
  }>;
}
export async function generateMetadata({ params }: StyleEditorPageProps) {
  const { identifier } = await params;
  return {
    title: `LNK Style: ${identifier}`,
  };
}

export default async function Page({ params }: StyleEditorPageProps) {
  const { identifier } = await params;
  const style = await getStyle(identifier);
  if (!style) return notFound();
  return <StyleEditorPage style={style} action={updateStyle} />;
}
