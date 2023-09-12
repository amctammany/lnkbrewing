import { NumberField, Select, Submit, TextField } from "@/components";
import { prisma } from "@/lib/client";
import { HopIngredient, MassUnit, TimeUnit } from "@prisma/client";

export type HopIngredientFormProps = {
  src: HopIngredient | null;
  action?: (data: FormData) => void;
};

export async function HopIngredientForm({
  src,
  action,
}: HopIngredientFormProps) {
  const hops = await prisma.hop.findMany({});
  const hopOptions = hops.reduce((acc, { id, name }) => {
    acc[id] = name;
    return acc;
  }, {} as Record<string, string>);
  console.log(src);
  return (
    <form action={action}>
      <div className="grid grid-cols-2 gap-2 md:gap-4">
        <input type="hidden" name="recipeId" value={src?.recipeId} />
        <input type="hidden" name="id" value={src?.id} />
        <div className="col-span-2">
          <Select
            options={hopOptions}
            name="hopId"
            label="Hop"
            defaultValue={src?.hopId}
          />
        </div>

        <div>
          <NumberField name="amount" defaultValue={src?.amount} />
        </div>
        <div>
          <Select
            name="amountType"
            label="Amount Unit"
            options={MassUnit}
            defaultValue={src?.amountType}
          />
        </div>
        <div>
          <TextField name="duration" defaultValue={src?.duration} />
        </div>
        <div>
          <Select
            name="durationType"
            label="Time Unit"
            options={TimeUnit}
            defaultValue={src?.durationType}
          />
        </div>
        <div>
          <Submit>Save</Submit>
        </div>
      </div>
    </form>
  );
}
