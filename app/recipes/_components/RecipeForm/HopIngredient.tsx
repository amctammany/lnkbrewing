import { HopSelect, NumberField } from "@/components";
import { Hop, HopIngredient as HopIngredientType } from "@prisma/client";

export type HopIngredientProps = {
  hops: any;
  hop: HopIngredientType | null;
  index: number;
  children?: React.ReactNode;
};
export const HopIngredient = ({
  hops,
  hop,
  index,
  children,
}: HopIngredientProps) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <input type="hidden" name={`hops[${index}].id`} value={hop?.id} />

      <input
        type="hidden"
        name={`hops[${index}].recipeId`}
        value={hop?.recipeId}
      />
      <HopSelect
        hops={hops}
        name={`hops[${index}].hopId`}
        label="Hop"
        defaultValue={hop?.hopId}
      />
      <NumberField
        name={`hops[${index}].amount`}
        label="Amount"
        defaultValue={hop?.amount}
      />
      {children}
    </div>
  );
};
