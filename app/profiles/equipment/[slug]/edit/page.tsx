import { prisma } from "@/lib/client";
import { EquipmentProfileForm } from "@/app/profiles/equipment/_components";
type EquipmentProfileDisplayProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: EquipmentProfileDisplayProps) {
  return {
    title: `LNK EquipmentProfile: ${params.slug}`,
  };
}

export default async function EquipmentProfileDisplay({
  params: { slug },
}: EquipmentProfileDisplayProps) {
  const equipmentProfile = await prisma.equipmentProfile.findFirst({
    where: {
      slug,
    },
  });
  return (
    <div className="m-5 p-0 min-w-full bg-slate-200">
      <EquipmentProfileForm src={equipmentProfile} />
    </div>
  );
}
