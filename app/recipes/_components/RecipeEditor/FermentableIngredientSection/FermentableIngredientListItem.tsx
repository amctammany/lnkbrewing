import { removeFermentableIngredient } from "@/app/recipes/actions";
import { ExtendedFermentableIngredient } from "@/app/recipes/types";
import { ListItem } from "@/components/List/ListItem";
import { TrashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
type RemoveFermentableButtonProps = {
  id: number;
};
const RemoveFermentableButton = ({ id }: RemoveFermentableButtonProps) => {
  return (
    <form action={removeFermentableIngredient}>
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="border-red-300 border rounded-md p-2">
        <TrashIcon className="h-6 w-6 text-red-500 " />
      </button>
    </form>
  );
};

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
        </Link>
        <div className="m-auto">
          <RemoveFermentableButton id={fermentable.id} />
        </div>
      </div>
    </ListItem>
  );
};
