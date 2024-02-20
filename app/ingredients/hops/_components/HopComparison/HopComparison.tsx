import React from "react";
//import HopPanel from "./HopPanel";
import { Hop } from "@prisma/client";
export type HopComparisonProps = {
  hops: Hop[];
};

export function HopComparison({ hops }: HopComparisonProps) {
  console.log(hops);
  return (
    <div className="grid grid-flow-col auto-cols-auto">
      {hops.map((hop) => (
        <b key={hop.id}>{hop.name}</b>
      ))}
    </div>
  );
}

export default HopComparison;
