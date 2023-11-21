import { getMashProfileOptions } from "@/app/profiles/queries";
import { Select } from "@/components/Form/Select";

export type MashProfileSelectProps = {
  label?: string;
  name?: string;
  value?: number | null;
  disabled?: boolean;
  //src: any; //{ mashProfileIdentifer?: string };
};

export const MashProfileSelect = async ({
  //src,
  label,
  value,
  disabled,
  name: n,
}: MashProfileSelectProps) => {
  const mashProfiles = await getMashProfileOptions();
  const name = n || "mashProfileId";
  return (
    <Select
      disabled={disabled}
      label={label || "MashProfile"}
      name={name}
      options={mashProfiles}
      defaultValue={value}
    />
  );
};
