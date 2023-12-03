import { removeFermentableIngredient } from "@/app/recipes/actions";
import { ExtendedFermentableIngredient } from "@/app/recipes/types";
import { ListItem } from "@/components/List/ListItem";
import { RemoveButton } from "@/components/RemoveButton";
import Link from "next/link";

export type FermentableIngredientListItemProps = {
  fermentable: ExtendedFermentableIngredient;
};
export const FermentableIngredientListItem = ({
  fermentable,
}: FermentableIngredientListItemProps) => {
  return (
    <ListItem>
      <div className="flex group-hover:bg-slate-500/10">
        <Link
          className="flex-grow px-2 pb-1 grid grid-cols-6 gap-2"
          scroll={false}
          href={`?fermentableId=${fermentable.id}`}
        >
          <div className="h-full grid ">
            <div className="my-auto">
              <span className="text-lg ">{fermentable.usage}</span>
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
        </Link>
        <div className="m-auto">
          <RemoveButton
            action={removeFermentableIngredient}
            id={fermentable.id}
          />
        </div>
      </div>
    </ListItem>
  );
};
