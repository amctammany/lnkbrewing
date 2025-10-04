import MashProfileEditor from "@/app/(profiles)/mash/_components/MashProfileEditor/MashProfileEditor";
import { createMashProfile } from "@/app/(profiles)/mash/actions";

import { AdjustedMashProfileType, MashProfileType } from "@/types/Profile";
import { verifySession } from "@/lib/verifySession";
import { getPreferences } from "@/app/admin/queries";

export default async function MashProfileCreatorPage() {
  const session = await verifySession("/mash/new");
  const profile = {
    userId: session.user.id,
  } as AdjustedMashProfileType;
  const preferences = await getPreferences();

  return (
    <MashProfileEditor
      preferences={preferences}
      action={createMashProfile}
      profile={profile}
    />
  );
}
