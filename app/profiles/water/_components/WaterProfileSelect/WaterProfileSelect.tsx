import { getWaterProfileOptions } from "@/app/profiles/queries";
import { Select } from "@/components/Form/Select";

export type WaterProfileSelectProps = {
  label?: string;
  name?: string;
  value?: number | null;
  disabled?: boolean;
  //src: any; //{ waterProfileIdentifer?: string };
};

export const WaterProfileSelect = async ({
  //src,
  label,
  value,
  disabled,
  name: n,
}: WaterProfileSelectProps) => {
  const waterProfiles = await getWaterProfileOptions();
  const name = n || "waterProfileId";
  return (
    <Select
      disabled={disabled}
      label={label || "WaterProfile"}
      name={name}
      options={waterProfiles}
      defaultValue={value}
    />
  );
};
