import EquipmentProfileEditor from "@/app/(profiles)/equipment/_components/EquipmentProfileEditor/EquipmentProfileEditor";
import { getEquipmentProfile } from "@/app/(profiles)/equipment/queries";
import {
  createEquipmentProfile,
  updateEquipmentProfile,
} from "@/app/(profiles)/equipment/actions";

import { authorizeResource } from "@/lib/authorizeResource";
import { getPreferences } from "@/app/admin/queries";
import { adjustUnits, stripUnits } from "@/lib/Converter/adjustUnits";
import { EquipmentProfileMask } from "@/lib/Converter/Masks";
import {
  AdjustedEquipmentProfileType,
  AdjustedMashProfileType,
  EquipmentProfileType,
} from "@/types/Profile";
import { auth } from "@/auth";
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
