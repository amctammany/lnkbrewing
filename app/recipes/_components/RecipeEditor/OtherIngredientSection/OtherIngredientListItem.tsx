import { ExtendedOtherIngredient } from "../../../types";
import { removeRecipeOtherIngredient } from "../../../actions";
import Link from "next/link";
import { ListItem } from "@/components/List/ListItem";
import { RemoveButton } from "@/components/RemoveButton";

export type OtherIngredientListItemProps = {
  other: ExtendedOtherIngredient;
};
export const OtherIngredientListItem = ({
  other,
}: OtherIngredientListItemProps) => {
  return (
    <ListItem>
      <div className="flex group-hover:bg-slate-500/10">
        <Link
          className="flex-grow px-2 pb-1 grid grid-cols-6 gap-2  "
          scroll={false}
          href={`?otherId=${other.id}`}
        >
          <div className="">
            <div className="text-lg ">
              {other.amount} {other.amountType}
            </div>
            <div className="text-xs">foo?</div>
          </div>
          <div className="col-span-4">
            <div className="">
              <div className="text-lg">{other.otherIngredient.name}</div>
              <div className="text-xs">{other.otherIngredient.type}</div>
            </div>
          </div>
          <div className="">
            <div className="text-lg">{other.usage}</div>
            <div className="text-xs"></div>
          </div>
        </Link>
        <div className="m-auto">
          <RemoveButton action={removeRecipeOtherIngredient} id={other.id} />
        </div>
      </div>
    </ListItem>
  );
};
