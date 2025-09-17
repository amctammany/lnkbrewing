import { Hop } from "@prisma/client";
import React from "react";

export type HopDisplayProps = {
  src: Hop;
};
export function HopDisplay({ src }: HopDisplayProps) {
  return <div>HopDisplay</div>;
}
export default HopDisplay;
