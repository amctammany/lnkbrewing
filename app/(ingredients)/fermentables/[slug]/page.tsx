import { TopBar } from "@/components/TopBar/TopBar";
import React from "react";
import { getFermentable } from "@/app/(ingredients)/fermentables/queries";
import { FermentableDisplay } from "@/app/(ingredients)/fermentables/_components/FermentableDisplay/FermentableDisplay";
import { notFound } from "next/navigation";

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
      ></TopBar>
      <div>
        <FermentableDisplay src={fermentable} />
      </div>
    </div>
  );
}
