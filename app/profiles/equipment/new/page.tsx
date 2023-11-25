import { prisma } from "@/lib/client";
import { EquipmentProfileForm } from "@/app/profiles/equipment/_components";
import { EquipmentProfile } from "@prisma/client";
import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
type EquipmentProfileCreatorProps = {};

export function generateMetadata({}: EquipmentProfileCreatorProps) {
  return {
    title: `LNK EquipmentProfile: New`,
  };
}

export default async function EquipmentProfileCreator({}: EquipmentProfileCreatorProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/api/auth/signin");

  const equipmentProfile = {} as EquipmentProfile;
  return (
    <div className="m-5 p-0 min-w-full bg-slate-200">
      <EquipmentProfileForm src={equipmentProfile} />
    </div>
  );
}
