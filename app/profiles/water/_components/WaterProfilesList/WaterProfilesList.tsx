import React from "react";

export type WaterProfilesListProps = {
  profiles: any[];
};
export default function WaterProfilesList({
  profiles,
}: WaterProfilesListProps) {
  return (
    <div>
      WaterProfilesList
      <ul>
        {profiles.map((profile) => (
          <li key={profile.name}>{profile.name}</li>
        ))}
      </ul>
    </div>
  );
}
