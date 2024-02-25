import React from "react";
//import HopPanel from "./HopPanel";
import { Hop } from "@prisma/client";
import { ColumnView, ColumnField } from "@/components/ColumnView/ColumnView";
export type HopComparisonProps = {
  hops: Hop[];
};

const compFields: ColumnField<Hop>[] = [
  "name",
  "selected",
  "country",
  "characteristics",
  "usage",
  "alpha",
  "beta",
  "cohumulone",
  "styles",
];
export function HopComparison({ hops }: HopComparisonProps) {
  return <ColumnView sources={hops} fields={compFields} />;
}

export default HopComparison;
