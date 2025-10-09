import React from "react";
import { getHop } from "@/app/(ingredients)/hops/queries";
import { notFound } from "next/navigation";
import HopEditor from "../../_components/HopEditor/HopEditor";
import { updateHop } from "@/app/(ingredients)/hops/actions";
import { adjustUnits } from "@/lib/Converter/adjustUnits";
import { getPreferences } from "@/app/admin/queries";
import { HopType } from "@/types/Ingredient";
import { HopMask } from "@/lib/Converter/Masks";
interface HopEditorPageProps {
  params: Promise<{ slug: string }>;
}
export async function generateMetadata({ params }: HopEditorPageProps) {
  const { slug } = await params;
  const hop = await getHop(slug);
  return {
    title: `LNK - Hops - ${hop.name}`,
    description: hop.description,
  };
}
export default async function HopEditorPage({ params }: HopEditorPageProps) {
  const { slug } = await params;
  const hop = await getHop(slug);
  if (!hop) return notFound();
  const prefs = await getPreferences();
  const adjusted = adjustUnits({
    src: hop,
    mask: HopMask,
    prefs,
    inline: true,
  }) as HopType;
  return (
    <div>
      <HopEditor src={adjusted} action={updateHop} />
    </div>
  );
}
