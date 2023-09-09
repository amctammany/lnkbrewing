import { FermentableSelect, NumberField, Select } from "@/components";
import {
  Fermentable,
  FermentableIngredient as FermentableIngredientType,
  TimeUnit,
} from "@prisma/client";

export type FermentableIngredientProps = {
  fermentables: any;
  fermentable: FermentableIngredientType | null;
  index: number;
  children?: React.ReactNode;
};
export const FermentableIngredient = ({
  fermentables,
  fermentable,
  index,
  children,
}: FermentableIngredientProps) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <input
        type="hidden"
        name={`fermentables[${index}].id`}
        value={fermentable?.id}
      />

      <input
        type="hidden"
        name={`fermentables[${index}].recipeId`}
        value={fermentable?.recipeId}
      />
      <FermentableSelect
        fermentables={fermentables}
        name={`fermentables[${index}].fermentableId`}
        label="Fermentable"
        defaultValue={fermentable?.fermentableId}
      />
      <NumberField
        name={`fermentables[${index}].amount`}
        label="Amount"
        defaultValue={fermentable?.amount}
      />

      {children}
    </div>
  );
};
