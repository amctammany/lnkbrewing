import { TopBar } from "@/components/TopBar/TopBar";
import React from "react";
import { getHop, getHops } from "@/app/(ingredients)/hops/queries";
import { HopDisplay } from "@/app/(ingredients)/hops/_components/HopDisplay/HopDisplay";
import { notFound } from "next/navigation";
import { Pencil } from "lucide-react";
import IconButton from "@/components/Button/IconButton";
import { adjustUnits } from "@/lib/Converter/adjustUnits";
import { getPreferences } from "@/app/admin/queries";
import { AdjustedHopType } from "@/types/Ingredient";
import { HopMask } from "@/lib/Converter/Masks";
export async function generateStaticParams() {
  return (await getHops()).map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const hop = await getHop(slug);
  return {
    title: `LNK - Hops - ${hop.name}`,
    description: hop.description,
  };
}
export default async function HopDisplayPage({ params }: any) {
  const { slug } = await params;
  const hop = await getHop(slug);
  if (!hop) return notFound();
  const prefs = await getPreferences();
  const adjusted = adjustUnits({
    src: hop,
    mask: HopMask,
    prefs,
  }) as AdjustedHopType;
  return (
    <div>
      <TopBar
        breadcrumbs={[
          { title: "Ingredients" },
          { title: "Hops", url: "/hops" },
          { title: hop.name, url: `/hops/${hop.slug}` },
        ]}
      >
        <IconButton
          icon={Pencil}
          variant="outline"
          href={`/hops/${hop.slug}/edit`}
        >
          Edit
        </IconButton>
      </TopBar>
      <div>
        <HopDisplay src={adjusted} />
      </div>
    </div>
  );
}
