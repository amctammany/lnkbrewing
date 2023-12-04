import { removeFermentableIngredient } from "@/app/recipes/actions";
import { ExtendedFermentableIngredient } from "@/app/recipes/types";
import { ListItem } from "@/components/List/ListItem";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
import { RemoveButton } from "@/components/RemoveButton";
import Link from "next/link";

export type FermentableIngredientListItemProps = {
  fermentable: ExtendedFermentableIngredient;
};
export const FermentableIngredientListItem = ({
  fermentable,
}: FermentableIngredientListItemProps) => {
  return (
    <ListItem
      href={`?fermentableId=${fermentable.id}`}
      secondaryAction={
        <RemoveButton
          id={fermentable.id}
          action={removeFermentableIngredient}
        />
      }
    >
      <ListItemIcon>
        <div className="text-lg ">{fermentable.usage}</div>
        <div className="text-xs">{fermentable.usage}</div>
      </ListItemIcon>
      <ListItemText
        primary={fermentable.fermentable.name}
        secondary={`IBU: ${fermentable.fermentable.potential}`}
      />
      <div>
        <div className="text-lg">{fermentable.amount}</div>
        <div className="text-xs">{fermentable.amountType}</div>
      </div>
    </ListItem>
  );
};
