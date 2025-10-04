import EquipmentProfileEditor from "@/app/(profiles)/equipment/_components/EquipmentProfileEditor/EquipmentProfileEditor";
import { getEquipmentProfile } from "@/app/(profiles)/equipment/queries";
import { updateEquipmentProfile } from "@/app/(profiles)/equipment/actions";

import { authorizeResource } from "@/lib/authorizeResource";
import { getPreferences } from "@/app/admin/queries";
import { adjustUnits, stripUnits } from "@/lib/Converter/adjustUnits";
import { EquipmentProfileMask } from "@/lib/Converter/Masks";
import { EquipmentProfileType } from "@/types/Profile";

export default async function EquipmentProfileEditorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const profile = await authorizeResource(
    `/equipment/${slug}/edit`,
    getEquipmentProfile,
    slug
  );
  const preferences = await getPreferences();
  const adjusted = adjustUnits({
    src: profile,
    mask: EquipmentProfileMask,
    prefs: preferences,
    inline: true,
    dir: true,
  }) as EquipmentProfileType;
  //  const stripped = stripUnits(adjusted);
  //  console.log(adjusted, stripped);
  return (
    <EquipmentProfileEditor
      preferences={preferences}
      action={updateEquipmentProfile.bind(null, preferences)}
      profile={adjusted}
    />
  );
}
