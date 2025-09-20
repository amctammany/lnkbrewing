import { TopBar } from "@/components/TopBar/TopBar";
import React from "react";
import { getOtherIngredient } from "@/app/(ingredients)/other/queries";
import { OtherIngredientDisplay } from "@/app/(ingredients)/other/_components/OtherDisplay/OtherDisplay";
import { notFound } from "next/navigation";
import OtherIngredientEditor from "@/app/(ingredients)/other/_components/OtherEditor/OtherEditor";
import { createOtherIngredient } from "../actions";
import { Save } from "lucide-react";
import IconButton from "@/components/Button/IconButton";

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
        <IconButton icon={Save} type="submit">
          Save
        </IconButton>
      </TopBar>
      <div>
        <OtherIngredientEditor src={other} action={createOtherIngredient} />
      </div>
    </div>
  );
}
