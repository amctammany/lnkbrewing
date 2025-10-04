import React from "react";
import { getOtherIngredient } from "@/app/(ingredients)/other/queries";
import { notFound } from "next/navigation";
import OtherEditor from "../../_components/OtherEditor/OtherEditor";
import { updateOtherIngredient } from "../../actions";

export default async function OtherDisplayPage({ params }: any) {
  const { slug } = await params;
  const other = await getOtherIngredient(slug);
  if (!other) return notFound();
  return (
    <div>
      <OtherEditor src={other} action={updateOtherIngredient} />
    </div>
  );
}
