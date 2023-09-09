import { HopSelect, NumberField, Select } from "@/components";
import {
  Hop,
  HopIngredient as HopIngredientType,
  TimeUnit,
} from "@prisma/client";

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
    <div className="flex flex-auto">
      <div className="flex flex-grow gap-1">
        <input type="hidden" name={`hops[${index}].id`} value={hop?.id} />

        <input
          type="hidden"
          name={`hops[${index}].recipeId`}
          value={hop?.recipeId}
        />
        <div className="flex-1">
          <HopSelect
            hops={hops}
            name={`hops[${index}].hopId`}
            label="Hop"
            defaultValue={hop?.hopId}
          />
        </div>
        <div className="flex-0 w-28">
          <NumberField
            name={`hops[${index}].amount`}
            label="Amount"
            defaultValue={hop?.amount}
          />
        </div>
        <div className="flex-0 w-24">
          <NumberField
            name={`hops[${index}].duration`}
            label="Time"
            defaultValue={hop?.duration}
          />
        </div>
        <div className="flex-0 w-24">
          <Select
            name={`hops[${index}].durationType`}
            label="Time Unit"
            options={TimeUnit}
            defaultValue={hop?.durationType}
          />
        </div>
        <div className="flex-shrink m-auto">{children}</div>
      </div>
    </div>
  );
};
