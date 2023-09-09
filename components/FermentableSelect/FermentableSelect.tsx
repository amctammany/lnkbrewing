import { Select } from "@/components";
import { prisma } from "@/lib/client";
import { Fermentable } from "@prisma/client";
//import { cache } from "react";
export type FermentableSelectProps = {
  name: string;
  label?: string;
  defaultValue?: number;
  fermentables: any;
};
export const FermentableSelect = ({
  name,
  label,
  fermentables,
  defaultValue,
}: FermentableSelectProps) => {
  return (
    <Select
      name={name}
      label={label}
      defaultValue={defaultValue}
      options={fermentables}
    />
  );
};
