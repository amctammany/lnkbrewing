import {
  Button,
  ButtonLink,
  ListItem,
  NumberField,
  Select,
  Submit,
} from "@/components";
import {
  Hop,
  HopIngredient as HopIngredientType,
  TimeUnit,
} from "@prisma/client";
import { ExtendedHopIngredient } from "../../types";
import { removeHopIngredient } from "../../actions";

export type HopIngredientProps = {
  hop: ExtendedHopIngredient;
};
type RemoveHopButtonProps = {
  id: number;
  children: React.ReactNode;
};
const RemoveHopButton = ({ id, children }: RemoveHopButtonProps) => {
  return (
    <form action={removeHopIngredient}>
      <input type="hidden" name="id" value={id} />
      <Submit>{children}</Submit>
    </form>
  );
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
          <RemoveHopButton id={hop.id}>Delete</RemoveHopButton>
          <ButtonLink scroll={false} href={`?hopId=${hop.id}`}>
            Edit
          </ButtonLink>
        </div>
      </div>
    </ListItem>
  );
};
