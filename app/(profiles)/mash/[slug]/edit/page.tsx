import MashProfileEditor from "@/app/(profiles)/mash/_components/MashProfileEditor/MashProfileEditor";
import { getMashProfile } from "@/app/(profiles)/mash/queries";
import { updateMashProfile } from "@/app/(profiles)/mash/actions";

import { authorizeResource } from "@/lib/authorizeResource";
import { getPreferences } from "@/app/admin/queries";
import { UserPreferencesContext } from "@/contexts/UserPreferencesContext";
import { MashProfileMask } from "@/lib/Converter/Masks";
import { AdjustedMashProfileType } from "@/types/Profile";
import { adjustUnits } from "@/lib/Converter/adjustUnits";

export default async function MashProfileEditorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const profile = await authorizeResource(
    `/mash/${slug}/edit`,
    getMashProfile,
    slug
  );
  const prefs = await getPreferences();
  const adjusted = adjustUnits({
    src: profile,
    mask: MashProfileMask,
    prefs,
    inline: true,
  }) as AdjustedMashProfileType;
  return (
    <MashProfileEditor
      action={updateMashProfile.bind(null, prefs)}
      profile={adjusted}
      preferences={prefs}
    />
  );
}
