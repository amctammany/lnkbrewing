import { getFermentableOptions } from "@/app/ingredients/fermentables/queries";
import { Select } from "@/components";

export type FermentableSelectProps = {
  label?: string;
  name: string;
  value?: number;
  //src: any; //{ fermentableIdentifer?: string };
};

export const FermentableSelect = async ({
  //src,
  label,
  value,
  name,
}: FermentableSelectProps) => {
  const fermentables = await getFermentableOptions();
  return (
    <Select
      label={label || "Fermentable"}
      name={name}
      options={fermentables}
      defaultValue={value}
    />
  );
};
