import { getStyleOptions } from "@/app/styles/queries";
import { Select } from "@/components";

export type StyleSelectProps = {
  label?: string;
  name?: string;
  value?: string;
  //src: any; //{ styleIdentifer?: string };
};

export const StyleSelect = async ({
  //src,
  label,
  value,
  name: n,
}: StyleSelectProps) => {
  const styles = await getStyleOptions();
  const name = n || "styleIdentifer";
  return (
    <Select
      label={label || "Style"}
      name={name}
      options={styles}
      defaultValue={value}
    />
  );
};
