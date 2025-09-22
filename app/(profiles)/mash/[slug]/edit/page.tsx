import MashProfileEditor from "@/app/(profiles)/mash/_components/MashProfileEditor/MashProfileEditor";
import { getMashProfile } from "@/app/(profiles)/mash/queries";
import { updateMashProfile } from "@/app/(profiles)/mash/actions";

import { authorizeResource } from "@/lib/authorizeResource";
import { getPreferences } from "@/app/admin/queries";
import { UserPreferencesContext } from "@/contexts/UserPreferencesContext";

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
  console.log(profile);
  const preferences = await getPreferences();
  return (
    <MashProfileEditor
      action={updateMashProfile}
      profile={profile}
      preferences={preferences}
    />
  );
}
