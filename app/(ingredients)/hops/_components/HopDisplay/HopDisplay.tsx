import { Hop } from "@prisma/client";
import React from "react";
import BrewingValues from "./BrewingValues";
import General from "./General";

export type HopDisplayProps = {
  src: Hop;
};
export function HopDisplay({ src }: HopDisplayProps) {
  return (
    <div className="grid lg:grid-cols-2 *:m-3">
      <General src={src} />
      <BrewingValues src={src} />
    </div>
  );
}
export default HopDisplay;
