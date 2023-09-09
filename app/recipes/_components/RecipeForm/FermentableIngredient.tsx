import { FermentableSelect, NumberField, Select } from "@/components";
import {
  Fermentable,
  FermentableIngredient as FermentableIngredientType,
  MassUnit,
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
    <div className="flex flex-auto gap-2">
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
      <div className="flex-1">
        <FermentableSelect
          fermentables={fermentables}
          name={`fermentables[${index}].fermentableId`}
          label="Fermentable"
          defaultValue={fermentable?.fermentableId}
        />
      </div>
      <div className="flex-0 w-28">
        <NumberField
          name={`fermentables[${index}].amount`}
          label="Amount"
          defaultValue={fermentable?.amount}
        />
      </div>

      <div className="flex-0 w-24">
        <Select
          label="Type"
          name={`hops[${index}].amountType`}
          options={MassUnit}
          defaultValue={fermentable?.amountType}
        />
      </div>

      <div className="flex-shrink m-auto">{children}</div>
    </div>
  );
};
