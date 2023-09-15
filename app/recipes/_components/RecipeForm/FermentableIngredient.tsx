import { ButtonLink, ListItem } from "@/components";
import {
  Fermentable,
  FermentableIngredient as FermentableIngredientType,
} from "@prisma/client";

export type FermentableIngredientProps = {
  fermentable: FermentableIngredientType & { fermentable: Fermentable };
};
export const FermentableIngredient = ({
  fermentable,
}: FermentableIngredientProps) => {
  return (
    <ListItem key={fermentable.id}>
      <div className="flex gap-4">
        <div className="flex-1">{fermentable.fermentable.name}</div>
        <div className="flex-0">{fermentable.amount}</div>
        <div className="flex-0">{fermentable.amountType}</div>
        <div>
          <ButtonLink scroll={false} href={`?fermentableId=${fermentable.id}`}>
            Edit
          </ButtonLink>
        </div>
      </div>
    </ListItem>
  );
};
