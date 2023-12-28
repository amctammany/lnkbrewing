"use client";
import { ExtendedHopIngredient } from "../../../types";
import { removeHopIngredient } from "../../../actions";
import { ListItem } from "@/components/List/ListItem";
import { RemoveButton } from "@/components/RemoveButton";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
import { useRecipe } from "../useRecipe";
import { displayAmount } from "@/lib/displayAmount";
import { Amount } from "@/components/Amount";

export type HopIngredientListItemProps = {
  hop: ExtendedHopIngredient;
};
export const HopIngredientListItem = ({ hop }: HopIngredientListItemProps) => {
  const { openModal } = useRecipe();
  return (
    <ListItem
      onClick={() => openModal("hops", hop.id)}
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
        primary={`${hop.hop.name} - ${hop.alpha}%`}
        secondary={`IBU: ${hop.alpha}`}
      />
      <ListItemText
        //className="flex-shrink"
        primary={<Amount amount={hop.amount} type={hop.amountType} />}
      />
    </ListItem>
  );
};
