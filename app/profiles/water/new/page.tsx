import { WaterProfileForm } from "@/app/profiles/water/_components/WaterProfileForm";
import { getWaterProfile } from "../../queries";
import { WaterProfile } from "@prisma/client";
type WaterProfileDisplayProps = {};

export function generateMetadata({}: WaterProfileDisplayProps) {
  return {
    title: `LNK WaterProfile: New`,
  };
}

export default async function WaterProfileDisplay({}: WaterProfileDisplayProps) {
  const waterProfile = {} as WaterProfile;
  return (
    <div className="m-5 p-0 min-w-full bg-slate-200">
      <WaterProfileForm src={waterProfile} />
    </div>
  );
}
