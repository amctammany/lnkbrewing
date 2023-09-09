import { Select } from "@/components";
import { prisma } from "@/lib/client";
import { Style } from "@prisma/client";
//import { cache } from "react";
export type StyleSelectProps = {
  name: string;
  label?: string;
  defaultValue?: string;
  styles: any;
};
export const StyleSelect = ({
  name,
  label,
  styles,
  defaultValue,
}: StyleSelectProps) => {
  return (
    <Select
      name={name}
      label={label}
      defaultValue={defaultValue}
      options={styles}
    />
  );
};
