"use client";
import { ExtendedFermentableIngredient } from "../../../types";
import { removeFermentableIngredient } from "../../../actions";
import { ListItem } from "@/components/List/ListItem";
import { RemoveButton } from "@/components/RemoveButton";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
import { useRecipe } from "../useRecipe";
import { displayAmount } from "@/lib/displayAmount";
import { Amount } from "@/components/Amount";

export type FermentableIngredientListItemProps = {
  fermentable: ExtendedFermentableIngredient;
};
export const FermentableIngredientListItem = ({
  fermentable,
}: FermentableIngredientListItemProps) => {
  const { openModal } = useRecipe();
  return (
    <ListItem
      onClick={() => openModal("fermentables", fermentable.id)}
      secondaryAction={
        <RemoveButton
          id={fermentable.id}
          action={removeFermentableIngredient}
        />
      }
    >
      <ListItemIcon>
        <div className="text-lg ">{fermentable.usage}</div>
      </ListItemIcon>
      <ListItemText
        className="flex-grow"
        primary={fermentable.fermentable.name}
        secondary={`Potential: ${fermentable.fermentable.potential}`}
      />
      <ListItemText
        //className="flex-shrink"
        primary={
          <Amount amount={fermentable.amount} type={fermentable.amountType} />
        }
      />
    </ListItem>
  );
};
