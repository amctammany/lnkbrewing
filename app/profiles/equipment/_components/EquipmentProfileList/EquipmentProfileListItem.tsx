import { ListItem } from "@/components/List/ListItem";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
import { EyeDropperIcon } from "@heroicons/react/20/solid";
import { EquipmentProfile } from "@prisma/client";

export type EquipmentProfileListItemProps = {
  profile?: EquipmentProfile;
};
export const EquipmentProfileListItem = ({
  profile,
}: EquipmentProfileListItemProps) => {
  return (
    <ListItem key={profile?.id} href={`/profiles/equipment/${profile?.slug}`}>
      <ListItemIcon>
        <EyeDropperIcon className="w-5 h-5" />
      </ListItemIcon>
      <ListItemText
        primary={profile?.name}
        secondary={`Brew Efficiency: ${profile?.brewEfficiency! * 100} %`}
      />
    </ListItem>
  );
};
