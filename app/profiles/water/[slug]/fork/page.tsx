import WaterProfileEditor from "@/app/profiles/water/_components/WaterProfileEditor/WaterProfileEditor";
import { getWaterProfile } from "@/app/profiles/water/queries";
import {
  createWaterProfile,
  updateWaterProfile,
} from "@/app/profiles/water/actions";

import { authorizeResource } from "@/lib/authorizeResource";
import { notFound } from "next/navigation";
import { BaseWaterProfile } from "@/types/Profile";
import { verifySession } from "@/lib/verifySession";
import { WaterProfile } from "@prisma/client";

export default async function WaterProfileForkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await verifySession(`/profiles/water/${slug}/fork`);

  const profile = (await getWaterProfile(slug)) as BaseWaterProfile;

  if (!profile) return notFound();
  const fork: any = {
    ...profile,
    id: null,
    name: `${session.user.name}-${profile.name}`,
    forkedFrom: profile.id,
    origin: profile,
    userId: session.user.id,
  };
  return <WaterProfileEditor action={createWaterProfile} profile={fork} />;
}
