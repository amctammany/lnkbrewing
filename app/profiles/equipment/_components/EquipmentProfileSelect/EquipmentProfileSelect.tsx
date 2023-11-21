import { getEquipmentProfileOptions } from "@/app/profiles/queries";
import { Select } from "@/components/Form/Select";

export type EquipmentProfileSelectProps = {
  label?: string;
  name?: string;
  value?: number | null;
  disabled?: boolean;
  //src: any; //{ equipmentProfileIdentifer?: string };
};

export const EquipmentProfileSelect = async ({
  //src,
  label,
  value,
  disabled,
  name: n,
}: EquipmentProfileSelectProps) => {
  const equipmentProfiles = await getEquipmentProfileOptions();
  const name = n || "equipmentProfileId";
  return (
    <Select
      disabled={disabled}
      label={label || "EquipmentProfile"}
      name={name}
      options={equipmentProfiles}
      defaultValue={value}
    />
  );
};
