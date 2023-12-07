import { ButtonLink } from "@/components/Button";
import { List, ListItem, ListItemButton } from "@/components/List";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
import { Section } from "@/components/Section";
import { EquipmentProfile } from "@prisma/client";
import { EquipmentProfileListItem } from ".";
export type EquipmentProfileListProps = {
  profiles?: EquipmentProfile[];
};
const EquipmentProfilesActions = () => {
  return (
    <div>
      <ButtonLink href="/profiles/equipment/new">New</ButtonLink>
    </div>
  );
};

export const EquipmentProfileList = ({
  profiles,
}: EquipmentProfileListProps) => {
  return (
    <Section
      variant="primary"
      header="Equipment Profiles"
      actions={<EquipmentProfilesActions />}
    >
      <List>
        {(profiles || []).map((profile) => (
          <EquipmentProfileListItem key={profile?.id} profile={profile} />
        ))}
      </List>
    </Section>
  );
};
