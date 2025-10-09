import { TopBar } from "@/components/TopBar/TopBar";
import React from "react";
import { getYeast, getYeasts } from "@/app/(ingredients)/yeasts/queries";
import { YeastDisplay } from "@/app/(ingredients)/yeasts/_components/YeastDisplay/YeastDisplay";
import { notFound } from "next/navigation";
import { Pencil } from "lucide-react";
import IconButton from "@/components/Button/IconButton";
interface YeastDisplayPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return (await getYeasts()).map(({ slug }) => ({ slug }));
}

export default async function YeastDisplayPage({
  params,
}: YeastDisplayPageProps) {
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
