import { getEquipmentProfileOptions } from "@/app/profiles/queries";
import { Select } from "@/components";

export type EquipmentProfileSelectProps = {
  label?: string;
  name?: string;
  value?: number | null;
  //src: any; //{ equipmentProfileIdentifer?: string };
};

export const EquipmentProfileSelect = async ({
  //src,
  label,
  value,
  name: n,
}: EquipmentProfileSelectProps) => {
  const equipmentProfiles = await getEquipmentProfileOptions();
  const name = n || "equipmentProfileId";
  return (
    <Select
      label={label || "EquipmentProfile"}
      name={name}
      options={equipmentProfiles}
      defaultValue={value}
    />
  );
};
