import EquipmentProfileEditor from "@/app/(profiles)/equipment/_components/EquipmentProfileEditor/EquipmentProfileEditor";
import { getEquipmentProfile } from "@/app/(profiles)/equipment/queries";
import {
  createEquipmentProfile,
  updateEquipmentProfile,
} from "@/app/(profiles)/equipment/actions";

import { authorizeResource } from "@/lib/authorizeResource";
import { notFound } from "next/navigation";
import { BaseEquipmentProfile } from "@/types/Profile";
import { verifySession } from "@/lib/verifySession";
import { EquipmentProfile } from "@prisma/client";

export default async function EquipmentProfileForkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await verifySession(`/equipment/${slug}/fork`);

  const profile = (await getEquipmentProfile(slug)) as BaseEquipmentProfile;

  if (!profile) return notFound();
  const fork: any = {
    ...profile,
    id: null,
    name: `${session.user.name}-${profile.name}`,
    forkedFrom: profile.id,
    origin: profile,
    userId: session.user.id,
  };
  return (
    <EquipmentProfileEditor action={createEquipmentProfile} profile={fork} />
  );
}
