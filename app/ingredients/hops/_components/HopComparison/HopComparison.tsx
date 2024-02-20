import React from "react";
//import HopPanel from "./HopPanel";
import { Hop } from "@prisma/client";
import { CompareField, CompareTable } from "@/components/CompareTable";
export type HopComparisonProps = {
  hops: Hop[];
};

const compFields: CompareField<Hop>[] = ["name", "country", "alpha", "beta"];
export function HopComparison({ hops }: HopComparisonProps) {
  return <CompareTable sources={hops} fields={compFields} />;
}

export default HopComparison;
