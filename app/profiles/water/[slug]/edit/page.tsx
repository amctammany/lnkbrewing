import { WaterProfileForm } from "@/app/profiles/water/_components/WaterProfileForm";
import { getWaterProfile } from "../../queries";
import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";
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
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/api/auth/signin");
  const waterProfile = await getWaterProfile(slug);
  console.log(waterProfile);
  return (
    <div className="m-5 p-0 min-w-full bg-slate-200">
      <WaterProfileForm src={waterProfile} />
    </div>
  );
}
