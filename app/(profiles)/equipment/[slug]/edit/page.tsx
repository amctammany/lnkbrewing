import EquipmentProfileEditor from "@/app/(profiles)/equipment/_components/EquipmentProfileEditor/EquipmentProfileEditor";
import { getEquipmentProfile } from "@/app/(profiles)/equipment/queries";
import { updateEquipmentProfile } from "@/app/(profiles)/equipment/actions";

import { authorizeResource } from "@/lib/authorizeResource";
import { getPreferences } from "@/app/admin/queries";

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
  return (
    <EquipmentProfileEditor
      preferences={preferences}
      action={updateEquipmentProfile}
      profile={profile}
    />
  );
}
