"use client";
import { ExtendedYeastIngredient } from "../../../types";
import { removeYeastIngredient } from "../../../actions";
import { ListItem } from "@/components/List/ListItem";
import { RemoveButton } from "@/components/RemoveButton";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
import { useRecipe } from "../useRecipe";
import { displayAmount } from "@/lib/displayAmount";

export type YeastIngredientListItemProps = {
  yeast: ExtendedYeastIngredient;
};
export const YeastIngredientListItem = ({
  yeast,
}: YeastIngredientListItemProps) => {
  const { openModal } = useRecipe();
  return (
    <ListItem
      onClick={() => openModal("yeasts", yeast.id)}
      secondaryAction={
        <RemoveButton id={yeast.id} action={removeYeastIngredient} />
      }
    >
      <ListItemIcon>Yeast</ListItemIcon>
      <ListItemText
        className="flex-grow"
        primary={yeast.yeast.name}
        secondary={`Attenuation: ${yeast.attenuation}`}
      />
      <ListItemText
        //className="flex-shrink"
        primary={displayAmount(yeast.amount, yeast.amountType)}
      />
    </ListItem>
  );
};
