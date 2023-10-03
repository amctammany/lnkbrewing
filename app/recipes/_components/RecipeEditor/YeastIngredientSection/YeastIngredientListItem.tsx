import { TrashIcon } from "@heroicons/react/24/solid";

import { ExtendedYeastIngredient } from "../../../types";
import { removeYeastIngredient } from "../../../actions";
import Link from "next/link";
import { ListItem } from "@/components/List/ListItem";

export type YeastIngredientListItemProps = {
  yeast: ExtendedYeastIngredient;
};
type RemoveYeastButtonProps = {
  id: number;
};
const RemoveYeastButton = ({ id }: RemoveYeastButtonProps) => {
  return (
    <form action={removeYeastIngredient}>
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="border-red-300 border rounded-md p-2">
        <TrashIcon className="h-6 w-6 text-red-500 " />
      </button>
    </form>
  );
};
export const YeastIngredientListItem = ({
  yeast,
}: YeastIngredientListItemProps) => {
  return (
    <ListItem>
      <div className="flex group-hover:bg-slate-500/10 ">
        <Link
          className="flex-grow px-2 pb-1 grid grid-cols-6 gap-2"
          scroll={false}
          href={`?yeastId=${yeast.id}`}
        >
          <div className="">
            <div className="">
              <div className="text-lg ">{yeast.yeast.type}</div>
              <div className="text-xs">{yeast.yeast.form}</div>
            </div>
          </div>
          <div className="col-span-4">
            <div className="">
              <div className="text-lg">{yeast.yeast.name}</div>
              <div className="text-xs">
                Attenuation: {yeast.yeast.attenuation}
              </div>
            </div>
          </div>
          <div>
            <div className="">
              <div className="text-lg">{yeast.amount}</div>
              <div className="text-xs">{yeast.amountType}</div>
            </div>
          </div>
        </Link>
        <div className="m-auto">
          <RemoveYeastButton id={yeast.id} />
        </div>
      </div>
    </ListItem>
  );
};
