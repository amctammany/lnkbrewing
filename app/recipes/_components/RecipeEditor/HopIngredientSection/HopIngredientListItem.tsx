import { ExtendedHopIngredient } from "../../../types";
import { removeHopIngredient } from "../../../actions";
import Link from "next/link";
import { ListItem } from "@/components/List/ListItem";
import { RemoveButton } from "@/components/RemoveButton";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
import { ListItemButton } from "@/components";

export type HopIngredientListItemProps = {
  hop: ExtendedHopIngredient;
};
export const HopIngredientListItem = ({ hop }: HopIngredientListItemProps) => {
  return (
    <ListItem
      href={`?hopId=${hop.id}`}
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
        primary={hop.hop.name}
        secondary={`IBU: ${hop.alpha}`}
      />
      <ListItemText
        //className="flex-shrink"
        primary={`${hop.amount.toString()} ${hop.amountType}`}
      />
    </ListItem>
  );
  /**
  return (
    <ListItem>
      <div className="flex group-hover:bg-slate-500/10">
        <Link
          className="flex-grow px-2 pb-1 grid grid-cols-6 gap-2  "
          scroll={false}
          href={`?hopId=${hop.id}`}
        >
          <div className="my-auto">
            <div className="text-lg ">
              {hop.duration} {hop.durationType}
            </div>
            <div className="text-xs">{hop.usage}</div>
          </div>
          <div className="col-span-4">
            <div className="">
              <div className="text-lg">{hop.hop.name}</div>
              <div className="text-xs">IBU: {hop.alpha}</div>
            </div>
          </div>
          <div className="">
            <div className="text-lg">
              {hop.amount} {hop.amountType}
            </div>
            <div className="text-xs">{hop.amountType}</div>
          </div>
        </Link>
        <div className="m-auto hidden sm:block">
          <RemoveButton action={removeHopIngredient} id={hop.id} />
        </div>
      </div>
    </ListItem>
  );
   */
};
