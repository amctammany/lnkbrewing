import { ExtendedHopIngredient } from "../../../types";
import { removeHopIngredient } from "../../../actions";
import { ListItem } from "@/components/List/ListItem";
import { RemoveButton } from "@/components/RemoveButton";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";

export type HopIngredientListItemProps = {
  hop: ExtendedHopIngredient;
};
export const HopIngredientListItem = ({ hop }: HopIngredientListItemProps) => {
  return (
    <ListItem
      href={`?hopId=${hop.id}`}
      secondaryAction={
        <RemoveButton id={hop.id} action={removeHopIngredient} />
      }
    >
      <ListItemIcon>
        <div className="text-lg ">
          {hop.duration} {hop.durationType}
        </div>
        <div className="text-xs">{hop.usage}</div>
      </ListItemIcon>
      <ListItemText
        className="flex-grow"
        primary={hop.hop.name}
        secondary={`IBU: ${hop.alpha}`}
      />
      <ListItemText
        //className="flex-shrink"
        primary={`${hop.amount.toString()} ${hop.amountType}`}
      />
    </ListItem>
  );
};
