import { Select } from "@/components";
import { prisma } from "@/lib/client";
import { Hop } from "@prisma/client";
//import { cache } from "react";
export type HopSelectProps = {
  name: string;
  label?: string;
  defaultValue?: number;
  hops: any;
};
export const HopSelect = async ({
  name,
  label,
  hops,
  defaultValue,
}: HopSelectProps) => {
  return (
    <Select
      name={name}
      label={label}
      defaultValue={defaultValue}
      options={hops}
    />
  );
};
