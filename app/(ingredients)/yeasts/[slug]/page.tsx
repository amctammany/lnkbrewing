import { TopBar } from "@/components/TopBar/TopBar";
import React from "react";
import { getYeast, getYeasts } from "@/app/(ingredients)/yeasts/queries";
import { YeastDisplay } from "@/app/(ingredients)/yeasts/_components/YeastDisplay/YeastDisplay";
import { notFound } from "next/navigation";
import { LinkButton } from "@/components/Button/LinkButton";
export async function generateStaticParams() {
  return (await getYeasts()).map(({ slug }) => ({ slug }));
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
        <LinkButton variant="outline" href={`/yeasts/${yeast.slug}/edit`}>
          Edit
        </LinkButton>
      </TopBar>
      <div>
        <YeastDisplay src={yeast} />
      </div>
    </div>
  );
}
