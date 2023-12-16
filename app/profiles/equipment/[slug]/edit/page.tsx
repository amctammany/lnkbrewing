import { prisma } from "@/lib/client";
import { EquipmentProfileForm } from "@/app/profiles/equipment/_components";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
type EquipmentProfileEditorProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: EquipmentProfileEditorProps) {
  return {
    title: `LNK EquipmentProfile: ${params.slug}`,
  };
}

export default async function EquipmentProfileEditor({
  params: { slug },
}: EquipmentProfileEditorProps) {
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin");
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
