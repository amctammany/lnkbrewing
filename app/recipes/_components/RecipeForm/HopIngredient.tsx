import { ButtonLink, ListItem, NumberField, Select } from "@/components";
import {
  Hop,
  HopIngredient as HopIngredientType,
  TimeUnit,
} from "@prisma/client";

export type HopIngredientProps = {
  hop: HopIngredientType & { hop: Hop };
};
export const HopIngredient = ({ hop }: HopIngredientProps) => {
  return (
    <ListItem>
      <div className="flex gap-4">
        <div className="flex-0">{hop.duration}</div>
        <div className="flex-0">{hop.durationType}</div>
        <div className="flex-1">{hop.hop.name}</div>
        <div className="flex-0">{hop.amount}</div>
        <div>
          <ButtonLink scroll={false} href={`?hopId=${hop.id}`}>
            Edit
          </ButtonLink>
        </div>
      </div>
    </ListItem>
  );
};
