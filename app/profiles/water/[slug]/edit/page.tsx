import { WaterProfileForm } from "@/app/profiles/water/_components/WaterProfileForm";
import { getWaterProfile } from "../../queries";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
type WaterProfileEditorProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: WaterProfileEditorProps) {
  return {
    title: `LNK WaterProfile: ${params.slug}`,
  };
}

export default async function WaterProfileEditor({
  params: { slug },
}: WaterProfileEditorProps) {
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin");
  const waterProfile = await getWaterProfile(slug);
  return <WaterProfileForm src={waterProfile} />;
}
