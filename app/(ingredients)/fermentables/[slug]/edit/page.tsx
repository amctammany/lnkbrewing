import React from "react";
import {
  getFermentable,
  getFermentables,
} from "@/app/(ingredients)/fermentables/queries";
import { notFound } from "next/navigation";

import { updateFermentable } from "@/app/(ingredients)/fermentables/actions";
import FermentableEditor from "../../_components/FermentableEditor/FermentableEditor";
export async function generateStaticParams() {
  return (await getFermentables()).map(({ slug }) => ({ slug }));
}

export default async function FermentableEditorPage({ params }: any) {
  const { slug } = await params;
  const fermentable = await getFermentable(slug);
  if (!fermentable) return notFound();
  return (
    <FermentableEditor fermentable={fermentable} action={updateFermentable} />
  );
}
