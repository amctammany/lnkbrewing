import { AddIcon } from "@/components/Icon";
import { ListItem } from "@/components/List/ListItem";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
import { ChartBarSquareIcon } from "@heroicons/react/20/solid";
import { WaterProfile } from "@prisma/client";

export type WaterProfileListItemProps = {
  profile?: WaterProfile;
};
export const WaterProfileListItem = ({
  profile,
}: WaterProfileListItemProps) => {
  return (
    <ListItem key={profile?.id} href={`/profiles/water/${profile?.slug}`}>
      <ListItemIcon>
        <ChartBarSquareIcon className="w-5 h-5" />
      </ListItemIcon>
      <ListItemText primary={profile?.name} secondary={profile?.description!} />
    </ListItem>
  );
};
