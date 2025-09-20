import { TopBar } from "@/components/TopBar/TopBar";
import React from "react";
import {
  getFermentable,
  getFermentables,
} from "@/app/(ingredients)/fermentables/queries";
import { FermentableDisplay } from "@/app/(ingredients)/fermentables/_components/FermentableDisplay/FermentableDisplay";
import { notFound } from "next/navigation";
import { LinkButton } from "@/components/Button/LinkButton";
import IconButton from "@/components/Button/IconButton";
import { Pencil } from "lucide-react";
export async function generateStaticParams() {
  return (await getFermentables()).map(({ slug }) => ({ slug }));
}

export default async function FermentableDisplayPage({ params }: any) {
  const { slug } = await params;
  const fermentable = await getFermentable(slug);
  if (!fermentable) return notFound();
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
        <FermentableDisplay src={fermentable} />
      </div>
    </div>
  );
}
