import { ExtendedFermentableIngredient } from "@/app/recipes/types";
import { ListItem } from "@/components/List/ListItem";
import Link from "next/link";

export type FermentableIngredientListItemProps = {
  fermentable: ExtendedFermentableIngredient;
};
export const FermentableIngredientListItem = ({
  fermentable,
}: FermentableIngredientListItemProps) => {
  return (
    <ListItem>
      <Link scroll={false} href={`?fermentableId=${fermentable.id}`}>
        <div className="px-2 pb-1 grid grid-cols-6 gap-2 group-hover:bg-slate-500/10 ">
          <div className="">
            <div className="">
              <div className="text-lg ">{fermentable.usage}</div>
            </div>
          </div>
          <div className="col-span-4">
            <div className="">
              <div className="text-lg">{fermentable.fermentable.name}</div>
              <div className="text-xs">
                Potential: {fermentable.fermentable.potential}
              </div>
            </div>
          </div>
          <div>
            <div className="">
              <div className="text-lg">{fermentable.amount}</div>
              <div className="text-xs">{fermentable.amountType}</div>
            </div>
          </div>
        </div>
      </Link>
    </ListItem>
  );
};
