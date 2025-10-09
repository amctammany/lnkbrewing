import WaterProfileEditor from "@/app/(profiles)/water/_components/WaterProfileEditor/WaterProfileEditor";
import { getWaterProfile } from "@/app/(profiles)/water/queries";
import { createWaterProfile } from "@/app/(profiles)/water/actions";

import { notFound } from "next/navigation";
import { BaseWaterProfile } from "@/types/Profile";
import { verifySession } from "@/lib/verifySession";
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const profile = await getWaterProfile(slug);
  return {
    title: `LNK - Water Profile - ${profile.name} Fork`,
    description: profile.description,
  };
}
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
