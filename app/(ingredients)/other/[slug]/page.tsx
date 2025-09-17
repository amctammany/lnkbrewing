import { TopBar } from "@/components/TopBar/TopBar";
import React from "react";
import { getOtherIngredient } from "@/app/(ingredients)/other/queries";
import { OtherIngredientDisplay } from "@/app/(ingredients)/other/_components/OtherDisplay/OtherDisplay";
import { notFound } from "next/navigation";

export default async function OtherDisplayPage({ params }: any) {
  const { slug } = await params;
  const other = await getOtherIngredient(slug);
  if (!other) return notFound();
  return (
    <div>
      <TopBar
        breadcrumbs={[
          { title: "Ingredients" },
          { title: "Others", url: "/others" },
          { title: other.name, url: `/others/${other.slug}` },
        ]}
      ></TopBar>
      <div>
        <OtherIngredientDisplay src={other} />
      </div>
    </div>
  );
}
