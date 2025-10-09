import { TopBar } from "@/components/TopBar/TopBar";
import React from "react";
import {
  getFermentable,
  getFermentables,
} from "@/app/(ingredients)/fermentables/queries";
import { FermentableDisplay } from "@/app/(ingredients)/fermentables/_components/FermentableDisplay/FermentableDisplay";
import { notFound } from "next/navigation";
import IconButton from "@/components/Button/IconButton";
import { Pencil } from "lucide-react";
import { getPreferences } from "@/app/admin/queries";
import { adjustUnits } from "@/lib/Converter/adjustUnits";
import { FermentableMask } from "@/lib/Converter/Masks";
import { AdjustedFermentableType, FermentableType } from "@/types/Ingredient";
interface FermentableDisplayPageProps {
  params: Promise<{ slug: string }>;
}
export async function generateStaticParams() {
  return (await getFermentables()).map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: FermentableDisplayPageProps) {
  const { slug } = await params;
  const fermentable = await getFermentable(slug);
  return {
    title: `LNK - Fermentables - ${fermentable.name}`,
    description: fermentable.manufacturer,
  };
}
export default async function FermentableDisplayPage({
  params,
}: FermentableDisplayPageProps) {
  const { slug } = await params;
  const fermentable = await getFermentable(slug);

  if (!fermentable) return notFound();
  const prefs = await getPreferences();
  const adjusted = adjustUnits({
    src: fermentable,
    mask: FermentableMask,
    prefs,
  }) as AdjustedFermentableType;
  return (
    <div>
      <TopBar
        breadcrumbs={[
          { title: "Ingredients" },
          { title: "Fermentables", url: "/fermentables" },
          { title: fermentable.name, url: `/fermentables/${fermentable.slug}` },
        ]}
      >
        <IconButton href={`/fermentables/${slug}/edit`} icon={Pencil}>
          Edit
        </IconButton>
      </TopBar>
      <div>
        <FermentableDisplay src={adjusted} />
      </div>
    </div>
  );
}
