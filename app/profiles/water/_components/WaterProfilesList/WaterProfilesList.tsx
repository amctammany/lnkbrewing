import Link from "next/link";
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
          <li key={profile.name}>
            <Link href={`/profiles/water/${profile.slug}`}>{profile.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
