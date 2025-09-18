import { TopBar } from "@/components/TopBar/TopBar";
import React from "react";
import { getOtherIngredient } from "@/app/(ingredients)/other/queries";
import { OtherIngredientDisplay } from "@/app/(ingredients)/other/_components/OtherDisplay/OtherDisplay";
import { notFound } from "next/navigation";
import { LinkButton } from "@/components/Button/LinkButton";

export default async function OtherDisplayPage({ params }: any) {
  const { slug } = await params;
  const other = await getOtherIngredient(slug);
  if (!other) return notFound();
  return (
    <div>
      <TopBar
        breadcrumbs={[
          { title: "Ingredients" },
          { title: "Others", url: "/other" },
          { title: other.name, url: `/other/${other.slug}` },
        ]}
      >
        <LinkButton variant="outline" href={`/other/${other.slug}/edit`}>
          Edit
        </LinkButton>
      </TopBar>
      <div>
        <OtherIngredientDisplay src={other} />
      </div>
    </div>
  );
}
