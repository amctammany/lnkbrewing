import React from "react";
import HopPanel from "./HopPanel";
import { Hop } from "@prisma/client";
export type HopComparePanelsProps = {
  hops: Hop[];
};

export function HopComparePanels({ hops }: HopComparePanelsProps) {
  return (
    <div className="grid grid-flow-col auto-cols-auto">
      <HopPanel />
      {hops.map((hop) => (
        <HopPanel key={hop.id} hop={hop} />
      ))}
    </div>
  );
}

export default HopComparePanels;
