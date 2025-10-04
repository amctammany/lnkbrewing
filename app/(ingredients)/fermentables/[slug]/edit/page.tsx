import React from "react";
import {
  getFermentable,
  getFermentables,
} from "@/app/(ingredients)/fermentables/queries";
import { notFound } from "next/navigation";

import { updateFermentable } from "@/app/(ingredients)/fermentables/actions";
import FermentableEditor from "../../_components/FermentableEditor/FermentableEditor";
import { authorizeResource } from "@/lib/authorizeResource";
import { getPreferences } from "@/app/admin/queries";
import { adjustUnits } from "@/lib/Converter/adjustUnits";
import { FermentableMask } from "@/lib/Converter/Masks";
import { AdjustedFermentable, FermentableType } from "@/types/Ingredient";
export async function generateStaticParams() {
  return (await getFermentables()).map(({ slug }) => ({ slug }));
}

export default async function FermentableEditorPage({ params }: any) {
  const { slug } = await params;
  const fermentable = await authorizeResource(
    `/fermentables/${slug}/edit`,
    getFermentable,
    slug
  );
  const prefs = await getPreferences();
  const adjusted = adjustUnits({
    src: fermentable,
    mask: FermentableMask,
    prefs,
    inline: true,
  }) as FermentableType;
  if (!fermentable) return notFound();
  return (
    <FermentableEditor
      preferences={prefs}
      fermentable={adjusted}
      action={updateFermentable.bind(null, prefs)}
    />
  );
}
