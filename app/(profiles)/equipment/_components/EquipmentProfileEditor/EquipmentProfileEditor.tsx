import { EquipmentProfile, UserPreferences } from "@prisma/client";
import React from "react";
import {
  EquipmentProfileForm,
  EquipmentProfileFormContainer,
} from "./EquipmentProfileForm";
import { TopBar } from "@/components/TopBar/TopBar";
import { Button } from "@/components/ui/button";
import { OptionalNullable } from "@/lib/utils";
import {
  AdjustedEquipmentProfileType,
  BaseEquipmentProfile,
  EquipmentProfileType,
} from "@/types/Profile";
import Link from "next/link";
import { UserPreferencesType } from "@/contexts/UserPreferencesContext";

export type EquipmentProfileEditorProps = {
  profile: AdjustedEquipmentProfileType;
  preferences: UserPreferencesType;
  action: any;
};
export default function EquipmentProfileEditor({
  profile,
  action,
  preferences,
}: EquipmentProfileEditorProps) {
  return (
    <EquipmentProfileFormContainer
      preferences={preferences}
      profile={profile}
      action={action}
    >
      <TopBar
        breadcrumbs={[
          { title: "Profiles" },
          { title: "Equipment", url: "/equipment" },
          { title: profile.name, url: `/equipment/${profile.slug}` },
        ]}
      >
        <Button type="submit">Save</Button>
      </TopBar>
      <h3 className={profile.origin ? "" : "hidden"}>
        Forked From:
        <Link href={`/equipment/${profile.origin?.slug}`}>
          {profile.origin?.name}
        </Link>
      </h3>
      <EquipmentProfileForm preferences={preferences} />
    </EquipmentProfileFormContainer>
  );
}
