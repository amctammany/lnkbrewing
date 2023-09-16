import { getHopOptions } from "@/app/ingredients/hops/queries";
import { Select } from "@/components";

export type HopSelectProps = {
  label?: string;
  name: string;
  value?: number;
  //src: any; //{ hopIdentifer?: string };
};

export const HopSelect = async ({
  //src,
  label,
  value,
  name,
}: HopSelectProps) => {
  const hops = await getHopOptions();
  return (
    <Select
      label={label || "Hop"}
      name={name}
      options={hops}
      defaultValue={value}
    />
  );
};
