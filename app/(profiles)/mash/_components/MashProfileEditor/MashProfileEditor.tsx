import React from "react";
import { MashProfileForm, MashProfileFormContainer } from "./MashProfileForm";
import { TopBar } from "@/components/TopBar/TopBar";
import { AdjustedMashProfileType } from "@/types/Profile";
import Link from "next/link";
import { Save } from "lucide-react";
import IconButton from "@/components/Button/IconButton";
import { UserPreferencesType } from "@/contexts/UserPreferencesContext";

export type MashProfileEditorProps = {
  profile: AdjustedMashProfileType;
  action: any;
  preferences: UserPreferencesType;
};
export default function MashProfileEditor({
  profile,
  action,
  preferences,
}: MashProfileEditorProps) {
  return (
    <MashProfileFormContainer
      preferences={preferences}
      profile={profile}
      action={action}
    >
      <TopBar
        breadcrumbs={[
          { title: "Profiles" },
          { title: "Mash", url: "/mash" },
          { title: profile.name, url: `/mash/${profile.slug}` },
        ]}
      >
        <IconButton icon={Save} type="submit">
          Save
        </IconButton>
      </TopBar>
      <h3 className={profile.origin ? "" : "hidden"}>
        Forked From:
        <Link href={`/mash/${profile.origin?.slug}`}>
          {profile.origin?.name}
        </Link>
      </h3>
      <MashProfileForm profile={profile} />
    </MashProfileFormContainer>
  );
}
