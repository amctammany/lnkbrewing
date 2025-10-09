import { TopBar } from "@/components/TopBar/TopBar";
import React from "react";
import { getYeast, getYeasts } from "@/app/(ingredients)/yeasts/queries";
import { YeastDisplay } from "@/app/(ingredients)/yeasts/_components/YeastDisplay/YeastDisplay";
import { notFound } from "next/navigation";
import { Pencil } from "lucide-react";
import IconButton from "@/components/Button/IconButton";
export async function generateStaticParams() {
  return (await getYeasts()).map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const yeast = await getYeast(slug);
  return {
    title: `LNK - Yeasts - ${yeast.name}`,
    description: yeast.manufacturer,
  };
}

export default async function YeastDisplayPage({ params }: any) {
  const { slug } = await params;
  const yeast = await getYeast(slug);
  if (!yeast) return notFound();
  return (
    <div>
      <TopBar
        breadcrumbs={[
          { title: "Ingredients" },
          { title: "Yeasts", url: "/yeasts" },
          { title: yeast.name, url: `/yeasts/${yeast.slug}` },
        ]}
      >
        <IconButton
          icon={Pencil}
          variant="outline"
          href={`/yeasts/${yeast.slug}/edit`}
        >
          Edit
        </IconButton>
      </TopBar>
      <div>
        <YeastDisplay src={yeast} />
      </div>
    </div>
  );
}
