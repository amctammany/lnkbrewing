import { Metadata } from "next";
import { getEquipmentProfiles } from "@/app/profiles/queries";
import { EquipmentProfileList } from "./_components/EquipmentProfileList";
export const metadata: Metadata = {
  title: "LNK Profiles",
};

export default async function EquipmentProfilesIndex() {
  const profiles = await getEquipmentProfiles();
  return <EquipmentProfileList profiles={profiles} />;
  /**
  return (
    <Section
      variant="alert"
      header="Profiles"
      actions={<EquipmentProfilesActions />}
    >
      <List>
        {profiles.map((profile) => (
          <ListItemButton
            key={profile.id}
            href={`/profiles/equipment/${profile.slug}`}
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="px-2.5 py-2.5 rounded-full border w-16 text-center bg-slate-200 text-black group-hover:text-white group-hover:bg-gray-300 text-sm font-medium">
                  {profile.batchVolume}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="group-hover:text-slate-400"> {profile.name}</p>
                <p className="group-hover:text-slate-400">
                  {" "}
                  {profile.brewEfficiency}
                </p>
              </div>
            </div>
          </ListItemButton>
        ))}
      </List>
    </Section>
  );
     */
}
