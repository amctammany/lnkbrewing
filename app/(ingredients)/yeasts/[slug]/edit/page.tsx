import React from "react";
import { getYeast } from "@/app/(ingredients)/yeasts/queries";
import { notFound } from "next/navigation";

import { updateYeast } from "../../actions";
import YeastEditor from "../../_components/YeastEditor/YeastEditor";
import { authorizeResource } from "@/lib/authorizeResource";
import { adjustUnits } from "@/lib/Converter/adjustUnits";
import { getPreferences } from "@/app/admin/queries";
import { YeastType } from "@/types/Ingredient";
import { YeastMask } from "@/lib/Converter/Masks";

export default async function YeastEditorPage({ params }: any) {
  const { slug } = await params;

  const yeast = await authorizeResource(`/yeasts/${slug}/edit`, getYeast, slug);
  const preferences = await getPreferences();
  const adjusted = adjustUnits({
    src: yeast,
    mask: YeastMask,
    prefs: preferences,
    inline: true,
    dir: true,
  }) as YeastType;
  if (!yeast) return notFound();
  return (
    <YeastEditor
      preferences={preferences}
      yeast={adjusted}
      action={updateYeast.bind(null, preferences)}
    />
  );
}
