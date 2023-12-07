import { AddIcon } from "@/components/Icon";
import { ListItem } from "@/components/List/ListItem";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
import { WrenchIcon } from "@heroicons/react/20/solid";
import { MashProfile } from "@prisma/client";

export type MashProfileListItemProps = {
  profile?: MashProfile;
};
export const MashProfileListItem = ({ profile }: MashProfileListItemProps) => {
  return (
    <ListItem key={profile?.id} href={`/profiles/mash/${profile?.slug}`}>
      <ListItemIcon>
        <WrenchIcon className="w-5 h-5" />
      </ListItemIcon>
      <ListItemText primary={profile?.name} secondary={profile?.description!} />
    </ListItem>
  );
};
