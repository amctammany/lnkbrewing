import EquipmentProfileEditor from "@/app/(profiles)/equipment/_components/EquipmentProfileEditor/EquipmentProfileEditor";
import { createEquipmentProfile } from "@/app/(profiles)/equipment/actions";

import { getPreferences } from "@/app/admin/queries";
import { EquipmentProfileType } from "@/types/Profile";
import { verifySession } from "@/lib/verifySession";

export default async function EquipmentProfileCreatorPage() {
  const session = await verifySession("/equipment/new");
  const profile = {
    userId: session.user.id,
  } as EquipmentProfileType;
  const preferences = await getPreferences();
  //  const stripped = stripUnits(adjusted);
  //  console.log(adjusted, stripped);
  return (
    <EquipmentProfileEditor
      preferences={preferences}
      action={createEquipmentProfile.bind(null, preferences)}
      profile={profile}
    />
  );
}
