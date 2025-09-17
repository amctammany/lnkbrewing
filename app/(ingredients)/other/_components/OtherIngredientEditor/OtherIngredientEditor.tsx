import { OtherIngredient } from "@prisma/client";
import React from "react";

export type OtherIngredientEditorProps = {
  src?: OtherIngredient;
  action?: any;
};
export default function OtherIngredientEditor({
  src,
  action,
}: OtherIngredientEditorProps) {
  return <div>OtherIngredientEditor</div>;
}
