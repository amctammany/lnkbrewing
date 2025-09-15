import WaterProfileEditor from "@/app/profiles/water/_components/WaterProfileEditor/WaterProfileEditor";
import { getWaterProfile } from "@/app/profiles/water/queries";
import {
  createWaterProfile,
  updateWaterProfile,
} from "@/app/profiles/water/actions";

import { notFound } from "next/navigation";
import { TopBar } from "@/components/TopBar/TopBar";
import { Button } from "@/components/ui/button";
import {
  WaterProfileForm,
  WaterProfileFormContainer,
} from "../../_components/WaterProfileEditor/WaterProfileForm";

export default async function WaterProfileEditorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = await getWaterProfile(slug);
  const action = slug ? updateWaterProfile : createWaterProfile;
  if (!profile) notFound();
  return <WaterProfileEditor action={action} profile={profile} />;
}
