import WaterProfileEditor from "@/app/profiles/water/_components/WaterProfileEditor/WaterProfileEditor";
import { getWaterProfile } from "@/app/profiles/water/queries";
import { updateWaterProfile } from "@/app/profiles/water/actions";

import { authorizeResource } from "@/lib/authorizeResource";

export default async function WaterProfileEditorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = await authorizeResource(getWaterProfile, slug);
  return <WaterProfileEditor action={updateWaterProfile} profile={profile} />;
}
