import { WaterProfileForm } from "@/app/profiles/water/_components/WaterProfileForm";
import { getWaterProfile } from "../../queries";
type WaterProfileDisplayProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: WaterProfileDisplayProps) {
  return {
    title: `LNK WaterProfile: ${params.slug}`,
  };
}

export default async function WaterProfileDisplay({
  params: { slug },
}: WaterProfileDisplayProps) {
  const waterProfile = await getWaterProfile(slug);
  console.log(waterProfile);
  return (
    <div className="m-5 p-0 min-w-full bg-slate-200">
      <WaterProfileForm src={waterProfile} />
    </div>
  );
}
