import React from "react";

import { createYeast } from "@/app/(ingredients)/yeasts/actions";
import YeastEditor from "@/app/(ingredients)/yeasts/_components/YeastEditor/YeastEditor";
import { getPreferences } from "@/app/admin/queries";
import { YeastType } from "@/types/Ingredient";
import { verifySession } from "@/lib/verifySession";

export default async function YeastCreatorPage() {
  const session = await verifySession("/yeasts/new");
  const preferences = await getPreferences();
  const adjusted = {
    userId: session?.user?.id,
  } as YeastType;
  return (
    <YeastEditor
      preferences={preferences}
      yeast={adjusted}
      action={createYeast.bind(null, preferences)}
    />
  );
}
