import { getStyle, getStyles } from "../queries";
import { notFound } from "next/navigation";
import { StyleDisplayPage } from "../_components/StyleDisplay/StyleDisplayPage";
interface StylePageProps {
  params: Promise<{
    identifier: string;
  }>;
}
export async function generateStaticParams() {
  return (await getStyles()).map(({ identifier }) => ({ identifier }));
}

export async function generateMetadata({ params }: StylePageProps) {
  const { identifier } = await params;
  return {
    title: `LNK Style: ${identifier}`,
  };
}

export default async function StylePage({ params }: StylePageProps) {
  const { identifier } = await params;
  const style = await getStyle(identifier);
  if (!style) return notFound();
  return <StyleDisplayPage style={style} />;
}
